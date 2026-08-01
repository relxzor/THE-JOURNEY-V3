// ==================== dashboard.js (FULL UPDATED VERSION) ====================
// THE JOURNEY — Dashboard Controller

(function() {
    'use strict';

    // ==================== GET PLAYER DATA ====================
    function getPlayerData() {
        const data = localStorage.getItem('theJourney_playerData');
        if (!data) {
            window.location.href = 'index.html';
            return null;
        }
        try {
            return JSON.parse(data);
        } catch (e) {
            window.location.href = 'index.html';
            return null;
        }
    }

    const player = getPlayerData();
    if (!player) return;

    // ==================== HELPER FUNCTIONS ====================
    function formatNumber(num) {
        if (num === undefined || num === null) return '0';
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    }

    function formatCurrency(num) {
        if (num === undefined || num === null) return '£0';
        if (num >= 1000000) return '£' + (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return '£' + (num / 1000).toFixed(1) + 'K';
        return '£' + num.toString();
    }

    function calculateMarketValue(p) {
        const ovr = p.ovr || 60;
        const age = p.age || 20;
        let value = Math.pow(Math.max(1, ovr - 40), 3.8) * 25;
        let ageMult = 1;
        if (age <= 20) ageMult = 1.25;
        else if (age <= 27) ageMult = 1.15;
        else if (age <= 30) ageMult = 0.9;
        else if (age <= 33) ageMult = 0.6;
        else if (age <= 36) ageMult = 0.35;
        else ageMult = 0.15;
        value *= ageMult;
        const formBonus = Math.min(value * 0.35, (p.goalsScored || 0) * 30000 + (p.assists || 0) * 20000);
        value += formBonus;
        value += (p.trophies || []).length * 250000;
        return Math.max(10000, Math.round(value / 1000) * 1000);
    }

    // ==================== POPULATE PLAYER HEADER ====================
    document.getElementById('dashPlayerName').textContent = player.name || 'Unknown';
    document.getElementById('dashPosition').textContent = player.position || '—';
    document.getElementById('dashAge').textContent = 'Age: ' + (player.age || 15);
    document.getElementById('dashNationality').textContent = player.nationality || '—';
    document.getElementById('dashClub').textContent = player.club || player.academy || '—';

    const ovr = player.ovr || 45;
    document.getElementById('dashOVR').textContent = ovr;
    document.getElementById('dashMatches').textContent = player.matchesPlayed || 0;
    document.getElementById('dashGoals').textContent = player.goalsScored || 0;
    document.getElementById('dashAssists').textContent = player.assists || 0;

    // Market Value
    const marketVal = player.marketValue || calculateMarketValue(player);
    document.getElementById('dashMarketValue').textContent = formatCurrency(marketVal);

    // ==================== PLAYER FACE ====================
    const dashFaceContainer = document.getElementById('dashFaceContainer');
    if (dashFaceContainer) {
        const savedFace = localStorage.getItem('theJourney_playerFace') || player.faceImage || '';
        if (savedFace) {
            const img = document.createElement('img');
            img.src = savedFace;
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            img.style.borderRadius = '50%';
            dashFaceContainer.innerHTML = '';
            dashFaceContainer.appendChild(img);
        }
    }

    // ==================== OVR RING ====================
    const ovrCircle = document.getElementById('ovrRingCircle');
    if (ovrCircle) {
        const circumference = 2 * Math.PI * 52;
        const offset = circumference - (ovr / 99 * circumference);
        ovrCircle.setAttribute('stroke-dashoffset', offset);
    }

    // ==================== CLUB LOGO ====================
    const clubLogo = document.getElementById('dashClubLogo');
    if (clubLogo) {
        const clubLogos = {
            'Arsenal': 'https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Arsenal_FC.svg/1200px-Arsenal_FC.svg.png',
            'Manchester City': 'https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/1200px-Manchester_City_FC_badge.svg.png',
            'Liverpool': 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/1200px-Liverpool_FC.svg.png',
            'Chelsea': 'https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/1200px-Chelsea_FC.svg.png',
            'Manchester United': 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/1200px-Manchester_United_FC_crest.svg.png',
            'Tottenham': 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b4/Tottenham_Hotspur.svg/1200px-Tottenham_Hotspur.svg.png',
            'Newcastle': 'https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Newcastle_United_FC_logo.svg/1200px-Newcastle_United_FC_logo.svg.png',
            'Aston Villa': 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/Aston_Villa_FC_crest.svg/1200px-Aston_Villa_FC_crest.svg.png',
            'Brighton': 'https://upload.wikimedia.org/wikipedia/en/thumb/f/fd/Brighton_%26_Hove_Albion_logo.svg/1200px-Brighton_%26_Hove_Albion_logo.svg.png',
            'West Ham': 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/West_Ham_United_FC_logo.svg/1200px-West_Ham_United_FC_logo.svg.png',
            'Real Madrid': 'https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png',
            'Barcelona': 'https://upload.wikimedia.org/wikipedia/en/thumb/4/47/FC_Barcelona_%28crest%29.svg/1200px-FC_Barcelona_%28crest%29.svg.png',
            'Atletico Madrid': 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f4/Atletico_Madrid_2024_logo.svg/1200px-Atletico_Madrid_2024_logo.svg.png',
            'Bayern Munich': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg/1200px-FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg.png',
            'Borussia Dortmund': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Borussia_Dortmund_logo.svg/1200px-Borussia_Dortmund_logo.svg.png',
            'Inter Milan': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/FC_Internazionale_Milano_2021.svg/1200px-FC_Internazionale_Milano_2021.svg.png',
            'AC Milan': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/AC_Milan_logo.svg/1200px-AC_Milan_logo.svg.png',
            'Juventus': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Juventus_FC_2017_logo.svg/1200px-Juventus_FC_2017_logo.svg.png',
            'Napoli': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/SSC_Napoli_logo.svg/1200px-SSC_Napoli_logo.svg.png'
        };
        const logoUrl = clubLogos[player.club] || '';
        if (logoUrl) {
            clubLogo.src = logoUrl;
            clubLogo.style.display = 'block';
        } else {
            clubLogo.style.display = 'none';
        }
    }

    // ==================== ATTRIBUTE SUMMARY ====================
    const attrList = document.getElementById('attrSummaryList');
    if (attrList) {
        const attrs = player.attributes || {};
        const keyAttrs = [
            { key: 'acceleration', label: 'Acceleration' },
            { key: 'sprintSpeed', label: 'Sprint Speed' },
            { key: 'stamina', label: 'Stamina' },
            { key: 'ballControl', label: 'Ball Control' },
            { key: 'passing', label: 'Passing' },
            { key: 'finishing', label: 'Finishing' },
            { key: 'dribbling', label: 'Dribbling' },
            { key: 'composure', label: 'Composure' },
            { key: 'strength', label: 'Strength' },
            { key: 'vision', label: 'Vision' },
            { key: 'doubleTouch', label: 'Double Touch' }
        ];
        let html = '';
        keyAttrs.forEach(a => {
            const val = attrs[a.key] || 40;
            const color = val >= 80 ? '#21ba45' : (val >= 65 ? '#fbbd08' : '#db2828');
            html += `
                <div class="attr-summary-row">
                    <span>${a.label}</span>
                    <div class="attr-mini-bar">
                        <div class="attr-mini-fill" style="width:${Math.min(100, val)}%; background:${color};"></div>
                    </div>
                    <span class="attr-val">${Math.round(val)}</span>
                </div>
            `;
        });
        attrList.innerHTML = html;
    }

    // ==================== FITNESS ====================
    const stamina = player.attributes?.stamina || 40;
    const fatigue = player.fatigue || 0;
    const morale = player.morale || 70;
    const injuryRes = player.attributes?.injuryResistance || 42;
    const injuryRisk = Math.max(5, Math.min(90, Math.round((100 - injuryRes) * 0.4 + fatigue * 0.3)));

    document.getElementById('staminaBar').style.width = stamina + '%';
    document.getElementById('staminaValue').textContent = stamina + '%';
    document.getElementById('fatigueBar').style.width = fatigue + '%';
    document.getElementById('fatigueValue').textContent = fatigue + '%';
    document.getElementById('moraleBar').style.width = morale + '%';
    document.getElementById('moraleValue').textContent = morale + '%';
    document.getElementById('injuryRiskBar').style.width = injuryRisk + '%';
    document.getElementById('injuryRiskValue').textContent = injuryRisk + '%';

    const injuryStatus = document.getElementById('injuryStatusDisplay');
    if (player.injuryStatus && player.injuryStatus !== 'Fit') {
        injuryStatus.className = 'injury-status injured';
        injuryStatus.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Status: <strong>' + player.injuryStatus + '</strong>';
    }

    // ==================== FINANCIAL ====================
    document.getElementById('dashBalance').textContent = formatCurrency(player.bankBalance || 500);
    document.getElementById('dashSalary').textContent = formatCurrency(player.salary || 200);
    document.getElementById('dashMarketVal').textContent = formatCurrency(marketVal);
    
    const sponsorIncome = (player.sponsors || []).reduce((sum, s) => sum + (s.value || 0), 0);
    document.getElementById('dashSponsorIncome').textContent = formatCurrency(sponsorIncome);
    document.getElementById('dashExpenses').textContent = formatCurrency(Math.round((player.salary || 200) * 0.375));

    // ==================== TRANSFER OFFERS (BARU) ====================
    // Baca dari localStorage yang disimpan oleh transfer.js
    const transferInterests = JSON.parse(localStorage.getItem('theJourney_transferInterests') || 'null');
    const offerCount = transferInterests ? transferInterests.filter(i => i.status === 'interested' || i.status === 'countered').length : 0;
    
    // Cari atau create stat card untuk transfer offers
    let statContainer = document.querySelector('.player-quick-stats');
    if (statContainer) {
        // Check if transfer offer stat already exists
        let existingStat = statContainer.querySelector('.quick-stat.transfer-stat');
        if (!existingStat) {
            const transferStat = document.createElement('div');
            transferStat.className = 'quick-stat transfer-stat';
            transferStat.innerHTML = `
                <span class="quick-stat-value" id="dashTransferOffers">${offerCount}</span>
                <span class="quick-stat-label">Transfer Offers</span>
            `;
            statContainer.appendChild(transferStat);
        } else {
            document.getElementById('dashTransferOffers').textContent = offerCount;
        }
    }

    // ==================== TIMELINE ====================
    const timelineList = document.getElementById('timelineList');
    if (timelineList) {
        const timeline = player.careerTimeline || [];
        if (timeline.length > 0) {
            const recent = timeline.slice(-5).reverse();
            let html = '';
            recent.forEach(item => {
                const date = new Date(item.date);
                const dateStr = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
                const icon = item.type === 'transfer' ? '🔄' : 
                            item.type === 'training' ? '💪' : 
                            item.type === 'trophy' ? '🏆' : '⚽';
                html += `
                    <div class="timeline-item ${item.type || ''}">
                        <span class="tl-date">${dateStr}</span>
                        <span class="tl-icon">${icon}</span>
                        <span class="tl-detail">${item.detail || item.event}</span>
                    </div>
                `;
            });
            timelineList.innerHTML = html;
        } else {
            timelineList.innerHTML = `
                <div class="timeline-item empty">
                    <span>No career events yet. Start your journey!</span>
                </div>
            `;
        }
    }

    // ==================== MEDIA FEED ====================
    const mediaFeed = document.getElementById('mediaFeedMini');
    if (mediaFeed) {
        const mentions = player.mediaMentions || [];
        if (mentions.length > 0) {
            let html = '';
            mentions.slice(-4).reverse().forEach(m => {
                const text = typeof m === 'string' ? m : m.headline || m.detail || 'Media mention';
                html += `
                    <div class="media-feed-item">
                        <i class="fa-solid fa-circle" style="color:#fbbd08;font-size:0.5rem;"></i>
                        <span>${text}</span>
                    </div>
                `;
            });
            mediaFeed.innerHTML = html;
        } else {
            mediaFeed.innerHTML = `
                <div class="media-feed-item">
                    <i class="fa-solid fa-circle" style="color:#3a3f4b;font-size:0.5rem;"></i>
                    <span>No media coverage yet. Make headlines on the pitch.</span>
                </div>
            `;
        }
    }

    // ==================== NAVIGATION TOGGLE ====================
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });
        document.addEventListener('click', (e) => {
            if (!document.getElementById('globalNav').contains(e.target) && navLinks.classList.contains('open')) {
                navLinks.classList.remove('open');
            }
        });
    }

    // ==================== RESET BUTTON ====================
    const btnReset = document.getElementById('btnResetCareer');
    if (btnReset) {
        btnReset.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('⚠️ Reset your entire career? This cannot be undone.')) {
                localStorage.removeItem('theJourney_playerData');
                localStorage.removeItem('theJourney_gameStarted');
                localStorage.removeItem('theJourney_playerFace');
                localStorage.removeItem('theJourney_transferInterests');
                localStorage.removeItem('theJourney_transferEvent');
                window.location.href = 'index.html';
            }
        });
    }

    // ==================== TOAST SYSTEM ====================
    function showToast(msg, type) {
        const container = document.getElementById('toastContainer');
        if (!container) return;
        const toast = document.createElement('div');
        toast.className = 'toast ' + (type || 'info');
        toast.textContent = msg;
        container.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(130%)';
            toast.style.transition = 'all 0.35s ease';
            setTimeout(() => toast.remove(), 350);
        }, 3000);
    }

    // ==================== SEASON PROGRESS BAR ====================
    const week = player.currentMatchWeek || 1;
    const maxWeeks = 38;
    const progressPct = Math.min(100, Math.round((week / maxWeeks) * 100));
    
    // Add season progress bar if not exists
    const mainContent = document.querySelector('.dashboard-main');
    if (mainContent) {
        let progressSection = document.querySelector('.season-progress-section');
        if (!progressSection) {
            progressSection = document.createElement('section');
            progressSection.className = 'dash-card season-progress-section';
            progressSection.innerHTML = `
                <h3 class="card-title"><i class="fa-solid fa-calendar"></i> Season Progress</h3>
                <div class="season-progress">
                    <div class="season-progress-bar">
                        <div class="season-progress-fill" style="width:${progressPct}%;"></div>
                    </div>
                    <div class="season-progress-info">
                        <span>Week ${week} of ${maxWeeks}</span>
                        <span>${progressPct}% Complete</span>
                    </div>
                </div>
            `;
            // Insert after player header
            const headerCard = document.getElementById('playerHeaderCard');
            if (headerCard) {
                headerCard.insertAdjacentElement('afterend', progressSection);
            }
        } else {
            const fill = progressSection.querySelector('.season-progress-fill');
            const info = progressSection.querySelector('.season-progress-info');
            if (fill) fill.style.width = progressPct + '%';
            if (info) {
                const spans = info.querySelectorAll('span');
                if (spans.length >= 2) {
                    spans[0].textContent = `Week ${week} of ${maxWeeks}`;
                    spans[1].textContent = `${progressPct}% Complete`;
                }
            }
        }
    }

    // ==================== CONSOLE LOG ====================
    console.log('%c⚽ DASHBOARD LOADED %c| %c' + (player.name || 'Player') + ' %c| Week ' + (player.currentMatchWeek || 1),
        'color:#00e676;font-weight:bold;', 'color:#b0b0ba;', 'color:#fff;', 'color:#787882;');

    // ==================== AUTO REFRESH TRANSFER OFFERS ====================
    // Refresh transfer offers every 30 seconds
    setInterval(() => {
        const freshInterests = JSON.parse(localStorage.getItem('theJourney_transferInterests') || 'null');
        const newCount = freshInterests ? freshInterests.filter(i => i.status === 'interested' || i.status === 'countered').length : 0;
        const offerEl = document.getElementById('dashTransferOffers');
        if (offerEl) {
            const currentCount = parseInt(offerEl.textContent) || 0;
            if (newCount !== currentCount) {
                offerEl.textContent = newCount;
                if (newCount > currentCount) {
                    showToast('📩 New transfer offer received! Check Transfers page.', 'info');
                }
            }
        }
    }, 30000);

})();