const lyrics = [
    { text: "and so i wake in the morning and i step outside", charDelay: 0.06, lineDelay: 0.7 },
    { text: "and i take a deep breath and i get real high", charDelay: 0.07, lineDelay: 0.6 },
    { text: "and i scream from the top of my lungs whats goin on?", charDelay: 0.07, lineDelay: 2.3 },
    { text: "and i say", charDelay: 0.09, lineDelay: 0.05},
    { text: "hey yey yey yey", charDelay: 0.2, lineDelay: 0.6 },
    { text: "hey yey yey", charDelay: 0.2, lineDelay: 1 },
    { text: "i said hey", charDelay: 0.07, lineDelay: 1.5 },
    { text: "whats goin on?", charDelay: 0.09, lineDelay: 3 },
];

let isPlaying = false;
let currentLyricIndex = 0;

function initializeLyrics() {
    const container = document.getElementById('lyricContainer');
    container.innerHTML = '';
    lyrics.forEach((lyric, index) => {
        const div = document.createElement('div');
        div.id = `lyric-${index}`;
        div.className = 'lyric';
        div.textContent = lyric.text;
        container.appendChild(div);
    });
}

async function playLyrics() {
    if (isPlaying) return;
    isPlaying = true;

    lyrics.forEach((_, index) => {
        const element = document.getElementById(`lyric-${index}`);
        if (element) {
            element.classList.remove('active');
        }
    });

    for (let i = currentLyricIndex; i < lyrics.length; i++) {
        if (!isPlaying) break;

        currentLyricIndex = i;
        const lyric = lyrics[i];
        const element = document.getElementById(`lyric-${i}`);

        if (element) element.classList.add('active');

        for (let j = 0; j < lyric.text.length; j++) {
            if (!isPlaying) break;
            updateProgress(i, j, lyric.text.length);
            await sleep(lyric.charDelay * 1000);
        }

        if (element) element.classList.remove('active');
        await sleep(lyric.lineDelay * 1000);
    }

    isPlaying = false;
    currentLyricIndex = 0;
}

function updateProgress(lyricIndex, charIndex, totalChars) {
    const total = lyrics.length;
    const progress = (lyricIndex / total) * 100 + (charIndex / totalChars) * (100 / total);
    document.getElementById('progressFill').style.width = progress + '%';
}

function togglePlay() {
    const playBtn = document.getElementById('playBtn');
    const audio = document.getElementById('audioPlayer');
    const video = document.querySelector('.background-video');

    if (isPlaying) {
        pauseLyrics();
        audio.pause();
        video.pause();
        playBtn.textContent = '▶';
    } else {
        playLyrics();
        audio.play();
        video.play();
        playBtn.textContent = '⏸';
    }
}

function pauseLyrics() {
    isPlaying = false;
}

function resetLyrics() {
    const audio = document.getElementById('audioPlayer');
    const video = document.querySelector('.background-video');

    isPlaying = false;
    currentLyricIndex = 0;

    document.getElementById('playBtn').textContent = '▶';
    audio.pause(); audio.currentTime = 0;
    video.pause(); video.currentTime = 0;

    document.getElementById('progressFill').style.width = '0%';
    initializeLyrics();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.addEventListener('DOMContentLoaded', () => {
    initializeLyrics();
});
