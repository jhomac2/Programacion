/* ===================== ETAPA 7 · Proyecto final ===================== */
CURSO.push({
  id: 'e7', nombre: 'Proyecto final', etiqueta: 'Sistema de ventas + examen final',
  color: '#E8A400', sombra: '#C08600', medalla: '👑', logro: 'Maestro C++', final: true,
  lecciones: [

    /* ---------- 1 ---------- */
    {
      id: 'e7l1', titulo: 'Diseñar el sistema', icono: '🏪', desc: 'Planear el sistema de ventas.',
      teoria: [
        { h: 'El proyecto final', p: 'Vas a construir un **sistema de ventas para una tienda de barrio**. Junta todo lo que aprendiste:\n\n• Clases para los productos\n• `vector` para el inventario\n• Menú con `do while` y `switch`\n• Ventas con IVA del 15%\n• Archivos para guardar los datos\n• Excepciones para los errores' },
        { h: 'Primero se diseña', p: 'Antes de programar, **planea** (¡como en la Etapa 1!):\n\n1. ¿Qué datos hay? → Producto: código, nombre, precio, stock.\n2. ¿Qué acciones hay? → Ver inventario, vender, guardar.\n3. ¿Qué puede salir mal? → Vender más de lo que hay, cantidades negativas.' },
        { h: 'La clase Producto', code: C`class Producto{
private:
    int codigo;
    string nombre;
    float precio;
    int stock;
public:
    Producto(int c, string n, float p, int s){
        codigo = c; nombre = n; precio = p; stock = s;
    }
    int getCodigo(){ return codigo; }
    string getNombre(){ return nombre; }
    float getPrecio(){ return precio; }
    int getStock(){ return stock; }
    void mostrar(){
        cout << codigo << " | " << nombre << " | $" << precio
             << " | stock: " << stock << endl;
    }
};`, p: 'Atributos privados, constructor y getters: encapsulamiento de la Etapa 5.' }
      ],
      ejercicios: [
        mc('¿Qué conviene usar para guardar todos los productos si pueden ser muchos?', ['vector<Producto>', 'int productos;', 'char productos[5];', 'Un solo string'], 0, ''),
        mc('¿Qué va primero en un proyecto?', ['Diseñar: datos, acciones y posibles errores', 'Escribir todo el código de una vez', 'Elegir colores', 'Compilar'], 0, ''),
        mc('¿Por qué los atributos de Producto son private?', ['Para que solo se cambien con métodos que validen', 'Porque así corre más rápido', 'Porque C++ lo obliga', 'Para que no se vean en pantalla'], 0, ''),
        vf('El menú del sistema conviene hacerlo con do while y switch.', true, 'El menú debe aparecer mínimo una vez y tiene opciones exactas.'),
        completa('Completa el constructor:', C`Producto(int c, string n, float p, int s){
    codigo = ___; nombre = n; precio = ___; stock = s;
}`, ['c', 'p', 's', 'n'], ['c', 'p'], ''),
        mc('¿Qué error debe evitar el sistema al vender?', ['Vender más unidades de las que hay en stock', 'Mostrar el menú', 'Usar vector', 'Calcular el IVA'], 0, '')
      ],
      reto: {
        enunciado: 'Escribe la clase `Producto` en Code::Blocks y crea 3 productos de prueba (arroz, leche y pan) en un vector. Muéstralos con `mostrar()`.',
        solucion: C`#include<iostream>                                   // cout
#include<string>                                     // string
#include<vector>                                     // vector
using namespace std;
class Producto{
private:
    int codigo;
    string nombre;
    float precio;
    int stock;
public:
    Producto(int c, string n, float p, int s){
        codigo = c; nombre = n; precio = p; stock = s;
    }
    void mostrar(){
        cout << codigo << " | " << nombre << " | $" << precio
             << " | stock: " << stock << endl;
    }
};
int main(){                                          // inicio
    vector<Producto> inventario;
    inventario.push_back(Producto(1, "Arroz", 1.25, 50));
    inventario.push_back(Producto(2, "Leche", 1.10, 30));
    inventario.push_back(Producto(3, "Pan", 0.15, 100));
    for(Producto &p : inventario) p.mostrar();       // muestra todos
    return 0;                                        // fin
}`
      },
      resumen: [
        'Primero diseña: datos, acciones y errores posibles.',
        '`class Producto` con atributos privados, constructor y getters.',
        'Inventario: `vector<Producto>`.'
      ]
    },

    /* ---------- 2 ---------- */
    {
      id: 'e7l2', titulo: 'Ventas y menú', icono: '🧾', desc: 'Vender con IVA y validar stock.',
      teoria: [
        { h: 'Vender con validación', p: 'Agregamos a Producto un método que vende **solo si hay stock**; si no, lanza una excepción:', code: C`float vender(int cantidad){
    if(cantidad <= 0) throw "Cantidad no valida";
    if(cantidad > stock) throw "No hay suficiente stock";
    stock -= cantidad;
    return cantidad * precio;            // subtotal
}` },
        { h: 'El menú principal', code: C`int op;
do{
    cout << "\n1. Ver inventario\n2. Vender\n0. Salir\nOpcion: ";
    cin >> op;
    switch(op){
        case 1: verInventario(inventario); break;
        case 2: venta(inventario); break;
        case 0: cout << "Hasta pronto" << endl; break;
        default: cout << "Opcion no valida" << endl;
    }
}while(op != 0);`, p: 'Cada opción llama a una función: el programa queda ordenado (modular).' },
        { h: 'Calcular el IVA', code: C`float subtotal = p.vender(cantidad);
float iva = subtotal * 0.15;           // IVA 15%
float total = subtotal + iva;
cout << fixed << setprecision(2);
cout << "Subtotal: $" << subtotal << endl;
cout << "IVA 15%: $" << iva << endl;
cout << "Total: $" << total << endl;` }
      ],
      ejercicios: [
        escribe('Si el subtotal es $20, ¿cuánto es el IVA del 15%?', null, ['3', '3.0', '3.00', '$3', '$3.00'], '20 × 0.15 = 3'),
        escribe('Subtotal $20 más IVA del 15%. ¿Cuál es el total?', null, ['23', '23.0', '23.00', '$23', '$23.00'], '20 + 3 = 23'),
        mc('Si hay 5 unidades y piden 8, ¿qué debe pasar?', ['Lanzar el error "No hay suficiente stock"', 'Vender 8 igual', 'Dejar el stock en -3', 'Cerrar el programa'], 0, ''),
        ordena('Ordena el proceso de una venta:', ['Pedir el código del producto', 'Buscar el producto en el inventario', 'Pedir la cantidad', 'Validar el stock y vender', 'Mostrar subtotal, IVA y total'], ''),
        mc('¿Cómo buscas un producto por código en `vector<Producto> inv`?', ['Recorriendo con for y comparando getCodigo()', 'Con inv.codigo', 'Con strcmp', 'Con switch(inv)'], 0, '')
      ],
      reto: {
        enunciado: 'Agrega al sistema el método `vender` y un menú con: 1 = Ver inventario, 2 = Vender (muestra subtotal, IVA y total), 0 = Salir.',
        solucion: C`#include<iostream>                                    // cin, cout
#include<iomanip>                                     // setprecision
#include<string>                                      // string
#include<vector>                                      // vector
using namespace std;
class Producto{
private:
    int codigo;
    string nombre;
    float precio;
    int stock;
public:
    Producto(int c, string n, float p, int s){
        codigo = c; nombre = n; precio = p; stock = s;
    }
    int getCodigo(){ return codigo; }
    float vender(int cantidad){
        if(cantidad <= 0) throw "Cantidad no valida";
        if(cantidad > stock) throw "No hay suficiente stock";
        stock -= cantidad;
        return cantidad * precio;
    }
    void mostrar(){
        cout << codigo << " | " << nombre << " | $" << precio
             << " | stock: " << stock << endl;
    }
};
void verInventario(vector<Producto> &inv){
    cout << "\n--- INVENTARIO ---" << endl;
    for(Producto &p : inv) p.mostrar();
}
void venta(vector<Producto> &inv){
    int cod, cant;
    cout << "Codigo: ";
    cin >> cod;
    for(Producto &p : inv){
        if(p.getCodigo() == cod){
            cout << "Cantidad: ";
            cin >> cant;
            try{
                float subtotal = p.vender(cant);
                float iva = subtotal * 0.15;
                cout << "Subtotal: $" << subtotal << endl;
                cout << "IVA 15%: $" << iva << endl;
                cout << "Total: $" << subtotal + iva << endl;
            }catch(const char* msg){
                cout << "Error: " << msg << endl;
            }
            return;
        }
    }
    cout << "Producto no encontrado" << endl;
}
int main(){                                           // inicio
    vector<Producto> inventario;
    inventario.push_back(Producto(1, "Arroz", 1.25, 50));
    inventario.push_back(Producto(2, "Leche", 1.10, 30));
    inventario.push_back(Producto(3, "Pan", 0.15, 100));
    cout << fixed << setprecision(2);
    int op;
    do{
        cout << "\n1. Ver inventario\n2. Vender\n0. Salir\nOpcion: ";
        cin >> op;
        switch(op){
            case 1: verInventario(inventario); break;
            case 2: venta(inventario); break;
            case 0: cout << "Hasta pronto" << endl; break;
            default: cout << "Opcion no valida" << endl;
        }
    }while(op != 0);
    return 0;                                         // fin
}`
      },
      resumen: [
        '`vender()` valida y lanza excepciones (`throw`).',
        'Menú con `do while` + `switch`, cada opción es una función.',
        'IVA = subtotal × 0.15; total = subtotal + IVA.'
      ]
    },

    /* ---------- 3 ---------- */
    {
      id: 'e7l3', titulo: 'Guardar y terminar', icono: '🗄️', desc: 'Archivos y sistema completo.',
      teoria: [
        { h: 'Guardar el inventario', p: 'Se pasa el vector **por referencia** (`&`) para no copiarlo entero.', code: C`void guardar(vector<Producto> &inv){
    ofstream f("inventario.txt");
    for(Producto &p : inv){
        f << p.getCodigo() << " " << p.getNombre() << " "
          << p.getPrecio() << " " << p.getStock() << endl;
    }
    f.close();
}` },
        { h: 'Cargar el inventario', code: C`void cargar(vector<Producto> &inv){
    ifstream f("inventario.txt");
    if(!f) return;                       // si no existe, no hace nada
    int c, s; string n; float p;
    while(f >> c >> n >> p >> s){
        inv.push_back(Producto(c, n, p, s));
    }
    f.close();
}`, p: 'Ojo: con `>>` el nombre no puede tener espacios (usa "Arroz_Flor" o "Leche").' },
        { h: '¡Lo lograste!', p: 'Con esto tu sistema **recuerda** los productos aunque lo cierres. Juntaste:\n\n✅ Variables, operadores y decisiones\n✅ Bucles, arreglos y vectores\n✅ Funciones y excepciones\n✅ Clases, encapsulamiento y archivos\n\nSolo te falta subirlo a **GitHub** y aprobar el **examen final** para ser **Maestro C++** 🎓' }
      ],
      ejercicios: [
        mc('¿Por qué se pasa el vector con `&` a la función guardar?', ['Para no copiarlo entero y trabajar con el original', 'Para borrarlo', 'Porque es obligatorio siempre', 'Para convertirlo en texto'], 0, ''),
        mc('¿Qué hace `if(!f) return;` al cargar?', ['Sale si el archivo no se pudo abrir', 'Borra el archivo', 'Crea un producto', 'Repite la carga'], 0, ''),
        vf('Con `f >> nombre` se puede leer "Arroz Flor" completo, con el espacio.', false, '`>>` se detiene en el espacio. Usa nombres sin espacios o `getline`.'),
        mc('¿Cuándo conviene llamar a `guardar(inventario)`?', ['Al salir del programa o después de cada venta', 'Solo al iniciar', 'Nunca', 'Antes de cargar'], 0, ''),
        completa('Agrega cada producto leído al inventario:', C`while(f >> c >> n >> p >> s){
    inv.___(Producto(c, n, p, s));
}`, ['push_back', 'pop_back', 'size', 'find'], ['push_back'], '')
      ],
      reto: {
        enunciado: 'Completa tu sistema: al iniciar, carga el inventario desde "inventario.txt" (si existe) y al elegir Salir lo guarda. ¡Pruébalo cerrando y abriendo el programa!',
        solucion: C`#include<iostream>                                    // cin, cout
#include<iomanip>                                     // setprecision
#include<fstream>                                     // archivos
#include<string>                                      // string
#include<vector>                                      // vector
using namespace std;

class Producto{
private:
    int codigo;
    string nombre;
    float precio;
    int stock;
public:
    Producto(int c, string n, float p, int s){
        codigo = c; nombre = n; precio = p; stock = s;
    }
    int getCodigo(){ return codigo; }
    string getNombre(){ return nombre; }
    float getPrecio(){ return precio; }
    int getStock(){ return stock; }
    float vender(int cantidad){
        if(cantidad <= 0) throw "Cantidad no valida";
        if(cantidad > stock) throw "No hay suficiente stock";
        stock -= cantidad;
        return cantidad * precio;
    }
    void mostrar(){
        cout << codigo << " | " << nombre << " | $" << precio
             << " | stock: " << stock << endl;
    }
};

void verInventario(vector<Producto> &inv){
    cout << "\n--- INVENTARIO ---" << endl;
    for(Producto &p : inv) p.mostrar();
}

void venta(vector<Producto> &inv){
    int cod, cant;
    cout << "Codigo: ";
    cin >> cod;
    for(Producto &p : inv){
        if(p.getCodigo() == cod){
            cout << "Cantidad: ";
            cin >> cant;
            try{
                float subtotal = p.vender(cant);
                float iva = subtotal * 0.15;
                cout << "Subtotal: $" << subtotal << endl;
                cout << "IVA 15%: $" << iva << endl;
                cout << "Total: $" << subtotal + iva << endl;
            }catch(const char* msg){
                cout << "Error: " << msg << endl;
            }
            return;
        }
    }
    cout << "Producto no encontrado" << endl;
}

void guardar(vector<Producto> &inv){
    ofstream f("inventario.txt");
    for(Producto &p : inv){
        f << p.getCodigo() << " " << p.getNombre() << " "
          << p.getPrecio() << " " << p.getStock() << endl;
    }
    f.close();
}

void cargar(vector<Producto> &inv){
    ifstream f("inventario.txt");
    if(!f) return;
    int c, s; string n; float p;
    while(f >> c >> n >> p >> s){
        inv.push_back(Producto(c, n, p, s));
    }
    f.close();
}

int main(){
    vector<Producto> inventario;
    cargar(inventario);                               // intenta cargar
    if(inventario.size() == 0){                       // primera vez
        inventario.push_back(Producto(1, "Arroz", 1.25, 50));
        inventario.push_back(Producto(2, "Leche", 1.10, 30));
        inventario.push_back(Producto(3, "Pan", 0.15, 100));
    }
    cout << fixed << setprecision(2);
    int op;
    do{
        cout << "\n1. Ver inventario\n2. Vender\n0. Guardar y salir\nOpcion: ";
        cin >> op;
        switch(op){
            case 1: verInventario(inventario); break;
            case 2: venta(inventario); break;
            case 0:
                guardar(inventario);
                cout << "Datos guardados. Hasta pronto" << endl;
                break;
            default: cout << "Opcion no valida" << endl;
        }
    }while(op != 0);
    return 0;
}`
      },
      resumen: [
        '`guardar()` escribe el inventario con `ofstream`.',
        '`cargar()` lo lee con `ifstream` al iniciar.',
        'Vector por referencia (`&`) para no copiarlo.'
      ]
    },

    /* ---------- 4 ---------- */
    {
      id: 'e7l4', titulo: 'Tu proyecto en GitHub', icono: '🌐', desc: 'Git, GitHub y tu portafolio.',
      teoria: [
        { h: '¿Qué son Git y GitHub?', p: '• **Git:** programa que guarda el **historial** de tu código (versiones). Si algo se daña, regresas a una versión anterior.\n• **GitHub:** página donde subes tus proyectos a la nube y los compartes. Es tu **portafolio** de programador: ahí las empresas ven lo que sabes hacer.' },
        { h: 'Comandos básicos', p: 'Se escriben en la terminal, dentro de la carpeta de tu proyecto:', code: C`git init                         (crea el repositorio en tu carpeta)
git add .                        (prepara todos los cambios)
git commit -m "Primer avance"    (guarda una versión con un mensaje)
git remote add origin https://github.com/USUARIO/REPO.git
git push -u origin main          (sube todo a GitHub)`, p2: 'Después de cada cambio importante repites: `git add .`, `git commit -m "mensaje"` y `git push`.' },
        { h: 'El README', p: 'Todo proyecto en GitHub debe tener un archivo **README.md** que explique qué hace el programa, cómo usarlo y quién lo hizo. Es lo primero que ven los demás.\n\nSi aún no usas comandos, también puedes subir archivos arrastrándolos en la página de GitHub: **Add file → Upload files**.' }
      ],
      ejercicios: [
        mc('¿Para qué sirve Git?', ['Para guardar el historial de versiones de tu código', 'Para compilar C++', 'Para dibujar DFD', 'Para navegar en internet'], 0, ''),
        mc('¿Qué comando guarda una versión con un mensaje?', ['git commit -m "mensaje"', 'git push', 'git init', 'git add .'], 0, ''),
        ordena('Ordena los pasos para subir tus cambios:', ['git add .', 'git commit -m "Nuevo avance"', 'git push'], 'Preparar → guardar versión → subir.'),
        mc('¿Qué archivo explica tu proyecto en GitHub?', ['README.md', 'main.cpp', 'index.html', 'notas.txt'], 0, ''),
        vf('GitHub sirve como portafolio para mostrar tus proyectos.', true, ''),
        mc('¿Qué comando crea el repositorio en tu carpeta?', ['git init', 'git push', 'git start', 'git new'], 0, '')
      ],
      reto: {
        enunciado: 'Crea en GitHub un repositorio llamado `sistema-ventas-cpp`, sube tu proyecto final (el archivo .cpp) y escribe un README que diga qué hace y cómo se usa.',
        solucion: C`# Sistema de ventas en C++

Programa de consola para una tienda de barrio.

## Qué hace
- Muestra el inventario
- Vende productos con IVA del 15%
- Valida el stock con excepciones
- Guarda los productos en inventario.txt

## Cómo usarlo
1. Abre main.cpp en Code::Blocks
2. Compila y ejecuta con F9
3. Elige una opción del menú

Autor: TU NOMBRE`
      },
      resumen: [
        '**Git** guarda versiones; **GitHub** las sube a la nube y es tu portafolio.',
        '`git add .` → `git commit -m "..."` → `git push`.',
        'Todo proyecto lleva un **README.md**.'
      ]
    }
  ]
});
