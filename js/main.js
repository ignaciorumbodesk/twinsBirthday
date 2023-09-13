//Array con listado de canciones del reproductor.

const canciones = [
    "Lit-Killah-Tiago-Pzk-Maria-Becerra-Duki-Emilia-Rusherking-Big-One-Fmk-Los Del Espacio.mp3",
    "Rauw Alejandro - Algo Magico.mp3",
    "Tini - La Triple T.mp3",
    "Ysy A Ft. Duki & Neo Pistea - Vuelta a la Luna Official Remix.mp3",
    ]

var indiceActual = new Array(1)

//funcion para crear con JS el listado de canciones
function crearPlayList() {
    const listado = document.createElement('ol')
    listado.setAttribute("id", 'listadoMusica')
    for (var i = 0; i < canciones.length; i++) {
        const item = document.createElement('li');
        item.appendChild(document.createTextNode(canciones[i]))
        item.setAttribute("id", canciones.indexOf(canciones[i]))
        listado.appendChild(item)
    }
    return listado
}

document.getElementById('playList').appendChild(crearPlayList())

var listadoMusica = document.getElementById('listadoMusica')

listadoMusica.onclick = (e) => {
    const itemClick = e.target
    removeActive()
    itemClick.classList.add("active")
    reproduccionActual("Reproduciendo: "+ itemClick.innerText)
    loadMusic(itemClick.innerText)
    player.play()
    indiceActual[0] = e.target.id
    classIconPlay()
}

//funcion para cambiar el icono del reproductor
function classIconPlay() {
    var element = document.getElementById("iconPlay")
    element.classList.remove("fa-pause-circle")
    element.classList.add("fa-play-circle")
}

//funcion para el control del volumen
const volumen = document.getElementById("volumen")
volumen.oninput = (e) => {
    const vol = e.target.value
    player.volume = vol
}

//funcion para actualizar la barra de progreso del reproductor
const updateProgress = () => {
    if (player.currentTime > 0) {
        const barra = document.getElementById('progress')
        barra.value = (player.currentTime / player.duration) * 100

        var duracionSegundos = player.duration.toFixed(0)
        dura = secondsToString(duracionSegundos)
        var actualSegundos = player.currentTime.toFixed(0)
        actual = secondsToString(actualSegundos)

        duracion = actual + ' / ' + dura
        document.getElementById('timer').innerText = duracion
    }

    if (player.ended) {
        nextMusic()
    }
}

//funcion para pasar a la proxima cancion
function nextMusic() {
    const source = document.getElementById(siguiente)
    var musicaActual = Number(indiceActual[0])
    
    if (canciones.length == (musicaActual+1)) {
        var siguiente = 0
    } else {
        var siguiente = musicaActual+1
    }
    
    removeActive()
    
    var item = document.getElementById(siguiente)
    item.classList.add("active")
    loadMusic(canciones[siguiente])
    player.play()
    reproduccionActual[0] = siguiente
    reproduccionActual("Reproduciendo: "+ canciones[siguiente])
    classIconPlay()
}


