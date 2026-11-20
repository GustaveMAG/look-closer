/* Look Closer — l'expérience visiteur, partagée par index.html (plein écran)
   et presenter.html (dans un cadre de téléphone).
   Les œuvres (textes, visite, détails) sont décrites dans artworks.js ; ?art=identifiant choisit l'œuvre.
   Aucune donnée n'est envoyée nulle part : tout se passe dans le navigateur. */
(function () {
  'use strict';

  /* ================= Textes de l'interface, FR / EN ================= */
  var T = {
    fr: {
      htmlLang: 'fr', langLabel: 'Langue', status: 'Salle 4',
      start: 'Commencer la visite', startScan: 'Scanner le QR code',
      hintStart: '6 détails à découvrir · environ 3 minutes · sans appli, sans compte',
      hintPresenter: 'Sans appli · sur votre propre téléphone',
      intro: 'Introduction', chapter: 'Chapitre',
      c_go: 'Oui, montre-moi', c_next: 'Continuer', c_time: 'Voir mon temps de regard', c_show: 'Montre-moi', me_found: 'Trouvé',
      sideView: 'Vu de côté · simulation',
      explore: 'Explorer le tableau', close: 'Fermer', exHint: 'Pincez pour zoomer · touchez un numéro',
      endLead: 'Votre temps de regard',
      ratio: function (r) { return 'Soit ' + r + ' fois plus que la moyenne des visiteurs.'; },
      ratioLow: 'Un visiteur reste en moyenne 28 secondes devant une œuvre. Prenez votre temps.',
      avg: 'Moyenne 0:28', you: 'Vous', foundLead: 'Ce que vous avez vu',
      nightKicker: 'Bientôt', nightTitle: 'Édition de nuit', nightText: 'Le 1er vendredi du mois, les œuvres vous donnent des indices pour un jeu en équipe. Venez entre amis.',
      again: 'Recommencer', nextArt: 'Œuvre suivante',
      restart: 'Recommencer la démo',
      quote: 'Et si, pour une fois, c’était l’œuvre qui vous posait la question ?',
      s1t: 'Je scanne', s1p: 'Un QR code sur le cartel. Pas d’appli à télécharger, mon propre téléphone suffit.',
      s2t: 'L’œuvre me raconte son histoire', s2p: 'Détail par détail, le tableau zoome sur ce dont elle parle.',
      s3t: 'Elle me pose une question', s3p: 'Je cherche le détail caché et je touche le tableau pour répondre.',
      s4t: 'Je découvre ses secrets', s4p: 'Chaque réponse débloque un secret, écrit et validé par les conservateurs.',
      s5t: 'Je regarde vraiment', s5p: 'Mon temps de regard comparé aux 28 secondes de moyenne. Objectif du pilote : 2 minutes.',
      tryIt: 'Essayez sur votre téléphone',
      note: 'Prototype de démonstration. Les textes sont écrits à l’avance, comme le seraient des textes validés par un musée.'
    },
    en: {
      htmlLang: 'en', langLabel: 'Language', status: 'Room 4',
      start: 'Start the tour', startScan: 'Scan the QR code',
      hintStart: '6 details to discover · about 3 minutes · no app, no account',
      hintPresenter: 'No app · on your own phone',
      intro: 'Introduction', chapter: 'Chapter',
      c_go: 'Yes, show me', c_next: 'Continue', c_time: 'See my looking time', c_show: 'Show me', me_found: 'Found it',
      sideView: 'Seen from the side · simulation',
      explore: 'Explore the painting', close: 'Close', exHint: 'Pinch to zoom · tap a number',
      endLead: 'Your looking time',
      ratio: function (r) { return 'That’s ' + r + ' times longer than the average visitor.'; },
      ratioLow: 'The average visitor spends 28 seconds in front of an artwork. Take your time.',
      avg: 'Average 0:28', you: 'You', foundLead: 'What you saw',
      nightKicker: 'Coming soon', nightTitle: 'Night edition', nightText: 'On the first Friday of the month, the artworks give you clues for a team game. Come with friends.',
      again: 'Start again', nextArt: 'Next artwork',
      restart: 'Restart the demo',
      quote: 'What if, for once, it was the artwork asking you the question?',
      s1t: 'I scan', s1p: 'A QR code on the label. No app to download, my own phone is enough.',
      s2t: 'The artwork tells me its story', s2p: 'Detail by detail, the painting zooms in on what it talks about.',
      s3t: 'It asks me a question', s3p: 'I look for the hidden detail and tap the painting to answer.',
      s4t: 'I discover its secrets', s4p: 'Each answer unlocks a secret, written and checked by the curators.',
      s5t: 'I really look', s5p: 'My looking time compared with the 28-second average. Pilot goal: 2 minutes.',
      tryIt: 'Try it on your phone',
      note: 'Demo prototype. The texts are written in advance, as museum-approved texts would be.'
    }
  };

  /* ================= Œuvre choisie ================= */
  var LIB = window.LC_ARTWORKS;
  var query = function (name) { var m = new RegExp('[?&]' + name + '=([a-z]+)').exec(location.search); return m ? m[1] : null; };
  var ART_ID = LIB.list[query('art')] ? query('art') : LIB.order[0];
  var ART = LIB.list[ART_ID];
  var NEXT_ART = LIB.order[(LIB.order.indexOf(ART_ID) + 1) % LIB.order.length];
  var TOUR = ART.tour, CHAPTERS = TOUR.length;

  var MODE = document.body.getAttribute('data-mode') === 'presenter' ? 'presenter' : 'visitor';
  var AVG = 28, RATIO = ART.ratio;
  var LQIP = 'data:image/jpeg;base64,' + ART.lqip;
  var lang = query('lang') === 'en' ? 'en' : 'fr';
  var t = function (k) { var a = ART.text[lang]; return (a && a[k] !== undefined) ? a[k] : T[lang][k]; };
  document.documentElement.style.setProperty('--ratio', RATIO);

  /* ================= Interface ================= */
  var host = document.getElementById('app');
  var top = MODE === 'presenter'
    ? '<div class="statusbar"><span>20:14</span><span data-i18n="status"></span></div>'
    : '<header class="lc-top"><div class="lc-brand"><span class="dot" aria-hidden="true"></span>Look Closer</div>' +
      '<div class="lang" role="group" data-i18n-aria="langLabel"><button type="button" data-lang="fr" lang="fr">FR</button><button type="button" data-lang="en" lang="en">EN</button></div></header>';

  host.innerHTML =
    '<div class="lc">' + top +
    '<section class="view welcome" id="v-scan">' +
      '<div class="art"><div class="frame" style="background-image:url(' + LQIP + ')"><img data-src="' + ART.img + '" data-i18n-alt="imgAlt" decoding="async"></div></div>' +
      '<div class="cartel"><span class="artist" data-i18n="artist"></span><span class="title"><i data-i18n="title"></i>, <span data-i18n="date"></span></span>' +
        '<span class="meta" data-i18n-html="meta"></span></div>' +
      '<div class="cta">' +
        '<button class="btn" type="button" id="startBtn" data-i18n="' + (MODE === 'presenter' ? 'startScan' : 'start') + '"></button>' +
        '<p class="hint" data-i18n="' + (MODE === 'presenter' ? 'hintPresenter' : 'hintStart') + '"></p>' +
      '</div>' +
    '</section>' +
    '<section class="view talk" id="v-talk" hidden>' +
      '<div class="art" id="art"><div class="frame" id="frame" style="background-image:url(' + LQIP + ')"><img id="paintImg" data-src="' + ART.img + '" data-i18n-alt="imgAlt" decoding="async"></div>' +
        '<div class="morph" id="morph" hidden><img id="morphImg" alt=""><span class="label" data-i18n="sideView"></span></div>' +
        '<span class="tag" id="tag" hidden></span><span class="timer" id="timer">0:00</span></div>' +
      '<div class="chap"><div class="segs" id="segs" aria-hidden="true">' + new Array(CHAPTERS + 1).join('<span></span>') + '</div>' +
        '<span class="label" id="kicker"></span></div>' +
      '<div class="story" id="chat" aria-live="polite"></div>' +
      '<div class="actions" id="actions"></div>' +
    '</section>' +
    '<section class="view end" id="v-end" hidden>' +
      '<div><span class="label" data-i18n="endLead"></span><div class="big" id="finalTime">0:00</div><p class="ratio" id="ratio"></p></div>' +
      '<div class="compare"><div class="bar"><span data-i18n="avg"></span><span class="track"><span class="fill" id="barAvg"></span></span></div>' +
        '<div class="bar you"><span data-i18n="you"></span><span class="track"><span class="fill" id="barYou"></span></span></div></div>' +
      '<div><span class="label" data-i18n="foundLead"></span><div class="found-list" id="foundList" style="margin-top:10px"></div></div>' +
      '<div class="night"><span class="label" data-i18n="nightKicker"></span><b data-i18n="nightTitle"></b><span data-i18n="nightText"></span></div>' +
      '<div class="end-cta"><button class="btn" id="exploreBtn" type="button" data-i18n="explore"></button>' +
      '<button class="btn ghost" id="nextArtBtn" type="button" data-i18n="nextArt"></button>' +
      '<button class="linkbtn" id="nextBtn" type="button" data-i18n="again"></button></div>' +
      '<p class="credit" data-i18n="credit"></p>' +
    '</section>' +
    '<section class="view explore" id="v-explore" hidden>' +
      '<div class="ex-stage" id="exStage"><div class="ex-layer" id="exLayer"><img id="exImg" alt="" draggable="false"></div></div>' +
      '<div class="ex-bar"><span class="label" data-i18n="exHint"></span><button class="ex-close" id="exClose" type="button" data-i18n="close"></button></div>' +
      '<div class="ex-sheet" id="exSheet" hidden><div class="ex-head"><span class="label" id="exPos"></span>' +
        '<span class="ex-nav"><button type="button" id="exPrev" aria-label="‹">‹</button><button type="button" id="exNext" aria-label="›">›</button></span></div>' +
        '<b id="exTitle"></b><p id="exText"></p></div>' +
    '</section></div>';

  var $ = function (id) { return document.getElementById(id); };
  var chat = $('chat'), actionsEl = $('actions'), frame = $('frame');

  /* Chargement progressif : flou intégré → 1600 px → 3200 px (pour les zooms, si la connexion le permet). */
  document.querySelectorAll('img[data-src]').forEach(function (img) {
    img.onload = function () { img.classList.add('on'); };
    img.src = img.getAttribute('data-src');
  });
  var hdLoaded = false;
  function loadHD() {
    if (hdLoaded) return; hdLoaded = true;
    var c = navigator.connection;
    if (c && (c.saveData || /(^|-)2g$/.test(c.effectiveType || ''))) return;
    var hd = new Image();
    hd.onload = function () { $('paintImg').src = ART.hd; };
    hd.src = ART.hd;
    if (ART.morph) { var m = new Image(); m.src = ART.morph.img; }
  }

  var state;
  function freshState() { return { step: 0, start: 0, tick: null, found: [], phase: 'idle', chapter: 0, ci: -1, log: [], choices: [], final: 0, view: 'v-scan', run: 0 }; }
  state = freshState();

  /* ================= Traduction ================= */
  function setTag() {
    var tag = $('tag');
    tag.textContent = t('tagGo'); tag.classList.add('go'); tag.hidden = state.phase !== 'tap';
  }
  function applyStatic() {
    document.documentElement.lang = t('htmlLang');
    document.querySelectorAll('[data-i18n]').forEach(function (el) { el.textContent = t(el.getAttribute('data-i18n')); });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) { el.innerHTML = t(el.getAttribute('data-i18n-html')); });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) { el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria'))); });
    document.querySelectorAll('[data-i18n-alt]').forEach(function (el) { el.setAttribute('alt', t(el.getAttribute('data-i18n-alt'))); });
    document.querySelectorAll('[data-lang]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang)); });
    setTag(); setKicker();
  }
  function setLang(l) {
    if (l === lang) return;
    lang = l; applyStatic(); renderChat(); renderChoices();
    if (state.view === 'v-end') renderEnd(false);
    if (state.view === 'v-explore') renderSheet();
  }
  document.querySelectorAll('[data-lang]').forEach(function (b) { b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); }); });

  /* ================= Panneau présentateur ================= */
  function setStep(n) {
    state.step = n;
    document.querySelectorAll('#steps li').forEach(function (li) {
      var s = +li.getAttribute('data-step');
      li.classList.toggle('on', s === n); li.classList.toggle('done', s < n);
    });
  }
  function setKicker() {
    var n = state.chapter;
    $('kicker').textContent = n ? t('chapter') + ' ' + n + ' / ' + CHAPTERS + ' · ' + t('ch' + n) : t('intro');
    document.querySelectorAll('#segs span').forEach(function (sp, i) {
      sp.className = i < n - 1 ? 'done' : i === n - 1 ? 'cur' : '';
    });
  }
  // Nouveau chapitre = nouvelle page : on efface le texte du chapitre précédent.
  function setChapter(n) {
    state.chapter = n; state.log = []; chat.innerHTML = ''; chat.scrollTop = 0;
    setTag(); setKicker();
  }

  /* ================= Tableau : zoom, cercles, touches ================= */
  function zoomTo(p, k) {
    k = k || (p && p.k) || 1;
    if (!p || k <= 1) { frame.style.transform = ''; return; }
    var clamp = function (v, lo, hi) { return Math.max(lo, Math.min(hi, v)); };
    var tx = clamp(50 - p.x * 100 * k, 100 - 100 * k, 0), ty = clamp(50 - p.y * 100 * k, 100 - 100 * k, 0);
    frame.style.transform = 'translate(' + tx + '%,' + ty + '%) scale(' + k + ')';
  }
  function zoomOut() { zoomTo(null); }
  function ring(p, sizeW, k) {
    clearRings();
    var r = document.createElement('div'); r.className = 'ring';
    r.style.left = (p.x * 100) + '%'; r.style.top = (p.y * 100) + '%';
    r.style.borderWidth = (2 / (k || 1)) + 'px';
    r.style.width = (sizeW * 100) + '%'; r.style.height = (sizeW * 100 * RATIO) + '%';
    frame.appendChild(r);
  }
  function clearRings() { frame.querySelectorAll('.ring').forEach(function (r) { r.remove(); }); }
  function dist(a, bx, by) { var dx = a.x - bx, dy = (a.y - by) / RATIO; return Math.sqrt(dx * dx + dy * dy); }

  /* Anamorphose : on « redresse » l'image en la compressant le long de son axe (simulation du point de vue de côté). */
  function playMorph() {
    if (!ART.morph) return;
    var m = $('morph'), img = $('morphImg'), M = ART.morph;
    img.src = M.img; m.hidden = false;
    img.style.transition = 'none';
    img.style.transform = 'rotate(' + M.angle + 'deg) scaleX(' + M.stretch + ')';
    void img.offsetWidth;
    setTimeout(function () { img.style.transition = ''; img.style.transform = 'none'; }, 350);
  }
  function hideMorph() { $('morph').hidden = true; }

  /* ================= Le jeu : toucher le détail caché ================= */
  var tap = null, tries = 0;
  frame.addEventListener('click', function (e) {
    if (state.phase !== 'tap' || !tap) return;
    var r = frame.getBoundingClientRect();
    var fx = (e.clientX - r.left) / r.width, fy = (e.clientY - r.top) / r.height;
    var rp = document.createElement('span'); rp.className = 'ripple';
    rp.style.left = (fx * 100) + '%'; rp.style.top = (fy * 100) + '%';
    frame.appendChild(rp); setTimeout(function () { rp.remove(); }, 700);
    var p = { x: fx, y: fy };
    if (dist(p, tap.target.x, tap.target.y) <= tap.hit) { found(false); return; }
    if (tap.decoys && tap.decoys.some(function (c) { return dist(p, c[0], c[1]) <= tap.decoyHit; })) { add('art', tap.decoyMsg, 'fb'); return; }
    tries++;
    if (tries >= 3) ring(tap.target, tap.hintRing);
    add('art', tap.misses[Math.min(tries, tap.misses.length) - 1], 'fb');
    // Après deux essais, on propose de révéler le détail : personne ne reste bloqué.
    if (tries === 2) choices([['c_show', function () { found(true); }]]);
  });

  /* ================= Dialogue ================= */
  function msgEl(entry) {
    var m = document.createElement('p');
    m.className = (entry.type === 'art' ? 'para' : 'reply') + (entry.cls ? ' ' + entry.cls : '');
    m.textContent = t(entry.key);
    return m;
  }
  function scrollChat() { chat.scrollTo ? chat.scrollTo({ top: chat.scrollHeight, behavior: 'smooth' }) : (chat.scrollTop = chat.scrollHeight); }
  // cls 'fb' = réaction à un essai : elle remplace la réaction précédente au lieu de s'empiler.
  function clearFeedback() {
    state.log = state.log.filter(function (e) { return e.cls !== 'fb'; });
    chat.querySelectorAll('.fb').forEach(function (el) { el.remove(); });
  }
  function add(type, key, cls) {
    var entry = { type: type, key: key, cls: cls || '' };
    if (entry.cls === 'fb') clearFeedback();
    state.log.push(entry); chat.appendChild(msgEl(entry)); fitText(); scrollChat();
  }
  function renderChat() {
    chat.innerHTML = '';
    state.log.forEach(function (e) { var m = msgEl(e); m.style.animation = 'none'; chat.appendChild(m); });
    fitText(); scrollChat();
  }
  function choices(list) { state.choices = list; renderChoices(); }
  function renderChoices() {
    actionsEl.innerHTML = '';
    state.choices.forEach(function (c) {
      var b = document.createElement('button'); b.type = 'button'; b.textContent = t(c[0]);
      b.className = /^c_(go|next|time)$/.test(c[0]) ? 'chip primary' : 'chip';
      b.addEventListener('click', function () {
        state.choices = []; actionsEl.innerHTML = '';
        if (!/^c_(go|next|time)$/.test(c[0])) add('me', c[0]);
        c[1]();
      });
      actionsEl.appendChild(b);
    });
    fitText();
  }
  // Attente annulée si l'utilisateur recommence entre-temps.
  function wait(ms) { var run = state.run; return new Promise(function (res, rej) { setTimeout(function () { run === state.run ? res() : rej('reset'); }, ms); }); }
  function guard(p) { return p.catch(function () {}); }
  // Affiche tout le texte d'un coup, puis ajuste sa taille pour qu'il tienne sans défiler.
  function say(keys, then) { keys.forEach(function (k) { add('art', k); }); if (then) then(); }
  var FONT_MAX = MODE === 'presenter' ? 17 : 21, FONT_MIN = 13;
  function fitText() {
    if (state.view !== 'v-talk') return;
    var size = FONT_MAX;
    chat.style.fontSize = size + 'px';
    while (chat.scrollHeight > chat.clientHeight + 1 && size > FONT_MIN) { size -= .5; chat.style.fontSize = size + 'px'; }
  }
  window.addEventListener('resize', fitText);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitText);

  /* ================= Chrono ================= */
  function fmt(s) { return Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0'); }
  function startTimer() {
    state.start = Date.now(); clearInterval(state.tick);
    state.tick = setInterval(function () { $('timer').textContent = fmt((Date.now() - state.start) / 1000); }, 250);
  }

  /* ================= La visite : un moteur, les chapitres viennent de artworks.js ================= */
  function show(id) { state.view = id; ['v-scan', 'v-talk', 'v-end', 'v-explore'].forEach(function (v) { $(v).hidden = v !== id; }); }

  function begin() {
    show('v-talk'); setStep(1); startTimer(); loadHD(); setChapter(0); choices([]);
    say(ART.intro, function () { choices([['c_go', function () { runChapter(0); }]]); });
  }
  $('startBtn').addEventListener('click', begin);

  function afterChapter(i) {
    if (i >= CHAPTERS - 1) { setStep(4); choices([['c_time', finish]]); }
    else choices([['c_next', function () { runChapter(i + 1); }]]);
  }
  function runChapter(i) {
    var c = TOUR[i];
    state.ci = i; setChapter(i + 1); clearRings(); hideMorph();
    if (c.tap) return startTap(c.tap, i);
    if (c.choice) return startChoice(c.choice, i);
    if (c.zoom) zoomTo(c.zoom); else zoomOut();
    if (c.ring) ring(c.ring.p, c.ring.size, c.zoom ? c.zoom.k : 1);
    if (c.found) state.found.push(c.found);
    say(c.texts, function () { afterChapter(i); });
    if (c.then) guard(wait(c.then.ms).then(function () {
      if (state.ci !== i) return;
      clearRings(); zoomTo(c.then.zoom);
      if (c.then.ring) ring(c.then.ring.p, c.then.ring.size, c.then.zoom.k);
    }));
  }
  function startTap(q, i) {
    tap = q; tap.i = i; tries = 0;
    zoomOut(); setStep(2); state.phase = 'tap'; frame.classList.add('tappable'); setTag();
    add('art', q.ask);
  }
  function found(revealed) {
    state.phase = 'story'; frame.classList.remove('tappable'); setStep(3); setTag();
    ring(tap.target, tap.ringSize, tap.k); zoomTo(tap.target, tap.k);
    state.found.push(tap.found);
    clearFeedback();
    if (!revealed) {
      state.choices = []; actionsEl.innerHTML = '';
      add('me', 'me_found', 'found');
      // Récompense : un éclair et une petite vibration (Android).
      var art = $('art'); art.classList.remove('flash'); void art.offsetWidth; art.classList.add('flash');
      try { if (navigator.vibrate) navigator.vibrate([30, 40, 30]); } catch (e) {}
    }
    say(tap.story, function () { afterChapter(tap.i); });
  }
  function startChoice(q, i) {
    zoomOut();
    add('art', q.ask);
    choices(q.options.map(function (o) { return [o[0], function () { answer(q, o[1], i); }]; }));
  }
  function answer(q, ok, i) {
    state.found.push(q.found);
    if (q.zoom) { zoomTo(q.zoom); if (q.ringSize) ring(q.zoom, q.ringSize, q.zoom.k); }
    say([ok ? q.ok : q.no], function () {
      if (q.morph) guard(wait(500).then(playMorph));
      afterChapter(i);
    });
  }

  function finish() {
    clearInterval(state.tick);
    state.final = Math.max(1, (Date.now() - state.start) / 1000);
    state.phase = 'end';
    show('v-end'); $('v-end').scrollTop = 0; renderEnd(true);
  }
  function renderEnd(animateBars) {
    var secs = state.final;
    $('finalTime').textContent = fmt(secs);
    var ratio = secs / AVG;
    $('ratio').textContent = ratio >= 1.1 ? t('ratio')(String(Math.round(ratio * 10) / 10).replace('.', lang === 'fr' ? ',' : '.')) : t('ratioLow');
    var max = Math.max(secs, AVG) * 1.05;
    var setBars = function () { $('barAvg').style.width = (AVG / max * 100) + '%'; $('barYou').style.width = (secs / max * 100) + '%'; };
    if (animateBars) { $('barAvg').style.width = '0'; $('barYou').style.width = '0'; setTimeout(setBars, 80); } else setBars();
    var list = $('foundList'); list.innerHTML = '';
    state.found.forEach(function (f) {
      var d = document.createElement('div'); d.className = 'found-item';
      var i = document.createElement('i'); i.textContent = '●'; i.setAttribute('aria-hidden', 'true'); d.appendChild(i);
      d.appendChild(document.createTextNode(t(f))); list.appendChild(d);
    });
  }

  function reset() {
    clearInterval(state.tick);
    var run = state.run; state = freshState(); state.run = run + 1;
    tries = 0; tap = null; chat.innerHTML = ''; actionsEl.innerHTML = ''; clearRings(); zoomOut(); hideMorph();
    frame.classList.remove('tappable');
    $('timer').textContent = '0:00'; setChapter(0);
    show('v-scan'); setStep(0);
  }
  $('nextBtn').addEventListener('click', reset);
  if ($('restart')) $('restart').addEventListener('click', reset);
  // Œuvre suivante : comme si le visiteur scannait le QR code du tableau d'à côté.
  $('nextArtBtn').addEventListener('click', function () {
    location.href = location.pathname + '?art=' + NEXT_ART + (lang === 'en' ? '&lang=en' : '');
  });

  /* ================= Explorer le tableau : zoom libre + détails numérotés =================
     Pincer / glisser au doigt, double-toucher pour zoomer, molette sur ordinateur. */
  var SPOTS = ART.spots;
  var exStage = $('exStage'), exLayer = $('exLayer'), exSheet = $('exSheet');
  var ex = { k: 1, tx: 0, ty: 0, w: 0, h: 0, cw: 0, ch: 0, sel: -1 };
  SPOTS.forEach(function (s, i) {
    var b = document.createElement('button'); b.type = 'button'; b.className = 'hs'; b.textContent = i + 1;
    b.style.left = (s.p.x * 100) + '%'; b.style.top = (s.p.y * 100) + '%'; b.setAttribute('data-i', i);
    exLayer.appendChild(b);
  });
  function exLayout() {
    var r = exStage.getBoundingClientRect();
    ex.cw = r.width; ex.ch = r.height; ex.w = r.width; ex.h = r.width / RATIO;
    exLayer.style.width = ex.w + 'px'; exLayer.style.height = ex.h + 'px';
    exApply(false);
  }
  function exApply(anim) {
    ex.k = Math.max(1, Math.min(8, ex.k));
    var W = ex.w * ex.k, H = ex.h * ex.k;
    ex.tx = W <= ex.cw ? (ex.cw - W) / 2 : Math.min(0, Math.max(ex.cw - W, ex.tx));
    ex.ty = H <= ex.ch ? (ex.ch - H) / 2 : Math.min(0, Math.max(ex.ch - H, ex.ty));
    exLayer.classList.toggle('anim', !!anim);
    exLayer.style.transform = 'translate(' + ex.tx + 'px,' + ex.ty + 'px) scale(' + ex.k + ')';
    exLayer.style.setProperty('--k', ex.k);
  }
  function exZoomAt(cx, cy, k, anim) {
    var ix = (cx - ex.tx) / ex.k, iy = (cy - ex.ty) / ex.k;
    ex.k = Math.max(1, Math.min(8, k)); ex.tx = cx - ix * ex.k; ex.ty = cy - iy * ex.k; exApply(anim);
  }
  function exFocus(p, k) {
    var visibleH = ex.ch - (exSheet.hidden ? 0 : exSheet.offsetHeight);
    ex.k = Math.max(1, Math.min(8, k));
    ex.tx = ex.cw / 2 - p.x * ex.w * ex.k; ex.ty = visibleH / 2 - p.y * ex.h * ex.k; exApply(true);
  }
  function exSelect(i) {
    ex.sel = (i + SPOTS.length) % SPOTS.length;
    exLayer.querySelectorAll('.hs').forEach(function (b, j) { b.classList.toggle('on', j === ex.sel); });
    exSheet.hidden = false; renderSheet();
    exFocus(SPOTS[ex.sel].p, SPOTS[ex.sel].k);
  }
  function renderSheet() {
    if (ex.sel < 0) return;
    var s = SPOTS[ex.sel];
    $('exPos').textContent = (ex.sel + 1) + ' / ' + SPOTS.length;
    $('exTitle').textContent = t('h_' + s.id); $('exText').textContent = t('x_' + s.id);
  }
  function exUnselect() {
    ex.sel = -1; exSheet.hidden = true;
    exLayer.querySelectorAll('.hs').forEach(function (b) { b.classList.remove('on'); });
  }
  function openExplore() {
    $('exImg').src = $('paintImg').src || ART.img;
    show('v-explore'); exUnselect(); ex.k = 1; exLayout();
  }
  $('exploreBtn').addEventListener('click', openExplore);
  $('exClose').addEventListener('click', function () { show('v-end'); });
  $('exPrev').addEventListener('click', function () { exSelect(ex.sel - 1); });
  $('exNext').addEventListener('click', function () { exSelect(ex.sel + 1); });
  window.addEventListener('resize', function () { if (state.view === 'v-explore') exLayout(); });

  var pts = {}, gesture = null, moved = false, lastTap = 0;
  function local(e) { var r = exStage.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; }
  function ptList() { return Object.keys(pts).map(function (k) { return pts[k]; }); }
  function startGesture() {
    var l = ptList();
    if (l.length === 1) gesture = { type: 'pan', sx: l[0].x, sy: l[0].y, tx: ex.tx, ty: ex.ty };
    else if (l.length >= 2) {
      var mx = (l[0].x + l[1].x) / 2, my = (l[0].y + l[1].y) / 2;
      gesture = { type: 'pinch', d0: Math.hypot(l[0].x - l[1].x, l[0].y - l[1].y) || 1, k0: ex.k, ix: (mx - ex.tx) / ex.k, iy: (my - ex.ty) / ex.k };
    } else gesture = null;
  }
  exStage.addEventListener('pointerdown', function (e) {
    if (e.target.closest('.hs')) return; // les numéros gèrent leur propre clic
    try { exStage.setPointerCapture(e.pointerId); } catch (err) {}
    pts[e.pointerId] = local(e); if (ptList().length === 1) moved = false; startGesture();
  });
  exStage.addEventListener('pointermove', function (e) {
    if (!pts[e.pointerId] || !gesture) return;
    pts[e.pointerId] = local(e); var l = ptList();
    if (gesture.type === 'pan' && l.length === 1) {
      var dx = l[0].x - gesture.sx, dy = l[0].y - gesture.sy;
      if (Math.hypot(dx, dy) > 6) moved = true;
      if (moved) { ex.tx = gesture.tx + dx; ex.ty = gesture.ty + dy; exApply(false); }
    } else if (gesture.type === 'pinch' && l.length >= 2) {
      moved = true;
      var d = Math.hypot(l[0].x - l[1].x, l[0].y - l[1].y), mx = (l[0].x + l[1].x) / 2, my = (l[0].y + l[1].y) / 2;
      ex.k = Math.max(1, Math.min(8, gesture.k0 * d / gesture.d0));
      ex.tx = mx - gesture.ix * ex.k; ex.ty = my - gesture.iy * ex.k; exApply(false);
    }
  });
  function endPointer(e) {
    if (!pts[e.pointerId]) return;
    var pos = pts[e.pointerId]; delete pts[e.pointerId];
    if (ptList().length) { startGesture(); return; }
    gesture = null;
    if (moved) return;
    var now = Date.now();
    if (now - lastTap < 320) { lastTap = 0; exZoomAt(pos.x, pos.y, ex.k > 1.5 ? 1 : 3, true); }
    else { lastTap = now; if (!exSheet.hidden) setTimeout(function () { if (lastTap === now) exUnselect(); }, 330); }
  }
  exStage.addEventListener('pointerup', endPointer);
  exStage.addEventListener('pointercancel', endPointer);
  exStage.addEventListener('wheel', function (e) {
    e.preventDefault(); var p = local(e); exZoomAt(p.x, p.y, ex.k * (e.deltaY < 0 ? 1.25 : 0.8), false);
  }, { passive: false });
  exLayer.addEventListener('click', function (e) {
    var b = e.target.closest('.hs'); if (b) { e.stopPropagation(); exSelect(+b.getAttribute('data-i')); }
  });

  applyStatic(); setStep(0);

  /* Hors ligne : le site reste disponible même si la connexion tombe, et s'installe sur l'écran d'accueil. */
  if ('serviceWorker' in navigator && MODE === 'visitor' && (location.protocol === 'https:' || location.hostname === 'localhost')) {
    window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () {}); });
  }

  // Pour les tests automatisés uniquement (aucune donnée transmise).
  window.__lookCloser = { state: function () { return state; }, art: ART, tour: TOUR };
})();
