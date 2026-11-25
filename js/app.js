/* =========================================================
   CodeAndes · app.js  (motor del curso)
   Todo se guarda en este dispositivo (localStorage).
   ========================================================= */
(function () {
  'use strict';

  const KEY = 'codeandes_v1';
  const VERSION = 1;
  const MAX_VIDAS = 5;
  const REGEN_MIN = 20;       // minutos para recuperar 1 vida
  const APRUEBA = 70;         // % para aprobar un examen
  const ETAPAS = window.CURSO || [];
  const $ = (s, r = document) => r.querySelector(s);
  const app = $('#app');
  const capa = $('#capa');

  /* ---------------- Mascotas (evolucionan con cada etapa aprobada) ---------------- */
  const MASCOTAS = {
    condor: {
      nombre: 'Cóndor',
      formas: ['🥚', '🐣', '🐥', '🐤', '🐦', '🦜', '🦅', '🦅'],
      nombres: ['Huevo', 'Pollito', 'Polluelo', 'Pichón', 'Ave joven', 'Ave veloz', 'Cóndor', 'Cóndor legendario']
    },
    dragon: {
      nombre: 'Dragón',
      formas: ['🥚', '🦎', '🐍', '🐊', '🦖', '🐲', '🐉', '🐉'],
      nombres: ['Huevo de dragón', 'Lagartija', 'Serpiente', 'Saurio', 'Dinosaurio', 'Dragoncito', 'Dragón', 'Dragón legendario']
    },
    felino: {
      nombre: 'Felino',
      formas: ['🐾', '🐱', '🐈', '🐆', '🐅', '🐯', '🦁', '🦁'],
      nombres: ['Huellita', 'Gatito', 'Gato', 'Leopardo', 'Tigre', 'Tigre rey', 'León', 'León legendario']
    }
  };
  const METAS = [
    { xp: 10, t: 'Relajada' }, { xp: 20, t: 'Normal' }, { xp: 30, t: 'Seria' }, { xp: 50, t: 'Intensa' }
  ];
  const ZIG = [0, 48, 72, 48, 0, -48, -72, -48];

  /* ---------------- Índice del curso ---------------- */
  const NODOS = [];
  const EJ = {};
  const LEC = {};
  ETAPAS.forEach((et, ei) => {
    et.num = ei + 1;
    et.lecciones.forEach((l, li) => {
      l.etapa = et;
      l.num = li + 1;
      LEC[l.id] = l;
      l.ejercicios.forEach((e, k) => { e.id = l.id + '-' + k; EJ[e.id] = { ej: e, lec: l }; });
      NODOS.push({ tipo: 'leccion', id: l.id, etapa: et, lec: l });
    });
    NODOS.push({ tipo: 'examen', id: 'ex-' + et.id, etapa: et });
  });
  const TOTAL_LEC = Object.keys(LEC).length;
  const MAXN = ETAPAS.length;   // niveles de la mascota = etapas

  /* ---------------- Utilidades ---------------- */
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  function rico(s) {
    return esc(s)
      .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
      .replace(/`([^`]+?)`/g, '<code>$1</code>')
      .replace(/\n/g, '<br>');
  }
  function mezclar(a) {
    a = a.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }
  function fechaLocal(d = new Date()) {
    const z = n => String(n).padStart(2, '0');
    return d.getFullYear() + '-' + z(d.getMonth() + 1) + '-' + z(d.getDate());
  }
  function ayer() { const d = new Date(); d.setDate(d.getDate() - 1); return fechaLocal(d); }
  function hace(ts) {
    const d = Math.floor((Date.now() - ts) / 86400000);
    return d <= 0 ? 'hoy' : d === 1 ? 'ayer' : 'hace ' + d + ' días';
  }
  const norm = s => String(s == null ? '' : s).toLowerCase().replace(/\s+/g, ' ').trim();
  const esCodigo = s => /[;{}()=<>%\[\]]|::|\+\+|^\s*(int|float|char|bool|void|cout|cin|printf|scanf|return)\b/.test(s);

  /* Resaltador de código C/C++ sencillo */
  const KW = new Set('if else for while do switch case break default continue return const struct class public private protected new delete true false using namespace try catch throw auto template typename virtual override this nullptr sizeof static'.split(' '));
  const TY = new Set('int float double char bool void long short unsigned string vector map std ifstream ofstream fstream FILE'.split(' '));
  const FN = new Set('printf scanf main cout cin endl getline strlen strcpy strcmp strcat toupper tolower sort find push_back size sqrt pow fopen fclose fprintf fscanf fgets begin end what'.split(' '));
  const TOK = /(\/\/[^\n]*)|("(?:\\.|[^"\\\n])*")|('(?:\\.|[^'\\\n])*')|(#\s*\w+(?:\s*<[^>\n]+>)?)|(\b\d+(?:\.\d+)?f?\b)|(\b[A-Za-z_]\w*\b)/g;
  function hl(code) {
    let out = '', last = 0, m;
    TOK.lastIndex = 0;
    while ((m = TOK.exec(code))) {
      out += esc(code.slice(last, m.index));
      const t = m[0];
      let cls = '';
      if (m[1]) cls = 'cm';
      else if (m[2] || m[3]) cls = 's';
      else if (m[4]) cls = 'pp';
      else if (m[5]) cls = 'n';
      else if (m[6]) cls = KW.has(t) ? 'k' : TY.has(t) ? 'ty' : FN.has(t) ? 'fn' : '';
      out += cls ? '<span class="' + cls + '">' + esc(t) + '</span>' : esc(t);
      last = m.index + t.length;
    }
    return out + esc(code.slice(last));
  }

  /* ---------------- Estado guardado ---------------- */
  function nuevoEstado() {
    return {
      version: VERSION,
      perfil: null,
      xp: 0,
      xpDia: { fecha: fechaLocal(), xp: 0 },
      racha: { dias: 0, ultima: null, mejor: 0 },
      vidas: { n: MAX_VIDAS, ts: Date.now() },
      ajustes: { oscuro: false, sonido: true, vidas: true, estricto: true },
      lecciones: {},
      examenes: {},
      errores: [],
      logros: {},
      stats: { ok: 0, corregidos: 0, perfectas: 0, examenes: 0, ejecuciones: 0 },
      retos: {},
      codigos: {},
      ultimoRespaldo: null,
      creado: Date.now()
    };
  }
  function fusionar(o) {
    const base = nuevoEstado();
    const r = Object.assign(base, o);
    ['ajustes', 'stats', 'racha', 'vidas', 'xpDia'].forEach(k => { r[k] = Object.assign(nuevoEstado()[k], o[k] || {}); });
    r.lecciones = o.lecciones || {};
    r.examenes = o.examenes || {};
    r.errores = Array.isArray(o.errores) ? o.errores : [];
    r.logros = o.logros || {};
    r.retos = o.retos || {};
    r.codigos = o.codigos || {};
    r.version = VERSION;
    return r;
  }
  function cargar() {
    try {
      const s = JSON.parse(localStorage.getItem(KEY));
      if (s && s.version) return fusionar(s);
    } catch (e) { /* nada */ }
    return nuevoEstado();
  }
  let S = cargar();
  function guardar() {
    try { localStorage.setItem(KEY, JSON.stringify(S)); }
    catch (e) { toast('⚠️ No se pudo guardar. Haz un respaldo en Perfil.'); }
  }

  const ui = { tab: 'inicio', scrollActual: true, bv: { nombre: '', masc: 'condor', meta: 20 }, pendiente: null };
  let ses = null;            // sesión de lección/examen en curso
  let instalarEvt = null;    // para el botón "Instalar app"
  let resolver = null;       // para las preguntas Sí/No

  /* ---------------- Progreso ---------------- */
  const leccionHecha = id => !!(S.lecciones[id] && S.lecciones[id].hecha);
  const examenAprobado = id => !!(S.examenes[id] && S.examenes[id].aprobado);
  const nLecHechas = () => Object.keys(LEC).filter(leccionHecha).length;
  const nRetos = () => Object.keys(LEC).filter(id => S.retos[id]).length;
  function retosEtapa(et) { return { h: et.lecciones.filter(l => S.retos[l.id]).length, t: et.lecciones.length }; }
  function examenBloqueado(et) { if (!S.ajustes.estricto) return false; const r = retosEtapa(et); return r.h < r.t; }
  function completo(n) { return n.tipo === 'leccion' ? leccionHecha(n.id) : examenAprobado(n.etapa.id); }
  function desbloq(i) {
    const n = NODOS[i];
    if (n.tipo === 'examen') return desbloq(NODOS.findIndex(x => x.etapa === n.etapa));
    return i === 0 || completo(NODOS[i - 1]);
  }
  function nivelMasc() { return ETAPAS.filter(e => examenAprobado(e.id)).length; }
  function mascota() { return MASCOTAS[S.perfil && S.perfil.mascota] || MASCOTAS.condor; }
  function mascHTML(nivel) {
    const m = mascota();
    const n = Math.min(nivel == null ? nivelMasc() : nivel, m.formas.length - 1);
    return '<div class="masc ' + (n === m.formas.length - 1 ? 'leyenda' : '') + '">' + m.formas[n] + '</div>';
  }

  /* ---------------- XP, racha y vidas ---------------- */
  function xpHoy() { return S.xpDia.fecha === fechaLocal() ? S.xpDia.xp : 0; }
  function rachaVisible() { const r = S.racha; return (r.ultima === fechaLocal() || r.ultima === ayer()) ? r.dias : 0; }
  function sumarXP(n) {
    if (n <= 0) return;
    const h = fechaLocal();
    if (S.xpDia.fecha !== h) S.xpDia = { fecha: h, xp: 0 };
    const antes = S.xpDia.xp;
    S.xp += n;
    S.xpDia.xp += n;
    const r = S.racha;
    if (r.ultima !== h) {
      r.dias = r.ultima === ayer() ? r.dias + 1 : 1;
      r.ultima = h;
      r.mejor = Math.max(r.mejor, r.dias);
      if (r.dias > 1) setTimeout(() => toast('🔥 ¡Racha de ' + r.dias + ' días!'), 300);
    }
    const meta = S.perfil.meta;
    if (antes < meta && S.xpDia.xp >= meta) setTimeout(() => toast('🎯 ¡Cumpliste tu meta de hoy!'), 700);
  }
  function actualizarVidas() {
    const v = S.vidas;
    if (v.n >= MAX_VIDAS) { v.n = MAX_VIDAS; v.ts = Date.now(); return; }
    const ms = REGEN_MIN * 60000;
    const g = Math.floor((Date.now() - v.ts) / ms);
    if (g > 0) {
      v.n = Math.min(MAX_VIDAS, v.n + g);
      v.ts += g * ms;
      if (v.n >= MAX_VIDAS) v.ts = Date.now();
    }
  }
  function minProxVida() { return Math.max(1, Math.ceil((S.vidas.ts + REGEN_MIN * 60000 - Date.now()) / 60000)); }
  function perderVida() {
    actualizarVidas();
    if (S.vidas.n >= MAX_VIDAS) S.vidas.ts = Date.now();
    S.vidas.n = Math.max(0, S.vidas.n - 1);
  }
  function agregarError(id) {
    if (!S.errores.includes(id)) S.errores.push(id);
    if (S.errores.length > 250) S.errores.shift();
  }
  function quitarError(id) { S.errores = S.errores.filter(x => x !== id); }

  /* ---------------- Logros ---------------- */
  const LOGROS = [
    { id: 'primera', i: '👣', t: 'Primer paso', d: 'Completa tu primera lección', ok: () => nLecHechas() >= 1 },
    { id: 'cinco', i: '📚', t: 'Estudioso', d: 'Completa 5 lecciones', ok: () => nLecHechas() >= 5 },
    { id: 'veinte', i: '🎓', t: 'Imparable', d: 'Completa 20 lecciones', ok: () => nLecHechas() >= 20 },
    { id: 'perfecta', i: '💎', t: 'Perfección', d: 'Termina una lección sin errores', ok: () => S.stats.perfectas >= 1 },
    { id: 'racha3', i: '🔥', t: 'En llamas', d: 'Racha de 3 días', ok: () => S.racha.mejor >= 3 },
    { id: 'racha7', i: '☄️', t: 'Semana de fuego', d: 'Racha de 7 días', ok: () => S.racha.mejor >= 7 },
    { id: 'racha30', i: '🌋', t: 'Volcán Cotopaxi', d: 'Racha de 30 días', ok: () => S.racha.mejor >= 30 },
    { id: 'xp100', i: '⚡', t: 'Cargado', d: 'Gana 100 XP', ok: () => S.xp >= 100 },
    { id: 'xp500', i: '🔋', t: 'Súper cargado', d: 'Gana 500 XP', ok: () => S.xp >= 500 },
    { id: 'xp1500', i: '🚀', t: 'A toda máquina', d: 'Gana 1500 XP', ok: () => S.xp >= 1500 },
    { id: 'repaso', i: '🩹', t: 'Aprendo de mis errores', d: 'Corrige 10 errores en el repaso', ok: () => S.stats.corregidos >= 10 },
    { id: 'respaldo', i: '💾', t: 'Precavido', d: 'Haz tu primer respaldo', ok: () => !!S.ultimoRespaldo },
    { id: 'lab', i: '🧪', t: 'Hola, mundo', d: 'Ejecuta tu primer programa en el Laboratorio', ok: () => S.stats.ejecuciones >= 1 },
    { id: 'reto1', i: '💻', t: 'Programador', d: 'Aprueba tu primer reto', ok: () => nRetos() >= 1 },
    { id: 'reto10', i: '⌨️', t: 'Codificador', d: 'Aprueba 10 retos', ok: () => nRetos() >= 10 },
    { id: 'retoAll', i: '🧠', t: 'Sin miedo al código', d: 'Aprueba todos los retos', ok: () => nRetos() >= TOTAL_LEC }
  ].concat(ETAPAS.map(e => ({
    id: 'etapa-' + e.id, i: e.medalla || '🏅', t: e.logro || ('Etapa ' + e.num),
    d: 'Aprueba el examen de la Etapa ' + e.num, ok: () => examenAprobado(e.id)
  })));
  function revisarLogros() {
    let n = 0;
    LOGROS.forEach(l => {
      if (!S.logros[l.id] && l.ok()) {
        S.logros[l.id] = fechaLocal();
        setTimeout(() => { toast('🏅 Logro: ' + l.t); sonido('logro'); }, 900 + 700 * n++);
      }
    });
    guardar();
  }

  /* ---------------- Sonidos (sin archivos, generados al momento) ---------------- */
  let actx = null;
  function sonido(t) {
    if (!S.ajustes.sonido) return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      const notas = {
        ok: [[660, 0], [880, 0.09]],
        mal: [[260, 0], [200, 0.13]],
        fin: [[523, 0], [659, 0.1], [784, 0.2], [1046, 0.32]],
        logro: [[784, 0], [1046, 0.12]]
      }[t] || [];
      const vol = t === 'mal' ? 0.12 : 0.18;
      notas.forEach(([f, d]) => {
        const o = actx.createOscillator(), g = actx.createGain(), t0 = actx.currentTime + d;
        o.type = 'triangle';
        o.frequency.value = f;
        g.gain.setValueAtTime(0.0001, t0);
        g.gain.exponentialRampToValueAtTime(vol, t0 + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.2);
        o.connect(g); g.connect(actx.destination);
        o.start(t0); o.stop(t0 + 0.22);
      });
    } catch (e) { /* sin sonido */ }
  }
  function confeti() {
    const cols = ['#1CB0F6', '#FFC800', '#FF9600', '#CE82FF', '#FF4B4B', '#58CC02'];
    for (let k = 0; k < 70; k++) {
      const d = document.createElement('div');
      d.className = 'confeti';
      d.style.left = Math.random() * 100 + 'vw';
      d.style.background = cols[k % cols.length];
      d.style.animationDuration = (1.6 + Math.random() * 1.6) + 's';
      d.style.animationDelay = (Math.random() * 0.4) + 's';
      document.body.appendChild(d);
      setTimeout(() => d.remove(), 3800);
    }
  }
  function toast(t) {
    const d = document.createElement('div');
    d.className = 'toast';
    d.textContent = t;
    $('#toasts').appendChild(d);
    setTimeout(() => d.remove(), 2800);
  }

  /* ---------------- Modales ---------------- */
  function modal(html, op) {
    op = op || {};
    cerrarModal();
    const d = document.createElement('div');
    d.className = 'fondo' + (op.centro ? ' centro' : '');
    d.id = 'modal';
    d.innerHTML = '<div class="hoja">' + html + '</div>';
    if (op.cerrable !== false) d.addEventListener('click', ev => { if (ev.target === d) cerrarModal(); });
    document.body.appendChild(d);
    return d;
  }
  function cerrarModal() { const m = $('#modal'); if (m) m.remove(); }
  function preguntar(titulo, texto, si, no, clase) {
    return new Promise(r => {
      resolver = r;
      modal('<h3>' + titulo + '</h3><p>' + texto + '</p><div class="botones">' +
        '<button class="btn ' + (clase || '') + '" data-a="resp-si">' + si + '</button>' +
        '<button class="btn borde" data-a="resp-no">' + no + '</button></div>', { centro: true, cerrable: false });
    });
  }

  /* ---------------- Tema ---------------- */
  function aplicarTema() {
    document.body.classList.toggle('dark', !!S.ajustes.oscuro);
    const m = document.querySelector('meta[name="theme-color"]');
    if (m) m.setAttribute('content', S.ajustes.oscuro ? '#131F24' : '#1CB0F6');
  }

  /* =========================================================
     VISTAS
     ========================================================= */
  function render() {
    aplicarTema();
    if (!S.perfil) { app.innerHTML = vistaBienvenida(); return; }
    const v = { inicio: vistaInicio, practicas: vistaPracticas, repaso: vistaRepaso, apuntes: vistaApuntes, logros: vistaLogros, perfil: vistaPerfil }[ui.tab] || vistaInicio;
    app.innerHTML = vistaTop() + '<main><div class="wrap">' + v() + '</div></main>' + vistaNav();
    if (ui.tab === 'inicio' && ui.scrollActual) {
      const n = $('.node.actual');
      if (n) n.scrollIntoView({ block: 'center' });
      ui.scrollActual = false;
    }
  }

  function vistaTop() {
    actualizarVidas();
    const r = rachaVisible();
    return '<header class="top"><div class="wrap">' +
      '<div class="logo"><span class="cpp">C++</span><span class="nom">CodeAndes</span></div>' +
      '<div class="stats">' +
      '<div class="stat fuego ' + (r ? '' : 'apagada') + '" title="Racha">🔥 ' + r + '</div>' +
      '<div class="stat xp" title="XP">⚡ ' + S.xp + '</div>' +
      '<button class="stat vida ' + (S.ajustes.vidas ? '' : 'apagada') + '" style="background:none;border:0;padding:0" data-a="info-vidas" title="Vidas">❤️ ' + (S.ajustes.vidas ? S.vidas.n : '∞') + '</button>' +
      '</div></div></header>';
  }

  function vistaNav() {
    const tabs = [['inicio', '🏠', 'Aprender'], ['practicas', '💻', 'Prácticas'], ['repaso', '🔁', 'Repaso'], ['apuntes', '📒', 'Apuntes'], ['perfil', '👤', 'Perfil']];
    return '<nav class="nav"><div class="wrap">' + tabs.map(t =>
      '<button class="' + (ui.tab === t[0] || (ui.tab === 'logros' && t[0] === 'perfil') ? 'on' : '') + '" data-a="tab" data-t="' + t[0] + '"><span>' + t[1] + '</span>' + t[2] + '</button>').join('') +
      '</div></nav>';
  }

  function fraseMasc() {
    const n = S.perfil.nombre || 'amigo';
    const r = rachaVisible();
    const L = [
      '¡Hola, ' + n + '! ¿Seguimos con C++?',
      'Un poquito cada día y llegas lejos 💪',
      'Recuerda: casi toda instrucción termina en punto y coma ;',
      'Equivocarse también es aprender 😉',
      r > 1 ? '¡Llevas ' + r + ' días seguidos! 🔥' : '¡Empieza tu racha hoy! 🔥',
      'Lo que aprendas aquí, pruébalo en Code::Blocks 💻',
      'Si un programa falla, lee el error con calma 🔍'
    ];
    return L[Math.floor(Date.now() / 60000) % L.length];
  }

  function pie() {
    return '<div class="pie">Diseñado por<br><a href="https://www.tiktok.com/@jhordycabascango21" target="_blank" rel="noopener">🎵 @jhordycabascango21</a></div>';
  }

  function vistaInicio() {
    const meta = S.perfil.meta, hx = xpHoy();
    let h = '<section class="hero">' + mascHTML() + '<div class="info"><div class="burbuja">' + esc(fraseMasc()) + '</div>' +
      '<div class="meta-bar"><i style="width:' + Math.min(100, Math.round(100 * hx / meta)) + '%"></i></div>' +
      '<div class="meta-txt"><span>🎯 Meta diaria</span><span>' + hx + ' / ' + meta + ' XP</span></div></div></section>';

    if (nLecHechas() >= 3 && (!S.ultimoRespaldo || Date.now() - S.ultimoRespaldo > 7 * 86400000)) {
      h += '<div class="card" style="display:flex;gap:12px;align-items:center"><div style="font-size:34px">💾</div><div style="flex:1"><b>Guarda una copia de tu avance</b><div class="sub" style="margin:0;font-size:14px">Así no lo pierdes si cambias de celular o PC.</div></div><button class="btn chico" data-a="descargar">Respaldo</button></div>';
    }

    const idxActual = NODOS.findIndex((n, i) => desbloq(i) && !completo(n));
    ETAPAS.forEach(et => {
      h += '<div class="unit" id="u-' + et.id + '" style="--c:' + et.color + ';--s:' + et.sombra + '">' +
        '<div class="unit-head"><div><small>Etapa ' + et.num + '</small><h2>' + esc(et.nombre) + '</h2>' +
        (et.etiqueta ? '<span class="tag">' + esc(et.etiqueta) + '</span>' : '') + '</div>' +
        '<button data-a="apuntes-de" data-e="' + et.id + '" aria-label="Apuntes de la etapa">📒</button></div><div class="path">';
      let k = 0;
      NODOS.forEach((n, i) => {
        if (n.etapa !== et) return;
        const off = ZIG[k++ % ZIG.length];
        const bloq = !desbloq(i), hecho = completo(n), act = i === idxActual;
        let icono, est = '';
        if (n.tipo === 'examen') {
          icono = hecho ? '🏆' : (et.final ? '🎓' : '📝');
        } else {
          icono = n.lec.icono || '⭐';
          const st = S.lecciones[n.id];
          if (st && st.hecha) {
            const e = st.estrellas || 1;
            est = '★'.repeat(e) + '<span class="no">' + '★'.repeat(3 - e) + '</span>';
          }
        }
        h += '<div class="nw" style="transform:translateX(' + off + 'px)">' +
          (act ? '<div class="tip">' + (n.tipo === 'examen' ? 'Examen' : (leccionHecha(n.id) ? 'Repasar' : 'Empezar')) + '</div>' : '') +
          '<button class="node ' + (n.tipo === 'examen' ? 'examen ' : '') + (bloq ? 'bloq ' : '') + (hecho && n.tipo === 'examen' ? 'hecho ' : '') + (act ? 'actual' : '') + '" data-a="nodo" data-i="' + i + '" aria-label="' + esc(n.tipo === 'examen' ? 'Examen' : n.lec.titulo) + '"><span>' + icono + '</span></button>' +
          '<div class="estrellas">' + est + '</div></div>';
      });
      h += '</div></div>';
    });
    h += '<div class="fin-curso">🏁 Al final te espera el título de <b>Maestro C++</b></div>' + pie();
    return h;
  }

  function vistaRepaso() {
    actualizarVidas();
    const n = S.errores.filter(id => EJ[id]).length;
    const vidasTxt = !S.ajustes.vidas ? 'Tienes las vidas desactivadas (∞). Puedes activarlas en Perfil.'
      : S.vidas.n >= MAX_VIDAS ? 'Tienes todas tus vidas: ' + '❤️'.repeat(MAX_VIDAS)
        : 'Tienes ' + S.vidas.n + ' de ' + MAX_VIDAS + '. La próxima llega en ' + minProxVida() + ' min.';
    return '<h1 class="titulo-sec">Repaso</h1><p class="sub">Practica lo que más te cuesta. Así se te queda para el examen.</p>' +
      '<div class="card"><h3>🩹 Tus errores</h3><p>Tienes <b>' + n + '</b> preguntas que fallaste. Al terminar el repaso recuperas todas tus vidas ❤️.</p>' +
      '<button class="btn lila" data-a="rep-errores" ' + (n ? '' : 'disabled') + '>Repasar errores</button></div>' +
      '<div class="card"><h3>⚡ Práctica rápida</h3><p>10 preguntas al azar de las lecciones que ya hiciste.</p>' +
      '<button class="btn" data-a="practica" ' + (nLecHechas() ? '' : 'disabled') + '>Practicar</button></div>' +
      '<div class="card"><h3>❤️ Vidas</h3><p>' + vidasTxt + '</p></div>';
  }

  function apunteHTML(l) {
    let h = '<ul>' + (l.resumen || []).map(r => '<li>' + rico(r) + '</li>').join('') + '</ul>';
    const ej = (l.teoria || []).find(t => t.code);
    if (ej) h += '<pre class="cod">' + hl(ej.code) + '</pre>';
    if (l.reto) {
      h += '<p><b>💻 Reto' + (S.retos[l.id] ? ' ✅' : '') + ':</b> ' + rico(l.reto.enunciado) + '</p>' +
        '<details><summary class="link" style="padding:4px 0">👀 Ver solución</summary><pre class="cod" style="margin-top:8px">' + hl(l.reto.solucion) + '</pre></details>';
    }
    return h;
  }

  function vistaApuntes() {
    let h = '<h1 class="titulo-sec">Apuntes</h1><p class="sub">El resumen de cada lección. Ideal para estudiar antes del examen. ✅ = ya la hiciste.</p>';
    ETAPAS.forEach(et => {
      h += '<h2 id="ap-' + et.id + '" style="color:' + et.color + ';margin:24px 0 6px;font-size:19px">Etapa ' + et.num + ': ' + esc(et.nombre) + '</h2>';
      et.lecciones.forEach(l => {
        h += '<details class="ap"><summary><span>' + (l.icono || '') + ' ' + esc(l.titulo) + '</span><span>' + (leccionHecha(l.id) ? '✅' : '▾') + '</span></summary>' +
          '<div class="cuerpo txt-rico">' + apunteHTML(l) + '</div></details>';
      });
    });
    return h;
  }

  function vistaLogros() {
    const n = LOGROS.filter(l => S.logros[l.id]).length;
    return '<h1 class="titulo-sec">Logros</h1><p class="sub">Llevas ' + n + ' de ' + LOGROS.length + '.</p><div class="logros">' +
      LOGROS.map(l => '<div class="logro ' + (S.logros[l.id] ? 'si' : 'no') + '"><span>' + l.i + '</span><b>' + esc(l.t) + '</b><small>' + esc(l.d) + '</small></div>').join('') +
      '</div>';
  }

  function estadoOffline() {
    if (location.protocol === 'file:') return '✅ Estás usando la versión descargada: funciona sin internet.';
    if (navigator.serviceWorker && navigator.serviceWorker.controller) return '✅ Listo: ya puedes usar el curso sin internet en este dispositivo.';
    return '⏳ Preparando el modo sin internet… vuelve a abrir la página en unos segundos.';
  }

  function vistaPerfil() {
    const m = mascota(), nivel = nivelMasc();
    const sw = (k, t, d) => '<div class="fila"><div><div class="t">' + t + '</div><div class="d">' + d + '</div></div><button class="switch ' + (S.ajustes[k] ? 'on' : '') + '" data-a="tg" data-k="' + k + '" aria-label="' + t + '"></button></div>';
    const puedeCompartir = !!(navigator.canShare && window.File);
    return '<section class="hero">' + mascHTML() + '<div class="info"><h2>' + esc(S.perfil.nombre) + '</h2>' +
      '<div class="sub" style="margin:2px 0 0">' + esc(m.nombres[Math.min(nivel, MAXN)]) + ' · Nivel ' + nivel + ' de ' + MAXN + '</div>' +
      '<div class="evo">' + m.formas.map((f, k) => '<span class="' + (k <= nivel ? 'si' : '') + '">' + f + '</span>').join('') + '</div></div></section>' +

      '<div class="grid2">' +
      '<div class="kpi"><span>🔥</span><div><b>' + rachaVisible() + '</b><small>Racha actual</small></div></div>' +
      '<div class="kpi"><span>🏆</span><div><b>' + S.racha.mejor + '</b><small>Mejor racha</small></div></div>' +
      '<div class="kpi"><span>⚡</span><div><b>' + S.xp + '</b><small>XP total</small></div></div>' +
      '<div class="kpi"><span>📚</span><div><b>' + nLecHechas() + '/' + TOTAL_LEC + '</b><small>Lecciones</small></div></div></div>' +

      '<div class="card"><h3>👤 Tu perfil</h3>' +
      '<div style="display:flex;gap:10px;margin:8px 0 14px"><input class="txt" id="pf-nombre" maxlength="24" value="' + esc(S.perfil.nombre) + '"><button class="btn chico" data-a="pf-nombre">Guardar</button></div>' +
      '<div class="t" style="margin-bottom:8px">Mascota</div><div class="mascotas">' +
      Object.keys(MASCOTAS).map(k => '<button class="' + (S.perfil.mascota === k ? 'on' : '') + '" data-a="pf-masc" data-k="' + k + '"><span>' + MASCOTAS[k].formas[Math.max(1, Math.min(nivel, MAXN))] + '</span>' + MASCOTAS[k].nombre + '</button>').join('') + '</div>' +
      '<div class="t" style="margin:16px 0 8px">Meta diaria</div><div class="segment">' +
      METAS.map(x => '<button class="' + (S.perfil.meta === x.xp ? 'on' : '') + '" data-a="pf-meta" data-x="' + x.xp + '">' + x.t + ' · ' + x.xp + ' XP</button>').join('') + '</div></div>' +

      '<div class="card"><h3>⚙️ Ajustes</h3>' +
      sw('oscuro', 'Modo oscuro', 'Más cómodo para estudiar de noche') +
      sw('sonido', 'Sonidos', 'Sonido al acertar o fallar') +
      sw('vidas', 'Vidas', 'Si las apagas, puedes fallar sin límite') +
      sw('estricto', 'Retos obligatorios', 'Para dar el examen de una etapa, primero aprueba sus retos') + '</div>' +
      '<div class="card" style="display:flex;align-items:center;gap:12px"><div style="font-size:34px">🏅</div><div style="flex:1"><b>Logros</b><div class="sub" style="margin:0;font-size:14px">Llevas ' + LOGROS.filter(l => S.logros[l.id]).length + ' de ' + LOGROS.length + '</div></div><button class="btn chico" data-a="tab" data-t="logros">Ver</button></div>' +

      '<div class="card" id="respaldo"><h3>💾 Respaldo de tu avance</h3>' +
      '<p>Tu avance se guarda solo en este dispositivo. Haz un respaldo para pasarlo a otro celular o PC y seguir donde te quedaste.</p>' +
      '<p><b>Último respaldo:</b> ' + (S.ultimoRespaldo ? hace(S.ultimoRespaldo) : 'nunca') + '</p>' +
      '<div class="botones" style="display:flex;flex-direction:column;gap:12px;margin-top:12px">' +
      '<button class="btn" data-a="descargar">⬇️ Descargar archivo de respaldo</button>' +
      '<button class="btn borde" data-a="cargar">📂 Cargar archivo de respaldo</button>' +
      '<button class="btn lila" data-a="codigo">📋 Copiar código de respaldo</button>' +
      '<button class="btn borde" data-a="pegar">📥 Pegar código de respaldo</button>' +
      (puedeCompartir ? '<button class="btn borde" data-a="compartir">📤 Enviar respaldo (WhatsApp, correo…)</button>' : '') +
      '</div></div>' +

      '<div class="card"><h3>📶 Usar sin internet</h3><p>' + estadoOffline() + '</p>' +
      (instalarEvt ? '<button class="btn oro" data-a="instalar">📲 Instalar como app</button>' : '<p style="font-size:14px">En el celular, abre el menú del navegador y elige <b>"Agregar a pantalla de inicio"</b> o <b>"Instalar app"</b>.</p>') + '</div>' +

      '<div class="card"><h3>📖 Sobre el curso</h3><p class="txt-rico">Las Etapas 1, 2 y 3 siguen el sílabo de <b>Fundamentos de Programación</b>. Las Etapas 4 a 7 te llevan a nivel intermedio, avanzado, estructuras de datos y un proyecto final. Los ejemplos usan <code>stdio.h</code> (printf y scanf) como en clase, y desde la Etapa 4 se usa <code>iostream</code> (cin y cout).</p></div>' +

      '<button class="btn mal" data-a="reiniciar" style="margin-top:6px">🗑️ Borrar mi avance</button>' + pie();
  }

  function vistaBienvenida() {
    const bv = ui.bv;
    return '<div class="wrap bienv"><div class="gran-logo">' + MASCOTAS[bv.masc].formas[1] + '</div>' +
      '<h1>¡Bienvenido a CodeAndes!</h1><p class="lema">Aprende C++ desde cero hasta avanzado, unos minutos al día. Funciona sin internet.</p>' +
      '<label for="bv-nombre">¿Cómo te llamas?</label><input class="txt" id="bv-nombre" maxlength="24" placeholder="Tu nombre" value="' + esc(bv.nombre) + '">' +
      '<label>Elige tu mascota (evoluciona contigo 🌱→🔥)</label><div class="mascotas">' +
      Object.keys(MASCOTAS).map(k => '<button class="' + (bv.masc === k ? 'on' : '') + '" data-a="bv-masc" data-k="' + k + '"><span>' + MASCOTAS[k].formas[1] + '</span>' + MASCOTAS[k].nombre + '</button>').join('') + '</div>' +
      '<label>Meta diaria</label><div class="segment">' +
      METAS.map(x => '<button class="' + (bv.meta === x.xp ? 'on' : '') + '" data-a="bv-meta" data-x="' + x.xp + '">' + x.t + ' · ' + x.xp + ' XP</button>').join('') + '</div>' +
      '<div style="margin-top:28px;display:flex;flex-direction:column;gap:14px"><button class="btn" data-a="bv-empezar">¡Empezar!</button>' +
      '<button class="btn borde" data-a="bv-importar">Ya tengo un respaldo</button></div>' + pie() + '</div>';
  }

  /* ---------------- Hojas de nodos ---------------- */
  function abrirNodo(i) {
    const n = NODOS[i], bloq = !desbloq(i), et = n.etapa;
    const estilo = 'style="--c:' + et.color + ';--s:' + et.sombra + '"';
    if (n.tipo === 'leccion') {
      const l = n.lec, hecha = leccionHecha(l.id);
      modal('<small style="color:' + et.color + ';text-transform:uppercase;letter-spacing:.5px">Etapa ' + et.num + ' · Lección ' + l.num + ' de ' + et.lecciones.length + '</small>' +
        '<h3>' + (l.icono || '') + ' ' + esc(l.titulo) + '</h3>' +
        '<p>' + (l.desc ? esc(l.desc) + '<br>' : '') + (l.teoria || []).length + ' tarjetas para aprender · ' + l.ejercicios.length + ' ejercicios · 1 reto de programación' + (S.retos[l.id] ? ' ✅' : '') + '</p>' +
        '<div class="botones">' +
        (bloq ? '<button class="btn" disabled>🔒 Completa la lección anterior</button>'
          : '<button class="btn" ' + estilo + ' data-a="empezar" data-t="leccion" data-r="' + l.id + '">' + (hecha ? 'Repasar · +5 XP' : 'Empezar · +10 XP') + '</button>') +
        (!bloq ? '<button class="btn borde" data-a="abrir-reto" data-r="' + l.id + '">💻 Ir al reto' + (S.retos[l.id] ? ' ✅' : '') + '</button>' : '') +
        '<button class="btn borde" data-a="ver-apunte" data-r="' + l.id + '">📒 Ver apuntes</button></div>');
    } else {
      const ex = S.examenes[et.id];
      const todas = et.lecciones.every(l => leccionHecha(l.id));
      const nPreg = et.final ? 20 : 12;
      let txt = et.final ? 'Examen final: ' + nPreg + ' preguntas de todo el curso.' : nPreg + ' preguntas de toda la Etapa ' + et.num + '.';
      txt += ' Necesitas ' + APRUEBA + '% para aprobar.';
      if (ex && ex.aprobado) txt = '¡Ya lo aprobaste con ' + ex.nota + '%! Puedes repetirlo para practicar.';
      else if (!todas && !bloq) txt += '<br><br>💡 ¿Ya sabes este tema? Si apruebas ahora, <b>saltas todas las lecciones</b> de esta etapa.';
      const rr = retosEtapa(et);
      const porRetos = !bloq && examenBloqueado(et) && !(ex && ex.aprobado);
      if (porRetos) txt = '🔒 Para dar este examen, primero aprueba los <b>retos de programación</b> de esta etapa. Llevas <b>' + rr.h + ' de ' + rr.t + '</b>.<br><br>Puedes hacerlos aquí mismo (celular o PC) o en Code::Blocks. Si prefieres, apaga "Retos obligatorios" en Perfil.';
      modal('<small style="color:' + et.color + ';text-transform:uppercase;letter-spacing:.5px">Etapa ' + et.num + '</small>' +
        '<h3>' + (et.final ? '🎓 Examen final' : '📝 Examen de la etapa') + '</h3><p>' + txt + '</p><div class="botones">' +
        (bloq ? '<button class="btn" disabled>🔒 Bloqueado</button>'
          : porRetos ? '<button class="btn" data-a="ir-practicas" data-e="' + et.id + '">💻 Ir a los retos</button>'
            : '<button class="btn oro" data-a="empezar" data-t="examen" data-r="' + et.id + '">Empezar examen</button>') +
        '</div>');
    }
  }

  /* =========================================================
     LECCIONES Y EXÁMENES
     ========================================================= */
  function ejDeEtapa(et) { return et.lecciones.reduce((a, l) => a.concat(l.ejercicios), []); }

  function iniciar(tipo, ref) {
    actualizarVidas();
    let cola = [], titulo = '', etapa = null, lec = null, teoria = [];
    if (tipo === 'leccion') {
      lec = LEC[ref]; etapa = lec.etapa; cola = lec.ejercicios.slice(); teoria = lec.teoria || []; titulo = lec.titulo;
      if (S.ajustes.vidas && S.vidas.n <= 0) { ui.pendiente = { tipo, ref }; sinVidas(false); return; }
    } else if (tipo === 'examen') {
      etapa = ETAPAS.find(e => e.id === ref);
      const pool = etapa.final ? ETAPAS.reduce((a, e) => a.concat(ejDeEtapa(e)), []) : ejDeEtapa(etapa);
      cola = mezclar(pool).slice(0, etapa.final ? 20 : 12);
      titulo = 'Examen';
    } else if (tipo === 'repaso') {
      cola = mezclar(S.errores.map(id => EJ[id] && EJ[id].ej).filter(Boolean)).slice(0, 10);
      titulo = 'Repaso de errores';
      if (!cola.length) { toast('No tienes errores para repasar 🎉'); return; }
    } else if (tipo === 'practica') {
      let pool = [];
      Object.keys(LEC).forEach(id => { if (leccionHecha(id)) pool = pool.concat(LEC[id].ejercicios); });
      cola = mezclar(pool).slice(0, 10);
      titulo = 'Práctica rápida';
      if (!cola.length) { toast('Completa al menos una lección primero'); return; }
    }
    ses = {
      tipo, ref, lec, etapa, titulo, cola, i: 0, total: cola.length, hechos: 0, correctas: 0,
      fallados: new Set(), xp: 0, inicio: Date.now(), teoria, ti: teoria.length ? 0 : -1,
      estado: 'responder', resp: null, vista: null, ok: null
    };
    prepararEj();
    pintarLec();
  }

  function actual() { return ses && ses.cola[ses.i]; }

  function prepararEj() {
    const e = actual();
    if (!e) return;
    ses.estado = 'responder';
    ses.ok = null;
    if (e.tipo === 'mc') {
      const idx = e.opciones.map((_, k) => k);
      ses.vista = { orden: e.fijo ? idx : mezclar(idx) };
      ses.resp = null;
    } else if (e.tipo === 'fill') {
      const n = (e.code.match(/___/g) || []).length;
      ses.vista = { chips: mezclar(e.opciones.map((_, k) => k)) };
      ses.resp = Array(n).fill(null);
    } else if (e.tipo === 'order') {
      let o = mezclar(e.lineas.map((_, k) => k));
      if (e.lineas.length > 1 && o.every((v, k) => e.lineas[v] === e.lineas[k])) o = o.reverse();
      ses.vista = { banco: o };
      ses.resp = [];
    } else {
      ses.resp = '';
    }
  }

  function listo() {
    const e = actual();
    if (!e) return false;
    if (e.tipo === 'mc') return ses.resp != null;
    if (e.tipo === 'fill') return ses.resp.every(v => v != null);
    if (e.tipo === 'order') return ses.resp.length === e.lineas.length;
    return norm(ses.resp) !== '';
  }

  function htmlEj() {
    const e = actual(), rev = ses.estado === 'revisado';
    const etq = { mc: '🎯 Elige la respuesta', fill: '🧩 Completa el código', order: '🔀 Ordena el código', write: '⌨️ Escribe la respuesta' }[e.tipo];
    let h = '<div class="etq">' + etq + (ses.fallados.has(e.id) && ses.tipo !== 'examen' && !rev ? ' · otra vez' : '') + '</div>' +
      '<div class="preg txt-rico">' + rico(e.q) + '</div>';
    if (e.tipo === 'mc') {
      if (e.code) h += '<pre class="cod">' + hl(e.code) + '</pre>';
      h += '<div class="ops">' + ses.vista.orden.map((k, n) => {
        const o = e.opciones[k], cod = esCodigo(o);
        return '<button class="op ' + (ses.resp === k ? 'sel ' : '') + (cod ? 'mono-op' : '') + '" data-a="op" data-k="' + k + '" ' + (rev ? 'disabled' : '') + '>' +
          '<span class="num">' + (n + 1) + '</span><span>' + (cod ? esc(o) : rico(o)) + '</span></button>';
      }).join('') + '</div>';
    } else if (e.tipo === 'fill') {
      const partes = e.code.split('___');
      let c = hl(partes[0]);
      for (let k = 1; k < partes.length; k++) {
        const v = ses.resp[k - 1];
        c += '<span class="slot ' + (v != null ? 'lleno' : '') + '" data-a="slot" data-k="' + (k - 1) + '">' + (v != null ? esc(e.opciones[v]) : '&nbsp;') + '</span>' + hl(partes[k]);
      }
      h += '<pre class="cod">' + c + '</pre><div class="chips">' + ses.vista.chips.map(k =>
        '<button class="chip ' + (ses.resp.includes(k) ? 'usado' : '') + '" data-a="chip" data-k="' + k + '" ' + (rev ? 'disabled' : '') + '>' + esc(e.opciones[k]) + '</button>').join('') + '</div>';
    } else if (e.tipo === 'order') {
      h += '<div class="orden-zona">' + ses.resp.map((k, p) => '<button class="linea" data-a="lin-quitar" data-p="' + p + '" ' + (rev ? 'disabled' : '') + '>' + hl(e.lineas[k]) + '</button>').join('') + '</div>' +
        '<div class="banco">' + ses.vista.banco.map(k => '<button class="linea ' + (ses.resp.includes(k) ? 'usado' : '') + '" data-a="lin-poner" data-k="' + k + '" ' + (rev ? 'disabled' : '') + '>' + hl(e.lineas[k]) + '</button>').join('') + '</div>';
    } else {
      if (e.code) h += '<pre class="cod">' + hl(e.code) + '</pre>';
      h += '<input class="txt resp" id="resp" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="Escribe aquí tu respuesta" value="' + esc(ses.resp) + '" ' + (rev ? 'disabled' : '') + '>';
    }
    return h;
  }

  function correctaHTML(e) {
    if (e.tipo === 'mc') return '<b>' + rico(e.opciones[e.correcta]) + '</b>';
    if (e.tipo === 'fill') return '<pre>' + esc(e.respuestas.join('   ·   ')) + '</pre>';
    if (e.tipo === 'order') return '<pre>' + esc(e.lineas.join('\n')) + '</pre>';
    return '<pre>' + esc(e.respuestas[0]) + '</pre>';
  }

  function htmlPie() {
    if (ses.estado === 'responder') return '<button class="btn ok" id="btn-main" data-a="comprobar" ' + (listo() ? '' : 'disabled') + '>Comprobar</button>';
    const e = actual();
    const frases = ['¡Excelente!', '¡Muy bien!', '¡Correcto!', '¡Así se hace!', '¡Bien hecho!', '¡Genial!'];
    const t = ses.ok ? frases[Math.floor(Math.random() * frases.length)] : 'La respuesta correcta es:';
    let x = ses.ok ? '' : correctaHTML(e);
    if (e.explica) x += '<div style="margin-top:6px">' + rico(e.explica) + '</div>';
    return '<div><div class="fb-t">' + (ses.ok ? '✅' : '❌') + ' ' + t + '</div><div class="fb-x txt-rico">' + x + '</div></div>' +
      '<button class="btn ' + (ses.ok ? 'ok' : 'mal') + '" id="btn-main" data-a="continuar">Continuar</button>';
  }

  function pintarLec() {
    const viejo = $('.lec-body');
    const scroll = viejo ? viejo.scrollTop : 0;
    const enTeo = ses.ti >= 0;
    const pct = ses.total ? Math.round(100 * ses.hechos / ses.total) : 0;
    const vidas = ses.tipo === 'examen' ? '<div class="stat xp">🏆</div>'
      : (ses.tipo === 'leccion' && S.ajustes.vidas) ? '<div class="stat vida">❤️ ' + S.vidas.n + '</div>'
        : '<div class="stat vida">❤️ ∞</div>';
    let cuerpo, pieH;
    if (enTeo) {
      const t = ses.teoria[ses.ti];
      cuerpo = '<div class="teo txt-rico"><div class="etq">📘 Aprende · ' + (ses.ti + 1) + ' de ' + ses.teoria.length + '</div>' +
        '<h2>' + esc(t.h) + '</h2>' + (t.p ? '<p>' + rico(t.p) + '</p>' : '') +
        (t.code ? '<pre class="cod">' + hl(t.code) + '</pre>' : '') + (t.p2 ? '<p>' + rico(t.p2) + '</p>' : '') + '</div>';
      pieH = '<button class="btn" id="btn-main" data-a="teo-sig">' + (ses.ti === ses.teoria.length - 1 ? '¡A practicar!' : 'Continuar') + '</button>' +
        (ses.ti > 0 ? '<button class="link" data-a="teo-ant">← Anterior</button>' : '');
    } else {
      cuerpo = htmlEj();
      pieH = htmlPie();
    }
    capa.innerHTML = '<div class="lec"><div class="lec-top"><button class="x" data-a="salir-lec" aria-label="Salir">✕</button>' +
      '<div class="prog ' + (ses.tipo === 'examen' ? 'examen' : '') + '"><i style="width:' + pct + '%"></i></div>' + vidas + '</div>' +
      '<div class="lec-body"><div class="lec-in">' + cuerpo + '</div></div>' +
      '<div class="lec-foot ' + (!enTeo && ses.estado === 'revisado' ? (ses.ok ? 'ok' : 'mal') : '') + '"><div class="in">' + pieH + '</div></div></div>';
    document.body.style.overflow = 'hidden';
    const nb = $('.lec-body');
    if (nb && !enTeo && ses.estado === 'responder') nb.scrollTop = scroll;
  }

  function comprobar() {
    const e = actual();
    if (!e || !listo()) return;
    let ok;
    if (e.tipo === 'mc') ok = ses.resp === e.correcta;
    else if (e.tipo === 'fill') ok = ses.resp.every((v, k) => norm(e.opciones[v]) === norm(e.respuestas[k]));
    else if (e.tipo === 'order') ok = ses.resp.map(k => e.lineas[k]).join('\n') === e.lineas.join('\n');
    else ok = e.respuestas.some(r => norm(r) === norm(ses.resp));
    ses.ok = ok;
    ses.estado = 'revisado';
    if (ok) {
      sonido('ok');
      ses.correctas++;
      ses.hechos++;
      if (!ses.fallados.has(e.id) || ses.tipo === 'repaso') ses.xp += 2;
      if (ses.tipo === 'repaso') { quitarError(e.id); S.stats.corregidos++; }
      S.stats.ok++;
    } else {
      sonido('mal');
      ses.fallados.add(e.id);
      agregarError(e.id);
      if (ses.tipo === 'examen') ses.hechos++;
      else ses.cola.push(e);
      if (ses.tipo === 'leccion' && S.ajustes.vidas) perderVida();
    }
    guardar();
    pintarLec();
    if (!ok) { const el = $('.lec-in'); if (el) el.classList.add('sacude'); }
  }

  function continuar() {
    if (ses.tipo === 'leccion' && S.ajustes.vidas && S.vidas.n <= 0 && !ses.ok) { sinVidas(true); return; }
    ses.i++;
    if (ses.i >= ses.cola.length) { terminar(); return; }
    prepararEj();
    pintarLec();
    const b = $('.lec-body'); if (b) b.scrollTop = 0;
  }

  function sinVidas(enLec) {
    const n = S.errores.filter(id => EJ[id]).length;
    modal('<div style="text-align:center;font-size:58px">💔</div><h3 style="text-align:center">Te quedaste sin vidas</h3>' +
      '<p style="text-align:center">Recuperas 1 vida cada ' + REGEN_MIN + ' minutos (la próxima en ' + minProxVida() + ' min). Si repasas tus errores, las recuperas todas.</p>' +
      '<div class="botones">' + (n ? '<button class="btn lila" data-a="sv-repaso">Repasar errores (' + n + ')</button>' : '') +
      '<button class="btn borde" data-a="sv-desactivar">Desactivar vidas y seguir</button>' +
      '<button class="link" data-a="sv-salir">' + (enLec ? 'Salir de la lección' : 'Cerrar') + '</button></div>', { centro: true, cerrable: false });
  }

  function cerrarLec() {
    capa.innerHTML = '';
    document.body.style.overflow = '';
    ses = null;
    render();
  }

  function terminar() {
    const t = ses;
    const precision = t.total ? Math.round(100 * (t.total - t.fallados.size) / t.total) : 0;
    const seg = Math.round((Date.now() - t.inicio) / 1000);
    const tiempo = Math.floor(seg / 60) + ':' + String(seg % 60).padStart(2, '0');
    const nivelAntes = nivelMasc();
    let titulo = '¡Lección completada!', sub = '', cajas = [], extra = '', botones = '';
    let celebra = true;

    if (t.tipo === 'leccion') {
      const prev = S.lecciones[t.lec.id];
      const ya = !!(prev && prev.hecha);
      const est = precision === 100 ? 3 : precision >= 70 ? 2 : 1;
      t.xp += ya ? 5 : 10;
      if (precision === 100) { t.xp += 5; S.stats.perfectas++; }
      S.lecciones[t.lec.id] = { hecha: true, estrellas: Math.max(est, prev ? prev.estrellas || 0 : 0), veces: (prev ? prev.veces || 0 : 0) + 1, fecha: fechaLocal() };
      sub = precision === 100 ? '¡Sin un solo error! 💎' : 'Cada lección te acerca a ser Maestro C++.';
      cajas = [['XP ganado', '⚡ ' + t.xp, '#FFC800'], ['Precisión', '🎯 ' + precision + '%', '#58CC02'], ['Tiempo', '⏱️ ' + tiempo, '#1CB0F6']];
      if (t.lec.reto) {
        extra = '<div class="reto"><h3>💻 Reto de programación' + (S.retos[t.lec.id] ? ' ✅' : '') + '</h3><p class="txt-rico">' + rico(t.lec.reto.enunciado) + '</p>' +
          (t.lec.reto.code ? '<pre class="cod">' + hl(t.lec.reto.code) + '</pre>' : '') +
          '<p class="sub" style="font-size:14px">Hazlo aquí mismo o en Code::Blocks, y compruébalo para ganar +15 XP.</p>' +
          '<button class="btn lila" data-a="abrir-reto" data-r="' + t.lec.id + '">' + (S.retos[t.lec.id] ? '💻 Ver el reto' : '💻 Hacer el reto') + '</button></div>';
      }
      botones = '<button class="btn" id="btn-main" data-a="cerrar-lec">Continuar</button>';
    } else if (t.tipo === 'examen') {
      const et = t.etapa;
      const nota = t.total ? Math.round(100 * t.correctas / t.total) : 0;
      const aprobado = nota >= APRUEBA;
      const prev = S.examenes[et.id];
      S.examenes[et.id] = { aprobado: aprobado || !!(prev && prev.aprobado), nota: Math.max(nota, prev ? prev.nota || 0 : 0) };
      S.stats.examenes++;
      cajas = [['Nota', '📝 ' + nota + '%', aprobado ? '#58CC02' : '#FF4B4B'], ['Correctas', '✅ ' + t.correctas + '/' + t.total, '#1CB0F6']];
      if (aprobado) {
        t.xp += 30;
        et.lecciones.forEach(l => { if (!leccionHecha(l.id)) S.lecciones[l.id] = { hecha: true, estrellas: 1, veces: 0, fecha: fechaLocal() }; });
        titulo = et.final ? '🎓 ¡Eres Maestro C++!' : '¡Examen aprobado!';
        sub = et.final ? 'Terminaste todo el curso. ¡Felicitaciones!' : '¡Se desbloqueó la Etapa ' + (et.num + 1) + '!';
        botones = '<button class="btn" id="btn-main" data-a="cerrar-lec">Continuar</button>';
      } else {
        celebra = false;
        titulo = 'Casi lo logras';
        sub = 'Necesitas ' + APRUEBA + '% para aprobar. Repasa tus errores y vuelve a intentarlo. ¡Tú puedes!';
        botones = '<button class="btn oro" id="btn-main" data-a="empezar" data-t="examen" data-r="' + et.id + '">Intentar de nuevo</button><button class="btn borde" data-a="cerrar-lec">Volver</button>';
      }
      cajas.unshift(['XP ganado', '⚡ ' + t.xp, '#FFC800']);
    } else {
      if (t.tipo === 'repaso') {
        S.vidas.n = MAX_VIDAS; S.vidas.ts = Date.now();
        titulo = '¡Repaso terminado!';
        sub = 'Recuperaste todas tus vidas ❤️';
      } else {
        titulo = '¡Práctica terminada!';
        sub = 'La práctica hace al maestro 💪';
      }
      t.xp += 5;
      cajas = [['XP ganado', '⚡ ' + t.xp, '#FFC800'], ['Precisión', '🎯 ' + precision + '%', '#58CC02']];
      botones = '<button class="btn" id="btn-main" data-a="cerrar-lec">Continuar</button>';
    }

    sumarXP(t.xp);
    guardar();
    const nivelNuevo = nivelMasc();
    if (nivelNuevo > nivelAntes) {
      const m = mascota();
      extra = '<div class="card" style="text-align:center;border-color:var(--oro)"><div style="font-size:15px;font-weight:900;color:var(--oroS)">✨ ¡TU MASCOTA EVOLUCIONÓ! ✨</div>' +
        '<div style="font-size:46px;margin:8px 0">' + m.formas[nivelAntes] + ' ➜ ' + m.formas[Math.min(nivelNuevo, MAXN)] + '</div>' +
        '<b>Ahora es: ' + esc(m.nombres[Math.min(nivelNuevo, MAXN)]) + '</b></div>' + extra;
    }
    revisarLogros();

    capa.innerHTML = '<div class="lec"><div class="lec-body"><div class="lec-in res">' + mascHTML() +
      '<h2 style="' + (celebra ? '' : 'color:var(--mal)') + '">' + titulo + '</h2><p class="sub">' + sub + '</p>' +
      '<div class="cajas">' + cajas.map(c => '<div class="caja" style="--c:' + c[2] + '"><small>' + c[0] + '</small><b>' + c[1] + '</b></div>').join('') + '</div>' +
      extra + '</div></div><div class="lec-foot"><div class="in">' + botones + '</div></div></div>';
    if (celebra) { sonido('fin'); confeti(); }
    ui.scrollActual = true;
  }

  /* =========================================================
     PRÁCTICAS · RETOS Y LABORATORIO
     ========================================================= */
  const PRUEBAS = window.PRUEBAS || {};
  let retoUI = null;
  const TECLAS = [['⇥', '    '], ['{', '{'], ['}', '}'], ['(', '('], [')', ')'], [';', ';'], ['"', '"'], ["'", "'"], ['[', '['], [']', ']'],
    ['<', '<'], ['>', '>'], ['=', '='], ['+', '+'], ['-', '-'], ['*', '*'], ['/', '/'], ['%', '%'], ['&', '&'], ['|', '|'], ['!', '!'],
    [',', ','], ['#', '#'], ['\\n', '\\n'], ['%d', '%d'], ['%.2f', '%.2f'],
    ['printf', 'printf("¦");'], ['scanf', 'scanf("%d", &¦);'], ['if', 'if(¦){\n    \n}'], ['for', 'for(i = 0; i < ¦; i++){\n    \n}'],
    ['cout', 'cout << ¦ << endl;'], ['cin', 'cin >> ¦;']];

  function textoPlano(s, n) {
    s = String(s || '').replace(/\*\*/g, '').replace(/`/g, '');
    return s.length > n ? s.slice(0, n - 1) + '…' : s;
  }

  function vistaPracticas() {
    const hechos = nRetos();
    let h = '<h1 class="titulo-sec">Prácticas</h1><p class="sub">Programa de verdad: hazlo aquí mismo (celular o PC) o en Code::Blocks, y comprueba tu reto para ganar XP.</p>' +
      '<div class="card" style="display:flex;gap:12px;align-items:center"><div style="font-size:38px">🧪</div><div style="flex:1"><b>Laboratorio libre</b><div class="sub" style="margin:0;font-size:14px">Escribe y ejecuta cualquier programa en C/C++, aunque no tengas internet.</div></div><button class="btn chico" data-a="abrir-lab">Abrir</button></div>' +
      '<div class="card"><div class="meta-txt" style="margin:0 0 6px"><span>💻 Retos aprobados</span><span>' + hechos + ' / ' + TOTAL_LEC + '</span></div>' +
      '<div class="meta-bar"><i style="width:' + Math.round(100 * hechos / TOTAL_LEC) + '%;background:var(--lila)"></i></div>' +
      (S.ajustes.estricto ? '<p style="font-size:13px;margin:10px 0 0">🔒 <b>Retos obligatorios:</b> para dar el examen de una etapa, primero aprueba sus retos. Puedes cambiarlo en Perfil.</p>' : '') + '</div>';
    ETAPAS.forEach(et => {
      const r = retosEtapa(et);
      h += '<h2 id="pr-' + et.id + '" class="pr-h" style="color:' + et.color + '">Etapa ' + et.num + ': ' + esc(et.nombre) + ' <small>' + r.h + '/' + r.t + '</small></h2>';
      et.lecciones.forEach(l => {
        const bloq = !desbloq(NODOS.findIndex(n => n.id === l.id));
        const ok = !!S.retos[l.id];
        const pr = PRUEBAS[l.id];
        const como = pr === null ? '✋ Lo marcas tú' : pr && pr.dfd ? '🗺️ En DFD' : '🤖 Se revisa solo';
        h += '<button class="reto-fila ' + (bloq ? 'bloq' : '') + '" data-a="' + (bloq ? 'reto-bloq' : 'abrir-reto') + '" data-r="' + l.id + '">' +
          '<span class="rf-i">' + (ok ? '✅' : bloq ? '🔒' : (l.icono || '💻')) + '</span>' +
          '<span class="rf-t"><b>' + esc(l.titulo) + '</b><small>' + esc(textoPlano(l.reto.enunciado, 90)) + '</small><em>' + como + '</em></span></button>';
      });
    });
    return h;
  }

  function plantilla(id) {
    const n = id ? LEC[id].etapa.num : 1;
    if (n >= 4) return '#include<iostream>\nusing namespace std;\n\nint main(){\n    \n    return 0;\n}\n';
    return '#include<stdio.h>\n\nint main(){\n    \n    return 0;\n}\n';
  }

  function abrirReto(id) {
    const pr = id ? PRUEBAS[id] : undefined;
    retoUI = { id, modo: pr && pr.dfd ? 'manual' : 'app', resultado: null, consola: null };
    pintarReto();
  }
  function cerrarReto() {
    guardarEditor();
    retoUI = null;
    capa.innerHTML = '';
    document.body.style.overflow = '';
    render();
  }

  function editorHTML(libre, pr) {
    const key = retoUI.id || 'libre';
    const code = S.codigos[key] != null ? S.codigos[key] : plantilla(retoUI.id);
    const entrada = S.codigos[key + '#in'] != null ? S.codigos[key + '#in'] : (pr && pr.casos && pr.casos[0] ? pr.casos[0].entrada : '');
    const puedeComprobar = !libre && pr && !pr.dfd;
    let h = '<div class="teclas" role="toolbar" aria-label="Símbolos">' + TECLAS.map(t => '<button class="tecla" data-a="tecla" data-v="' + esc(t[1]) + '">' + esc(t[0]) + '</button>').join('') + '</div>' +
      '<textarea id="codigo" class="code-area" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" wrap="off" aria-label="Tu código">' + esc(code) + '</textarea>' +
      '<div class="mini-btns"><button class="link" data-a="plantilla">📄 Plantilla</button><button class="link" data-a="limpiar-codigo">🗑️ Borrar todo</button></div>' +
      '<label class="lbl" for="entrada">⌨️ Datos de entrada <small>Lo que escribirías en la consola cuando el programa te pida datos (separados por espacios o Enter).</small></label>' +
      '<textarea id="entrada" class="txt entrada" rows="2" spellcheck="false" autocapitalize="off" placeholder="Ejemplo: 135">' + esc(entrada) + '</textarea>' +
      '<div class="acciones-ed"><button class="btn ok" data-a="ejecutar">▶ Ejecutar</button>' +
      (puedeComprobar ? '<button class="btn oro" data-a="comprobar-reto">✅ Comprobar reto</button>' : '') + '</div>' +
      '<div id="resultado-reto"></div>' +
      '<div class="consola-tit">🖥️ Consola</div><pre id="consola" class="consola">' + (retoUI.consola || '<span class="c-muted">Aquí aparece lo que muestra tu programa.</span>') + '</pre>';
    if (puedeComprobar && pr.casos) h += '<p class="nota">🤖 Al comprobar, tu programa se prueba con datos de ejemplo (' + pr.casos.length + (pr.casos.length > 1 ? ' pruebas' : ' prueba') + '). Respeta el orden en que el reto pide los datos.</p>';
    if (!libre && pr === null) h += '<div class="card"><p style="margin:0 0 10px">Este reto no se puede revisar solo. Cuando funcione (aquí o en Code::Blocks), márcalo:</p><button class="btn lila" data-a="ya-lo-hice">✅ Ya lo hice y funciona</button></div>';
    return h;
  }

  function manualHTML(pr) {
    if (pr === null || (pr && (pr.sinError || pr.minLineas))) {
      return '<div class="card"><h3>🖥️ En Code::Blocks</h3><p>1. Escribe el programa en Code::Blocks (o en <b>Cxxdroid</b> si estás en un celular Android).<br>2. Ejecútalo con <b>F9</b> y revisa que funcione.<br>3. Cuando esté listo, márcalo aquí:</p>' +
        '<button class="btn lila" data-a="ya-lo-hice">✅ Ya lo hice y funciona</button><div id="resultado-reto"></div></div>';
    }
    const caso = pr.casos[0];
    const datos = caso.entrada ? 'escribe estos datos cuando te los pida: <code>' + esc(caso.entrada) + '</code>' : 'este programa no necesita datos, solo ejecútalo';
    const donde = pr.dfd ? 'Ejecuta tu diagrama en el programa <b>DFD</b> (botón ▶)' : 'Ejecuta tu programa en <b>Code::Blocks</b> con F9 (o en <b>Cxxdroid</b> en el celular)';
    return '<div class="card"><h3>' + (pr.dfd ? '🗺️ En DFD' : '🖥️ En Code::Blocks') + '</h3><p class="txt-rico">1. ' + donde + '.<br>2. Para la prueba, ' + datos + '.<br>3. Copia o escribe aquí lo que te mostró la pantalla:</p>' +
      '<textarea id="salida-manual" class="txt" rows="4" placeholder="Pega aquí lo que salió en la consola"></textarea>' +
      '<div style="margin-top:12px"><button class="btn oro" data-a="comprobar-manual">✅ Comprobar reto</button></div><div id="resultado-reto"></div></div>';
  }

  function pintarReto() {
    const id = retoUI.id, libre = !id;
    const l = libre ? null : LEC[id];
    const pr = libre ? undefined : PRUEBAS[id];
    const hecho = !libre && S.retos[id];
    let h = '<div class="lec reto-pant"><div class="lec-top"><button class="x" data-a="cerrar-reto" aria-label="Cerrar">✕</button>' +
      '<div class="reto-tit">' + (libre ? '🧪 Laboratorio libre' : '💻 Reto · ' + esc(l.titulo)) + '</div>' + (hecho ? '<span class="estado-ok">✅ Aprobado</span>' : '') + '</div>' +
      '<div class="lec-body"><div class="lec-in">';
    if (!libre) {
      h += '<div class="card" style="margin-top:4px"><div class="etq" style="margin-top:0">Etapa ' + l.etapa.num + ' · Lección ' + l.num + '</div><p class="txt-rico" style="color:var(--txt);margin:0">' + rico(l.reto.enunciado) + '</p>' +
        (l.reto.code ? '<pre class="cod" style="margin:12px 0 0">' + hl(l.reto.code) + '</pre>' : '') + '</div>';
      const modos = [];
      if (!(pr && pr.dfd)) modos.push(['app', '📱 Programar aquí']);
      modos.push(['manual', pr && pr.dfd ? '🗺️ Lo hice en DFD' : '🖥️ Lo hice en Code::Blocks']);
      if (modos.length > 1) h += '<div class="segment modos">' + modos.map(m => '<button class="' + (retoUI.modo === m[0] ? 'on' : '') + '" data-a="modo-reto" data-m="' + m[0] + '">' + m[1] + '</button>').join('') + '</div>';
    } else {
      h += '<p class="sub" style="margin-top:4px">Escribe cualquier programa y ejecútalo, incluso sin internet. Funciona con lo de las Etapas 1 a 3 (printf, scanf, if, bucles, arreglos, funciones…) y con cin, cout y string. Las clases, punteros y vector se prueban en Code::Blocks.</p>';
    }
    h += retoUI.modo === 'app' ? editorHTML(libre, pr) : manualHTML(pr);
    if (!libre) h += '<details class="sol"><summary class="link">👀 Ver solución</summary><pre class="cod" style="margin-top:8px">' + hl(l.reto.solucion) + '</pre></details>';
    h += '</div></div></div>';
    capa.innerHTML = h;
    document.body.style.overflow = 'hidden';
    if (retoUI.resultado) mostrarResultado(retoUI.resultado);
  }

  function guardarEditor() {
    if (!retoUI) return;
    const key = retoUI.id || 'libre';
    const c = $('#codigo'), e = $('#entrada');
    if (c) S.codigos[key] = c.value;
    if (e) S.codigos[key + '#in'] = e.value;
    guardar();
  }
  let tGuardar = null;
  function guardarEditorDiferido() { clearTimeout(tGuardar); tGuardar = setTimeout(guardarEditor, 600); }

  function insertarTecla(v) {
    const c = $('#codigo');
    if (!c) return;
    const ini = c.selectionStart, fin = c.selectionEnd;
    const antes = c.value.slice(0, ini);
    const sangria = (antes.slice(antes.lastIndexOf('\n') + 1).match(/^\s*/) || [''])[0];
    let txt = v.replace(/\n/g, '\n' + sangria);
    let cur = txt.indexOf('¦');
    txt = txt.replace('¦', '');
    if (cur < 0) cur = txt.length;
    c.setRangeText(txt, ini, fin, 'end');
    c.selectionStart = c.selectionEnd = ini + cur;
    c.focus();
    guardarEditorDiferido();
  }
  function teclaEditor(ev) {
    const c = ev.target;
    if (ev.key === 'Tab') { ev.preventDefault(); insertarTecla('    '); return; }
    if (ev.key === 'Enter' && !ev.shiftKey && !ev.ctrlKey) {
      ev.preventDefault();
      const ini = c.selectionStart;
      const antes = c.value.slice(0, ini);
      const linea = antes.slice(antes.lastIndexOf('\n') + 1);
      let sangria = (linea.match(/^\s*/) || [''])[0];
      if (/\{\s*$/.test(linea)) sangria += '    ';
      c.setRangeText('\n' + sangria, ini, c.selectionEnd, 'end');
      guardarEditorDiferido();
      return;
    }
    if (ev.key === '}' && c.selectionStart === c.selectionEnd) {
      const ini = c.selectionStart;
      const antes = c.value.slice(0, ini);
      const linea = antes.slice(antes.lastIndexOf('\n') + 1);
      if (/^ {4,}$/.test(linea)) { ev.preventDefault(); c.setRangeText('}', ini - 4, ini, 'end'); guardarEditorDiferido(); }
    }
    if ((ev.ctrlKey || ev.metaKey) && ev.key === 'Enter') { ev.preventDefault(); ejecutarEditor(); }
  }

  function correr(code, entrada) {
    if (!window.MiniC) return { ok: false, error: 'No se encontró el intérprete (js/minic.js).', trozos: [], salida: '' };
    return window.MiniC.ejecutar(code, entrada);
  }
  function consolaHTML(r) {
    let h = r.trozos.map(t => t.t === 'in' ? '<span class="c-in">' + esc(t.s) + '</span>' : esc(t.s)).join('');
    const salto = h && !/\n$/.test(r.trozos.length ? r.trozos[r.trozos.length - 1].s : '') ? '\n' : '';
    if (!r.ok) {
      const noSop = r.error === window.MiniC.NO_SOPORTA;
      h += '<span class="' + (noSop ? 'c-aviso' : 'c-err') + '">' + salto + (noSop ? '⚠️ ' : '❌ Error' + (r.linea ? ' en la línea ' + r.linea : '') + ': ') + esc(r.error) + '</span>';
    } else {
      h += '<span class="c-muted">' + salto + '— Programa terminado —</span>';
    }
    return h;
  }
  function ponerConsola(r) {
    const html = consolaHTML(r);
    retoUI.consola = html;
    const el = $('#consola');
    if (el) el.innerHTML = html;
  }
  function ejecutarEditor() {
    if (!retoUI) return;
    guardarEditor();
    const r = correr($('#codigo').value, $('#entrada').value);
    ponerConsola(r);
    retoUI.resultado = null;
    const res = $('#resultado-reto');
    if (res) res.innerHTML = '';
    S.stats.ejecuciones++;
    guardar();
    revisarLogros();
    const el = $('#consola');
    if (el && el.scrollIntoView) el.scrollIntoView({ block: 'nearest' });
  }

  function resultadoReto(ok, msg, sugerirManual) {
    retoUI.resultado = { ok, msg, sugerirManual };
    mostrarResultado(retoUI.resultado);
    if (!ok) sonido('mal');
  }
  function mostrarResultado(res) {
    const el = $('#resultado-reto');
    if (!el) return;
    el.innerHTML = '<div class="res-reto ' + (res.ok ? 'ok' : 'mal') + '">' + (res.ok ? '✅ ' : '❌ ') + esc(res.msg) +
      (res.sugerirManual ? '<br><button class="btn chico borde" style="margin-top:10px" data-a="modo-reto" data-m="manual">🖥️ Lo hice en Code::Blocks</button>' : '') + '</div>';
    if (el.scrollIntoView) el.scrollIntoView({ block: 'nearest' });
  }

  function comprobarRetoApp() {
    if (!retoUI || !retoUI.id) return;
    guardarEditor();
    const pr = PRUEBAS[retoUI.id];
    const code = $('#codigo').value;
    if (pr.sinError || pr.minLineas) {
      const r = correr(code, $('#entrada').value);
      ponerConsola(r);
      if (!r.ok) return resultadoReto(false, r.error === window.MiniC.NO_SOPORTA ? 'Este programa usa partes que no corren aquí. Pruébalo en Code::Blocks.' : 'Tu programa tiene un error. Míralo en la consola, corrígelo y vuelve a comprobar.', r.error === window.MiniC.NO_SOPORTA);
      if (pr.minLineas && r.salida.split('\n').filter(x => x.trim()).length < pr.minLineas) return resultadoReto(false, 'Tu programa debe mostrar al menos ' + pr.minLineas + ' líneas.');
      return aprobarReto('app');
    }
    for (let k = 0; k < pr.casos.length; k++) {
      const caso = pr.casos[k];
      const r = correr(code, caso.entrada);
      ponerConsola(r);
      const etq = 'Prueba ' + (k + 1) + ' de ' + pr.casos.length + (caso.entrada ? ' (datos: ' + caso.entrada + ')' : '');
      if (!r.ok) {
        if (r.error === window.MiniC.NO_SOPORTA) return resultadoReto(false, 'Este reto usa partes de C++ que todavía no corren aquí (clases, punteros, vector…). Hazlo en Code::Blocks o Cxxdroid y compruébalo con "Lo hice en Code::Blocks".', true);
        return resultadoReto(false, etq + ': tu programa tuvo un error. Míralo en la consola.');
      }
      const v = window.MiniC.verificar(r.salida, caso);
      if (!v.ok) return resultadoReto(false, etq + ': el resultado no es el esperado. ' + (v.sobra ? 'Tu programa mostró algo que no debía en este caso.' : 'Revisa tus cálculos y lo que muestras en pantalla.'));
    }
    aprobarReto('app');
  }
  function comprobarRetoManual() {
    if (!retoUI || !retoUI.id) return;
    const pr = PRUEBAS[retoUI.id];
    const txt = ($('#salida-manual').value || '').trim();
    if (!txt) { toast('Primero pega lo que mostró tu programa'); return; }
    const v = window.MiniC.verificar(txt, pr.casos[0]);
    if (v.ok) aprobarReto('manual');
    else resultadoReto(false, 'Eso no coincide con lo esperado. Revisa que usaste los datos de la prueba y que tu programa calcule bien.');
  }
  function aprobarReto(modo) {
    if (!retoUI || !retoUI.id) return;
    const id = retoUI.id;
    guardarEditor();
    const nuevo = !S.retos[id];
    S.retos[id] = { hecho: true, modo, fecha: fechaLocal() };
    if (nuevo) sumarXP(15);
    guardar();
    revisarLogros();
    sonido('fin');
    confeti();
    retoUI.resultado = { ok: true, msg: nuevo ? '¡Reto aprobado! +15 XP' : '¡Reto aprobado otra vez!' };
    pintarReto();
    const et = LEC[id].etapa, r = retosEtapa(et);
    if (nuevo && r.h === r.t) setTimeout(() => toast('🎉 ¡Completaste los retos de la Etapa ' + et.num + '!'), 1200);
  }

  /* =========================================================
     RESPALDO
     ========================================================= */
  function datosRespaldo() {
    return JSON.stringify({ app: 'CodeAndes', version: VERSION, fecha: new Date().toISOString(), estado: S });
  }
  function aCodigo(str) { return 'CA1-' + btoa(unescape(encodeURIComponent(str))); }
  function deCodigo(c) {
    c = String(c).replace(/\s+/g, '');
    if (c.indexOf('CA1-') === 0) c = c.slice(4);
    return decodeURIComponent(escape(atob(c)));
  }
  function marcarRespaldo() { S.ultimoRespaldo = Date.now(); guardar(); revisarLogros(); }
  function nombreArchivo() { return 'CodeAndes-respaldo-' + fechaLocal() + '.json'; }

  function descargar() {
    const blob = new Blob([datosRespaldo()], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = nombreArchivo();
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
    marcarRespaldo();
    toast('💾 Respaldo descargado. Guárdalo bien.');
    if (S.perfil && !ses) render();
  }

  function cargarArchivo() {
    const inp = document.createElement('input');
    inp.type = 'file';
    inp.accept = '.json,application/json,text/plain';
    inp.onchange = () => {
      const f = inp.files && inp.files[0];
      if (!f) return;
      const r = new FileReader();
      r.onload = () => aplicarRespaldo(String(r.result));
      r.readAsText(f);
    };
    inp.click();
  }

  function aplicarRespaldo(txt) {
    let o;
    try { o = JSON.parse(txt); } catch (e) { toast('❌ Ese respaldo no es válido'); return; }
    const est = o && o.app === 'CodeAndes' ? o.estado : (o && o.version && o.lecciones ? o : null);
    if (!est || typeof est.lecciones !== 'object') { toast('❌ Ese archivo no es un respaldo de CodeAndes'); return; }
    const nL = Object.keys(est.lecciones).filter(k => est.lecciones[k] && est.lecciones[k].hecha).length;
    const quien = est.perfil && est.perfil.nombre ? ' de <b>' + esc(est.perfil.nombre) + '</b>' : '';
    preguntar('¿Cargar este respaldo?', 'Es el avance' + quien + ': ' + nL + ' lecciones y ' + (est.xp || 0) + ' XP. Se reemplazará lo que hay ahora en este dispositivo.', 'Sí, cargar', 'Cancelar')
      .then(si => {
        if (!si) return;
        S = fusionar(est);
        if (!S.ultimoRespaldo) S.ultimoRespaldo = Date.now();
        guardar();
        ui.tab = 'inicio';
        ui.scrollActual = true;
        render();
        toast('✅ ¡Avance recuperado! Sigue donde te quedaste.');
      });
  }

  async function copiar(txt) {
    try { await navigator.clipboard.writeText(txt); return true; }
    catch (e) {
      const t = document.createElement('textarea');
      t.value = txt;
      document.body.appendChild(t);
      t.select();
      let ok = false;
      try { ok = document.execCommand('copy'); } catch (_) { ok = false; }
      t.remove();
      return ok;
    }
  }

  function verCodigo() {
    const c = aCodigo(datosRespaldo());
    modal('<h3>📋 Código de respaldo</h3><p>Copia este código y guárdalo (por ejemplo, envíatelo por WhatsApp o correo). En el otro dispositivo entra a <b>Perfil → Pegar código de respaldo</b>.</p>' +
      '<textarea class="txt" id="cod-resp" readonly>' + esc(c) + '</textarea>' +
      '<div class="botones" style="margin-top:14px"><button class="btn lila" data-a="copiar-cod">Copiar código</button><button class="btn borde" data-a="cerrar">Listo</button></div>', { centro: true });
  }

  function pegarCodigo() {
    modal('<h3>📥 Pegar código de respaldo</h3><p>Pega aquí el código que copiaste en tu otro dispositivo.</p>' +
      '<textarea class="txt" id="pegar-resp" placeholder="CA1-..."></textarea>' +
      '<div class="botones" style="margin-top:14px"><button class="btn" data-a="aplicar-cod">Cargar mi avance</button><button class="btn borde" data-a="cerrar">Cancelar</button></div>', { centro: true });
  }

  async function compartir() {
    try {
      const f = new File([datosRespaldo()], nombreArchivo(), { type: 'application/json' });
      if (navigator.canShare && navigator.canShare({ files: [f] })) {
        await navigator.share({ files: [f], title: 'Respaldo CodeAndes', text: 'Mi avance en CodeAndes' });
        marcarRespaldo();
        render();
      } else {
        toast('Tu navegador no permite enviar archivos. Usa "Descargar".');
      }
    } catch (e) { /* cancelado */ }
  }

  /* =========================================================
     ACCIONES (clics)
     ========================================================= */
  const A = {
    'tab': b => { ui.tab = b.dataset.t; if (ui.tab === 'inicio') ui.scrollActual = true; render(); if (ui.tab !== 'inicio') window.scrollTo(0, 0); },
    'nodo': b => abrirNodo(+b.dataset.i),
    'cerrar': () => cerrarModal(),
    'empezar': b => {
      cerrarModal();
      if (b.dataset.t === 'examen') {
        const et = ETAPAS.find(e => e.id === b.dataset.r);
        if (examenBloqueado(et) && !examenAprobado(et.id)) { toast('Primero aprueba los retos de esta etapa 💻'); return; }
      }
      if (ses) { capa.innerHTML = ''; ses = null; }
      iniciar(b.dataset.t, b.dataset.r);
    },
    'ir-practicas': b => { cerrarModal(); ui.tab = 'practicas'; render(); const el = document.getElementById('pr-' + b.dataset.e); if (el) el.scrollIntoView({ block: 'start' }); },
    'abrir-reto': b => { cerrarModal(); if (ses) { capa.innerHTML = ''; ses = null; } abrirReto(b.dataset.r); },
    'abrir-lab': () => abrirReto(null),
    'cerrar-reto': () => cerrarReto(),
    'modo-reto': b => { guardarEditor(); retoUI.modo = b.dataset.m; retoUI.resultado = null; pintarReto(); },
    'reto-bloq': () => toast('Primero llega a esa lección en el camino 📚'),
    'tecla': b => insertarTecla(b.dataset.v),
    'ejecutar': () => ejecutarEditor(),
    'comprobar-reto': () => comprobarRetoApp(),
    'comprobar-manual': () => comprobarRetoManual(),
    'ya-lo-hice': () => aprobarReto('honor'),
    'plantilla': () => { const c = $('#codigo'); if (c) { c.value = plantilla(retoUI.id); guardarEditor(); } },
    'limpiar-codigo': () => { preguntar('¿Borrar tu código?', 'Se borrará todo lo que escribiste en el editor.', 'Sí, borrar', 'Cancelar', 'mal').then(si => { if (si) { const c = $('#codigo'); if (c) { c.value = ''; guardarEditor(); } } }); },
    'ver-apunte': b => {
      const l = LEC[b.dataset.r];
      modal('<h3>📒 ' + esc(l.titulo) + '</h3><div class="txt-rico" style="margin-top:10px">' + apunteHTML(l) + '</div><div class="botones"><button class="btn borde" data-a="cerrar">Cerrar</button></div>', { centro: true });
    },
    'apuntes-de': b => {
      ui.tab = 'apuntes'; render();
      const el = document.getElementById('ap-' + b.dataset.e);
      if (el) el.scrollIntoView({ block: 'start' });
    },
    'info-vidas': () => {
      actualizarVidas();
      const txt = !S.ajustes.vidas ? 'Las vidas están desactivadas: puedes equivocarte sin límite.'
        : 'Tienes ' + S.vidas.n + ' de ' + MAX_VIDAS + ' vidas. Pierdes una cuando fallas en una lección. ' +
        (S.vidas.n < MAX_VIDAS ? 'La próxima llega en ' + minProxVida() + ' min. ' : '') + 'Si repasas tus errores, las recuperas todas.';
      modal('<h3>❤️ Vidas</h3><p>' + txt + '</p><div class="botones"><button class="btn borde" data-a="cerrar">Entendido</button></div>', { centro: true });
    },
    'rep-errores': () => iniciar('repaso'),
    'practica': () => iniciar('practica'),

    /* lección */
    'teo-sig': () => { ses.ti++; if (ses.ti >= ses.teoria.length) ses.ti = -1; pintarLec(); const b = $('.lec-body'); if (b) b.scrollTop = 0; },
    'teo-ant': () => { if (ses.ti > 0) { ses.ti--; pintarLec(); } },
    'op': b => { if (ses.estado !== 'responder') return; ses.resp = +b.dataset.k; pintarLec(); },
    'chip': b => {
      if (ses.estado !== 'responder') return;
      const k = +b.dataset.k;
      if (ses.resp.includes(k)) return;
      const libre = ses.resp.indexOf(null);
      if (libre >= 0) { ses.resp[libre] = k; pintarLec(); }
    },
    'slot': b => { if (ses.estado !== 'responder') return; ses.resp[+b.dataset.k] = null; pintarLec(); },
    'lin-poner': b => { if (ses.estado !== 'responder') return; const k = +b.dataset.k; if (!ses.resp.includes(k)) { ses.resp.push(k); pintarLec(); } },
    'lin-quitar': b => { if (ses.estado !== 'responder') return; ses.resp.splice(+b.dataset.p, 1); pintarLec(); },
    'comprobar': () => comprobar(),
    'continuar': () => continuar(),
    'cerrar-lec': () => cerrarLec(),
    'salir-lec': () => {
      if (!ses || (ses.hechos === 0 && ses.fallados.size === 0) || ses.i >= ses.cola.length) { cerrarLec(); return; }
      preguntar('¿Seguro que quieres salir?', 'Si sales ahora, perderás el avance de esta ' + (ses.tipo === 'examen' ? 'prueba' : 'lección') + '.', 'Seguir aprendiendo', 'Salir', 'ok')
        .then(seguir => { if (!seguir) cerrarLec(); });
    },
    'sv-repaso': () => { cerrarModal(); capa.innerHTML = ''; ses = null; ui.pendiente = null; iniciar('repaso'); },
    'sv-desactivar': () => {
      S.ajustes.vidas = false; guardar(); cerrarModal();
      if (ses) continuar();
      else if (ui.pendiente) { const p = ui.pendiente; ui.pendiente = null; iniciar(p.tipo, p.ref); }
    },
    'sv-salir': () => { cerrarModal(); ui.pendiente = null; if (ses) cerrarLec(); },
    'resp-si': () => { cerrarModal(); const r = resolver; resolver = null; if (r) r(true); },
    'resp-no': () => { cerrarModal(); const r = resolver; resolver = null; if (r) r(false); },

    /* perfil */
    'tg': b => { const k = b.dataset.k; S.ajustes[k] = !S.ajustes[k]; if (k === 'vidas' && S.ajustes.vidas) actualizarVidas(); guardar(); render(); },
    'pf-nombre': () => { const v = ($('#pf-nombre').value || '').trim(); if (!v) { toast('Escribe tu nombre'); return; } S.perfil.nombre = v; guardar(); render(); toast('✅ Nombre guardado'); },
    'pf-masc': b => { S.perfil.mascota = b.dataset.k; guardar(); render(); },
    'pf-meta': b => { S.perfil.meta = +b.dataset.x; guardar(); render(); },
    'descargar': () => descargar(),
    'cargar': () => cargarArchivo(),
    'codigo': () => verCodigo(),
    'copiar-cod': async () => {
      const t = $('#cod-resp');
      const ok = await copiar(t.value);
      if (ok) { marcarRespaldo(); toast('📋 ¡Código copiado!'); }
      else { t.select(); toast('Selecciona el texto y cópialo manualmente'); }
    },
    'pegar': () => pegarCodigo(),
    'aplicar-cod': () => {
      const v = ($('#pegar-resp').value || '').trim();
      if (!v) { toast('Primero pega tu código'); return; }
      let txt;
      try { txt = deCodigo(v); } catch (e) { toast('❌ El código no es válido. Revisa que esté completo.'); return; }
      aplicarRespaldo(txt);
    },
    'compartir': () => compartir(),
    'instalar': async () => {
      if (!instalarEvt) return;
      instalarEvt.prompt();
      try { await instalarEvt.userChoice; } catch (e) { /* nada */ }
      instalarEvt = null;
      render();
    },
    'reiniciar': () => {
      preguntar('¿Borrar todo tu avance?', 'Se borrarán tus lecciones, XP, racha y logros de este dispositivo. Si no tienes respaldo, no se puede recuperar.', 'Sí, borrar todo', 'Cancelar', 'mal')
        .then(si => {
          if (!si) return;
          try { localStorage.removeItem(KEY); } catch (e) { /* nada */ }
          S = nuevoEstado();
          ui.tab = 'inicio';
          render();
        });
    },

    /* bienvenida */
    'bv-masc': b => { ui.bv.masc = b.dataset.k; render(); },
    'bv-meta': b => { ui.bv.meta = +b.dataset.x; render(); },
    'bv-empezar': () => {
      const nombre = (ui.bv.nombre || '').trim();
      if (!nombre) { toast('Escribe tu nombre para empezar'); const i = $('#bv-nombre'); if (i) i.focus(); return; }
      S.perfil = { nombre, mascota: ui.bv.masc, meta: ui.bv.meta };
      guardar();
      ui.scrollActual = true;
      render();
      toast('¡Hola, ' + nombre + '! Empecemos 🚀');
    },
    'bv-importar': () => {
      modal('<h3>Recuperar mi avance</h3><p>Elige cómo trajiste tu respaldo.</p><div class="botones">' +
        '<button class="btn" data-a="cargar">📂 Tengo el archivo</button><button class="btn lila" data-a="pegar">📥 Tengo el código</button>' +
        '<button class="btn borde" data-a="cerrar">Cancelar</button></div>', { centro: true });
    }
  };

  document.addEventListener('click', ev => {
    const b = ev.target.closest('[data-a]');
    if (!b || b.disabled) return;
    const f = A[b.dataset.a];
    if (f) f(b, ev);
  });
  document.addEventListener('input', ev => {
    const t = ev.target;
    if (t.id === 'resp' && ses) {
      ses.resp = t.value;
      const b = $('#btn-main');
      if (b && ses.estado === 'responder') b.disabled = !listo();
    } else if (t.id === 'codigo' || t.id === 'entrada') {
      guardarEditorDiferido();
    } else if (t.id === 'bv-nombre') {
      ui.bv.nombre = t.value;
    }
  });
  document.addEventListener('keydown', ev => {
    if (ev.target && ev.target.id === 'codigo') { teclaEditor(ev); return; }
    if (!ses || $('#modal')) return;
    if (ev.key === 'Enter') {
      const b = $('#btn-main');
      if (b && !b.disabled) { ev.preventDefault(); b.click(); }
    } else if (/^[1-9]$/.test(ev.key) && ses.ti < 0 && ses.estado === 'responder' && document.activeElement.tagName !== 'INPUT') {
      const e = actual();
      if (e && e.tipo === 'mc') {
        const k = ses.vista.orden[+ev.key - 1];
        if (k != null) { ses.resp = k; pintarLec(); }
      }
    }
  });

  document.addEventListener('pointerdown', ev => { if (ev.target.closest && ev.target.closest('.tecla')) ev.preventDefault(); });

  /* Vidas que se recuperan con el tiempo */
  setInterval(() => {
    if (ses || !S.perfil || S.vidas.n >= MAX_VIDAS) return;
    const antes = S.vidas.n;
    actualizarVidas();
    if (S.vidas.n !== antes) { guardar(); if (!$('#modal')) render(); }
  }, 60000);

  /* Instalar como app y modo sin internet */
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    instalarEvt = e;
    if (ui.tab === 'perfil' && !ses) render();
  });
  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').catch(() => { /* sin modo offline */ });
    });
  }

  /* Para pruebas */
  window.__CodeAndes = { estado: () => S, sesion: () => ses, reto: () => retoUI, NODOS, EJ, LEC, ETAPAS, PRUEBAS };

  if (!ETAPAS.length) {
    app.innerHTML = '<div class="wrap" style="padding:40px 0"><h2>No se encontró el contenido del curso.</h2><p>Revisa que la carpeta <code>js</code> esté junto a index.html.</p></div>';
    return;
  }
  if (S.perfil) { actualizarVidas(); revisarLogros(); }
  render();
})();
