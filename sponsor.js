// ==================== sponsor.js ====================
// THE JOURNEY — Sponsor Hub dengan 1x Accept & Contract Renewal

(function() {
    const player = JSON.parse(localStorage.getItem('theJourney_playerData') || 'null');
    if (!player) { window.location.href = 'index.html'; return; }

    // ==================== DISPLAY REPUTATION ====================
    document.getElementById('repValue').textContent = player.reputation || 0;

    // ==================== CURRENT DEALS ====================
    const dealsList = document.getElementById('dealsList');
    const sponsors = player.sponsors || [];

    if (sponsors.length > 0) {
        dealsList.innerHTML = sponsors.map(s => `
            <div class="deal-item">
                <span>${s.brand || 'Sponsor'}</span>
                <span class="deal-value">£${s.value || 0}/week</span>
                <span style="font-size: 0.6rem; color: var(--text-muted);">
                    ${s.weeksLeft || 0} weeks left
                </span>
            </div>
        `).join('');
    } else {
        dealsList.innerHTML = '<p class="no-data">No active sponsorship deals. Increase your reputation to attract sponsors.</p>';
    }

    // ==================== AVAILABLE OFFERS (only if not already signed) ====================
    const offersList = document.getElementById('offersList');
    const rep = player.reputation || 0;
    let offersHTML = '';

    // Define sponsor offers with contract duration (weeks)
    const allOffers = [
        { brand: 'Local Sports Shop', value: 50, minRep: 5, duration: 20 },
        { brand: 'Regional Brand', value: 200, minRep: 15, duration: 30 },
        { brand: 'Nike', value: 1000, minRep: 30, duration: 38 },
        { brand: 'Adidas', value: 1200, minRep: 40, duration: 38 },
        { brand: 'Puma', value: 800, minRep: 25, duration: 38 },
    ];

    // Filter: only show offers that player hasn't signed yet
    const signedBrands = sponsors.map(s => s.brand);
    const availableOffers = allOffers.filter(o => 
        !signedBrands.includes(o.brand) && rep >= o.minRep
    );

    // Also check for renewal: if a sponsor's contract expired (weeksLeft <= 0), they may offer renewal
    const expiredSponsors = sponsors.filter(s => s.weeksLeft <= 0);
    expiredSponsors.forEach(s => {
        // If reputation still meets minimum, offer renewal
        const originalOffer = allOffers.find(o => o.brand === s.brand);
        if (originalOffer && rep >= originalOffer.minRep) {
            // Remove from sponsors list (will be re-added if accepted)
            // We'll handle this in acceptOffer
            offersHTML += `
                <div class="offer-item">
                    <span>${s.brand} (Renewal)</span>
                    <span>£${s.value}/week</span>
                    <button class="btn btn-primary btn-sm" onclick="acceptOffer('${s.brand}', ${s.value}, ${originalOffer.duration})">Renew</button>
                </div>
            `;
        }
    });

    // Generate fresh offers
    availableOffers.forEach(o => {
        offersHTML += `
            <div class="offer-item">
                <span>${o.brand}</span>
                <span>£${o.value}/week (${o.duration} weeks)</span>
                <button class="btn btn-primary btn-sm" onclick="acceptOffer('${o.brand}', ${o.value}, ${o.duration})">Accept</button>
            </div>
        `;
    });

    if (offersHTML === '') {
        offersList.innerHTML = '<p class="no-data">No offers available. Build your reputation or wait for contract renewals.</p>';
    } else {
        offersList.innerHTML = offersHTML;
    }

    // ==================== ACCEPT OFFER (with duration) ====================
    window.acceptOffer = function(brand, value, duration) {
        // Check if already signed (prevent double signing)
        const existing = (player.sponsors || []).find(s => s.brand === brand);
        if (existing) {
            showToast('⚠️ You already have a deal with ' + brand + '!', 'error');
            return;
        }

        // Add sponsor with contract duration
        player.sponsors = player.sponsors || [];
        player.sponsors.push({
            brand: brand,
            value: value,
            signed: new Date().toISOString(),
            weeksLeft: duration || 38 // default 1 season
        });

        // Immediate bonus
        player.bankBalance = (player.bankBalance || 500) + value * 4;

        localStorage.setItem('theJourney_playerData', JSON.stringify(player));
        showToast('✅ Signed with ' + brand + '! £' + value + '/week for ' + duration + ' weeks.', 'success');
        setTimeout(() => location.reload(), 800);
    };

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

    // ==================== NAVIGATION TOGGLE ====================
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
        document.addEventListener('click', (e) => {
            if (!document.getElementById('globalNav').contains(e.target) && navLinks.classList.contains('open')) {
                navLinks.classList.remove('open');
            }
        });
    }

    console.log('%c⚽ SPONSOR HUB LOADED (FIXED) %c| %c' + (player.name || 'Player'),
        'color:#00e676;font-weight:bold;', 'color:#b0b0ba;', 'color:#fff;');
})();