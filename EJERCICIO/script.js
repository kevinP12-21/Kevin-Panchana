const URL = 'https://rickandmortyapi.com/api/character/';
let xhttp = null;

function buscarPersonaje() {
    const characterId = document.getElementById('characterId').value;
    if (characterId) {
        conectar(characterId);
    }
}

function conectar(personaje) {
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = obtener_respuesta;
    xhttp.open('GET', URL + personaje, true);
    xhttp.send();
}

function obtener_respuesta() {
    if (xhttp != null && xhttp.readyState == 4) {
        if (xhttp.status == 200) {
            let dato = JSON.parse(xhttp.responseText);
            agregarPersonaje(dato);
        } else {
            alert('Este personaje');
        }
    }
}

function agregarPersonaje(personaje) {
    let content = document.getElementById('content');
    let characterCard = document.createElement('div');
    characterCard.className = 'character-card';
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

function limpiarLista() {
    let content = document.getElementById('content');
    content.innerHTML = '';
}