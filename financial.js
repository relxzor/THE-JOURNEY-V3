// ==================== financial.js (FIXED: AUTO WEEKLY INCOME) ====================
(function() {
    const player = JSON.parse(localStorage.getItem('theJourney_playerData') || 'null');
    if (!player) { window.location.href = 'index.html'; return; }

    // --- 1. AUTO INCOME SYSTEM (WEEKLY) ---
    // Semak sama ada minggu ini sudah dibayar
    const currentWeek = player.currentMatchWeek || 1;
    const lastPaidWeek = player.lastPaidWeek || 0;

    if (currentWeek > lastPaidWeek) {
        // Kira pendapatan mingguan
        const salary = player.salary || 200;
        const sponsorIncome = (player.sponsors || []).reduce((sum, s) => sum + (s.value || 0), 0);
        const totalIncome = salary + sponsorIncome;

        // Tambah ke bank balance
        player.bankBalance = (player.bankBalance || 500) + totalIncome;

        // Rekod minggu bayaran
        player.lastPaidWeek = currentWeek;

        // Simpan perubahan
        localStorage.setItem('theJourney_playerData', JSON.stringify(player));
        
        // Optional: Tunjukkan toast atau log
        console.log(`💰 Week ${currentWeek}: Received £${totalIncome} (Salary: £${salary}, Sponsors: £${sponsorIncome})`);
    }

    // --- 2. UPDATE UI ---
    const balance = player.bankBalance || 500;
    document.getElementById('balanceDisplay').textContent = '£' + formatNum(balance);

    document.getElementById('incomeList').innerHTML = `
        <div class="income-item"><span>Weekly Salary</span><span>£${player.salary || 200}</span></div>
        <div class="income-item"><span>Sponsor Income</span><span>£${(player.sponsors || []).reduce((s,x)=>s+(x.value||0),0)}</span></div>
        <div class="income-item"><span>Match Bonuses</span><span>£${Math.floor((player.matchesPlayed || 0) * 10)}</span></div>
    `;

    const weeklyExpenses = Math.round((player.salary || 200) * 0.375);
    document.getElementById('expenseList').innerHTML = `
        <div class="expense-item"><span>Living Expenses</span><span>£${weeklyExpenses}</span></div>
        <div class="expense-item"><span>Agent Fees</span><span>£${Math.round((player.salary||200)*0.05)}</span></div>
        <div class="expense-item"><span>Tax</span><span>£${Math.round((player.salary||200)*0.2)}</span></div>
        <div class="expense-item"><span>Insurance</span><span>£15</span></div>
    `;

    function formatNum(n) { 
        if (n >= 1000000) return (n/1000000).toFixed(1)+'M';
        if (n >= 1000) return (n/1000).toFixed(1)+'K';
        return n.toString(); 
    }

    // --- 3. NAVIGATION ---
    const nt = document.getElementById('navToggle');
    const nl = document.getElementById('navLinks');
    if(nt && nl) {
        nt.addEventListener('click', () => nl.classList.toggle('open'));
        document.addEventListener('click', (e) => {
            if(!document.getElementById('globalNav').contains(e.target) && nl.classList.contains('open')) {
                nl.classList.remove('open');
            }
        });
    }
})();