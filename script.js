

// document.addEventListener("DOMContentLoaded", () => {
//     const audio = document.getElementById("audio");
//     const playPause = document.getElementById("play");
//     const progressBar = document.querySelector(".player_level");
//     const startTime = document.querySelector(".star");
//     const endTime = document.querySelector(".end");

//     // Inicializar la barra de progreso en cero al cargar la página
//     progressBar.value = 0;
//     progressBar.max = audio.duration;

//     // Actualizar la barra de progreso a medida que la canción se reproduce
//     audio.addEventListener("timeupdate", () => {
//         progressBar.value = audio.currentTime;
//         startTime.textContent = formatTime(audio.currentTime);
//         endTime.textContent = formatTime(audio.duration - audio.currentTime);
//     });

//     // Formato de tiempo
//     function formatTime(seconds) {
//         const minutes = Math.floor(seconds / 60);
//         const secs = Math.floor(seconds % 60);
//         return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
//     }

//     playPause.addEventListener("click", () => {
//         if (audio.paused || audio.ended) {
//             playPause.querySelector(".pause-btn").classList.toggle("hide");
//             playPause.querySelector(".play-btn").classList.toggle("hide");
//             audio.play();
//         } else {
//             audio.pause();
//             playPause.querySelector(".pause-btn").classList.toggle("hide");
//             playPause.querySelector(".play-btn").classList.toggle("hide");
//         }
//     });

//     // Actualizar el tiempo y la barra de progreso cuando el usuario la cambia manualmente
//     progressBar.addEventListener("input", () => {
//         audio.currentTime = progressBar.value;
//     });
// });


document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("audio");
    const playPause = document.getElementById("play");
    const previous = document.getElementById("previous");
    const next = document.getElementById("next");
    const progressBar = document.querySelector(".player_level");
    const startTime = document.querySelector(".star");
    const endTime = document.querySelector(".end");

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

    let currentSongIndex = 0;

    function loadSong(song) {
        audio.src = song.src;
        document.querySelector('.player_song').textContent = song.title;
        document.querySelector('.player_artist').textContent = song.artist;
        progressBar.value = 0;
        startTime.textContent = '00:00';
        endTime.textContent = formatTime(audio.duration);
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

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

    audio.addEventListener("timeupdate", () => {
        progressBar.value = audio.currentTime;
        startTime.textContent = formatTime(audio.currentTime);
        endTime.textContent = formatTime(audio.duration - audio.currentTime);
    });

    progressBar.addEventListener("input", () => {
        audio.currentTime = progressBar.value;
    });

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
    loadSong(songs[currentSongIndex]);
});
