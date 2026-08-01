// ==================== transfer.js (v7 - CLEAN UI, FOCUS ON TRANSFERS) ====================
(function() {
    'use strict';

    const player = JSON.parse(localStorage.getItem('theJourney_playerData') || 'null');
    if (!player || !player.name) {
        window.location.href = 'index.html';
        return;
    }

    // --- SAVED FACE ---
    const savedFace = localStorage.getItem('theJourney_playerFace') || player.faceImage || '';

    // --- DATABASE KELAB DUNIA (ringkas) ---
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
            'West Ham': { rating: 79, budget: 70000000, prestige: 72 }
        },
        "La Liga": {
            'Real Madrid': { rating: 90, budget: 220000000, prestige: 98 },
            'Barcelona': { rating: 88, budget: 180000000, prestige: 96 },
            'Atletico Madrid': { rating: 85, budget: 120000000, prestige: 88 }
        },
        "Bundesliga": {
            'Bayern Munich': { rating: 88, budget: 180000000, prestige: 94 },
            'Borussia Dortmund': { rating: 85, budget: 120000000, prestige: 88 }
        },
        "Serie A": {
            'Inter Milan': { rating: 87, budget: 160000000, prestige: 92 },
            'AC Milan': { rating: 86, budget: 140000000, prestige: 90 },
            'Juventus': { rating: 85, budget: 130000000, prestige: 89 }
        }
    };

    // --- HELPER FUNCTIONS ---
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
        if (value >= 1000000) return `€${(value / 1000000).toFixed(1)}M`;
        if (value >= 1000) return `€${Math.round(value / 1000)}K`;
        return `€${value}`;
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

    // --- GENERATE CLUB INTEREST ---
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

    // --- NEGOTIATION ---
    function negotiateOffer(offer, action) {
        const current = { ...offer };
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

    // --- EXECUTE TRANSFER ---
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

        showToast(`✅ TRANSFER COMPLETE! ${player.name} joins ${newClub}!`, 'success');

        localStorage.setItem('theJourney_playerData', JSON.stringify(player));
        localStorage.setItem('theJourney_transferEvent', JSON.stringify({
            club: newClub,
            from: oldClub,
            wage: offer.offer.weeklyWage,
            fee: offer.offer.totalValue
        }));

        // Force refresh page to show Transfer Scene
        location.reload();
    }

    // --- TOAST ---
    function showToast(msg, type = 'info') {
        const container = document.getElementById('toastContainer');
        if (!container) return;
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = msg;
        container.appendChild(toast);
        setTimeout(() => {
            toast.classList.add('toast-out');
            setTimeout(() => toast.remove(), 400);
        }, 4500);
    }

    // ==================== RENDER FUNCTIONS ====================

    function renderInterestedClubs(interests) {
        const container = document.getElementById('interestedClubsContainer');
        if (!container) return;

        if (!interests || interests.length === 0) {
            container.innerHTML = `
                <div class="empty-state transfer-empty">
                    <i class="fa-solid fa-building-circle-check"></i>
                    <p>No clubs are currently interested in you.</p>
                    <p class="empty-sub">Keep performing well to attract attention!</p>
                </div>
            `;
            return;
        }

        let html = '';
        interests.forEach((interest, index) => {
            const color = interest.interestLevel > 75 ? '#21ba45' : (interest.interestLevel > 50 ? '#fbbd08' : '#f2711c');
            html += `
                <div class="club-interest-card" data-index="${index}">
                    <div class="interest-header">
                        <div class="club-info">
                            <div class="club-name">${interest.club}</div>
                            <div class="club-league">${interest.league}</div>
                            <div class="club-rating">⭐ ${interest.rating} · ${interest.prestige} Prestige</div>
                        </div>
                        <div class="interest-meter">
                            <div class="interest-bar" style="width:${interest.interestLevel}%; background:${color};"></div>
                            <span class="interest-label">${interest.interestLevel}%</span>
                        </div>
                    </div>
                    <div class="offer-details">
                        <div class="offer-grid">
                            <div class="offer-item">
                                <span class="offer-label">Weekly Wage</span>
                                <span class="offer-value">${formatCurrency(interest.offer.weeklyWage)}</span>
                            </div>
                            <div class="offer-item">
                                <span class="offer-label">Contract Length</span>
                                <span class="offer-value">${interest.offer.contractLength} years</span>
                            </div>
                            <div class="offer-item">
                                <span class="offer-label">Signing Bonus</span>
                                <span class="offer-value">${formatCurrency(interest.offer.signingBonus)}</span>
                            </div>
                            <div class="offer-item">
                                <span class="offer-label">Total Value</span>
                                <span class="offer-value highlight">${formatCurrency(interest.offer.totalValue)}</span>
                            </div>
                        </div>
                    </div>
                    <div class="offer-actions">
                        <button class="btn-transfer btn-accept" onclick="window.transferSystem.acceptOffer(${index})">
                            <i class="fa-solid fa-check"></i> Accept
                        </button>
                        <button class="btn-transfer btn-negotiate" onclick="window.transferSystem.showNegotiation(${index})">
                            <i class="fa-solid fa-arrows-rotate"></i> Negotiate
                        </button>
                        <button class="btn-transfer btn-reject" onclick="window.transferSystem.rejectOffer(${index})">
                            <i class="fa-solid fa-xmark"></i> Reject
                        </button>
                    </div>
                    <div class="negotiation-panel" id="negotiationPanel_${index}" style="display:none;">
                        <div class="negotiation-options">
                            <h4>✏️ Negotiate Contract</h4>
                            <div class="neg-buttons">
                                <button onclick="window.transferSystem.counterOffer(${index}, 'counter_wage')">
                                    <i class="fa-solid fa-coins"></i> Higher Wage
                                </button>
                                <button onclick="window.transferSystem.counterOffer(${index}, 'counter_length')">
                                    <i class="fa-solid fa-calendar-plus"></i> Longer Contract
                                </button>
                                <button onclick="window.transferSystem.counterOffer(${index}, 'counter_bonus')">
                                    <i class="fa-solid fa-gift"></i> Higher Bonus
                                </button>
                                <button onclick="window.transferSystem.closeNegotiation(${index})">
                                    <i class="fa-solid fa-xmark"></i> Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        container.innerHTML = html;
    }

    function renderTransferHistory() {
        const container = document.getElementById('transferHistoryContainer');
        if (!container) return;
        const history = player.transferHistory || [];
        if (history.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fa-solid fa-clock-rotate-left"></i>
                    <p>No transfer history yet.</p>
                </div>
            `;
            return;
        }
        let html = '<div class="history-timeline">';
        history.forEach((t, i) => {
            const isFirst = i === 0;
            html += `
                <div class="history-item ${isFirst ? 'latest' : ''}">
                    <div class="history-icon">${isFirst ? '🔄' : '📋'}</div>
                    <div class="history-content">
                        <div class="history-header">
                            <span class="history-club-from">${t.from}</span>
                            <span class="history-arrow">➜</span>
                            <span class="history-club-to">${t.to}</span>
                            <span class="history-date">${new Date(t.date).toLocaleDateString()}</span>
                        </div>
                        <div class="history-details">
                            <span class="history-fee">${formatCurrency(t.fee)}</span>
                            <span class="history-wage">${formatCurrency(t.wage)}/wk</span>
                            <span class="history-length">${t.length} yrs</span>
                            <span class="history-season">S${t.season}</span>
                        </div>
                    </div>
                </div>
            `;
        });
        html += '</div>';
        container.innerHTML = html;
    }

    function renderTransferScene() {
        const container = document.getElementById('transferSceneContainer');
        if (!container) return;
        const event = JSON.parse(localStorage.getItem('theJourney_transferEvent') || 'null');
        if (event) {
            container.innerHTML = `
                <div class="transfer-scene active">
                    <div class="scene-header">
                        <span class="scene-icon">✈️</span>
                        <h3>TRANSFER COMPLETE</h3>
                    </div>
                    <div class="scene-content">
                        <div class="scene-player">
                            <div class="scene-avatar">
                                ${savedFace ? `<img src="${savedFace}" alt="${player.name}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">` : '<i class="fa-solid fa-user"></i>'}
                            </div>
                            <div class="scene-name">${player.name}</div>
                            <div class="scene-position">${player.position || '—'}</div>
                        </div>
                        <div class="scene-arrow">➜</div>
                        <div class="scene-club">
                            <div class="scene-club-name">${event.club}</div>
                            <div class="scene-club-detail">From ${event.from}</div>
                            <div class="scene-club-detail">${formatCurrency(event.wage)}/wk</div>
                        </div>
                    </div>
                    <div class="scene-footer">
                        <button class="btn-primary" onclick="localStorage.removeItem('theJourney_transferEvent'); location.reload();">
                            <i class="fa-solid fa-check"></i> Continue Career
                        </button>
                    </div>
                </div>
            `;
        } else {
            container.innerHTML = `
                <div class="transfer-scene idle">
                    <div class="scene-idle-content">
                        <i class="fa-solid fa-arrows-spin"></i>
                        <p><strong>Transfer Market</s