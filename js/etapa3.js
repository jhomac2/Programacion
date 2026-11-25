/* ===================== ETAPA 3 · Funciones y procedimientos (Unidad 3 del sílabo) ===================== */
CURSO.push({
  id: 'e3', nombre: 'Funciones y procedimientos', etiqueta: 'Unidad 3 del sílabo',
  color: '#FF9600', sombra: '#E08600', medalla: '🧩', logro: 'Programador modular',
  lecciones: [

    /* ---------- 1 ---------- */
    {
      id: 'e3l1', titulo: 'Funciones', icono: '🧩', desc: 'Definir y llamar funciones.',
      teoria: [
        { h: '¿Qué es una función?', p: 'Es un **bloque de código con nombre** que hace una tarea. La escribes una vez y la **llamas** (usas) cuantas veces quieras. Así tu programa queda ordenado en partes pequeñas: un programa **modular**.\n\nYa usaste funciones: `printf`, `scanf` y `main` son funciones.' },
        { h: 'Crear y llamar una función', p: 'La función se escribe **antes** de `main` para que `main` la conozca.', code: C`#include<stdio.h>                  // librería

void saludar(){                    // se crea la función
    printf("Hola desde ESPE\n");   // lo que hace
}

int main(){
    saludar();                     // se llama la función
    saludar();                     // se puede llamar otra vez
    return 0;
}` },
        { h: 'Prototipo', p: 'Si prefieres escribir la función **después** de `main`, pon arriba su **prototipo** (su primera línea, terminada en `;`):', code: C`void saludar();         // prototipo
int main(){
    saludar();
    return 0;
}
void saludar(){         // definición
    printf("Hola\n");
}` }
      ],
      ejercicios: [
        mc('¿Qué es una función?', ['Un bloque de código con nombre que hace una tarea', 'Una variable con decimales', 'Un tipo de error', 'Un archivo .txt'], 0, ''),
        escribe('¿Cuántas veces se muestra "Hola"?', C`void saludo(){
    printf("Hola");
}
int main(){
    saludo();
    saludo();
    saludo();
    return 0;
}`, ['3'], 'Se llama 3 veces.'),
        completa('Llama a la función:', C`void menu(){
    printf("1. Jugar\n");
}
int main(){
    ___();
    return 0;
}`, ['menu', 'void', 'main'], ['menu'], ''),
        vf('`printf` y `main` también son funciones.', true, ''),
        mc('¿Qué es un prototipo?', ['La primera línea de la función, con ;, puesta arriba de main', 'Una función sin nombre', 'Un error de compilación', 'Una variable global'], 0, ''),
        mc('¿Qué ventaja tiene usar funciones?', ['Ordenar el código y reutilizarlo', 'Que el programa no necesite main', 'No usar variables', 'Que nunca haya errores'], 0, '')
      ],
      reto: {
        enunciado: 'Crea una función `linea()` que muestre "====================". Úsala para encerrar el título "MI TIENDA" (una línea arriba y otra abajo).',
        solucion: C`#include<stdio.h>                         // librería
void linea(){                             // función
    printf("====================\n");     // dibuja la línea
}
int main(){                               // inicio
    linea();                              // arriba
    printf("     MI TIENDA\n");           // título
    linea();                              // abajo
    return 0;                             // fin
}`
      },
      resumen: [
        'Función = bloque de código con nombre que se puede llamar muchas veces.',
        'Se escribe antes de `main` o se pone su **prototipo** arriba.',
        'Se llama con su nombre y paréntesis: `saludar();`'
      ]
    },

    /* ---------- 2 ---------- */
    {
      id: 'e3l2', titulo: 'Parámetros y return', icono: '🎁', desc: 'Enviar datos y devolver resultados.',
      teoria: [
        { h: 'Parámetros: datos que recibe', p: 'Una función puede **recibir datos** para trabajar con ellos. Se llaman **parámetros** y van entre los paréntesis.', code: C`void mostrarPrecio(float p){         // recibe un número
    printf("Precio: $%.2f\n", p);
}
int main(){
    mostrarPrecio(2.5);              // Precio: $2.50
    mostrarPrecio(10);               // Precio: $10.00
    return 0;
}` },
        { h: 'return: el resultado', p: 'Con `return` la función **devuelve un valor**. El tipo que va antes del nombre dice qué tipo devuelve.', code: C`float conIVA(float precio){          // recibe float, devuelve float
    return precio * 1.15;            // devuelve el resultado
}
int main(){
    float total = conIVA(20);        // total = 23.0
    printf("%.2f\n", total);
    return 0;
}` },
        { h: 'Varios parámetros', code: C`int sumar(int a, int b){     // separados por coma
    return a + b;
}
int r = sumar(4, 6);          // r = 10`, p: 'Los valores que envías al llamarla (`4` y `6`) se llaman **argumentos**, y van en el mismo orden que los parámetros.' }
      ],
      ejercicios: [
        mc('¿Qué hace `return`?', ['Devuelve un valor desde la función', 'Repite la función', 'Lee un dato', 'Termina el bucle'], 0, ''),
        escribe('¿Cuánto vale `r`?', C`int doble(int x){
    return x * 2;
}
int r = doble(7);`, ['14'], ''),
        completa('Completa la función que resta:', C`___ restar(int a, int b){
    ___ a - b;
}`, ['int', 'return', 'void', 'printf'], ['int', 'return'], 'Devuelve un entero, así que empieza con `int`.'),
        escribe('¿Qué muestra?', C`int mayor(int a, int b){
    if(a > b) return a;
    return b;
}
printf("%d", mayor(3, 9));`, ['9'], ''),
        mc('En `float area(float base, float altura)`, ¿qué tipo devuelve?', ['float', 'int', 'void', 'base'], 0, 'El tipo antes del nombre.'),
        vf('Los argumentos deben enviarse en el mismo orden que los parámetros.', true, '')
      ],
      reto: {
        enunciado: 'Crea una función `promedio(float a, float b, float c)` que devuelva el promedio de 3 notas. En main, pide las notas y muestra el resultado.',
        solucion: C`#include<stdio.h>                               // librería
float promedio(float a, float b, float c){      // recibe 3 notas
    return (a + b + c) / 3;                     // devuelve el promedio
}
int main(){                                     // inicio
    float n1, n2, n3;                           // notas
    printf("Tres notas: ");
    scanf("%f %f %f", &n1, &n2, &n3);
    printf("Promedio: %.2f\n", promedio(n1, n2, n3));
    return 0;                                   // fin
}`
      },
      resumen: [
        '**Parámetros:** datos que recibe la función, entre paréntesis.',
        '`return valor;` devuelve el resultado.',
        'El tipo antes del nombre dice qué devuelve: `int`, `float`…'
      ]
    },

    /* ---------- 3 ---------- */
    {
      id: 'e3l3', titulo: 'Procedimientos', icono: '📣', desc: 'Funciones void y sus diferencias.',
      teoria: [
        { h: '¿Qué es un procedimiento?', p: 'Es una función que **hace algo pero no devuelve nada**. En C++ se escribe con `void` (vacío).', code: C`void mostrarRecibo(float total){         // no devuelve nada
    printf("====== RECIBO ======\n");
    printf("Total: $%.2f\n", total);
}` },
        { h: 'Función vs procedimiento', p: '• **Función:** devuelve un resultado con `return`. Ej.: `float conIVA(float p)` te da un número.\n• **Procedimiento (`void`):** solo hace una tarea (mostrar, guardar…) y no devuelve nada.\n\nUna función se puede usar en un cálculo: `total = conIVA(10) + 2;`\nUn procedimiento solo se llama: `mostrarRecibo(total);`' }
      ],
      ejercicios: [
        mc('¿Qué palabra indica que no devuelve nada?', ['void', 'int', 'return', 'null'], 0, ''),
        mc('¿Cuál es un procedimiento?', ['void imprimirMenu()', 'int sumar(int a, int b)', 'float area(float r)', 'char inicial()'], 0, 'Empieza con `void`.'),
        vf('Un procedimiento `void` se puede usar en un cálculo, como `x = saludar() + 1;`', false, 'No devuelve nada, así que no se puede usar en cálculos.'),
        mc('Para calcular el descuento de un precio y usarlo después, conviene...', ['Una función que devuelva el valor', 'Un procedimiento void', 'Un switch', 'Un comentario'], 0, ''),
        completa('Completa el procedimiento:', C`___ mostrarLinea(){
    printf("----------\n");
}`, ['void', 'int', 'float'], ['void'], ''),
        escribe('¿Qué muestra?', C`void doble(int x){
    printf("%d", x * 2);
}
int main(){
    doble(5);
    return 0;
}`, ['10'], '')
      ],
      reto: {
        enunciado: 'Crea un procedimiento `mostrarMenu()` con 3 opciones y una función `float calcularTotal(float precio, int cantidad)` que devuelva el total. Úsalos en main.',
        solucion: C`#include<stdio.h>                                      // librería
void mostrarMenu(){                                    // procedimiento
    printf("1. Comprar\n2. Ver total\n3. Salir\n");
}
float calcularTotal(float precio, int cantidad){       // función
    return precio * cantidad;
}
int main(){                                            // inicio
    float precio;
    int cantidad;
    mostrarMenu();                                     // solo se llama
    printf("Precio y cantidad: ");
    scanf("%f %d", &precio, &cantidad);
    printf("Total: $%.2f\n", calcularTotal(precio, cantidad)); // se usa su resultado
    return 0;                                          // fin
}`
      },
      resumen: [
        '**Procedimiento:** `void`, hace una tarea y no devuelve nada.',
        '**Función:** devuelve un valor con `return` y se puede usar en cálculos.'
      ]
    },

    /* ---------- 4 ---------- */
    {
      id: 'e3l4', titulo: 'Variables locales y globales', icono: '🏠', desc: 'Dónde vive cada variable.',
      teoria: [
        { h: 'Variables locales', p: 'Una variable creada **dentro** de una función solo existe ahí. Fuera de esa función **no se conoce**.', code: C`void prueba(){
    int x = 5;          // x es local de prueba
}
int main(){
    printf("%d", x);    // ERROR: main no conoce x
    return 0;
}` },
        { h: 'Variables globales', p: 'Una variable creada **fuera** de todas las funciones es **global**: todas la pueden usar. Úsalas poco, porque cualquier parte del programa la puede cambiar sin querer.', code: C`int contador = 0;       // global
void sumar(){
    contador++;         // la cambia
}
int main(){
    sumar();
    sumar();
    printf("%d", contador);   // 2
    return 0;
}` },
        { h: 'Se envía una copia', p: 'Cuando envías una variable a una función, viaja una **copia** (paso por valor). Si la función la cambia, la original **no cambia**:', code: C`void cambiar(int n){
    n = 100;            // cambia la copia
}
int main(){
    int a = 5;
    cambiar(a);
    printf("%d", a);    // sigue siendo 5
    return 0;
}`, p2: 'Esto ayuda al **encapsulamiento**: cada función cuida sus propios datos.' }
      ],
      ejercicios: [
        mc('Una variable creada dentro de una función es...', ['Local', 'Global', 'Constante', 'Pública'], 0, ''),
        vf('Una variable global la pueden usar todas las funciones.', true, ''),
        escribe('¿Qué muestra?', C`void cambiar(int n){
    n = 50;
}
int main(){
    int a = 8;
    cambiar(a);
    printf("%d", a);
    return 0;
}`, ['8'], 'Se envía una copia: la original no cambia.'),
        escribe('¿Qué muestra?', C`int total = 10;
void sumar5(){
    total += 5;
}
int main(){
    sumar5();
    printf("%d", total);
    return 0;
}`, ['15'], '`total` es global, así que la función sí la cambia.'),
        mc('¿Por qué conviene usar pocas variables globales?', ['Porque cualquier función puede cambiarlas sin querer', 'Porque son más lentas de escribir', 'Porque no aceptan números', 'Porque C++ no las permite'], 0, '')
      ],
      reto: {
        enunciado: 'Crea una variable global `visitas = 0` y un procedimiento `registrarVisita()` que la aumente en 1. Llámalo 3 veces y muestra cuántas visitas hubo.',
        solucion: C`#include<stdio.h>                       // librería
int visitas = 0;                        // global
void registrarVisita(){                 // procedimiento
    visitas++;                          // aumenta la global
}
int main(){                             // inicio
    registrarVisita();
    registrarVisita();
    registrarVisita();
    printf("Visitas: %d\n", visitas);   // 3
    return 0;                           // fin
}`
      },
      resumen: [
        '**Local:** creada dentro de una función, solo existe ahí.',
        '**Global:** creada afuera, la usan todas. Úsala poco.',
        'Al enviar una variable se envía una **copia**: la original no cambia.'
      ]
    },

    /* ---------- 5 ---------- */
    {
      id: 'e3l5', titulo: 'Funciones lambda', icono: '🪄', desc: 'Funciones cortitas sin nombre.',
      teoria: [
        { h: 'Funciones sin nombre', p: 'Una **lambda** es una función **cortita y sin nombre** que puedes crear dentro de otra función. Sirve para cálculos rápidos.', code: C`auto cuadrado = [](int x){ return x * x; };   // la lambda
printf("%d\n", cuadrado(4));                  // 16` },
        { h: 'Partes de una lambda', p: '• `[]` → captura: qué variables de afuera puede usar\n• `(int x)` → parámetros\n• `{ return ...; }` → lo que hace\n• `auto` → C++ adivina el tipo por ti\n\nPara usar variables de afuera, ponlas entre los corchetes:', code: C`float iva = 0.15;
auto conIVA = [iva](float p){ return p + p * iva; };
printf("%.2f\n", conIVA(10));   // 11.50`, p2: 'Las lambdas son de C++11 en adelante. Code::Blocks moderno ya lo trae; si te da error, activa en **Settings → Compiler** la opción de C++11 o superior.' }
      ],
      ejercicios: [
        mc('¿Qué es una lambda?', ['Una función cortita sin nombre', 'Un tipo de variable', 'Un bucle', 'Una librería'], 0, ''),
        escribe('¿Qué muestra?', C`auto triple = [](int x){ return x * 3; };
printf("%d", triple(5));`, ['15'], ''),
        mc('¿Para qué sirven los corchetes `[]` de una lambda?', ['Para capturar variables de afuera', 'Para los parámetros', 'Para el return', 'Para comentarios'], 0, ''),
        completa('Completa la lambda que suma:', C`auto suma = ___(int a, int b){ ___ a + b; };`, ['[]', 'return', '()', 'void'], ['[]', 'return'], ''),
        escribe('¿Qué muestra?', C`int base = 10;
auto mas = [base](int x){ return base + x; };
printf("%d", mas(5));`, ['15'], 'La lambda capturó `base`.'),
        vf('`auto` hace que C++ adivine el tipo de la variable.', true, '')
      ],
      reto: {
        enunciado: 'Crea una lambda `descuento` que reciba un precio y devuelva el precio con 10% de descuento. Muestra el resultado para $25.',
        solucion: C`#include<stdio.h>                                       // librería
int main(){                                             // inicio
    auto descuento = [](float p){ return p * 0.90; };   // lambda
    printf("Precio final: $%.2f\n", descuento(25));     // 22.50
    return 0;                                           // fin
}`
      },
      resumen: [
        'Lambda: `auto nombre = [captura](parametros){ return ...; };`',
        '`[]` captura variables de afuera. `auto` deduce el tipo.',
        'Necesita C++11 o superior.'
      ]
    },

    /* ---------- 6 ---------- */
    {
      id: 'e3l6', titulo: 'Recursividad', icono: '🪆', desc: 'Funciones que se llaman a sí mismas.',
      teoria: [
        { h: 'Una función que se llama a sí misma', p: 'La **recursividad** es cuando una función **se llama a sí misma** para resolver un problema más pequeño, como las muñecas rusas 🪆.\n\nToda función recursiva necesita:\n1. **Caso base:** cuándo parar.\n2. **Caso recursivo:** se llama a sí misma con un problema más pequeño.' },
        { h: 'Ejemplo: cuenta regresiva', code: C`void cuenta(int n){
    if(n == 0){                  // caso base: parar
        printf("Despegue!\n");
        return;
    }
    printf("%d\n", n);
    cuenta(n - 1);               // se llama con un número menor
}
// cuenta(3) muestra: 3 2 1 Despegue!`, p: 'Cada llamada se acerca al caso base (n baja hasta 0).' },
        { h: 'Ejemplo: factorial', p: 'El factorial de 4 es 4 × 3 × 2 × 1 = 24. Fíjate que `4! = 4 × 3!`', code: C`int factorial(int n){
    if(n <= 1) return 1;             // caso base
    return n * factorial(n - 1);     // caso recursivo
}
// factorial(4) = 4 * 3 * 2 * 1 = 24` }
      ],
      ejercicios: [
        mc('¿Qué es la recursividad?', ['Una función que se llama a sí misma', 'Un for dentro de otro', 'Una variable global', 'Un tipo de error'], 0, ''),
        mc('¿Qué es el caso base?', ['La condición que detiene la recursión', 'La primera línea del programa', 'El return de main', 'El parámetro más grande'], 0, ''),
        escribe('¿Cuánto da `factorial(5)`?', C`int factorial(int n){
    if(n <= 1) return 1;
    return n * factorial(n - 1);
}`, ['120'], '5 × 4 × 3 × 2 × 1 = 120'),
        escribe('¿Cuánto da `suma(4)`?', C`int suma(int n){
    if(n == 0) return 0;
    return n + suma(n - 1);
}`, ['10'], '4 + 3 + 2 + 1 + 0 = 10'),
        completa('Completa la potencia (2 elevado a 3 = 8):', C`int potencia(int b, int e){
    if(e == 0) return ___;
    return b * potencia(b, e ___ 1);
}`, ['1', '-', '0', '+'], ['1', '-'], 'Todo número elevado a 0 es 1.'),
        vf('Una función recursiva sin caso base se detiene sola.', false, 'Se llama sin fin hasta que el programa se cae (desbordamiento de pila).')
      ],
      reto: {
        enunciado: 'Crea una función recursiva `sumaDigitos(n)` que sume los dígitos de un número. Ejemplo: 1234 → 10. Pista: `n % 10` da el último dígito y `n / 10` lo quita.',
        solucion: C`#include<stdio.h>                               // librería
int sumaDigitos(int n){                         // recursiva
    if(n == 0) return 0;                        // caso base
    return n % 10 + sumaDigitos(n / 10);        // último dígito + el resto
}
int main(){                                     // inicio
    int n;
    printf("Numero: ");
    scanf("%d", &n);
    printf("Suma de digitos: %d\n", sumaDigitos(n));
    return 0;                                   // fin
}`
      },
      resumen: [
        'Recursividad: una función que se llama a sí misma.',
        'Siempre necesita **caso base** (cuándo parar) y **caso recursivo**.',
        'Ejemplo clásico: `factorial(n) = n * factorial(n - 1)`.'
      ]
    },

    /* ---------- 7 ---------- */
    {
      id: 'e3l7', titulo: 'Recursividad: problemas y soluciones', icono: '🐚', desc: 'Fibonacci y errores comunes.',
      teoria: [
        { h: 'Fibonacci', p: 'Cada número es la suma de los dos anteriores: 0, 1, 1, 2, 3, 5, 8, 13…', code: C`int fibo(int n){
    if(n == 0) return 0;                 // caso base 1
    if(n == 1) return 1;                 // caso base 2
    return fibo(n - 1) + fibo(n - 2);    // suma los dos anteriores
}
// fibo(6) = 8` },
        { h: 'Problemas comunes', p: '• **Sin caso base** → se llama sin fin y el programa se cae (**desbordamiento de pila**, *stack overflow*).\n• **No acercarse al caso base** → por ejemplo, llamar con `n + 1` en vez de `n - 1`.\n• **Muy lenta** → `fibo(40)` repite muchísimos cálculos.' },
        { h: 'Soluciones', p: '• Escribe **primero el caso base**.\n• Asegúrate de que cada llamada **se acerque** al caso base.\n• Si es muy lenta, usa un **bucle**. Todo lo recursivo se puede hacer con bucles.', code: C`int fiboFor(int n){             // versión con for, rápida
    int a = 0, b = 1, t, i;
    for(i = 0; i < n; i++){
        t = a + b;
        a = b;
        b = t;
    }
    return a;
}` }
      ],
      ejercicios: [
        escribe('¿Cuánto da `fibo(5)`?', C`int fibo(int n){
    if(n == 0) return 0;
    if(n == 1) return 1;
    return fibo(n - 1) + fibo(n - 2);
}`, ['5'], 'Serie: 0, 1, 1, 2, 3, 5 → la posición 5 es 5.'),
        mc('¿Qué error tiene esta función?', ['Nunca llega al caso base: n crece en vez de bajar', 'Le falta el return', 'Está perfecta', 'El if debe ser while'], 0, '', C`int f(int n){
    if(n == 0) return 0;
    return n + f(n + 1);
}`),
        mc('¿Qué pasa si una función recursiva no tiene caso base?', ['Se llama sin fin y el programa se cae', 'Devuelve 0', 'Se convierte en for', 'Compila más rápido'], 0, ''),
        vf('Todo lo que se hace con recursividad también se puede hacer con bucles.', true, ''),
        mc('¿Qué escribes primero en una función recursiva?', ['El caso base', 'El caso recursivo', 'Un printf', 'El main'], 0, '')
      ],
      reto: {
        enunciado: 'Muestra los primeros 10 números de Fibonacci usando la función recursiva `fibo`.',
        solucion: C`#include<stdio.h>                               // librería
int fibo(int n){                                // recursiva
    if(n == 0) return 0;                        // caso base
    if(n == 1) return 1;                        // caso base
    return fibo(n - 1) + fibo(n - 2);           // caso recursivo
}
int main(){                                     // inicio
    int i;
    for(i = 0; i < 10; i++){                    // los 10 primeros
        printf("%d ", fibo(i));                 // 0 1 1 2 3 5 8 13 21 34
    }
    printf("\n");
    return 0;                                   // fin
}`
      },
      resumen: [
        'Fibonacci: `fibo(n) = fibo(n-1) + fibo(n-2)`.',
        'Errores: sin caso base, no acercarse a él, demasiado lenta.',
        'Solución: caso base primero, acercarse siempre, o usar bucles.'
      ]
    }
  ]
});
