/* ===================== ETAPA 5 · Avanzado ===================== */
CURSO.push({
  id: 'e5', nombre: 'Nivel avanzado', etiqueta: 'Punteros, objetos y STL',
  color: '#FF4B4B', sombra: '#D93636', medalla: '🚀', logro: 'Nivel avanzado',
  lecciones: [

    /* ---------- 1 ---------- */
    {
      id: 'e5l1', titulo: 'Punteros', icono: '👉', desc: 'Direcciones de memoria y referencias.',
      teoria: [
        { h: 'Direcciones de memoria', p: 'Cada variable vive en un lugar de la memoria que tiene una **dirección**. Con `&` obtienes esa dirección (¡por eso `scanf` usaba `&`!).', code: C`int edad = 20;
cout << edad << endl;     // 20 (el valor)
cout << &edad << endl;    // 0x61fe1c (la dirección; cambia en cada PC)` },
        { h: '¿Qué es un puntero?', p: 'Es una variable que **guarda una dirección**. Se declara con `*`.', code: C`int edad = 20;
int *p = &edad;      // p apunta a edad
cout << *p;          // 20: *p lee lo que hay en esa dirección
*p = 25;             // cambia edad a través del puntero
cout << edad;        // 25`, p2: '• `&x` → la dirección de x\n• `*p` → el valor al que apunta p' },
        { h: 'Paso por referencia', p: 'Con `&` en el parámetro, una función **sí puede cambiar** la variable original (no recibe una copia):', code: C`void duplicar(int &n){   // & = por referencia
    n = n * 2;
}
int x = 5;
duplicar(x);              // x ahora vale 10` }
      ],
      ejercicios: [
        mc('¿Qué guarda un puntero?', ['Una dirección de memoria', 'Un texto', 'Un decimal', 'Una función'], 0, ''),
        mc('¿Qué te da `&x`?', ['La dirección de x', 'El valor de x', 'El doble de x', 'Un error'], 0, ''),
        escribe('¿Qué muestra?', C`int a = 7;
int *p = &a;
*p = 12;
cout << a;`, ['12'], 'Cambiaste `a` a través del puntero.'),
        completa('Crea un puntero que apunte a `n`:', C`int n = 3;
int ___p = ___n;`, ['*', '&', '#', '@'], ['*', '&'], ''),
        escribe('¿Qué muestra?', C`void sumar1(int &x){ x++; }
int v = 9;
sumar1(v);
cout << v;`, ['10'], 'Por referencia sí cambia la original.'),
        vf('`*p` muestra la dirección guardada en p.', false, '`*p` muestra el **valor** al que apunta. `p` solo es la dirección.')
      ],
      reto: {
        enunciado: 'Haz una función `void intercambiar(int *a, int *b)` que intercambie dos números usando punteros. Pruébala en main.',
        solucion: C`#include<iostream>                                // cout
using namespace std;
void intercambiar(int *a, int *b){                // recibe direcciones
    int aux = *a;                                 // valor de a
    *a = *b;                                      // a toma el de b
    *b = aux;                                     // b toma el guardado
}
int main(){                                       // inicio
    int x = 3, y = 8;
    intercambiar(&x, &y);                         // se envían direcciones
    cout << "x = " << x << ", y = " << y << endl; // x = 8, y = 3
    return 0;                                     // fin
}`
      },
      resumen: [
        '`&x` = dirección de x. `int *p = &x;` = puntero a x.',
        '`*p` = valor al que apunta p.',
        'Parámetro `int &n` = por referencia: cambia la original.'
      ]
    },

    /* ---------- 2 ---------- */
    {
      id: 'e5l2', titulo: 'Memoria dinámica', icono: '🏗️', desc: 'new y delete.',
      teoria: [
        { h: 'Pedir memoria mientras corre', p: 'A veces no sabes cuántos datos tendrás hasta que el programa corre. Con `new` pides memoria **en ese momento**, y con `delete` la **devuelves**.', code: C`int n;
cout << "Cuantos estudiantes? ";
cin >> n;
float *notas = new float[n];     // arreglo del tamaño que dijo el usuario
for(int i = 0; i < n; i++){
    cin >> notas[i];
}
delete[] notas;                  // devuelve la memoria` },
        { h: 'Reglas de oro', p: '• Todo `new` necesita su `delete` (para arreglos: `delete[]`).\n• Si no liberas la memoria, hay una **fuga de memoria** (*memory leak*): el programa gasta memoria sin devolverla.\n• Después de `delete`, no uses más ese puntero.\n\nEn la lección de `vector` verás una forma más cómoda que hace esto por ti.' }
      ],
      ejercicios: [
        mc('¿Qué palabra pide memoria?', ['new', 'delete', 'malloc.h', 'int'], 0, ''),
        mc('¿Cómo liberas un arreglo creado con `new int[10]`?', ['delete[] p;', 'delete p[10];', 'free p;', 'p = 0;'], 0, ''),
        mc('¿Qué es una fuga de memoria?', ['Pedir memoria y nunca liberarla', 'Un virus', 'Un error de sintaxis', 'Borrar un archivo'], 0, ''),
        vf('Con `new` puedes crear un arreglo del tamaño que escriba el usuario.', true, ''),
        completa('Completa:', C`int *v = ___ int[5];
// ... usar v ...
___[] v;`, ['new', 'delete', 'free', 'malloc'], ['new', 'delete'], '')
      ],
      reto: {
        enunciado: 'Pregunta cuántos precios va a ingresar el usuario, crea un arreglo dinámico de ese tamaño, pide los precios, muestra el total y libera la memoria.',
        solucion: C`#include<iostream>                                // cin, cout
using namespace std;
int main(){                                       // inicio
    int n;
    cout << "Cuantos precios? ";
    cin >> n;
    float *p = new float[n];                      // memoria dinámica
    float total = 0;
    for(int i = 0; i < n; i++){
        cout << "Precio " << i + 1 << ": ";
        cin >> p[i];
        total += p[i];
    }
    cout << "Total: $" << total << endl;
    delete[] p;                                   // libera la memoria
    return 0;                                     // fin
}`
      },
      resumen: [
        '`new tipo[n]` pide memoria; `delete[]` la libera.',
        'Sin `delete` → fuga de memoria.',
        '`vector` lo hace automático (lección 7).'
      ]
    },

    /* ---------- 3 ---------- */
    {
      id: 'e5l3', titulo: 'Clases y objetos', icono: '🏛️', desc: 'Programación orientada a objetos.',
      teoria: [
        { h: 'Programación orientada a objetos', p: 'Una **clase** es un **molde** (como el plano de una casa). Un **objeto** es algo creado con ese molde (una casa real).\n\nLa clase tiene:\n• **Atributos:** datos (nombre, saldo…)\n• **Métodos:** funciones que sabe hacer (depositar, mostrar…)' },
        { h: 'Tu primera clase', code: C`class Cuenta{                          // el molde
public:
    string titular;                    // atributo
    float saldo;                       // atributo
    void depositar(float monto){       // método
        saldo = saldo + monto;
    }
    void mostrar(){                    // método
        cout << titular << ": $" << saldo << endl;
    }
};                                     // ¡lleva punto y coma!`, p: '`public:` significa que se puede usar desde afuera de la clase.' },
        { h: 'Crear objetos', code: C`Cuenta c1;                 // objeto 1
c1.titular = "Ana";
c1.saldo = 100;
c1.depositar(50);          // llama al método
c1.mostrar();              // Ana: $150`, p: 'Con el mismo molde puedes crear muchos objetos: `Cuenta c2, c3;` y cada uno tiene sus propios datos.' }
      ],
      ejercicios: [
        mc('Una clase es como...', ['Un molde o plano', 'Una variable int', 'Un bucle', 'Un archivo'], 0, ''),
        mc('Las funciones dentro de una clase se llaman...', ['Métodos', 'Atributos', 'Objetos', 'Librerías'], 0, ''),
        mc('Los datos dentro de una clase se llaman...', ['Atributos', 'Métodos', 'Parámetros', 'Bucles'], 0, ''),
        escribe('¿Qué muestra?', C`class Caja{
public:
    int n;
    void sumar(int x){ n += x; }
};
Caja c;
c.n = 5;
c.sumar(3);
cout << c.n;`, ['8'], ''),
        vf('Cada objeto tiene sus propios valores en los atributos.', true, ''),
        completa('Completa la clase:', C`___ Perro{
___:
    string nombre;
    void ladrar(){ cout << "Guau"; }
}___`, ['class', 'public', ';', 'struct', 'private'], ['class', 'public', ';'], '')
      ],
      reto: {
        enunciado: 'Crea una clase `Estudiante` con nombre y 3 notas, y un método `promedio()` que devuelva el promedio. Crea 2 estudiantes y muestra sus promedios.',
        solucion: C`#include<iostream>                                // cout
#include<string>                                  // string
using namespace std;
class Estudiante{                                 // molde
public:
    string nombre;
    float n1, n2, n3;
    float promedio(){                             // método
        return (n1 + n2 + n3) / 3;
    }
};
int main(){                                       // inicio
    Estudiante a, b;                              // dos objetos
    a.nombre = "Ana";  a.n1 = 18; a.n2 = 16; a.n3 = 17;
    b.nombre = "Luis"; b.n1 = 14; b.n2 = 15; b.n3 = 13;
    cout << a.nombre << ": " << a.promedio() << endl;
    cout << b.nombre << ": " << b.promedio() << endl;
    return 0;                                     // fin
}`
      },
      resumen: [
        '**Clase** = molde. **Objeto** = algo creado con el molde.',
        '**Atributos** = datos. **Métodos** = funciones de la clase.',
        '`class X{ public: ... };` y se usa con punto: `obj.metodo();`'
      ]
    },

    /* ---------- 4 ---------- */
    {
      id: 'e5l4', titulo: 'Encapsulamiento y constructores', icono: '🔒', desc: 'private, public y constructores.',
      teoria: [
        { h: 'public y private', p: '**Encapsular** es proteger los datos. Lo `private` **solo** se puede usar dentro de la clase; desde afuera se usan métodos `public`.', code: C`class Cuenta{
private:
    float saldo;                         // nadie lo toca desde afuera
public:
    void depositar(float m){
        if(m > 0) saldo += m;            // valida antes de cambiar
    }
    float getSaldo(){ return saldo; }    // para ver el saldo
};` },
        { h: 'Constructor', p: 'Un **constructor** es un método especial que se ejecuta **solo** al crear el objeto. Tiene el **mismo nombre que la clase** y no lleva tipo de retorno.', code: C`class Cuenta{
private:
    string titular;
    float saldo;
public:
    Cuenta(string t, float s){    // constructor
        titular = t;
        saldo = s;
    }
};
Cuenta c("Luis", 200);            // se crea con datos` },
        { h: 'Getters y setters', p: 'Es común crear métodos `getAlgo()` para **leer** un atributo privado y `setAlgo()` para **cambiarlo** con validación. Así nadie pone, por ejemplo, un saldo negativo.' }
      ],
      ejercicios: [
        mc('Un atributo `private`...', ['Solo se usa dentro de la clase', 'Se usa desde cualquier parte', 'No se puede usar nunca', 'Es lo mismo que public'], 0, ''),
        mc('¿Qué nombre tiene el constructor de la clase `Producto`?', ['Producto', 'constructor', 'init', 'new'], 0, ''),
        vf('El constructor se ejecuta automáticamente al crear el objeto.', true, ''),
        mc('¿Por qué conviene encapsular el saldo?', ['Para validar los cambios y evitar datos incorrectos', 'Para que el programa sea más largo', 'Porque public no existe', 'Para no usar métodos'], 0, ''),
        escribe('¿Qué muestra?', C`class N{
private:
    int v;
public:
    N(int x){ v = x * 2; }
    int get(){ return v; }
};
N obj(6);
cout << obj.get();`, ['12'], 'El constructor guardó 6 × 2.'),
        mc('Este código da error. ¿Por qué?', ['saldo es private', 'Falta un ;', 'cout está mal', 'No hay error'], 0, 'No se puede tocar un atributo privado desde afuera.', C`class Cuenta{
private:
    float saldo;
};
Cuenta c;
c.saldo = 500;`)
      ],
      reto: {
        enunciado: 'Crea una clase `Producto` con nombre, precio y stock privados, un constructor, y un método `vender(int cantidad)` que solo venda si hay stock suficiente.',
        solucion: C`#include<iostream>                                    // cout
#include<string>                                      // string
using namespace std;
class Producto{
private:
    string nombre;
    float precio;
    int stock;
public:
    Producto(string n, float p, int s){               // constructor
        nombre = n; precio = p; stock = s;
    }
    void vender(int cantidad){
        if(cantidad <= stock){                        // hay suficiente
            stock -= cantidad;
            cout << "Vendido. Total: $" << cantidad * precio << endl;
        }else{
            cout << "No hay suficiente " << nombre << endl;
        }
    }
};
int main(){                                           // inicio
    Producto leche("Leche", 1.10, 5);
    leche.vender(3);                                  // sí se puede
    leche.vender(4);                                  // ya no alcanza
    return 0;                                         // fin
}`
      },
      resumen: [
        '`private`: solo dentro de la clase. `public`: desde afuera.',
        'Constructor: mismo nombre que la clase, se ejecuta al crear el objeto.',
        'Getters y setters para leer/cambiar con validación.'
      ]
    },

    /* ---------- 5 ---------- */
    {
      id: 'e5l5', titulo: 'Herencia', icono: '🧬', desc: 'Reutilizar clases.',
      teoria: [
        { h: 'Heredar de otra clase', p: 'La **herencia** permite crear una clase nueva a partir de otra, **reutilizando** lo que ya tiene. La original es la clase **padre** (base) y la nueva es la **hija** (derivada).', code: C`class Persona{                         // padre
public:
    string nombre;
    void saludar(){ cout << "Hola, soy " << nombre << endl; }
};
class Estudiante : public Persona{     // hija: hereda de Persona
public:
    string carrera;                    // agrega lo suyo
};` },
        { h: 'Usar la herencia', code: C`Estudiante e;
e.nombre = "Sofia";        // heredado de Persona
e.carrera = "Sistemas";    // propio
e.saludar();               // heredado: Hola, soy Sofia`, p: 'La hija tiene **todo** lo público del padre, más lo que le agregues. Así no repites código: Docente y Estudiante pueden heredar de Persona.' },
        { h: 'protected', p: 'Además de `public` y `private` existe `protected`: es como private, pero **las clases hijas sí lo pueden usar**.' }
      ],
      ejercicios: [
        mc('¿Qué permite la herencia?', ['Crear una clase a partir de otra y reutilizar su código', 'Borrar clases', 'Crear variables globales', 'Leer archivos'], 0, ''),
        mc('En `class Auto : public Vehiculo`, ¿quién es el padre?', ['Vehiculo', 'Auto', 'public', 'Ninguno'], 0, ''),
        vf('Una clase hija puede usar los métodos públicos del padre.', true, ''),
        mc('¿Qué acceso permite que solo la clase y sus hijas usen un atributo?', ['protected', 'public', 'private', 'static'], 0, ''),
        completa('Haz que Docente herede de Persona:', C`class Docente ___ public ___{
    string materia;
};`, [':', 'Persona', '::', 'Docente'], [':', 'Persona'], ''),
        escribe('¿Qué muestra?', C`class A{ public: int x = 3; };
class B : public A{ public: int y = 4; };
B b;
cout << b.x + b.y;`, ['7'], 'B heredó x de A.')
      ],
      reto: {
        enunciado: 'Crea una clase `Empleado` (nombre, sueldo) y una clase `Gerente` que herede de Empleado y agregue un `bono`. Muestra el sueldo total del gerente (sueldo + bono).',
        solucion: C`#include<iostream>                                 // cout
#include<string>                                   // string
using namespace std;
class Empleado{                                    // padre
public:
    string nombre;
    float sueldo;
};
class Gerente : public Empleado{                   // hija
public:
    float bono;
    float total(){ return sueldo + bono; }         // usa lo heredado
};
int main(){                                        // inicio
    Gerente g;
    g.nombre = "Maria";
    g.sueldo = 900;
    g.bono = 250;
    cout << g.nombre << " gana $" << g.total() << endl;
    return 0;                                      // fin
}`
      },
      resumen: [
        '`class Hija : public Padre{ ... };`',
        'La hija hereda lo público (y protected) del padre.',
        'Sirve para no repetir código.'
      ]
    },

    /* ---------- 6 ---------- */
    {
      id: 'e5l6', titulo: 'Polimorfismo', icono: '🎭', desc: 'virtual y override.',
      teoria: [
        { h: 'Muchas formas', p: '**Polimorfismo** = "muchas formas". Un mismo método se comporta **distinto** según el objeto. Se logra con `virtual` en el padre y `override` en la hija.', code: C`class Animal{
public:
    virtual void sonido(){ cout << "..." << endl; }
};
class Perro : public Animal{
public:
    void sonido() override { cout << "Guau" << endl; }
};
class Gato : public Animal{
public:
    void sonido() override { cout << "Miau" << endl; }
};` },
        { h: '¿Para qué sirve?', p: 'Puedes tratar a todos como `Animal` y cada uno responde a su manera:', code: C`Perro p;
Gato g;
Animal* lista[2] = {&p, &g};        // punteros al padre
for(int i = 0; i < 2; i++){
    lista[i]->sonido();             // Guau, Miau
}`, p2: 'La flecha `->` se usa para llamar métodos desde un **puntero** a objeto.' }
      ],
      ejercicios: [
        mc('¿Qué significa polimorfismo?', ['Muchas formas', 'Muchas variables', 'Un solo método', 'Sin clases'], 0, ''),
        mc('¿Qué palabra va en el método del padre para que la hija lo pueda cambiar?', ['virtual', 'override', 'static', 'private'], 0, ''),
        mc('¿Qué palabra indica en la hija que estás reemplazando el método del padre?', ['override', 'virtual', 'new', 'return'], 0, ''),
        escribe('¿Qué muestra?', C`class F{ public: virtual int area(){ return 0; } };
class Cuadrado : public F{
public:
    int lado = 3;
    int area() override { return lado * lado; }
};
Cuadrado c;
F* f = &c;
cout << f->area();`, ['9'], 'Aunque el puntero es de tipo F, se usa el método de Cuadrado.'),
        mc('Desde un puntero a objeto, los métodos se llaman con...', ['->', '.', '::', '=>'], 0, '')
      ],
      reto: {
        enunciado: 'Crea una clase `Figura` con un método virtual `area()` y dos hijas: `Rectangulo` y `Circulo`. Muestra el área de cada una usando punteros a Figura.',
        solucion: C`#include<iostream>                                      // cout
using namespace std;
class Figura{                                           // padre
public:
    virtual float area(){ return 0; }
};
class Rectangulo : public Figura{
public:
    float base = 4, altura = 3;
    float area() override { return base * altura; }
};
class Circulo : public Figura{
public:
    float radio = 2;
    float area() override { return 3.1416 * radio * radio; }
};
int main(){                                             // inicio
    Rectangulo r;
    Circulo c;
    Figura* figuras[2] = {&r, &c};                      // punteros al padre
    for(int i = 0; i < 2; i++){
        cout << "Area: " << figuras[i]->area() << endl; // 12 y 12.5664
    }
    return 0;                                           // fin
}`
      },
      resumen: [
        'Polimorfismo: mismo método, distinto comportamiento.',
        '`virtual` en el padre, `override` en la hija.',
        'Desde punteros: `ptr->metodo();`'
      ]
    },

    /* ---------- 7 ---------- */
    {
      id: 'e5l7', titulo: 'vector', icono: '📚', desc: 'Listas que crecen solas.',
      teoria: [
        { h: 'Listas que crecen solas', p: '`vector` es como un arreglo, pero **crece solo** y maneja la memoria por ti. Necesita `#include<vector>`.', code: C`#include<vector>
vector<int> notas;           // lista vacía de enteros
notas.push_back(18);         // agrega al final
notas.push_back(15);
notas.push_back(20);
cout << notas.size();        // 3
cout << notas[0];            // 18` },
        { h: 'Recorrer un vector', code: C`for(int i = 0; i < notas.size(); i++){
    cout << notas[i] << " ";
}
// forma corta (for de rango):
for(int n : notas){
    cout << n << " ";
}`, p: '• `push_back(x)` agrega al final\n• `pop_back()` quita el último\n• `size()` tamaño\n• `clear()` vacía todo' }
      ],
      ejercicios: [
        mc('¿Qué hace `push_back`?', ['Agrega un elemento al final', 'Borra el primero', 'Ordena el vector', 'Muestra el vector'], 0, ''),
        escribe('¿Qué muestra?', C`vector<int> v;
v.push_back(4);
v.push_back(7);
v.push_back(1);
cout << v.size();`, ['3'], ''),
        escribe('¿Qué muestra?', C`vector<int> v = {5, 8, 2};
v.pop_back();
cout << v.size();`, ['2'], '`pop_back` quitó el 2.'),
        mc('¿Qué ventaja tiene vector sobre un arreglo normal?', ['Crece solo y maneja la memoria', 'Es más difícil de usar', 'Solo guarda texto', 'No necesita librería'], 0, ''),
        completa('Crea un vector de precios y agrega uno:', C`vector<___> precios;
precios.___(2.50);`, ['float', 'push_back', 'int', 'pop_back'], ['float', 'push_back'], ''),
        escribe('¿Cuánto vale `s`?', C`vector<int> v = {1, 2, 3, 4};
int s = 0;
for(int x : v) s += x;`, ['10'], '')
      ],
      reto: {
        enunciado: 'Pide notas hasta que el usuario escriba -1. Guárdalas en un vector y muestra cuántas son y su promedio.',
        solucion: C`#include<iostream>                                // cin, cout
#include<vector>                                  // vector
using namespace std;
int main(){                                       // inicio
    vector<float> notas;
    float n, suma = 0;
    cout << "Nota (-1 para terminar): ";
    cin >> n;
    while(n != -1){                               // hasta -1
        notas.push_back(n);                       // agrega
        cout << "Nota (-1 para terminar): ";
        cin >> n;
    }
    for(float x : notas) suma += x;               // suma todo
    cout << "Cantidad: " << notas.size() << endl;
    if(notas.size() > 0) cout << "Promedio: " << suma / notas.size() << endl;
    return 0;                                     // fin
}`
      },
      resumen: [
        '`vector<tipo> v;` crece solo.',
        '`push_back`, `pop_back`, `size`, `clear`.',
        'For de rango: `for(int x : v)`.'
      ]
    },

    /* ---------- 8 ---------- */
    {
      id: 'e5l8', titulo: 'map, sort y find', icono: '🗺️', desc: 'Más herramientas de la STL.',
      teoria: [
        { h: 'map: clave → valor', p: 'Un `map` guarda pares **clave → valor**, como una agenda: cédula → nombre. Buscar por clave es rapidísimo.', code: C`#include<map>
map<string, float> precios;
precios["pan"] = 0.15;
precios["leche"] = 1.10;
cout << precios["leche"];        // 1.1
for(auto par : precios){         // recorre en orden alfabético
    cout << par.first << ": " << par.second << endl;
}` },
        { h: 'sort y find', p: 'La librería `algorithm` trae funciones listas. ¡No necesitas programar la burbuja!', code: C`#include<algorithm>
vector<int> v = {7, 2, 9, 4};
sort(v.begin(), v.end());                    // 2 4 7 9
auto it = find(v.begin(), v.end(), 9);       // busca el 9
if(it != v.end()) cout << "Encontrado";` },
        { h: '¿Existe en el map?', code: C`if(precios.count("arroz") == 0){
    cout << "No hay arroz registrado";
}`, p: '`count` devuelve 1 si la clave existe y 0 si no.' }
      ],
      ejercicios: [
        mc('¿Qué guarda un map?', ['Pares clave → valor', 'Solo números', 'Una sola variable', 'Archivos'], 0, ''),
        escribe('¿Qué muestra?', C`map<string, int> edad;
edad["Ana"] = 20;
edad["Leo"] = 22;
cout << edad["Leo"];`, ['22'], ''),
        mc('¿Qué hace `sort(v.begin(), v.end());`?', ['Ordena el vector de menor a mayor', 'Busca un elemento', 'Borra el vector', 'Invierte el vector'], 0, ''),
        mc('¿Qué librería tiene sort y find?', ['algorithm', 'vector', 'map', 'iostream'], 0, ''),
        escribe('Después de `sort`, ¿qué número queda primero en {8, 3, 5}?', null, ['3'], ''),
        mc('En un map, `par.first` es...', ['La clave', 'El valor', 'El tamaño', 'El primer número'], 0, '`first` = clave, `second` = valor.')
      ],
      reto: {
        enunciado: 'Crea un map con 4 productos y sus precios. Pide el nombre de un producto y muestra su precio, o "No existe" si no está.',
        solucion: C`#include<iostream>                                 // cin, cout
#include<map>                                      // map
#include<string>                                   // string
using namespace std;
int main(){                                        // inicio
    map<string, float> precios;
    precios["arroz"] = 1.25;
    precios["leche"] = 1.10;
    precios["pan"] = 0.15;
    precios["huevos"] = 0.20;
    string p;
    cout << "Producto: ";
    cin >> p;
    if(precios.count(p) > 0){                      // existe
        cout << "Precio: $" << precios[p] << endl;
    }else{
        cout << "No existe" << endl;
    }
    return 0;                                      // fin
}`
      },
      resumen: [
        '`map<clave, valor>`: `m["x"] = 5;`, `m.count("x")`.',
        '`sort(v.begin(), v.end())` ordena.',
        '`find(v.begin(), v.end(), x)` busca.'
      ]
    },

    /* ---------- 9 ---------- */
    {
      id: 'e5l9', titulo: 'Plantillas (templates)', icono: '📐', desc: 'Código para cualquier tipo.',
      teoria: [
        { h: 'Una función para todos los tipos', p: '¿Y si quieres la misma función `mayor` para `int`, `float` y `string`? Con una **plantilla** (`template`) la escribes **una sola vez**:', code: C`template <typename T>          // T = cualquier tipo
T mayor(T a, T b){
    if(a > b) return a;
    return b;
}
cout << mayor(3, 9);          // 9
cout << mayor(2.5, 1.5);      // 2.5
cout << mayor(string("ana"), string("luis"));   // luis` },
        { h: '¡Ya las usaste!', p: '`vector<int>` y `map<string, float>` son **plantillas**: por eso les dices el tipo entre `< >`. Las plantillas permiten escribir código **genérico** y reutilizable.' }
      ],
      ejercicios: [
        mc('¿Para qué sirve una plantilla (template)?', ['Para escribir una función que sirva con varios tipos', 'Para crear archivos', 'Para dibujar', 'Para hacer bucles'], 0, ''),
        mc('En `template <typename T>`, ¿qué es T?', ['Un tipo que se decide al usar la función', 'Una variable int', 'Un texto', 'Una clase fija'], 0, ''),
        escribe('¿Qué muestra?', C`template <typename T>
T doble(T x){ return x * 2; }
cout << doble(4);`, ['8'], ''),
        vf('`vector<int>` es un ejemplo de plantilla.', true, ''),
        completa('Completa la plantilla:', C`template <___ T>
T menor(T a, T b){
    return (a < b) ? a : b;
}`, ['typename', 'int', 'void', 'auto'], ['typename'], '`(a < b) ? a : b` es un if corto: si a < b da a, si no da b.')
      ],
      reto: {
        enunciado: 'Crea una plantilla `mostrarDos(T a, T b)` que muestre ambos valores, y pruébala con enteros, decimales y textos.',
        solucion: C`#include<iostream>                                 // cout
#include<string>                                   // string
using namespace std;
template <typename T>                              // plantilla
void mostrarDos(T a, T b){
    cout << a << " y " << b << endl;
}
int main(){                                        // inicio
    mostrarDos(3, 7);                              // enteros
    mostrarDos(1.5, 2.25);                         // decimales
    mostrarDos(string("Quito"), string("Cuenca")); // textos
    return 0;                                      // fin
}`
      },
      resumen: [
        '`template <typename T>` → una función para muchos tipos.',
        '`vector<int>`, `map<...>` también son plantillas.'
      ]
    }
  ]
});
