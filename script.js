const lyrics = [
    { text: "and so i wake in the morning and i step outside", charDelay: 0.06, lineDelay: 0.7 },
    { text: "and i take a deep breath and i get real high", charDelay: 0.07, lineDelay: 0.6 },
    { text: "and i scream from the top of my lungs whats goin on?", charDelay: 0.07, lineDelay: 2.3 },
    { text: "and i say", charDelay: 0.09, lineDelay: 0.05 },
    { text: "hey yey yey yey", charDelay: 0.2, lineDelay: 0.6 },
    { text: "hey yey yey", charDelay: 0.2, lineDelay: 1 },
    { text: "i said hey", charDelay: 0.07, lineDelay: 1.5 },
    { text: "whats goin on?", charDelay: 0.09, lineDelay: 3 }
];

let isPlaying = false;
let currentLyricIndex = 0;
let currentCharIndex = 0;

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
    document.getElementById('progressFill').style.width = '0%';
}

function updateProgress(i, j, total) {
    const progress = (i / lyrics.length) * 100 + (j / total) * (100 / lyrics.length);
    document.getElementById('progressFill').style.width = progress + '%';
}

function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
}

async function playLyrics() {
    if (isPlaying) return;
    isPlaying = true;

    for (let i = currentLyricIndex; i < lyrics.length; i++) {
        if (!isPlaying) break;

        currentLyricIndex = i;
        const lyric = lyrics[i];
        const el = document.getElementById(`lyric-${i}`);

        if (el) el.classList.add('active');

        for (let j = currentCharIndex; j < lyric.text.length; j++) {
            if (!isPlaying) break;
            currentCharIndex = j;
            updateProgress(i, j, lyric.text.length);
            await sleep(lyric.charDelay * 1000);
        }

        if (!isPlaying) break;

        if (el) el.classList.remove('active');
        currentCharIndex = 0;
        await sleep(lyric.lineDelay * 1000);
    }

    isPlaying = false;
    currentCharIndex = 0;
    currentLyricIndex = 0;
}

function togglePlay() {
    const btn = document.getElementById('playBtn');
    const audio = document.getElementById('audioPlayer');
    const video = document.querySelector('.background-video');

    if (isPlaying) {
        isPlaying = false;
        audio.pause();
        video.pause();
        btn.textContent = '▶';
    } else {
        audio.play().catch(()=>{});
        video.play().catch(()=>{});
        btn.textContent = '||';
        playLyrics();
    }
}

function resetLyrics() {
    const audio = document.getElementById('audioPlayer');
    const video = document.querySelector('.background-video');

    isPlaying = false;
    currentLyricIndex = 0;
    currentCharIndex = 0;

    audio.pause();
    audio.currentTime = 0;
    video.pause();
    video.currentTime = 0;

    document.getElementById('playBtn').textContent = '▶';
    document.getElementById('progressFill').style.width = '0%';

    initializeLyrics();
}

document.addEventListener('DOMContentLoaded', () => {
    initializeLyrics();
});
