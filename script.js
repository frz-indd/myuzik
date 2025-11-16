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
}
async function playLyrics() {
    if (isPlaying) return;
    isPlaying = true;
    lyrics.forEach((lyric, index) => {
        const element = document.getElementById(`lyric-${index}`);
        if (element) {
            element.classList.remove('active');
            element.style.color = 'rgba(255,255,255,0.25)';
            element.style.fontSize = '16px';
            element.style.fontWeight = 'normal';
        }
    });
    
    for (let i = currentLyricIndex; i < lyrics.length; i++) {
        if (!isPlaying) break;
        
        currentLyricIndex = i;
        const lyric = lyrics[i];
        const element = document.getElementById(`lyric-${i}`);
        if (element) {
            element.classList.add('active');
            element.style.color = 'rgba(255,255,255,1)';
            element.style.fontSize = '18px';
            element.style.fontWeight = '600';
            element.offsetHeight;
        }
        for (let j = 0; j < lyric.text.length; j++) {
            if (!isPlaying) break;
            updateProgress(i, j, lyric.text.length);
            await sleep(lyric.charDelay * 1000);
        }
        if (element) {
            element.classList.remove('active');
            element.style.color = 'rgba(255,255,255,0.25)';
            element.style.fontSize = '16px';
            element.style.fontWeight = 'normal';
            element.offsetHeight;
        }
        await sleep(lyric.lineDelay * 1000);
    }
    isPlaying = false;
    currentLyricIndex = 0;
}
function updateProgress(lyricIndex, charIndex, totalChars) {
    const totalLyrics = lyrics.length;
    const lyricProgress = (lyricIndex / totalLyrics) * 100;
    const charProgress = (charIndex / totalChars) * (100 / totalLyrics);
    const progress = lyricProgress + charProgress;
    document.getElementById('progressFill').style.width = progress + '%';
}
function togglePlay() {
    const playBtn = document.getElementById('playBtn');
    const audioPlayer = document.getElementById('audioPlayer');
    const video = document.querySelector('.background-video');
    
    if (isPlaying) {
        pauseLyrics();
        audioPlayer.pause();
        if (video) video.pause();
        playBtn.textContent = '▶';
        isPlaying = false;
    } else {
        playLyrics();
        audioPlayer.play().catch(err => {
            console.log('Audio play error:', err);
        });
        if (video) {
            video.play().catch(err => {
                console.log('Video play error:', err);
            });
        }
        playBtn.textContent = '⏸';
        isPlaying = true;
    }
}
function pauseLyrics() {
    isPlaying = false;
}
function resetLyrics() {
    const playBtn = document.getElementById('playBtn');
    const audioPlayer = document.getElementById('audioPlayer');
    const video = document.querySelector('.background-video');
    const progressFill = document.getElementById('progressFill');
    
    isPlaying = false;
    currentLyricIndex = 0;
    currentCharIndex = 0;
    playBtn.textContent = '▶';
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
    if (video) {
        video.pause();
        video.currentTime = 0;
    }
    if (progressFill) {
        progressFill.style.width = '0%';
    }
    lyrics.forEach((lyric, index) => {
        const element = document.getElementById(`lyric-${index}`);
        if (element) {
            element.classList.remove('active');
            element.style.color = 'rgba(255,255,255,0.25)';
            element.style.fontSize = '16px';
            element.style.fontWeight = 'normal';
        }
    });
    initializeLyrics();
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
document.addEventListener('DOMContentLoaded', function() {
    initializeLyrics();
    const video = document.querySelector('.background-video');
    const audio = document.getElementById('audioPlayer');
    
    const progressFill = document.getElementById('progressFill');
    if (progressFill) {
        progressFill.style.width = '0%';
    }
    
    if (audio) {
        audio.addEventListener('error', function(e) {
            console.log('Audio format tidak didukung');
        });
    }
});
