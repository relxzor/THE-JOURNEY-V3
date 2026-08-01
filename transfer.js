// ==================== transfer.js ====================
(function() {
    const player = JSON.parse(localStorage.getItem('theJourney_playerData') || 'null');
    if (!player) { window.location.href = 'index.html'; return; }

    document.getElementById('txClub').textContent = player.club || player.academy || '—';
    document.getElementById('txContract').textContent = player.contractExpiry || 'Season 3';
    document.getElementById('txSalary').textContent = '£' + (player.salary || 200) + ' /week';
    document.getElementById('txValue').textContent = '£' + formatNum(player.marketValue || 50000);
    document.getElementById('txClause').textContent = player.releaseClause ? '£' + formatNum(player.releaseClause) : 'None';
    document.getElementById('txAgent').textContent = player.agent || '—';

    // Generate club interest based on OVR
    const interestList = document.getElementById('interestList');
    if (player.ovr >= 55) {
        const clubs = [
            { name: 'Brighton & Hove Albion', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/fd/Brighton_%26_Hove_Albion_logo.svg/1200px-Brighton_%26_Hove_Albion_logo.svg.png', level: 'medium' },
            { name: 'RB Leipzig', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0e/RB_Leipzig_2014_logo.svg/1200px-RB_Leipzig_2014_logo.svg.png', level: 'low' },
        ];
        if (player.ovr >= 70) {
            clubs.push({ name: 'Arsenal', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Arsenal_FC.svg/1200px-Arsenal_FC.svg.png', level: 'high' });
        }
        interestList.innerHTML = clubs.map(c => `
            <div class="interest-item">
                <img src="${c.logo}" alt="${c.name}" onerror="this.style.display='none'">
                <span>${c.name}</span>
                <span class="interest-level level-${c.level}">${c.level.toUpperCase()}</span>
            </div>
        `).join('');
    }

    // Show pending offers
    if (player.pendingOffers && player.pendingOffers.length > 0) {
        const offersHTML = player.pendingOffers.map(offer => `
            <div class="offer-item">
                <span>${offer.club}</span>
                <span>£${offer.salary}/week + £${offer.bonus} bonus</span>
                <button class="btn btn-primary btn-sm" onclick="acceptOffer('${offer.club}', ${offer.salary})">Accept</button>
            </div>
        `).join('');
        document.getElementById('offersList').innerHTML = offersHTML;
    }

    window.acceptOffer = function(club, salary) {
        if (confirm('Accept offer from ' + club + '?')) {
            player.club = club;
            player.salary = salary;
            player.pendingOffers = player.pendingOffers.filter(o => o.club !== club);
            player.morale = Math.min(100, (player.morale || 70) + 10);
            player.mediaMentions = player.mediaMentions || [];
            player.mediaMentions.push({
                headline: player.name + ' signs for ' + club + '!',
                date: new Date().toISOString()
            });
            localStorage.setItem('theJourney_playerData', JSON.stringify(player));
            showToast('✅ Signed with ' + club + '!', 'success');
            setTimeout(() => location.reload(), 800);
        }
    };

    // Request Transfer
    const btnRequest = document.getElementById('btnRequestTransfer');
    if (player.ovr >= 55 && player.season >= 1) {
        btnRequest.disabled = false;
        btnRequest.addEventListener('click', () => {
            if (confirm('Request a transfer? This may upset your current club.')) {
                player.morale = Math.max(20, (player.morale || 70) - 10);
                player.mediaMentions = player.mediaMentions || [];
                player.mediaMentions.push({ headline: player.name + ' has submitted a transfer request.', date: new Date().toISOString() });
                // Generate offers based on OVR
                const bigClubs = ['Manchester United', 'Manchester City', 'Liverpool', 'Chelsea', 'Arsenal',
                    'Real Madrid', 'Barcelona', 'Bayern Munich', 'PSG', 'Inter Milan', 'AC Milan', 'Juventus'];
                const mediumClubs = ['Tottenham Hotspur', 'Newcastle United', 'Aston Villa', 'West Ham United',
                    'Sevilla', 'Valencia', 'Atletico Madrid', 'Borussia Dortmund', 'RB Leipzig', 'Napoli', 'Roma', 'Lazio'];
                const smallClubs = ['Brentford', 'Bournemouth', 'Burnley', 'Leicester City', 'Leeds United',
                    'Southampton', 'Stoke City', 'Swansea City', 'Huddersfield Town', 'Norwich City'];
                let eligible = [];
                if (player.ovr >= 75) eligible = bigClubs.filter(c => c !== player.club);
                else if (player.ovr >= 65) eligible = mediumClubs.filter(c => c !== player.club);
                else if (player.ovr >= 55) eligible = smallClubs.filter(c => c !== player.club);
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
        btnRequest.title = 'Need OVR 55+ and at least 1 season';
    }

    function formatNum(n) { return n >= 1000000 ? (n/1000000).toFixed(1)+'M' : n >= 1000 ? (n/1000).toFixed(1)+'K' : n.toString(); }
    function showToast(m,t){const c=document.getElementById('toastContainer');if(!c)return;const d=document.createElement('div');d.className='toast '+t;d.textContent=m;c.appendChild(d);setTimeout(()=>{d.style.opacity='0';d.style.transform='translateX(130%)';d.style.transition='all 0.35s ease';setTimeout(()=>d.remove(),350)},3000);}

    const nt=document.getElementById('navToggle'),nl=document.getElementById('navLinks');
    if(nt&&nl){nt.addEventListener('click',()=>nl.classList.toggle('open'));document.addEventListener('click',(e)=>{if(!document.getElementById('globalNav').contains(e.target)&&nl.classList.contains('open'))nl.classList.remove('open');});}
})();