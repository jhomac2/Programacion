/* =========================================================
   MiniC · intérprete pequeño de C/C++ para CodeAndes
   Hecho para practicar sin internet (celular o PC).
   Soporta lo de las Etapas 1 a 3 y un poco de la 4:
   variables, printf/scanf, if/switch, for/while/do, arreglos,
   matrices, cadenas (string.h), math.h, stdlib.h, funciones,
   recursividad, lambdas, try/catch, cin/cout y string básico.
   No soporta: struct, class, punteros, new/delete, vector, map…
   ========================================================= */
(function (global) {
  'use strict';

  class ErrorC extends Error {
    constructor(msg, linea) { super(msg); this.linea = linea; }
  }
  const NO_SOPORTA = 'Esta parte de C++ todavía no se puede ejecutar dentro de CodeAndes (clases, punteros, vector, map…). Pruébala en Code::Blocks o en Cxxdroid.';

  /* ---------------- Analizador léxico ---------------- */
  const KW = new Set(['int', 'float', 'double', 'char', 'bool', 'void', 'long', 'short', 'unsigned', 'signed', 'const', 'auto', 'string', 'static',
    'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'default', 'break', 'continue', 'return', 'true', 'false',
    'try', 'catch', 'throw', 'using', 'namespace', 'struct', 'class', 'sizeof', 'nullptr', 'template', 'typename', 'new', 'delete']);
  const TIPOS = new Set(['int', 'float', 'double', 'char', 'bool', 'void', 'long', 'short', 'unsigned', 'signed', 'const', 'auto', 'string', 'static']);
  const OPS = ['<<=', '>>=', '->', '++', '--', '<<', '>>', '<=', '>=', '==', '!=', '&&', '||', '+=', '-=', '*=', '/=', '%=', '&=', '|=', '^=', '::',
    '+', '-', '*', '/', '%', '=', '<', '>', '!', '&', '|', '^', '~', '?', ':', ';', ',', '.', '(', ')', '{', '}', '[', ']'];
  const ESC = { n: '\n', t: '\t', '0': '\0', '\\': '\\', "'": "'", '"': '"', r: '\r', a: '\x07', b: '\b' };

  function lex(src) {
    const toks = [];
    let i = 0, linea = 1;
    const n = src.length;
    const dig = ch => ch >= '0' && ch <= '9';
    while (i < n) {
      const c = src[i];
      if (c === '\n') { linea++; i++; continue; }
      if (c === ' ' || c === '\t' || c === '\r' || c === '\f') { i++; continue; }
      if (c === '/' && src[i + 1] === '/') { while (i < n && src[i] !== '\n') i++; continue; }
      if (c === '/' && src[i + 1] === '*') {
        i += 2;
        while (i < n && !(src[i] === '*' && src[i + 1] === '/')) { if (src[i] === '\n') linea++; i++; }
        i += 2; continue;
      }
      if (c === '#') { while (i < n && src[i] !== '\n') i++; continue; }
      if (/[A-Za-z_]/.test(c)) {
        let j = i + 1;
        while (j < n && /[A-Za-z0-9_]/.test(src[j])) j++;
        const w = src.slice(i, j);
        toks.push({ t: KW.has(w) ? 'kw' : 'id', v: w, linea });
        i = j; continue;
      }
      if (dig(c) || (c === '.' && dig(src[i + 1] || ''))) {
        let j = i, esFloat = false;
        if (c === '0' && (src[i + 1] === 'x' || src[i + 1] === 'X')) {
          j = i + 2;
          while (j < n && /[0-9a-fA-F]/.test(src[j])) j++;
          toks.push({ t: 'num', v: parseInt(src.slice(i, j), 16), f: false, linea });
          i = j; continue;
        }
        while (j < n && dig(src[j])) j++;
        if (src[j] === '.') { esFloat = true; j++; while (j < n && dig(src[j])) j++; }
        if (src[j] === 'e' || src[j] === 'E') {
          let k = j + 1;
          if (src[k] === '+' || src[k] === '-') k++;
          if (dig(src[k] || '')) { esFloat = true; j = k; while (j < n && dig(src[j])) j++; }
        }
        const txt = src.slice(i, j);
        let suf = '';
        while (j < n && /[fFlLuU]/.test(src[j])) { suf += src[j]; j++; }
        toks.push({ t: 'num', v: parseFloat(txt), f: esFloat, fl: /[fF]/.test(suf), linea });
        i = j; continue;
      }
      if (c === '"') {
        let j = i + 1, s = '';
        while (j < n && src[j] !== '"') {
          if (src[j] === '\n') throw new ErrorC('Falta cerrar las comillas " del texto', linea);
          if (src[j] === '\\') { s += (ESC[src[j + 1]] !== undefined ? ESC[src[j + 1]] : src[j + 1]); j += 2; }
          else { s += src[j]; j++; }
        }
        if (j >= n) throw new ErrorC('Falta cerrar las comillas " del texto', linea);
        toks.push({ t: 'str', v: s, linea });
        i = j + 1; continue;
      }
      if (c === "'") {
        let j = i + 1, s;
        if (src[j] === '\\') { s = ESC[src[j + 1]] !== undefined ? ESC[src[j + 1]] : src[j + 1]; j += 2; }
        else { s = src[j]; j++; }
        if (src[j] !== "'" || s === undefined) throw new ErrorC("Un char va entre comillas simples y tiene una sola letra, por ejemplo 'A'", linea);
        toks.push({ t: 'chr', v: s.charCodeAt(0), linea });
        i = j + 1; continue;
      }
      let op = null;
      for (const o of OPS) { if (src.startsWith(o, i)) { op = o; break; } }
      if (!op) throw new ErrorC('No entiendo el símbolo "' + c + '"', linea);
      toks.push({ t: 'op', v: op, linea });
      i += op.length;
    }
    toks.push({ t: 'eof', v: 'fin del programa', linea });
    return toks;
  }

  /* ---------------- Analizador sintáctico ---------------- */
  function parse(toks) {
    let p = 0;
    const tk = (k) => toks[p + (k || 0)];
    const es = (v, k) => { const t = tk(k); return (t.t === 'op' || t.t === 'kw') && t.v === v; };
    const next = () => toks[p++];
    const err = (msg, t) => { throw new ErrorC(msg, (t || tk()).linea); };
    const desc = t => t.t === 'eof' ? 'el final del programa' : '"' + (t.t === 'str' ? '"' + t.v + '"' : t.t === 'chr' ? "'" + String.fromCharCode(t.v) + "'" : t.v) + '"';
    function espera(v, msg) {
      if (!es(v)) {
        const t = tk();
        const prev = toks[p - 1];
        if (v === ';') err('Falta un punto y coma ; ' + (prev ? 'después de "' + (prev.t === 'str' ? '"' + prev.v + '"' : prev.t === 'chr' ? "'" + String.fromCharCode(prev.v) + "'" : prev.v) + '"' : ''), prev || t);
        err(msg || ('Se esperaba "' + v + '" y encontré ' + desc(t)), t);
      }
      return next();
    }
    function ident(msg) {
      const t = tk();
      if (t.t !== 'id') err(msg || ('Se esperaba un nombre y encontré ' + desc(t)), t);
      return next().v;
    }
    function noSoporta(t) { err(NO_SOPORTA, t); }

    function esTipo(k) {
      const t = tk(k || 0);
      if (t.t === 'kw' && TIPOS.has(t.v)) return true;
      if (t.t === 'id' && t.v === 'std' && toks[p + (k || 0) + 1].v === '::' && toks[p + (k || 0) + 2].v === 'string') return true;
      return false;
    }
    function tipo() {
      const kws = [];
      while (esTipo()) {
        if (tk().t === 'id') { next(); next(); }   // std ::
        kws.push(next().v);
      }
      if (!kws.length) err('Se esperaba un tipo de dato (int, float, char…)');
      let base = 'int';
      if (kws.includes('void')) base = 'void';
      else if (kws.includes('double')) base = 'double';
      else if (kws.includes('float')) base = 'float';
      else if (kws.includes('char')) base = 'char';
      else if (kws.includes('bool')) base = 'bool';
      else if (kws.includes('string')) base = 'string';
      else if (kws.includes('auto')) base = 'auto';
      else if (kws.includes('long')) base = 'long';
      let ptr = 0;
      while (es('*')) { next(); ptr++; }
      if (ptr) { if (base === 'char') base = 'cstr'; else noSoporta(tk(-1)); }
      return base;
    }

    function programa() {
      const funcs = {}, globales = [];
      while (tk().t !== 'eof') {
        if (es('using')) { while (!es(';')) next(); next(); continue; }
        if (es('struct') || es('class') || es('template')) noSoporta();
        if (es(';')) { next(); continue; }
        if (!esTipo()) err('Aquí debería ir una función (como int main()) o una variable, y encontré ' + desc(tk()));
        const lin = tk().linea;
        const tp = tipo();
        const nombre = ident();
        if (es('(')) {
          const params = parametros();
          if (es(';')) { next(); continue; }    // prototipo
          const cuerpo = bloque();
          funcs[nombre] = { k: 'func', nombre, tipo: tp, params, cuerpo, linea: lin };
        } else {
          p--;
          globales.push(declaracionResto(tp, lin));
          espera(';');
        }
      }
      return { funcs, globales };
    }

    function parametros() {
      espera('(');
      const ps = [];
      if (es('void') && es(')', 1)) { next(); }
      while (!es(')')) {
        const tp = tipo();
        let ref = false;
        if (es('&')) { next(); ref = true; }
        const nombre = tk().t === 'id' ? next().v : '';
        let arr = 0;
        while (es('[')) { next(); while (!es(']')) next(); next(); arr++; }
        ps.push({ nombre, tipo: tp, ref, arr });
        if (es(',')) next(); else break;
      }
      espera(')', 'Falta cerrar el paréntesis ) de los parámetros');
      return ps;
    }

    function declaracionResto(tp, lin) {
      const vars = [];
      do {
        if (vars.length) next();   // coma
        if (es('&')) noSoporta();
        const tNom = tk();
        const nombre = ident('Se esperaba el nombre de la variable');
        const dims = [];
        while (es('[')) {
          next();
          if (es(']')) { next(); dims.push(null); continue; }
          dims.push(expr());
          espera(']');
        }
        let init = null;
        if (es('=')) {
          next();
          init = es('{') ? lista() : asignacion();
        } else if (es('(') && !dims.length) {
          next();
          const args = [];
          while (!es(')')) { args.push(asignacion()); if (es(',')) next(); else break; }
          espera(')');
          init = args.length === 1 ? args[0] : null;
        }
        vars.push({ nombre, dims, init, linea: tNom.linea });
      } while (es(','));
      return { k: 'decl', tipo: tp, vars, linea: lin };
    }
    function lista() {
      const lin = tk().linea;
      espera('{');
      const items = [];
      while (!es('}')) {
        items.push(es('{') ? lista() : asignacion());
        if (es(',')) next(); else break;
      }
      espera('}');
      return { k: 'lista', items, linea: lin };
    }

    function bloque() {
      const lin = tk().linea;
      espera('{', 'Falta abrir la llave {');
      const cuerpo = [];
      while (!es('}')) {
        if (tk().t === 'eof') err('Falta cerrar una llave } (se abrió en la línea ' + lin + ')', tk());
        cuerpo.push(sentencia());
      }
      next();
      return { k: 'bloque', cuerpo, linea: lin };
    }

    function sentencia() {
      const t = tk(), lin = t.linea;
      if (es('{')) return bloque();
      if (es(';')) { next(); return { k: 'vacio', linea: lin }; }
      if (es('if')) {
        next(); espera('(');
        const c = expr();
        espera(')', 'Falta cerrar el paréntesis ) del if');
        const si = sentencia();
        let no = null;
        if (es('else')) { next(); no = sentencia(); }
        return { k: 'if', c, si, no, linea: lin };
      }
      if (es('while')) {
        next(); espera('(');
        const c = expr();
        espera(')', 'Falta cerrar el paréntesis ) del while');
        return { k: 'while', c, cuerpo: sentencia(), linea: lin };
      }
      if (es('do')) {
        next();
        const cuerpo = sentencia();
        espera('while', 'Después del bloque do{ } va while(condición);');
        espera('(');
        const c = expr();
        espera(')');
        espera(';');
        return { k: 'dowhile', c, cuerpo, linea: lin };
      }
      if (es('for')) {
        next(); espera('(');
        let ini = null;
        if (esTipo()) {
          const tp = tipo();
          if (tk().t === 'id' && es(':', 1)) {
            const nombre = next().v; next();
            const col = expr();
            espera(')');
            return { k: 'forrango', tipo: tp, nombre, col, cuerpo: sentencia(), linea: lin };
          }
          ini = declaracionResto(tp, lin);
        } else if (!es(';')) {
          ini = { k: 'exprs', es: listaExpr(), linea: lin };
        }
        espera(';', 'En el for, las 3 partes se separan con punto y coma ;');
        const c = es(';') ? null : expr();
        espera(';', 'En el for, las 3 partes se separan con punto y coma ;');
        const inc = es(')') ? null : listaExpr();
        espera(')', 'Falta cerrar el paréntesis ) del for');
        return { k: 'for', ini, c, inc, cuerpo: sentencia(), linea: lin };
      }
      if (es('switch')) {
        next(); espera('(');
        const e = expr();
        espera(')');
        espera('{');
        const items = [];
        while (!es('}')) {
          if (tk().t === 'eof') err('Falta cerrar la llave } del switch');
          if (es('case')) {
            const lc = tk().linea;
            next();
            const v = ternario();
            espera(':', 'Después del valor del case van dos puntos :');
            items.push({ k: 'case', e: v, linea: lc });
          } else if (es('default')) {
            next(); espera(':', 'Después de default van dos puntos :');
            items.push({ k: 'default' });
          } else items.push(sentencia());
        }
        next();
        return { k: 'switch', e, items, linea: lin };
      }
      if (es('break')) { next(); espera(';'); return { k: 'break', linea: lin }; }
      if (es('continue')) { next(); espera(';'); return { k: 'continue', linea: lin }; }
      if (es('return')) {
        next();
        const e = es(';') ? null : expr();
        espera(';');
        return { k: 'return', e, linea: lin };
      }
      if (es('throw')) {
        next();
        const e = expr();
        espera(';');
        return { k: 'throw', e, linea: lin };
      }
      if (es('try')) {
        next();
        const cuerpo = bloque();
        const capturas = [];
        while (es('catch')) {
          next(); espera('(');
          let nombre = null, tp = null;
          if (es('.') && es('.', 1)) { next(); next(); next(); }
          else { tp = tipo(); if (es('&')) next(); if (tk().t === 'id') nombre = next().v; }
          espera(')');
          capturas.push({ nombre, tipo: tp, cuerpo: bloque() });
        }
        if (!capturas.length) err('Después de try{ } debe ir catch( ){ }');
        return { k: 'try', cuerpo, capturas, linea: lin };
      }
      if (es('struct') || es('class') || es('template') || es('delete') || es('new')) noSoporta();
      if (esTipo()) {
        const tp = tipo();
        const d = declaracionResto(tp, lin);
        espera(';');
        return d;
      }
      const e = expr();
      espera(';');
      return { k: 'expr', e, linea: lin };
    }

    function listaExpr() {
      const l = [asignacion()];
      while (es(',')) { next(); l.push(asignacion()); }
      return l;
    }

    /* ---- expresiones ---- */
    function expr() { return asignacion(); }
    const ASIG = new Set(['=', '+=', '-=', '*=', '/=', '%=', '&=', '|=', '^=', '<<=', '>>=']);
    function asignacion() {
      const izq = ternario();
      const t = tk();
      if (t.t === 'op' && ASIG.has(t.v)) {
        next();
        const der = asignacion();
        return { k: 'asig', op: t.v, izq, der, linea: t.linea };
      }
      return izq;
    }
    function ternario() {
      const c = binario(0);
      if (es('?')) {
        const lin = next().linea;
        const a = asignacion();
        espera(':', 'En el operador ? : faltan los dos puntos :');
        const b = ternario();
        return { k: 'tern', c, a, b, linea: lin };
      }
      return c;
    }
    const NIVELES = [['||'], ['&&'], ['|'], ['^'], ['&'], ['==', '!='], ['<', '<=', '>', '>='], ['<<', '>>'], ['+', '-'], ['*', '/', '%']];
    function binario(n) {
      if (n === NIVELES.length) return unario();
      let izq = binario(n + 1);
      while (tk().t === 'op' && NIVELES[n].includes(tk().v)) {
        const t = next();
        const der = binario(n + 1);
        izq = { k: 'bin', op: t.v, izq, der, linea: t.linea };
      }
      return izq;
    }
    function unario() {
      const t = tk();
      if (t.t === 'op') {
        if (['!', '-', '+', '~'].includes(t.v)) { next(); return { k: 'un', op: t.v, e: unario(), linea: t.linea }; }
        if (t.v === '++' || t.v === '--') { next(); return { k: 'pre', op: t.v, e: unario(), linea: t.linea }; }
        if (t.v === '&') { next(); return { k: 'dir', e: unario(), linea: t.linea }; }
        if (t.v === '*') noSoporta(t);
        if (t.v === '(' && esTipo(1)) {
          next();
          const tp = tipo();
          espera(')');
          return { k: 'cast', tipo: tp, e: unario(), linea: t.linea };
        }
      }
      if (es('sizeof')) {
        next(); espera('(');
        let tam;
        if (esTipo()) { const tp = tipo(); tam = { k: 'num', v: { double: 8, long: 8, char: 1, bool: 1 }[tp] || 4, tipo: 'int', linea: t.linea }; }
        else tam = { k: 'sizeof', e: expr(), linea: t.linea };
        espera(')');
        return tam;
      }
      if (es('new') || es('delete')) noSoporta(t);
      return postfijo();
    }
    function postfijo() {
      let e = primario();
      for (;;) {
        const t = tk();
        if (es('(')) {
          next();
          const args = [];
          while (!es(')')) {
            args.push(asignacion());
            if (es(',')) next(); else break;
          }
          espera(')', 'Falta cerrar el paréntesis ) de la llamada');
          e = { k: 'llamada', f: e, args, linea: t.linea };
        } else if (es('[')) {
          next();
          const i = expr();
          espera(']', 'Falta cerrar el corchete ]');
          e = { k: 'indice', a: e, i, linea: t.linea };
        } else if (es('++') || es('--')) {
          next();
          e = { k: 'post', op: t.v, e, linea: t.linea };
        } else if (es('.')) {
          next();
          const nombre = ident();
          e = { k: 'miembro', obj: e, nombre, linea: t.linea };
        } else if (es('->')) {
          noSoporta(t);
        } else break;
      }
      return e;
    }
    function primario() {
      const t = tk();
      if (t.t === 'num') { next(); return { k: 'num', v: t.v, tipo: t.f ? (t.fl ? 'float' : 'double') : 'int', linea: t.linea }; }
      if (t.t === 'chr') { next(); return { k: 'num', v: t.v, tipo: 'char', linea: t.linea }; }
      if (t.t === 'str') {
        let s = next().v;
        while (tk().t === 'str') s += next().v;
        return { k: 'str', v: s, linea: t.linea };
      }
      if (es('true') || es('false')) { next(); return { k: 'num', v: t.v === 'true' ? 1 : 0, tipo: 'bool', linea: t.linea }; }
      if (es('nullptr')) { next(); return { k: 'num', v: 0, tipo: 'int', linea: t.linea }; }
      if (es('string')) {
        next();
        if (es('::')) { next(); const nm = ident(); if (nm === 'npos') return { k: 'num', v: -1, tipo: 'int', linea: t.linea }; err('No conozco string::' + nm); }
        return { k: 'var', nombre: 'string', linea: t.linea };
      }
      if (t.t === 'id') {
        next();
        if (t.v === 'std' && es('::')) { next(); return primario(); }
        if (['vector', 'map', 'stack', 'queue', 'list', 'set', 'malloc', 'free', 'ifstream', 'ofstream', 'fstream'].includes(t.v)) noSoporta(t);
        return { k: 'var', nombre: t.v, linea: t.linea };
      }
      if (es('(')) {
        next();
        const e = expr();
        espera(')', 'Falta cerrar el paréntesis )');
        return e;
      }
      if (es('[')) {
        next();
        while (!es(']')) { if (tk().t === 'eof') err('Falta cerrar ] en la lambda'); next(); }
        next();
        const params = parametros();
        if (es('->')) { next(); tipo(); }
        const cuerpo = bloque();
        return { k: 'lambda', params, cuerpo, linea: t.linea };
      }
      err('No esperaba ' + desc(t) + ' aquí', t);
    }

    return programa();
  }

  /* ---------------- Intérprete ---------------- */
  const ENTEROS = new Set(['int', 'long', 'char', 'bool']);
  const RANGO = { bool: 0, char: 1, int: 2, long: 3, float: 4, double: 5 };
  const esNum = v => v && RANGO[v.t] !== undefined;
  const BRK = { s: 'break' }, CONT = { s: 'continue' };
  class Retorno { constructor(v) { this.v = v; } }
  class Lanzado { constructor(v, linea) { this.v = v; this.linea = linea; } }
  class Salida { constructor(c) { this.c = c; } }

  class Ambito {
    constructor(padre) { this.vars = new Map(); this.padre = padre; }
    buscar(n) { let a = this; while (a) { const c = a.vars.get(n); if (c) return c; a = a.padre; } return null; }
  }

  function textoDe(v, linea) {
    if (!v) throw new ErrorC('Falta un texto', linea);
    if (v.t === 'cstr' || v.t === 'string') return v.v;
    if (v.t === 'arr' && v.elem === 'char') {
      let s = '';
      for (let i = 0; i < v.data.length && v.data[i] !== 0; i++) s += String.fromCharCode(v.data[i]);
      return s;
    }
    if (v.t === 'char') return String.fromCharCode(v.v);
    throw new ErrorC('Aquí se esperaba un texto', linea);
  }

  function fmtG(x, prec) {
    if (!isFinite(x)) return isNaN(x) ? 'nan' : (x < 0 ? '-inf' : 'inf');
    if (x === 0) return Object.is(x, -0) ? '-0' : '0';
    const P = prec === 0 ? 1 : prec;
    const exp = Math.floor(Math.log10(Math.abs(Number(x.toPrecision(P)))));
    let s;
    if (exp < -4 || exp >= P) {
      s = x.toExponential(P - 1);
      let [m, e] = s.split('e');
      if (m.includes('.')) m = m.replace(/0+$/, '').replace(/\.$/, '');
      const sign = e[0] === '-' ? '-' : '+';
      e = e.replace(/^[+-]/, '');
      s = m + 'e' + sign + (e.length < 2 ? '0' + e : e);
    } else {
      s = x.toFixed(Math.max(0, P - 1 - exp));
      if (s.includes('.')) s = s.replace(/0+$/, '').replace(/\.$/, '');
    }
    return s;
  }
  function fmtE(x, prec) {
    let s = x.toExponential(prec);
    let [m, e] = s.split('e');
    const sign = e[0] === '-' ? '-' : '+';
    e = e.replace(/^[+-]/, '');
    return m + 'e' + sign + (e.length < 2 ? '0' + e : e);
  }

  function ejecutar(codigo, entrada, opciones) {
    opciones = opciones || {};
    const MAX_PASOS = opciones.maxPasos || 4000000;
    const MAX_MS = opciones.maxMs || 4000;
    const inicio = Date.now();
    const trozos = [];
    let totalTexto = 0;
    function escribir(s) {
      if (!s) return;
      const u = trozos[trozos.length - 1];
      if (u && u.t === 'in' && !u.cerrado) { u.s += '\n'; u.cerrado = true; }
      if (u && u.t === 'out') u.s += s;
      else trozos.push({ t: 'out', s });
      totalTexto += s.length;
      if (totalTexto > 200000) throw new ErrorC('Tu programa mostró demasiado texto. ¿Tienes un bucle infinito?');
    }
    function eco(s) {
      const u = trozos[trozos.length - 1];
      if (u && u.t === 'in' && !u.cerrado) u.s += ' ' + s;
      else trozos.push({ t: 'in', s });
    }
    const entradaTxt = String(entrada || '');
    let pos = 0;
    let pasos = 0;
    let profundidad = 0;
    let semilla = 1;
    const cout = { fixed: false, prec: 6 };

    function paso(linea) {
      if (++pasos > MAX_PASOS || (pasos % 20000 === 0 && Date.now() - inicio > MAX_MS)) {
        throw new ErrorC('Tu programa tardó demasiado. ¿Tienes un bucle infinito? Revisa que la condición del bucle llegue a ser falsa.', linea);
      }
    }

    /* --- lectura de la entrada --- */
    function saltarEspacios() { while (pos < entradaTxt.length && /\s/.test(entradaTxt[pos])) pos++; }
    function faltaDato(linea) {
      throw new ErrorC('Tu programa pidió un dato, pero ya no hay más en la caja "Datos de entrada". Escribe ahí todos los datos que pide tu programa, separados por espacios o Enter.', linea);
    }
    function leerToken(tipo, linea) {
      if (tipo !== 'char1') saltarEspacios();
      if (pos >= entradaTxt.length) faltaDato(linea);
      const resto = entradaTxt.slice(pos);
      let m;
      if (tipo === 'int') {
        m = /^[+-]?\d+/.exec(resto);
        if (!m) throw new ErrorC('El dato "' + resto.split(/\s/)[0] + '" no es un número entero', linea);
      } else if (tipo === 'num') {
        m = /^[+-]?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?/.exec(resto);
        if (!m) throw new ErrorC('El dato "' + resto.split(/\s/)[0] + '" no es un número', linea);
      } else if (tipo === 'char1') {
        m = [resto[0]];
      } else {
        m = /^\S+/.exec(resto);
      }
      pos += m[0].length;
      if (!(tipo === 'char1' && /\s/.test(m[0]))) eco(m[0]);
      return m[0];
    }

    /* --- valores --- */
    function V(t, v) { return { t, v }; }
    function num(v, linea) {
      if (esNum(v)) return v.v;
      if (v && (v.t === 'cstr' || v.t === 'string')) throw new ErrorC('Estás usando un texto donde va un número', linea);
      if (v && v.t === 'arr') throw new ErrorC('Estás usando un arreglo completo donde va un número. ¿Te faltó la posición, como v[i]?', linea);
      if (v === undefined) throw new ErrorC('Esa función no devuelve ningún valor (es void)', linea);
      throw new ErrorC('Aquí se esperaba un número', linea);
    }
    function convertir(v, tipo, linea) {
      if (tipo === 'auto' || !tipo) return v && v.t === 'arr' ? v : (v && typeof v === 'object' ? Object.assign({}, v) : v);
      if (tipo === 'string') {
        if (v && (v.t === 'string' || v.t === 'cstr' || v.t === 'arr')) return V('string', textoDe(v, linea));
        if (v && v.t === 'char') return V('string', String.fromCharCode(v.v));
        throw new ErrorC('A un string solo se le puede guardar texto', linea);
      }
      if (tipo === 'cstr') return V('cstr', textoDe(v, linea));
      if (tipo === 'void') return undefined;
      if (v && v.t === 'fn') return v;
      const x = num(v, linea);
      switch (tipo) {
        case 'int': return V('int', Math.trunc(x) | 0);
        case 'long': return V('long', Math.trunc(x));
        case 'char': { let c = Math.trunc(x) % 256; if (c < 0) c += 256; return V('char', c); }
        case 'bool': return V('bool', x ? 1 : 0);
        case 'float': return V('float', Math.fround(x));
        case 'double': return V('double', x);
      }
      return V(tipo, x);
    }
    function tipoRes(a, b) {
      const r = Math.max(RANGO[a.t], RANGO[b.t]);
      if (r <= 2) return 'int';
      return ['bool', 'char', 'int', 'long', 'float', 'double'][r];
    }
    function arreglo(dims, elem, init, linea, ambito) {
      const tam = dims[0] === null ? null : Math.trunc(num(evaluar(dims[0], ambito), linea));
      let n = tam;
      if (n === null) {
        if (init && init.k === 'lista') n = init.items.length;
        else if (init && init.k === 'str') n = init.v.length + 1;
        else throw new ErrorC('El arreglo necesita un tamaño, por ejemplo [5]', linea);
      }
      if (n < 0 || n > 1000000) throw new ErrorC('Tamaño de arreglo no válido: ' + n, linea);
      const a = { t: 'arr', elem, data: new Array(n) };
      if (dims.length > 1) {
        const resto = dims.slice(1);
        let planos = null;
        if (init && init.k === 'lista' && init.items.length && init.items[0].k !== 'lista') planos = init.items.slice();
        for (let i = 0; i < n; i++) {
          let sub = null;
          if (init && init.k === 'lista') {
            if (planos) {
              const filaTam = resto.reduce((acc, d) => acc * Math.trunc(num(evaluar(d, ambito), linea)), 1);
              sub = { k: 'lista', items: planos.splice(0, filaTam) };
            } else sub = init.items[i] || null;
          }
          a.data[i] = arreglo(resto, elem, sub, linea, ambito);
        }
        return a;
      }
      const cero = elem === 'string' ? V('string', '') : 0;
      for (let i = 0; i < n; i++) a.data[i] = elem === 'string' ? V('string', '') : cero;
      if (init) {
        if (init.k === 'str') {
          if (elem !== 'char') throw new ErrorC('Solo un arreglo de char se puede iniciar con un texto', linea);
          if (init.v.length + 1 > n) throw new ErrorC('El texto "' + init.v + '" no cabe en el arreglo de ' + n + ' (necesita ' + (init.v.length + 1) + ' con el \\0)', linea);
          for (let i = 0; i < init.v.length; i++) a.data[i] = init.v.charCodeAt(i);
        } else if (init.k === 'lista') {
          if (init.items.length > n) throw new ErrorC('Pusiste más valores que el tamaño del arreglo (' + n + ')', linea);
          init.items.forEach((it, i) => { const v = convertir(evaluar(it, ambito), elem, linea); a.data[i] = elem === 'string' ? v : v.v; });
        } else throw new ErrorC('Un arreglo se inicia con llaves, por ejemplo {1, 2, 3}', linea);
      }
      return a;
    }
    function elemValor(a, x) { return a.elem === 'string' ? x : V(a.elem, x); }

    /* --- l-valores --- */
    function lvalor(n, ambito) {
      if (n.k === 'var') {
        const c = ambito.buscar(n.nombre);
        if (!c) throw new ErrorC('La variable "' + n.nombre + '" no existe. ¿La declaraste antes? ¿Está bien escrita?', n.linea);
        return { tipo: c.tipo, get: () => c.val, set: v => { if (c.const) throw new ErrorC('"' + n.nombre + '" es constante y no se puede cambiar', n.linea); c.val = v; }, celda: c };
      }
      if (n.k === 'indice') {
        const base = evaluar(n.a, ambito);
        const i = Math.trunc(num(evaluar(n.i, ambito), n.linea));
        if (base && base.t === 'arr') {
          if (i < 0 || i >= base.data.length) throw new ErrorC('Te saliste del arreglo: pediste la posición ' + i + ' pero solo hay de 0 a ' + (base.data.length - 1), n.linea);
          if (base.data[i] && base.data[i].t === 'arr') return { tipo: 'arr', get: () => base.data[i], set: () => { throw new ErrorC('No se puede asignar una fila completa', n.linea); } };
          return { tipo: base.elem, get: () => elemValor(base, base.data[i]), set: v => { base.data[i] = base.elem === 'string' ? v : v.v; } };
        }
        if (base && base.t === 'string') {
          const lv = lvalor(n.a, ambito);
          if (i < 0 || i >= base.v.length) throw new ErrorC('Te saliste del texto: posición ' + i + ' y el texto tiene ' + base.v.length + ' letras', n.linea);
          return { tipo: 'char', get: () => V('char', lv.get().v.charCodeAt(i)), set: v => { const s = lv.get().v; lv.set(V('string', s.slice(0, i) + String.fromCharCode(v.v) + s.slice(i + 1))); } };
        }
        throw new ErrorC('Solo se pueden usar corchetes [ ] con arreglos o textos', n.linea);
      }
      throw new ErrorC('Aquí se necesita una variable (por ejemplo x o v[i])', n.linea);
    }

    /* --- funciones de librería --- */
    function printf(args, linea) {
      if (!args.length) throw new ErrorC('printf necesita un texto entre comillas', linea);
      const fmt = textoDe(args[0], linea);
      let out = '', ai = 1;
      for (let i = 0; i < fmt.length; i++) {
        const c = fmt[i];
        if (c !== '%') { out += c; continue; }
        const m = /^%([-+ 0#]*)(\d+|\*)?(?:\.(\d*|\*))?(hh|h|ll|l|L)?([diufFeEgGxXcs%])/.exec(fmt.slice(i));
        if (!m) { out += c; continue; }
        i += m[0].length - 1;
        const conv = m[5];
        if (conv === '%') { out += '%'; continue; }
        const flags = m[1] || '';
        let ancho = m[2] === '*' ? num(args[ai++], linea) : (m[2] ? +m[2] : 0);
        let prec = m[3] === '*' ? num(args[ai++], linea) : (m[3] !== undefined ? (+m[3] || 0) : null);
        const a = args[ai++];
        if (a === undefined) throw new ErrorC('En printf, el formato %' + conv + ' no tiene un valor. Agrega la variable después de la coma.', linea);
        let s;
        if ('diuxX'.includes(conv)) {
          if (a.t === 'float' || a.t === 'double') throw new ErrorC('Usaste %' + conv + ' (entero) para mostrar un número con decimales. Usa %f, o convierte con (int).', linea);
          let x = Math.trunc(num(a, linea));
          if (conv === 'x' || conv === 'X') { s = (x >>> 0).toString(16); if (conv === 'X') s = s.toUpperCase(); }
          else if (conv === 'u') s = String(x >>> 0);
          else s = String(Math.abs(x));
          if (prec !== null) s = s.padStart(prec, '0');
          if ('di'.includes(conv)) s = (x < 0 ? '-' : flags.includes('+') ? '+' : flags.includes(' ') ? ' ' : '') + s;
        } else if ('fFeEgG'.includes(conv)) {
          if (!(a.t === 'float' || a.t === 'double')) {
            if (esNum(a)) throw new ErrorC('Usaste %' + conv + ' (decimal) para mostrar un número entero. Usa %d, o convierte con (float).', linea);
            num(a, linea);
          }
          const x = a.v;
          const p = prec === null ? 6 : prec;
          if (conv === 'f' || conv === 'F') s = Math.abs(x).toFixed(p);
          else if (conv === 'e' || conv === 'E') { s = fmtE(Math.abs(x), p); if (conv === 'E') s = s.toUpperCase(); }
          else { s = fmtG(Math.abs(x), p); if (conv === 'G') s = s.toUpperCase(); }
          const neg = x < 0 || Object.is(x, -0);
          s = (neg ? '-' : flags.includes('+') ? '+' : flags.includes(' ') ? ' ' : '') + s;
        } else if (conv === 'c') {
          s = String.fromCharCode(num(a, linea));
        } else {
          s = textoDe(a, linea);
          if (prec !== null) s = s.slice(0, prec);
        }
        if (s.length < ancho) {
          if (flags.includes('-')) s = s.padEnd(ancho);
          else if (flags.includes('0') && conv !== 's' && conv !== 'c') {
            const signo = /^[-+ ]/.test(s) ? s[0] : '';
            s = signo + s.slice(signo.length).padStart(ancho - signo.length, '0');
          } else s = s.padStart(ancho);
        }
        out += s;
      }
      escribir(out);
      return V('int', out.length);
    }
    function scanf(args, linea) {
      const fmt = textoDe(args[0], linea);
      let ai = 1, leidos = 0;
      for (let i = 0; i < fmt.length; i++) {
        const c = fmt[i];
        if (/\s/.test(c)) { saltarEspacios(); continue; }
        if (c !== '%') {
          saltarEspacios();
          if (entradaTxt[pos] === c) pos++;
          continue;
        }
        const m = /^%(\d+)?(hh|h|ll|l|L)?([dfisc])/.exec(fmt.slice(i));
        if (!m) continue;
        i += m[0].length - 1;
        const conv = m[3];
        const dest = args[ai++];
        if (!dest) throw new ErrorC('En scanf falta la variable para el formato %' + conv, linea);
        if (conv === 's') {
          if (dest.t !== 'arr' || dest.elem !== 'char') throw new ErrorC('Para %s en scanf se necesita un arreglo de char (y va sin &)', linea);
          const tok = leerToken('word', linea);
          if (tok.length + 1 > dest.data.length) throw new ErrorC('El texto "' + tok + '" no cabe en tu arreglo de ' + dest.data.length, linea);
          for (let k = 0; k < tok.length; k++) dest.data[k] = tok.charCodeAt(k);
          dest.data[tok.length] = 0;
          leidos++; continue;
        }
        if (dest.t !== 'ref') {
          throw new ErrorC('En scanf, la variable debe llevar & delante, por ejemplo: scanf("%' + conv + '", &x);', linea);
        }
        const lv = dest.lv;
        let val;
        if (conv === 'd' || conv === 'i') {
          if (lv.tipo === 'float' || lv.tipo === 'double') throw new ErrorC('Usaste %d para leer una variable decimal (float). Usa %f.', linea);
          val = V('int', parseInt(leerToken('int', linea), 10));
        } else if (conv === 'f') {
          if (ENTEROS.has(lv.tipo)) throw new ErrorC('Usaste %f para leer una variable entera (int). Usa %d.', linea);
          if (lv.tipo === 'double' && m[2] !== 'l') throw new ErrorC('Para leer una variable double en scanf usa %lf (para float se usa %f).', linea);
          if (lv.tipo === 'float' && m[2] === 'l') throw new ErrorC('Usaste %lf para leer un float. Para float se usa %f (y %lf es para double).', linea);
          val = V('double', parseFloat(leerToken('num', linea)));
        } else {
          val = V('char', leerToken('char1', linea).charCodeAt(0));
        }
        lv.set(convertir(val, lv.tipo, linea));
        leidos++;
      }
      return V('int', leidos);
    }
    function aCout(v, linea) {
      if (v && v.t === 'manip') {
        if (v.m === 'endl') escribir('\n');
        else if (v.m === 'fixed') cout.fixed = true;
        else if (v.m === 'setprecision') cout.prec = v.n;
        return;
      }
      if (v === undefined) throw new ErrorC('Esa función no devuelve nada (void), no se puede mostrar con cout', linea);
      if (v.t === 'string' || v.t === 'cstr') return escribir(v.v);
      if (v.t === 'arr') { if (v.elem === 'char') return escribir(textoDe(v, linea)); throw new ErrorC('Para mostrar un arreglo recórrelo con un for', linea); }
      if (v.t === 'char') return escribir(String.fromCharCode(v.v));
      if (v.t === 'float' || v.t === 'double') return escribir(cout.fixed ? v.v.toFixed(cout.prec) : fmtG(v.v, cout.prec));
      if (esNum(v)) return escribir(String(v.v));
      throw new ErrorC('cout no sabe mostrar este valor', linea);
    }
    function deCin(lv, linea) {
      const tp = lv.tipo;
      if (tp === 'string') { lv.set(V('string', leerToken('word', linea))); return; }
      if (tp === 'arr') {
        const a = lv.get();
        if (a.elem !== 'char') throw new ErrorC('cin no puede leer un arreglo completo; lee cada posición con un for', linea);
        const tok = leerToken('word', linea);
        for (let k = 0; k < tok.length; k++) a.data[k] = tok.charCodeAt(k);
        a.data[tok.length] = 0;
        return;
      }
      if (tp === 'char') { saltarEspacios(); lv.set(V('char', leerToken('char1', linea).charCodeAt(0))); return; }
      if (ENTEROS.has(tp)) { lv.set(convertir(V('int', parseInt(leerToken('int', linea), 10)), tp, linea)); return; }
      lv.set(convertir(V('double', parseFloat(leerToken('num', linea))), tp, linea));
    }
    function leerLinea(linea) {
      if (pos >= entradaTxt.length) faltaDato(linea);
      let fin = entradaTxt.indexOf('\n', pos);
      if (fin < 0) fin = entradaTxt.length;
      const s = entradaTxt.slice(pos, fin).replace(/\r$/, '');
      pos = fin + 1;
      eco(s);
      return s;
    }
    const mate = f => (args, linea) => V('double', f(...args.map(a => num(a, linea))));
    const LIB = {
      printf, scanf,
      puts: (a, l) => { escribir(textoDe(a[0], l) + '\n'); return V('int', 0); },
      putchar: (a, l) => { escribir(String.fromCharCode(num(a[0], l))); return V('int', 0); },
      getchar: () => { if (pos >= entradaTxt.length) return V('int', -1); return V('int', entradaTxt.charCodeAt(pos++)); },
      sqrt: mate(Math.sqrt), pow: mate(Math.pow), fabs: mate(Math.abs), round: mate(x => Math.sign(x) * Math.round(Math.abs(x))),
      ceil: mate(Math.ceil), floor: mate(Math.floor), sin: mate(Math.sin), cos: mate(Math.cos), tan: mate(Math.tan),
      log: mate(Math.log), log10: mate(Math.log10), exp: mate(Math.exp), trunc: mate(Math.trunc),
      abs: (a, l) => { const v = a[0]; return (v.t === 'float' || v.t === 'double') ? V(v.t, Math.abs(v.v)) : V('int', Math.abs(num(v, l))); },
      max: (a, l) => { const r = num(a[0], l) >= num(a[1], l) ? a[0] : a[1]; return convertir(r, tipoRes(a[0], a[1]), l); },
      min: (a, l) => { const r = num(a[0], l) <= num(a[1], l) ? a[0] : a[1]; return convertir(r, tipoRes(a[0], a[1]), l); },
      rand: () => { semilla = (Math.imul(semilla, 214013) + 2531011) | 0; return V('int', (semilla >>> 16) & 0x7fff); },
      srand: (a, l) => { semilla = Math.trunc(num(a[0], l)) | 0; },
      time: () => V('long', Math.floor(Date.now() / 1000)),
      system: (a, l) => { const c = textoDe(a[0], l).trim().toLowerCase(); if (c === 'cls' || c === 'clear') trozos.length = 0; return V('int', 0); },
      exit: (a, l) => { throw new Salida(a.length ? num(a[0], l) : 0); },
      strlen: (a, l) => V('int', textoDe(a[0], l).length),
      strcmp: (a, l) => { const x = textoDe(a[0], l), y = textoDe(a[1], l); return V('int', x === y ? 0 : x < y ? -1 : 1); },
      strcpy: (a, l) => { copiarTexto(a[0], textoDe(a[1], l), l); return a[0]; },
      strcat: (a, l) => { copiarTexto(a[0], textoDe(a[0], l) + textoDe(a[1], l), l); return a[0]; },
      toupper: (a, l) => V('int', String.fromCharCode(num(a[0], l)).toUpperCase().charCodeAt(0)),
      tolower: (a, l) => V('int', String.fromCharCode(num(a[0], l)).toLowerCase().charCodeAt(0)),
      isdigit: (a, l) => V('int', /\d/.test(String.fromCharCode(num(a[0], l))) ? 1 : 0),
      isalpha: (a, l) => V('int', /[A-Za-z]/.test(String.fromCharCode(num(a[0], l))) ? 1 : 0),
      setprecision: (a, l) => ({ t: 'manip', m: 'setprecision', n: num(a[0], l) }),
      to_string: (a, l) => { const v = a[0]; return V('string', (v.t === 'float' || v.t === 'double') ? v.v.toFixed(6) : String(num(v, l))); },
      string: (a, l) => V('string', a.length ? textoDe(a[0], l) : ''),
      fflush: () => V('int', 0)
    };
    function copiarTexto(dest, s, l) {
      if (!dest || dest.t !== 'arr' || dest.elem !== 'char') throw new ErrorC('El destino debe ser un arreglo de char', l);
      if (s.length + 1 > dest.data.length) throw new ErrorC('El texto "' + s + '" no cabe en el arreglo de ' + dest.data.length + ' (necesita ' + (s.length + 1) + ' con el \\0)', l);
      for (let k = 0; k < s.length; k++) dest.data[k] = s.charCodeAt(k);
      dest.data[s.length] = 0;
    }
    const CONST = {
      RAND_MAX: V('int', 32767), NULL: V('int', 0), EOF: V('int', -1), M_PI: V('double', Math.PI),
      INT_MAX: V('int', 2147483647), INT_MIN: V('int', -2147483648),
      endl: { t: 'manip', m: 'endl' }, fixed: { t: 'manip', m: 'fixed' },
      cout: { t: 'stream', s: 'cout' }, cin: { t: 'stream', s: 'cin' }, cerr: { t: 'stream', s: 'cout' },
      stdin: { t: 'stream', s: 'stdin' }
    };

    /* --- evaluación de expresiones --- */
    function evaluar(n, ambito) {
      switch (n.k) {
        case 'num': return V(n.tipo, n.v);
        case 'str': return V('cstr', n.v);
        case 'var': {
          const c = ambito.buscar(n.nombre);
          if (c) return c.val;
          if (CONST[n.nombre]) return CONST[n.nombre];
          if (FUNCS[n.nombre]) return { t: 'fn', f: FUNCS[n.nombre] };
          if (LIB[n.nombre]) return { t: 'lib', nombre: n.nombre };
          throw new ErrorC('La variable "' + n.nombre + '" no existe. ¿La declaraste antes? ¿Está bien escrita?', n.linea);
        }
        case 'asig': return asignar(n, ambito);
        case 'tern': return verdad(evaluar(n.c, ambito), n.linea) ? evaluar(n.a, ambito) : evaluar(n.b, ambito);
        case 'bin': return binaria(n, ambito);
        case 'un': {
          const v = evaluar(n.e, ambito);
          if (n.op === '!') return V('bool', verdad(v, n.linea) ? 0 : 1);
          const x = num(v, n.linea);
          const t = RANGO[v.t] < 2 ? 'int' : v.t;
          if (n.op === '-') return convertir(V(t, -x), t, n.linea);
          if (n.op === '+') return V(t, x);
          return V('int', ~x);
        }
        case 'pre': case 'post': {
          const lv = lvalor(n.e, ambito);
          const v = lv.get();
          const x = num(v, n.linea);
          const nv = convertir(V(v.t, n.op === '++' ? x + 1 : x - 1), lv.tipo, n.linea);
          lv.set(nv);
          return n.k === 'pre' ? nv : v;
        }
        case 'dir': {
          const lv = lvalor(n.e, ambito);
          const v = lv.get();
          if (v && v.t === 'arr') return v;
          return { t: 'ref', lv };
        }
        case 'cast': return convertir(evaluar(n.e, ambito), n.tipo, n.linea);
        case 'sizeof': {
          const v = evaluar(n.e, ambito);
          const tam = x => x.t === 'arr' ? x.data.reduce((a, e) => a + (e && e.t === 'arr' ? tam(e) : ({ double: 8, long: 8, char: 1, bool: 1 }[x.elem] || 4)), 0) : ({ double: 8, long: 8, char: 1, bool: 1 }[x.t] || 4);
          return V('int', tam(v));
        }
        case 'indice': return lvalor(n, ambito).get();
        case 'llamada': return llamar(n, ambito);
        case 'miembro': {
          const v = evaluar(n.obj, ambito);
          if (v && v.t === 'string') return { t: 'metodo', obj: n.obj, nombre: n.nombre, s: v.v };
          throw new ErrorC(NO_SOPORTA, n.linea);
        }
        case 'lambda': return { t: 'fn', f: { k: 'func', nombre: 'lambda', tipo: 'auto', params: n.params, cuerpo: n.cuerpo }, ambito };
        case 'lista': throw new ErrorC('Las llaves { } solo se usan para iniciar arreglos', n.linea);
      }
      throw new ErrorC('No sé evaluar esto', n.linea);
    }
    function verdad(v, linea) {
      if (v && (v.t === 'string' || v.t === 'cstr' || v.t === 'arr')) return true;
      return num(v, linea) !== 0;
    }
    function asignar(n, ambito) {
      const lv = lvalor(n.izq, ambito);
      if (lv.tipo === 'arr' || (lv.get() && lv.get().t === 'arr')) {
        throw new ErrorC('No se puede asignar a un arreglo completo con =. Para textos usa strcpy(destino, "texto"); para números, asigna cada posición.', n.linea);
      }
      let v = evaluar(n.der, ambito);
      if (n.op !== '=') v = operar(n.op.slice(0, -1), lv.get(), v, n.linea);
      const nv = convertir(v, lv.tipo, n.linea);
      lv.set(nv);
      return nv;
    }
    function binaria(n, ambito) {
      const op = n.op;
      if (op === '&&') { if (!verdad(evaluar(n.izq, ambito), n.linea)) return V('bool', 0); return V('bool', verdad(evaluar(n.der, ambito), n.linea) ? 1 : 0); }
      if (op === '||') { if (verdad(evaluar(n.izq, ambito), n.linea)) return V('bool', 1); return V('bool', verdad(evaluar(n.der, ambito), n.linea) ? 1 : 0); }
      const a = evaluar(n.izq, ambito);
      if (a && a.t === 'stream') {
        if (op === '<<' && a.s === 'cout') { aCout(evaluar(n.der, ambito), n.linea); return a; }
        if (op === '>>' && a.s === 'cin') { deCin(lvalor(n.der, ambito), n.linea); return a; }
        throw new ErrorC(a.s === 'cout' ? 'Con cout se usa << (las flechas van hacia cout)' : 'Con cin se usa >> (las flechas van hacia la variable)', n.linea);
      }
      const b = evaluar(n.der, ambito);
      return operar(op, a, b, n.linea);
    }
    function operar(op, a, b, linea) {
      const esTxt = x => x && (x.t === 'string' || x.t === 'cstr');
      if ((op === '==' || op === '!=') && ((a && a.t === 'arr') || (b && b.t === 'arr')) && ((a && a.t !== 'string') && (b && b.t !== 'string'))) {
        throw new ErrorC('Los textos de tipo char[] no se comparan con ==. Usa strcmp(a, b) == 0.', linea);
      }
      if ((a && a.t === 'string') || (b && b.t === 'string')) {
        const ta = a.t === 'char' ? String.fromCharCode(a.v) : textoDe(a, linea);
        const tb = b.t === 'char' ? String.fromCharCode(b.v) : textoDe(b, linea);
        switch (op) {
          case '+': return V('string', ta + tb);
          case '==': return V('bool', ta === tb ? 1 : 0);
          case '!=': return V('bool', ta !== tb ? 1 : 0);
          case '<': return V('bool', ta < tb ? 1 : 0);
          case '>': return V('bool', ta > tb ? 1 : 0);
          case '<=': return V('bool', ta <= tb ? 1 : 0);
          case '>=': return V('bool', ta >= tb ? 1 : 0);
        }
        throw new ErrorC('No se puede usar ' + op + ' con textos', linea);
      }
      if (esTxt(a) || esTxt(b)) {
        if (op === '+' ) throw new ErrorC('Para unir textos en C usa strcat, o usa el tipo string de C++', linea);
        throw new ErrorC('No se puede usar ' + op + ' con un texto', linea);
      }
      const x = num(a, linea), y = num(b, linea);
      const t = tipoRes(a, b);
      const entero = t === 'int' || t === 'long';
      switch (op) {
        case '+': return convertir(V(t, x + y), t, linea);
        case '-': return convertir(V(t, x - y), t, linea);
        case '*': return entero ? convertir(V(t, t === 'int' ? Math.imul(x, y) : x * y), t, linea) : convertir(V(t, x * y), t, linea);
        case '/':
          if (entero) {
            if (y === 0) throw new ErrorC('División para cero: no se puede dividir un número para 0', linea);
            return convertir(V(t, Math.trunc(x / y)), t, linea);
          }
          return convertir(V(t, x / y), t, linea);
        case '%':
          if (!entero) throw new ErrorC('El operador % (residuo) solo funciona con números enteros (int)', linea);
          if (y === 0) throw new ErrorC('Residuo para cero: no se puede usar % 0', linea);
          return V(t, x % y);
        case '<': return V('bool', x < y ? 1 : 0);
        case '>': return V('bool', x > y ? 1 : 0);
        case '<=': return V('bool', x <= y ? 1 : 0);
        case '>=': return V('bool', x >= y ? 1 : 0);
        case '==': return V('bool', x === y ? 1 : 0);
        case '!=': return V('bool', x !== y ? 1 : 0);
        case '&': return V('int', x & y);
        case '|': return V('int', x | y);
        case '^': return V('int', x ^ y);
        case '<<': return V('int', x << y);
        case '>>': return V('int', x >> y);
      }
      throw new ErrorC('Operador desconocido ' + op, linea);
    }

    function llamar(n, ambito) {
      // llamada a método de string
      if (n.f.k === 'miembro') {
        const obj = evaluar(n.f.obj, ambito);
        if (!obj || obj.t !== 'string') throw new ErrorC(NO_SOPORTA, n.linea);
        const args = n.args.map(a => evaluar(a, ambito));
        const s = obj.v;
        switch (n.f.nombre) {
          case 'length': case 'size': return V('int', s.length);
          case 'empty': return V('bool', s.length ? 0 : 1);
          case 'substr': { const a = num(args[0], n.linea); const b = args.length > 1 ? num(args[1], n.linea) : undefined; return V('string', s.substr(a, b)); }
          case 'find': { const x = args[0].t === 'char' ? String.fromCharCode(args[0].v) : textoDe(args[0], n.linea); return V('int', s.indexOf(x)); }
          case 'at': { const i = num(args[0], n.linea); if (i < 0 || i >= s.length) throw new ErrorC('Te saliste del texto', n.linea); return V('char', s.charCodeAt(i)); }
          case 'c_str': return V('cstr', s);
        }
        throw new ErrorC('El texto (string) no tiene la función ' + n.f.nombre + '()', n.linea);
      }
      if (n.f.k === 'var' && n.f.nombre === 'getline') {
        const dest = lvalor(n.args[1], ambito);
        dest.set(convertir(V('string', leerLinea(n.linea)), dest.tipo === 'arr' ? 'string' : dest.tipo, n.linea));
        return CONST.cin;
      }
      if (n.f.k === 'var' && n.f.nombre === 'fgets') {
        const dest = evaluar(n.args[0], ambito);
        const s = leerLinea(n.linea);
        copiarTexto(dest, (s + '\n').slice(0, Math.max(0, num(evaluar(n.args[1], ambito), n.linea) - 1)), n.linea);
        return dest;
      }
      const f = evaluar(n.f, ambito);
      if (f && f.t === 'lib') {
        const args = n.args.map(a => evaluar(a, ambito));
        return LIB[f.nombre](args, n.linea);
      }
      if (!f || f.t !== 'fn') throw new ErrorC('"' + (n.f.nombre || 'eso') + '" no es una función', n.linea);
      const fn = f.f;
      if (n.args.length !== fn.params.length) {
        throw new ErrorC('La función ' + fn.nombre + ' necesita ' + fn.params.length + ' dato(s) y le enviaste ' + n.args.length, n.linea);
      }
      const nuevo = new Ambito(f.ambito || GLOBAL);
      fn.params.forEach((pm, i) => {
        if (pm.ref) {
          const lv = lvalor(n.args[i], ambito);
          nuevo.vars.set(pm.nombre, { tipo: lv.tipo, get val() { return lv.get(); }, set val(v) { lv.set(v); } });
        } else if (pm.arr) {
          const v = evaluar(n.args[i], ambito);
          if (!v || v.t !== 'arr') throw new ErrorC('El parámetro "' + pm.nombre + '" espera un arreglo', n.linea);
          nuevo.vars.set(pm.nombre, { tipo: 'arr', val: v });
        } else {
          const v = evaluar(n.args[i], ambito);
          nuevo.vars.set(pm.nombre, { tipo: pm.tipo, val: convertir(v, pm.tipo, n.linea) });
        }
      });
      if (++profundidad > 3000) throw new ErrorC('Demasiadas llamadas seguidas. ¿A tu función recursiva le falta el caso base?', n.linea);
      try {
        const r = ejecBloque(fn.cuerpo.cuerpo, nuevo);
        if (r instanceof Retorno) {
          if (fn.tipo === 'void') return undefined;
          return fn.tipo === 'auto' ? r.v : convertir(r.v, fn.tipo, n.linea);
        }
        if (fn.tipo !== 'void' && fn.tipo !== 'auto' && fn.nombre !== 'main') return convertir(V('int', 0), fn.tipo, n.linea);
        return undefined;
      } finally {
        profundidad--;
      }
    }

    /* --- sentencias --- */
    function declarar(d, ambito) {
      for (const v of d.vars) {
        if (ambito.vars.has(v.nombre) && ambito !== GLOBAL) throw new ErrorC('La variable "' + v.nombre + '" ya fue declarada antes', v.linea);
        if (v.dims.length) {
          const a = arreglo(v.dims, d.tipo, v.init, v.linea, ambito);
          ambito.vars.set(v.nombre, { tipo: 'arr', val: a });
        } else {
          let val;
          if (v.init) {
            const x = evaluar(v.init, ambito);
            val = convertir(x, d.tipo === 'auto' ? null : d.tipo, v.linea);
          } else {
            val = d.tipo === 'string' ? V('string', '') : d.tipo === 'auto' ? V('int', 0) : convertir(V('int', 0), d.tipo, v.linea);
          }
          ambito.vars.set(v.nombre, { tipo: d.tipo === 'auto' ? (val && val.t) || 'auto' : d.tipo, val });
        }
      }
    }
    function ejecBloque(lista, ambito) {
      for (const s of lista) {
        const r = ejec(s, ambito);
        if (r) return r;
      }
      return null;
    }
    function ejec(s, ambito) {
      paso(s.linea);
      switch (s.k) {
        case 'bloque': return ejecBloque(s.cuerpo, new Ambito(ambito));
        case 'vacio': return null;
        case 'decl': declarar(s, ambito); return null;
        case 'expr': evaluar(s.e, ambito); return null;
        case 'if':
          if (verdad(evaluar(s.c, ambito), s.linea)) return ejec(s.si, new Ambito(ambito));
          if (s.no) return ejec(s.no, new Ambito(ambito));
          return null;
        case 'while':
          while (verdad(evaluar(s.c, ambito), s.linea)) {
            paso(s.linea);
            const r = ejec(s.cuerpo, new Ambito(ambito));
            if (r === BRK) break;
            if (r && r !== CONT) return r;
          }
          return null;
        case 'dowhile':
          do {
            paso(s.linea);
            const r = ejec(s.cuerpo, new Ambito(ambito));
            if (r === BRK) break;
            if (r && r !== CONT) return r;
          } while (verdad(evaluar(s.c, ambito), s.linea));
          return null;
        case 'for': {
          const a = new Ambito(ambito);
          if (s.ini) { if (s.ini.k === 'decl') declarar(s.ini, a); else s.ini.es.forEach(e => evaluar(e, a)); }
          while (!s.c || verdad(evaluar(s.c, a), s.linea)) {
            paso(s.linea);
            const r = ejec(s.cuerpo, new Ambito(a));
            if (r === BRK) break;
            if (r && r !== CONT) return r;
            if (s.inc) s.inc.forEach(e => evaluar(e, a));
          }
          return null;
        }
        case 'forrango': {
          const col = evaluar(s.col, ambito);
          let items;
          if (col && col.t === 'arr') items = col.data.map(x => elemValor(col, x));
          else if (col && (col.t === 'string' || col.t === 'cstr')) items = Array.from(col.v).map(ch => V('char', ch.charCodeAt(0)));
          else throw new ErrorC(NO_SOPORTA, s.linea);
          for (const it of items) {
            paso(s.linea);
            const a = new Ambito(ambito);
            a.vars.set(s.nombre, { tipo: s.tipo === 'auto' ? it.t : s.tipo, val: s.tipo === 'auto' ? it : convertir(it, s.tipo, s.linea) });
            const r = ejec(s.cuerpo, a);
            if (r === BRK) break;
            if (r && r !== CONT) return r;
          }
          return null;
        }
        case 'switch': {
          const v = num(evaluar(s.e, ambito), s.linea);
          let ini = -1;
          for (let i = 0; i < s.items.length; i++) {
            const it = s.items[i];
            if (it.k === 'case' && num(evaluar(it.e, ambito), it.linea) === v) { ini = i; break; }
          }
          if (ini < 0) ini = s.items.findIndex(it => it.k === 'default');
          if (ini < 0) return null;
          const a = new Ambito(ambito);
          for (let i = ini; i < s.items.length; i++) {
            const it = s.items[i];
            if (it.k === 'case' || it.k === 'default') continue;
            const r = ejec(it, a);
            if (r === BRK) break;
            if (r) return r;
          }
          return null;
        }
        case 'break': return BRK;
        case 'continue': return CONT;
        case 'return': return new Retorno(s.e ? evaluar(s.e, ambito) : undefined);
        case 'throw': throw new Lanzado(evaluar(s.e, ambito), s.linea);
        case 'try':
          try {
            const r = ejec(s.cuerpo, new Ambito(ambito));
            return r;
          } catch (e) {
            if (!(e instanceof Lanzado)) throw e;
            const c = s.capturas[0];
            const a = new Ambito(ambito);
            if (c.nombre) a.vars.set(c.nombre, { tipo: c.tipo || 'auto', val: e.v });
            return ejec(c.cuerpo, a);
          }
      }
      throw new ErrorC('No sé ejecutar esto', s.linea);
    }

    /* --- arranque --- */
    let GLOBAL, FUNCS;
    let codigoSalida = 0;
    try {
      const ast = parse(lex(String(codigo || '')));
      FUNCS = ast.funcs;
      GLOBAL = new Ambito(null);
      ast.globales.forEach(d => declarar(d, GLOBAL));
      if (!FUNCS.main) throw new ErrorC('Tu programa necesita la función principal: int main(){ ... }', 1);
      const r = ejecBloque(FUNCS.main.cuerpo.cuerpo, new Ambito(GLOBAL));
      if (r instanceof Retorno && r.v) codigoSalida = num(r.v, 0);
      cerrarEco();
      return { ok: true, trozos, salida: textoSalida(), codigo: codigoSalida, pasos, ms: Date.now() - inicio };
    } catch (e) {
      cerrarEco();
      if (e instanceof Salida) return { ok: true, trozos, salida: textoSalida(), codigo: e.c, pasos, ms: Date.now() - inicio };
      let msg, linea;
      if (e instanceof ErrorC) { msg = e.message; linea = e.linea; }
      else if (e instanceof Lanzado) { msg = 'Se lanzó una excepción (throw) que nadie atrapó con catch: ' + (e.v && (e.v.t === 'cstr' || e.v.t === 'string') ? '"' + e.v.v + '"' : (e.v ? e.v.v : '')); linea = e.linea; }
      else if (e instanceof RangeError) { msg = 'Tu función se llamó a sí misma demasiadas veces (más de unas 1000). Si es recursiva, revisa el caso base; para números muy grandes usa un bucle.'; }
      else { msg = 'Error interno del intérprete: ' + (e && e.message); }
      return { ok: false, error: msg, linea: linea || null, trozos, salida: textoSalida(), pasos, ms: Date.now() - inicio };
    }
    function cerrarEco() { const u = trozos[trozos.length - 1]; if (u && u.t === 'in' && !u.cerrado) { u.s += '\n'; u.cerrado = true; } }
    function textoSalida() { return trozos.filter(t => t.t === 'out').map(t => t.s).join(''); }
  }

  /* ---------------- Revisar la salida de un reto ---------------- */
  function normalizar(s) {
    return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  }
  function verificar(salida, caso) {
    const txt = normalizar(salida);
    // números del texto (se ignoran los que van seguidos de ":" porque suelen ser parte de un mensaje, como "Nota 1:")
    const numeros = [];
    const re = /-?\d+(?:\.\d+)?/g;
    let m;
    while ((m = re.exec(txt))) {
      const antes = txt[m.index - 1] || '';
      if (/[a-z_]/.test(antes)) continue;               // parte de una palabra (ej. "e1")
      if (/^\s*:/.test(txt.slice(m.index + m[0].length))) continue;
      numeros.push({ v: parseFloat(m[0]), i: m.index, fin: m.index + m[0].length });
    }
    let cursor = 0;
    for (const esp of caso.esperado || []) {
      if (/^-?\d+(\.\d+)?$/.test(esp)) {
        const val = parseFloat(esp);
        const tol = esp.includes('.') ? 0.011 : 0.000001;
        const n = numeros.find(x => x.i >= cursor && Math.abs(x.v - val) <= tol);
        if (!n) return { ok: false, falta: esp };
        cursor = n.fin;
      } else {
        const t = normalizar(esp).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const r = new RegExp('(^|[^a-z0-9])' + t + '(?![a-z0-9])', 'g');
        r.lastIndex = Math.max(0, cursor - 1);
        const x = r.exec(txt);
        if (!x) return { ok: false, falta: esp };
        cursor = x.index + x[0].length;
      }
    }
    for (const no of caso.no || []) {
      const t = normalizar(no).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      if (new RegExp('(^|[^a-z0-9])' + t + '(?![a-z0-9])').test(txt)) return { ok: false, sobra: no };
    }
    return { ok: true };
  }

  global.MiniC = { ejecutar, verificar, NO_SOPORTA };
  if (typeof module !== 'undefined' && module.exports) module.exports = global.MiniC;
})(typeof window !== 'undefined' ? window : globalThis);
