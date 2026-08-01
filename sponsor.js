// ==================== sponsor.js (FIX: BRAND & INCOME) ====================
(function() {
    const player = JSON.parse(localStorage.getItem('theJourney_playerData') || 'null');
    if (!player) { window.location.href = 'index.html'; return; }

    document.getElementById('repValue').textContent = player.reputation || 0;

    const dealsList = document.getElementById('dealsList');
    const sponsors = player.sponsors || [];

    if (sponsors.length > 0) {
        dealsList.innerHTML = sponsors.map(s => `
            <div class="deal-item">
                <span>${s.brand}</span>
                <span class="deal-value">£${s.value}/week</span>
                <span style="font-size: 0.6rem; color: var(--text-muted);">${s.weeksLeft || 0} weeks left</span>
            </div>
        `).join('');
    } else {
        dealsList.innerHTML = '<p class="no-data">No active sponsorship deals.</p>';
    }

    // Jenama Sebenar
    const allOffers = [
        { brand: 'Nike', value: 1000, minRep: 20, duration: 38 },
        { brand: 'Adidas', value: 1200, minRep: 30, duration: 38 },
        { brand: 'Puma', value: 800, minRep: 25, duration: 38 },
        { brand: 'New Balance', value: 600, minRep: 15, duration: 38 },
        { brand: 'Under Armour', value: 500, minRep: 10, duration: 30 },
        { brand: 'Gatorade', value: 400, minRep: 5, duration: 20 },
    ];

    const signedBrands = sponsors.map(s => s.brand);
    const availableOffers = allOffers.filter(o => !signedBrands.includes(o.brand) && (player.reputation || 0) >= o.minRep);

    const offersList = document.getElementById('offersList');
    offersList.innerHTML = availableOffers.map(o => `
        <div class="offer-item">
            <span>${o.brand}</span>
            <span>£${o.value}/week (${o.duration} weeks)</span>
            <button class="btn btn-primary btn-sm" onclick="acceptOffer('${o.brand}', ${o.value}, ${o.duration})">Accept</button>
        </div>
    `).join('') || '<p class="no-data">No offers available. Build your reputation.</p>';

    window.acceptOffer = function(brand, value, duration) {
        player.sponsors = player.sponsors || [];
        player.sponsors.push({ brand: brand, value: value, signed: new Date().toISOString(), weeksLeft: duration });
        // FIX: Tambah duit sponsor terus ke bank
        player.bankBalance = (player.bankBalance || 500) + (value * 2); // Bonus signing 2 minggu
        localStorage.setItem('theJourney_playerData', JSON.stringify(player));
        showToast('✅ Signed with ' + brand + '! £' + value + '/week', 'success');
        setTimeout(() => location.reload(), 800);
    };

    function showToast(m,t){const c=document.getElementById('toastContainer');if(!c)return;const d=document.createElement('div');d.className='toast '+t;d.textContent=m;c.appendChild(d);setTimeout(()=>{d.style.opacity='0';d.style.transform='translateX(130%)';d.style.transition='all 0.35s ease';setTimeout(()=>d.remove(),350)},3000);}
})();