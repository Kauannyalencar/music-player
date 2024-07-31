const player = document.querySelector("#player")
const musicName = document.querySelector("#musicName")
const artistName = document.querySelector("#musicAuthor");
const capaAlbum = document.querySelector(".capa")
const playPauseBtn = document.querySelector("#playPauseButton")
const prevBtn = document.querySelector("#prevButton")
const nextBtn = document.querySelector("#nextButton")
const shuffleBtn = document.querySelector("#shuffle")
const currentTime = document.querySelector(".currentTime")
const duration = document.querySelector(".duration")
const progressBar = document.querySelector(".progress-bar")
const progress = document.querySelector(".progress")
const list =  document.querySelector(".listMenu")

const playlist = document.querySelector(".playlist-songs")

import songs from "./songs.js";

const textButtonPlay = "<i class='bx bx-caret-right'></i>";
const textButtonPause = "<i class='bx bx-pause'></i>";

let index = 0;

prevBtn.onclick = () => prevNextMusic("prev");
nextBtn.onclick = () => prevNextMusic();

playPauseBtn.onclick = () => playPause()

const playPause = () => {
    if (player.paused) {
        player.play();
        playPauseBtn.innerHTML = textButtonPause;
    } else {
        playPauseBtn.innerHTML = textButtonPlay;
        player.pause();
    }
}
player.ontimeupdate = () => updateTime()

const updateTime = () => {
    const currentMinutes = Math.floor(player.currentTime / 60);
    const currentSeconds = Math.floor(player.currentTime % 60);
    currentTime.textContent = currentMinutes + ":" + formatZero(currentSeconds) ;

    const durationFormated = isNaN(player.duration) ? 0 : player.duration;
    const durationMinutes = Math.floor(durationFormated / 60)
    const durationSeconds = Math.floor(durationFormated % 60)
    duration.textContent = durationMinutes + ":" + formatZero(durationSeconds);

    const progressWidth = durationFormated ? (player.currentTime / durationFormated) * 100 : 0;

    progress.style.width = progressWidth + "%";
    if (progressWidth === 100) prevNextMusic()
}

const renderSongs = (arr) => {
    const songsList = arr.map(song => {
        return `
        <li class="song" id="${song.id}">
        <button class="playlist-song">
        <img class="img-song" src="${song.capa}"/>
        <div class="playlist-info">
        <span class="song-title">${song.nome}</span>
        <span class="song-artist">${song.artist}</span>
        </div>
        </button>
        `
    }).join("")
    playlist.innerHTML = songsList

};

const shuffle = () => {
    //Retorna a música que receber o número negativo "maior"
    console.log("click");
    songs.sort(() =>  Math.random() - 0.5)
    prevNextMusic()
}
const formatZero = (n) => (n < 10 ? "0" + n : n)

progressBar.onclick = (e) => {

    const newTime = (e.offsetX / progressBar.offsetWidth) * player.duration;
    console.log(e.offsetX, progressBar.offsetWidth, player.duration);
    console.log(newTime);
    player.currentTime = newTime;
}


const prevNextMusic = (type = "next") => {
    console.log(type);
    console.log(index);
    if ((type == "next") && index + 1 === songs.length || type === "init") {
        index = 0
    } else if ((type === "prev" && index === 0)) {
        index = songs.length - 1;
        console.log(index);
    } else {
        index = type === "prev" && index ? index - 1 : index + 1
        console.log(index);
        //Se fosse ='next' a música só iria de 1 a 0 tocando a primeira e segunda apenas
    }

    player.src = songs[index].src
    console.log(songs[index].src);
    musicName.innerHTML = songs[index].nome
    artistName.innerHTML = songs[index].artist
    capaAlbum.src = songs[index].capa
    //Faz a música iniciar sozinha
    if ((type !== "init")) playPause();

    updateTime()
};

const listMenu = ()=>{
    playlist.style.display = "flex"
console.log("click");
}

// list.addEventListener("click",listMenu )    
shuffleBtn.addEventListener("click", shuffle)
prevNextMusic("init")
renderSongs(songs)