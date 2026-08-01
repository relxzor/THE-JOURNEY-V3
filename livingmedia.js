// ==================== livingmedia.js (v2 - LIVING MEDIA ENGINE) ====================
(function() {
    'use strict';

    const player = JSON.parse(localStorage.getItem('theJourney_playerData') || 'null');
    if (!player || !player.name) { window.location.href = 'index.html'; return; }

    const name = player.name;
    const club = player.club || player.academy || 'their club';
    const goals = player.goalsScored || 0;
    const assists = player.assists || 0;
    const trophies = (player.trophies || []).length;
    const reputation = player.reputation || 0;
    const ovr = player.ovr || 60;
    const week = player.currentMatchWeek || 1;
    const season = player.season || 1;

    // Fan handle pools for realism
    const FAN_HANDLES = ['@FootballDaily', '@TransferHub', '@PitchsideTV', '@TheAthleticFC', '@GoalAlerts', '@MatchdayCentral', '@ScoutReportHQ', '@FanVoiceUK', '@StatManiaFC', '@UltrasChant'];
    const JOURNO_HANDLES = ['@SkySportsNews', '@BBCSport', '@ESPN_FC', '@FabrizioR', '@David_Ornstein', '@Sport_Bible'];
    const RIVAL_HANDLES = ['@RivalFanTV', '@OppositionView', '@DerbyDayTalk'];

    function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
    function pickUnique(arr, n) {
        const copy = [...arr];
        const out = [];
        while (out.length < n && copy.length) out.push(copy.splice(Math.floor(Math.random() * copy.length), 1)[0]);
        return out;
    }
    function formatCount(n) {
        if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
        if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
        return String(n);
    }
    function timeAgo(dateStr) {
        const diff = Math.max(0, Date.now() - new Date(dateStr).getTime());
        const mins = Math.floor(diff / 60000);
        if (mins < 1) return 'just now';
        if (mins < 60) return mins + 'm';
        const hrs = Math.floor(mins / 60);
        if (hrs < 24) return hrs + 'h';
        return Math.floor(hrs / 24) + 'd';
    }

    function showToast(m, t) {
        const c = document.getElementById('toastContainer');
        if (!c) return;
        const d = document.createElement('div');
        d.className = 'toast ' + t;
        d.textContent = m;
        c.appendChild(d);
        setTimeout(() => {
            d.style.opacity = '0';
            d.style.transform = 'translateX(130%)';
            d.style.transition = 'all 0.35s ease';
            setTimeout(() => d.remove(), 350);
        }, 3200);
    }

    // ==================== DYNAMIC HEADLINE GENERATION ====================
    // Builds a pool of contextual headlines from the player's actual stats,
    // so the feed feels alive even without manual mediaMentions entries.
    function generateContextualHeadlines() {
        const pool = [];

        if (goals >= 20) pool.push({ h: `${name} closing in on a 20-goal season for ${club}`, sentiment: 'positive' });
        else if (goals >= 10) pool.push({ h: `${name} in red-hot form with ${goals} goals this season`, sentiment: 'positive' });
        else if (goals >= 1) pool.push({ h: `${name} off the mark — ${goals} goal${goals > 1 ? 's' : ''} and counting`, sentiment: 'positive' });

        if (assists >= 10) pool.push({ h: `Provider-in-chief: ${name} racks up ${assists} assists`, sentiment: 'positive' });

        if (ovr >= 85) pool.push({ h: `Scouts circle as ${name}'s rating hits ${ovr} OVR`, sentiment: 'positive' });
        else if (ovr >= 78) pool.push({ h: `${name} tipped for a breakout campaign at ${club}`, sentiment: 'neutral' });

        if (trophies >= 1) pool.push({ h: `${name} lifts silverware — ${trophies} trophy${trophies > 1 ? 'ies' : ''} and rising`, sentiment: 'positive' });

        if (reputation >= 80) pool.push({ h: `${name} named among the league's most marketable stars`, sentiment: 'positive' });
        else if (reputation <= 20 && reputation > 0) pool.push({ h: `Pressure mounts on ${name} to silence doubters`, sentiment: 'negative' });

        pool.push({ h: `Matchweek ${week}: pundits debate ${name}'s role at ${club}`, sentiment: 'neutral' });
        pool.push({ h: `${club} fans split on ${name}'s recent performances`, sentiment: 'neutral' });
        pool.push({ h: `Season ${season} review: where does ${name} rank in the league?`, sentiment: 'neutral' });

        if (goals === 0 && assists === 0) pool.push({ h: `${name} yet to open the account for ${club} this season`, sentiment: 'negative' });

        return pool;
    }

    function buildFeedItems() {
        const stored = (player.mediaMentions || []).slice(-6).reverse().map(m => ({
            headline: typeof m === 'string' ? m : (m.headline || m.detail || 'Media mention'),
            date: (typeof m === 'object' && m.date) ? m.date : new Date().toISOString(),
            sentiment: (typeof m === 'object' && m.type === 'transfer') ? 'positive' : 'neutral',
            tag: (typeof m === 'object' && m.type) ? m.type : 'news'
        }));

        const generated = generateContextualHeadlines();
        const need = Math.max(0, 5 - stored.length);
        const chosen = pickUnique(generated, Math.min(need + 2, generated.length)).slice(0, Math.max(3, need));

        const fresh = chosen.map((c, i) => ({
            headline: c.h,
            date: new Date(Date.now() - (i + 1) * 1000 * 60 * (30 + Math.random() * 200)).toISOString(),
            sentiment: c.sentiment,
            tag: 'wire'
        }));

        return [...stored, ...fresh].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 7);
    }

    function renderNewsFeed() {
        const container = document.getElementById('newsFeed');
        if (!container) return;
        const items = buildFeedItems();
        if (items.length === 0) {
            container.innerHTML = `<p class="no-data">No news yet. Your actions on the pitch will make headlines.</p>`;
            return;
        }
        container.innerHTML = items.map((item, i) => `
            <div class="news-item sentiment-${item.sentiment}" style="animation-delay:${i * 60}ms">
                <div class="news-icon"><i class="fa-solid ${item.tag === 'transfer' ? 'fa-arrows-rotate' : item.tag === 'wire' ? 'fa-bolt' : 'fa-newspaper'}"></i></div>
                <div class="news-body">
                    <p>${item.headline}</p>
                    <span class="news-date">${timeAgo(item.date)} ago</span>
                </div>
            </div>
        `).join('');
    }

    // ==================== SOCIAL MEDIA FEED ====================
    function generateSocialPosts() {
        const posts = [];
        const engagementBase = 300 + reputation * 40 + goals * 60 + assists * 30 + trophies * 500;

        const fanTemplates = [
            `${name} is exactly what ${club} needed this season 🔥`,
            `Can we talk about ${name}'s work rate? Most underrated player in the league.`,
            `${name} deserves more minutes tbh`,
            `Watching ${name} develop has been amazing this season 👏`,
            `${club} fans, are we sleeping on ${name}?`
        ];
        const journoTemplates = [
            `Sources close to ${club} say ${name} has impressed the coaching staff this week.`,
            `${name}'s underlying numbers this season are quietly excellent. Full breakdown tomorrow.`,
            `Keeping an eye on ${name} — a player on the rise at ${club}.`
        ];
        const rivalTemplates = [
            `Not impressed by ${name} yet. Show me in a big game.`,
            `${club} fans overhyping ${name} again 🙄`,
            `${name} had a quiet one last week, let's be honest.`
        ];

        const fanHandles = pickUnique(FAN_HANDLES, 2);
        fanHandles.forEach(h => posts.push({
            handle: h, type: 'fan', verified: false,
            text: pick(fanTemplates),
            likes: Math.round(engagementBase * (0.8 + Math.random() * 1.4)),
            comments: Math.round(engagementBase * (0.1 + Math.random() * 0.2)),
            shares: Math.round(engagementBase * (0.05 + Math.random() * 0.15))
        }));

        posts.push({
            handle: pick(JOURNO_HANDLES), type: 'journo', verified: true,
            text: pick(journoTemplates),
            likes: Math.round(engagementBase * (1.5 + Math.random() * 2)),
            comments: Math.round(engagementBase * (0.2 + Math.random() * 0.3)),
            shares: Math.round(engagementBase * (0.3 + Math.random() * 0.4))
        });

        if (reputation > 15 && Math.random() > 0.4) {
            posts.push({
                handle: pick(RIVAL_HANDLES), type: 'rival', verified: false,
                text: pick(rivalTemplates),
                likes: Math.round(engagementBase * (0.3 + Math.random() * 0.6)),
                comments: Math.round(engagementBase * (0.15 + Math.random() * 0.25)),
                shares: Math.round(engagementBase * 0.05)
            });
        }

        posts.sort(() => Math.random() - 0.5);
        return posts.slice(0, 4);
    }

    function renderSocialFeed() {
        const container = document.getElementById('socialFeed');
        if (!container) return;
        const posts = generateSocialPosts();
        container.innerHTML = posts.map((p, i) => `
            <div class="social-post post-${p.type}" style="animation-delay:${i * 80}ms">
                <div class="post-head">
                    <div class="post-avatar avatar-${p.type}"><i class="fa-solid ${p.type === 'journo' ? 'fa-satellite-dish' : p.type === 'rival' ? 'fa-flag' : 'fa-user'}"></i></div>
                    <div class="post-handle-wrap">
                        <strong>${p.handle}</strong>${p.verified ? '<i class="fa-solid fa-circle-check verified-badge"></i>' : ''}
                    </div>
                </div>
                <p class="post-text">${p.text}</p>
                <div class="social-meta">
                    <span><i class="fa-solid fa-heart"></i> ${formatCount(p.likes)}</span>
                    <span><i class="fa-solid fa-comment"></i> ${formatCount(p.comments)}</span>
                    <span><i class="fa-solid fa-retweet"></i> ${formatCount(p.shares)}</span>
                </div>
            </div>
        `).join('');
    }

    // ==================== TICKER ====================
    function renderTicker() {
        const track = document.getElementById('tickerTrack');
        if (!track) return;
        const bits = [
            `⚽ ${name} · ${goals}G ${assists}A this season`,
            `📊 OVR ${ovr} · Reputation ${reputation}`,
            `🏆 ${trophies} trophy${trophies !== 1 ? 'ies' : ''} won`,
            `📅 Season ${season} · Matchweek ${week}`,
            `🔥 Trending at ${club}`
        ];
        const content = bits.concat(bits).map(b => `<span class="ticker-item">${b}</span>`).join('');
        track.innerHTML = content;
    }

    // ==================== HYPE METER ====================
    function renderHype() {
        const hype = Math.max(0, Math.min(100, Math.round(
            reputation * 0.5 + goals * 1.5 + assists * 1 + trophies * 8 + (ovr - 60) * 0.8
        )));
        const fill = document.getElementById('hypeFill');
        const val = document.getElementById('hypeValue');
        if (fill) setTimeout(() => { fill.style.width = hype + '%'; }, 100);
        if (val) val.textContent = hype;
        if (fill) {
            fill.style.background = hype > 70
                ? 'linear-gradient(90deg, var(--green-primary), var(--gold-primary))'
                : hype > 35
                    ? 'linear-gradient(90deg, var(--green-dark), var(--green-primary))'
                    : 'var(--text-muted)';
        }
    }

    // ==================== INTERVIEW SYSTEM ====================
    const TONE_CONFIG = {
        confident: {
            responses: [
                `"I know what I bring to this team. I expect to keep delivering."`,
                `"Records are there to be broken. I'm just getting started."`,
                `"Pressure is a privilege. I want the ball in the big moments."`
            ],
            repRange: [3, 7],
            backlashChance: 0.3,
            backlashRep: [-4, -1],
            headline: (r) => `${name} makes bold claim to press: "${r}"`,
            toast: '⚡ Bold interview! Reputation may swing either way.'
        },
        humble: {
            responses: [
                `"The team comes first. Personal glory follows."`,
                `"I'm grateful for the opportunities given to me here."`,
                `"There's always more to learn. I just want to keep improving."`
            ],
            repRange: [1, 3],
            backlashChance: 0,
            backlashRep: [0, 0],
            headline: (r) => `${name} stays grounded: ${r}`,
            toast: '🙏 Safe answer given. Reputation +steady.'
        },
        controversial: {
            responses: [
                `"Some people don't want to see us succeed. We'll prove them wrong."`,
                `"I don't think the officials are always fair to us."`,
                `"Certain rivals talk too much and do too little."`
            ],
            repRange: [5, 12],
            backlashChance: 0.55,
            backlashRep: [-10, -4],
            headline: (r) => `${name} sparks debate with fiery comments: "${r}"`,
            toast: '🔥 Controversial take sent to press...'
        }
    };

    function handleInterview(tone) {
        const cfg = TONE_CONFIG[tone];
        const responseText = pick(cfg.responses);
        const isBacklash = Math.random() < cfg.backlashChance;

        let repChange;
        if (isBacklash) {
            repChange = Math.round(cfg.backlashRep[0] + Math.random() * (cfg.backlashRep[1] - cfg.backlashRep[0]));
        } else {
            repChange = Math.round(cfg.repRange[0] + Math.random() * (cfg.repRange[1] - cfg.repRange[0]));
        }

        player.reputation = Math.max(0, (player.reputation || 0) + repChange);
        player.mediaMentions = player.mediaMentions || [];
        player.mediaMentions.push({
            headline: cfg.headline(responseText),
            detail: isBacklash ? 'The comments did not land well with fans and pundits.' : 'The comments were well received by fans and press.',
            date: new Date().toISOString(),
            type: 'interview'
        });
        localStorage.setItem('theJourney_playerData', JSON.stringify(player));

        const sign = repChange >= 0 ? '+' : '';
        if (isBacklash) {
            showToast(`📰 Backlash! Reputation ${sign}${repChange}`, 'warning');
        } else {
            showToast(`${cfg.toast} Reputation ${sign}${repChange}`, 'success');
        }
        setTimeout(() => location.reload(), 900);
    }

    function bindInterviewButtons() {
        ['confident', 'humble', 'controversial'].forEach(tone => {
            const btn = document.getElementById('btn' + tone.charAt(0).toUpperCase() + tone.slice(1));
            if (btn) btn.addEventListener('click', () => {
                document.querySelectorAll('.tone-btn').forEach(b => b.disabled = true);
                handleInterview(tone);
            });
        });
    }

    // ==================== NAV TOGGLE ====================
    function bindNav() {
        const nt = document.getElementById('navToggle');
        const nl = document.getElementById('navLinks');
        if (nt && nl) {
            nt.addEventListener('click', () => nl.classList.toggle('open'));
            document.addEventListener('click', (e) => {
                const nav = document.getElementById('globalNav');
                if (nav && !nav.contains(e.target) && nl.classList.contains('open')) nl.classList.remove('open');
            });
        }
    }

    // ==================== INIT ====================
    function init() {
        renderNewsFeed();
        renderSocialFeed();
        renderTicker();
        renderHype();
        bindInterviewButtons();
        bindNav();
    }

    init();
})();
