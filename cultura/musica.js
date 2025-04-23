// ---------------------------
// SELECTORS AND CONSTANTS
// ---------------------------
const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const volumeSlider = document.getElementById('volume-slider');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');

// ARRAY CANZONI
const originalSongs  = [
	"Tiko Rostenribof"
]

let songs = [...originalSongs]; //Default playlist
let songIndex = Math.floor(Math.random() * songs.length);

// ---------------------------
// INITIAL SETUP
// ---------------------------
loadSong(songs[songIndex]);
renderSongList(songs);
updateSongSelector();
songSelector.value = songIndex;
audio.volume = volumeSlider.value;

// ---------------------------
// EVENT LISTENERS
// ---------------------------
playBtn.addEventListener('click', togglePlay);
volumeSlider.addEventListener('input', changeVolume);
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
audio.addEventListener('ended', playNextInQueue);
audio.addEventListener('timeupdate', updateDurTime);
originalBtn.addEventListener('click', () => switchPlaylist(originalSongs));
searchInput.addEventListener('input', filterSongs);

// ---------------------------
// CORE FUNCTIONS
// ---------------------------
function loadSong(song) {
	title.innerText = song;
	audio.src = `${song}.mp3`;
	cover.src = `${song}.jpg`;
	updateSongSelector();
}

function playSong() {
	musicContainer.classList.add('play');
	playBtn.querySelector('i.fas').classList.replace('fa-play', 'fa-pause');
	audio.play();
}

function pauseSong() {
	musicContainer.classList.remove('play');
	playBtn.querySelector('i.fas').classList.replace('fa-pause', 'fa-play');
	audio.pause();
}

function togglePlay() {
	const isPlaying = musicContainer.classList.contains('play');
	isPlaying ? pauseSong() : playSong();
}



// ---------------------------
// UI UPDATES
// ---------------------------
function renderSongList(songs) {
    songContainer.innerHTML = '';
    songContainer.appendChild(searchInput);
    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.classList.add('song-tile');
        songDiv.innerHTML = `
          <img src="${song}.jpg" alt="${song}" />
          <h4>${song}</h4>
        `;
        songDiv.addEventListener('click', () => {
            songIndex = songs.indexOf(song);
            loadSong(song);
            playSong();
        });
        songContainer.appendChild(songDiv);
    });
}


function updateProgress(e) {
	const { duration, currentTime } = e.srcElement;
	const progressPercent = (currentTime / duration) * 100;
	progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
	const width = this.clientWidth;
	const clickX = e.offsetX;
	audio.currentTime = (clickX / width) * audio.duration;
}

function updateDurTime(e) {
	const { duration, currentTime } = e.srcElement;
	currTime.innerText = formatTime(currentTime);
	durTime.innerText = formatTime(duration);
}

function formatTime(time) {
	const minutes = Math.floor(time / 60).toString().padStart(2, '0');
	const seconds = Math.floor(time % 60).toString().padStart(2, '0');
	return `${minutes}:${seconds}`;
}

function changeVolume(e) {
	audio.volume = e.currentTarget.value;
}