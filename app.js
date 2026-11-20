/* Look Closer — l'expérience visiteur, partagée par index.html (plein écran)
   et presenter.html (dans un cadre de téléphone).
   Aucune donnée n'est envoyée nulle part : tout se passe dans le navigateur. */
(function () {
  'use strict';

  /* ================= Textes FR / EN ================= */
  var T = {
    fr: {
      htmlLang: 'fr', voiceLang: 'fr-FR', langLabel: 'Langue',
      brandSub: 'Artthropic', status: 'Musée · Salle 4',
      title: 'Hiver au village', medium: 'Huile sur toile · œuvre fictive créée pour la démo',
      cartelCall: 'Scannez-moi.<br>Je vais vous poser une question.',
      startVoice: '🔊 Commencer avec la voix', startSilent: 'Commencer sans le son',
      startScan: '📷 Scanner le QR code',
      hintStart: 'Montez le volume. En mode audio, l’écran s’assombrit pendant que l’œuvre parle : regardez le tableau, pas le téléphone.',
      hintPresenter: 'Sans appli · sur votre propre téléphone',
      canvasLabel: 'Le tableau Hiver au village. Touchez un détail pour répondre.',
      tag: 'Touchez le tableau pour répondre', tagGo: '👆 Touchez l’oiseau sur le tableau',
      audio: 'Audio d’abord', langs: 'FR · EN · LSF',
      who: 'L’œuvre',
      speaking: 'L’œuvre vous parle…', dimText: 'Regardez le tableau, pas le téléphone. L’écran revient quand elle a fini.',
      wake: 'Afficher l’écran',
      m_hello: 'Bonjour ! Je suis « Hiver au village ». La plupart des gens passent devant moi en quelques secondes…',
      m_secrets: 'Mais j’ai des secrets. Tu veux jouer ?',
      c_yes: 'Oui, vas-y !', c_story: 'Raconte-moi d’abord ton histoire',
      m_story: 'Je montre un village un jour de grand froid : les habitants patinent sur l’étang gelé. Mais regarde bien, le peintre a caché quelque chose.',
      m_askBird: 'Tu vois l’oiseau noir caché dans mes arbres ? Touche-le sur le tableau.',
      m_miss1: 'Pas là… Les oiseaux dans le ciel sont trop loin. Regarde dans les branches.',
      m_miss2: 'Presque ! Monte tout en haut de l’arbre, à droite.',
      m_miss3: 'Je t’aide : il est dans le cercle doré. Touche-le !',
      me_found: 'Bien vu ! 👀',
      m_birdStory: 'Le peintre l’a posé seul, immobile, au-dessus du village bruyant. Il voulait qu’on ressente le froid et le silence de l’hiver.',
      m_askSmoke: 'Dernière question : combien de cheminées fument dans le village ?',
      m_smokeOk: 'Exactement : deux. Ce sont les seules maisons où quelqu’un attend les patineurs au chaud.',
      m_smokeNo: 'Regarde encore… il y en a deux, une à gauche et une à droite. Ce sont les maisons où quelqu’un attend les patineurs au chaud.',
      c_time: 'Voir mon temps de regard',
      endLead: 'Vous avez regardé cette œuvre pendant',
      ratio: function (r) { return 'Soit ' + r + ' fois plus que la moyenne des visiteurs.'; },
      ratioLow: 'La moyenne des visiteurs : 28 secondes. Prenez votre temps !',
      avg: 'Moyenne 0:28', you: 'Vous',
      f_bird: 'L’oiseau noir caché dans l’arbre', f_smoke: 'Les deux cheminées qui fument',
      nightTitle: 'Édition de nuit · 1er vendredi du mois',
      nightText: 'Les œuvres vous donnent des indices pour un jeu en équipe. Venez entre amis.',
      again: '↺ Recommencer', next: 'Œuvre suivante →',
      privacy: 'Aucun compte, aucune donnée collectée.',
      restart: '↺ Recommencer la démo',
      quote: '« Et si, pour une fois, c’était <span>l’œuvre</span> qui vous posait la question ? »',
      s1t: 'Je scanne', s1p: 'Un QR code sur le cartel. Pas d’appli à télécharger, mon propre téléphone suffit.',
      s2t: 'L’œuvre me parle', s2p: 'Elle se présente avec sa propre voix. En mode audio, l’écran s’éteint pour que je regarde le tableau.',
      s3t: 'Elle me pose une question', s3p: '« Tu vois l’oiseau caché ? » Je cherche le détail et je touche le tableau pour répondre.',
      s4t: 'Je découvre son histoire', s4p: 'Chaque bonne réponse débloque un secret, écrit et validé par les conservateurs.',
      s5t: 'Je regarde vraiment', s5p: 'Mon temps de regard comparé aux 28 secondes de moyenne. Objectif du pilote : 2 minutes.',
      tryIt: 'Essayez sur votre téléphone',
      note: 'Prototype de démonstration. Le tableau est une œuvre fictive dessinée pour la démo ; les réponses sont écrites à l’avance, comme le seraient des textes validés par un musée.'
    },
    en: {
      htmlLang: 'en', voiceLang: 'en-GB', langLabel: 'Language',
      brandSub: 'Artthropic', status: 'Museum · Room 4',
      title: 'Winter in the Village', medium: 'Oil on canvas · fictional artwork created for the demo',
      cartelCall: 'Scan me.<br>I have a question for you.',
      startVoice: '🔊 Start with sound', startSilent: 'Start without sound',
      startScan: '📷 Scan the QR code',
      hintStart: 'Turn the volume up. In audio mode the screen dims while the artwork speaks: look at the painting, not your phone.',
      hintPresenter: 'No app · on your own phone',
      canvasLabel: 'The painting Winter in the Village. Tap a detail to answer.',
      tag: 'Tap the painting to answer', tagGo: '👆 Tap the bird on the painting',
      audio: 'Audio first', langs: 'FR · EN · Sign',
      who: 'The artwork',
      speaking: 'The artwork is speaking…', dimText: 'Look at the painting, not your phone. The screen comes back when it’s done.',
      wake: 'Show the screen',
      m_hello: 'Hello! I’m “Winter in the Village”. Most people walk past me in a few seconds…',
      m_secrets: 'But I have secrets. Do you want to play?',
      c_yes: 'Yes, go on!', c_story: 'Tell me your story first',
      m_story: 'I show a village on a bitterly cold day: people are skating on the frozen pond. But look closely, the painter hid something.',
      m_askBird: 'Can you see the black bird hidden in my trees? Tap it on the painting.',
      m_miss1: 'Not there… The birds in the sky are too far away. Look in the branches.',
      m_miss2: 'Almost! Go right up to the top of the tree on the right.',
      m_miss3: 'Here’s a hint: it’s inside the golden circle. Tap it!',
      me_found: 'Got it! 👀',
      m_birdStory: 'The painter placed it alone and still, above the noisy village. He wanted us to feel the cold and the silence of winter.',
      m_askSmoke: 'Last question: how many chimneys are smoking in the village?',
      m_smokeOk: 'Exactly: two. They are the only houses where someone is waiting for the skaters by the fire.',
      m_smokeNo: 'Look again… there are two, one on the left and one on the right. They are the houses where someone is waiting for the skaters by the fire.',
      c_time: 'See my looking time',
      endLead: 'You looked at this artwork for',
      ratio: function (r) { return 'That’s ' + r + ' times longer than the average visitor.'; },
      ratioLow: 'The average visitor: 28 seconds. Take your time!',
      avg: 'Average 0:28', you: 'You',
      f_bird: 'The black bird hidden in the tree', f_smoke: 'The two smoking chimneys',
      nightTitle: 'Night edition · first Friday of the month',
      nightText: 'The artworks give you clues for a team game. Come with friends.',
      again: '↺ Start again', next: 'Next artwork →',
      privacy: 'No account, no data collected.',
      restart: '↺ Restart the demo',
      quote: '“What if, for once, it was <span>the artwork</span> asking you the question?”',
      s1t: 'I scan', s1p: 'A QR code on the label. No app to download, my own phone is enough.',
      s2t: 'The artwork talks to me', s2p: 'It introduces itself in its own voice. In audio mode the screen goes dark so I look at the painting.',
      s3t: 'It asks me a question', s3p: '“Can you see the hidden bird?” I look for the detail and tap the painting to answer.',
      s4t: 'I discover its story', s4p: 'Each right answer unlocks a secret, written and checked by the curators.',
      s5t: 'I really look', s5p: 'My looking time compared with the 28-second average. Pilot goal: 2 minutes.',
      tryIt: 'Try it on your phone',
      note: 'Demo prototype. The painting is a fictional artwork drawn for the demo; the answers are written in advance, as museum-approved texts would be.'
    }
  };

  var MODE = document.body.getAttribute('data-mode') === 'presenter' ? 'presenter' : 'visitor';
  var AVG = 28;
  var lang = (function () {
    var m = /[?&]lang=(fr|en)\b/.exec(location.search);
    return m ? m[1] : 'fr';
  })();
  var t = function (k) { return T[lang][k]; };

  /* ================= Interface ================= */
  var host = document.getElementById('app');
  var top = MODE === 'presenter'
    ? '<div class="statusbar"><span>20:14</span><span data-i18n="status"></span></div>'
    : '<header class="lc-top"><div class="lc-brand"><small data-i18n="brandSub"></small>Look <em>Closer</em></div>' +
      '<div class="lang" role="group" data-i18n-aria="langLabel"><button type="button" data-lang="fr" lang="fr">FR</button><button type="button" data-lang="en" lang="en">EN</button></div></header>';

  host.innerHTML =
    '<div class="lc">' + top +
    '<section class="view welcome" id="v-scan">' +
      '<div class="cartel"><b data-i18n="title"></b><small data-i18n="medium"></small>' +
        '<div class="row"><img class="qr" src="qr-code.png" alt="" width="72" height="72"><span data-i18n-html="cartelCall"></span></div></div>' +
      (MODE === 'presenter'
        ? '<button class="btn" type="button" id="startVoice" data-i18n="startScan"></button><p class="hint" data-i18n="hintPresenter"></p>'
        : '<button class="btn" type="button" id="startVoice" data-i18n="startVoice"></button>' +
          '<button class="btn ghost" type="button" id="startSilent" data-i18n="startSilent"></button><p class="hint" data-i18n="hintStart"></p>') +
    '</section>' +
    '<section class="view talk" id="v-talk" hidden>' +
      '<div class="art"><canvas id="painting" width="1200" height="840" role="img" data-i18n-aria="canvasLabel"></canvas>' +
        '<span class="tag" id="tag" data-i18n="tag"></span><span class="timer" id="timer">0:00</span></div>' +
      '<div class="chat" id="chat" aria-live="polite"></div>' +
      '<div class="actions" id="actions"></div>' +
      '<div class="audio-bar"><button class="toggle" id="audioToggle" type="button" aria-pressed="false"><span class="sw"></span><span data-i18n="audio"></span></button><span data-i18n="langs"></span></div>' +
      '<div class="dim-overlay" id="dim" hidden><div class="wave"><i></i><i></i><i></i><i></i><i></i></div>' +
        '<strong data-i18n="speaking"></strong><p data-i18n="dimText"></p><button class="btn ghost" id="wake" type="button" data-i18n="wake"></button></div>' +
    '</section>' +
    '<section class="view end" id="v-end" hidden>' +
      '<div><p class="hint" data-i18n="endLead"></p><div class="big" id="finalTime">0:00</div><p class="ratio" id="ratio"></p></div>' +
      '<div class="compare"><div class="bar"><span data-i18n="avg"></span><span class="track"><span class="fill" id="barAvg"></span></span></div>' +
        '<div class="bar you"><span data-i18n="you"></span><span class="track"><span class="fill" id="barYou"></span></span></div></div>' +
      '<div class="found-list" id="foundList"></div>' +
      '<div class="night"><b data-i18n="nightTitle"></b><span data-i18n="nightText"></span></div>' +
      '<button class="btn" id="nextBtn" type="button" data-i18n="' + (MODE === 'presenter' ? 'next' : 'again') + '"></button>' +
      '<p class="privacy" data-i18n="privacy"></p>' +
    '</section></div>';

  var $ = function (id) { return document.getElementById(id); };
  var chat = $('chat'), actionsEl = $('actions');

  var state;
  function freshState() {
    return { step: 0, start: 0, tick: null, found: [], audio: false, phase: 'idle', log: [], choices: [], final: 0, view: 'v-scan', run: 0 };
  }
  state = freshState();

  /* ================= Traduction ================= */
  function applyStatic() {
    document.documentElement.lang = t('htmlLang');
    document.querySelectorAll('[data-i18n]').forEach(function (el) { el.textContent = t(el.getAttribute('data-i18n')); });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) { el.innerHTML = t(el.getAttribute('data-i18n-html')); });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) { el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria'))); });
    document.querySelectorAll('[data-lang]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang)); });
    if (state.phase === 'bird') { $('tag').textContent = t('tagGo'); }
  }
  function setLang(l) {
    if (l === lang) return;
    lang = l;
    stopSpeech();
    applyStatic(); renderChat(); renderChoices();
    if (state.view === 'v-end') renderEnd();
    // Le changement de langue est un appui : on peut relancer la voix (iOS l'autorise ici).
    if (state.audio && state.view === 'v-talk') speakLast();
  }
  document.querySelectorAll('[data-lang]').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); });
  });

  /* ================= Panneau présentateur ================= */
  function setStep(n) {
    state.step = n;
    document.querySelectorAll('#steps li').forEach(function (li) {
      var s = +li.getAttribute('data-step');
      li.classList.toggle('on', s === n);
      li.classList.toggle('done', s < n);
    });
  }

  /* ================= Le tableau (œuvre fictive, dessinée en code) ================= */
  var cv = $('painting'), g = cv.getContext('2d'), W = 600, H = 420, S = cv.width / W;
  var BIRD = { x: 512, y: 92, hit: 52, ring: 30 };
  var highlight = null, pulse = 0, taps = [], animating = false;

  function tree(x, base, h, lean) {
    g.strokeStyle = '#2b2620'; g.lineCap = 'round';
    g.lineWidth = 6; g.beginPath(); g.moveTo(x, base); g.lineTo(x + lean, base - h); g.stroke();
    var branches = 7;
    for (var i = 1; i <= branches; i++) {
      var tt = i / (branches + 1), bx = x + lean * tt, by = base - h * tt, len = (1 - tt) * 60 + 18, dir = i % 2 ? 1 : -1;
      g.lineWidth = Math.max(1, 4 - tt * 3);
      g.beginPath(); g.moveTo(bx, by); g.quadraticCurveTo(bx + dir * len * .5, by - 12, bx + dir * len, by - 22 - tt * 10); g.stroke();
      g.lineWidth = 1; g.beginPath(); g.moveTo(bx + dir * len * .6, by - 14); g.lineTo(bx + dir * len * .75, by - 34); g.stroke();
    }
  }
  function house(x, y, w, h, roof, wall, smoke) {
    g.fillStyle = wall; g.fillRect(x, y - h, w, h);
    g.fillStyle = roof; g.beginPath(); g.moveTo(x - 6, y - h); g.lineTo(x + w / 2, y - h - w * .55); g.lineTo(x + w + 6, y - h); g.closePath(); g.fill();
    g.fillStyle = '#efeee8'; g.beginPath(); g.moveTo(x - 6, y - h); g.lineTo(x + w / 2, y - h - w * .55); g.lineTo(x + w / 2, y - h - w * .45); g.lineTo(x - 2, y - h + 2); g.fill();
    g.fillStyle = '#d9a441'; g.fillRect(x + w * .3, y - h * .6, w * .18, h * .28);
    g.fillStyle = '#5a4a3a'; g.fillRect(x + w * .7, y - h - w * .4, 7, 16);
    if (smoke) {
      g.strokeStyle = 'rgba(235,235,230,.75)'; g.lineWidth = 4; g.beginPath();
      var sx = x + w * .7 + 3, sy = y - h - w * .4; g.moveTo(sx, sy);
      for (var i = 1; i < 5; i++) g.quadraticCurveTo(sx + (i % 2 ? 10 : -10), sy - i * 9, sx + (i % 2 ? 4 : -2), sy - i * 12);
      g.stroke();
    }
  }
  function figure(x, y, c) { g.fillStyle = c; g.fillRect(x - 2, y - 9, 4, 8); g.beginPath(); g.arc(x, y - 11, 2.4, 0, 7); g.fill(); g.fillRect(x - 3, y - 1, 2, 4); g.fillRect(x + 1, y - 1, 2, 4); }

  function paint() {
    var sky = g.createLinearGradient(0, 0, 0, 260); sky.addColorStop(0, '#9fb2a8'); sky.addColorStop(1, '#d8dccf');
    g.fillStyle = sky; g.fillRect(0, 0, W, H);
    g.fillStyle = '#8a9c97'; g.beginPath(); g.moveTo(0, 190); g.lineTo(80, 130); g.lineTo(150, 165); g.lineTo(240, 105); g.lineTo(330, 160); g.lineTo(420, 120); g.lineTo(520, 170); g.lineTo(600, 140); g.lineTo(600, 230); g.lineTo(0, 230); g.fill();
    g.fillStyle = '#e9ece4'; g.beginPath(); g.moveTo(240, 105); g.lineTo(262, 120); g.lineTo(225, 120); g.fill(); g.beginPath(); g.moveTo(420, 120); g.lineTo(438, 132); g.lineTo(405, 132); g.fill();
    g.fillStyle = '#eef0ea'; g.fillRect(0, 210, W, 210);
    var ice = g.createLinearGradient(0, 280, 0, 360); ice.addColorStop(0, '#a9c3c4'); ice.addColorStop(1, '#8fb0b3');
    g.fillStyle = ice; g.beginPath(); g.ellipse(330, 318, 210, 42, 0, 0, Math.PI * 2); g.fill();
    [[230, 320, '#7a2f25'], [262, 312, '#2d3a55'], [300, 326, '#5b4a2c'], [370, 316, '#7a2f25'], [410, 330, '#2d3a55'], [455, 318, '#3b3b3b']].forEach(function (f) { figure(f[0], f[1], f[2]); });
    house(60, 262, 46, 30, '#6d4a3a', '#b8a58a', true);
    house(128, 252, 34, 24, '#5a3c30', '#c2b195', false);
    house(470, 258, 50, 32, '#6d4a3a', '#b3a084', true);
    house(536, 250, 30, 22, '#5a3c30', '#c2b195', false);
    g.fillStyle = '#b5a58e'; g.fillRect(200, 210, 30, 40); g.fillStyle = '#5a3c30'; g.beginPath(); g.moveTo(196, 210); g.lineTo(215, 170); g.lineTo(234, 210); g.fill();
    g.fillStyle = '#f6f7f2'; g.beginPath(); g.moveTo(0, 360); g.quadraticCurveTo(200, 330, 600, 375); g.lineTo(600, 420); g.lineTo(0, 420); g.fill();
    tree(470, 250, 210, 18); tree(560, 262, 190, -8); tree(40, 300, 170, 10);
    // l'oiseau caché
    var b = BIRD; g.fillStyle = '#16130f';
    g.beginPath(); g.ellipse(b.x, b.y, 7, 4.5, -.3, 0, 7); g.fill(); g.beginPath(); g.arc(b.x + 6, b.y - 4, 3, 0, 7); g.fill();
    g.beginPath(); g.moveTo(b.x - 6, b.y); g.lineTo(b.x - 13, b.y + 3); g.lineTo(b.x - 6, b.y + 3); g.fill();
    // leurres : oiseaux lointains dans le ciel
    g.strokeStyle = '#3a3a36'; g.lineWidth = 1.5;
    [[120, 70], [150, 58], [330, 48]].forEach(function (p) { var x = p[0], y = p[1]; g.beginPath(); g.moveTo(x - 6, y); g.quadraticCurveTo(x - 3, y - 4, x, y); g.quadraticCurveTo(x + 3, y - 4, x + 6, y); g.stroke(); });
    // grain du vernis (graine fixe : même tableau à chaque visite)
    var seed = 11; var rnd = function () { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
    g.fillStyle = 'rgba(80,60,30,.06)'; for (var i = 0; i < 1400; i++) g.fillRect(rnd() * W, rnd() * H, 1, 1);
    g.strokeStyle = 'rgba(0,0,0,.35)'; g.lineWidth = 10; g.strokeRect(0, 0, W, H);
  }
  var base = document.createElement('canvas'); base.width = cv.width; base.height = cv.height;
  g.setTransform(S, 0, 0, S, 0, 0); paint();
  base.getContext('2d').drawImage(cv, 0, 0);

  function draw(now) {
    g.setTransform(1, 0, 0, 1, 0, 0); g.drawImage(base, 0, 0);
    g.setTransform(S, 0, 0, S, 0, 0);
    if (highlight) {
      pulse += .06; var r = highlight.r + Math.sin(pulse) * 5;
      g.strokeStyle = '#d9b56c'; g.lineWidth = 3; g.beginPath(); g.arc(highlight.x, highlight.y, r, 0, 7); g.stroke();
      g.strokeStyle = 'rgba(217,181,108,.35)'; g.lineWidth = 10; g.beginPath(); g.arc(highlight.x, highlight.y, r + 6, 0, 7); g.stroke();
    }
    taps = taps.filter(function (tp) { return now - tp.t < 600; });
    taps.forEach(function (tp) {
      var k = (now - tp.t) / 600;
      g.strokeStyle = 'rgba(255,255,255,' + (0.85 * (1 - k)) + ')'; g.lineWidth = 2.5;
      g.beginPath(); g.arc(tp.x, tp.y, 8 + k * 22, 0, 7); g.stroke();
    });
    if (highlight || taps.length) requestAnimationFrame(draw); else animating = false;
  }
  function animate() { if (!animating) { animating = true; requestAnimationFrame(draw); } }
  draw(performance.now());

  /* ================= Voix (synthèse vocale du navigateur) =================
     iOS Safari et Chrome n'acceptent de parler qu'après un appui : le premier
     message est donc prononcé directement dans le gestionnaire du bouton.
     On n'appelle pas cancel() avant chaque phrase (bug Safari), on laisse la file d'attente. */
  var synth = ('speechSynthesis' in window) ? window.speechSynthesis : null;
  var voices = [];
  function loadVoices() { try { voices = synth.getVoices() || []; } catch (e) { voices = []; } }
  if (synth) { loadVoices(); try { synth.addEventListener('voiceschanged', loadVoices); } catch (e) { synth.onvoiceschanged = loadVoices; } }
  function pickVoice() {
    if (!voices.length) loadVoices();
    var want = t('voiceLang').toLowerCase(), pre = want.slice(0, 2);
    var norm = function (v) { return (v.lang || '').toLowerCase().replace('_', '-'); };
    var list = voices.filter(function (v) { return norm(v).indexOf(pre) === 0; });
    return list.filter(function (v) { return norm(v) === want && v.localService; })[0] ||
           list.filter(function (v) { return norm(v) === want; })[0] || list[0] || null;
  }
  var pending = 0, queueEnd = 0, dimDismissed = false, speechGen = 0;
  function speak(text) {
    if (!state.audio || !synth) return;
    var u;
    try { u = new SpeechSynthesisUtterance(text); } catch (e) { return; }
    u.lang = t('voiceLang'); u.rate = 1; u.pitch = 1;
    var v = pickVoice(); if (v) u.voice = v;
    var done = false, gen = speechGen;
    pending++; showDim();
    var end = function () { if (done) return; done = true; if (gen !== speechGen) return; pending = Math.max(0, pending - 1); if (!pending) hideDim(); };
    u.onend = end; u.onerror = end;
    // Filet de sécurité si le navigateur n'envoie jamais "onend" (ou n'a pas de voix).
    var now = Date.now(); queueEnd = Math.max(now, queueEnd) + text.length * 85 + 600;
    setTimeout(end, queueEnd - now + 2500);
    try { synth.speak(u); if (synth.paused) synth.resume(); } catch (e) { end(); }
  }
  function stopSpeech() {
    speechGen++; pending = 0; queueEnd = 0;
    try { if (synth) synth.cancel(); } catch (e) {}
    hideDim();
  }
  function speakLast() {
    for (var i = state.log.length - 1; i >= 0; i--) if (state.log[i].type === 'art') { speak(t(state.log[i].key)); return; }
  }
  function showDim() { if (state.audio && !dimDismissed && state.view === 'v-talk') $('dim').hidden = false; }
  function hideDim() { $('dim').hidden = true; dimDismissed = false; }
  function setAudio(on) {
    state.audio = on; $('audioToggle').setAttribute('aria-pressed', String(on));
    if (!on) stopSpeech();
  }
  $('audioToggle').addEventListener('click', function () {
    setAudio(!state.audio);
    if (state.audio) speakLast();
  });
  $('wake').addEventListener('click', function () { $('dim').hidden = true; dimDismissed = true; });
  $('dim').addEventListener('click', function (e) { if (e.target === this) { this.hidden = true; dimDismissed = true; } });
  window.addEventListener('pagehide', function () { try { if (synth) synth.cancel(); } catch (e) {} });

  /* ================= Dialogue ================= */
  function msgEl(entry) {
    var m = document.createElement('div');
    m.className = 'msg ' + (entry.type === 'art' ? 'art-says' : 'me') + (entry.cls ? ' ' + entry.cls : '');
    if (entry.type === 'art') { var w = document.createElement('span'); w.className = 'who'; w.textContent = t('who'); m.appendChild(w); }
    m.appendChild(document.createTextNode(t(entry.key)));
    return m;
  }
  function scrollChat() { chat.scrollTop = chat.scrollHeight; }
  function add(type, key, cls) {
    var entry = { type: type, key: key, cls: cls || '' };
    state.log.push(entry); chat.appendChild(msgEl(entry)); scrollChat();
    if (type === 'art') speak(t(key));
  }
  function renderChat() {
    chat.innerHTML = '';
    state.log.forEach(function (e) { var m = msgEl(e); m.style.animation = 'none'; chat.appendChild(m); });
    scrollChat();
  }
  function choices(list) { state.choices = list; renderChoices(); }
  function renderChoices() {
    actionsEl.innerHTML = '';
    state.choices.forEach(function (c) {
      var b = document.createElement('button'); b.className = 'chip'; b.type = 'button'; b.textContent = t(c[0]);
      b.addEventListener('click', function () { state.choices = []; actionsEl.innerHTML = ''; add('me', c[0]); c[1](); });
      actionsEl.appendChild(b);
    });
  }
  // Attente annulée si l'utilisateur recommence entre-temps.
  function wait(ms) { var run = state.run; return new Promise(function (res, rej) { setTimeout(function () { run === state.run ? res() : rej('reset'); }, ms); }); }
  function guard(p) { return p.catch(function () {}); }

  /* ================= Chrono ================= */
  function fmt(s) { return Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0'); }
  function startTimer() {
    state.start = Date.now(); clearInterval(state.tick);
    state.tick = setInterval(function () { $('timer').textContent = fmt((Date.now() - state.start) / 1000); }, 250);
  }

  /* ================= Parcours ================= */
  function show(id) {
    state.view = id;
    ['v-scan', 'v-talk', 'v-end'].forEach(function (v) { $(v).hidden = v !== id; });
  }

  function begin(withAudio) {
    show('v-talk'); setStep(1); startTimer();
    setAudio(withAudio);
    chat.innerHTML = ''; state.log = []; choices([]);
    // Premier message prononcé tout de suite, pendant l'appui (indispensable sur iPhone).
    add('art', 'm_hello');
    guard(wait(1500).then(function () {
      add('art', 'm_secrets');
      choices([['c_yes', askBird], ['c_story', function () {
        add('art', 'm_story');
        guard(wait(1800).then(askBird));
      }]]);
    }));
  }
  $('startVoice').addEventListener('click', function () { begin(MODE === 'visitor'); });
  if ($('startSilent')) $('startSilent').addEventListener('click', function () { begin(false); });

  var tries = 0;
  function askBird() {
    setStep(2); state.phase = 'bird'; tries = 0;
    $('tag').textContent = t('tagGo'); $('tag').classList.add('go');
    add('art', 'm_askBird');
  }
  cv.addEventListener('click', function (e) {
    if (state.phase !== 'bird') return;
    var r = cv.getBoundingClientRect();
    var x = (e.clientX - r.left) * W / r.width, y = (e.clientY - r.top) * H / r.height;
    taps.push({ x: x, y: y, t: performance.now() }); animate();
    if (Math.hypot(x - BIRD.x, y - BIRD.y) <= BIRD.hit) { foundBird(); return; }
    tries++;
    if (tries >= 3) { highlight = { x: BIRD.x, y: BIRD.y, r: 40 }; animate(); }
    add('art', tries === 1 ? 'm_miss1' : tries === 2 ? 'm_miss2' : 'm_miss3');
  });

  function foundBird() {
    state.phase = 'story'; highlight = { x: BIRD.x, y: BIRD.y, r: BIRD.ring }; animate(); setStep(3);
    $('tag').textContent = t('tag'); $('tag').classList.remove('go');
    state.found.push('f_bird');
    add('me', 'me_found', 'found');
    guard(wait(500).then(function () {
      add('art', 'm_birdStory');
      return wait(1800);
    }).then(function () {
      add('art', 'm_askSmoke');
      choices([['1', function () { smoke(false); }], ['2', function () { smoke(true); }], ['3', function () { smoke(false); }]]);
    }));
  }
  // Les réponses chiffrées s'affichent telles quelles dans les deux langues.
  T.fr['1'] = T.en['1'] = '1'; T.fr['2'] = T.en['2'] = '2'; T.fr['3'] = T.en['3'] = '3';

  function smoke(ok) {
    highlight = null;
    if (ok) state.found.push('f_smoke');
    add('art', ok ? 'm_smokeOk' : 'm_smokeNo');
    setStep(4);
    guard(wait(1600).then(function () { choices([['c_time', finish]]); }));
  }

  function finish() {
    clearInterval(state.tick); stopSpeech();
    state.final = Math.max(1, (Date.now() - state.start) / 1000);
    state.phase = 'end';
    show('v-end'); renderEnd(true);
  }
  function renderEnd(animateBars) {
    var secs = state.final;
    $('finalTime').textContent = fmt(secs);
    var ratio = secs / AVG;
    $('ratio').textContent = ratio >= 1.1 ? t('ratio')(String(Math.round(ratio * 10) / 10).replace('.', lang === 'fr' ? ',' : '.')) : t('ratioLow');
    var max = Math.max(secs, AVG) * 1.05;
    var setBars = function () { $('barAvg').style.width = (AVG / max * 100) + '%'; $('barYou').style.width = (secs / max * 100) + '%'; };
    if (animateBars) { $('barAvg').style.width = '0'; $('barYou').style.width = '0'; setTimeout(setBars, 60); }
    else setBars();
    var list = $('foundList'); list.innerHTML = '';
    state.found.forEach(function (f) {
      var d = document.createElement('div'); d.className = 'found-item';
      var i = document.createElement('i'); i.textContent = '✓'; d.appendChild(i);
      d.appendChild(document.createTextNode(t(f))); list.appendChild(d);
    });
  }

  function reset() {
    clearInterval(state.tick); stopSpeech();
    var run = state.run;
    state = freshState(); state.run = run + 1;
    highlight = null; taps = []; tries = 0; chat.innerHTML = ''; actionsEl.innerHTML = '';
    $('timer').textContent = '0:00'; $('tag').textContent = t('tag'); $('tag').classList.remove('go');
    setAudio(false); show('v-scan'); setStep(0); draw(performance.now());
  }
  $('nextBtn').addEventListener('click', reset);
  if ($('restart')) $('restart').addEventListener('click', reset);

  applyStatic(); setStep(0);

  // Pour les tests automatisés uniquement (aucune donnée transmise).
  window.__lookCloser = { state: function () { return state; }, bird: BIRD, W: W, H: H };
})();
