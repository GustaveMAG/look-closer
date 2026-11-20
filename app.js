/* Look Closer — l'expérience visiteur, partagée par index.html (plein écran)
   et presenter.html (dans un cadre de téléphone).
   Œuvre : Pieter Bruegel l'Ancien, Chasseurs dans la neige (1565), domaine public.
   Aucune donnée n'est envoyée nulle part : tout se passe dans le navigateur. */
(function () {
  'use strict';

  /* ================= Textes FR / EN =================
     Les faits sur l'œuvre viennent des notices Wikipédia (FR et EN) du tableau. */
  var T = {
    fr: {
      htmlLang: 'fr', langLabel: 'Langue',
      status: 'Salle 4',
      artist: 'Pieter Bruegel l’Ancien', title: 'Chasseurs dans la neige', date: '1565',
      meta: 'Huile sur bois, 117 × 162 cm<br>Kunsthistorisches Museum, Vienne',
      imgAlt: 'Chasseurs dans la neige, Pieter Bruegel l’Ancien, 1565 : trois chasseurs et leurs chiens rentrent au village enneigé, en contrebas des patineurs sur des étangs gelés.',
      start: 'Commencer la visite', startScan: 'Scanner le QR code',
      hintStart: '6 détails à découvrir · environ 3 minutes · sans appli, sans compte',
      hintPresenter: 'Sans appli · sur votre propre téléphone',
      tagGo: 'Touchez l’oiseau', who: 'L’œuvre', intro: 'Introduction', chapter: 'Chapitre',
      ch1: 'Les chasseurs', ch2: 'L’auberge', ch3: 'L’oiseau caché', ch4: 'La vallée gelée', ch5: 'La cheminée', ch6: 'Les montagnes',

      m_hello: 'Bonjour. Je suis « Chasseurs dans la neige ». Pieter Bruegel l’Ancien m’a peint en 1565.',
      m_series: 'Je fais partie d’une série de six tableaux sur les moments de l’année, peints pour Niclaes Jonghelinck, un collectionneur d’Anvers. Cinq existent encore. Moi, je suis l’hiver.',
      m_secrets: 'La plupart des gens passent devant moi en quelques secondes. Pourtant, je cache des dizaines d’histoires. Je te les montre ?',
      c_go: 'Oui, montre-moi', c_next: 'Continuer',

      m_h1: 'Regarde en bas à gauche : trois chasseurs rentrent au village avec leurs chiens. Ils avancent lourdement dans la neige épaisse.',
      m_h2: 'Leur butin ? Un seul renard, bien maigre. Les chiens aussi ont l’air affamés. La chasse a été mauvaise.',

      m_i1: 'Juste à côté, devant l’auberge, des adultes et un enfant ont allumé un grand feu. Ils s’apprêtent à griller un cochon.',
      m_i2: 'Lève les yeux : l’enseigne de l’auberge pend, presque décrochée. Elle représente saint Hubert, ou saint Eustache, le patron des chasseurs. Ironique, pour des chasseurs qui rentrent presque bredouilles…',

      m_askBird: 'À toi de jouer. Tu vois l’oiseau noir caché dans le ciel ? Il est en plein vol. Touche-le sur le tableau.',
      m_crow: 'Bien vu, c’est une corneille. Mais il y a un autre oiseau, en plein vol, au-dessus de la vallée.',
      m_miss1: 'Pas là… Cherche dans le ciel, au-dessus de la vallée.',
      m_miss2: 'Presque ! Regarde à droite, entre les arbres et les montagnes.',
      m_miss3: 'Je t’aide : il est dans le cercle rouge. Touche-le !',
      me_found: 'Trouvé',
      m_birdStory: 'C’est une pie. Avec les corneilles posées dans les arbres, on y lit souvent un mauvais présage : à l’époque, aux Pays-Bas, la pie était associée au diable.',

      m_p1: 'Descends dans la vallée. Sur les étangs gelés, tout le village s’amuse : on patine, on joue à un ancêtre du hockey, et à l’eisstock, un cousin du curling.',
      m_p2: 'Plus bas, à droite, la roue du moulin à eau est prise dans la glace. Elle ne tourne plus.',

      m_askSmoke: 'Une question. Regarde les maisons près de l’église : une cheminée a un problème. Que se passe-t-il ?',
      c_fire: 'Elle est en feu', c_fall: 'Elle s’est effondrée', c_smoke: 'Elle fume, c’est tout',
      m_smokeOk: 'Exactement : un feu de cheminée. Pendant que les uns patinent, d’autres ont un vrai souci.',
      m_smokeNo: 'Regarde de plus près : la cheminée est en feu. Pendant que les uns patinent, d’autres ont un vrai souci.',

      m_m1: 'Et ces montagnes pointues, au fond ? Il n’y en a pas en Flandre ! Bruegel avait traversé les Alpes pendant son voyage en Italie.',
      m_m2: 'Quatre siècles plus tard, le cinéaste Andreï Tarkovski m’a filmé longuement dans « Solaris » (1972). Tu sais maintenant pourquoi : plus on me regarde, plus j’en raconte.',
      c_time: 'Voir mon temps de regard',

      endLead: 'Votre temps de regard',
      ratio: function (r) { return 'Soit ' + r + ' fois plus que la moyenne des visiteurs.'; },
      ratioLow: 'Un visiteur reste en moyenne 28 secondes devant une œuvre. Prenez votre temps.',
      avg: 'Moyenne 0:28', you: 'Vous',
      foundLead: 'Ce que vous avez vu',
      f_hunters: 'Les trois chasseurs et leur maigre renard', f_inn: 'L’enseigne du patron des chasseurs', f_bird: 'La pie en plein vol',
      f_mill: 'Le moulin pris dans la glace', f_smoke: 'Le feu de cheminée', f_alps: 'Des montagnes venues des Alpes',
      nightKicker: 'Bientôt', nightTitle: 'Édition de nuit', nightText: 'Le 1er vendredi du mois, les œuvres vous donnent des indices pour un jeu en équipe. Venez entre amis.',
      again: 'Recommencer', next: 'Œuvre suivante',
      credit: 'Image : Kunsthistorisches Museum, Vienne, via Wikimedia Commons (domaine public). Démo Artthropic, sans lien avec le musée. Aucun compte, aucune donnée collectée.',
      restart: 'Recommencer la démo',
      quote: 'Et si, pour une fois, c’était l’œuvre qui vous posait la question ?',
      s1t: 'Je scanne', s1p: 'Un QR code sur le cartel. Pas d’appli à télécharger, mon propre téléphone suffit.',
      s2t: 'L’œuvre me raconte son histoire', s2p: 'Détail par détail, le tableau zoome sur ce dont elle parle : les chasseurs, l’auberge, son enseigne.',
      s3t: 'Elle me pose une question', s3p: '« Tu vois l’oiseau noir caché ? » Je cherche le détail et je touche le tableau pour répondre.',
      s4t: 'Je découvre ses secrets', s4p: 'Chaque réponse débloque un secret, écrit et validé par les conservateurs.',
      s5t: 'Je regarde vraiment', s5p: 'Mon temps de regard comparé aux 28 secondes de moyenne. Objectif du pilote : 2 minutes.',
      tryIt: 'Essayez sur votre téléphone',
      note: 'Prototype de démonstration. Les textes sont écrits à l’avance, comme le seraient des textes validés par un musée.'
    },
    en: {
      htmlLang: 'en', langLabel: 'Language',
      status: 'Room 4',
      artist: 'Pieter Bruegel the Elder', title: 'The Hunters in the Snow', date: '1565',
      meta: 'Oil on panel, 117 × 162 cm<br>Kunsthistorisches Museum, Vienna',
      imgAlt: 'The Hunters in the Snow, Pieter Bruegel the Elder, 1565: three hunters and their dogs return to a snowy village, above skaters on frozen ponds.',
      start: 'Start the tour', startScan: 'Scan the QR code',
      hintStart: '6 details to discover · about 3 minutes · no app, no account',
      hintPresenter: 'No app · on your own phone',
      tagGo: 'Tap the bird', who: 'The artwork', intro: 'Introduction', chapter: 'Chapter',
      ch1: 'The hunters', ch2: 'The inn', ch3: 'The hidden bird', ch4: 'The frozen valley', ch5: 'The chimney', ch6: 'The mountains',

      m_hello: 'Hello. I’m “The Hunters in the Snow”. Pieter Bruegel the Elder painted me in 1565.',
      m_series: 'I belong to a series of six paintings about the times of the year, made for Niclaes Jonghelinck, a collector in Antwerp. Five still exist. I am winter.',
      m_secrets: 'Most people walk past me in a few seconds. Yet I hide dozens of stories. Shall I show you?',
      c_go: 'Yes, show me', c_next: 'Continue',

      m_h1: 'Look at the bottom left: three hunters are coming back to the village with their dogs. They trudge wearily through the deep snow.',
      m_h2: 'Their catch? A single, scrawny fox. The dogs look hungry too. The hunt went badly.',

      m_i1: 'Right next to them, in front of the inn, some adults and a child have lit a big fire. They are about to singe a pig.',
      m_i2: 'Look up: the inn sign is hanging, almost falling off. It shows Saint Hubert, or Saint Eustace, the patron saint of hunters. Ironic, for hunters coming home almost empty-handed…',

      m_askBird: 'Your turn. Can you see the black bird hidden in the sky? It’s in mid-flight. Tap it on the painting.',
      m_crow: 'Good eye, that’s a crow. But there’s another bird, in mid-flight, above the valley.',
      m_miss1: 'Not there… Look in the sky, above the valley.',
      m_miss2: 'Almost! Look to the right, between the trees and the mountains.',
      m_miss3: 'Here’s a hint: it’s inside the red circle. Tap it!',
      me_found: 'Found it',
      m_birdStory: 'It’s a magpie. Together with the crows in the trees, it is often read as a bad omen: in the Low Countries back then, the magpie was linked to the Devil.',

      m_p1: 'Go down into the valley. On the frozen ponds the whole village is having fun: skating, playing an early form of hockey, and eisstock, a cousin of curling.',
      m_p2: 'Further down, on the right, the watermill’s wheel is caught in the ice. It no longer turns.',

      m_askSmoke: 'A question. Look at the houses near the church: one chimney has a problem. What is happening?',
      c_fire: 'It’s on fire', c_fall: 'It has collapsed', c_smoke: 'It’s just smoking',
      m_smokeOk: 'Exactly: a chimney fire. While some people skate, others have a real problem.',
      m_smokeNo: 'Look closer: the chimney is on fire. While some people skate, others have a real problem.',

      m_m1: 'And those jagged mountains in the distance? There are none in Flanders! Bruegel had crossed the Alps on his journey to Italy.',
      m_m2: 'Four centuries later, the film-maker Andrei Tarkovsky lingered on me in “Solaris” (1972). Now you know why: the longer you look at me, the more I tell.',
      c_time: 'See my looking time',

      endLead: 'Your looking time',
      ratio: function (r) { return 'That’s ' + r + ' times longer than the average visitor.'; },
      ratioLow: 'The average visitor spends 28 seconds in front of an artwork. Take your time.',
      avg: 'Average 0:28', you: 'You',
      foundLead: 'What you saw',
      f_hunters: 'The three hunters and their scrawny fox', f_inn: 'The sign of the hunters’ patron saint', f_bird: 'The magpie in mid-flight',
      f_mill: 'The mill caught in the ice', f_smoke: 'The chimney fire', f_alps: 'Mountains borrowed from the Alps',
      nightKicker: 'Coming soon', nightTitle: 'Night edition', nightText: 'On the first Friday of the month, the artworks give you clues for a team game. Come with friends.',
      again: 'Start again', next: 'Next artwork',
      credit: 'Image: Kunsthistorisches Museum, Vienna, via Wikimedia Commons (public domain). Artthropic demo, not affiliated with the museum. No account, no data collected.',
      restart: 'Restart the demo',
      quote: 'What if, for once, it was the artwork asking you the question?',
      s1t: 'I scan', s1p: 'A QR code on the label. No app to download, my own phone is enough.',
      s2t: 'The artwork tells me its story', s2p: 'Detail by detail, the painting zooms in on what it talks about: the hunters, the inn, its sign.',
      s3t: 'It asks me a question', s3p: '“Can you see the hidden black bird?” I look for the detail and tap the painting to answer.',
      s4t: 'I discover its secrets', s4p: 'Each answer unlocks a secret, written and checked by the curators.',
      s5t: 'I really look', s5p: 'My looking time compared with the 28-second average. Pilot goal: 2 minutes.',
      tryIt: 'Try it on your phone',
      note: 'Demo prototype. The texts are written in advance, as museum-approved texts would be.'
    }
  };

  var MODE = document.body.getAttribute('data-mode') === 'presenter' ? 'presenter' : 'visitor';
  var AVG = 28, CHAPTERS = 6;
  var RATIO = 3840 / 2733;               // largeur / hauteur du tableau
  var IMG = 'img/bruegel-1600.jpg', IMG_HD = 'img/bruegel-3200.jpg';
  var LQIP = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCAARABgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDEMDyNBM0bKroQXPAJxWjbacGAbfGcoGyT2PWmPbxwakljpe66liLkuSj5UDlQMdTyOa1YtM1e0t1lnihnMka/KnyuOBwwzjAxyRk+1Y62KcUV49PjI4Yu4J4AI/AetFQWl0sqTRtJcJLjgQgt0OGHPFFC8xcqOm0H/UR/78n8zTNe/wCPu2/H+YooqGaIr3P/ACGLT6n+VFFFUQz/2Q==';
  // Positions en fraction de l'image (x de 0 à 1 sur la largeur, y de 0 à 1 sur la hauteur).
  var P = {
    hunters: { x: .33, y: .70, k: 2.2 },
    inn: { x: .12, y: .48, k: 2.4 },
    sign: { x: .104, y: .3825 },
    magpie: { x: .7116, y: .2623 },
    pond: { x: .79, y: .60, k: 2.4 },
    mill: { x: .9386, y: .821, k: 3 },
    chimney: { x: .6847, y: .4167 },
    alps: { x: .87, y: .22, k: 2.2 }
  };
  var CROWS = [[.235, .073], [.569, .187], [.499, .596], [.591, .712]];
  var HIT_MAGPIE = .085, HIT_CROW = .04;  // rayons de touche, en fraction de la largeur

  var lang = (function () { var m = /[?&]lang=(fr|en)\b/.exec(location.search); return m ? m[1] : 'fr'; })();
  var t = function (k) { return T[lang][k]; };

  /* ================= Interface ================= */
  var host = document.getElementById('app');
  var top = MODE === 'presenter'
    ? '<div class="statusbar"><span>20:14</span><span data-i18n="status"></span></div>'
    : '<header class="lc-top"><div class="lc-brand"><span class="dot" aria-hidden="true"></span>Look Closer</div>' +
      '<div class="lang" role="group" data-i18n-aria="langLabel"><button type="button" data-lang="fr" lang="fr">FR</button><button type="button" data-lang="en" lang="en">EN</button></div></header>';

  host.innerHTML =
    '<div class="lc">' + top +
    '<section class="view welcome" id="v-scan">' +
      '<div class="art"><div class="frame" style="background-image:url(' + LQIP + ')"><img data-src="' + IMG + '" data-i18n-alt="imgAlt" decoding="async"></div></div>' +
      '<div class="cartel"><span class="artist" data-i18n="artist"></span><span class="title"><i data-i18n="title"></i>, <span data-i18n="date"></span></span>' +
        '<span class="meta" data-i18n-html="meta"></span></div>' +
      '<div class="cta">' +
        '<button class="btn" type="button" id="startBtn" data-i18n="' + (MODE === 'presenter' ? 'startScan' : 'start') + '"></button>' +
        '<p class="hint" data-i18n="' + (MODE === 'presenter' ? 'hintPresenter' : 'hintStart') + '"></p>' +
      '</div>' +
    '</section>' +
    '<section class="view talk" id="v-talk" hidden>' +
      '<div class="art" id="art"><div class="frame" id="frame" style="background-image:url(' + LQIP + ')"><img id="paintImg" data-src="' + IMG + '" data-i18n-alt="imgAlt" decoding="async"></div>' +
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
      '<button class="btn" id="nextBtn" type="button" data-i18n="' + (MODE === 'presenter' ? 'next' : 'again') + '"></button>' +
      '<p class="credit" data-i18n="credit"></p>' +
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
    hd.onload = function () { $('paintImg').src = IMG_HD; };
    hd.src = IMG_HD;
  }

  var state;
  function freshState() { return { step: 0, start: 0, tick: null, found: [], phase: 'idle', chapter: 0, log: [], choices: [], final: 0, view: 'v-scan', run: 0 }; }
  state = freshState();

  /* ================= Traduction ================= */
  function setTag() {
    var tag = $('tag');
    if (state.phase === 'bird') { tag.textContent = t('tagGo'); tag.classList.add('go'); tag.hidden = false; }
    else tag.hidden = true;
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

  var tries = 0;
  frame.addEventListener('click', function (e) {
    if (state.phase !== 'bird') return;
    var r = frame.getBoundingClientRect();
    var fx = (e.clientX - r.left) / r.width, fy = (e.clientY - r.top) / r.height;
    var rp = document.createElement('span'); rp.className = 'ripple';
    rp.style.left = (fx * 100) + '%'; rp.style.top = (fy * 100) + '%';
    frame.appendChild(rp); setTimeout(function () { rp.remove(); }, 700);
    var p = { x: fx, y: fy };
    if (dist(p, P.magpie.x, P.magpie.y) <= HIT_MAGPIE) { foundBird(); return; }
    if (CROWS.some(function (c) { return dist(p, c[0], c[1]) <= HIT_CROW; })) { add('art', 'm_crow', 'fb'); return; }
    tries++;
    if (tries >= 3) ring(P.magpie, .12);
    add('art', tries === 1 ? 'm_miss1' : tries === 2 ? 'm_miss2' : 'm_miss3', 'fb');
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
  function add(type, key, cls) {
    var entry = { type: type, key: key, cls: cls || '' };
    if (entry.cls === 'fb') {
      state.log = state.log.filter(function (e) { return e.cls !== 'fb'; });
      chat.querySelectorAll('.fb').forEach(function (el) { el.remove(); });
    }
    state.log.push(entry); chat.appendChild(msgEl(entry)); scrollChat();
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
      var b = document.createElement('button'); b.type = 'button'; b.textContent = t(c[0]);
      b.className = /^c_(go|next|time)$/.test(c[0]) ? 'chip primary' : 'chip';
      b.addEventListener('click', function () {
        state.choices = []; actionsEl.innerHTML = '';
        if (!/^c_(go|next|time)$/.test(c[0])) add('me', c[0]);
        c[1]();
      });
      actionsEl.appendChild(b);
    });
  }
  function next(fn) { choices([['c_next', fn]]); }
  // Attente annulée si l'utilisateur recommence entre-temps.
  function wait(ms) { var run = state.run; return new Promise(function (res, rej) { setTimeout(function () { run === state.run ? res() : rej('reset'); }, ms); }); }
  function guard(p) { return p.catch(function () {}); }
  // Affiche une suite de messages, chacun après un temps de lecture proportionnel au précédent.
  function say(keys, then) {
    var i = 0;
    function step() {
      add('art', keys[i]);
      var len = t(keys[i]).length; i++;
      if (i < keys.length) return wait(Math.min(3400, 900 + len * 22)).then(step);
      return wait(700).then(function () { if (then) then(); });
    }
    return guard(step());
  }

  /* ================= Chrono ================= */
  function fmt(s) { return Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0'); }
  function startTimer() {
    state.start = Date.now(); clearInterval(state.tick);
    state.tick = setInterval(function () { $('timer').textContent = fmt((Date.now() - state.start) / 1000); }, 250);
  }

  /* ================= Parcours ================= */
  function show(id) { state.view = id; ['v-scan', 'v-talk', 'v-end'].forEach(function (v) { $(v).hidden = v !== id; }); }

  function begin() {
    show('v-talk'); setStep(1); startTimer(); loadHD(); setChapter(0); choices([]);
    say(['m_hello', 'm_series', 'm_secrets'], function () { choices([['c_go', chHunters]]); });
  }
  $('startBtn').addEventListener('click', begin);

  // 1. Les chasseurs
  function chHunters() {
    setChapter(1); zoomTo(P.hunters); state.found.push('f_hunters');
    say(['m_h1', 'm_h2'], function () { next(chInn); });
  }
  // 2. L'auberge et son enseigne
  function chInn() {
    setChapter(2); zoomTo(P.inn); state.found.push('f_inn');
    add('art', 'm_i1');
    guard(wait(2600).then(function () {
      ring(P.sign, .085, P.inn.k);
      add('art', 'm_i2');
      return wait(1800);
    }).then(function () { next(chBird); }));
  }
  // 3. Le jeu : l'oiseau caché
  function chBird() {
    clearRings(); zoomOut(); setChapter(3); setStep(2);
    state.phase = 'bird'; tries = 0; frame.classList.add('tappable'); setTag();
    add('art', 'm_askBird');
  }
  function foundBird() {
    state.phase = 'story'; frame.classList.remove('tappable'); setStep(3); setTag();
    ring(P.magpie, .06, 4); zoomTo(P.magpie, 4);
    state.found.push('f_bird');
    state.log = state.log.filter(function (e) { return e.cls !== 'fb'; }); chat.querySelectorAll('.fb').forEach(function (el) { el.remove(); });
    add('me', 'me_found', 'found');
    guard(wait(700).then(function () { say(['m_birdStory'], function () { next(chValley); }); }));
  }
  // 4. La vallée gelée et le moulin
  function chValley() {
    clearRings(); setChapter(4); zoomTo(P.pond); state.found.push('f_mill');
    add('art', 'm_p1');
    guard(wait(3200).then(function () {
      zoomTo(P.mill); add('art', 'm_p2');
      return wait(1500);
    }).then(function () { next(chChimney); }));
  }
  // 5. La question de la cheminée
  function chChimney() {
    setChapter(5); zoomOut();
    add('art', 'm_askSmoke');
    choices([['c_fall', function () { smoke(false); }], ['c_fire', function () { smoke(true); }], ['c_smoke', function () { smoke(false); }]]);
  }
  function smoke(ok) {
    state.found.push('f_smoke');
    ring(P.chimney, .05, 6); zoomTo(P.chimney, 6);
    say([ok ? 'm_smokeOk' : 'm_smokeNo'], function () { next(chAlps); });
  }
  // 6. Les montagnes, et la fin
  function chAlps() {
    clearRings(); setChapter(6); zoomTo(P.alps); state.found.push('f_alps'); setStep(4);
    add('art', 'm_m1');
    guard(wait(3000).then(function () {
      zoomOut(); add('art', 'm_m2');
      return wait(1800);
    }).then(function () { choices([['c_time', finish]]); }));
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
    tries = 0; chat.innerHTML = ''; actionsEl.innerHTML = ''; clearRings(); zoomOut();
    frame.classList.remove('tappable');
    $('timer').textContent = '0:00'; setChapter(0);
    show('v-scan'); setStep(0);
  }
  $('nextBtn').addEventListener('click', reset);
  if ($('restart')) $('restart').addEventListener('click', reset);

  applyStatic(); setStep(0);

  // Pour les tests automatisés uniquement (aucune donnée transmise).
  window.__lookCloser = { state: function () { return state; }, P: P, crows: CROWS };
})();
