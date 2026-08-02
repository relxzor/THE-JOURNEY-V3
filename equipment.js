// ==================== equipment.js (FINAL - WITH PNG IMAGES) ====================
(function() {
    'use strict';

    const player = JSON.parse(localStorage.getItem('theJourney_playerData') || 'null');
    if (!player) { window.location.href = 'index.html'; return; }

    const BOOTS = [
        { id: 'adidas_predator', brand: 'Adidas', name: 'Predator Elite', image: 'Adidas.png', attribute: 'shooting', attributeLabel: 'Shooting', bonus: 2, price: 1841 },
        { id: 'nike_phantom', brand: 'Nike', name: 'Phantom Gx 2 Elite', image: 'Nike.png', attribute: 'dribbling', attributeLabel: 'Dribbling', bonus: 2, price: 1768 },
        { id: 'nike_tiempo', brand: 'Nike', name: 'Tiempo Legend 10 Elite', image: 'Nike2.png', attribute: 'ballControl', attributeLabel: 'Ball Control', bonus: 2, price: 1208 },
        { id: 'puma_ultra', brand: 'Puma', name: 'Ultra Ultimate', image: 'Puma.png', attribute: 'sprintSpeed', attributeLabel: 'Sprint Speed', bonus: 2, price: 1750 }
    ];

    function formatCurrency(v) {
        if (v >= 1e6) return '€' + (v/1e6).toFixed(1) + 'M';
        if (v >= 1e3) return '€' + Math.round(v/1e3) + 'K';
        return '€' + v;
    }

    function getAttr(key) { return Math.round((player.attributes || {})[key] || 40); }
    function setAttr(key, val) {
        if (!player.attributes) player.attributes = {};
        player.attributes[key] = Math.min(99, Math.max(30, val));
    }

    let equipped = player.equippedBoots || null;
    let owned = player.ownedBoots || [];

    function render() {
        const grid = document.getElementById('bootsGrid');
        if (!grid) return;

        const eqBoot = BOOTS.find(b => b.id === equipped);
        document.getElementById('equippedBootDisplay').textContent = eqBoot ? eqBoot.brand + ' ' + eqBoot.name : '—';
        document.getElementById('equippedBootBonus').textContent = eqBoot ? '+' + eqBoot.bonus + ' ' + eqBoot.attributeLabel : 'No bonus active';
        document.getElementById('equippedBootName').textContent = eqBoot ? eqBoot.name : 'None';

        let html = '';
        BOOTS.forEach(boot => {
            const isOwned = owned.includes(boot.id);
            const isEquipped = equipped === boot.id;
            const canAfford = (player.bankBalance || 500) >= boot.price;
            const attrIcon = { shooting: 'fa-solid fa-bullseye', dribbling: 'fa-solid fa-arrows-spin', ballControl: 'fa-solid fa-hand-peace', sprintSpeed: 'fa-solid fa-bolt' }[boot.attribute] || 'fa-solid fa-arrow-up';

            html += `
                <div class="eq-boot-card ${isEquipped ? 'equipped' : ''}">
                    ${isOwned ? `<span class="eq-owned-badge owned"><i class="fa-regular fa-circle-check"></i> Owned</span>` : ''}
                    <div class="eq-boot-image">
                        <img src="${boot.image}" alt="${boot.brand} ${boot.name}"
                             onerror="this.style.display='none';this.parentElement.innerHTML='<i class=\\'fa-solid fa-shoe-prints\\' style=\\'font-size:3rem; color:var(--eq-text-secondary);\\'></i><div style=\\'font-size:0.6rem;color:var(--eq-text-muted);margin-top:4px;\\'>${boot.brand}</div>'"
                             style="max-height:80px;max-width:100%;object-fit:contain;">
                    </div>
                    <div class="eq-boot-brand">${boot.brand}</div>
                    <div class="eq-boot-name">${boot.name}</div>
                    <div class="eq-boot-attr">
                        <i class="${attrIcon}"></i>
                        ${boot.attributeLabel} <strong style="color:var(--eq-gold);">+${boot.bonus}</strong>
                        ${isEquipped ? '<span style="color:var(--eq-green);margin-left:4px;">✓ Active</span>' : ''}
                    </div>
                    <div class="eq-boot-price">${formatCurrency(boot.price)}</div>
                    <div class="eq-boot-actions">
                        ${isOwned ? (isEquipped ? 
                            `<button class="btn btn-equip active" disabled><i class="fa-regular fa-circle-check"></i> Equipped</button>` :
                            `<button class="btn btn-equip" onclick="equipBoot('${boot.id}')"><i class="fa-solid fa-arrows-rotate"></i> Equip</button>`
                        ) : `
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

    window.buyBoot = function(id) {
        const boot = BOOTS.find(b => b.id === id);
        if (!boot) return;
        if (owned.includes(id)) { showToast('Already owned.', 'warning'); return; }
        if ((player.bankBalance || 500) < boot.price) {
            showToast('Not enough money! Need ' + formatCurrency(boot.price), 'error');
            return;
        }
        player.bankBalance -= boot.price;
        owned.push(id);
        player.ownedBoots = owned;
        if (!equipped) {
            equipped = id;
            player.equippedBoots = id;
            applyBonus(id);
            showToast('Purchased & equipped ' + boot.brand + ' ' + boot.name, 'success');
        } else {
            showToast('Purchased ' + boot.brand + ' ' + boot.name + '. Equip from locker.', 'success');
        }
        save();
        render();
    };

    window.equipBoot = function(id) {
        const boot = BOOTS.find(b => b.id === id);
        if (!boot || !owned.includes(id)) return;
        if (equipped === id) { showToast('Already equipped.', 'warning'); return; }
        if (equipped) {
            const old = BOOTS.find(b => b.id === equipped);
            if (old) setAttr(old.attribute, getAttr(old.attribute) - old.bonus);
        }
        equipped = id;
        player.equippedBoots = id;
        applyBonus(id);
        showToast('Equipped ' + boot.brand + ' ' + boot.name, 'success');
        save();
        render();
    };

    function applyBonus(id) {
        const boot = BOOTS.find(b => b.id === id);
        if (!boot) return;
        setAttr(boot.attribute, getAttr(boot.attribute) + boot.bonus);
    }

    function save() {
        if (!player.attributes) player.attributes = {};
        localStorage.setItem('theJourney_playerData', JSON.stringify(player));
    }

    function showToast(msg, type) {
        const c = document.getElementById('toastContainer');
        if (!c) return;
        const t = document.createElement('div');
        t.className = 'toast toast-' + (type || '');
        t.textContent = msg;
        c.appendChild(t);
        setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateX(100%)'; setTimeout(() => t.remove(), 400); }, 3500);
    }

    // NAV TOGGLE
    document.getElementById('navToggle')?.addEventListener('click', () => {
        document.getElementById('navLinks')?.classList.toggle('open');
    });

    // INIT
    if (!player.attributes) player.attributes = {};
    if (!Array.isArray(player.ownedBoots)) player.ownedBoots = [];
    owned = player.ownedBoots;
    equipped = player.equippedBoots || null;

    if (equipped && owned.includes(equipped)) {
        if (!player._bootBonusesApplied) player._bootBonusesApplied = {};
        if (!player._bootBonusesApplied[equipped]) {
            applyBonus(equipped);
            player._bootBonusesApplied[equipped] = true;
            save();
        }
    }

    render();
    console.log('✅ Equipment shop loaded. Images: Adidas.png, Nike.png, Nike2.png, Puma.png');
})();