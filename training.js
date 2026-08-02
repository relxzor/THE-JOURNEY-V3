// ==================== training.js (FIXED - SYNC WITH DASHBOARD & CAREER) ====================
(function() {
    'use strict';

    const player = JSON.parse(localStorage.getItem('theJourney_playerData') || 'null');
    if (!player) { window.location.href = 'index.html'; return; }

    // --- ENSURE ALL ATTRIBUTES EXIST (SAME AS CAREER.JS) ---
    const ATTR_KEYS = ['acceleration', 'sprintSpeed', 'stamina', 'finishing', 'passing', 
                       'dribbling', 'ballControl', 'composure', 'strength', 'vision', 
                       'doubleTouch', 'agility', 'injuryResistance'];

    if (!player.attributes) {
        player.attributes = {};
    }

    // Ensure all attributes have default values
    ATTR_KEYS.forEach(key => {
        if (typeof player.attributes[key] !== 'number' || isNaN(player.attributes[key])) {
            player.attributes[key] = 40 + Math.floor(Math.random() * 15);
        }
    });

    // --- DRILLS DATABASE (USING SAME ATTRIBUTE KEYS AS CAREER.JS) ---
    const drills = [
        { 
            name: 'Ball Control Drill', 
            icon: 'fa-futbol', 
            attr: 'ballControl', 
            label: 'Ball Control',
            gain: 0.8, 
            staminaCost: 8, 
            fatigueGain: 6 
        },
        { 
            name: 'Sprint Training', 
            icon: 'fa-person-running', 
            attr: 'sprintSpeed', 
            label: 'Sprint Speed',
            gain: 0.7, 
            staminaCost: 12, 
            fatigueGain: 10 
        },
        { 
            name: 'Passing Practice', 
            icon: 'fa-share', 
            attr: 'passing', 
            label: 'Passing',
            gain: 0.8, 
            staminaCost: 6, 
            fatigueGain: 5 
        },
        { 
            name: 'Shooting Drill', 
            icon: 'fa-bullseye', 
            attr: 'finishing', 
            label: 'Finishing',
            gain: 0.9, 
            staminaCost: 9, 
            fatigueGain: 7 
        },
        { 
            name: 'Strength Workout', 
            icon: 'fa-dumbbell', 
            attr: 'strength', 
            label: 'Strength',
            gain: 0.6, 
            staminaCost: 14, 
            fatigueGain: 12 
        },
        { 
            name: 'Agility Ladder', 
            icon: 'fa-shoe-prints', 
            attr: 'agility', 
            label: 'Agility',
            gain: 0.7, 
            staminaCost: 8, 
            fatigueGain: 6 
        },
        { 
            name: 'Double Touch', 
            icon: 'fa-rotate', 
            attr: 'doubleTouch', 
            label: 'Double Touch',
            gain: 1.0, 
            staminaCost: 10, 
            fatigueGain: 8 
        },
        { 
            name: 'Dribbling Practice', 
            icon: 'fa-arrows-spin', 
            attr: 'dribbling', 
            label: 'Dribbling',
            gain: 0.8, 
            staminaCost: 8, 
            fatigueGain: 7 
        },
        { 
            name: 'Vision Training', 
            icon: 'fa-eye', 
            attr: 'vision', 
            label: 'Vision',
            gain: 0.6, 
            staminaCost: 6, 
            fatigueGain: 5 
        },
        { 
            name: 'Composure Drill', 
            icon: 'fa-brain', 
            attr: 'composure', 
            label: 'Composure',
            gain: 0.5, 
            staminaCost: 4, 
            fatigueGain: 4 
        }
    ];

    // --- RENDER DRILLS GRID ---
    const drillsGrid = document.getElementById('drillsGrid');
    if (drillsGrid) {
        drillsGrid.innerHTML = drills.map(d => `
            <div class="drill-card" data-drill="${d.attr}">
                <i class="fa-solid ${d.icon}"></i>
                <div class="drill-name">${d.name}</div>
                <div class="drill-effect">+${d.gain.toFixed(1)} ${d.label}</div>
                <div class="drill-cost">⚡ -${d.staminaCost} Stamina | 😫 +${d.fatigueGain} Fatigue</div>
            </div>
        `).join('');

        // --- DRILL CLICK HANDLER ---
        drillsGrid.querySelectorAll('.drill-card').forEach(card => {
            card.addEventListener('click', () => {
                const attr = card.dataset.drill;
                const drill = drills.find(d => d.attr === attr);
                if (!drill) return;

                const currentStamina = player.attributes?.stamina || 40;
                if (currentStamina < drill.staminaCost) {
                    showToast('⚠️ Not enough stamina! Rest first.', 'error');
                    return;
                }

                // --- APPLY TRAINING ---
                if (!player.attributes) player.attributes = {};
                
                // Increase the attribute
                const oldValue = player.attributes[attr] || 40;
                const newValue = Math.min(99, oldValue + drill.gain);
                player.attributes[attr] = newValue;
                
                // Reduce stamina
                player.attributes.stamina = Math.max(5, currentStamina - drill.staminaCost);
                
                // Increase fatigue
                player.fatigue = Math.min(100, (player.fatigue || 0) + drill.fatigueGain);
                
                // Training streak
                player.trainingStreak = (player.trainingStreak || 0) + 1;

                // --- INJURY RISK ---
                const injuryResist = player.attributes.injuryResistance || 42;
                const fatigue = player.fatigue || 0;
                const injuryRisk = Math.max(5, Math.min(90, (100 - injuryResist) * 0.4 + fatigue * 0.3));
                
                if (Math.random() * 100 < injuryRisk * 0.15) {
                    const injuries = ['Minor hamstring strain', 'Ankle sprain', 'Groin pull', 'Muscle fatigue', 'Knee discomfort'];
                    player.injuryStatus = injuries[Math.floor(Math.random() * injuries.length)];
                    player.injuryDays = Math.floor(Math.random() * 5) + 2;
                    player.trainingStreak = 0;
                    showToast(`🚑 Injury! ${player.injuryStatus}. Rest ${player.injuryDays} days required.`, 'error');
                }

                // --- UPDATE OVR FROM ATTRIBUTES (SAME AS CAREER.JS) ---
                const newOVR = computeOVRFromAttributes();
                player.ovr = newOVR;
                player.marketValue = computeMarketValue();

                // --- RECORD IN TIMELINE ---
                player.careerTimeline = player.careerTimeline || [];
                player.careerTimeline.push({
                    date: new Date().toISOString(),
                    event: 'Training',
                    detail: `Completed ${drill.name}. ${drill.label} improved from ${oldValue.toFixed(1)} to ${newValue.toFixed(1)}. OVR: ${newOVR}`,
                    type: 'training'
                });

                // --- SAVE ---
                localStorage.setItem('theJourney_playerData', JSON.stringify(player));
                
                // --- UPDATE UI ---
                showToast(`✅ ${drill.name} complete! +${drill.gain.toFixed(1)} ${drill.label} (OVR: ${newOVR})`, 'success');
                updateProgress();
                updatePlayerInfo();
            });
        });
    }

    // --- COMPUTE OVR FROM ATTRIBUTES (EXACTLY SAME AS CAREER.JS) ---
    function computeOVRFromAttributes() {
        const attrs = player.attributes || {};
        const pos = (player.position || '').toUpperCase();
        
        let weights = {
            acceleration: 0.08, sprintSpeed: 0.08, stamina: 0.08,
            finishing: 0.08, passing: 0.08, dribbling: 0.08,
            ballControl: 0.08, composure: 0.08, strength: 0.08,
            vision: 0.08, doubleTouch: 0.06, agility: 0.06,
            injuryResistance: 0.02
        };
        
        if (['ST', 'CF'].includes(pos)) {
            weights.finishing = 0.18;
            weights.dribbling = 0.10;
            weights.acceleration = 0.10;
            weights.sprintSpeed = 0.10;
            weights.composure = 0.10;
        } else if (['LW', 'RW'].includes(pos)) {
            weights.dribbling = 0.15;
            weights.acceleration = 0.12;
            weights.sprintSpeed = 0.12;
            weights.finishing = 0.10;
            weights.passing = 0.10;
        } else if (['CAM', 'CM'].includes(pos)) {
            weights.passing = 0.15;
            weights.vision = 0.12;
            weights.dribbling = 0.10;
            weights.ballControl = 0.10;
            weights.composure = 0.10;
        } else if (['CDM'].includes(pos)) {
            weights.stamina = 0.12;
            weights.strength = 0.12;
            weights.vision = 0.10;
            weights.passing = 0.10;
            weights.ballControl = 0.08;
        } else if (['CB', 'LB', 'RB'].includes(pos)) {
            weights.strength = 0.14;
            weights.stamina = 0.10;
            weights.acceleration = 0.10;
            weights.sprintSpeed = 0.10;
            weights.ballControl = 0.08;
        } else if (['GK'].includes(pos)) {
            weights = {
                acceleration: 0.10, sprintSpeed: 0.05, stamina: 0.10,
                finishing: 0.01, passing: 0.10, dribbling: 0.05,
                ballControl: 0.10, composure: 0.15, strength: 0.10,
                vision: 0.08, doubleTouch: 0.01, agility: 0.10,
                injuryResistance: 0.05
            };
        }
        
        let total = 0;
        let totalWeight = 0;
        for (const [key, weight] of Object.entries(weights)) {
            const val = attrs[key] || 40;
            total += val * weight;
            totalWeight += weight;
        }
        
        return Math.max(30, Math.min(99, Math.round(total / totalWeight)));
    }

    // --- COMPUTE MARKET VALUE (SAME AS CAREER.JS) ---
    function computeMarketValue() {
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

    // --- UPDATE PROGRESS LIST (USING SAME ATTRIBUTES AS DASHBOARD) ---
    function updateProgress() {
        const progressList = document.getElementById('progressList');
        if (!progressList) return;
        
        const attrs = player.attributes || {};
        // Use same attribute keys as dashboard display
        const displayAttrs = [
            { key: 'ballControl', label: 'Ball Control' },
            { key: 'sprintSpeed', label: 'Sprint Speed' },
            { key: 'passing', label: 'Passing' },
            { key: 'finishing', label: 'Finishing' },
            { key: 'strength', label: 'Strength' },
            { key: 'agility', label: 'Agility' },
            { key: 'stamina', label: 'Stamina' },
            { key: 'dribbling', label: 'Dribbling' },
            { key: 'vision', label: 'Vision' },
            { key: 'composure', label: 'Composure' },
            { key: 'doubleTouch', label: 'Double Touch' },
            { key: 'acceleration', label: 'Acceleration' }
        ];
        
        progressList.innerHTML = displayAttrs.map(a =>
            `<div class="progress-item">
                <span class="progress-label">${a.label}</span>
                <div class="progress-bar-container">
                    <div class="progress-bar-fill" style="width:${Math.min(100, (attrs[a.key] || 40))}%; background:${getColor(attrs[a.key] || 40)};"></div>
                    <span class="progress-value">${(attrs[a.key] || 40).toFixed(1)}</span>
                </div>
            </div>`
        ).join('');
    }

    // --- HELPER: GET COLOR BASED ON VALUE ---
    function getColor(value) {
        if (value >= 80) return '#21ba45';
        if (value >= 65) return '#fbbd08';
        if (value >= 50) return '#f2711c';
        return '#db2828';
    }

    // --- UPDATE PLAYER INFO (DISPLAY SAME AS DASHBOARD) ---
    function updatePlayerInfo() {
        const attrs = player.attributes || {};
        
        // Update OVR display
        const ovrEl = document.getElementById('playerOVR');
        if (ovrEl) ovrEl.textContent = `OVR: ${Math.round(player.ovr || 60)}`;
        
        // Update stamina display
        const staminaEl = document.getElementById('playerStamina');
        if (staminaEl) staminaEl.textContent = `⚡ ${Math.round(attrs.stamina || 40)}%`;
        
        // Update fatigue display
        const fatigueEl = document.getElementById('playerFatigue');
        if (fatigueEl) fatigueEl.textContent = `😫 ${Math.round(player.fatigue || 0)}%`;
        
        // Update name
        const nameEl = document.getElementById('playerName');
        if (nameEl) nameEl.textContent = player.name || 'Player';
        
        // Update position
        const posEl = document.getElementById('playerPosition');
        if (posEl) posEl.textContent = player.position || 'N/A';
        
        // Update club
        const clubEl = document.getElementById('playerClub');
        if (clubEl) clubEl.textContent = player.club || 'N/A';
        
        // Update market value
        const valueEl = document.getElementById('playerValue');
        if (valueEl) valueEl.textContent = formatValue(player.marketValue || computeMarketValue());
    }

    // --- FORMAT VALUE (SAME AS CAREER.JS) ---
    function formatValue(value) {
        if (value >= 1000000) return `€${(value / 1000000).toFixed(1)}M`;
        if (value >= 1000) return `€${Math.round(value / 1000)}K`;
        return `€${value}`;
    }

    // --- TOAST SYSTEM ---
    function showToast(message, type = 'info') {
        const container = document.getElementById('toastContainer');
        if (!container) {
            // Fallback: create toast container
            const newContainer = document.createElement('div');
            newContainer.id = 'toastContainer';
            newContainer.style.position = 'fixed';
            newContainer.style.top = '20px';
            newContainer.style.right = '20px';
            newContainer.style.zIndex = '9999';
            document.body.appendChild(newContainer);
            showToast(message, type);
            return;
        }
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        container.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(130%)';
            toast.style.transition = 'all 0.35s ease';
            setTimeout(() => toast.remove(), 400);
        }, 3500);
    }

    // --- NAV TOGGLE ---
    const nt = document.getElementById('navToggle');
    const nl = document.getElementById('navLinks');
    if (nt && nl) {
        nt.addEventListener('click', () => nl.classList.toggle('open'));
        document.addEventListener('click', (e) => {
            if (!document.getElementById('globalNav')?.contains(e.target) && nl.classList.contains('open')) {
                nl.classList.remove('open');
            }
        });
    }

    // --- INIT ---
    // Ensure player.ovr is synced with attributes on load
    if (player.attributes) {
        player.ovr = computeOVRFromAttributes();
        player.marketValue = computeMarketValue();
        localStorage.setItem('theJourney_playerData', JSON.stringify(player));
    }

    updateProgress();
    updatePlayerInfo();

    console.log('🏋️ Training page loaded — Attributes synced with Career Hub & Dashboard');
    console.log('📊 Current OVR:', player.ovr);
    console.log('📊 Attributes:', player.attributes);

})();