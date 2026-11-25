/* ===================== ETAPA 4 · Intermedio (más allá del sílabo) ===================== */
CURSO.push({
  id: 'e4', nombre: 'Nivel intermedio', etiqueta: 'Más allá del sílabo',
  color: '#00B8A9', sombra: '#00968A', medalla: '⚙️', logro: 'Nivel intermedio',
  lecciones: [

    /* ---------- 1 ---------- */
    {
      id: 'e4l1', titulo: 'cin y cout', icono: '💬', desc: 'La forma propia de C++ para leer y mostrar.',
      teoria: [
        { h: 'La forma propia de C++', p: 'Hasta ahora usaste `printf` y `scanf`, que vienen del lenguaje C. C++ tiene su propia forma: **cout** para mostrar y **cin** para leer, con la librería `iostream`.', code: C`#include<iostream>                       // librería de C++
using namespace std;                     // para no escribir std:: siempre
int main(){
    int edad;
    cout << "Ingresa tu edad: ";         // mostrar
    cin >> edad;                         // leer (sin & ni %d)
    cout << "Tu edad es " << edad << endl;   // endl = salto de línea
    return 0;
}` },
        { h: 'Ventajas', p: '• No necesitas `%d` ni `%f`: C++ reconoce el tipo solo.\n• `<<` para mostrar: las flechas van **hacia** cout.\n• `>>` para leer: las flechas van **hacia** la variable.\n• `endl` o `"\\n"` para saltar de línea.' },
        { h: 'Decimales con cout', p: 'Para mostrar 2 decimales usas `iomanip`:', code: C`#include<iomanip>                          // para setprecision
cout << fixed << setprecision(2) << 3.5;   // muestra 3.50` }
      ],
      ejercicios: [
        mc('¿Qué librería necesitas para cin y cout?', ['iostream', 'stdio.h', 'string.h', 'conio.h'], 0, ''),
        completa('Muestra un mensaje y lee un número:', C`cout ___ "Numero: ";
cin ___ n;`, ['<<', '>>', '<', '>'], ['<<', '>>'], 'cout lleva `<<` y cin lleva `>>`.'),
        mc('¿Qué hace `endl`?', ['Salta de línea', 'Termina el programa', 'Borra la pantalla', 'Lee una línea'], 0, ''),
        escribe('¿Qué muestra?', C`int a = 4, b = 5;
cout << a << "+" << b << "=" << a + b;`, ['4+5=9'], ''),
        vf('Con cin necesitas poner `&` antes de la variable.', false, 'Eso solo era para scanf.'),
        mc('¿Para qué sirve `using namespace std;`?', ['Para escribir cout en vez de std::cout', 'Para usar printf', 'Para crear variables', 'Para conectar a internet'], 0, '')
      ],
      reto: {
        enunciado: 'Reescribe con cin y cout el programa que pide precio y cantidad y muestra el total con 2 decimales.',
        solucion: C`#include<iostream>                                 // cin, cout
#include<iomanip>                                  // setprecision
using namespace std;
int main(){                                        // inicio
    float precio;
    int cantidad;
    cout << "Precio: ";
    cin >> precio;
    cout << "Cantidad: ";
    cin >> cantidad;
    cout << fixed << setprecision(2);              // 2 decimales
    cout << "Total: $" << precio * cantidad << endl;
    return 0;                                      // fin
}`
      },
      resumen: [
        '`#include<iostream>` y `using namespace std;`',
        '`cout << ...` muestra, `cin >> variable` lee.',
        '`endl` salta de línea. `fixed << setprecision(2)` para 2 decimales.'
      ]
    },

    /* ---------- 2 ---------- */
    {
      id: 'e4l2', titulo: 'El tipo string', icono: '🧵', desc: 'Textos fáciles en C++.',
      teoria: [
        { h: 'Textos fáciles con string', p: 'C++ tiene `string`, mucho más fácil que los arreglos de char: se asigna con `=`, se une con `+` y se compara con `==`.', code: C`#include<iostream>
#include<string>
using namespace std;
int main(){
    string nombre = "Ana";
    string saludo = "Hola " + nombre;    // unir con +
    cout << saludo << endl;              // Hola Ana
    if(nombre == "Ana"){                 // comparar con ==
        cout << "Te conozco" << endl;
    }
    return 0;
}` },
        { h: 'Funciones útiles', p: '• `s.length()` → cuántos caracteres\n• `s[0]` → el primer carácter\n• `s.substr(0, 3)` → un pedazo (desde 0, 3 caracteres)\n• `s.find("x")` → posición donde aparece\n• `getline(cin, s);` → lee una línea **con espacios**' }
      ],
      ejercicios: [
        mc('¿Cómo unes dos string?', ['Con +', 'Con strcat', 'Con &', 'Con ,'], 0, ''),
        escribe('¿Qué muestra?', C`string s = "Latacunga";
cout << s.length();`, ['9'], ''),
        escribe('¿Qué muestra?', C`string s = "Ecuador";
cout << s.substr(0, 3);`, ['Ecu'], 'Desde la posición 0, 3 caracteres.'),
        mc('Para leer "Juan Perez" (con espacio) en un string usas...', ['getline(cin, nombre);', 'cin >> nombre;', 'scanf("%s", nombre);', 'cout << nombre;'], 0, '`cin >>` se detiene en el espacio.'),
        vf('Con string sí puedes comparar usando ==.', true, ''),
        escribe('¿Qué muestra?', C`string a = "Code";
string b = "Andes";
cout << a + b;`, ['CodeAndes'], '')
      ],
      reto: {
        enunciado: 'Pide el nombre completo (con espacios) y muestra cuántos caracteres tiene y cuál es su primera letra.',
        solucion: C`#include<iostream>                                   // cin, cout
#include<string>                                     // string
using namespace std;
int main(){                                          // inicio
    string nombre;
    cout << "Nombre completo: ";
    getline(cin, nombre);                            // lee con espacios
    cout << "Caracteres: " << nombre.length() << endl;
    cout << "Primera letra: " << nombre[0] << endl;
    return 0;                                        // fin
}`
      },
      resumen: [
        '`string`: asigna con `=`, une con `+`, compara con `==`.',
        '`length()`, `substr()`, `find()`, `s[0]`.',
        '`getline(cin, s)` lee con espacios.'
      ]
    },

    /* ---------- 3 ---------- */
    {
      id: 'e4l3', titulo: 'Estructuras (struct)', icono: '🗂️', desc: 'Agrupar datos de una misma cosa.',
      teoria: [
        { h: 'Agrupar datos', p: 'Un `struct` agrupa varios datos que pertenecen a **una misma cosa**. Por ejemplo, un estudiante tiene nombre, cédula y nota.', code: C`struct Estudiante{          // el molde
    string nombre;
    string cedula;
    float nota;
};                          // termina con ;` },
        { h: 'Usar un struct', p: 'Creas variables del nuevo tipo y llegas a cada dato con un **punto**:', code: C`Estudiante e;                    // una variable de tipo Estudiante
e.nombre = "Carla";
e.cedula = "0501234567";
e.nota = 17.5;
cout << e.nombre << ": " << e.nota << endl;` },
        { h: 'Arreglo de structs', p: 'Lo más útil: un arreglo para muchos estudiantes.', code: C`Estudiante curso[23];               // 23 estudiantes
for(int i = 0; i < 23; i++){
    cout << "Nombre: ";
    cin >> curso[i].nombre;
    cout << "Nota: ";
    cin >> curso[i].nota;
}` }
      ],
      ejercicios: [
        mc('¿Para qué sirve un struct?', ['Para agrupar varios datos de una misma cosa', 'Para repetir código', 'Para tomar decisiones', 'Para leer archivos'], 0, ''),
        mc('¿Cómo llegas a la nota de la variable `e`?', ['e.nota', 'e->nota', 'nota.e', 'e[nota]'], 0, 'Con un punto.'),
        completa('Completa el struct:', C`___ Producto{
    string nombre;
    float precio;
}___`, ['struct', ';', 'class', '}'], ['struct', ';'], 'El struct termina con `};`'),
        escribe('¿Qué muestra?', C`struct P{ int x; int y; };
P p;
p.x = 3;
p.y = 4;
cout << p.x * p.y;`, ['12'], ''),
        vf('Después de la llave que cierra el struct va punto y coma.', true, ''),
        mc('Para guardar 30 productos usas...', ['Producto lista[30];', 'Producto lista;', 'struct[30] Producto;', 'Producto = 30;'], 0, '')
      ],
      reto: {
        enunciado: 'Crea un struct `Producto` (nombre, precio, stock). Registra 3 productos y muestra el que tiene el precio más alto.',
        solucion: C`#include<iostream>                                   // cin, cout
#include<string>                                     // string
using namespace std;
struct Producto{                                     // molde
    string nombre;
    float precio;
    int stock;
};
int main(){                                          // inicio
    Producto lista[3];                               // 3 productos
    for(int i = 0; i < 3; i++){
        cout << "Nombre, precio y stock: ";
        cin >> lista[i].nombre >> lista[i].precio >> lista[i].stock;
    }
    int m = 0;                                       // posición del más caro
    for(int i = 1; i < 3; i++){
        if(lista[i].precio > lista[m].precio) m = i;
    }
    cout << "Mas caro: " << lista[m].nombre << " $" << lista[m].precio << endl;
    return 0;                                        // fin
}`
      },
      resumen: [
        '`struct Nombre{ ... };` agrupa datos de una misma cosa.',
        'Acceso con punto: `e.nota`.',
        'Arreglo de structs: `Estudiante curso[23];`'
      ]
    },

    /* ---------- 4 ---------- */
    {
      id: 'e4l4', titulo: 'Archivos', icono: '💾', desc: 'Guardar y leer datos en archivos .txt.',
      teoria: [
        { h: 'Guardar datos en un archivo', p: 'Cuando el programa se cierra, las variables se borran. Para **guardar** datos usas archivos con `fstream`.', code: C`#include<fstream>                     // archivos
ofstream archivo("notas.txt");        // abre (o crea) para escribir
archivo << "Ana 18" << endl;          // escribe como con cout
archivo << "Luis 15" << endl;
archivo.close();                      // ¡cierra el archivo!` },
        { h: 'Leer un archivo', p: '`ofstream` = escribir (**o**utput), `ifstream` = leer (**i**nput).', code: C`ifstream archivo("notas.txt");         // abre para leer
string nombre;
int nota;
while(archivo >> nombre >> nota){      // mientras pueda leer
    cout << nombre << " saco " << nota << endl;
}
archivo.close();` },
        { h: 'Agregar sin borrar', p: '`ofstream archivo("notas.txt");` **borra** lo que había. Para **agregar al final**, usa `ios::app`:', code: C`ofstream archivo("notas.txt", ios::app);   // agrega al final`, p2: 'Revisa siempre si se abrió bien: `if(!archivo){ cout << "No se pudo abrir"; }`' }
      ],
      ejercicios: [
        mc('¿Qué usas para **escribir** en un archivo?', ['ofstream', 'ifstream', 'iostream', 'string'], 0, ''),
        mc('¿Qué usas para **leer** un archivo?', ['ifstream', 'ofstream', 'cout', 'fopen.h'], 0, ''),
        vf('`ofstream a("datos.txt");` conserva lo que ya tenía el archivo.', false, 'Lo borra. Para agregar al final usa `ios::app`.'),
        completa('Agrega una línea al final del archivo:', C`ofstream f("ventas.txt", ios::___);
f ___ "Venta: 25.50" << endl;
f.___();`, ['app', '<<', 'close', '>>', 'open'], ['app', '<<', 'close'], ''),
        mc('¿Qué librería necesitas para archivos?', ['fstream', 'stdio.h', 'string', 'cmath'], 0, '')
      ],
      reto: {
        enunciado: 'Pide 3 nombres de estudiantes y guárdalos en "lista.txt". Después abre el archivo, léelo y muestra los nombres en pantalla.',
        solucion: C`#include<iostream>                                 // cin, cout
#include<fstream>                                  // archivos
#include<string>                                   // string
using namespace std;
int main(){                                        // inicio
    ofstream sal("lista.txt");                     // escribir
    string nombre;
    for(int i = 1; i <= 3; i++){
        cout << "Nombre " << i << ": ";
        cin >> nombre;
        sal << nombre << endl;                     // guarda en el archivo
    }
    sal.close();                                   // cierra
    ifstream ent("lista.txt");                     // leer
    cout << "--- Lista guardada ---" << endl;
    while(ent >> nombre){
        cout << nombre << endl;
    }
    ent.close();
    return 0;                                      // fin
}`
      },
      resumen: [
        '`#include<fstream>`',
        '`ofstream` escribe (borra lo anterior), con `ios::app` agrega al final.',
        '`ifstream` lee. Siempre `close()`.'
      ]
    },

    /* ---------- 5 ---------- */
    {
      id: 'e4l5', titulo: 'Ordenamiento burbuja', icono: '🫧', desc: 'Ordenar datos de menor a mayor.',
      teoria: [
        { h: 'Ordenar datos', p: '**Ordenar** es acomodar los datos de menor a mayor (o al revés). El método más fácil de entender es la **burbuja**: compara vecinos y los **intercambia** si están en mal orden. Los grandes van "subiendo" al final como burbujas.' },
        { h: 'Intercambiar dos valores', p: 'Para intercambiar necesitas una variable **auxiliar**:', code: C`int aux = a;    // guardo a
a = b;          // a toma el valor de b
b = aux;        // b toma el valor guardado` },
        { h: 'El algoritmo', code: C`for(int i = 0; i < n - 1; i++){           // pasadas
    for(int j = 0; j < n - 1 - i; j++){   // compara vecinos
        if(v[j] > v[j + 1]){              // si están al revés
            int aux = v[j];               // intercambia
            v[j] = v[j + 1];
            v[j + 1] = aux;
        }
    }
}`, p: 'Para ordenar de **mayor a menor**, cambia `>` por `<`.' }
      ],
      ejercicios: [
        mc('¿Qué hace el método burbuja?', ['Compara vecinos y los intercambia si están en mal orden', 'Busca un número', 'Suma el arreglo', 'Borra repetidos'], 0, ''),
        ordena('Ordena el intercambio de a y b:', ['int aux = a;', 'a = b;', 'b = aux;'], ''),
        escribe('Tras UNA pasada de burbuja (de menor a mayor) sobre {5, 1, 4, 2}, ¿qué número queda al final?', null, ['5'], 'En cada pasada, el mayor "sube" hasta el final.'),
        mc('Para ordenar de mayor a menor, cambias...', ['El > por <', 'El for por while', 'aux por 0', 'Nada'], 0, ''),
        vf('Para intercambiar dos variables necesitas una variable auxiliar.', true, 'Si haces `a = b; b = a;` pierdes el valor de a.')
      ],
      reto: {
        enunciado: 'Pide 5 notas, ordénalas de mayor a menor con el método burbuja y muéstralas.',
        solucion: C`#include<iostream>                                // cin, cout
using namespace std;
int main(){                                       // inicio
    float v[5];
    for(int i = 0; i < 5; i++){
        cout << "Nota " << i + 1 << ": ";
        cin >> v[i];
    }
    for(int i = 0; i < 4; i++){                   // burbuja
        for(int j = 0; j < 4 - i; j++){
            if(v[j] < v[j + 1]){                  // < para mayor a menor
                float aux = v[j];
                v[j] = v[j + 1];
                v[j + 1] = aux;
            }
        }
    }
    for(int i = 0; i < 5; i++) cout << v[i] << " ";
    cout << endl;
    return 0;                                     // fin
}`
      },
      resumen: [
        'Burbuja: compara vecinos e intercambia si están al revés.',
        'Intercambio con auxiliar: `aux = a; a = b; b = aux;`',
        '`>` ordena de menor a mayor; `<` de mayor a menor.'
      ]
    },

    /* ---------- 6 ---------- */
    {
      id: 'e4l6', titulo: 'Búsqueda lineal y binaria', icono: '🔎', desc: 'Encontrar datos rápido.',
      teoria: [
        { h: 'Búsqueda lineal', p: 'Revisas los elementos **uno por uno** hasta encontrar el que buscas. Funciona siempre, aunque el arreglo no esté ordenado.', code: C`int pos = -1;                       // -1 = no encontrado
for(int i = 0; i < n; i++){
    if(v[i] == buscado){
        pos = i;
        break;                      // ya lo encontré, salgo
    }
}` },
        { h: 'Búsqueda binaria', p: 'Solo funciona si el arreglo está **ordenado**. Miras el **centro**: si el buscado es mayor, descartas la mitad izquierda; si es menor, la derecha. ¡Es muchísimo más rápida!', code: C`int ini = 0, fin = n - 1, pos = -1;
while(ini <= fin){
    int medio = (ini + fin) / 2;
    if(v[medio] == buscado){ pos = medio; break; }
    else if(v[medio] < buscado) ini = medio + 1;   // a la derecha
    else fin = medio - 1;                          // a la izquierda
}` },
        { h: '¿Cuál conviene?', p: 'Con 1000 datos ordenados:\n• Lineal: hasta **1000** comparaciones.\n• Binaria: como máximo unas **10**.\n\nEs como buscar en un diccionario: no lees palabra por palabra, lo abres por la mitad.' }
      ],
      ejercicios: [
        mc('¿Qué necesita la búsqueda binaria?', ['Que el arreglo esté ordenado', 'Que tenga números negativos', 'Que sea de char', 'Nada especial'], 0, ''),
        mc('¿Por dónde empieza la búsqueda binaria?', ['Por el centro', 'Por el inicio', 'Por el final', 'Al azar'], 0, ''),
        escribe('Buscando 7 en {1, 3, 5, 7, 9}, ¿en qué posición está?', null, ['3'], 'Posiciones: 0→1, 1→3, 2→5, 3→7.'),
        vf('La búsqueda lineal funciona aunque el arreglo no esté ordenado.', true, ''),
        mc('En la búsqueda binaria, si `v[medio] < buscado`, ¿qué haces?', ['ini = medio + 1', 'fin = medio - 1', 'pos = medio', 'Terminas'], 0, 'El buscado está a la derecha.'),
        mc('¿Para qué sirve `break` en la búsqueda lineal?', ['Para salir del for cuando ya lo encontró', 'Para empezar de nuevo', 'Para ordenar', 'No sirve'], 0, '')
      ],
      reto: {
        enunciado: 'Guarda 8 códigos de productos ordenados de menor a mayor. Pide un código y dile al usuario en qué posición está usando búsqueda binaria (o "No existe").',
        solucion: C`#include<iostream>                                     // cin, cout
using namespace std;
int main(){                                            // inicio
    int v[8] = {101, 105, 110, 120, 135, 150, 170, 200};
    int buscado, ini = 0, fin = 7, pos = -1;
    cout << "Codigo a buscar: ";
    cin >> buscado;
    while(ini <= fin){                                 // binaria
        int medio = (ini + fin) / 2;
        if(v[medio] == buscado){ pos = medio; break; }
        else if(v[medio] < buscado) ini = medio + 1;
        else fin = medio - 1;
    }
    if(pos == -1) cout << "No existe" << endl;
    else cout << "Esta en la posicion " << pos << endl;
    return 0;                                          // fin
}`
      },
      resumen: [
        '**Lineal:** uno por uno; sirve siempre.',
        '**Binaria:** por el centro; necesita datos **ordenados**; muy rápida.',
        'Usa `-1` para indicar "no encontrado".'
      ]
    }
  ]
});
