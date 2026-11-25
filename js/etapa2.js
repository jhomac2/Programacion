/* ===================== ETAPA 2 · Estructuras de control (Unidad 2 del sílabo) ===================== */
CURSO.push({
  id: 'e2', nombre: 'Estructuras de control', etiqueta: 'Unidad 2 del sílabo',
  color: '#CE82FF', sombra: '#A568CC', medalla: '🕹️', logro: 'Controlador',
  lecciones: [

    /* ---------- 1: if ---------- */
    {
      id: 'e2l1', titulo: 'Decisiones con if', icono: '🚦', desc: 'Ejecutar código solo si se cumple algo.',
      teoria: [
        { h: 'Tomar decisiones con if', p: '`if` significa **"si"**. Ejecuta un bloque de código **solo si** la condición es verdadera.', code: C`if(nota >= 14){                  // si la nota es 14 o más
    printf("Aprobaste\n");       // se ejecuta solo si se cumple
}` },
        { h: 'Cómo se escribe', p: '• La condición va entre **paréntesis** `( )`\n• Lo que se ejecuta va entre **llaves** `{ }`\n• Después de `if(...)` **no** va punto y coma\n\nSi la condición es falsa, el programa se salta el bloque y sigue.', code: C`#include<stdio.h>                          // librería
int main(){                                // inicio
    int edad;                              // variable
    printf("Edad: ");                      // pide la edad
    scanf("%d", &edad);                    // lee la edad
    if(edad >= 18){                        // si es mayor de edad
        printf("Puedes sacar licencia\n"); // mensaje
    }                                      // fin del if
    return 0;                              // fin
}` }
      ],
      ejercicios: [
        mc('¿Qué significa `if`?', ['Si (condición)', 'Mientras', 'Para', 'Hacer'], 0, ''),
        completa('Muestra "Par" si el número es par:', C`___(n % 2 == 0)___
    printf("Par");
}`, ['if', '{', 'while', ';', '}'], ['if', '{'], ''),
        escribe('¿Qué muestra este código?', C`int x = 5;
if(x > 10){
    printf("Grande");
}
printf("Fin");`, ['Fin'], 'La condición es falsa: se salta el bloque y solo muestra "Fin".'),
        vf('Después de `if(condicion)` se pone punto y coma.', false, 'Si pones `;` el if termina ahí y el bloque se ejecuta siempre. Es un error muy común.'),
        mc('¿Dónde va la condición del if?', ['Entre paréntesis ( )', 'Entre llaves { }', 'Entre corchetes [ ]', 'Entre comillas'], 0, ''),
        escribe('¿Qué muestra este código?', C`int saldo = 50;
if(saldo >= 20){
    saldo = saldo - 20;
}
printf("%d", saldo);`, ['30'], 'Se cumple la condición, así que resta 20.')
      ],
      reto: {
        enunciado: 'Pide la temperatura. Si es menor a 10 grados, muestra "Abrigate, hace frio en Latacunga".',
        solucion: C`#include<stdio.h>                                   // librería
int main(){                                         // inicio
    float temp;                                     // temperatura
    printf("Temperatura: ");                        // pide el dato
    scanf("%f", &temp);                             // lee el dato
    if(temp < 10){                                  // si hace frío
        printf("Abrigate, hace frio en Latacunga\n");  // mensaje
    }
    return 0;                                       // fin
}`
      },
      resumen: [
        '`if(condicion){ ... }` → se ejecuta solo si la condición es verdadera.',
        'Condición entre `( )`, bloque entre `{ }`.',
        'Nunca pongas `;` justo después de `if(...)`.'
      ]
    },

    /* ---------- 2: if else ---------- */
    {
      id: 'e2l2', titulo: 'if else y else if', icono: '🔀', desc: 'Elegir entre dos o más caminos.',
      teoria: [
        { h: 'if else: una cosa u otra', p: '`else` significa **"si no"**. Se ejecuta cuando la condición del if es **falsa**.', code: C`if(nota >= 14){               // si la nota es 14 o más
    printf("Aprobado\n");     // se cumple
}else{                        // si no
    printf("Reprobado\n");    // no se cumple
}` },
        { h: 'else if: varias opciones', p: 'Cuando hay más de 2 caminos, usas `else if`. Revisa las condiciones **en orden** y entra solo en la **primera** que se cumple.', code: C`if(nota >= 18){                  // 18 a 20
    printf("Excelente\n");
}else if(nota >= 14){            // 14 a 17
    printf("Aprobado\n");
}else{                           // menos de 14
    printf("Reprobado\n");
}`, p2: 'En C++ no existe `then`: el "entonces" del pseudocódigo se escribe con las llaves `{ }`.' }
      ],
      ejercicios: [
        escribe('¿Qué muestra si `nota` vale 16?', C`if(nota >= 18){
    printf("Excelente");
}else if(nota >= 14){
    printf("Aprobado");
}else{
    printf("Reprobado");
}`, ['Aprobado'], '16 no es >= 18, pero sí es >= 14.'),
        escribe('Con el mismo código, ¿qué muestra si `nota` vale 9?', C`if(nota >= 18){
    printf("Excelente");
}else if(nota >= 14){
    printf("Aprobado");
}else{
    printf("Reprobado");
}`, ['Reprobado'], 'No cumple ninguna condición, así que entra al else.'),
        mc('¿Cuándo se ejecuta el bloque `else`?', ['Cuando ninguna condición anterior se cumple', 'Siempre', 'Antes del if', 'Cuando la condición es verdadera'], 0, ''),
        ordena('Ordena el código que dice si un número es positivo o negativo:', ['if(n >= 0){', '    printf("Positivo");', '}else{', '    printf("Negativo");', '}'], ''),
        vf('En una cadena de `else if` pueden ejecutarse varios bloques a la vez.', false, 'Solo entra en el **primero** que se cumple.'),
        completa('Completa:', C`if(edad >= 18){
    printf("Mayor");
}___{
    printf("Menor");
}`, ['else', 'else if', 'then', 'if'], ['else'], ''),
        mc('`then` en C++...', ['No existe: se usan llaves { }', 'Va después del if', 'Reemplaza al else', 'Es obligatorio'], 0, 'El "entonces" del pseudocódigo en C++ se escribe con llaves.')
      ],
      reto: {
        enunciado: 'Imagina que la luz cuesta $0.09 por kWh si consumes hasta 100 kWh, y $0.12 por kWh si consumes más. Pide el consumo y muestra el total a pagar.',
        solucion: C`#include<stdio.h>                             // librería
int main(){                                   // inicio
    float kwh, total;                         // variables
    printf("Consumo en kWh: ");               // pide el consumo
    scanf("%f", &kwh);                        // lee el consumo
    if(kwh <= 100){                           // hasta 100
        total = kwh * 0.09;                   // tarifa baja
    }else{                                    // más de 100
        total = kwh * 0.12;                   // tarifa alta
    }
    printf("Total: $%.2f\n", total);          // muestra el total
    return 0;                                 // fin
}`
      },
      resumen: [
        '`if(...){ } else { }` → uno u otro camino.',
        '`else if` para 3 o más caminos; entra solo en el **primero** que se cumple.',
        'En C++ no existe `then`.'
      ]
    },

    /* ---------- 3: switch ---------- */
    {
      id: 'e2l3', titulo: 'switch', icono: '🎛️', desc: 'Menús y opciones exactas.',
      teoria: [
        { h: 'switch: elegir entre opciones', p: '`switch` compara **una variable** con varios valores exactos. Es ideal para **menús**.', code: C`switch(opcion){                       // revisa la opción
    case 1:                           // si opcion vale 1
        printf("Sumar\n");
        break;                        // sale del switch
    case 2:                           // si opcion vale 2
        printf("Restar\n");
        break;
    default:                          // si no es ninguna
        printf("Opcion no valida\n");
}` },
        { h: 'Partes del switch', p: '• `case valor:` → un caso\n• `break;` → **sale** del switch (¡no lo olvides!)\n• `default:` → si no coincide ningún caso (como el else)\n\nSolo sirve con valores exactos de tipo `int` o `char`, no con rangos como `nota >= 14`.' },
        { h: '¿Y si olvido el break?', p: 'Sin `break`, el programa **sigue de largo** y ejecuta también los casos de abajo:', code: C`int op = 1;
switch(op){
    case 1: printf("A");   // entra aquí
    case 2: printf("B");   // ¡y sigue aquí!
}
// muestra: AB` }
      ],
      ejercicios: [
        mc('¿Para qué sirve `break` en un switch?', ['Para salir del switch', 'Para repetir el caso', 'Para empezar el programa', 'Para leer un dato'], 0, ''),
        mc('¿Qué parte del switch funciona como el `else`?', ['default', 'case', 'break', 'switch'], 0, ''),
        escribe('¿Qué muestra este código?', C`int dia = 2;
switch(dia){
    case 1: printf("Lunes"); break;
    case 2: printf("Martes"); break;
    default: printf("Otro");
}`, ['Martes'], ''),
        escribe('¿Qué muestra? (ojo, falta un break)', C`int x = 1;
switch(x){
    case 1: printf("Uno");
    case 2: printf("Dos"); break;
    case 3: printf("Tres");
}`, ['UnoDos'], 'Sin break después de "Uno", sigue al caso 2 y ahí sí se detiene.'),
        vf('Con switch puedo escribir `case nota >= 14:`', false, 'switch solo compara valores exactos. Para rangos usa if.'),
        completa('Completa el menú:', C`switch(opcion){
    ___ 1:
        printf("Ver saldo");
        ___;
    ___:
        printf("Opcion invalida");
}`, ['case', 'break', 'default', 'if', 'else'], ['case', 'break', 'default'], '')
      ],
      reto: {
        enunciado: 'Haz un menú: 1 = Sumar, 2 = Restar, 3 = Multiplicar. Pide dos números y la opción, y muestra el resultado usando switch.',
        solucion: C`#include<stdio.h>                                // librería
int main(){                                      // inicio
    int a, b, op;                                // variables
    printf("Dos numeros: ");                     // pide los números
    scanf("%d %d", &a, &b);                      // los lee
    printf("1.Sumar 2.Restar 3.Multiplicar: ");  // menú
    scanf("%d", &op);                            // lee la opción
    switch(op){                                  // según la opción
        case 1: printf("%d\n", a + b); break;    // suma
        case 2: printf("%d\n", a - b); break;    // resta
        case 3: printf("%d\n", a * b); break;    // multiplica
        default: printf("Opcion no valida\n");   // otra opción
    }
    return 0;                                    // fin
}`
      },
      resumen: [
        '`switch(variable){ case valor: ... break; default: ... }`',
        'Sin `break`, sigue ejecutando los casos de abajo.',
        'Solo valores exactos (`int` o `char`), no rangos.'
      ]
    },

    /* ---------- 4: for ---------- */
    {
      id: 'e2l4', titulo: 'Bucle for', icono: '🔁', desc: 'Repetir un número conocido de veces.',
      teoria: [
        { h: 'Repetir con for', p: '`for` repite un bloque **un número conocido de veces**. Tiene 3 partes separadas por **punto y coma**:', code: C`for(i = 1; i <= 5; i++){      // inicio; condición; aumento
    printf("%d ", i);          // muestra: 1 2 3 4 5
}` },
        { h: 'Las 3 partes', p: '1. **Inicio** (`i = 1`): con qué valor empieza el contador.\n2. **Condición** (`i <= 5`): mientras se cumpla, sigue repitiendo.\n3. **Aumento** (`i++`): cuánto cambia el contador en cada vuelta.\n\nUsa `for` cuando **sabes cuántas veces** repetir: 10 flexiones, 23 estudiantes, 12 meses.' },
        { h: 'Hacia atrás o de 2 en 2', code: C`for(i = 10; i >= 1; i--){      // 10 9 8 ... 1
    printf("%d ", i);
}
for(i = 0; i <= 10; i += 2){   // 0 2 4 6 8 10
    printf("%d ", i);
}`, p: 'Puedes cambiar el inicio, la condición y el aumento como necesites.' }
      ],
      ejercicios: [
        mc('¿Cuándo conviene usar `for`?', ['Cuando sabes cuántas veces repetir', 'Cuando no sabes cuántas veces', 'Para tomar decisiones', 'Para leer textos'], 0, ''),
        escribe('¿Cuántas veces se muestra "Hola"?', C`for(i = 1; i <= 4; i++){
    printf("Hola");
}`, ['4'], 'i vale 1, 2, 3 y 4.'),
        escribe('¿Qué muestra? Escribe los números separados por un espacio.', C`for(i = 3; i >= 1; i--){
    printf("%d ", i);
}`, ['3 2 1'], ''),
        completa('Muestra los números del 1 al 10:', C`for(i = ___; i <= ___; i___){
    printf("%d\n", i);
}`, ['1', '10', '++', '0', '--', '11'], ['1', '10', '++'], ''),
        mc('¿Qué separa las 3 partes del for?', ['Punto y coma ;', 'Comas ,', 'Espacios', 'Dos puntos :'], 0, ''),
        escribe('¿Cuánto vale `suma` al final?', C`int suma = 0;
for(i = 1; i <= 4; i++){
    suma = suma + i;
}`, ['10'], '1 + 2 + 3 + 4 = 10'),
        escribe('¿Qué muestra? (números separados por espacio)', C`for(i = 0; i <= 6; i += 3){
    printf("%d ", i);
}`, ['0 3 6'], '')
      ],
      reto: {
        enunciado: 'Pide un número y muestra su tabla de multiplicar del 1 al 12.',
        solucion: C`#include<stdio.h>                                // librería
int main(){                                      // inicio
    int n, i;                                    // número y contador
    printf("Numero: ");                          // pide el número
    scanf("%d", &n);                             // lo lee
    for(i = 1; i <= 12; i++){                    // del 1 al 12
        printf("%d x %d = %d\n", n, i, n * i);   // una línea de la tabla
    }
    return 0;                                    // fin
}`
      },
      resumen: [
        '`for(inicio; condicion; aumento){ ... }`',
        'Úsalo cuando **sabes cuántas veces** repetir.',
        '`i++` sube de 1 en 1, `i--` baja, `i += 2` sube de 2 en 2.'
      ]
    },

    /* ---------- 5: while ---------- */
    {
      id: 'e2l5', titulo: 'Bucle while', icono: '🔄', desc: 'Repetir mientras se cumpla algo.',
      teoria: [
        { h: 'Repetir mientras se cumpla', p: '`while` significa **"mientras"**. Repite el bloque **mientras la condición sea verdadera**. Úsalo cuando **no sabes cuántas veces** se va a repetir.', code: C`int clave;                               // variable
printf("Clave: ");                       // pide la clave
scanf("%d", &clave);                     // lee la clave
while(clave != 1234){                    // mientras sea incorrecta
    printf("Incorrecta. Otra vez: ");    // avisa
    scanf("%d", &clave);                 // vuelve a leer
}
printf("Bienvenido\n");                  // acertó` },
        { h: 'for vs while', p: 'En el `for` las 3 partes van juntas. En el `while` están **separadas**:', code: C`int i = 1;           // inicio (antes)
while(i <= 3){       // condición
    printf("Hola\n");
    i++;             // aumento (adentro)
}`, p2: '⚠️ Si nada cambia la condición dentro del while, se repite **para siempre**: eso es un **bucle infinito**.' }
      ],
      ejercicios: [
        mc('¿Qué significa `while`?', ['Mientras', 'Si', 'Para', 'Hacer'], 0, ''),
        mc('¿Cuál es mejor para "pedir la clave hasta que la acierte"?', ['while', 'for', 'switch', 'if'], 0, 'No sabes cuántos intentos hará el usuario.'),
        escribe('¿Cuántas veces se muestra "Hola"?', C`int i = 1;
while(i <= 3){
    printf("Hola");
    i++;
}`, ['3'], ''),
        mc('¿Qué pasa con este código?', ['Se repite para siempre (bucle infinito)', 'Muestra Hola 5 veces', 'No muestra nada', 'Da error al compilar'], 0, '`i` nunca cambia, así que `i <= 5` siempre es verdadero.', C`int i = 1;
while(i <= 5){
    printf("Hola");
}`),
        escribe('¿Qué muestra? (números separados por espacio)', C`int n = 10;
while(n > 0){
    printf("%d ", n);
    n = n - 4;
}`, ['10 6 2'], 'Después de 2, n vale -2 y se detiene.'),
        escribe('¿Cuántas veces se ejecuta el bloque?', C`int x = 5;
while(x < 3){
    printf("Hola");
}`, ['0'], 'La condición es falsa desde el inicio: el while no entra ni una vez.')
      ],
      reto: {
        enunciado: 'Pide precios de productos uno por uno y súmalos. Cuando el usuario escriba 0, muestra el total a pagar.',
        solucion: C`#include<stdio.h>                               // librería
int main(){                                     // inicio
    float precio, total = 0;                    // acumulador en 0
    printf("Precio (0 para terminar): ");       // pide el primero
    scanf("%f", &precio);                       // lo lee
    while(precio != 0){                         // mientras no sea 0
        total = total + precio;                 // suma
        printf("Precio (0 para terminar): ");   // pide otro
        scanf("%f", &precio);                   // lo lee
    }
    printf("Total a pagar: $%.2f\n", total);    // muestra el total
    return 0;                                   // fin
}`
      },
      resumen: [
        '`while(condicion){ ... }` → repite **mientras** se cumpla.',
        'Úsalo cuando **no sabes** cuántas veces repetir.',
        'Inicio antes, aumento adentro. Si no cambias la condición: **bucle infinito**.'
      ]
    },

    /* ---------- 6: do while ---------- */
    {
      id: 'e2l6', titulo: 'Bucle do while', icono: '🔂', desc: 'Hacer mínimo una vez.',
      teoria: [
        { h: 'Primero hace, luego pregunta', p: '`do while` ejecuta el bloque **al menos una vez** y **después** revisa la condición.', code: C`int edad;
do{                                  // haz esto
    printf("Edad (0 a 120): ");      // pide la edad
    scanf("%d", &edad);              // lee la edad
}while(edad < 0 || edad > 120);      // repite si no es válida` },
        { h: '¿Cuándo usarlo?', p: 'Perfecto para **validar datos** y para **menús** que deben aparecer mínimo una vez.\n\n• `while`: puede que no se ejecute nunca.\n• `do while`: siempre se ejecuta **mínimo 1 vez**.\n\n⚠️ Después de `while(...)` en el do while **sí va punto y coma**.' }
      ],
      ejercicios: [
        mc('¿Cuántas veces como mínimo se ejecuta un do while?', ['1', '0', '2', 'Depende'], 0, ''),
        escribe('¿Cuántas veces se muestra "Hola"?', C`int x = 10;
do{
    printf("Hola");
}while(x < 5);`, ['1'], 'Aunque la condición es falsa, el do while hace una vuelta primero.'),
        completa('Completa el do while:', C`___{
    printf("Opcion: ");
    scanf("%d", &op);
}___(op != 0)___`, ['do', 'while', ';', 'for', '{'], ['do', 'while', ';'], ''),
        vf('En un do while, la condición se revisa al final.', true, ''),
        mc('¿Cuál es ideal para un menú que se repite hasta elegir "Salir"?', ['do while', 'for', 'if', 'switch solo'], 0, 'El menú debe mostrarse al menos una vez.'),
        escribe('¿Qué muestra? (números separados por espacio)', C`int i = 1;
do{
    printf("%d ", i);
    i = i * 2;
}while(i < 10);`, ['1 2 4 8'], 'Cuando i llega a 16, ya no es menor que 10.')
      ],
      reto: {
        enunciado: 'Haz un menú con do while: 1 = Saludar, 2 = Ver tu promedio (pide 2 notas), 0 = Salir. Se repite hasta que el usuario elija 0.',
        solucion: C`#include<stdio.h>                                   // librería
int main(){                                         // inicio
    int op;                                         // opción
    float n1, n2;                                   // notas
    do{                                             // repite el menú
        printf("\n1. Saludar\n2. Promedio\n0. Salir\nOpcion: ");
        scanf("%d", &op);                           // lee la opción
        switch(op){
            case 1: printf("Hola!\n"); break;       // saludo
            case 2:
                printf("Dos notas: ");
                scanf("%f %f", &n1, &n2);
                printf("Promedio: %.2f\n", (n1 + n2) / 2);
                break;
            case 0: printf("Chao\n"); break;        // salir
            default: printf("Opcion no valida\n");
        }
    }while(op != 0);                                // hasta elegir 0
    return 0;                                       // fin
}`
      },
      resumen: [
        '`do{ ... }while(condicion);` → se ejecuta **mínimo 1 vez**.',
        'Ideal para validar datos y menús.',
        'Lleva `;` al final del `while(...)`.'
      ]
    },

    /* ---------- 7: contadores y acumuladores ---------- */
    {
      id: 'e2l7', titulo: 'Contadores y acumuladores', icono: '🧮', desc: 'Contar y sumar dentro de bucles.',
      teoria: [
        { h: 'Contador', p: 'Una variable que **cuenta** cuántas veces pasa algo. Empieza en 0 y suma de **1 en 1**.', code: C`int aprobados = 0;           // el contador empieza en 0
if(nota >= 14){
    aprobados++;             // suma 1
}` },
        { h: 'Acumulador', p: 'Una variable que **va sumando** valores. También empieza en 0.', code: C`float total = 0;                 // empieza en 0
for(i = 1; i <= 3; i++){
    printf("Precio: ");
    scanf("%f", &precio);
    total = total + precio;      // acumula
}`, p2: 'Contador = **cuántos**. Acumulador = **cuánto en total**. Con los dos sacas promedios: `promedio = total / cantidad`.' }
      ],
      ejercicios: [
        mc('Para saber **cuántos** estudiantes aprobaron, usas un...', ['Contador', 'Acumulador', 'Arreglo', 'switch'], 0, ''),
        mc('Para saber el **total** de dinero vendido, usas un...', ['Acumulador', 'Contador', 'Casting', 'break'], 0, ''),
        vf('Un contador debe empezar en 0 antes del ciclo.', true, 'Si no lo inicias, tendrá un valor basura.'),
        escribe('¿Cuánto vale `pares` al final?', C`int pares = 0;
for(i = 1; i <= 6; i++){
    if(i % 2 == 0){
        pares++;
    }
}`, ['3'], 'Los pares son 2, 4 y 6.'),
        completa('Suma las 5 notas:', C`int suma = ___;
for(i = 1; i <= 5; i++){
    scanf("%d", &nota);
    suma = suma ___ nota;
}`, ['0', '+', '1', '*'], ['0', '+'], ''),
        escribe('¿Cuánto vale `total`?', C`int total = 0;
for(i = 1; i <= 3; i++){
    total += 10;
}`, ['30'], '')
      ],
      reto: {
        enunciado: 'Pide las notas de 5 estudiantes (sobre 20). Muestra cuántos aprobaron (14 o más), cuántos reprobaron y el promedio del grupo.',
        solucion: C`#include<stdio.h>                                      // librería
int main(){                                            // inicio
    int i, aprobados = 0, reprobados = 0;              // contadores
    float nota, suma = 0;                              // acumulador
    for(i = 1; i <= 5; i++){                           // 5 estudiantes
        printf("Nota %d: ", i);                        // pide la nota
        scanf("%f", &nota);                            // la lee
        suma += nota;                                  // acumula
        if(nota >= 14) aprobados++;                    // cuenta aprobados
        else reprobados++;                             // cuenta reprobados
    }
    printf("Aprobados: %d\n", aprobados);
    printf("Reprobados: %d\n", reprobados);
    printf("Promedio: %.2f\n", suma / 5);
    return 0;                                          // fin
}`
      },
      resumen: [
        '**Contador:** cuenta de 1 en 1 (`c++`). Empieza en 0.',
        '**Acumulador:** va sumando valores (`total += x`). Empieza en 0.',
        'Promedio = acumulador / contador.'
      ]
    },

    /* ---------- 7b: stdlib.h ---------- */
    {
      id: 'e2l15', titulo: 'Números al azar (stdlib.h)', icono: '🎲', desc: 'rand, srand y otras utilidades.',
      teoria: [
        { h: 'La librería stdlib.h', p: '`#include<stdlib.h>` (en C++ `<cstdlib>`) trae utilidades:\n\n• `rand()` → un número al azar\n• `srand(semilla)` → cambia la "semilla" del azar\n• `abs(x)` → valor absoluto de un entero\n• `system("cls")` → limpia la pantalla (en Windows)\n• `exit(0)` → termina el programa' },
        { h: 'Números al azar', p: '`rand() % N` da un número entre **0 y N-1**. Para que cambie en cada ejecución se usa `srand(time(NULL))` **una sola vez** al inicio (necesita `time.h`).', code: C`#include<stdio.h>                  // printf
#include<stdlib.h>                 // rand, srand
#include<time.h>                   // time
int main(){
    srand(time(NULL));             // semilla con la hora actual
    int dado = rand() % 6 + 1;     // número del 1 al 6
    printf("Salio: %d\n", dado);
    return 0;
}` },
        { h: 'Fórmula para un rango', p: 'Para un número entre **min** y **max**:', code: C`int n = rand() % (max - min + 1) + min;
// entre 10 y 20:  rand() % 11 + 10`, p2: 'Sin `srand`, el programa saca **los mismos números** cada vez que lo ejecutas.' }
      ],
      ejercicios: [
        mc('¿Qué librería tiene `rand` y `srand`?', ['stdlib.h', 'stdio.h', 'math.h', 'string.h'], 0, ''),
        mc('¿Qué rango da `rand() % 6`?', ['De 0 a 5', 'De 1 a 6', 'De 0 a 6', 'De 1 a 5'], 0, 'El residuo de dividir para 6 va de 0 a 5.'),
        mc('¿Cómo simulas un dado (1 a 6)?', ['rand() % 6 + 1', 'rand() % 6', 'rand() % 7', 'rand(1, 6)'], 0, ''),
        vf('Sin `srand(time(NULL))`, el programa saca los mismos números en cada ejecución.', true, ''),
        completa('Número al azar del 1 al 100:', C`int n = rand() ___ 100 ___ 1;`, ['%', '+', '*', '-'], ['%', '+'], ''),
        mc('¿Qué hace `system("cls")` en Windows?', ['Limpia la pantalla', 'Cierra Code::Blocks', 'Borra el programa', 'Apaga la PC'], 0, '')
      ],
      reto: {
        enunciado: 'Juego "Adivina el número": la computadora piensa un número del 1 al 50. El usuario intenta adivinarlo y el programa le dice "Mas alto" o "Mas bajo" hasta que acierte. Al final muestra en cuántos intentos lo logró.',
        solucion: C`#include<stdio.h>                                   // printf, scanf
#include<stdlib.h>                                  // rand, srand
#include<time.h>                                    // time
int main(){                                         // inicio
    int secreto, intento, intentos = 0;             // variables
    srand(time(NULL));                              // semilla
    secreto = rand() % 50 + 1;                      // del 1 al 50
    do{                                             // repite
        printf("Adivina (1 a 50): ");
        scanf("%d", &intento);
        intentos++;                                 // contador
        if(intento < secreto) printf("Mas alto\n");
        else if(intento > secreto) printf("Mas bajo\n");
    }while(intento != secreto);                     // hasta acertar
    printf("Correcto! Lo lograste en %d intentos\n", intentos);
    return 0;                                       // fin
}`
      },
      resumen: [
        '`#include<stdlib.h>`: `rand`, `srand`, `abs`, `system`, `exit`.',
        '`rand() % N` → de 0 a N-1. Dado: `rand() % 6 + 1`.',
        '`srand(time(NULL));` una vez al inicio (con `time.h`).'
      ]
    },

    /* ---------- 8: arreglos ---------- */
    {
      id: 'e2l8', titulo: 'Arreglos', icono: '📊', desc: 'Definición y uso de arreglos.',
      teoria: [
        { h: 'Crear un arreglo', p: 'Un arreglo guarda **muchos datos del mismo tipo**. Las posiciones van de **0** a **tamaño - 1**.', code: C`int notas[5];                          // 5 cajitas
float precios[3] = {1.5, 2.25, 0.75};  // con valores
notas[0] = 18;                         // guarda 18 en la posición 0` },
        { h: 'Recorrer con for', p: 'El `for` y los arreglos son mejores amigos: el contador `i` sirve como posición.', code: C`int notas[5];
for(i = 0; i < 5; i++){                    // de 0 a 4
    printf("Nota %d: ", i + 1);            // pide cada nota
    scanf("%d", &notas[i]);                // la guarda en la posición i
}
for(i = 0; i < 5; i++){
    printf("%d ", notas[i]);               // muestra todas
}`, p2: '⚠️ Usa `i < 5`, no `i <= 5`: la posición 5 **no existe** en un arreglo de 5.' }
      ],
      ejercicios: [
        mc('En `int datos[10];` ¿cuál es la última posición válida?', ['9', '10', '11', '1'], 0, 'Va de 0 a 9.'),
        completa('Recorre el arreglo de 4 elementos:', C`for(i = ___; i ___ 4; i++){
    printf("%d", lista[i]);
}`, ['0', '<', '1', '<='], ['0', '<'], 'De la posición 0 a la 3.'),
        escribe('¿Qué muestra?', C`int a[4] = {5, 10, 15, 20};
printf("%d", a[1] + a[3]);`, ['30'], '10 + 20 = 30'),
        vf('En `int v[3];` puedo usar `v[3]`.', false, 'Las posiciones son 0, 1 y 2. `v[3]` se sale del arreglo y causa errores.'),
        escribe('¿Cuánto vale `s`?', C`int a[3] = {2, 4, 6};
int s = 0;
for(i = 0; i < 3; i++){
    s += a[i];
}`, ['12'], ''),
        mc('¿Cómo guardas 25 en la **tercera** posición del arreglo `edad`?', ['edad[2] = 25;', 'edad[3] = 25;', 'edad = 25;', 'edad(2) = 25;'], 0, 'La tercera posición es la 2 (0, 1, 2).')
      ],
      reto: {
        enunciado: 'Pide los precios de 5 productos, guárdalos en un arreglo y después muéstralos todos con 2 decimales.',
        solucion: C`#include<stdio.h>                                // librería
int main(){                                      // inicio
    float precios[5];                            // arreglo de 5
    int i;                                       // contador
    for(i = 0; i < 5; i++){                      // llenar
        printf("Precio %d: ", i + 1);
        scanf("%f", &precios[i]);
    }
    for(i = 0; i < 5; i++){                      // mostrar
        printf("Producto %d: $%.2f\n", i + 1, precios[i]);
    }
    return 0;                                    // fin
}`
      },
      resumen: [
        '`tipo nombre[tamaño];` → posiciones de 0 a tamaño-1.',
        'Recorre con `for(i = 0; i < tamaño; i++)`.',
        'Salirse del arreglo es un error grave.'
      ]
    },

    /* ---------- 9: operaciones con arreglos ---------- */
    {
      id: 'e2l9', titulo: 'Operaciones con arreglos', icono: '🔍', desc: 'Sumar, mayor, menor y buscar.',
      teoria: [
        { h: 'Sumar y promediar', code: C`float suma = 0;                       // acumulador
for(i = 0; i < n; i++){
    suma += notas[i];                 // suma cada nota
}
float promedio = suma / n;            // promedio`, p: 'Recorres el arreglo y acumulas cada valor.' },
        { h: 'El mayor y el menor', p: 'Truco: asume que el **primero** es el mayor y compáralo con los demás.', code: C`int mayor = notas[0];                 // asumimos el primero
for(i = 1; i < n; i++){
    if(notas[i] > mayor){             // si hay uno más grande
        mayor = notas[i];             // lo guardamos
    }
}` },
        { h: 'Buscar un valor', code: C`int encontrado = 0;                   // 0 = no, 1 = sí
for(i = 0; i < n; i++){
    if(codigos[i] == buscado){        // si coincide
        encontrado = 1;
        printf("Esta en la posicion %d\n", i);
    }
}`, p: 'Revisas uno por uno hasta encontrarlo.' }
      ],
      ejercicios: [
        mc('Para encontrar el mayor, ¿con qué valor empiezas `mayor`?', ['Con el primer elemento del arreglo', 'Con 0 siempre', 'Con 100', 'Con el tamaño del arreglo'], 0, 'Si empiezas en 0 y todos los números son negativos, fallaría.'),
        completa('Encuentra el menor:', C`int menor = v[0];
for(i = 1; i < n; i++){
    if(v[i] ___ menor){
        menor = ___;
    }
}`, ['<', 'v[i]', '>', 'i'], ['<', 'v[i]'], ''),
        escribe('¿Qué valor queda en `mayor`?', C`int v[5] = {7, 3, 12, 9, 4};
int mayor = v[0];
for(i = 1; i < 5; i++){
    if(v[i] > mayor) mayor = v[i];
}`, ['12'], ''),
        escribe('¿Cuál es el promedio de {10, 20, 30}?', null, ['20'], '(10 + 20 + 30) / 3 = 20'),
        mc('¿Qué hace este código?', ['Cuenta cuántos valores son mayores a 15', 'Suma los valores', 'Busca el menor', 'Ordena el arreglo'], 0, '', C`int c = 0;
for(i = 0; i < n; i++){
    if(v[i] > 15) c++;
}`),
        escribe('¿En qué posición está el 8?', C`int v[4] = {3, 5, 8, 1};`, ['2'], 'Posiciones: 0→3, 1→5, 2→8.')
      ],
      reto: {
        enunciado: 'Guarda las notas de 6 estudiantes en un arreglo. Muestra la nota más alta, la más baja y el promedio.',
        solucion: C`#include<stdio.h>                                // librería
int main(){                                      // inicio
    float notas[6], suma = 0, mayor, menor;      // variables
    int i;                                       // contador
    for(i = 0; i < 6; i++){                      // llenar el arreglo
        printf("Nota %d: ", i + 1);
        scanf("%f", &notas[i]);
    }
    mayor = notas[0];                            // asumimos la primera
    menor = notas[0];
    for(i = 0; i < 6; i++){                      // recorrer
        suma += notas[i];                        // acumular
        if(notas[i] > mayor) mayor = notas[i];   // nuevo mayor
        if(notas[i] < menor) menor = notas[i];   // nuevo menor
    }
    printf("Mayor: %.2f\nMenor: %.2f\nPromedio: %.2f\n", mayor, menor, suma / 6);
    return 0;                                    // fin
}`
      },
      resumen: [
        'Suma: acumula cada elemento. Promedio = suma / n.',
        'Mayor/menor: empieza con el **primer elemento** y compara.',
        'Buscar: recorre y compara con `==`.'
      ]
    },

    /* ---------- 10: matrices ---------- */
    {
      id: 'e2l10', titulo: 'Matrices', icono: '🧱', desc: 'Tablas de filas y columnas.',
      teoria: [
        { h: 'Arreglos de 2 dimensiones', p: 'Una **matriz** es una tabla con **filas y columnas**. Se usan dos índices: `[fila][columna]`.', code: C`int m[2][3] = {               // 2 filas, 3 columnas
    {1, 2, 3},
    {4, 5, 6}
};
printf("%d", m[1][2]);        // fila 1, columna 2 → 6` },
        { h: 'Recorrer con dos for', p: 'Un `for` para las filas y **otro adentro** para las columnas (for anidado).', code: C`for(i = 0; i < 2; i++){              // filas
    for(j = 0; j < 3; j++){          // columnas
        printf("%d ", m[i][j]);      // muestra el elemento
    }
    printf("\n");                    // salto al terminar la fila
}`, p2: 'Ejemplo real: las notas de 23 estudiantes en 3 parciales → `float notas[23][3];`' },
        { h: 'Multidimensionales', p: 'También existen de 3 o más dimensiones, por ejemplo `int cubo[2][3][4];`. Se recorren con un `for` por cada dimensión. En la práctica, la más usada es la de 2.' }
      ],
      ejercicios: [
        mc('En `int t[3][4];` ¿cuántos elementos hay?', ['12', '7', '34', '3'], 0, '3 filas × 4 columnas = 12.'),
        escribe('¿Qué muestra?', C`int m[2][2] = {{1, 2}, {3, 4}};
printf("%d", m[1][0]);`, ['3'], 'Fila 1 (la segunda), columna 0 (la primera).'),
        mc('Para recorrer una matriz necesitas...', ['Dos for, uno dentro del otro', 'Un solo if', 'Un switch', 'Un do while sin condición'], 0, ''),
        completa('Recorre la matriz de 3x3:', C`for(i = 0; i < 3; i++){
    for(___ = 0; j < 3; j++){
        printf("%d ", m[i][___]);
    }
}`, ['j', 'j', 'i', 'k'], ['j', 'j'], ''),
        escribe('¿Cuánto vale `s`?', C`int m[2][2] = {{1, 2}, {3, 4}};
int s = 0;
for(i = 0; i < 2; i++)
    for(j = 0; j < 2; j++)
        s += m[i][j];`, ['10'], '1 + 2 + 3 + 4 = 10'),
        vf('En `m[fila][columna]`, el primer índice es la columna.', false, 'Primero va la fila y luego la columna.')
      ],
      reto: {
        enunciado: 'Guarda las notas de 3 estudiantes en 3 parciales (matriz 3x3) y muestra el promedio de cada estudiante.',
        solucion: C`#include<stdio.h>                                   // librería
int main(){                                         // inicio
    float notas[3][3], suma;                        // matriz y acumulador
    int i, j;                                       // contadores
    for(i = 0; i < 3; i++){                         // cada estudiante
        for(j = 0; j < 3; j++){                     // cada parcial
            printf("Estudiante %d, parcial %d: ", i + 1, j + 1);
            scanf("%f", &notas[i][j]);
        }
    }
    for(i = 0; i < 3; i++){                         // promedio por fila
        suma = 0;
        for(j = 0; j < 3; j++) suma += notas[i][j];
        printf("Promedio estudiante %d: %.2f\n", i + 1, suma / 3);
    }
    return 0;                                       // fin
}`
      },
      resumen: [
        'Matriz: `tipo m[filas][columnas];`',
        'Se recorre con dos `for` anidados (i filas, j columnas).',
        'Total de elementos = filas × columnas.'
      ]
    },

    /* ---------- 11: cadenas ---------- */
    {
      id: 'e2l11', titulo: 'Cadenas de caracteres', icono: '🔤', desc: 'Textos en C/C++.',
      teoria: [
        { h: 'Textos en C', p: 'Un texto (cadena) es un **arreglo de char**. Al final lleva un carácter invisible `\\0` que marca dónde termina.', code: C`char nombre[20] = "Mateo";    // caben 19 letras + el \0
printf("Hola %s\n", nombre);   // %s muestra cadenas` },
        { h: 'Leer textos', p: '• `scanf("%s", nombre);` lee **una sola palabra**. No lleva `&`, porque una cadena ya es una dirección.\n• Para leer con espacios: `fgets(nombre, 20, stdin);`', code: C`char ciudad[30];                    // espacio para el texto
printf("Ciudad: ");                 // pide la ciudad
scanf("%s", ciudad);                // sin & en cadenas
printf("Vives en %s\n", ciudad);    // la muestra` },
        { h: 'Letra por letra', p: 'Como es un arreglo, puedes ver cada letra por su posición:', code: C`char palabra[10] = "ESPE";
printf("%c", palabra[0]);   // E
printf("%c", palabra[1]);   // S` }
      ],
      ejercicios: [
        mc('¿Qué formato se usa para mostrar una cadena?', ['%s', '%c', '%d', '%f'], 0, '`s` de "string" (cadena).'),
        vf('En `scanf("%s", nombre);` la cadena lleva `&`.', false, 'Las cadenas no llevan `&` en scanf.'),
        escribe('¿Qué muestra?', C`char p[10] = "Quito";
printf("%c", p[1]);`, ['u'], 'Posición 0 = Q, posición 1 = u.'),
        mc('¿Qué marca el final de una cadena?', ['\\0', '\\n', 'Un punto', 'Un espacio'], 0, ''),
        mc('`char ciudad[10];` ¿cuántas letras caben como máximo?', ['9', '10', '11', 'Infinitas'], 0, 'Una posición se reserva para el `\\0`.'),
        mc('Para leer "Juan Carlos" con espacio incluido, usas...', ['fgets', 'scanf con %s', 'printf', '%c'], 0, '`scanf("%s")` se detiene en el primer espacio.')
      ],
      reto: {
        enunciado: 'Pide el nombre y la ciudad de una persona (una palabra cada uno) y muestra: "Hola NOMBRE, saludos a CIUDAD".',
        solucion: C`#include<stdio.h>                                   // librería
int main(){                                         // inicio
    char nombre[30], ciudad[30];                    // dos cadenas
    printf("Nombre: ");                             // pide el nombre
    scanf("%s", nombre);                            // sin &
    printf("Ciudad: ");                             // pide la ciudad
    scanf("%s", ciudad);                            // sin &
    printf("Hola %s, saludos a %s\n", nombre, ciudad);
    return 0;                                       // fin
}`
      },
      resumen: [
        'Cadena = arreglo de `char` que termina en `\\0`.',
        'Se muestra con `%s`. En scanf **no** lleva `&`.',
        '`scanf("%s")` lee una palabra; `fgets` lee con espacios.'
      ]
    },

    /* ---------- 12: funciones de cadenas ---------- */
    {
      id: 'e2l12', titulo: 'Funciones de cadenas', icono: '✂️', desc: 'strlen, strcpy, strcat y strcmp.',
      teoria: [
        { h: 'La librería string.h', p: 'Para trabajar con cadenas hay funciones listas en `#include<string.h>`:\n\n• `strlen(c)` → cuántas letras tiene\n• `strcpy(destino, origen)` → copia un texto\n• `strcat(destino, origen)` → une (pega) textos\n• `strcmp(a, b)` → compara: da **0** si son iguales' },
        { h: 'Ejemplo', code: C`#include<stdio.h>                       // printf
#include<string.h>                      // funciones de cadenas
int main(){
    char a[30] = "Hola";                // texto inicial
    char b[30];                         // vacía
    strcpy(b, "ESPE");                  // b = "ESPE"
    strcat(a, " ");                     // a = "Hola "
    strcat(a, b);                       // a = "Hola ESPE"
    printf("%s\n", a);                  // Hola ESPE
    printf("%d\n", (int)strlen(a));     // 9
    return 0;
}`, p: 'Cuenta los espacios: "Hola ESPE" tiene 9 caracteres.' },
        { h: 'Comparar textos', p: '⚠️ Los textos **no** se comparan con `==`. Usa `strcmp`:', code: C`if(strcmp(clave, "espe2026") == 0){   // 0 = son iguales
    printf("Acceso permitido\n");
}` }
      ],
      ejercicios: [
        mc('¿Qué librería tiene strlen, strcpy, strcat y strcmp?', ['string.h', 'stdio.h', 'math.h', 'stdlib.h'], 0, ''),
        escribe('¿Qué da `strlen("Ambato")`?', null, ['6'], 'A-m-b-a-t-o: 6 letras.'),
        mc('¿Qué devuelve `strcmp` si los dos textos son iguales?', ['0', '1', '-1', 'true'], 0, ''),
        mc('¿Cómo copias "Latacunga" en la cadena `c`?', ['strcpy(c, "Latacunga");', 'c = "Latacunga";', 'strcat("Latacunga", c);', 'strlen(c, "Latacunga");'], 0, 'Con arreglos de char no se usa `=` después de declararlos.'),
        escribe('¿Qué muestra?', C`char a[20] = "Code";
strcat(a, "Andes");
printf("%s", a);`, ['CodeAndes'], '`strcat` pega el segundo texto al final del primero.'),
        vf('Para comparar dos cadenas puedo usar `if(a == b)`.', false, 'Usa `strcmp(a, b) == 0`.')
      ],
      reto: {
        enunciado: 'Pide un usuario y una contraseña. Si el usuario es "admin" y la contraseña es "espe123", muestra "Bienvenido"; si no, "Datos incorrectos". Muestra también cuántas letras tiene el usuario.',
        solucion: C`#include<stdio.h>                                         // printf, scanf
#include<string.h>                                        // strcmp, strlen
int main(){                                               // inicio
    char usuario[30], clave[30];                          // cadenas
    printf("Usuario: ");
    scanf("%s", usuario);
    printf("Clave: ");
    scanf("%s", clave);
    if(strcmp(usuario, "admin") == 0 && strcmp(clave, "espe123") == 0){
        printf("Bienvenido\n");                           // datos correctos
    }else{
        printf("Datos incorrectos\n");                    // datos mal
    }
    printf("Tu usuario tiene %d letras\n", (int)strlen(usuario));
    return 0;                                             // fin
}`
      },
      resumen: [
        '`#include<string.h>`',
        '`strlen` largo, `strcpy` copiar, `strcat` unir, `strcmp` comparar (0 = iguales).',
        'Nunca compares cadenas con `==`.'
      ]
    },

    /* ---------- 13: errores ---------- */
    {
      id: 'e2l13', titulo: 'Errores y depuración', icono: '🐞', desc: 'Tipos de errores y cómo encontrarlos.',
      teoria: [
        { h: 'Tipos de errores', p: '• **De sintaxis (compilación):** escribiste algo mal. El programa ni siquiera arranca. Ej.: falta un `;`.\n• **De ejecución:** compila, pero falla al correr. Ej.: dividir para 0 o salirse de un arreglo.\n• **De lógica:** corre sin fallar, pero el resultado está **mal**. Ej.: usar `+` en vez de `*`.' },
        { h: 'Leer los errores', p: 'Code::Blocks muestra los errores abajo, en **Build messages**, con el **número de línea**. Revisa esa línea y también **la de arriba**: si falta un `;`, el error suele marcarse en la línea siguiente.', code: C`int x = 5          // aquí falta ;
printf("%d", x);   // el error sale aquí: expected ';'` },
        { h: 'Depurar', p: '**Depurar** es buscar y corregir errores:\n\n• Pon `printf` de prueba para ver cuánto valen tus variables.\n• Usa el **depurador** de Code::Blocks: haz clic junto al número de línea para poner un **breakpoint** (punto rojo), inicia con **Debug → Start (F8)** y avanza línea por línea con **Next line (F7)** mientras miras las variables en **Watches**.' }
      ],
      ejercicios: [
        mc('Olvidar un `;` es un error de...', ['Sintaxis', 'Lógica', 'Ejecución', 'Internet'], 0, ''),
        mc('El programa corre, pero calcula mal el promedio. Es un error de...', ['Lógica', 'Sintaxis', 'Compilación', 'Teclado'], 0, 'Corre bien, pero la idea está mal.'),
        mc('Dividir para cero mientras el programa corre es un error de...', ['Ejecución', 'Sintaxis', 'Lógica', 'Ortografía'], 0, ''),
        mc('Encuentra el error:', ['Falta el ; después de int n = 4', 'Falta el return', 'printf está mal escrito', 'No hay error'], 0, '', C`int n = 4
printf("%d", n);`),
        mc('Encuentra el error de lógica: se quiere el promedio de a y b.', ['Faltan paréntesis: (a + b) / 2', 'Debe ser a * b', 'Falta un ;', 'No hay error'], 0, 'Sin paréntesis, primero se hace `b / 2`.', C`float prom = a + b / 2;`),
        vf('Un breakpoint sirve para pausar el programa en una línea y revisar las variables.', true, '')
      ],
      reto: {
        enunciado: 'Este programa debería **sumar** dos números, pero tiene 3 errores (uno de sintaxis, uno de ejecución y uno de lógica). Cópialo en Code::Blocks, encuéntralos y corrígelos.',
        code: C`#include<stdio.h>
int main(){
    int a, b, suma
    printf("Ingresa dos numeros: ");
    scanf("%d %d", a, b);
    suma = a - b;
    printf("Suma: %d\n", suma);
    return 0;
}`,
        solucion: C`#include<stdio.h>                         // librería
int main(){                               // inicio
    int a, b, suma;                       // 1) faltaba el ; (sintaxis)
    printf("Ingresa dos numeros: ");
    scanf("%d %d", &a, &b);               // 2) faltaban los & (ejecución)
    suma = a + b;                         // 3) era resta, no suma (lógica)
    printf("Suma: %d\n", suma);
    return 0;                             // fin
}`
      },
      resumen: [
        'Errores de **sintaxis** (no compila), **ejecución** (falla al correr) y **lógica** (resultado mal).',
        'Lee la línea del error y la de arriba.',
        'Depura con `printf` de prueba o con breakpoints (F8 iniciar, F7 siguiente línea).'
      ]
    },

    /* ---------- 14: excepciones ---------- */
    {
      id: 'e2l14', titulo: 'Excepciones', icono: '🛡️', desc: 'try, throw y catch.',
      teoria: [
        { h: '¿Qué es una excepción?', p: 'Es un **error que pasa mientras el programa corre** (por ejemplo, dividir para cero). En C++ puedes **atraparlo** para que el programa no se caiga y muestre un mensaje amable.' },
        { h: 'try, throw y catch', p: '• `try` → **intenta** el código que puede fallar\n• `throw` → **lanza** el error cuando detectas un problema\n• `catch` → **atrapa** el error y decide qué hacer', code: C`#include<stdio.h>                               // printf, scanf
int main(){
    int a, b;
    printf("Dos numeros: ");
    scanf("%d %d", &a, &b);
    try{                                        // intenta
        if(b == 0){
            throw "No se puede dividir para 0"; // lanza el error
        }
        printf("Resultado: %d\n", a / b);
    }catch(const char* msg){                    // atrapa el error
        printf("Error: %s\n", msg);             // mensaje amable
    }
    return 0;
}`, p2: 'Esto es de **C++** (no de C puro): guarda tu archivo como `.cpp` en Code::Blocks.' }
      ],
      ejercicios: [
        mc('¿Qué palabra **lanza** un error?', ['throw', 'try', 'catch', 'break'], 0, ''),
        mc('¿Qué palabra **atrapa** el error?', ['catch', 'try', 'throw', 'return'], 0, ''),
        ordena('Ordena la estructura:', ['try{', '    if(b == 0) throw "Error";', '}catch(const char* m){', '    printf("%s", m);', '}'], ''),
        escribe('Si `b` vale 0, ¿qué muestra?', C`try{
    if(b == 0) throw "Division por cero";
    printf("OK");
}catch(const char* m){
    printf("%s", m);
}`, ['Division por cero'], 'Se lanza el error y salta directo al catch.'),
        vf('Si no se lanza ningún error, el bloque catch no se ejecuta.', true, ''),
        mc('¿Para qué sirve manejar excepciones?', ['Para que el programa no se caiga y avise del error', 'Para que corra más rápido', 'Para declarar variables', 'Para repetir código'], 0, '')
      ],
      reto: {
        enunciado: 'Pide la edad. Si es negativa o mayor a 120, lanza una excepción con el mensaje "Edad no valida" y atrápala. Si es correcta, muéstrala.',
        solucion: C`#include<stdio.h>                                // librería
int main(){                                      // inicio
    int edad;                                    // variable
    printf("Edad: ");
    scanf("%d", &edad);
    try{                                         // intenta
        if(edad < 0 || edad > 120){
            throw "Edad no valida";              // lanza el error
        }
        printf("Tu edad es %d\n", edad);         // todo bien
    }catch(const char* msg){                     // atrapa
        printf("Error: %s\n", msg);
    }
    return 0;                                    // fin
}`
      },
      resumen: [
        'Excepción = error mientras el programa corre.',
        '`try` intenta, `throw` lanza, `catch` atrapa.',
        'Es de C++: usa archivos `.cpp`.'
      ]
    }
  ]
});
