const listaLibros = document.getElementById('lista-libros');
const formLibro = document.getElementById('form-libro');

async function cargarLibros() {
    const res = await fetch('/api/libros');
    const libros = await res.json();

    listaLibros.innerHTML = '';
    libros.forEach(libro => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${libro.titulo}</strong> - ${libro.autor}
            <button onclick="eliminarLibro(${libro.id})">Eliminar</button>
            <button onclick="modificarLibro(${libro.id})">Modificar</button>
        `;
        listaLibros.appendChild(li);
    });
}

formLibro.addEventListener('submit', async (e) => {
    e.preventDefault();
    const titulo = document.getElementById('titulo').value;
    const autor = document.getElementById('autor').value;

    await fetch('/api/libros', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo, autor })
    });

    formLibro.reset();
    cargarLibros();
});

async function eliminarLibro(id) {
    await fetch(`/api/libros/${id}`, { method: 'DELETE' });
    cargarLibros();
}

async function modificarLibro(id) {
    const nuevoTitulo = prompt('Nuevo título:');
    const nuevoAutor = prompt('Nuevo autor:');

    await fetch(`/api/libros/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo: nuevoTitulo, autor: nuevoAutor })
    });

    cargarLibros();
}

cargarLibros()

