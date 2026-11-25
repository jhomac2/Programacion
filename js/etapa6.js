/* ===================== ETAPA 6 · Estructuras de datos ===================== */
CURSO.push({
  id: 'e6', nombre: 'Estructuras de datos', etiqueta: 'Pilas, colas, listas y árboles',
  color: '#7C5CFF', sombra: '#5F42D9', medalla: '🌳', logro: 'Arquitecto de datos',
  lecciones: [

    /* ---------- 1 ---------- */
    {
      id: 'e6l1', titulo: 'Eficiencia (Big O)', icono: '⏱️', desc: '¿Qué tan rápido es tu programa?',
      teoria: [
        { h: '¿Qué tan rápido es tu programa?', p: 'Dos programas pueden hacer lo mismo, pero uno ser mucho más lento cuando hay muchos datos. Para compararlos se usa la notación **Big O**: cuántos pasos hace según la cantidad de datos (**n**).' },
        { h: 'Los más comunes', p: '• **O(1)** → siempre igual de rápido. Ej.: leer `v[5]`.\n• **O(log n)** → muy rápido. Ej.: búsqueda binaria.\n• **O(n)** → recorre todo una vez. Ej.: búsqueda lineal, sumar un arreglo.\n• **O(n²)** → un for dentro de otro. Ej.: método burbuja.\n\nDe más rápido a más lento: O(1) → O(log n) → O(n) → O(n²).' },
        { h: '¿Cómo lo reconozco?', code: C`for(i = 0; i < n; i++){         // O(n): una vuelta por dato
    suma += v[i];
}
for(i = 0; i < n; i++){         // O(n²): n vueltas por cada dato
    for(j = 0; j < n; j++){
        cont++;
    }
}`, p: 'Con 1000 datos: O(n) hace unos 1000 pasos; O(n²) hace ¡1 000 000!' }
      ],
      ejercicios: [
        mc('¿Qué mide la notación Big O?', ['Cuántos pasos hace un algoritmo según la cantidad de datos', 'El tamaño del archivo', 'Cuántas líneas tiene el código', 'La velocidad del internet'], 0, ''),
        mc('Leer `v[3]` de un arreglo es...', ['O(1)', 'O(n)', 'O(n²)', 'O(log n)'], 0, 'Va directo a la posición, sin recorrer nada.'),
        mc('Un for dentro de otro for, ambos hasta n, es...', ['O(n²)', 'O(n)', 'O(1)', 'O(log n)'], 0, ''),
        mc('¿Cuál es más rápido con muchos datos?', ['O(log n)', 'O(n)', 'O(n²)', 'Todos igual'], 0, ''),
        mc('La búsqueda binaria es...', ['O(log n)', 'O(n²)', 'O(1)', 'O(n³)'], 0, 'Descarta la mitad en cada paso.'),
        escribe('Con n = 100, ¿cuántos pasos hace aproximadamente un algoritmo O(n²)?', null, ['10000', '10 000', '10.000'], '100 × 100 = 10 000')
      ],
      reto: {
        enunciado: 'Pide un número n y cuenta cuántas veces se ejecuta `cont++` dentro de dos for anidados hasta n. Prueba con 10, 100 y 1000 y mira cómo crece.',
        solucion: C`#include<iostream>                                  // cin, cout
using namespace std;
int main(){                                         // inicio
    long long n, cont = 0;                          // long long para números grandes
    cout << "n: ";
    cin >> n;
    for(long long i = 0; i < n; i++){               // O(n²)
        for(long long j = 0; j < n; j++){
            cont++;
        }
    }
    cout << "Pasos: " << cont << endl;              // n * n
    return 0;                                       // fin
}`
      },
      resumen: [
        'Big O = cuántos pasos según la cantidad de datos.',
        'O(1) < O(log n) < O(n) < O(n²).',
        'Un for = O(n). Dos for anidados = O(n²).'
      ]
    },

    /* ---------- 2 ---------- */
    {
      id: 'e6l2', titulo: 'Pilas (stack)', icono: '🥞', desc: 'El último en entrar es el primero en salir.',
      teoria: [
        { h: '¿Qué es una pila?', p: 'Una **pila** funciona como una pila de platos: el **último** que pones es el **primero** que sacas. Se llama **LIFO** (*Last In, First Out*).\n\nEjemplos reales: el botón **deshacer** (Ctrl+Z) y el botón **atrás** del navegador.' },
        { h: 'Operaciones', p: '• `push(x)` → pone arriba\n• `pop()` → saca el de arriba\n• `top()` → mira el de arriba (sin sacarlo)\n• `empty()` → ¿está vacía?', code: C`#include<stack>
stack<int> pila;
pila.push(10);
pila.push(20);
pila.push(30);
cout << pila.top();    // 30 (el último que entró)
pila.pop();            // saca el 30
cout << pila.top();    // 20` },
        { h: 'Uso típico: paréntesis balanceados', p: 'Cada vez que ves `(` lo pones en la pila; cuando ves `)` sacas uno. Si al final la pila queda vacía (y nunca faltó uno), los paréntesis están bien.', code: C`string s = "(a+b)*(c)";
stack<char> p;
bool ok = true;
for(char c : s){
    if(c == '(') p.push(c);
    else if(c == ')'){
        if(p.empty()){ ok = false; break; }   // sobra un cierre
        p.pop();
    }
}
if(!p.empty()) ok = false;                   // quedaron abiertos` }
      ],
      ejercicios: [
        mc('Una pila sigue el orden...', ['LIFO: el último en entrar es el primero en salir', 'FIFO: el primero en entrar es el primero en salir', 'Al azar', 'De menor a mayor'], 0, ''),
        escribe('¿Qué muestra?', C`stack<int> p;
p.push(1);
p.push(2);
p.push(3);
p.pop();
cout << p.top();`, ['2'], 'El `pop` sacó el 3; arriba quedó el 2.'),
        mc('¿Qué operación pone un elemento arriba?', ['push', 'pop', 'top', 'front'], 0, ''),
        mc('¿Qué ejemplo real funciona como una pila?', ['El botón deshacer (Ctrl+Z)', 'La fila del banco', 'Una lista de compras', 'Un diccionario'], 0, ''),
        vf('`top()` saca el elemento de arriba.', false, '`top()` solo lo mira; el que saca es `pop()`.'),
        mc('¿Qué librería necesitas para usar `stack`?', ['stack', 'queue', 'vector', 'stdio.h'], 0, '')
      ],
      reto: {
        enunciado: 'Pide una palabra y muéstrala al revés usando una pila: mete cada letra con `push` y luego sácalas con `pop`.',
        solucion: C`#include<iostream>                                 // cin, cout
#include<stack>                                    // stack
#include<string>                                   // string
using namespace std;
int main(){                                        // inicio
    string palabra;
    stack<char> pila;
    cout << "Palabra: ";
    cin >> palabra;
    for(char c : palabra) pila.push(c);            // mete cada letra
    while(!pila.empty()){                          // mientras haya letras
        cout << pila.top();                        // muestra la de arriba
        pila.pop();                                // y la saca
    }
    cout << endl;
    return 0;                                      // fin
}`
      },
      resumen: [
        'Pila = **LIFO** (último en entrar, primero en salir).',
        '`push`, `pop`, `top`, `empty` con `#include<stack>`.',
        'Usos: deshacer, atrás del navegador, paréntesis balanceados.'
      ]
    },

    /* ---------- 3 ---------- */
    {
      id: 'e6l3', titulo: 'Colas (queue)', icono: '🚶', desc: 'El primero en llegar es el primero en salir.',
      teoria: [
        { h: '¿Qué es una cola?', p: 'Una **cola** funciona como la fila del banco: el **primero** que llega es el **primero** que atienden. Se llama **FIFO** (*First In, First Out*).\n\nEjemplos reales: turnos de atención, la cola de impresión, mensajes que esperan ser enviados.' },
        { h: 'Operaciones', p: '• `push(x)` → entra al final de la fila\n• `pop()` → sale el primero\n• `front()` → mira al primero\n• `back()` → mira al último\n• `size()` y `empty()`', code: C`#include<queue>
queue<string> fila;
fila.push("Ana");
fila.push("Luis");
fila.push("Sofia");
cout << fila.front();    // Ana (llegó primero)
fila.pop();              // atienden a Ana
cout << fila.front();    // Luis` },
        { h: 'Pila vs cola', p: '• **Pila (LIFO):** sale el último que entró. Como los platos.\n• **Cola (FIFO):** sale el primero que entró. Como la fila del bus.' }
      ],
      ejercicios: [
        mc('Una cola sigue el orden...', ['FIFO: el primero en entrar es el primero en salir', 'LIFO: el último en entrar es el primero en salir', 'Al azar', 'De mayor a menor'], 0, ''),
        escribe('¿Qué muestra?', C`queue<int> q;
q.push(5);
q.push(8);
q.push(2);
q.pop();
cout << q.front();`, ['8'], 'El `pop` sacó al 5 (el primero); ahora el primero es 8.'),
        mc('¿Qué ejemplo real es una cola?', ['La fila para pagar en el banco', 'El botón deshacer', 'Una pila de libros', 'El botón atrás del navegador'], 0, ''),
        mc('¿Qué método muestra al primero de la cola?', ['front()', 'top()', 'back()', 'first()'], 0, ''),
        vf('En una cola, el último que llega es el primero en salir.', false, 'Eso es una pila. En la cola sale el primero que llegó.'),
        escribe('¿Qué muestra?', C`queue<int> q;
q.push(1);
q.push(2);
q.push(3);
cout << q.back();`, ['3'], '`back()` mira al último de la fila.')
      ],
      reto: {
        enunciado: 'Simula los turnos de una ventanilla: registra 4 nombres en una cola y luego atiéndelos uno por uno mostrando "Atendiendo a: NOMBRE".',
        solucion: C`#include<iostream>                                 // cin, cout
#include<queue>                                    // queue
#include<string>                                   // string
using namespace std;
int main(){                                        // inicio
    queue<string> fila;
    string nombre;
    for(int i = 1; i <= 4; i++){
        cout << "Nombre " << i << ": ";
        cin >> nombre;
        fila.push(nombre);                         // entra a la fila
    }
    while(!fila.empty()){                          // mientras haya gente
        cout << "Atendiendo a: " << fila.front() << endl;
        fila.pop();                                // sale de la fila
    }
    return 0;                                      // fin
}`
      },
      resumen: [
        'Cola = **FIFO** (primero en entrar, primero en salir).',
        '`push`, `pop`, `front`, `back` con `#include<queue>`.',
        'Usos: turnos, cola de impresión, mensajes.'
      ]
    },

    /* ---------- 4 ---------- */
    {
      id: 'e6l4', titulo: 'Listas enlazadas', icono: '🔗', desc: 'Nodos unidos con punteros.',
      teoria: [
        { h: '¿Qué es una lista enlazada?', p: 'Es una cadena de **nodos**. Cada nodo guarda un **dato** y un **puntero al siguiente**. El último apunta a `nullptr` (a nada).\n\nVentaja: puedes agregar y quitar elementos sin mover los demás, como los vagones de un tren 🚃.' },
        { h: 'El nodo', code: C`struct Nodo{
    int dato;          // el valor
    Nodo* sig;         // puntero al siguiente nodo
};
Nodo* cabeza = nullptr;    // la lista empieza vacía`, p: 'La **cabeza** es el puntero al primer nodo.' },
        { h: 'Insertar al inicio y recorrer', code: C`void insertarInicio(Nodo* &cabeza, int x){
    Nodo* nuevo = new Nodo;    // crea el nodo
    nuevo->dato = x;
    nuevo->sig = cabeza;       // apunta al que era primero
    cabeza = nuevo;            // ahora él es el primero
}
void mostrar(Nodo* cabeza){
    Nodo* aux = cabeza;
    while(aux != nullptr){     // hasta el final
        cout << aux->dato << " -> ";
        aux = aux->sig;        // avanza al siguiente
    }
    cout << "NULL" << endl;
}`, p: 'Si insertas 1, 2 y 3 al inicio, la lista queda: 3 -> 2 -> 1 -> NULL' }
      ],
      ejercicios: [
        mc('¿Qué guarda cada nodo de una lista enlazada?', ['Un dato y un puntero al siguiente nodo', 'Solo un número', 'Todo el arreglo', 'Un archivo'], 0, ''),
        mc('¿A qué apunta el último nodo?', ['A nullptr (nada)', 'Al primero', 'A sí mismo', 'Al del medio'], 0, ''),
        mc('¿Cómo avanzas al siguiente nodo con el puntero `aux`?', ['aux = aux->sig;', 'aux++;', 'aux = aux + 1;', 'aux.sig();'], 0, ''),
        escribe('Si insertas al INICIO el 5, luego el 7 y luego el 9, ¿cuál queda primero?', null, ['9'], 'Cada nuevo se pone adelante.'),
        completa('Completa el recorrido:', C`while(aux != ___){
    cout << aux->dato;
    aux = aux->___;
}`, ['nullptr', 'sig', '0.5', 'dato'], ['nullptr', 'sig'], ''),
        vf('Para crear un nodo nuevo se usa `new`.', true, '')
      ],
      reto: {
        enunciado: 'Crea una lista enlazada, inserta al inicio los números 10, 20 y 30, muéstrala y luego muestra cuántos nodos tiene.',
        solucion: C`#include<iostream>                                 // cout
using namespace std;
struct Nodo{
    int dato;
    Nodo* sig;
};
void insertarInicio(Nodo* &cabeza, int x){
    Nodo* nuevo = new Nodo;
    nuevo->dato = x;
    nuevo->sig = cabeza;
    cabeza = nuevo;
}
int main(){                                        // inicio
    Nodo* cabeza = nullptr;
    insertarInicio(cabeza, 10);
    insertarInicio(cabeza, 20);
    insertarInicio(cabeza, 30);
    int cont = 0;
    for(Nodo* aux = cabeza; aux != nullptr; aux = aux->sig){
        cout << aux->dato << " -> ";               // 30 -> 20 -> 10 ->
        cont++;
    }
    cout << "NULL" << endl;
    cout << "Nodos: " << cont << endl;             // 3
    while(cabeza != nullptr){                      // libera la memoria
        Nodo* b = cabeza;
        cabeza = cabeza->sig;
        delete b;
    }
    return 0;                                      // fin
}`
      },
      resumen: [
        'Nodo = dato + puntero `sig` al siguiente.',
        'La **cabeza** apunta al primero; el último apunta a `nullptr`.',
        'Recorrer: `aux = aux->sig` hasta `nullptr`.'
      ]
    },

    /* ---------- 5 ---------- */
    {
      id: 'e6l5', titulo: 'Operaciones con listas', icono: '⛓️', desc: 'Buscar, eliminar y std::list.',
      teoria: [
        { h: 'Buscar un valor', p: 'Se recorre igual que al mostrar.', code: C`bool buscar(Nodo* cabeza, int x){
    Nodo* aux = cabeza;
    while(aux != nullptr){
        if(aux->dato == x) return true;   // lo encontró
        aux = aux->sig;
    }
    return false;                         // no está
}` },
        { h: 'Eliminar el primero', p: 'Siempre libera con `delete` lo que creaste con `new`.', code: C`void eliminarInicio(Nodo* &cabeza){
    if(cabeza == nullptr) return;   // lista vacía
    Nodo* borrar = cabeza;          // guardo el primero
    cabeza = cabeza->sig;           // el segundo pasa a ser primero
    delete borrar;                  // libero la memoria
}` },
        { h: 'La forma fácil: std::list', p: 'C++ ya trae una lista enlazada lista para usar:', code: C`#include<list>
list<int> l;
l.push_back(5);       // al final
l.push_front(1);      // al inicio
l.pop_front();        // quita el primero
for(int x : l) cout << x << " ";`, p2: 'Programarla tú mismo te enseña cómo funciona por dentro; en proyectos reales usas `list`.' }
      ],
      ejercicios: [
        mc('Antes de mover la cabeza al eliminar, ¿qué haces?', ['Guardar el nodo a borrar en un puntero auxiliar', 'Borrar toda la lista', 'Poner la cabeza en 0', 'Nada'], 0, 'Si no lo guardas, pierdes su dirección y no puedes liberarlo.'),
        mc('¿Qué pasa si eliminas nodos sin `delete`?', ['Hay fuga de memoria', 'Se ordenan solos', 'El programa corre más rápido', 'Nada'], 0, ''),
        mc('En `std::list`, ¿qué agrega al inicio?', ['push_front', 'push_back', 'pop_front', 'insert_end'], 0, ''),
        escribe('¿Qué muestra?', C`list<int> l;
l.push_back(4);
l.push_back(6);
l.push_front(2);
for(int x : l) cout << x;`, ['246'], 'El 2 entró al inicio.'),
        vf('Para buscar en una lista enlazada se recorre nodo por nodo.', true, 'Por eso buscar en una lista es O(n).')
      ],
      reto: {
        enunciado: 'Con tu lista enlazada: inserta 5 números, pide uno para buscar y di si está. Luego elimina el primero y muestra la lista otra vez.',
        solucion: C`#include<iostream>                                 // cin, cout
using namespace std;
struct Nodo{ int dato; Nodo* sig; };
void insertarInicio(Nodo* &c, int x){
    Nodo* n = new Nodo; n->dato = x; n->sig = c; c = n;
}
bool buscar(Nodo* c, int x){
    for(Nodo* a = c; a != nullptr; a = a->sig) if(a->dato == x) return true;
    return false;
}
void eliminarInicio(Nodo* &c){
    if(c == nullptr) return;
    Nodo* b = c; c = c->sig; delete b;
}
void mostrar(Nodo* c){
    for(Nodo* a = c; a != nullptr; a = a->sig) cout << a->dato << " -> ";
    cout << "NULL" << endl;
}
int main(){                                        // inicio
    Nodo* cabeza = nullptr;
    int x;
    for(int i = 0; i < 5; i++){
        cout << "Numero: ";
        cin >> x;
        insertarInicio(cabeza, x);
    }
    mostrar(cabeza);
    cout << "Buscar: ";
    cin >> x;
    cout << (buscar(cabeza, x) ? "Si esta" : "No esta") << endl;
    eliminarInicio(cabeza);
    mostrar(cabeza);
    while(cabeza != nullptr) eliminarInicio(cabeza);   // libera todo
    return 0;                                      // fin
}`
      },
      resumen: [
        'Buscar: recorrer y comparar (O(n)).',
        'Eliminar: guardar el nodo, mover la cabeza y `delete`.',
        '`std::list`: `push_front`, `push_back`, `pop_front`…'
      ]
    },

    /* ---------- 6 ---------- */
    {
      id: 'e6l6', titulo: 'Árboles binarios', icono: '🌳', desc: 'Árbol binario de búsqueda.',
      teoria: [
        { h: '¿Qué es un árbol binario?', p: 'Es una estructura donde cada nodo tiene hasta **2 hijos**: izquierdo y derecho. El de arriba se llama **raíz**, y los que no tienen hijos se llaman **hojas**.\n\nEn un **árbol binario de búsqueda (ABB)**: los menores van a la **izquierda** y los mayores a la **derecha**. ¡Así buscar es rapidísimo!' },
        { h: 'Insertar (con recursividad)', code: C`struct Nodo{
    int dato;
    Nodo* izq;
    Nodo* der;
};
Nodo* insertar(Nodo* raiz, int x){
    if(raiz == nullptr){                   // caso base: lugar vacío
        Nodo* n = new Nodo;
        n->dato = x; n->izq = nullptr; n->der = nullptr;
        return n;
    }
    if(x < raiz->dato) raiz->izq = insertar(raiz->izq, x);   // a la izquierda
    else raiz->der = insertar(raiz->der, x);                 // a la derecha
    return raiz;
}`, p: 'Usa la recursividad de la Etapa 3.' },
        { h: 'Recorrido inorden', p: 'Visita: **izquierda → raíz → derecha**. En un ABB, ¡los datos salen **ordenados**!', code: C`void inorden(Nodo* raiz){
    if(raiz == nullptr) return;
    inorden(raiz->izq);
    cout << raiz->dato << " ";
    inorden(raiz->der);
}
// insertando 50, 30, 70, 20, 40 → inorden muestra: 20 30 40 50 70` }
      ],
      ejercicios: [
        mc('En un árbol binario de búsqueda, los valores menores van...', ['A la izquierda', 'A la derecha', 'Arriba', 'Al azar'], 0, ''),
        mc('¿Cómo se llama el nodo de arriba del árbol?', ['Raíz', 'Hoja', 'Cabeza', 'Tronco'], 0, ''),
        mc('¿Qué recorrido muestra ordenados los datos de un ABB?', ['Inorden (izquierda, raíz, derecha)', 'Preorden', 'Al revés', 'Ninguno'], 0, ''),
        escribe('Insertas 40, 20 y 60 en un ABB vacío. ¿Qué número queda como raíz?', null, ['40'], 'El primero que entra es la raíz.'),
        escribe('En ese mismo árbol (40, 20, 60), ¿qué número queda a la derecha de la raíz?', null, ['60'], '60 es mayor que 40.'),
        vf('Insertar en un árbol se puede hacer con recursividad.', true, '')
      ],
      reto: {
        enunciado: 'Inserta en un ABB los números 50, 30, 70, 20, 40, 60 y 80, y muéstralos con el recorrido inorden.',
        solucion: C`#include<iostream>                                 // cout
using namespace std;
struct Nodo{ int dato; Nodo* izq; Nodo* der; };
Nodo* insertar(Nodo* r, int x){
    if(r == nullptr){
        Nodo* n = new Nodo;
        n->dato = x; n->izq = nullptr; n->der = nullptr;
        return n;
    }
    if(x < r->dato) r->izq = insertar(r->izq, x);
    else r->der = insertar(r->der, x);
    return r;
}
void inorden(Nodo* r){
    if(r == nullptr) return;
    inorden(r->izq);
    cout << r->dato << " ";
    inorden(r->der);
}
void liberar(Nodo* r){
    if(r == nullptr) return;
    liberar(r->izq);
    liberar(r->der);
    delete r;
}
int main(){                                        // inicio
    int datos[7] = {50, 30, 70, 20, 40, 60, 80};
    Nodo* raiz = nullptr;
    for(int i = 0; i < 7; i++) raiz = insertar(raiz, datos[i]);
    inorden(raiz);                                 // 20 30 40 50 60 70 80
    cout << endl;
    liberar(raiz);                                 // libera la memoria
    return 0;                                      // fin
}`
      },
      resumen: [
        'Árbol binario: cada nodo tiene hasta 2 hijos (izq y der).',
        'ABB: menores a la izquierda, mayores a la derecha.',
        'Inorden (izq → raíz → der) muestra los datos ordenados.'
      ]
    }
  ]
});
