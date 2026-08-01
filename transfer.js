// ==================== transfer.js (FIX: SALARY & OFFERS) ====================
(function() {
    const player = JSON.parse(localStorage.getItem('theJourney_playerData') || 'null');
    if (!player) { window.location.href = 'index.html'; return; }

    document.getElementById('txClub').textContent = player.club || '—';
    document.getElementById('txContract').textContent = 'Season ' + (player.season || 1);
    document.getElementById('txSalary').textContent = '£' + formatNum(player.salary || 300) + ' /week';
    document.getElementById('txValue').textContent = '£' + formatNum(player.marketValue || 50000);
    document.getElementById('txClause').textContent = player.releaseClause ? '£' + formatNum(player.releaseClause) : 'None';
    document.getElementById('txAgent').textContent = 'Agent Smith';

    // Generate club interest based on OVR (Logic yang lebih longgar)
    const interestList = document.getElementById('interestList');
    if (player.ovr >= 50) { // Turunkan syarat OVR
        const clubs = [
            { name: 'Brighton & Hove Albion', level: 'medium' },
            { name: 'RB Leipzig', level: 'low' },
        ];
        if (player.ovr >= 65) {
            clubs.push({ name: 'Arsenal', level: 'high' });
        }
        interestList.innerHTML = clubs.map(c => `
            <div class="interest-item">
                <span>${c.name}</span>
                <span class="interest-level level-${c.level}">${c.level.toUpperCase()}</span>
            </div>
        `).join('');
    }

    // -- FIX: TERIMA TAWARAN & GAJI MASUK --
    window.acceptOffer = function(club, salary) {
        if (confirm('Accept offer from ' + club + '?')) {
            player.club = club;
            player.salary = salary;
            // FIX: Tambah gaji ke bank balance
            player.bankBalance = (player.bankBalance || 500) + (salary * 4); // Bonus signing 4 minggu
            player.pendingOffers = player.pendingOffers.filter(o => o.club !== club);
            player.morale = Math.min(100, (player.morale || 70) + 10);
            
            player.mediaMentions = player.mediaMentions || [];
            player.mediaMentions.push({
                headline: player.name + ' signs for ' + club + '!',
                date: new Date().toISOString()
            });
            localStorage.setItem('theJourney_playerData', JSON.stringify(player));
            showToast('✅ Signed with ' + club + '! £' + salary + '/week', 'success');
            setTimeout(() => location.reload(), 800);
        }
    };

    // -- FIX: REQUEST TRANSFER MENJANA TAWARAN --
    const btnRequest = document.getElementById('btnRequestTransfer');
    if (player.ovr >= 50) { // Syarat lebih rendah
        btnRequest.disabled = false;
        btnRequest.addEventListener('click', () => {
            if (confirm('Request a transfer? This may upset your current club.')) {
                player.morale = Math.max(20, (player.morale || 70) - 10);
                player.mediaMentions = player.mediaMentions || [];
                player.mediaMentions.push({ headline: player.name + ' has submitted a transfer request.', date: new Date().toISOString() });
                
                // Generate tawaran dari senarai kelab sebenar
                const bigClubs = ['Manchester United', 'Manchester City', 'Liverpool', 'Arsenal', 'Real Madrid', 'Barcelona', 'Bayern Munich', 'Inter Milan'];
                const mediumClubs = ['Tottenham', 'Newcastle', 'Aston Villa', 'Atletico Madrid', 'Borussia Dortmund', 'Napoli', 'Roma'];
                
                let eligible = [];
                if (player.ovr >= 70) eligible = bigClubs.filter(c => c !== player.club);
                else if (player.ovr >= 55) eligible = mediumClubs.filter(c => c !== player.club);
                else eligible = ['Brentford', 'Bournemouth', 'Brighton'].filter(c => c !== player.club);
                
                const offers = [];
                const num = Math.min(3, eligible.length);
                for (let i=0; i<num; i++) {
                    const idx = Math.floor(Math.random() * eligible.length);
                    const club = eligible.splice(idx, 1)[0];
                    if (club) {
                        const salary = 500 + Math.floor(Math.random() * 1000) + (player.ovr * 20);
                        offers.push({ club, salary, bonus: Math.floor(Math.random() * 500) });
                    }
                }
                if (offers.length > 0) {
                    player.pendingOffers = offers;
                }
                localStorage.setItem('theJourney_playerData', JSON.stringify(player));
                showToast('📋 Transfer request submitted! Offers generated.', 'info');
                setTimeout(() => location.reload(), 1000);
            }
        });
    } else {
        btnRequest.title = 'Need OVR 50+';
    }

    function formatNum(n) { return n >= 1000000 ? (n/1000000).toFixed(1)+'M' : n >= 1000 ? (n/1000).toFixed(1)+'K' : n.toString(); }
    function showToast(m,t){const c=document.getElementById('toastContainer');if(!c)return;const d=document.createElement('div');d.className='toast '+t;d.textContent=m;c.appendChild(d);setTimeout(()=>{d.style.opacity='0';d.style.transform='translateX(130%)';d.style.transition='all 0.35s ease';setTimeout(()=>d.remove(),350)},3000);}
})();