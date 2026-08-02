// ==================== transfer.js (v10 - FULLY FIXED) ====================
(function() {
    'use strict';

    const player = JSON.parse(localStorage.getItem('theJourney_playerData') || 'null');
    if (!player || !player.name) {
        window.location.href = 'index.html';
        return;
    }

    // --- SAVED FACE ---
    const savedFace = localStorage.getItem('theJourney_playerFace') || player.faceImage || '';

    // --- SEASON CONSTANTS ---
    const TOTAL_MATCHWEEKS = 38;
    const HALF_SEASON_WEEK = 19;
    const END_SEASON_WEEK = 38;

    // ==================== DATABASE KELAB DUNIA (LENGKAP - TOP 4 LEAGUE) ====================
    const worldLeagues = {
        "Premier League": {
            'Arsenal': { rating: 85, budget: 120000000, prestige: 90 },
            'Manchester City': { rating: 89, budget: 200000000, prestige: 95 },
            'Liverpool': { rating: 87, budget: 130000000, prestige: 92 },
            'Chelsea': { rating: 84, budget: 150000000, prestige: 88 },
            'Manchester United': { rating: 86, budget: 160000000, prestige: 91 },
            'Tottenham': { rating: 84, budget: 110000000, prestige: 85 },
            'Newcastle': { rating: 83, budget: 100000000, prestige: 80 },
            'Aston Villa': { rating: 82, budget: 80000000, prestige: 78 },
            'Brighton': { rating: 79, budget: 60000000, prestige: 72 },
            'West Ham': { rating: 79, budget: 70000000, prestige: 72 },
            'Everton': { rating: 78, budget: 60000000, prestige: 70 },
            'Crystal Palace': { rating: 77, budget: 50000000, prestige: 65 },
            'Wolves': { rating: 77, budget: 55000000, prestige: 65 },
            'Fulham': { rating: 76, budget: 45000000, prestige: 62 },
            'Bournemouth': { rating: 75, budget: 40000000, prestige: 60 },
            'Brentford': { rating: 76, budget: 45000000, prestige: 61 },
            'Nottingham Forest': { rating: 75, budget: 40000000, prestige: 58 },
            'Ipswich': { rating: 72, budget: 30000000, prestige: 50 },
            'Southampton': { rating: 73, budget: 35000000, prestige: 55 },
            'Leicester': { rating: 74, budget: 38000000, prestige: 56 }
        },
        "La Liga": {
            'Real Madrid': { rating: 90, budget: 220000000, prestige: 98 },
            'Barcelona': { rating: 88, budget: 180000000, prestige: 96 },
            'Atletico Madrid': { rating: 85, budget: 120000000, prestige: 88 },
            'Real Sociedad': { rating: 80, budget: 70000000, prestige: 78 },
            'Athletic Bilbao': { rating: 79, budget: 65000000, prestige: 76 },
            'Valencia': { rating: 78, budget: 60000000, prestige: 74 },
            'Villarreal': { rating: 79, budget: 65000000, prestige: 75 },
            'Sevilla': { rating: 78, budget: 60000000, prestige: 73 },
            'Betis': { rating: 77, budget: 55000000, prestige: 70 },
            'Mallorca': { rating: 74, budget: 40000000, prestige: 62 }
        },
        "Bundesliga": {
            'Bayern Munich': { rating: 88, budget: 180000000, prestige: 94 },
            'Borussia Dortmund': { rating: 85, budget: 120000000, prestige: 88 },
            'RB Leipzig': { rating: 83, budget: 100000000, prestige: 84 },
            'Bayer Leverkusen': { rating: 84, budget: 110000000, prestige: 86 },
            'Frankfurt': { rating: 80, budget: 70000000, prestige: 78 },
            'Stuttgart': { rating: 78, budget: 60000000, prestige: 74 },
            'Wolfsburg': { rating: 77, budget: 55000000, prestige: 70 },
            'Hoffenheim': { rating: 76, budget: 50000000, prestige: 68 }
        },
        "Serie A": {
            'Inter Milan': { rating: 87, budget: 160000000, prestige: 92 },
            'AC Milan': { rating: 86, budget: 140000000, prestige: 90 },
            'Juventus': { rating: 85, budget: 130000000, prestige: 89 },
            'Napoli': { rating: 84, budget: 120000000, prestige: 86 },
            'Roma': { rating: 82, budget: 100000000, prestige: 84 },
            'Lazio': { rating: 81, budget: 90000000, prestige: 82 },
            'Atalanta': { rating: 82, budget: 95000000, prestige: 83 },
            'Fiorentina': { rating: 79, budget: 70000000, prestige: 76 },
            'Torino': { rating: 77, budget: 60000000, prestige: 72 },
            'Bologna': { rating: 78, budget: 65000000, prestige: 73 }
        }
    };

    // ==================== HELPER FUNCTIONS ====================
    function getLeagueForClub(clubName) {
        for (const league in worldLeagues) {
            if (worldLeagues[league].hasOwnProperty(clubName)) return league;
        }
        return 'Premier League';
    }

    function getAllClubs() {
        const clubs = [];
        for (const league in worldLeagues) {
            for (const club in worldLeagues[league]) {
                clubs.push({ name: club, league: league, ...worldLeagues[league][club] });
            }
        }
        return clubs;
    }

    function formatCurrency(value) {
        if (value === undefined || value === null) return '€0';
        if (value >= 1000000) return `€${(value / 1000000).toFixed(1)}M`;
        if (value >= 1000) return `€${Math.round(value / 1000)}K`;
        return `€${Math.round(value)}`;
    }

    function getPlayerMarketValue() {
        const ovr = player.ovr || 60;
        const age = player.age || 20;
        let value = Math.pow(Math.max(1, ovr - 40), 3.8) * 25;
        let ageMult = 1;
        if (age <= 20) ageMult = 1.25;
        else if (age <= 27) ageMult = 1.15;
        else if (age <= 30) ageMult = 0.9;
        else if (age <= 33) ageMult = 0.6;
        else if (age <= 36) ageMult = 0.35;
        else ageMult = 0.15;
        value *= ageMult;
        const formBonus = Math.min(value * 0.35, (player.goalsScored || 0) * 30000 + (player.assists || 0) * 20000);
        value += formBonus;
        value += (player.trophies || []).length * 250000;
        return Math.max(10000, Math.round(value / 1000) * 1000);
    }

    // ==================== GENERATE CLUB INTEREST ====================
    function generateClubInterests() {
        const allClubs = getAllClubs();
        const currentClub = player.club;
        const playerValue = getPlayerMarketValue();
        const playerOVR = player.ovr || 60;
        const interested = [];

        const candidates = allClubs.filter(c => c.name !== currentClub);
        candidates.sort(() => Math.random() - 0.5);

        let num = Math.min(1 + Math.floor(Math.random() * 4), candidates.length);
        if (playerOVR >= 80) num = Math.min(4 + Math.floor(Math.random() * 3), candidates.length);
        if (playerOVR >= 85) num = Math.min(6 + Math.floor(Math.random() * 3), candidates.length);

        for (let i = 0; i < num; i++) {
            const club = candidates[i];
            if (!club) continue;

            const canAfford = club.budget > playerValue * 0.3;
            const prestigeGap = club.prestige - (worldLeagues[getLeagueForClub(currentClub)]?.[currentClub]?.prestige || 70);
            const interestLevel = canAfford ?
                Math.min(100, 50 + (playerOVR - club.rating) * 3 + prestigeGap * 0.5 + Math.random() * 20) :
                Math.min(60, 20 + (playerOVR - club.rating) * 2 + Math.random() * 10);

            if (interestLevel > 30) {
                const weeklyWage = Math.round((playerValue / 1000000) * 3000 + 2000 + Math.random() * 5000);
                const contractLength = 2 + Math.floor(Math.random() * 4);
                const signingBonus = Math.round(playerValue * (0.05 + Math.random() * 0.1));

                interested.push({
                    club: club.name,
                    league: club.league,
                    rating: club.rating,
                    prestige: club.prestige,
                    budget: club.budget,
                    interestLevel: Math.round(interestLevel),
                    offer: {
                        weeklyWage: weeklyWage,
                        contractLength: contractLength,
                        signingBonus: signingBonus,
                        totalValue: weeklyWage * 52 * contractLength + signingBonus
                    },
                    status: 'interested',
                    date: new Date().toISOString()
                });
            }
        }
        interested.sort((a, b) => b.interestLevel - a.interestLevel);
        return interested;
    }

    // ==================== LOAD INTERESTS ====================
    function loadInterests(forceRefresh) {
        const key = 'theJourney_transferInterests';
        let interests = null;
        if (!forceRefresh) {
            interests = JSON.parse(localStorage.getItem(key) || 'null');
        }
        if (!interests || !Array.isArray(interests) || interests.length === 0) {
            interests = generateClubInterests();
            localStorage.setItem(key, JSON.stringify(interests));
        }
        return interests;
    }

    function saveInterests(interests) {
        localStorage.setItem('theJourney_transferInterests', JSON.stringify(interests));
    }

    // ==================== NEGOTIATION ====================
    function negotiateOffer(offer, action) {
        const current = { ...offer, offer: { ...offer.offer } };
        switch (action) {
            case 'accept':
                return { ...current, status: 'accepted', negotiationComplete: true };
            case 'reject':
                return { ...current, status: 'rejected', negotiationComplete: true };
            case 'counter_wage': {
                const newWage = Math.round(current.offer.weeklyWage * (1.15 + Math.random() * 0.2));
                if (newWage <= current.budget / 100) {
                    return {
                        ...current,
                        offer: { ...current.offer, weeklyWage: newWage, totalValue: newWage * 52 * current.offer.contractLength + current.offer.signingBonus },
                        status: 'countered',
                        negotiationComplete: false
                    };
                }
                return { ...current, status: 'rejected', negotiationComplete: true };
            }
            case 'counter_length': {
                const newLength = Math.min(5, current.offer.contractLength + 1);
                return {
                    ...current,
                    offer: { ...current.offer, contractLength: newLength, totalValue: current.offer.weeklyWage * 52 * newLength + current.offer.signingBonus },
                    status: 'countered',
                    negotiationComplete: false
                };
            }
            case 'counter_bonus': {
                const newBonus = Math.round(current.offer.signingBonus * (1.2 + Math.random() * 0.2));
                if (newBonus <= current.budget * 0.05) {
                    return {
                        ...current,
                        offer: { ...current.offer, signingBonus: newBonus, totalValue: current.offer.weeklyWage * 52 * current.offer.contractLength + newBonus },
                        status: 'countered',
                        negotiationComplete: false
                    };
                }
                return { ...current, status: 'rejected', negotiationComplete: true };
            }
            default:
                return { ...current, status: 'rejected', negotiationComplete: true };
        }
    }

    // ==================== EXECUTE TRANSFER ====================
    function executeTransfer(offer) {
        if (offer.status !== 'accepted') return false;

        const oldClub = player.club;
        const newClub = offer.club;
        const oldLeague = getLeagueForClub(oldClub);
        const newLeague = getLeagueForClub(newClub);

        player.club = newClub;
        player.salary = offer.offer.weeklyWage;
        player.bankBalance = (player.bankBalance || 0) + offer.offer.signingBonus;
        player.currentMatchWeek = 1;
        player.season = (player.season || 1);

        if (!player.careerTimeline) player.careerTimeline = [];
        player.careerTimeline.unshift({
            date: new Date().toISOString(),
            event: 'Transfer',
            detail: `Signed for ${newClub} from ${oldClub} for ${formatCurrency(offer.offer.totalValue)} (${offer.offer.contractLength} yrs, ${formatCurrency(offer.offer.weeklyWage)}/wk)`,
            type: 'transfer'
        });

        if (oldLeague !== newLeague) player.leagueData = {};

        if (!player.mediaMentions) player.mediaMentions = [];
        player.mediaMentions.unshift({
            headline: `🚨 BREAKING: ${player.name} signs for ${newClub}!`,
            detail: `${player.name} completes move to ${newClub} worth ${formatCurrency(offer.offer.totalValue)}.`,
            date: new Date().toISOString(),
            type: 'transfer'
        });

        if (!player.transferHistory) player.transferHistory = [];
        player.transferHistory.unshift({
            from: oldClub,
            to: newClub,
            date: new Date().toISOString(),
            fee: offer.offer.totalValue,
            wage: offer.offer.weeklyWage,
            length: offer.offer.contractLength,
            season: player.season || 1
        });

        localStorage.removeItem('theJourney_transferRequest');
        localStorage.removeItem('theJourney_transferInterests');

        showToast(`✅ TRANSFER COMPLETE! ${player.name} joins ${newClub}!`, 'success');

        localStorage.setItem('theJourney_playerData', JSON.stringify(player));
        localStorage.setItem('theJourney_transferEvent', JSON.stringify({
            club: newClub,
            from: oldClub,
            wage: offer.offer.weeklyWage,
            fee: offer.offer.totalValue
        }));

        location.reload();
    }

    // ==================== REQUEST TRANSFER ====================
    function getRequestState() {
        return JSON.parse(localStorage.getItem('theJourney_transferRequest') || 'null');
    }
    function saveRequestState(state) {
        if (state === null) {
            localStorage.removeItem('theJourney_transferRequest');
        } else {
            localStorage.setItem('theJourney_transferRequest', JSON.stringify(state));
        }
    }

    function evaluateClubResponse() {
        const reputation = player.reputation || 0;
        const goals = player.goalsScored || 0;
        const assists = player.assists || 0;
        const refusalCount = (getRequestState() && getRequestState().refusalCount) || 0;

        let approvalChance = 0.25 + (reputation / 100) * 0.4 + Math.min(0.2, (goals + assists) * 0.01);
        approvalChance -= refusalCount * 0.12;
        approvalChance = Math.max(0.05, Math.min(0.9, approvalChance));

        return Math.random() < approvalChance;
    }

    function requestTransfer(windowType) {
        const targetWeek = windowType === 'half' ? HALF_SEASON_WEEK : END_SEASON_WEEK;
        const currentWeek = player.currentMatchWeek || 1;

        if (targetWeek <= currentWeek) {
            showToast('⚠️ That window has already passed this season.', 'warning');
            return;
        }

        const existing = getRequestState();
        const refusalCount = existing ? (existing.refusalCount || 0) : 0;
        const approved = evaluateClubResponse();

        if (approved) {
            saveRequestState({
                windowType,
                targetWeek,
                status: 'approved',
                refusalCount,
                requestedAt: new Date().toISOString()
            });
            if (!player.mediaMentions) player.mediaMentions = [];
            player.mediaMentions.unshift({
                headline: `📝 ${player.name} granted permission to leave ${player.club} at ${windowType === 'half' ? 'the half-season window' : 'the end of the season'}`,
                detail: `The club has agreed to let ${player.name} explore a transfer.`,
                date: new Date().toISOString(),
                type: 'transfer'
            });
            localStorage.setItem('theJourney_playerData', JSON.stringify(player));
            showToast('✅ Club approved your transfer request!', 'success');
        } else {
            const newRefusalCount = refusalCount + 1;
            const repLoss = Math.min(8, 2 + newRefusalCount * 2);
            player.reputation = Math.max(0, (player.reputation || 0) - repLoss);
            saveRequestState({
                windowType,
                targetWeek,
                status: 'rejected',
                refusalCount: newRefusalCount,
                requestedAt: new Date().toISOString()
            });
            localStorage.setItem('theJourney_playerData', JSON.stringify(player));
            showToast(`❌ Club rejected your request. Reputation -${repLoss}`, 'error');
        }
        renderRequestTransfer();
    }

    function cancelRequest() {
        saveRequestState(null);
        showToast('Request withdrawn.', 'info');
        renderRequestTransfer();
    }

    function checkRequestArrival() {
        const req = getRequestState();
        if (!req || req.status !== 'approved') return;
        const currentWeek = player.currentMatchWeek || 1;
        if (currentWeek >= req.targetWeek) {
            req.windowReached = true;
            saveRequestState(req);
        }
    }

    // ==================== RENDER REQUEST TRANSFER ====================
    function renderRequestTransfer() {
        const container = document.getElementById('requestTransferContainer');
        const badge = document.getElementById('requestStatusBadge');
        if (!container) return;

        const req = getRequestState();
        const currentWeek = player.currentMatchWeek || 1;

        if (!req) {
            if (badge) badge.textContent = 'No active request';
            container.innerHTML = `
                <p class="request-intro">Ask ${player.club || 'your club'} for permission to leave at a set point in the season. The club may refuse — repeated refusals cost reputation, so choose your moment.</p>
                <div class="window-options">
                    <button class="window-btn" id="btnRequestHalf" ${HALF_SEASON_WEEK <= currentWeek ? 'disabled' : ''}>
                        <span class="window-title"><i class="fa-solid fa-calendar-days"></i> Half Season</span>
                        <span class="window-sub">${HALF_SEASON_WEEK <= currentWeek ? 'Window already passed' : `Available from matchweek ${HALF_SEASON_WEEK}`}</span>
                    </button>
                    <button class="window-btn" id="btnRequestEnd" ${END_SEASON_WEEK <= currentWeek ? 'disabled' : ''}>
                        <span class="window-title"><i class="fa-solid fa-flag-checkered"></i> End of Season</span>
                        <span class="window-sub">${END_SEASON_WEEK <= currentWeek ? 'Window already passed' : `Available from matchweek ${END_SEASON_WEEK}`}</span>
                    </button>
                </div>
            `;
            const btnHalf = document.getElementById('btnRequestHalf');
            const btnEnd = document.getElementById('btnRequestEnd');
            if (btnHalf) btnHalf.addEventListener('click', () => requestTransfer('half'));
            if (btnEnd) btnEnd.addEventListener('click', () => requestTransfer('end'));
            return;
        }

        if (req.status === 'rejected') {
            if (badge) badge.textContent = 'Request rejected';
            container.innerHTML = `
                <div class="negotiation-result rejected">
                    <i class="fa-solid fa-circle-xmark"></i> Your last request was turned down by the club.
                </div>
                <p class="reputation-warning"><i class="fa-solid fa-triangle-exclamation"></i> Refusals lower reputation and make the next approval harder (${req.refusalCount} refusal${req.refusalCount > 1 ? 's' : ''} so far).</p>
                <div class="window-options" style="margin-top:10px;">
                    <button class="window-btn" id="btnRequestHalf" ${HALF_SEASON_WEEK <= currentWeek ? 'disabled' : ''}>
                        <span class="window-title"><i class="fa-solid fa-calendar-days"></i> Try Again — Half Season</span>
                        <span class="window-sub">${HALF_SEASON_WEEK <= currentWeek ? 'Window already passed' : `Available from matchweek ${HALF_SEASON_WEEK}`}</span>
                    </button>
                    <button class="window-btn" id="btnRequestEnd" ${END_SEASON_WEEK <= currentWeek ? 'disabled' : ''}>
                        <span class="window-title"><i class="fa-solid fa-flag-checkered"></i> Try Again — End of Season</span>
                        <span class="window-sub">${END_SEASON_WEEK <= currentWeek ? 'Window already passed' : `Available from matchweek ${END_SEASON_WEEK}`}</span>
                    </button>
                </div>
            `;
            const btnHalf = document.getElementById('btnRequestHalf');
            const btnEnd = document.getElementById('btnRequestEnd');
            if (btnHalf) btnHalf.addEventListener('click', () => requestTransfer('half'));
            if (btnEnd) btnEnd.addEventListener('click', () => requestTransfer('end'));
            return;
        }

        // status === 'approved'
        const weeksLeft = Math.max(0, req.targetWeek - currentWeek);
        const totalSpan = Math.max(1, req.targetWeek - 1);
        const elapsed = Math.max(0, currentWeek - 1);
        const progressPct = Math.min(100, Math.round((elapsed / totalSpan) * 100));

        if (badge) badge.textContent = weeksLeft === 0 ? 'Window open!' : `${weeksLeft} week${weeksLeft > 1 ? 's' : ''} remaining`;

        container.innerHTML = `
            <div class="request-pending">
                <div class="request-pending-header">
                    <i class="fa-solid fa-check-circle" style="color:#21ba45;"></i>
                    Transfer request approved!
                </div>
                ${weeksLeft > 0 ? `
                    <div class="request-countdown">${weeksLeft}</div>
                    <div class="request-countdown-label">weeks until window opens</div>
                    <div class="request-progress-track">
                        <div class="request-progress-fill" style="width:${progressPct}%;"></div>
                    </div>
                    <div class="request-detail-row">
                        <span>Window</span>
                        <span>${req.windowType === 'half' ? 'Half Season' : 'End of Season'}</span>
                    </div>
                    <div class="request-detail-row">
                        <span>Target Matchweek</span>
                        <span>${req.targetWeek}</span>
                    </div>
                ` : `
                    <div style="color:#21ba45;font-weight:700;font-size:1.1rem;margin:8px 0;">
                        🚪 WINDOW IS NOW OPEN! You can accept offers.
                    </div>
                `}
                <button class="btn-cancel-request" id="btnCancelRequest">Cancel Request</button>
            </div>
        `;
        const btnCancel = document.getElementById('btnCancelRequest');
        if (btnCancel) btnCancel.addEventListener('click', cancelRequest);
    }

    // ==================== RENDER INTERESTED CLUBS ====================
    function renderInterestedClubs() {
        const container = document.getElementById('interestedClubsContainer');
        if (!container) return;

        const interests = loadInterests(false);
        
        // Update badges
        const totalOffers = document.getElementById('totalOffers');
        const avgInterest = document.getElementById('avgInterest');
        
        const activeInterests = interests.filter(i => i.status === 'interested' || i.status === 'countered');
        if (totalOffers) totalOffers.textContent = activeInterests.length;
        
        if (avgInterest) {
            const avg = activeInterests.length > 0 
                ? Math.round(activeInterests.reduce((s, i) => s + i.interestLevel, 0) / activeInterests.length)
                : '—';
            avgInterest.textContent = avg !== '—' ? avg + '%' : '—';
        }

        if (activeInterests.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fa-solid fa-building"></i>
                    <p>No clubs are currently interested in you.</p>
                    <p class="empty-sub">Perform well on the pitch to attract attention.</p>
                </div>
            `;
            return;
        }

        let html = '';
        activeInterests.forEach((item, index) => {
            const isInterested = item.status === 'interested';
            const isCountered = item.status === 'countered';
            const interestColor = item.interestLevel >= 70 ? '#21ba45' : (item.interestLevel >= 40 ? '#fbbd08' : '#db2828');
            
            html += `
                <div class="club-interest-card" data-index="${index}">
                    <div class="interest-header">
                        <div>
                            <div class="club-name">${item.club}</div>
                            <div class="club-league">${item.league}</div>
                            <div class="club-rating">⭐ ${item.rating} · Prestige ${item.prestige}</div>
                        </div>
                        <div class="interest-meter">
                            <div class="interest-label">${item.interestLevel}%</div>
                            <div class="interest-bar-track">
                                <div class="interest-bar" style="width:${item.interestLevel}%; background:${interestColor};"></div>
                            </div>
                        </div>
                    </div>
                    <div class="offer-details">
                        <div class="offer-grid">
                            <div class="offer-item">
                                <span class="offer-label">Weekly Wage</span>
                                <span class="offer-value">${formatCurrency(item.offer.weeklyWage)}</span>
                            </div>
                            <div class="offer-item">
                                <span class="offer-label">Contract</span>
                                <span class="offer-value">${item.offer.contractLength} years</span>
                            </div>
                            <div class="offer-item">
                                <span class="offer-label">Signing Bonus</span>
                                <span class="offer-value">${formatCurrency(item.offer.signingBonus)}</span>
                            </div>
                            <div class="offer-item">
                                <span class="offer-label">Total Value</span>
                                <span class="offer-value highlight">${formatCurrency(item.offer.totalValue)}</span>
                            </div>
                        </div>
                    </div>
                    ${isCountered ? `<div style="color:#fbbd08;font-size:0.8rem;margin-bottom:8px;">🔄 Counter-offer sent</div>` : ''}
                    <div class="offer-actions">
                        ${isInterested ? `
                            <button class="btn-transfer btn-accept" data-index="${index}" data-action="accept">Accept</button>
                            <button class="btn-transfer btn-negotiate" data-index="${index}" data-action="counter_wage">💰 Wage</button>
                            <button class="btn-transfer btn-negotiate" data-index="${index}" data-action="counter_length">📅 Length</button>
                            <button class="btn-transfer btn-negotiate" data-index="${index}" data-action="counter_bonus">🎁 Bonus</button>
                            <button class="btn-transfer btn-reject" data-index="${index}" data-action="reject">Reject</button>
                        ` : ''}
                        ${isCountered ? `
                            <button class="btn-transfer btn-accept" data-index="${index}" data-action="accept">Accept</button>
                            <button class="btn-transfer btn-reject" data-index="${index}" data-action="reject">Reject</button>
                        ` : ''}
                        ${item.status === 'accepted' ? `<span style="color:#21ba45;font-weight:700;">✅ Accepted</span>` : ''}
                        ${item.status === 'rejected' ? `<span style="color:#db2828;font-weight:700;">❌ Rejected</span>` : ''}
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;

        // Event listeners
        container.querySelectorAll('[data-action]').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                const action = this.dataset.action;
                const interests = loadInterests(false);
                if (!interests || !interests[index]) return;

                const updated = negotiateOffer(interests[index], action);
                interests[index] = updated;
                saveInterests(interests);

                if (updated.status === 'accepted') {
                    executeTransfer(updated);
                } else {
                    renderInterestedClubs();
                    if (updated.status === 'rejected') {
                        showToast('Offer rejected.', 'warning');
                    } else if (updated.status === 'countered') {
                        showToast('Counter-offer sent to club.', 'info');
                    }
                }
            });
        });
    }

    // ==================== RENDER TRANSFER HISTORY ====================
    function renderTransferHistory() {
        const container = document.getElementById('transferHistoryContainer');
        if (!container) return;

        const history = player.transferHistory || [];
        if (history.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fa-solid fa-clock-rotate-left"></i>
                    <p>No transfer history yet.</p>
                    <p class="empty-sub">Your first transfer will appear here.</p>
                </div>
            `;
            return;
        }

        let html = '<div class="history-timeline">';
        history.forEach((h, i) => {
            const isLatest = i === 0;
            html += `
                <div class="history-item ${isLatest ? 'latest' : ''}">
                    <div class="history-icon"><i class="fa-solid fa-${isLatest ? 'circle-check' : 'circle'}" style="color:${isLatest ? '#21ba45' : '#55555e'};"></i></div>
                    <div class="history-content">
                        <div class="history-header">
                            <span class="history-club-from">${h.from}</span>
                            <span class="history-arrow">→</span>
                            <span class="history-club-to">${h.to}</span>
                            <span class="history-date">${new Date(h.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        </div>
                        <div class="history-details">
                            <span class="history-fee">${formatCurrency(h.fee)}</span>
                            <span class="history-wage">${formatCurrency(h.wage)}/wk</span>
                            <span class="history-length">${h.length} yrs</span>
                            <span class="history-season">S${h.season}</span>
                            ${isLatest ? '<span style="color:#21ba45;font-weight:700;">📌 Latest</span>' : ''}
                        </div>
                    </div>
                </div>
            `;
        });
        html += '</div>';
        container.innerHTML = html;
    }

    // ==================== RENDER TRANSFER SCENE ====================
    function renderTransferScene() {
        const container = document.getElementById('transferSceneContainer');
        if (!container) return;

        const event = JSON.parse(localStorage.getItem('theJourney_transferEvent') || 'null');
        
        if (event) {
            container.innerHTML = `
                <div class="transfer-scene active">
                    <div class="scene-header">
                        <span class="scene-icon">🔄</span>
                        <h3>TRANSFER COMPLETE!</h3>
                    </div>
                    <div class="scene-content">
                        <div class="scene-player">
                            <div class="scene-avatar">
                                ${savedFace ? `<img src="${savedFace}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">` : '<i class="fa-solid fa-user"></i>'}
                            </div>
                            <div class="scene-name">${player.name}</div>
                            <div class="scene-position">${player.position || '—'}</div>
                        </div>
                        <div class="scene-arrow">✈️</div>
                        <div class="scene-club">
                            <div class="scene-club-name">${event.club}</div>
                            <div class="scene-club-detail">From ${event.from}</div>
                            <div class="scene-club-detail">${formatCurrency(event.wage)}/wk · ${formatCurrency(event.fee)} total</div>
                        </div>
                    </div>
                    <div class="scene-footer">
                        <button class="btn-primary" id="btnDismissTransferScene">
                            <i class="fa-solid fa-check"></i> Continue
                        </button>
                    </div>
                </div>
            `;
            document.getElementById('btnDismissTransferScene')?.addEventListener('click', () => {
                localStorage.removeItem('theJourney_transferEvent');
                renderTransferScene();
            });
        } else {
            container.innerHTML = `
                <div class="transfer-scene idle">
                    <div class="scene-idle-content">
                        <i class="fa-solid fa-handshake"></i>
                        <p>Transfer market is open</p>
                        <p class="scene-sub">Negotiate with interested clubs or request a move</p>
                    </div>
                </div>
            `;
        }
    }

    // ==================== RENDER MARKET STATS ====================
    function renderMarketStats() {
        const marketValue = document.getElementById('marketValue');
        const marketTrophies = document.getElementById('marketTrophies');
        const marketReputation = document.getElementById('marketReputation');
        const marketSeason = document.getElementById('marketSeason');

        if (marketValue) marketValue.textContent = formatCurrency(getPlayerMarketValue());
        if (marketTrophies) marketTrophies.textContent = (player.trophies || []).length;
        if (marketReputation) marketReputation.textContent = player.reputation || 0;
        if (marketSeason) marketSeason.textContent = player.season || 1;
    }

    // ==================== TOAST SYSTEM ====================
    function showToast(msg, type) {
        const container = document.getElementById('toastContainer');
        if (!container) {
            // Create container if not exists
            const newContainer = document.createElement('div');
            newContainer.id = 'toastContainer';
            newContainer.className = 'toast-container';
            document.body.appendChild(newContainer);
            const toast = document.createElement('div');
            toast.className = 'toast toast-' + (type || 'info');
            toast.textContent = msg;
            newContainer.appendChild(toast);
            setTimeout(() => {
                toast.classList.add('toast-out');
                setTimeout(() => toast.remove(), 400);
            }, 3500);
            return;
        }
        const toast = document.createElement('div');
        toast.className = 'toast toast-' + (type || 'info');
        toast.textContent = msg;
        container.appendChild(toast);
        setTimeout(() => {
            toast.classList.add('toast-out');
            setTimeout(() => toast.remove(), 400);
        }, 3500);
    }

    // ==================== NAVIGATION ====================
    function bindNav() {
        const nt = document.getElementById('navToggle');
        const nl = document.getElementById('navLinks');
        if (nt && nl) {
            nt.addEventListener('click', () => nl.classList.toggle('open'));
            document.addEventListener('click', (e) => {
                const nav = document.getElementById('globalNav');
                if (nav && !nav.contains(e.target) && nl.classList.contains('open')) {
                    nl.classList.remove('open');
                }
            });
        }
    }

    // ==================== REFRESH ====================
    function refreshMarket() {
        const newInterests = generateClubInterests();
        saveInterests(newInterests);
        renderInterestedClubs();
        showToast('🔄 Transfer market refreshed! New offers may appear.', 'info');
    }

    // ==================== INIT ====================
    function init() {
        renderTransferScene();
        renderRequestTransfer();
        renderInterestedClubs();
        renderTransferHistory();
        renderMarketStats();
        checkRequestArrival();
        bindNav();

        document.getElementById('btnRefreshInterests')?.addEventListener('click', refreshMarket);
    }

    document.addEventListener('DOMContentLoaded', init);

})();
