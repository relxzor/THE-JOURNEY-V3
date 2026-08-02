// ==================== equipment.js (UPGRADED SHOP VERSION) ====================
(function() {
    'use strict';

    // --- LOAD PLAYER ---
    const player = JSON.parse(localStorage.getItem('theJourney_playerData') || 'null');
    if (!player) {
        window.location.href = 'index.html';
        return;
    }

    // --- BOOT DATABASE (DENGAN GAMBAR PNG) ---
    const BOOTS = [
        {
            id: 'adidas_predator',
            brand: 'Adidas',
            name: 'Predator Elite',
            image: 'Adidas.png',
            attribute: 'shooting',
            attributeLabel: 'Shooting',
            bonus: 2,
            price: 1841,
            description: 'Precision strike technology for lethal finishing.'
        },
        {
            id: 'nike_phantom',
            brand: 'Nike',
            name: 'Phantom Gx 2 Elite',
            image: 'Nike.png',
            attribute: 'dribbling',
            attributeLabel: 'Dribbling',
            bonus: 2,
            price: 1768,
            description: 'Next-gen grip for unmatched close control.'
        },
        {
            id: 'nike_tiempo',
            brand: 'Nike',
            name: 'Tiempo Legend 10 Elite',
            image: 'Nike2.png',
            attribute: 'ballControl',
            attributeLabel: 'Ball Control',
            bonus: 2,
            price: 1208,
            description: 'Classic touch with modern innovation.'
        },
        {
            id: 'puma_ultra',
            brand: 'Puma',
            name: 'Ultra Ultimate',
            image: 'Puma.png',
            attribute: 'sprintSpeed',
            attributeLabel: 'Sprint Speed',
            bonus: 2,
            price: 1750,
            description: 'Explosive acceleration for the fastest players.'
        }
    ];

    // --- HELPER: FORMAT CURRENCY ---
    function formatCurrency(value) {
        if (value >= 1000000) return '€' + (value / 1000000).toFixed(1) + 'M';
        if (value >= 1000) return '€' + Math.round(value / 1000) + 'K';
        return '€' + value;
    }

    // --- HELPER: GET ATTRIBUTE VALUE ---
    function getAttrValue(attrKey) {
        if (!player.attributes) player.attributes = {};
        return Math.round(player.attributes[attrKey] || 40);
    }

    // --- HELPER: UPDATE ATTRIBUTE ---
    function setAttrValue(attrKey, value) {
        if (!player.attributes) player.attributes = {};
        player.attributes[attrKey] = Math.min(99, Math.max(30, value));
    }

    // --- GET PLAYER STATE ---
    let equippedBootId = player.equippedBoots || null;
    let ownedBootIds = player.ownedBoots || [];

    // --- RENDER BOOTS ---
    function renderBoots() {
        const grid = document.getElementById('bootsGrid');
        if (!grid) return;

        // Update equipped banner
        const equippedBoot = BOOTS.find(b => b.id === equippedBootId);
        document.getElementById('equippedBootDisplay').textContent = equippedBoot ? equippedBoot.brand + ' ' + equippedBoot.name : '—';
        document.getElementById('equippedBootBonus').textContent = equippedBoot ? 
            '+' + equippedBoot.bonus + ' ' + equippedBoot.attributeLabel : 'No bonus active';
        document.getElementById('equippedBootName').textContent = equippedBoot ? equippedBoot.name : 'None';

        let html = '';
        BOOTS.forEach(boot => {
            const owned = ownedBootIds.includes(boot.id);
            const equipped = equippedBootId === boot.id;
            const currentVal = getAttrValue(boot.attribute);
            const newVal = equipped ? currentVal : currentVal + boot.bonus;
            const canAfford = (player.bankBalance || 500) >= boot.price;

            // Attribute icon
            const attrIcon = {
                'shooting': 'fa-solid fa-bullseye',
                'dribbling': 'fa-solid fa-arrows-spin',
                'ballControl': 'fa-solid fa-hand-peace',
                'sprintSpeed': 'fa-solid fa-bolt'
            }[boot.attribute] || 'fa-solid fa-arrow-up';

            // Image path
            const imagePath = boot.image || '';

            html += `
                <div class="eq-boot-card ${equipped ? 'equipped' : ''}">
                    ${owned ? `<span class="eq-owned-badge owned"><i class="fa-regular fa-circle-check"></i> Owned</span>` : ''}
                    <div class="eq-boot-image">
                        <img src="${imagePath}" alt="${boot.brand} ${boot.name}" onerror="this.style.display='none';this.parentElement.innerHTML='<i class=\\'fa-solid fa-shoe-prints\\' style=\\'font-size:2.8rem; color:var(--eq-text-secondary);\\'></i>'">
                    </div>
                    <div class="eq-boot-brand">${boot.brand}</div>
                    <div class="eq-boot-name">${boot.name}</div>
                    <div class="eq-boot-attr">
                        <i class="${attrIcon}"></i>
                        ${boot.attributeLabel} <strong style="color:var(--eq-gold);">+${boot.bonus}</strong>
                        ${equipped ? '<span style="color:var(--eq-green);margin-left:4px;">✓ Active</span>' : ''}
                    </div>
                    <div class="eq-boot-price">${formatCurrency(boot.price)}</div>
                    <div class="eq-boot-actions">
                        ${owned ? `
                            ${equipped ? 
                                `<button class="btn btn-equip active" disabled><i class="fa-regular fa-circle-check"></i> Equipped</button>` :
                                `<button class="btn btn-equip" onclick="equipBoot('${boot.id}')"><i class="fa-solid fa-arrows-rotate"></i> Equip</button>`
                            }
                        ` : `
                            <button class="btn btn-buy" onclick="buyBoot('${boot.id}')" ${!canAfford ? 'disabled' : ''}>
                                <i class="fa-solid fa-cart-plus"></i> Buy Now
                            </button>
                        `}
                    </div>
                </div>
            `;
        });

        grid.innerHTML = html;
    }

    // --- BUY BOOT ---
    window.buyBoot = function(id) {
        const boot = BOOTS.find(b => b.id === id);
        if (!boot) return;

        if (ownedBootIds.includes(id)) {
            showToast('You already own this boot.', 'warning');
            return;
        }

        const balance = player.bankBalance || 500;
        if (balance < boot.price) {
            showToast('Not enough money! Need ' + formatCurrency(boot.price), 'error');
            return;
        }

        // Deduct money
        player.bankBalance = balance - boot.price;

        // Add to owned
        if (!ownedBootIds.includes(id)) {
            ownedBootIds.push(id);
        }
        player.ownedBoots = ownedBootIds;

        // Auto-equip if no boot equipped
        if (!equippedBootId) {
            equippedBootId = id;
            player.equippedBoots = id;
            applyBootBonus(id);
            showToast('Purchased and equipped ' + boot.brand + ' ' + boot.name + '!', 'success');
        } else {
            showToast('Purchased ' + boot.brand + ' ' + boot.name + '! Equip it from your locker.', 'success');
        }

        savePlayer();
        renderBoots();
    };

    // --- EQUIP BOOT ---
    window.equipBoot = function(id) {
        const boot = BOOTS.find(b => b.id === id);
        if (!boot) return;

        if (!ownedBootIds.includes(id)) {
            showToast('You don\'t own this boot.', 'error');
            return;
        }

        if (equippedBootId === id) {
            showToast('Already equipped.', 'warning');
            return;
        }

        // Remove previous bonus
        if (equippedBootId) {
            const oldBoot = BOOTS.find(b => b.id === equippedBootId);
            if (oldBoot) {
                const oldVal = getAttrValue(oldBoot.attribute);
                setAttrValue(oldBoot.attribute, Math.max(30, oldVal - oldBoot.bonus));
            }
        }

        // Apply new bonus
        equippedBootId = id;
        player.equippedBoots = id;
        applyBootBonus(id);

        showToast('Equipped ' + boot.brand + ' ' + boot.name + '!', 'success');
        savePlayer();
        renderBoots();
    };

    // --- APPLY BOOT BONUS ---
    function applyBootBonus(id) {
        const boot = BOOTS.find(b => b.id === id);
        if (!boot) return;
        const currentVal = getAttrValue(boot.attribute);
        setAttrValue(boot.attribute, Math.min(99, currentVal + boot.bonus));
    }

    // --- SAVE PLAYER ---
    function savePlayer() {
        if (!player.attributes) player.attributes = {};
        localStorage.setItem('theJourney_playerData', JSON.stringify(player));
    }

    // --- TOAST SYSTEM ---
    function showToast(message, type) {
        const container = document.getElementById('toastContainer');
        if (!container) return;
        const toast = document.createElement('div');
        toast.className = 'toast toast-' + (type || '');
        toast.textContent = message;
        container.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
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
            if (!document.getElementById('globalNav').contains(e.target) && nl.classList.contains('open')) {
                nl.classList.remove('open');
            }
        });
    }

    // --- INIT ---
    if (!player.attributes) player.attributes = {};
    if (!Array.isArray(player.ownedBoots)) player.ownedBoots = [];
    ownedBootIds = player.ownedBoots;
    equippedBootId = player.equippedBoots || null;

    // Auto-apply equipped boot bonus on load
    if (equippedBootId) {
        const boot = BOOTS.find(b => b.id === equippedBootId);
        if (boot && ownedBootIds.includes(equippedBootId)) {
            if (!player._bootBonusesApplied) player._bootBonusesApplied = {};
            if (!player._bootBonusesApplied[equippedBootId]) {
                applyBootBonus(equippedBootId);
                player._bootBonusesApplied[equippedBootId] = true;
                savePlayer();
            }
        }
    }

    renderBoots();

    console.log('🏪 Equipment Shop loaded — ' + player.name);
    console.log('💰 Balance:', player.bankBalance || 500);
    console.log('👟 Owned:', ownedBootIds);
    console.log('👟 Equipped:', equippedBootId);

})();