

document.addEventListener("DOMContentLoaded", () => { //Este bloque asegura que el script se ejecute solo después de que el DOM se haya cargado completamente.
    //Estas líneas seleccionan elementos HTML por sus identificadores y clases para poder manipularlos posteriormente.
    const audio = document.getElementById("audio");
    const playPause = document.getElementById("play");
    const previous = document.getElementById("previous");
    const next = document.getElementById("next");
    const progressBar = document.querySelector(".player_level");
    const startTime = document.querySelector(".star");
    const endTime = document.querySelector(".end");
   //Lista de Canciones / se define un array de objetos, donde cada objeto representa una canción 
    const songs = [
        {
            src: './media/love.mp3',
            title: 'Love of my life',
            artist: 'Queen'
        },
        {
            src: './media/bohemia.mp3',
            title: 'Bohemia Rhapsody',
            artist: 'Queen'
        },
        {
            src: './media/somebody.mp3',
            title: 'Somebody to love',
            artist: 'Queen'
        },

        {
            src: './media/IwantToB.mp3',
            title: ' I Want To Break Free ',
            artist: 'Queen'
        },

        {
            src: './media/Another.mp3',
            title: 'Another One Bites The Dust',
            artist: 'Queen'
        },


    ];

    let currentSongIndex = 0; //Índice de la Canción Actual
     //Función para Cargar una Canción
    function loadSong(song) {
        audio.src = song.src;
        document.querySelector('.player_song').textContent = song.title;
        document.querySelector('.player_artist').textContent = song.artist;
        progressBar.value = 0;
        startTime.textContent = '00:00';
        endTime.textContent = formatTime(audio.duration);
    }
  //Esta función convierte los segundos en un formato de minutos y segundos
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }
   //Este evento alterna entre reproducir y pausar la canción cuando se hace clic en el botón de reproducción/pausa, y actualiza los íconos correspondientes.
    playPause.addEventListener("click", () => {
        if (audio.paused || audio.ended) {
            playPause.querySelector(".pause-btn").classList.toggle("hide");
            playPause.querySelector(".play-btn").classList.toggle("hide");
            audio.play();
        } else {
            audio.pause();
            playPause.querySelector(".pause-btn").classList.toggle("hide");
            playPause.querySelector(".play-btn").classList.toggle("hide");
        }
    });
 //Este evento actualiza la barra de progreso y los tiempos de inicio y fin mientras la canción se reproduce.
    audio.addEventListener("timeupdate", () => {
        progressBar.value = audio.currentTime;
        startTime.textContent = formatTime(audio.currentTime);
        endTime.textContent = formatTime(audio.duration - audio.currentTime);
    });

    //Este evento permite que el usuario cambie la posición de la reproducción manualmente moviendo la barra de progreso.
    progressBar.addEventListener("input", () => {
        audio.currentTime = progressBar.value;
    });
//Estos eventos permiten navegar entre canciones. El índice de la canción actual se actualiza y se carga la nueva canción correspondiente cuando se hace clic en los botones de anterior y siguiente.
    previous.addEventListener("click", () => {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        loadSong(songs[currentSongIndex]);
        audio.play();
    });

    next.addEventListener("click", () => {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadSong(songs[currentSongIndex]);
        audio.play();
    });

    // Cargar la primera canción
    loadSong(songs[currentSongIndex]); //esta línea carga la primera canción cuando la página se carga inicialmente.
});
