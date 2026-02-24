const listaLibros = document.getElementById('lista-libros');
const formLibro = document.getElementById('form-libro');

// Cargar libros desde la API
async function cargarLibros() {
    try {
        const res = await fetch('/api/libros');
        const libros = await res.json();

        listaLibros.innerHTML = '';
        libros.forEach(libro => {
            const card = document.createElement('div');
            card.classList.add('libro-card');

            card.innerHTML = `
                <h3>${libro.titulo}</h3>
                <p>${libro.autor}</p>
                <div class="acciones">
                    <button class="btn-modificar" onclick="modificarLibro(${libro.id})">✏️ Modificar</button>
                    <button class="btn-eliminar" onclick="eliminarLibro(${libro.id})">🗑️ Eliminar</button>
                </div>
            `;

            listaLibros.appendChild(card);
        });
    } catch (error) {
        console.error("Error al cargar libros:", error);
    }
}

// Agregar un nuevo libro
formLibro.addEventListener('submit', async (e) => {
    e.preventDefault();
    const titulo = document.getElementById('titulo').value;
    const autor = document.getElementById('autor').value;

    try {
        await fetch('/api/libros', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ titulo, autor })
        });

        formLibro.reset();
        cargarLibros();
    } catch (error) {
        console.error("Error al agregar libro:", error);
    }
});

// Eliminar libro
async function eliminarLibro(id) {
    if (confirm("¿Seguro que quieres eliminar este libro?")) {
        try {
            await fetch(`/api/libros/${id}`, { method: 'DELETE' });
            cargarLibros();
        } catch (error) {
            console.error("Error al eliminar libro:", error);
        }
    }
}

// Modificar libro
async function modificarLibro(id) {
    const nuevoTitulo = prompt('Nuevo título:');
    const nuevoAutor = prompt('Nuevo autor:');

    if (nuevoTitulo && nuevoAutor) {
        try {
            await fetch(`/api/libros/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ titulo: nuevoTitulo, autor: nuevoAutor })
            });

            cargarLibros();
        } catch (error) {
            console.error("Error al modificar libro:", error);
        }
    }
}

// Inicializar
cargarLibros();
