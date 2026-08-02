// ==================== career.js (v7 - COMPLETE ENGINE OVERHAUL) ====================
// Full rewrite with bug fixes, performance optimization, and enhanced gameplay
(function() {
    'use strict';

    // ========================================
    // 1. CORE INITIALIZATION & DATA VALIDATION
    // ========================================
    
    class GameEngine {
        constructor() {
            this.player = null;
            this.config = {
                MAX_WEEKS_PER_SEASON: 38,
                MIN_ABILITY_IMPACT: 0.8,
                MAX_ABILITY_IMPACT: 1.2,
                INJURY_MULTIPLIER: 0.6,
                AWAY_FORM_PENALTY: 0.95,
                EURO_STAGE_WEEKS: [8, 16, 24, 32],
                ATTRIBUTE_CAPS: {
                    min: 1,
                    max: 99,
                    baseMin: 30,
                    baseMax: 90
                }
            };
            this.state = {
                isMatchRunning: false,
                matchInterval: null,
                pressConferenceShown: false
            };
            this.init();
        }

        init() {
            this.loadPlayerData();
            this.validateAndFixData();
            this.setupEventListeners();
            this.render();
        }

        loadPlayerData() {
            const stored = localStorage.getItem('theJourney_playerData');
            this.player = stored ? JSON.parse(stored) : null;
            
            if (!this.player || !this.player.name) {
                console.warn('No valid player data found');
                window.location.href = 'index.html';
                return;
            }
        }

        validateAndFixData() {
            const p = this.player;
            
            // Initialize attributes if missing
            if (!p.attributes || typeof p.attributes !== 'object') {
                p.attributes = this.createDefaultAttributes();
            }

            // Validate and repair each attribute
            this.config.ATTRIBUTE_CAPS;
            const attrKeys = [
                'acceleration', 'sprintSpeed', 'stamina', 'finishing',
                'passing', 'dribbling', 'ballControl', 'composure',
                'strength', 'vision', 'doubleTouch', 'agility', 'injuryResistance'
            ];

            attrKeys.forEach(key => {
                if (typeof p.attributes[key] !== 'number' || isNaN(p.attributes[key])) {
                    p.attributes[key] = this.randomInRange(45, 65);
                } else {
                    p.attributes[key] = Math.max(1, Math.min(99, p.attributes[key]));
                }
            });

            // Essential career fields
            p.currentMatchWeek = Math.max(1, p.currentMatchWeek || 1);
            p.currentSeason = Math.max(1, p.currentSeason || 1);
            p.club = p.club || 'Unassigned';
            p.position = p.position || 'CM';
            p.matchesPlayed = Math.max(0, p.matchesPlayed || 0);
            p.ovr = Math.max(1, Math.min(99, p.ovr || this.calculateOverall(p.attributes)));
            p.salary = Math.max(0, p.salary || 15000);
            p.contractYears = Math.max(0, p.contractYears || 2);
            p.injuries = p.injuries || [];
            p.retirementAge = p.retirementAge || 35;
            p.age = Math.max(16, p.age || 22);
            p.retired = p.retired === true;

            // Match history & stats
            if (!Array.isArray(p.matchHistory)) p.matchHistory = [];
            if (!p.seasonStats) p.seasonStats = { goals: 0, assists: 0, played: 0 };
            if (!p.careerStats) p.careerStats = { goals: 0, assists: 0, played: 0 };
            if (!p.europeanState) {
                p.europeanState = { userComp: null, stageIndex: 0, qualified: false };
            }
            
            // Awards
            if (!p.awards) p.awards = [];
            if (!p.trophies) p.trophies = [];

            this.savePlayerData();
        }

        createDefaultAttributes() {
            return {
                acceleration: 50, sprintSpeed: 50, stamina: 48, finishing: 45,
                passing: 46, dribbling: 48, ballControl: 46, composure: 42,
                strength: 44, vision: 40, doubleTouch: 38,
                agility: 47, injuryResistance: 45
            };
        }

        calculateOverall(attributes) {
            const values = Object.values(attributes).filter(v => typeof v === 'number');
            return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
        }

        savePlayerData() {
            localStorage.setItem('theJourney_playerData', JSON.stringify(this.player));
        }

        randomInRange(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        // ========================================
        // 2. MATCH SIMULATION ENGINE (IMPROVED)
        // ========================================

        calculateMatchPerformance(attribute, baseMultiplier = 1) {
            const variance = this.randomInRange(80, 120) / 100;
            const formBonus = this.calculateFormBonus();
            const injuryPenalty = this.calculateInjuryPenalty();
            
            return (attribute * baseMultiplier * variance * formBonus * injuryPenalty);
        }

        calculateFormBonus() {
            if (this.player.matchHistory.length === 0) return 1;
            
            const recent = this.player.matchHistory.slice(-3);
            const avgPerformance = recent.reduce((sum, m) => sum + (m.performance || 0), 0) / recent.length;
            
            // Form scaling: -10% (bad) to +10% (good)
            return 0.95 + (avgPerformance / 100 * 0.1);
        }

        calculateInjuryPenalty() {
            const currentInjury = this.player.injuries.find(inj => inj.weeksRemaining > 0);
            return currentInjury ? this.config.INJURY_MULTIPLIER : 1.0;
        }

        simulateMatch(homeTeam, awayTeam) {
            if (this.state.isMatchRunning) return;
            
            this.state.isMatchRunning = true;
            const userIsHome = (this.player.currentMatchWeek % 2) === 1;
            const userTeam = userIsHome ? homeTeam : awayTeam;
            const opponentTeam = userIsHome ? awayTeam : homeTeam;

            // Event-based simulation
            let userGoals = 0;
            let oppGoals = 0;
            const matchEvents = [];
            const minutes = [5, 12, 18, 25, 31, 38, 42, 51, 58, 65, 72, 79, 85, 90];

            minutes.forEach(min => {
                const rand = Math.random();
                const userAttack = this.calculateMatchPerformance(this.player.attributes.finishing, 0.8) / 100;
                const oppAttack = this.randomInRange(35, 75) / 100;

                if (rand < userAttack) {
                    userGoals++;
                    matchEvents.push({ min, type: 'goal', team: userTeam, scorer: this.player.name });
                } else if (rand > (1 - oppAttack * 0.6)) {
                    oppGoals++;
                    matchEvents.push({ min, type: 'goal', team: opponentTeam, scorer: 'Opponent' });
                }

                // Rare events
                if (Math.random() < 0.05) {
                    matchEvents.push({ min, type: 'yellow', team: userTeam });
                } else if (Math.random() < 0.02) {
                    matchEvents.push({ min, type: 'injury', team: userTeam });
                }
            });

            // Calculate performance rating
            const performance = this.calculatePlayerPerformance(userGoals, oppGoals, matchEvents);

            // Update player data
            this.updatePlayerAfterMatch(userGoals, oppGoals, performance, userIsHome);

            this.state.isMatchRunning = false;
            this.displayMatchResult(userTeam, opponentTeam, userGoals, oppGoals, matchEvents, performance);
        }

        calculatePlayerPerformance(goals, conceded, events) {
            let rating = 65;
            
            // Goals and assists
            rating += goals * 8;
            
            // Defensive performance
            rating -= Math.min(conceded * 3, 15);
            
            // Events
            const redCards = events.filter(e => e.type === 'red' && e.team === this.player.club).length;
            const injuryCards = events.filter(e => e.type === 'injury').length;
            
            rating -= redCards * 20;
            rating -= injuryCards * 10;

            return Math.max(40, Math.min(95, Math.round(rating)));
        }

        updatePlayerAfterMatch(goals, conceded, performance, isHome) {
            const p = this.player;
            
            // Update match history
            p.matchHistory.push({
                week: p.currentMatchWeek,
                season: p.currentSeason,
                opponent: p.nextOpponent,
                isHome,
                goals,
                conceded,
                performance,
                date: new Date().toISOString()
            });

            // Keep only last 20 matches
            if (p.matchHistory.length > 20) {
                p.matchHistory = p.matchHistory.slice(-20);
            }

            // Update stats
            p.matchesPlayed++;
            p.seasonStats.played = (p.seasonStats.played || 0) + 1;
            p.seasonStats.goals = (p.seasonStats.goals || 0) + goals;
            p.careerStats.played = (p.careerStats.played || 0) + 1;
            p.careerStats.goals = (p.careerStats.goals || 0) + goals;

            // Attribute progression (realistic)
            this.progressAttributes(goals, performance);

            // Age/contract progression
            p.currentMatchWeek++;
            if (p.currentMatchWeek > this.config.MAX_WEEKS_PER_SEASON) {
                this.progressSeason();
            }

            // Recalculate overall rating
            p.ovr = this.calculateOverall(p.attributes);

            // Check retirement
            if (p.age >= p.retirementAge) {
                p.retired = true;
            }

            this.savePlayerData();
        }

        progressAttributes(goals, performance) {
            const p = this.player;
            const boost = (goals > 0 ? 0.3 : 0) + (performance / 100 * 0.5);

            // Finishing improves with goals
            p.attributes.finishing = Math.min(99, p.attributes.finishing + boost);

            // Physical attributes decay with age
            const ageDecay = p.age > 30 ? 0.5 : 0;
            Object.keys(p.attributes).forEach(key => {
                p.attributes[key] -= ageDecay;
            });
        }

        progressSeason() {
            const p = this.player;
            p.currentSeason++;
            p.currentMatchWeek = 1;
            p.age++;
            p.contractYears = Math.max(0, p.contractYears - 1);

            // Reset season stats
            p.seasonStats = { goals: 0, assists: 0, played: 0 };
        }

        displayMatchResult(homeTeam, awayTeam, homeGoals, awayGoals, events, performance) {
            const modal = document.getElementById('matchModalOverlay');
            if (!modal) return;

            const content = document.getElementById('matchResultContent') || 
                           document.createElement('div');
            
            const result = homeGoals === awayGoals ? 'DRAW' : 
                          homeGoals > awayGoals ? 'HOME WIN' : 'AWAY WIN';
            const resultColor = result === 'DRAW' ? '#FFD700' : 
                               result === 'HOME WIN' ? '#00CC00' : '#FF6B6B';

            content.innerHTML = `
                <div style="text-align: center; color: #fff;">
                    <h2 style="margin: 20px 0; font-size: 2.5em;">MATCH RESULT</h2>
                    <div style="display: flex; justify-content: space-around; align-items: center; margin: 30px 0; font-size: 1.8em; font-weight: bold;">
                        <div>${homeTeam}</div>
                        <div style="font-size: 3em; margin: 0 20px;">
                            <span style="color: #4CAF50;">${homeGoals}</span> - 
                            <span style="color: #2196F3;">${awayGoals}</span>
                        </div>
                        <div>${awayTeam}</div>
                    </div>
                    
                    <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <p style="font-size: 1.3em; color: ${resultColor}; margin: 0;">${result}</p>
                        <p style="font-size: 1.1em; color: #FFD700; margin: 10px 0;">Your Performance: <strong>${performance}/95</strong></p>
                    </div>

                    <div style="margin: 20px 0; text-align: left; background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px; max-height: 200px; overflow-y: auto;">
                        <h4>Match Events:</h4>
                        ${events.map(e => `
                            <div style="font-size: 0.9em; margin: 5px 0;">
                                <strong>${e.min}'</strong> - ${e.type.toUpperCase()}: ${e.scorer || e.team}
                            </div>
                        `).join('')}
                    </div>

                    <button id="btnCloseMatchResult" style="
                        background: #4CAF50;
                        color: white;
                        border: none;
                        padding: 12px 24px;
                        border-radius: 6px;
                        font-size: 1.1em;
                        cursor: pointer;
                        margin-top: 15px;
                    ">Continue Career</button>
                </div>
            `;

            if (!document.getElementById('matchResultContent')) {
                modal.appendChild(content);
                content.id = 'matchResultContent';
            }

            modal.classList.add('active');

            const closeBtn = document.getElementById('btnCloseMatchResult');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    modal.classList.remove('active');
                    this.render();
                });
            }
        }

        // ========================================
        // 3. UI RENDERING
        // ========================================

        render() {
            this.renderMatchInfo();
            this.renderStats();
            this.renderCareerInfo();
            this.renderAttributes();
            this.renderMatchHistory();
        }

        renderMatchInfo() {
            const p = this.player;
            if (!document.getElementById('matchContainer')) return;

            const userIsHome = (p.currentMatchWeek % 2) === 1;
            const homeEl = document.getElementById('homeTeam');
            const awayEl = document.getElementById('awayTeam');
            const venueEl = document.getElementById('matchVenue');

            if (homeEl) homeEl.textContent = userIsHome ? p.club : p.nextOpponent;
            if (awayEl) awayEl.textContent = userIsHome ? p.nextOpponent : p.club;
            if (venueEl) {
                venueEl.textContent = userIsHome ? '🏟️ HOME' : '🚌 AWAY';
                venueEl.className = 'pill ' + (userIsHome ? 'pill-green' : 'pill-blue');
                venueEl.style.fontWeight = 'bold';
            }
        }

        renderStats() {
            const p = this.player;
            const container = document.getElementById('playerStats');
            if (!container) return;

            container.innerHTML = `
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div class="stat-card">
                        <h4>Age</h4>
                        <p style="font-size: 1.5em; color: #FFD700;">${p.age}</p>
                    </div>
                    <div class="stat-card">
                        <h4>Overall Rating</h4>
                        <p style="font-size: 1.5em; color: #4CAF50;">${p.ovr}/99</p>
                    </div>
                    <div class="stat-card">
                        <h4>Matches Played</h4>
                        <p style="font-size: 1.5em; color: #2196F3;">${p.matchesPlayed}</p>
                    </div>
                    <div class="stat-card">
                        <h4>Season Goals</h4>
                        <p style="font-size: 1.5em; color: #FF9800;">${p.seasonStats?.goals || 0}</p>
                    </div>
                </div>
            `;
        }

        renderCareerInfo() {
            const p = this.player;
            const container = document.getElementById('careerInfo');
            if (!container) return;

            container.innerHTML = `
                <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; border-left: 4px solid #4CAF50;">
                    <h3 style="margin: 0 0 15px 0; color: #FFD700;">Player: ${p.name}</h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 0.95em;">
                        <p><strong>Club:</strong> ${p.club}</p>
                        <p><strong>Position:</strong> ${p.position}</p>
                        <p><strong>Season:</strong> ${p.currentSeason}</p>
                        <p><strong>Week:</strong> ${p.currentMatchWeek}/${this.config.MAX_WEEKS_PER_SEASON}</p>
                        <p><strong>Contract:</strong> ${p.contractYears} years</p>
                        <p><strong>Status:</strong> ${p.retired ? '🏆 RETIRED' : '⚽ ACTIVE'}</p>
                    </div>
                </div>
            `;
        }

        renderAttributes() {
            const attrs = this.player.attributes;
            const container = document.getElementById('playerAttributes');
            if (!container) return;

            const attrDisplay = Object.entries(attrs)
                .map(([key, value]) => `
                    <div style="display: flex; justify-content: space-between; margin: 8px 0; padding: 8px; background: rgba(255,255,255,0.05); border-radius: 4px;">
                        <span style="text-transform: capitalize; font-weight: 500;">${key.replace(/([A-Z])/g, ' $1')}</span>
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <div style="width: 150px; height: 20px; background: rgba(0,0,0,0.3); border-radius: 10px; overflow: hidden;">
                                <div style="width: ${(value / 99 * 100)}%; height: 100%; background: ${this.getAttributeColor(value)}; transition: width 0.3s;"></div>
                            </div>
                            <span style="color: ${this.getAttributeColor(value)}; font-weight: bold; min-width: 30px; text-align: right;">${value}</span>
                        </div>
                    </div>
                `)
                .join('');

            container.innerHTML = `
                <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px;">
                    <h4 style="color: #FFD700; margin-top: 0;">Player Attributes</h4>
                    ${attrDisplay}
                </div>
            `;
        }

        renderMatchHistory() {
            const history = this.player.matchHistory.slice(-5).reverse();
            const container = document.getElementById('matchHistoryContainer');
            if (!container) return;

            const historyHTML = history.map((match, idx) => {
                const icon = match.goals > 0 ? '⚽' : match.goals === 0 ? '🔲' : '';
                const resultClass = match.goals > match.conceded ? 'win' : 
                                   match.goals < match.conceded ? 'loss' : 'draw';
                
                return `
                    <div style="
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
