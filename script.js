// ==================== script.js (FIXED: OVR 65 WITH PROPER ATTRIBUTES) ====================
document.addEventListener('DOMContentLoaded', () => {
    const clubLogoDatabase = {
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
        'Sevilla': 'https://upload.wikimedia.org/wikipedia/en/thumb/2/22/Sevilla_FC_logo.svg/1200px-Sevilla_FC_logo.svg.png',
        'Valencia': 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5d/Valencia_CF_logo.svg/1200px-Valencia_CF_logo.svg.png',
        'Villarreal': 'https://upload.wikimedia.org/wikipedia/en/thumb/3/38/Villarreal_CF_logo.svg/1200px-Villarreal_CF_logo.svg.png',
        'Real Sociedad': 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2d/Real_Sociedad_logo.svg/1200px-Real_Sociedad_logo.svg.png',
        'Athletic Bilbao': 'https://upload.wikimedia.org/wikipedia/en/thumb/9/94/Athletic_Bilbao_logo.svg/1200px-Athletic_Bilbao_logo.svg.png',
        'Bayern Munich': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg/1200px-FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg.png',
        'Borussia Dortmund': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Borussia_Dortmund_logo.svg/1200px-Borussia_Dortmund_logo.svg.png',
        'RB Leipzig': 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0e/RB_Leipzig_2014_logo.svg/1200px-RB_Leipzig_2014_logo.svg.png',
        'Bayer Leverkusen': 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c5/Bayer_04_Leverkusen_logo.svg/1200px-Bayer_04_Leverkusen_logo.svg.png',
        'Stuttgart': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/VfB_Stuttgart_1893_Logo.svg/1200px-VfB_Stuttgart_1893_Logo.svg.png',
        'Frankfurt': 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Eintracht_Frankfurt_logo.svg/1200px-Eintracht_Frankfurt_logo.svg.png',
        'Wolfsburg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/VfL_Wolfsburg_Logo.svg/1200px-VfL_Wolfsburg_Logo.svg.png',
        'Inter Milan': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/FC_Internazionale_Milano_2021.svg/1200px-FC_Internazionale_Milano_2021.svg.png',
        'AC Milan': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/AC_Milan_logo.svg/1200px-AC_Milan_logo.svg.png',
        'Juventus': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Juventus_FC_2017_logo.svg/1200px-Juventus_FC_2017_logo.svg.png',
        'Napoli': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/SSC_Napoli_logo.svg/1200px-SSC_Napoli_logo.svg.png',
        'Roma': 'https://upload.wikimedia.org/wikipedia/en/thumb/7/70/AS_Roma_logo_%282017%29.svg/1200px-AS_Roma_logo_%282017%29.svg.png',
        'Lazio': 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d8/SS_Lazio_logo.svg/1200px-SS_Lazio_logo.svg.png',
        'Atalanta': 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a1/Atalanta_BC_logo.svg/1200px-Atalanta_BC_logo.svg.png'
    };

    const clubSelect = document.getElementById('playerClub');
    const clubLogoImg = document.getElementById('clubLogoImg');
    const clubLogoFallback = document.getElementById('clubLogoFallback');
    const clubLogoLabel = document.getElementById('clubLogoLabel');
    const playerForm = document.getElementById('playerForm');
    const playerFaceInput = document.getElementById('playerFaceInput');
    const facePreviewContainer = document.getElementById('facePreviewContainer');
    const ovrValue = document.getElementById('ovrValue');
    const ovrBar = document.getElementById('ovrBar');

    // --- Set initial OVR to 65 ---
    if (ovrValue) ovrValue.textContent = '65';
    if (ovrBar) ovrBar.style.width = (65 / 99 * 100) + '%';

    function updateClubLogo() {
        const selected = clubSelect.value;
        const logoUrl = clubLogoDatabase[selected] || '';
        if (logoUrl) {
            clubLogoImg.src = logoUrl;
            clubLogoImg.style.display = 'block';
            clubLogoFallback.style.display = 'none';
            clubLogoLabel.textContent = selected;
            clubLogoLabel.style.color = 'var(--green-bright)';
        } else {
            clubLogoImg.style.display = 'none';
            clubLogoFallback.style.display = 'flex';
            clubLogoLabel.textContent = selected || 'Select a club';
            clubLogoLabel.style.color = 'var(--text-secondary)';
        }
    }

    if (clubSelect) clubSelect.addEventListener('change', updateClubLogo);

    if (playerFaceInput && facePreviewContainer) {
        playerFaceInput.addEventListener('change', function(e) {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(ev) {
                    const img = document.createElement('img');
                    img.src = ev.target.result;
                    img.style.width = '100%';
                    img.style.height = '100%';
                    img.style.objectFit = 'cover';
                    img.style.borderRadius = '50%';
                    facePreviewContainer.innerHTML = '';
                    facePreviewContainer.appendChild(img);
                    localStorage.setItem('theJourney_playerFace', ev.target.result);
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Randomise OVR: 65-70
    document.getElementById('btnRandomise').addEventListener('click', () => {
        const baseOVR = Math.floor(Math.random() * 6) + 65; // 65-70
        if (ovrValue) ovrValue.textContent = baseOVR;
        if (ovrBar) ovrBar.style.width = (baseOVR / 99 * 100) + '%';
    });

    // --- Generate attributes based on position and OVR ---
    function generateAttributes(position, ovr) {
        const pos = position.toUpperCase();
        // Base attributes around OVR value
        const base = ovr - 15;
        
        // Position-specific adjustments
        const adjustments = {
            'ST': { acceleration: 8, sprintSpeed: 6, stamina: 4, finishing: 12, passing: 2, dribbling: 6, ballControl: 6, composure: 8, strength: 6, vision: 2, doubleTouch: 4, agility: 6 },
            'CF': { acceleration: 6, sprintSpeed: 5, stamina: 4, finishing: 10, passing: 4, dribbling: 8, ballControl: 8, composure: 8, strength: 4, vision: 4, doubleTouch: 6, agility: 6 },
            'LW': { acceleration: 10, sprintSpeed: 10, stamina: 6, finishing: 6, passing: 6, dribbling: 10, ballControl: 8, composure: 4, strength: 2, vision: 4, doubleTouch: 8, agility: 10 },
            'RW': { acceleration: 10, sprintSpeed: 10, stamina: 6, finishing: 6, passing: 6, dribbling: 10, ballControl: 8, composure: 4, strength: 2, vision: 4, doubleTouch: 8, agility: 10 },
            'CAM': { acceleration: 6, sprintSpeed: 4, stamina: 6, finishing: 6, passing: 12, dribbling: 8, ballControl: 10, composure: 6, strength: 2, vision: 12, doubleTouch: 6, agility: 6 },
            'CM': { acceleration: 4, sprintSpeed: 4, stamina: 8, finishing: 4, passing: 10, dribbling: 6, ballControl: 8, composure: 6, strength: 4, vision: 8, doubleTouch: 4, agility: 4 },
            'CDM': { acceleration: 2, sprintSpeed: 2, stamina: 10, finishing: 2, passing: 8, dribbling: 4, ballControl: 6, composure: 6, strength: 10, vision: 6, doubleTouch: 2, agility: 2 },
            'LB': { acceleration: 8, sprintSpeed: 8, stamina: 8, finishing: 2, passing: 6, dribbling: 4, ballControl: 6, composure: 6, strength: 6, vision: 4, doubleTouch: 2, agility: 6 },
            'RB': { acceleration: 8, sprintSpeed: 8, stamina: 8, finishing: 2, passing: 6, dribbling: 4, ballControl: 6, composure: 6, strength: 6, vision: 4, doubleTouch: 2, agility: 6 },
            'CB': { acceleration: 2, sprintSpeed: 2, stamina: 6, finishing: 2, passing: 4, dribbling: 2, ballControl: 4, composure: 8, strength: 12, vision: 2, doubleTouch: 0, agility: 2 },
            'GK': { acceleration: 2, sprintSpeed: 2, stamina: 4, finishing: 0, passing: 6, dribbling: 2, ballControl: 6, composure: 10, strength: 6, vision: 4, doubleTouch: 0, agility: 4 }
        };

        const adj = adjustments[pos] || { acceleration: 4, sprintSpeed: 4, stamina: 4, finishing: 4, passing: 4, dribbling: 4, ballControl: 4, composure: 4, strength: 4, vision: 4, doubleTouch: 2, agility: 4 };

        const attrs = {};
        const keys = ['acceleration', 'sprintSpeed', 'stamina', 'finishing', 'passing', 'dribbling', 'ballControl', 'composure', 'strength', 'vision', 'doubleTouch', 'agility'];
        keys.forEach(key => {
            let val = base + (adj[key] || 4) + Math.floor(Math.random() * 4) - 2;
            attrs[key] = Math.max(30, Math.min(99, Math.round(val)));
        });

        return attrs;
    }

    if (playerForm) {
        playerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const playerName = document.getElementById('playerName').value.trim();
            const selectedClub = document.getElementById('playerClub').value;
            const playerPos = document.getElementById('playerPosition').value;

            if (!playerName || !selectedClub || !playerPos) {
                alert('Please complete all required fields!');
                return;
            }

            // OVR defaults to 65 if not set or invalid
            let ovr = parseInt(ovrValue?.textContent);
            if (isNaN(ovr) || ovr < 40) ovr = 65;

            // Generate attributes based on position and OVR
            const attributes = generateAttributes(playerPos, ovr);

            const playerData = {
                name: playerName,
                nationality: document.getElementById('playerNationality').value || 'Malaysia',
                position: playerPos,
                foot: document.getElementById('playerFoot').value || 'Right',
                height: parseInt(document.getElementById('playerHeight').value) || 178,
                weight: parseInt(document.getElementById('playerWeight').value) || 70,
                club: selectedClub,
                ovr: ovr,
                age: 18,
                bankBalance: 500,
                salary: 300,
                matchesPlayed: 0,
                goalsScored: 0,
                assists: 0,
                currentMatchWeek: 1,
                lastPaidWeek: 0,
                season: 1,
                morale: 70,
                fatigue: 0,
                reputation: 0,
                leagueData: {},
                attributes: attributes,
                faceImage: localStorage.getItem('theJourney_playerFace') || '',
                careerTimeline: [],
                mediaMentions: [],
                sponsors: [],
                pendingOffers: [],
                ownedBoots: [],
                equippedBoots: null
            };

            localStorage.setItem('theJourney_playerData', JSON.stringify(playerData));
            localStorage.setItem('theJourney_gameStarted', 'true');
            window.location.href = 'dashboard.html';
        });
    }
});
