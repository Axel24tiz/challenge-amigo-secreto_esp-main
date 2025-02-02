const listaAmigos = [];
const inputAmigo = document.getElementById("amigo");
const listaAmigosElement = document.getElementById("listaAmigos");
const resultadoElement = document.getElementById("resultado");

inputAmigo.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        agregarAmigo();
    }
});

function agregarAmigo() {
    const nombre = inputAmigo.value.trim();

    if (nombre === "") {
        alert("Por favor, ingresa un nombre válido.");
        return;
    }

    if (listaAmigos.includes(nombre)) {
        alert("Este nombre ya ha sido agregado.");
        return;
    }

    listaAmigos.push(nombre);
    mostrarLista(); 
    inputAmigo.value = "";
}

function mostrarLista() {
    listaAmigosElement.innerHTML = "";
    listaAmigos.forEach((nombre, index) => {
        const li = document.createElement("li");

        const spanNombre = document.createElement("span");
        spanNombre.textContent = nombre;

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "❌";
        btnEliminar.onclick = () => eliminarAmigo(index);

        li.appendChild(spanNombre);
        li.appendChild(btnEliminar);
        listaAmigosElement.appendChild(li);
    });
}

function eliminarAmigo(index) {
    listaAmigos.splice(index, 1);
    mostrarLista(); 
}

function mezclarArray(array) {
    let copia = [...array]; 
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
}

function sortearAmigos() {
    if (listaAmigos.length < 2) {
        alert("Debes ingresar al menos 2 nombres para sortear.");
        return;
    }

    let copiaLista = mezclarArray(listaAmigos);
    let intentos = 0;
    const maxIntentos = 100;

    while (intentos < maxIntentos) {
        let valido = true;
        for (let i = 0; i < listaAmigos.length; i++) {
            if (listaAmigos[i] === copiaLista[i]) {
                valido = false;
                break;
            }
        }
        if (valido) break;
        copiaLista = mezclarArray(listaAmigos);
        intentos++;
    }

    if (intentos === maxIntentos) {
        alert("No se pudo generar un sorteo válido, intenta de nuevo.");
        return;
    }

    resultadoElement.innerHTML = "<h3>🎁 Emparejamientos de Amigo Secreto:</h3>";
    const listaResultados = document.createElement("ul");

    for (let i = 0; i < listaAmigos.length; i++) {
        const li = document.createElement("li");
        li.textContent = `${listaAmigos[i]} → ${copiaLista[i]}`;
        listaResultados.appendChild(li);
    }

    resultadoElement.appendChild(listaResultados);

    const btnReiniciar = document.createElement("button");
    btnReiniciar.textContent = "🔄 Reiniciar Sorteo";
    btnReiniciar.onclick = () => resultadoElement.innerHTML = "";
    resultadoElement.appendChild(btnReiniciar);
}
