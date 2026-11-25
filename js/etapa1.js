/* ===================== ETAPA 1 · Lógica de programación (Unidad 1 del sílabo) ===================== */
CURSO.push({
  id: 'e1', nombre: 'Lógica de programación', etiqueta: 'Unidad 1 del sílabo',
  color: '#1CB0F6', sombra: '#1899D6', medalla: '🧠', logro: 'Mente lógica',
  lecciones: [

    /* ---------- 1 ---------- */
    {
      id: 'e1l1', titulo: '¿Qué es programar?', icono: '💡', desc: 'Programar, paradigmas y herramientas.',
      teoria: [
        { h: 'Programar es dar instrucciones', p: 'Una computadora no piensa sola: hace **exactamente** lo que le dices. Programar es escribirle instrucciones paso a paso, como una receta de cocina.\n\nEsas instrucciones se escriben en un **lenguaje de programación**. En este curso usamos **C++**.' },
        { h: 'Paradigmas (en corto)', p: 'Un **paradigma** es una forma de organizar un programa. Los 3 más conocidos:\n\n• **Imperativo:** das órdenes paso a paso. Es lo primero que harás en C++.\n• **Orientado a objetos:** organizas todo en "objetos", como un Estudiante o un Producto (lo ves en la Etapa 5).\n• **Funcional:** armas el programa con funciones que reciben datos y devuelven resultados.\n\nC++ permite usar los tres.' },
        { h: 'Tus herramientas', p: '• **DFD:** programa para dibujar diagramas de flujo.\n• **Code::Blocks:** donde escribes y ejecutas tu código. Es un **IDE** (entorno de desarrollo): editor + compilador + depurador en un solo programa.\n• **Compilador:** traduce tu código al idioma de la máquina. Code::Blocks usa uno llamado **GCC** (MinGW en Windows).' }
      ],
      ejercicios: [
        mc('¿Qué es programar?', ['Darle instrucciones paso a paso a la computadora', 'Arreglar computadoras dañadas', 'Usar redes sociales', 'Instalar programas'], 0, 'Programar es escribir instrucciones claras para que la computadora las ejecute.'),
        vf('La computadora entiende lo que quisiste decir aunque te expliques mal.', false, 'La computadora hace **exactamente** lo que escribes, ni más ni menos.'),
        mc('¿Qué paradigma organiza el programa en objetos como "Estudiante" o "Producto"?', ['Orientado a objetos', 'Imperativo', 'Funcional', 'Secuencial'], 0, 'En la programación orientada a objetos todo gira alrededor de objetos.'),
        mc('En el paradigma **imperativo**...', ['Das órdenes paso a paso', 'Solo usas dibujos', 'No hay instrucciones', 'Todo son objetos'], 0, 'Imperativo viene de "imperar", dar órdenes.'),
        mc('¿Para qué sirve el **compilador**?', ['Traduce tu código al idioma de la máquina', 'Dibuja diagramas de flujo', 'Conecta a internet', 'Guarda tus archivos en la nube'], 0, 'Sin compilador, la computadora no entendería tu código C++.'),
        mc('¿Qué es Code::Blocks?', ['Un IDE para escribir y ejecutar código C++', 'Un lenguaje de programación', 'Un antivirus', 'Una red social'], 0, 'IDE = entorno de desarrollo: editor, compilador y depurador juntos.')
      ],
      reto: {
        enunciado: 'Abre Code::Blocks y crea un proyecto: **File → New → Project → Console application → C++**. Ejecútalo con **F9**. ¡Tu primer programa corriendo! (En la lección 4 lo vas a escribir con `printf`, como en clase).',
        solucion: C`// Code::Blocks crea algo parecido a esto:
#include <iostream>
using namespace std;

int main()
{
    cout << "Hello world!" << endl;
    return 0;
}`
      },
      resumen: [
        'Programar = dar instrucciones paso a paso a la computadora.',
        'Paradigmas: **imperativo** (órdenes), **orientado a objetos** (objetos), **funcional** (funciones).',
        '**Code::Blocks** es un IDE: editor + compilador + depurador.',
        'El **compilador** traduce tu código al lenguaje de la máquina.'
      ]
    },

    /* ---------- 2 ---------- */
    {
      id: 'e1l2', titulo: 'Algoritmos', icono: '🧭', desc: 'Qué es un algoritmo y sus características.',
      teoria: [
        { h: '¿Qué es un algoritmo?', p: 'Es una **lista de pasos ordenados** para resolver un problema. Es lo que piensas **antes** de programar.\n\nEjemplo, preparar un café:\n1. Hervir el agua\n2. Poner café en la taza\n3. Echar el agua caliente\n4. Mover con la cuchara' },
        { h: 'Características', p: 'Un buen algoritmo es:\n\n• **Preciso:** cada paso es claro, sin dudas.\n• **Ordenado:** los pasos van en secuencia.\n• **Finito:** siempre termina.\n• **Definido:** con los mismos datos, da el mismo resultado.\n\nY casi siempre tiene 3 partes: **Entrada** (datos) → **Proceso** (cálculos) → **Salida** (resultado).' }
      ],
      ejercicios: [
        mc('¿Qué es un algoritmo?', ['Una lista de pasos ordenados para resolver un problema', 'Un tipo de computadora', 'Un error del programa', 'Un virus'], 0, ''),
        vf('Un algoritmo puede repetirse para siempre sin terminar.', false, 'Debe ser **finito**: siempre tiene un final.'),
        ordena('Ordena el algoritmo para sacar el promedio de 2 notas:', ['Inicio', 'Pedir nota1 y nota2', 'promedio = (nota1 + nota2) / 2', 'Mostrar promedio', 'Fin'], 'Entrada → proceso → salida.'),
        mc('En un algoritmo para sumar dos números, "pedir los dos números" es la...', ['Entrada', 'Salida', 'Proceso', 'Condición'], 0, 'Los datos que recibes son la entrada.'),
        mc('Si un algoritmo da resultados distintos con los mismos datos, no es...', ['Definido', 'Finito', 'Ordenado', 'Largo'], 0, 'Definido = mismos datos, mismo resultado.'),
        ordena('Ordena el algoritmo para comprar una cola en la tienda:', ['Ir a la tienda', 'Pedir la cola', 'Pagar con un billete de 1 dólar', 'Recibir el vuelto', 'Regresar a casa'], 'El orden importa: no puedes recibir el vuelto antes de pagar.')
      ],
      reto: {
        enunciado: 'En tu cuaderno, escribe un algoritmo para calcular cuánto pagas por 3 cuadernos de $1.50 cada uno. Marca cuál es la **entrada**, el **proceso** y la **salida**.',
        solucion: C`Inicio
  Entrada: cantidad = 3, precio = 1.50
  Proceso: total = cantidad * precio
  Salida:  mostrar total   (4.50 dólares)
Fin`
      },
      resumen: [
        'Algoritmo = pasos **ordenados** para resolver un problema.',
        'Características: **preciso, ordenado, finito y definido**.',
        'Partes: **Entrada → Proceso → Salida**.'
      ]
    },

    /* ---------- 3 ---------- */
    {
      id: 'e1l3', titulo: 'Pseudocódigo y DFD', icono: '🗺️', desc: 'Escribir y dibujar algoritmos.',
      teoria: [
        { h: 'Pseudocódigo', p: 'Es escribir el algoritmo **con palabras sencillas**, parecido a un programa pero en español. No se ejecuta: sirve para planear.', code: C`Inicio
  Leer nota1, nota2
  promedio <- (nota1 + nota2) / 2
  Escribir "Promedio: ", promedio
Fin`, p2: 'La flecha `<-` significa **asignar**: guardar un valor en una variable.' },
        { h: 'Símbolos del DFD', p: '• **Óvalo / círculo:** Inicio y Fin\n• **Rectángulo:** proceso o asignación (`suma ← a+b`)\n• **Trapecio:** leer un dato (entrada)\n• **Forma de pantalla:** mostrar un dato (salida)\n• **Rombo:** decisión (sí / no)\n• **Flechas:** el orden de los pasos' },
        { h: 'Truco del programa DFD', p: 'En DFD los textos van entre **comillas simples** y las variables **sin comillas**:', code: C`'La suma es ', suma`, p2: 'Lo que está entre comillas se muestra tal cual; `suma` sin comillas muestra el valor guardado. Y siempre: **primero muestras el mensaje** ("Ingrese un número") y **después lees** el dato.' }
      ],
      ejercicios: [
        mc('¿Qué símbolo del DFD se usa para tomar una decisión?', ['Rombo', 'Rectángulo', 'Óvalo', 'Trapecio'], 0, 'El rombo tiene dos salidas: sí y no.'),
        mc('¿Qué símbolo se usa para Inicio y Fin?', ['Óvalo (círculo)', 'Rombo', 'Rectángulo', 'Flecha'], 0, ''),
        mc('En el programa DFD, ¿cuál muestra bien el resultado de la variable `suma`?', ["'La suma es ', suma", "'La suma es suma'", "\"La suma es \", 'suma'", 'La suma es, suma'], 0, 'Texto entre comillas simples, una coma, y la variable sin comillas.'),
        vf('El pseudocódigo se puede ejecutar directamente en la computadora.', false, 'Es solo para planear con palabras. Después se pasa a un lenguaje como C++.'),
        mc('En pseudocódigo, `total <- precio * 2` significa...', ['Guardar en total el resultado de precio * 2', 'Comparar si total es menor que precio', 'Mostrar la palabra total', 'Borrar la variable total'], 0, '`<-` es asignar.'),
        ordena('Ordena el DFD para sumar dos números:', ['Inicio', "'Ingrese el primer número'", 'Leer a', "'Ingrese el segundo número'", 'Leer b', 'suma ← a + b', "'La suma es ', suma", 'Fin'], 'Primero el mensaje y después leer el dato.')
      ],
      reto: {
        enunciado: 'Haz en el programa DFD un diagrama que pida el precio de un producto y muestre el precio con IVA (15%).',
        solucion: C`Inicio
'Ingrese el precio'
Leer precio
total ← precio * 1.15
'Precio con IVA: ', total
Fin`
      },
      resumen: [
        '**Pseudocódigo:** el algoritmo escrito en palabras sencillas. `<-` = asignar.',
        '**DFD:** óvalo (inicio/fin), rectángulo (proceso), trapecio (leer), pantalla (mostrar), rombo (decisión).',
        "En DFD: `'texto', variable` con comillas **simples**.",
        'Primero el mensaje, después leer el dato.'
      ]
    },

    /* ---------- 4 ---------- */
    {
      id: 'e1l4', titulo: 'Tu primer programa', icono: '🚀', desc: 'Estructura de un programa en C++.',
      teoria: [
        { h: 'Las partes de un programa', p: 'Todo programa tiene esta estructura. Las instrucciones van **dentro de las llaves** `{ }` de `main`.', code: C`#include<stdio.h>                 // trae printf y scanf
int main(){                       // aquí empieza el programa
    printf("Hola, Ecuador\n");    // muestra un mensaje
    return 0;                     // fin: todo salió bien
}` },
        { h: 'Detalles importantes', p: '• Cada instrucción termina en **punto y coma** `;`\n• `\\n` hace un **salto de línea**\n• `//` es un **comentario**: la computadora lo ignora, sirve para explicar\n• `main` es la función principal: el programa empieza ahí\n• `return 0;` avisa que el programa terminó bien' }
      ],
      ejercicios: [
        mc('¿Qué librería necesitas para usar `printf` y `scanf`?', ['stdio.h', 'math.h', 'string.h', 'printf.h'], 0, '`stdio` = standard input/output (entrada y salida estándar).'),
        completa('Completa tu primer programa:', C`#include<___>
int ___(){
    printf("Hola\n")___
    return 0;
}`, ['stdio.h', 'main', ';', 'inicio', ':', 'print.h'], ['stdio.h', 'main', ';'], ''),
        mc('¿Con qué termina casi toda instrucción en C++?', ['Punto y coma ;', 'Punto .', 'Dos puntos :', 'Coma ,'], 0, 'Olvidar el `;` es el error más común.'),
        escribe('¿Qué muestra en pantalla este código?', C`printf("Hola");
printf("Mundo");`, ['HolaMundo'], 'Sin `\\n`, todo sale en la misma línea y pegado.'),
        vf('Lo que escribes después de `//` se ejecuta como instrucción.', false, 'Es un comentario: la computadora lo ignora.'),
        ordena('Ordena el programa:', ['#include<stdio.h>', 'int main(){', C`    printf("Hola\n");`, '    return 0;', '}'], ''),
        mc('¿Qué hace `\\n` dentro de printf?', ['Salta a la siguiente línea', 'Borra la pantalla', 'Muestra la letra n', 'Termina el programa'], 0, '')
      ],
      reto: {
        enunciado: 'Haz un programa que muestre un nombre, una carrera y una ciudad, cada uno en su propia línea.',
        solucion: C`#include<stdio.h>                       // librería para printf
int main(){                             // inicio del programa
    printf("Nombre: Ana\n");            // muestra el nombre
    printf("Carrera: Sistemas\n");      // muestra la carrera
    printf("Ciudad: Latacunga\n");      // muestra la ciudad
    return 0;                           // fin del programa
}`
      },
      resumen: [
        'Estructura: `#include<stdio.h>`, `int main(){ ... }`, `return 0;`',
        'Toda instrucción termina en `;`',
        '`\\n` = salto de línea. `//` = comentario.'
      ]
    },

    /* ---------- 5 ---------- */
    {
      id: 'e1l5', titulo: 'Variables y tipos de datos', icono: '📦', desc: 'int, float, char y bool.',
      teoria: [
        { h: '¿Qué es una variable?', p: 'Es una **cajita con nombre** donde guardas un dato. Ese dato puede cambiar mientras el programa corre.', code: C`int edad = 19;          // número entero
float precio = 1.50;    // número con decimales
char letra = 'A';       // una sola letra
bool aprobado = true;   // verdadero o falso` },
        { h: 'Tipos de datos primitivos', p: '• `int` → enteros: 5, -3, 100\n• `float` → decimales: 1.50, 3.14\n• `char` → un solo carácter, entre comillas simples: \'A\'\n• `bool` → `true` (verdadero) o `false` (falso)\n\nLos decimales se escriben con **punto**, no con coma: `1.50`' },
        { h: 'Reglas para los nombres', p: '• Empieza con una letra (o guion bajo)\n• Sin espacios ni tildes: `nota_final` ✅  `nota final` ❌\n• No uses palabras reservadas como `int` o `main`\n• C++ distingue mayúsculas: `Edad` y `edad` son variables distintas' }
      ],
      ejercicios: [
        mc('¿Qué tipo usarías para guardar la edad de una persona?', ['int', 'float', 'char', 'bool'], 0, 'La edad es un número entero.'),
        mc('¿Qué tipo usarías para guardar el precio $2.75?', ['float', 'int', 'char', 'bool'], 0, 'Tiene decimales: float.'),
        mc('¿Cuál es un nombre de variable válido?', ['nota_final', 'nota final', '2nota', 'int'], 0, 'Sin espacios, no empieza con número y no es palabra reservada.'),
        completa('Completa las declaraciones:', C`___ edad = 20;
___ estatura = 1.68;
___ inicial = 'J';`, ['int', 'float', 'char', 'bool'], ['int', 'float', 'char'], ''),
        vf('`Precio` y `precio` son la misma variable en C++.', false, 'C++ distingue mayúsculas de minúsculas.'),
        mc('Un `bool` puede guardar...', ['true o false', 'cualquier número', 'una palabra', 'una letra'], 0, ''),
        mc('¿Cómo se escribe bien un decimal en C++?', ['3.50', '3,50', '3 50', 'tres.cincuenta'], 0, 'Con punto.')
      ],
      reto: {
        enunciado: 'Declara 4 variables: un `int`, un `float`, un `char` y un `bool`, con datos que tú elijas. Compila con F9: si no sale ningún error, ¡están bien declaradas!',
        solucion: C`#include<stdio.h>              // librería
int main(){                    // inicio
    int edad = 19;             // entero
    float estatura = 1.70;     // decimal
    char inicial = 'M';        // un carácter
    bool matriculado = true;   // verdadero o falso
    return 0;                  // fin
}`
      },
      resumen: [
        'Variable = cajita con nombre que guarda un dato.',
        '`int` enteros, `float` decimales, `char` un carácter (\'A\'), `bool` true/false.',
        'Nombres sin espacios ni tildes. `Edad` ≠ `edad`.'
      ]
    },

    /* ---------- 6 ---------- */
    {
      id: 'e1l6', titulo: 'printf y scanf', icono: '⌨️', desc: 'Mostrar y leer datos.',
      teoria: [
        { h: 'Mostrar variables con printf', p: 'Para mostrar una variable usas un **formato**:\n\n• `%d` → int\n• `%f` → float (`%.2f` = con 2 decimales)\n• `%c` → char\n• Un `bool` se muestra con `%d`: sale **1** (true) o **0** (false)', code: C`int edad = 19;
float precio = 2.5;
printf("Edad: %d\n", edad);          // Edad: 19
printf("Precio: %.2f\n", precio);    // Precio: 2.50` },
        { h: 'Leer datos con scanf', p: '`scanf` guarda en una variable lo que escribe el usuario. Ojo: la variable lleva **&** delante.', code: C`#include<stdio.h>                     // librería
int main(){                           // inicio
    int edad;                         // variable para la edad
    printf("Ingresa tu edad: ");      // primero el mensaje
    scanf("%d", &edad);               // luego lee el dato
    printf("Tu edad es %d\n", edad);  // muestra el dato
    return 0;                         // fin
}` }
      ],
      ejercicios: [
        mc('¿Qué formato usas para mostrar un `int`?', ['%d', '%f', '%c', '%s'], 0, '`d` de "decimal entero".'),
        mc('¿Qué formato muestra un float con 2 decimales?', ['%.2f', '%2d', '%f2', '%.2d'], 0, ''),
        completa('Completa para leer un número entero:', C`int numero;
scanf("___", ___numero);`, ['%d', '&', '%f', '*'], ['%d', '&'], ''),
        escribe('¿Qué muestra este código?', C`float precio = 3.5;
printf("%.2f", precio);`, ['3.50'], '`%.2f` muestra 2 decimales.'),
        vf('En scanf, la variable lleva `&` delante.', true, 'El `&` le dice a scanf **dónde** guardar el dato.'),
        mc('¿Qué formato usas para un `char`?', ['%c', '%d', '%f', '%ch'], 0, ''),
        escribe('¿Qué muestra este código?', C`int a = 7;
printf("Tengo %d dolares", a);`, ['Tengo 7 dolares'], 'El `%d` se reemplaza por el valor de `a`.')
      ],
      reto: {
        enunciado: 'Pide el precio de un producto y la cantidad que compras. Muestra el total a pagar con 2 decimales.',
        solucion: C`#include<stdio.h>                         // librería
int main(){                               // inicio
    float precio, total;                  // variables decimales
    int cantidad;                         // variable entera
    printf("Precio: ");                   // pide el precio
    scanf("%f", &precio);                 // lee el precio
    printf("Cantidad: ");                 // pide la cantidad
    scanf("%d", &cantidad);               // lee la cantidad
    total = precio * cantidad;            // calcula el total
    printf("Total: $%.2f\n", total);      // muestra el total
    return 0;                             // fin
}`
      },
      resumen: [
        'Formatos: `%d` int, `%f` float, `%.2f` 2 decimales, `%c` char.',
        '`scanf("%d", &variable);` → la variable lleva `&`.',
        'Primero muestra el mensaje y luego lee el dato.'
      ]
    },

    /* ---------- 7 ---------- */
    {
      id: 'e1l7', titulo: 'Conversión de tipos', icono: '🔄', desc: 'Casting y división entera.',
      teoria: [
        { h: 'División entera: ¡cuidado!', p: 'Si divides dos `int`, el resultado **pierde los decimales**:', code: C`int a = 7, b = 2;
printf("%d", a / b);   // muestra 3, no 3.5` },
        { h: 'Convertir tipos (casting)', p: 'Para convertir un tipo en otro, pones el nuevo tipo entre paréntesis. Esto se llama **casting**:', code: C`int a = 7, b = 2;
float r = (float)a / b;    // r vale 3.5
int entero = (int)9.99;    // entero vale 9 (corta, no redondea)` },
        { h: 'Conversión automática', p: 'Si guardas un decimal en un `int`, C++ **corta** los decimales sin avisar.\n\nSi guardas un `int` en un `float`, no se pierde nada: `float x = 5;` guarda 5.0.' }
      ],
      ejercicios: [
        escribe('¿Qué muestra este código?', C`int a = 9, b = 2;
printf("%d", a / b);`, ['4'], 'Entre enteros, la división corta los decimales: 9/2 = 4.'),
        mc('`a` y `b` son int. ¿Cómo obtienes 3.5 al dividir 7 entre 2?', ['(float)a / b', 'a / b', '(int)a / b', 'a % b'], 0, 'Conviertes uno de los dos a float antes de dividir.'),
        escribe('¿Cuánto vale `x`?', C`int x = (int)8.9;`, ['8'], 'El casting a int **corta** los decimales, no redondea.'),
        vf('`(int)4.99` da 5.', false, 'Da 4: corta los decimales.'),
        mc('Las notas `n1` y `n2` son int. ¿Cuál calcula bien el promedio?', ['promedio = (float)(n1 + n2) / 2;', 'promedio = (n1 + n2) / 2;', 'promedio = (int)(n1 + n2) / 2;', 'promedio = n1 + n2 / 2;'], 0, 'Sin casting pierdes los decimales, y sin paréntesis solo se divide `n2`.'),
        escribe('¿Qué muestra este código?', C`float r = 10 / 4;
printf("%.1f", r);`, ['2.0'], '10/4 entre enteros da 2, y se guarda como 2.0. Para obtener 2.5 escribe `10.0 / 4`.')
      ],
      reto: {
        enunciado: 'Pide 3 notas enteras (sobre 20) y muestra el promedio con 2 decimales. Usa casting para no perder los decimales.',
        solucion: C`#include<stdio.h>                               // librería
int main(){                                     // inicio
    int n1, n2, n3;                             // tres notas enteras
    float promedio;                             // promedio con decimales
    printf("Ingresa las 3 notas: ");            // pide las notas
    scanf("%d %d %d", &n1, &n2, &n3);           // lee las notas
    promedio = (float)(n1 + n2 + n3) / 3;       // casting para no perder decimales
    printf("Promedio: %.2f\n", promedio);       // muestra el promedio
    return 0;                                   // fin
}`
      },
      resumen: [
        'int / int = int (se pierden los decimales).',
        'Casting: `(float)a / b` o `(int)9.99` → 9.',
        'El casting a int **corta**, no redondea.'
      ]
    },

    /* ---------- 8 ---------- */
    {
      id: 'e1l8', titulo: 'Operadores aritméticos', icono: '➗', desc: '+ - * / % y el orden de las operaciones.',
      teoria: [
        { h: 'Los operadores', p: '`+` suma, `-` resta, `*` multiplicación, `/` división y `%` **residuo** (lo que sobra de una división entera).', code: C`printf("%d\n", 10 + 3);   // 13
printf("%d\n", 10 * 3);   // 30
printf("%d\n", 10 / 3);   // 3
printf("%d\n", 10 % 3);   // 1  (sobra 1)` },
        { h: '¿Para qué sirve %?', p: 'El residuo `%` sirve muchísimo. Por ejemplo, si `n % 2 == 0`, el número es **par**. Solo funciona con enteros.' },
        { h: 'Orden de las operaciones', p: 'Igual que en matemática: primero `*` `/` `%`, luego `+` `-`. Lo que está entre **paréntesis** va primero.', code: C`int a = 2 + 3 * 4;     // 14
int b = (2 + 3) * 4;   // 20`, p2: 'Atajos útiles: `x++` suma 1, `x--` resta 1, y `x += 5` es lo mismo que `x = x + 5`.' }
      ],
      ejercicios: [
        escribe('¿Cuánto es `17 % 5`?', null, ['2'], '17 entre 5 da 3 y sobran 2.'),
        escribe('¿Cuánto vale `r`?', C`int r = 2 + 3 * 2;`, ['8'], 'Primero la multiplicación: 3*2 = 6, luego 2+6 = 8.'),
        mc('¿Cómo sabes si un número `n` es par?', ['n % 2 == 0', 'n / 2 == 0', 'n * 2 == 0', 'n % 2 == 1'], 0, 'Si al dividir para 2 no sobra nada, es par.'),
        escribe('¿Cuánto vale `x` al final?', C`int x = 10;
x += 5;
x++;`, ['16'], '10 + 5 = 15, y `x++` suma 1: 16.'),
        completa('Calcula el precio con IVA del 15%:', C`float precio = 20;
float total = precio ___ precio ___ 0.15;`, ['+', '*', '-', '/'], ['+', '*'], 'total = 20 + 20 * 0.15 = 23.00'),
        escribe('¿Cuánto vale `r`?', C`int r = (8 - 2) / 3;`, ['2'], 'Primero el paréntesis: 6, luego 6/3 = 2.')
      ],
      reto: {
        enunciado: 'Pide una cantidad de minutos y muéstrala en horas y minutos. Ejemplo: 135 minutos = 2 horas y 15 minutos. Pista: usa `/` y `%`.',
        solucion: C`#include<stdio.h>                                   // librería
int main(){                                         // inicio
    int total, horas, minutos;                      // variables enteras
    printf("Ingresa los minutos: ");                // pide el dato
    scanf("%d", &total);                            // lee el dato
    horas = total / 60;                             // cuántas horas completas
    minutos = total % 60;                           // los minutos que sobran
    printf("%d horas y %d minutos\n", horas, minutos); // muestra el resultado
    return 0;                                       // fin
}`
      },
      resumen: [
        '`+ - * /` y `%` (residuo).',
        'Par: `n % 2 == 0`.',
        'Orden: paréntesis → `* / %` → `+ -`.',
        'Atajos: `x++`, `x--`, `x += 5`.'
      ]
    },

    /* ---------- 8b: math.h ---------- */
    {
      id: 'e1l11', titulo: 'Funciones matemáticas', icono: '🔢', desc: 'sqrt, pow y más con math.h.',
      teoria: [
        { h: 'La librería math.h', p: 'Para cálculos más avanzados hay funciones listas en `#include<math.h>` (en C++ también se llama `<cmath>`):\n\n• `sqrt(x)` → raíz cuadrada\n• `pow(b, e)` → potencia (b elevado a e)\n• `fabs(x)` → valor absoluto (quita el signo)\n• `round(x)` → redondea al entero más cercano\n• `ceil(x)` → redondea hacia arriba\n• `floor(x)` → redondea hacia abajo' },
        { h: 'Ejemplo', p: 'Estas funciones devuelven decimales (`double`), por eso se muestran con `%f`.', code: C`#include<stdio.h>                       // printf
#include<math.h>                        // funciones matemáticas
int main(){
    printf("%.2f\n", sqrt(25));         // 5.00
    printf("%.2f\n", pow(2, 3));        // 8.00
    printf("%.2f\n", fabs(-7.5));       // 7.50
    printf("%.2f\n", round(4.6));       // 5.00
    printf("%.2f\n", ceil(4.1));        // 5.00
    printf("%.2f\n", floor(4.9));       // 4.00
    return 0;
}` },
        { h: 'Ejemplo real: Pitágoras', p: 'La hipotenusa de un triángulo rectángulo es la raíz de la suma de los catetos al cuadrado:', code: C`float a = 3, b = 4;
float c = sqrt(pow(a, 2) + pow(b, 2));   // c = 5` }
      ],
      ejercicios: [
        mc('¿Qué librería tiene `sqrt` y `pow`?', ['math.h', 'stdio.h', 'string.h', 'stdlib.h'], 0, ''),
        escribe('¿Cuánto da `pow(3, 2)`?', null, ['9', '9.0', '9.00'], '3 elevado a 2 = 3 × 3 = 9'),
        escribe('¿Cuánto da `sqrt(49)`?', null, ['7', '7.0', '7.00'], '7 × 7 = 49'),
        mc('¿Qué hace `fabs(-12.5)`?', ['Da 12.5 (quita el signo)', 'Da -12.5', 'Redondea a -13', 'Da 0'], 0, ''),
        mc('¿Cuál redondea SIEMPRE hacia arriba?', ['ceil', 'floor', 'round', 'fabs'], 0, '`ceil` = techo (arriba), `floor` = piso (abajo).'),
        escribe('¿Cuánto da `floor(8.99)`?', null, ['8', '8.0', '8.00'], 'Redondea hacia abajo.'),
        completa('Calcula el área de un círculo (π · r²):', C`float area = 3.1416 * ___(r, ___);`, ['pow', '2', 'sqrt', '3'], ['pow', '2'], '`pow(r, 2)` es r al cuadrado.')
      ],
      reto: {
        enunciado: 'Pide los dos catetos de un triángulo rectángulo y muestra la hipotenusa con 2 decimales.',
        solucion: C`#include<stdio.h>                                // printf, scanf
#include<math.h>                                 // sqrt, pow
int main(){                                      // inicio
    float a, b, c;                               // catetos e hipotenusa
    printf("Cateto a: ");
    scanf("%f", &a);
    printf("Cateto b: ");
    scanf("%f", &b);
    c = sqrt(pow(a, 2) + pow(b, 2));             // Pitágoras
    printf("Hipotenusa: %.2f\n", c);
    return 0;                                    // fin
}`
      },
      resumen: [
        '`#include<math.h>` (o `<cmath>` en C++).',
        '`sqrt` raíz, `pow` potencia, `fabs` valor absoluto.',
        '`round` redondea, `ceil` hacia arriba, `floor` hacia abajo.'
      ]
    },

    /* ---------- 9 ---------- */
    {
      id: 'e1l9', titulo: 'Comparación y lógicos', icono: '⚖️', desc: '== != > < && || !',
      teoria: [
        { h: 'Operadores de comparación', p: 'Comparan dos valores y dan **verdadero (1)** o **falso (0)**:\n\n• `==` igual   • `!=` distinto\n• `>` mayor   • `<` menor\n• `>=` mayor o igual   • `<=` menor o igual\n\n⚠️ `=` **guarda** un valor; `==` **compara**.' },
        { h: 'Operadores lógicos', p: 'Sirven para unir condiciones:\n\n• `&&` (Y): verdadero si **las dos** son verdaderas\n• `||` (O): verdadero si **al menos una** es verdadera\n• `!` (NO): da lo contrario', code: C`int edad = 20, nota = 15;
bool puede = edad >= 18 && nota >= 14;   // true
bool alguno = edad < 18 || nota >= 14;   // true
bool no = !(nota >= 14);                 // false` }
      ],
      ejercicios: [
        mc('¿Qué operador compara si dos valores son iguales?', ['==', '=', '!=', '=>'], 0, '`=` asigna, `==` compara.'),
        escribe('¿Qué resultado da? Escribe 1 si es verdadero o 0 si es falso.', C`5 > 3 && 2 > 4`, ['0'], 'La segunda parte es falsa, y con `&&` las dos deben ser verdaderas.'),
        escribe('¿Qué resultado da? (1 o 0)', C`5 > 3 || 2 > 4`, ['1'], 'Con `||` basta que una sea verdadera.'),
        mc('Para aprobar necesitas nota >= 14 **y** asistencia >= 70. ¿Cuál está bien?', ['nota >= 14 && asistencia >= 70', 'nota >= 14 || asistencia >= 70', 'nota > 14 && asistencia > 70', 'nota = 14 && asistencia = 70'], 0, 'Se deben cumplir las dos: `&&`.'),
        escribe('¿Qué resultado da? (1 o 0)', C`!(10 == 10)`, ['0'], '`10 == 10` es verdadero, y `!` lo vuelve falso.'),
        vf('`x = 5` compara si x vale 5.', false, '`=` **asigna**. Para comparar se usa `==`.')
      ],
      reto: {
        enunciado: 'Pide una edad y muestra 1 si la persona puede votar en Ecuador (16 años o más) y 0 si no. Usa solo operadores, todavía sin `if`.',
        solucion: C`#include<stdio.h>                             // librería
int main(){                                   // inicio
    int edad;                                 // variable edad
    printf("Ingresa tu edad: ");              // pide la edad
    scanf("%d", &edad);                       // lee la edad
    printf("Puede votar: %d\n", edad >= 16);  // 1 = sí, 0 = no
    return 0;                                 // fin
}`
      },
      resumen: [
        'Comparación: `== != > < >= <=` → dan 1 (verdadero) o 0 (falso).',
        'Lógicos: `&&` (Y), `||` (O), `!` (NO).',
        '`=` asigna; `==` compara.'
      ]
    },

    /* ---------- 10 ---------- */
    {
      id: 'e1l10', titulo: 'Listas, arreglos y colecciones', icono: '🗃️', desc: 'Guardar muchos datos juntos.',
      teoria: [
        { h: 'Muchos datos juntos', p: '¿Y si necesitas guardar las notas de 23 estudiantes? Crear 23 variables sería un lío. Para eso existen las **estructuras de datos**: guardan muchos datos bajo un solo nombre.' },
        { h: 'Arreglos', p: 'Un **arreglo** es una fila de cajitas del mismo tipo. Cada cajita tiene una **posición** (índice) que **empieza en 0**.', code: C`int notas[5] = {14, 18, 12, 20, 16};
printf("%d", notas[0]);   // 14 (la primera)
printf("%d", notas[4]);   // 16 (la última)` },
        { h: 'Listas y colecciones', p: '• **Arreglo:** tamaño fijo, decides cuántas cajitas tiene.\n• **Lista:** puede crecer o achicarse (en C++ se usa `vector`, lo ves en la Etapa 5).\n• **Colección:** nombre general para cualquier grupo de datos: arreglos, listas, mapas…\n\nEn la Etapa 2 vas a trabajar a fondo con arreglos.' }
      ],
      ejercicios: [
        mc('¿En qué posición está el primer elemento de un arreglo?', ['0', '1', '-1', 'Depende'], 0, 'Los índices empiezan en 0.'),
        escribe('¿Qué muestra este código?', C`int edades[3] = {18, 21, 19};
printf("%d", edades[1]);`, ['21'], 'Posición 0 = 18, posición 1 = 21.'),
        mc('Si un arreglo tiene 5 elementos, ¿cuál es la última posición?', ['4', '5', '6', '0'], 0, 'Va de 0 a 4.'),
        vf('Un arreglo puede guardar datos de distintos tipos mezclados (int y char).', false, 'Todas sus cajitas son del mismo tipo.'),
        mc('¿Cuál puede crecer mientras el programa corre?', ['Una lista (vector)', 'Un arreglo normal', 'Una variable int', 'Un char'], 0, ''),
        completa('Crea un arreglo de 4 precios:', C`float precios[___] = {1.5, 2.0, 0.75, 3.25};`, ['4', '3', '5'], ['4'], 'Son 4 valores, así que el tamaño es 4.')
      ],
      reto: {
        enunciado: 'Crea un arreglo con las temperaturas de 5 días en Latacunga y muestra la del primer y la del último día.',
        solucion: C`#include<stdio.h>                                         // librería
int main(){                                               // inicio
    float temp[5] = {14.5, 16.0, 12.8, 15.2, 13.9};       // 5 temperaturas
    printf("Primer dia: %.1f grados\n", temp[0]);         // posición 0
    printf("Ultimo dia: %.1f grados\n", temp[4]);         // posición 4
    return 0;                                             // fin
}`
      },
      resumen: [
        'Estructuras de datos: guardan muchos datos con un solo nombre.',
        'Arreglo: tamaño fijo, mismo tipo, índices desde **0**.',
        'Lista (`vector`): puede crecer. Colección: cualquier grupo de datos.'
      ]
    }
  ]
});
