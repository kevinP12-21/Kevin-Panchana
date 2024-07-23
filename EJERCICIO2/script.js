const BASE_URL = 'https://rickandmortyapi.com/api/character/';
let xhttp = null;

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const clearButton = document.getElementById('clearButton');
    const content = document.getElementById('content');

    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            buscarPersonaje();
        }
    });

    searchButton.addEventListener('click', buscarPersonaje);
    clearButton.addEventListener('click', limpiarLista);

    content.addEventListener('click', function(e) {
        if (e.target.closest('.character-card')) {
            const characterId = e.target.closest('.character-card').dataset.id;
            mostrarDetallesPersonaje(characterId);
        }
    });
});

function buscarPersonaje() {
    const searchInput = document.getElementById('searchInput').value.trim();
    if (searchInput) {
        if (!isNaN(searchInput)) {
            conectar(BASE_URL + searchInput);
        } else {
            conectar(BASE_URL + '?name=' + encodeURIComponent(searchInput));
        }
    }
}

function conectar(url) {
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = obtener_respuesta;
    xhttp.open('GET', url, true);
    xhttp.send();
}

function obtener_respuesta() {
    if (xhttp != null && xhttp.readyState == 4) {
        if (xhttp.status == 200) {
            let datos = JSON.parse(xhttp.responseText);
            limpiarLista();
            if (Array.isArray(datos.results)) {
                datos.results.forEach(agregarPersonajeALista);
            } else {
                agregarPersonajeALista(datos);
            }
        } else {
            alert('No se encontró el personaje');
        }
    }
}

function agregarPersonajeALista(personaje) {
    let content = document.getElementById('content');
    let characterCard = document.createElement('div');
    characterCard.className = 'character-card';
    characterCard.dataset.id = personaje.id;
    characterCard.innerHTML = `
        <img src="${personaje.image}" alt="${personaje.name}" class="character-image">
        <div class="character-info">
            <div class="character-name">${personaje.name}</div>
            <div>Status: ${personaje.status}</div>
            <div>Species: ${personaje.species}</div>
        </div>
    `;
    content.appendChild(characterCard);
}

function mostrarDetallesPersonaje(id) {
    conectar(BASE_URL + id);
}

function limpiarLista() {
    let content = document.getElementById('content');
    content.innerHTML = '';
}

function mostrarPersonajeCompleto(personaje) {
    let content = document.getElementById('content');
    content.innerHTML = '';
    let characterCard = document.createElement('div');
    characterCard.className = 'character-card full-details';
    characterCard.innerHTML = `
        <img src="${personaje.image}" alt="${personaje.name}" class="character-image">
        <div class="character-info">
            <h2 class="character-name">${personaje.name}</h2>
            <p><strong>ID:</strong> ${personaje.id}</p>
            <p><strong>Status:</strong> ${personaje.status}</p>
            <p><strong>Species:</strong> ${personaje.species}</p>
            <p><strong>Gender:</strong> ${personaje.gender}</p>
            <p><strong>Origin:</strong> ${personaje.origin.name}</p>
            <p><strong>Location:</strong> ${personaje.location.name}</p>
        </div>
    `;
    content.appendChild(characterCard);
}