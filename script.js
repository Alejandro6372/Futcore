document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("partidos-container").innerHTML = "<p>No hay partidos en este momento.</p>";
    document.getElementById("novedades-container").innerHTML = "<p>No hay novedades por ahora.</p>";
});

document.addEventListener("DOMContentLoaded", async function() {
    const API_KEY = "TU_API_KEY_AQUI"; 
    const partidosContainer = document.getElementById("partidos-container");

    async function obtenerPartidos() {
        try {
            const respuesta = await fetch("https://api.football-data.org/v4/matches", {
                headers: { "X-Auth-Token": API_KEY }
            });
            const datos = await respuesta.json();
            
            if (datos.matches) {
                mostrarPartidos(datos.matches);
            } else {
                partidosContainer.innerHTML = "<p>No hay partidos disponibles.</p>";
            }
        } catch (error) {
            console.error("Error obteniendo partidos:", error);
            partidosContainer.innerHTML = "<p>Error al cargar los partidos.</p>";
        }
    }

    function mostrarPartidos(partidos) {
        partidosContainer.innerHTML = "";
        partidos.forEach(partido => {
            const partidoDiv = document.createElement("div");
            partidoDiv.classList.add("partido");
            partidoDiv.innerHTML = `
                <strong>${partido.competition.name}</strong><br>
                ${partido.homeTeam.name} vs ${partido.awayTeam.name}<br>
                ${new Date(partido.utcDate).toLocaleString()}
            `;
            partidosContainer.appendChild(partidoDiv);
        });
    }

    obtenerPartidos();
});

document.addEventListener("DOMContentLoaded", async function() {
    const API_KEY = "114dca726d2c472db27555ad4e2864be";
    const ligas = {
        "Liga EA SPORTS": "liga-easports",
        "UEFA Champions League": "champions-league",
        "UEFA Nations League": "nations-league",
        "Eliminatorias Copa del Mundo": "eliminatorias",
        "FC25 Global Series": "fc25-global"
    };

    async function obtenerPartidos() {
        try {
            const respuesta = await fetch("https://api.football-data.org/v4/matches", {
                headers: { "X-Auth-Token": API_KEY }
            });
            const datos = await respuesta.json();
            
            if (datos.matches) {
                organizarPartidosPorLiga(datos.matches);
            } else {
                console.log("No hay partidos disponibles.");
            }
        } catch (error) {
            console.error("Error obteniendo partidos:", error);
        }
    }

    function organizarPartidosPorLiga(partidos) {
        Object.values(ligas).forEach(id => {
            document.querySelector(`#${id} .partidos-container`).innerHTML = "";
        });

        partidos.forEach(partido => {
            const nombreLiga = partido.competition.name;
            const idContenedor = ligas[nombreLiga];

            if (idContenedor) {
                const contenedor = document.querySelector(`#${idContenedor} .partidos-container`);
                const partidoDiv = document.createElement("div");
                partidoDiv.classList.add("partido");
                partidoDiv.innerHTML = `
                    <strong>${partido.homeTeam.name} vs ${partido.awayTeam.name}</strong><br>
                    ${new Date(partido.utcDate).toLocaleString()}
                `;
                contenedor.appendChild(partidoDiv);
            }
        });
    }

    obtenerPartidos();
});

// Simulación de eventos del partido cada 5 segundos (solo si bots activos)
setInterval(() => {
    let botsActivos = true;
        const ejemplo = "🏁 Inicio 1ra parte en el estadio Santiago Bernabéu";
        agregarMensajeBot(ejemplo);
}, 5000);

document.getElementById("toggleBots").addEventListener("click", () => {
    botsActivos = !botsActivos;

    document.getElementById("toggleBots").innerText = botsActivos ? "Desactivar Bots" : "Activar Bots";
    document.getElementById("userMessage").disabled = botsActivos;
    document.getElementById("sendMessage").disabled = botsActivos;

    agregarMensajeSistema(botsActivos
        ? "🧠 Bots activados. Comentarios automáticos en marcha."
        : "💬 Bots desactivados. Puedes escribir mensajes.");
});

// Simulación de un partido
const mensajesSimulados = [
    "🏁 Inicio 1ra parte en el Santiago Bernabéu",
    "⚽ GOOOOOOL DE Real Madrid, Min 7, Jude Bellingham. Disparo desde fuera del área, gana Real Madrid 1-0 ⚽⚽⚽⚽",
    "🟡 Amonestación para Gavi por falta fuerte. Tiro libre a favor de Real Madrid",
    "🔴 Tarjeta Roja para Koundé por mano clara. Tiro libre a favor de Real Madrid",
    "📣 Min 10 Real Madrid 1 - 0 Barcelona",
    "🏁 Finaliza 1er tiempo en el Santiago Bernabéu",
    "🏁 Inicia 2do tiempo en el Santiago Bernabéu",
    "📣 Min 50 Real Madrid 1 - 0 Barcelona",
    "🏁 Finaliza encuentro en el Santiago Bernabéu"
];
let botsActivos = true;

let mensajeIndex = 0;

function narrarProximoEvento() {
  if (botsActivos && mensajeIndex < mensajesSimulados.length) {
    agregarMensajeBot(mensajesSimulados[mensajeIndex]);
    mensajeIndex++;
    setTimeout(narrarProximoEvento, 5000); // cada 5 segundos
  }
}

function agregarMensajeBot(mensaje) {
    const chat = document.getElementById("chat");
    const div = document.createElement("div");
    div.className = "bot";
    div.textContent = mensaje;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

function agregarMensajeSistema(mensaje) {
    const chat = document.getElementById("chat");
    const div = document.createElement("div");
    div.className = "bot";
    div.style.fontStyle = "italic";
    div.textContent = mensaje;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

// Activar el partido simulado
narrarProximoEvento();

document.getElementById("toggleBots").addEventListener("click", () => {
  botsActivos = !botsActivos;

  const boton = document.getElementById("toggleBots");
  boton.textContent = botsActivos ? "Desactivar Bots" : "Activar Bots";

  // Si los bots se activan y aún hay mensajes por mostrar
  if (botsActivos && mensajeIndex < mensajesSimulados.length) {
    narrarProximoEvento();
  }
});

document.getElementById("toggleBots").addEventListener("click", () => {
  botsActivos = !botsActivos;

  const boton = document.getElementById("toggleBots");
  boton.textContent = botsActivos ? "Desactivar Bots" : "Activar Bots";

  // Activar o desactivar input del usuario
  document.getElementById("userMessage").disabled = botsActivos;
  document.getElementById("sendMessage").disabled = botsActivos;

  // Si se reactivan los bots y aún hay mensajes, continuar narración
  if (botsActivos && mensajeIndex < mensajesSimulados.length) {
    narrarProximoEvento();
  }
});

document.getElementById("sendMessage").addEventListener("click", () => {
  const input = document.getElementById("userMessage");
  const mensaje = input.value.trim();
  if (mensaje !== "") {
    const chat = document.getElementById("chat");
    const burbuja = document.createElement("div");
    burbuja.className = "chat-message usuario";
    burbuja.textContent = mensaje;
    chat.appendChild(burbuja);
    input.value = "";
    chat.scrollTop = chat.scrollHeight;
  }
});

let usuarios = {};

function register() {
  const user = document.getElementById('registerUser').value;
  const pass = document.getElementById('registerPass').value;

  if (usuarios[user]) {
    document.getElementById('authMessage').innerText = "El usuario ya existe.";
    return;
  }

  usuarios[user] = pass;
  document.getElementById('authMessage').innerText = "¡Registro exitoso!";
}

function login() {
  const user = document.getElementById('loginUser').value;
  const pass = document.getElementById('loginPass').value;

  if (usuarios[user] && usuarios[user] === pass) {
    document.getElementById('authMessage').innerText = "¡Bienvenido, " + user + "!";
    // Aquí puedes desbloquear funcionalidades o mostrar secciones
  } else {
    document.getElementById('authMessage').innerText = "Credenciales incorrectas.";
  }
}

document.getElementById("btnCuenta").addEventListener("click", () => {
  mostrarSeccion("seccionCuenta");
});
