# 🦅 CodeAndes · Aprende C++ desde cero

Curso de **C++ estilo juego** (tipo Duolingo) para aprender programación desde lo más básico hasta nivel avanzado.
Funciona **con o sin internet**, en celular y en PC, y guarda tu avance en tu propio dispositivo.

> Las Etapas 1, 2 y 3 siguen el sílabo de **Fundamentos de Programación** (lógica, estructuras de control, funciones).
> Las Etapas 4 a 7 te llevan a nivel intermedio, avanzado, estructuras de datos y un proyecto final que se sube a GitHub.

---

## ✨ Qué tiene

- 🗺️ **7 etapas, 58 lecciones y 344 ejercicios**, del "¿qué es programar?" hasta clases, punteros, STL, pilas, colas, listas y árboles
- 🎮 Ejercicios de 4 tipos: **opción múltiple**, **completar el código**, **ordenar líneas** y **¿qué imprime?**
- 📝 **Examen por etapa** (necesitas 70% para avanzar). Si ya sabes el tema, puedes dar el examen y **saltar la etapa**
- 💻 **58 retos de programación**, uno por lección, con su solución (todas probadas y compiladas con g++)
- 📱 **Programa desde el celular:** editor de código con teclado de símbolos y un intérprete de C/C++ propio que corre **sin internet** (Etapas 1 a 3, cin/cout y string)
- 🤖 **Los retos se revisan solos:** tu programa se prueba con datos de ejemplo. Si lo hiciste en Code::Blocks, pegas lo que mostró y la app lo revisa
- 🔒 **Retos obligatorios** (se puede apagar): para dar el examen de una etapa hay que aprobar sus retos
- 🧪 **Laboratorio libre** para escribir y ejecutar cualquier programa
- 🦅 **Mascota que evoluciona** con cada etapa aprobada (cóndor, dragón o felino)
- 🔥 Racha diaria, ⚡ XP, ❤️ vidas (se pueden apagar), 🎯 meta diaria y 🏅 logros
- 🔁 **Repaso de errores**: lo que fallas se guarda para practicarlo
- 📒 **Apuntes**: resumen de cada lección para estudiar antes del examen
- 🌙 Modo oscuro y sonidos
- 💾 **Respaldo**: descarga un archivo o copia un código para pasar tu avance a otro celular o PC
- 📶 **Sin internet**: se instala como app desde GitHub Pages o se abre directo desde la carpeta descargada

## 📚 Temario

| Etapa | Tema | Lecciones |
|---|---|---|
| 1 | Lógica de programación *(Unidad 1 del sílabo)* | Qué es programar y paradigmas, algoritmos, pseudocódigo y DFD, primer programa, variables, printf y scanf, conversión de tipos, operadores, `math.h`, comparación y lógicos, arreglos y colecciones |
| 2 | Estructuras de control *(Unidad 2)* | if, if else, switch, for, while, do while, contadores y acumuladores, `stdlib.h` y números al azar, arreglos, matrices, cadenas, `string.h`, errores y depuración, excepciones |
| 3 | Funciones y procedimientos *(Unidad 3)* | Funciones, parámetros y return, procedimientos, variables locales y globales, lambdas, recursividad |
| 4 | Intermedio | cin y cout, string, struct, archivos, ordenamiento burbuja, búsqueda lineal y binaria |
| 5 | Avanzado | Punteros, memoria dinámica, clases y objetos, encapsulamiento, herencia, polimorfismo, vector, map, sort, plantillas |
| 6 | Estructuras de datos | Big O, pilas, colas, listas enlazadas, árboles binarios |
| 7 | Proyecto final | Sistema de ventas con clases, IVA, excepciones y archivos + subirlo a GitHub + examen final |

## 🚀 Cómo usarlo

**En línea (recomendado):** entra a la página de GitHub Pages del repositorio. La primera vez que la abres se guarda sola para usarla sin internet. En el celular, desde el menú del navegador elige **"Agregar a pantalla de inicio"** o **"Instalar app"**.

**Sin internet, desde la PC:** descarga el repositorio (**Code → Download ZIP**), descomprímelo y abre `index.html` con Chrome, Edge o Firefox.

## 💻 Prácticas: cómo se revisan los retos

| Dónde lo haces | Cómo se revisa |
|---|---|
| **En la app** (📱 Programar aquí) | Tocas **Comprobar reto** y la app ejecuta tu programa con datos de prueba |
| **En Code::Blocks** o **Cxxdroid** (celular Android) | Ejecutas tu programa con los datos que indica el reto y pegas lo que mostró la pantalla |
| **En DFD** | Ejecutas el diagrama con el dato de prueba y escribes el resultado |
| Retos abiertos (algoritmo en el cuaderno, GitHub, números al azar) | Los marcas tú con **Ya lo hice** |

El intérprete de la app (`js/minic.js`) ejecuta lo de las Etapas 1 a 3 (variables, printf/scanf, if, switch, bucles, arreglos, matrices, cadenas, math.h, stdlib.h, funciones, recursividad, lambdas, excepciones) y también cin, cout y string. Las clases, punteros, archivos, vector, map, pilas y colas se hacen en Code::Blocks o Cxxdroid y se revisan pegando la salida. Además, explica los errores en español: falta de `;`, `&` en scanf, divisiones para cero, salirse del arreglo, bucles infinitos, etc.

## 💾 Pasar tu avance a otro dispositivo

1. En el dispositivo viejo: **Perfil → Descargar archivo de respaldo** (incluye tus retos y tu código) (o **Copiar código de respaldo** y envíatelo por WhatsApp).
2. En el dispositivo nuevo: **Perfil → Cargar archivo de respaldo** (o **Pegar código de respaldo**).
3. ¡Listo! Sigues justo donde te quedaste.

> Tu avance se guarda solo en el navegador de cada dispositivo. Si borras los datos del navegador, se pierde: haz respaldos seguido.

## 🌐 Publicarlo en GitHub Pages

1. Crea un repositorio (por ejemplo `CodeAndes`) y sube **todos** los archivos y carpetas tal como están.
2. Entra a **Settings → Pages**.
3. En **Source** elige **Deploy from a branch**, rama `main` y carpeta `/ (root)`. Guarda.
4. En un par de minutos estará en `https://TU-USUARIO.github.io/CodeAndes/`.

## 🛠️ Cómo agregar o cambiar lecciones

El contenido está en `js/etapa1.js` … `js/etapa7.js`. Cada ejercicio se escribe en una línea con estos ayudantes (están en `js/base.js`):

```js
mc('Pregunta', ['opción correcta', 'opción 2', 'opción 3'], 0, 'Explicación')   // opción múltiple (0 = la primera es la correcta)
vf('Afirmación', true, 'Explicación')                                         // verdadero o falso
completa('Pregunta', C`codigo con ___`, ['opciones'], ['respuestas'], 'Explicación')
ordena('Pregunta', ['línea 1', 'línea 2', 'línea 3'], 'Explicación')          // en el orden correcto
escribe('Pregunta', C`codigo`, ['respuesta'], 'Explicación')                  // ¿qué imprime?
```

Los datos para revisar cada reto están en `js/pruebas.js`.

Después de cambiar algo, abre `sw.js` y sube el número de `VERSION` (por ejemplo `codeandes-v2`) para que todos reciban la actualización. **El avance de los estudiantes no se borra.**

## 📁 Estructura

```
index.html              → diseño y pantallas
manifest.webmanifest    → para instalar como app
sw.js                   → modo sin internet
icons/                  → íconos de la app
js/base.js              → ayudantes para escribir ejercicios
js/etapa1.js … etapa7.js→ contenido del curso
js/pruebas.js           → datos para revisar los retos
js/minic.js             → intérprete de C/C++ (funciona sin internet)
js/app.js               → motor del juego (progreso, vidas, respaldo…)
```

---

👤 **Autor:** Jhordy Cabascango · 🎵 TikTok [@jhordycabascango21](https://www.tiktok.com/@jhordycabascango21)
