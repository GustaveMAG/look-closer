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
      htmlLang: 'fr', voiceLang: 'fr-FR', langLabel: 'Langue',
      status: 'Salle 4',
      artist: 'Pieter Bruegel l’Ancien', title: 'Chasseurs dans la neige', date: '1565',
      meta: 'Huile sur bois, 117 × 162 cm<br>Kunsthistorisches Museum, Vienne',
      imgAlt: 'Chasseurs dans la neige, Pieter Bruegel l’Ancien, 1565 : trois chasseurs et leurs chiens rentrent au village enneigé, en contrebas des patineurs sur des étangs gelés.',
      startVoice: 'Commencer avec la voix', startSilent: 'Commencer sans le son', startScan: 'Scanner le QR code',
      hintStart: 'Montez le volume. En mode audio, l’écran s’éteint pendant que l’œuvre parle : regardez le tableau, pas le téléphone.',
      hintPresenter: 'Sans appli · sur votre propre téléphone',
      tag: 'Touchez le tableau', tagGo: 'Touchez l’oiseau',
      audio: 'Audio d’abord', who: 'L’œuvre',
      speaking: 'L’œuvre vous parle.', dimText: 'Regardez le tableau, pas le téléphone. L’écran revient quand elle a fini.',
      wake: 'Afficher l’écran',
      m_hello: 'Bonjour. Je suis « Chasseurs dans la neige ». Pieter Bruegel m’a peint en 1565. La plupart des gens passent devant moi en quelques secondes…',
      m_secrets: 'Mais j’ai des secrets. Tu veux jouer ?',
      c_yes: 'Oui, vas-y', c_story: 'Raconte-moi d’abord ton histoire',
      m_story: 'Trois chasseurs rentrent au village avec leurs chiens, fatigués. Leur seul butin : un renard bien maigre. En bas, tout le monde joue sur les étangs gelés.',
      m_askBird: 'Tu vois l’oiseau noir caché dans le ciel ? Il est en plein vol. Touche-le sur le tableau.',
      m_crow: 'Bien vu, c’est une corneille. Mais il y a un autre oiseau, en plein vol, au-dessus de la vallée.',
      m_miss1: 'Pas là… Cherche dans le ciel, au-dessus de la vallée.',
      m_miss2: 'Presque ! Regarde à droite, entre les arbres et les montagnes.',
      m_miss3: 'Je t’aide : il est dans le cercle rouge. Touche-le !',
      me_found: 'Trouvé',
      m_birdStory: 'C’est une pie. Avec les corneilles posées dans les arbres, on y lit souvent un mauvais présage : à l’époque, aux Pays-Bas, la pie était associée au diable.',
      m_askSmoke: 'Dernière question. Regarde les maisons près de l’église : une cheminée a un problème. Que se passe-t-il ?',
      c_fire: 'Elle est en feu', c_fall: 'Elle s’est effondrée', c_smoke: 'Elle fume, c’est tout',
      m_smokeOk: 'Exactement : un feu de cheminée. Pendant que les uns patinent, d’autres ont un vrai souci. Bruegel cache des dizaines de petites histoires comme celle-ci.',
      m_smokeNo: 'Regarde de plus près : la cheminée est en feu. Pendant que les uns patinent, d’autres ont un vrai souci. Bruegel cache des dizaines de petites histoires comme celle-ci.',
      c_time: 'Voir mon temps de regard',
      endLead: 'Votre temps de regard',
      ratio: function (r) { return 'Soit ' + r + ' fois plus que la moyenne des visiteurs.'; },
      ratioLow: 'Un visiteur reste en moyenne 28 secondes devant une œuvre. Prenez votre temps.',
      avg: 'Moyenne 0:28', you: 'Vous',
      foundLead: 'Ce que vous avez vu',
      f_bird: 'La pie en plein vol', f_smoke: 'Le feu de cheminée',
      nightKicker: 'Bientôt', nightTitle: 'Édition de nuit', nightText: 'Le 1er vendredi du mois, les œuvres vous donnent des indices pour un jeu en équipe. Venez entre amis.',
      again: 'Recommencer', next: 'Œuvre suivante',
      credit: 'Image : Kunsthistorisches Museum, Vienne, via Wikimedia Commons (domaine public). Démo Artthropic, sans lien avec le musée. Aucun compte, aucune donnée collectée.',
      restart: 'Recommencer la démo',
      quote: 'Et si, pour une fois, c’était l’œuvre qui vous posait la question ?',
      s1t: 'Je scanne', s1p: 'Un QR code sur le cartel. Pas d’appli à télécharger, mon propre téléphone suffit.',
      s2t: 'L’œuvre me parle', s2p: 'Elle se présente avec sa propre voix. En mode audio, l’écran s’éteint pour que je regarde le tableau.',
      s3t: 'Elle me pose une question', s3p: '« Tu vois l’oiseau noir caché ? » Je cherche le détail et je touche le tableau pour répondre.',
      s4t: 'Je découvre son histoire', s4p: 'Chaque bonne réponse débloque un secret, écrit et validé par les conservateurs.',
      s5t: 'Je regarde vraiment', s5p: 'Mon temps de regard comparé aux 28 secondes de moyenne. Objectif du pilote : 2 minutes.',
      tryIt: 'Essayez sur votre téléphone',
      note: 'Prototype de démonstration. Les réponses sont écrites à l’avance, comme le seraient des textes validés par un musée.'
    },
    en: {
      htmlLang: 'en', voiceLang: 'en-GB', langLabel: 'Language',
      status: 'Room 4',
      artist: 'Pieter Bruegel the Elder', title: 'The Hunters in the Snow', date: '1565',
      meta: 'Oil on panel, 117 × 162 cm<br>Kunsthistorisches Museum, Vienna',
      imgAlt: 'The Hunters in the Snow, Pieter Bruegel the Elder, 1565: three hunters and their dogs return to a snowy village, above skaters on frozen ponds.',
      startVoice: 'Start with sound', startSilent: 'Start without sound', startScan: 'Scan the QR code',
      hintStart: 'Turn the volume up. In audio mode the screen goes dark while the artwork speaks: look at the painting, not your phone.',
      hintPresenter: 'No app · on your own phone',
      tag: 'Tap the painting', tagGo: 'Tap the bird',
      audio: 'Audio first', who: 'The artwork',
      speaking: 'The artwork is speaking.', dimText: 'Look at the painting, not your phone. The screen comes back when it’s done.',
      wake: 'Show the screen',
      m_hello: 'Hello. I’m “The Hunters in the Snow”. Pieter Bruegel painted me in 1565. Most people walk past me in a few seconds…',
      m_secrets: 'But I have secrets. Do you want to play?',
      c_yes: 'Yes, go on', c_story: 'Tell me your story first',
      m_story: 'Three weary hunters return to the village with their dogs. Their only catch: a scrawny fox. Down below, everyone is playing on the frozen ponds.',
      m_askBird: 'Can you see the black bird hidden in the sky? It’s in mid-flight. Tap it on the painting.',
      m_crow: 'Good eye, that’s a crow. But there’s another bird, in mid-flight, above the valley.',
      m_miss1: 'Not there… Look in the sky, above the valley.',
      m_miss2: 'Almost! Look to the right, between the trees and the mountains.',
      m_miss3: 'Here’s a hint: it’s inside the red circle. Tap it!',
      me_found: 'Found it',
      m_birdStory: 'It’s a magpie. Together with the crows in the trees, it is often read as a bad omen: in the Low Countries back then, the magpie was linked to the Devil.',
      m_askSmoke: 'Last question. Look at the houses near the church: one chimney has a problem. What is happening?',
      c_fire: 'It’s on fire', c_fall: 'It has collapsed', c_smoke: 'It’s just smoking',
      m_smokeOk: 'Exactly: a chimney fire. While some people skate, others have a real problem. Bruegel hides dozens of little stories like this one.',
      m_smokeNo: 'Look closer: the chimney is on fire. While some people skate, others have a real problem. Bruegel hides dozens of little stories like this one.',
      c_time: 'See my looking time',
      endLead: 'Your looking time',
      ratio: function (r) { return 'That’s ' + r + ' times longer than the average visitor.'; },
      ratioLow: 'The average visitor spends 28 seconds in front of an artwork. Take your time.',
      avg: 'Average 0:28', you: 'You',
      foundLead: 'What you saw',
      f_bird: 'The magpie in mid-flight', f_smoke: 'The chimney fire',
      nightKicker: 'Coming soon', nightTitle: 'Night edition', nightText: 'On the first Friday of the month, the artworks give you clues for a team game. Come with friends.',
      again: 'Start again', next: 'Next artwork',
      credit: 'Image: Kunsthistorisches Museum, Vienna, via Wikimedia Commons (public domain). Artthropic demo, not affiliated with the museum. No account, no data collected.',
      restart: 'Restart the demo',
      quote: 'What if, for once, it was the artwork asking you the question?',
      s1t: 'I scan', s1p: 'A QR code on the label. No app to download, my own phone is enough.',
      s2t: 'The artwork talks to me', s2p: 'It introduces itself in its own voice. In audio mode the screen goes dark so I look at the painting.',
      s3t: 'It asks me a question', s3p: '“Can you see the hidden black bird?” I look for the detail and tap the painting to answer.',
      s4t: 'I discover its story', s4p: 'Each right answer unlocks a secret, written and checked by the curators.',
      s5t: 'I really look', s5p: 'My looking time compared with the 28-second average. Pilot goal: 2 minutes.',
      tryIt: 'Try it on your phone',
      note: 'Demo prototype. The answers are written in advance, as museum-approved texts would be.'
    }
  };

  var MODE = document.body.getAttribute('data-mode') === 'presenter' ? 'presenter' : 'visitor';
  var AVG = 28;
  var RATIO = 3840 / 2733;               // largeur / hauteur du tableau
  var IMG = 'img/bruegel-1600.jpg', IMG_HD = 'img/bruegel-3200.jpg';
  var LQIP = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCAARABgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDEMDyNBM0bKroQXPAJxWjbacGAbfGcoGyT2PWmPbxwakljpe66liLkuSj5UDlQMdTyOa1YtM1e0t1lnihnMka/KnyuOBwwzjAxyRk+1Y62KcUV49PjI4Yu4J4AI/AetFQWl0sqTRtJcJLjgQgt0OGHPFFC8xcqOm0H/UR/78n8zTNe/wCPu2/H+YooqGaIr3P/ACGLT6n+VFFFUQz/2Q==';
  // Positions en fraction de l'image (x de 0 à 1 sur la largeur, y de 0 à 1 sur la hauteur).
  var MAGPIE = { x: .7116, y: .2623 };
  var CROWS = [[.235, .073], [.569, .187], [.499, .596], [.591, .712]];
  var CHIMNEY = { x: .6847, y: .4167 };
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
      (MODE === 'presenter'
        ? '<button class="btn" type="button" id="startVoice" data-i18n="startScan"></button><p class="hint" data-i18n="hintPresenter"></p>'
        : '<button class="btn" type="button" id="startVoice" data-i18n="startVoice"></button>' +
          '<button class="btn ghost" type="button" id="startSilent" data-i18n="startSilent"></button><p class="hint" data-i18n="hintStart"></p>') +
      '</div>' +
    '</section>' +
    '<section class="view talk" id="v-talk" hidden>' +
      '<div class="art" id="art"><div class="frame" id="frame" style="background-image:url(' + LQIP + ')"><img id="paintImg" data-src="' + IMG + '" data-i18n-alt="imgAlt" decoding="async"></div>' +
        '<span class="tag" id="tag" hidden></span><span class="timer" id="timer">0:00</span></div>' +
      '<div class="chat" id="chat" aria-live="polite"></div>' +
      '<div class="actions" id="actions"></div>' +
      '<div class="audio-bar"><button class="toggle" id="audioToggle" type="button" aria-pressed="false"><span class="sw"></span><span data-i18n="audio"></span></button>' +
        (MODE === 'presenter' ? '' : '<span class="label">FR · EN · LSF</span>') + '</div>' +
      '<div class="dim-overlay" id="dim" hidden><div class="wave"><i></i><i></i><i></i><i></i><i></i></div>' +
        '<strong data-i18n="speaking"></strong><p data-i18n="dimText"></p><button class="btn" id="wake" type="button" data-i18n="wake"></button></div>' +
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
  function freshState() { return { step: 0, start: 0, tick: null, found: [], audio: false, phase: 'idle', log: [], choices: [], row: false, final: 0, view: 'v-scan', run: 0 }; }
  state = freshState();

  /* ================= Traduction ================= */
  function applyStatic() {
    document.documentElement.lang = t('htmlLang');
    document.querySelectorAll('[data-i18n]').forEach(function (el) { el.textContent = t(el.getAttribute('data-i18n')); });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) { el.innerHTML = t(el.getAttribute('data-i18n-html')); });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) { el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria'))); });
    document.querySelectorAll('[data-i18n-alt]').forEach(function (el) { el.setAttribute('alt', t(el.getAttribute('data-i18n-alt'))); });
    document.querySelectorAll('[data-lang]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang)); });
    $('tag').textContent = t('tagGo'); $('tag').hidden = state.phase !== 'bird';
  }
  function setLang(l) {
    if (l === lang) return;
    lang = l; stopSpeech();
    applyStatic(); renderChat(); renderChoices();
    if (state.view === 'v-end') renderEnd(false);
    // Le changement de langue est un appui : on peut relancer la voix (autorisé sur iOS).
    if (state.audio && state.view === 'v-talk') speakLast();
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

  /* ================= Tableau : zoom, cercles, touches ================= */
  function zoomTo(fx, fy, k) {
    if (!k || k <= 1) { frame.style.transform = ''; return; }
    var clamp = function (v, lo, hi) { return Math.max(lo, Math.min(hi, v)); };
    var tx = clamp(50 - fx * 100 * k, 100 - 100 * k, 0), ty = clamp(50 - fy * 100 * k, 100 - 100 * k, 0);
    frame.style.transform = 'translate(' + tx + '%,' + ty + '%) scale(' + k + ')';
  }
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
    if (dist(p, MAGPIE.x, MAGPIE.y) <= HIT_MAGPIE) { foundBird(); return; }
    if (CROWS.some(function (c) { return dist(p, c[0], c[1]) <= HIT_CROW; })) { add('art', 'm_crow'); return; }
    tries++;
    if (tries >= 3) ring(MAGPIE, .12);
    add('art', tries === 1 ? 'm_miss1' : tries === 2 ? 'm_miss2' : 'm_miss3');
  });

  /* ================= Voix (synthèse vocale du navigateur) =================
     iOS Safari et Chrome n'acceptent de parler qu'après un appui : le premier
     message est donc prononcé directement dans le gestionnaire du bouton.
     Pas de cancel() avant chaque phrase (bug Safari) : on laisse la file d'attente. */
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
    var u; try { u = new SpeechSynthesisUtterance(text); } catch (e) { return; }
    u.lang = t('voiceLang'); u.rate = 1; u.pitch = 1;
    var v = pickVoice(); if (v) u.voice = v;
    var done = false, gen = speechGen;
    pending++; showDim();
    var end = function () { if (done) return; done = true; if (gen !== speechGen) return; pending = Math.max(0, pending - 1); if (!pending) hideDim(); };
    u.onend = end; u.onerror = end;
    // Filet de sécurité si le navigateur n'envoie jamais « onend » (ou n'a pas de voix).
    var now = Date.now(); queueEnd = Math.max(now, queueEnd) + text.length * 85 + 600;
    setTimeout(end, queueEnd - now + 2500);
    try { synth.speak(u); if (synth.paused) synth.resume(); } catch (e) { end(); }
  }
  function stopSpeech() { speechGen++; pending = 0; queueEnd = 0; try { if (synth) synth.cancel(); } catch (e) {} hideDim(); }
  function speakLast() { for (var i = state.log.length - 1; i >= 0; i--) if (state.log[i].type === 'art') { speak(t(state.log[i].key)); return; } }
  function showDim() { if (state.audio && !dimDismissed && state.view === 'v-talk') $('dim').hidden = false; }
  function hideDim() { $('dim').hidden = true; dimDismissed = false; }
  function setAudio(on) { state.audio = on; $('audioToggle').setAttribute('aria-pressed', String(on)); if (!on) stopSpeech(); }
  $('audioToggle').addEventListener('click', function () { setAudio(!state.audio); if (state.audio) speakLast(); });
  $('wake').addEventListener('click', function () { $('dim').hidden = true; dimDismissed = true; });
  window.addEventListener('pagehide', function () { try { if (synth) synth.cancel(); } catch (e) {} });

  /* ================= Dialogue ================= */
  function msgEl(entry) {
    var m = document.createElement('div');
    m.className = 'msg ' + (entry.type === 'art' ? 'art-says' : 'me') + (entry.cls ? ' ' + entry.cls : '');
    if (entry.type === 'art') { var w = document.createElement('span'); w.className = 'who label'; w.textContent = t('who'); m.appendChild(w); }
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
  function choices(list, row) { state.choices = list; state.row = !!row; renderChoices(); }
  function renderChoices() {
    actionsEl.innerHTML = ''; actionsEl.classList.toggle('row', !!state.row);
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
  function show(id) { state.view = id; ['v-scan', 'v-talk', 'v-end'].forEach(function (v) { $(v).hidden = v !== id; }); }

  function begin(withAudio) {
    show('v-talk'); setStep(1); startTimer(); setAudio(withAudio); loadHD();
    chat.innerHTML = ''; state.log = []; choices([]);
    // Premier message prononcé tout de suite, pendant l'appui (indispensable sur iPhone).
    add('art', 'm_hello');
    guard(wait(1600).then(function () {
      add('art', 'm_secrets');
      choices([['c_yes', askBird], ['c_story', function () {
        add('art', 'm_story');
        guard(wait(2000).then(askBird));
      }]]);
    }));
  }
  $('startVoice').addEventListener('click', function () { begin(MODE === 'visitor'); });
  if ($('startSilent')) $('startSilent').addEventListener('click', function () { begin(false); });

  function askBird() {
    setStep(2); state.phase = 'bird'; tries = 0;
    frame.classList.add('tappable'); $('tag').hidden = false;
    add('art', 'm_askBird');
  }

  function foundBird() {
    state.phase = 'story'; frame.classList.remove('tappable'); setStep(3);
    $('tag').hidden = true;
    ring(MAGPIE, .06, 4); zoomTo(MAGPIE.x, MAGPIE.y, 4);
    state.found.push('f_bird');
    add('me', 'me_found', 'found');
    guard(wait(700).then(function () {
      add('art', 'm_birdStory');
      return wait(3200);
    }).then(function () {
      clearRings(); zoomTo(0, 0, 1);
      return wait(900);
    }).then(function () {
      add('art', 'm_askSmoke');
      choices([['c_fall', function () { smoke(false); }], ['c_fire', function () { smoke(true); }], ['c_smoke', function () { smoke(false); }]]);
    }));
  }

  function smoke(ok) {
    if (ok) state.found.push('f_smoke');
    ring(CHIMNEY, .05, 6); zoomTo(CHIMNEY.x, CHIMNEY.y, 6);
    add('art', ok ? 'm_smokeOk' : 'm_smokeNo');
    setStep(4);
    guard(wait(1800).then(function () { choices([['c_time', finish]]); }));
  }

  function finish() {
    clearInterval(state.tick); stopSpeech();
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
    clearInterval(state.tick); stopSpeech();
    var run = state.run; state = freshState(); state.run = run + 1;
    tries = 0; chat.innerHTML = ''; actionsEl.innerHTML = ''; clearRings(); zoomTo(0, 0, 1);
    frame.classList.remove('tappable');
    $('timer').textContent = '0:00'; $('tag').hidden = true;
    setAudio(false); show('v-scan'); setStep(0);
  }
  $('nextBtn').addEventListener('click', reset);
  if ($('restart')) $('restart').addEventListener('click', reset);

  applyStatic(); setStep(0);

  // Pour les tests automatisés uniquement (aucune donnée transmise).
  window.__lookCloser = { state: function () { return state; }, magpie: MAGPIE, crows: CROWS, chimney: CHIMNEY };
})();
