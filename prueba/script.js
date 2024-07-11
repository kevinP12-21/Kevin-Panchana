function agregarPlatillo() {
    const nombrePlatillo = document.getElementById('nombre-platillo').value;
    const descripcionPlatillo = document.getElementById('descripcion-platillo').value;

    if (nombrePlatillo && descripcionPlatillo) {
        const menuItems = document.getElementById('menu-items');
        const nuevoItem = document.createElement('div');
        nuevoItem.className = 'menu-item';
        nuevoItem.innerHTML = `
            <h3>${nombrePlatillo}</h3>
            <p>${descripcionPlatillo}</p>
            <button class="eliminar-platillo" onclick="eliminarPlatillo(this)">Eliminar</button>
        `;
        menuItems.appendChild(nuevoItem);

        // Limpiar los campos de entrada
        document.getElementById('nombre-platillo').value = '';
        document.getElementById('descripcion-platillo').value = '';
    } else {
        alert('Por favor, ingrese tanto el nombre como la descripción del platillo.');
    }
}

function eliminarPlatillo(boton) {
    const platillo = boton.parentElement;
    platillo.remove();
}