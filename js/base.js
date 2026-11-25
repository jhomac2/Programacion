/* =========================================================
   CodeAndes · base.js
   Ayudantes para escribir las lecciones de forma corta.
   ---------------------------------------------------------
   Cómo se arma un ejercicio:
   mc(pregunta, [opciones], índiceCorrecto, explicación, código?)
   vf(pregunta, true/false, explicación, código?)
   completa(pregunta, códigoCon___, [opciones], [respuestas], explicación)
   ordena(pregunta, [líneas en el orden correcto], explicación)
   escribe(pregunta, código, [respuestas válidas], explicación)
   ========================================================= */
window.CURSO = window.CURSO || [];

/* C`...` guarda el código tal cual (así "\n" no se convierte en salto de línea) */
const C = String.raw;

function mc(q, opciones, correcta, explica, code) {
  return { tipo: 'mc', q, opciones, correcta, explica, code: code || null };
}
function vf(q, verdad, explica, code) {
  return { tipo: 'mc', q, opciones: ['Verdadero', 'Falso'], correcta: verdad ? 0 : 1, explica, code: code || null, fijo: true };
}
function completa(q, code, opciones, respuestas, explica) {
  return { tipo: 'fill', q, code, opciones, respuestas, explica };
}
function ordena(q, lineas, explica) {
  return { tipo: 'order', q, lineas, explica };
}
function escribe(q, code, respuestas, explica) {
  return { tipo: 'write', q, code: code || null, respuestas, explica };
}
