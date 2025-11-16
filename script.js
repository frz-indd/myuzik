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
        div.className = 'lyric-line';
        div.textContent = '';
        container.appendChild(div);
    });
}
async function playLyrics() {
    if (isPlaying) return;
    isPlaying = true;
    for (let i = currentLyricIndex; i < lyrics.length; i++) {
        currentLyricIndex = i;
        const lyric = lyrics[i];
        const element = document.getElementById(`lyric-${i}`);
        element.textContent = '';
        element.classList.add('active');
        
        for (let j = 0; j < lyric.text.length; j++) {
            if (!isPlaying) break;
            
            element.textContent += lyric.text[j];
            updateProgress(i, j, lyric.text.length);
            await sleep(lyric.charDelay * 1000);
        }
        
        element.classList.remove('active');
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
    if (!isPlaying) {
        // Play audio when user clicks Play
        const audio = document.getElementById('audioPlayer');
        audio.currentTime = 0;
        audio.play().catch(e => console.log('Audio play failed:', e));
        
        playLyrics();
    } else {
        isPlaying = false;
        // Pause audio when user stops
        const audio = document.getElementById('audioPlayer');
        audio.pause();
    }
}
function resetLyrics() {
    isPlaying = false;
    currentLyricIndex = 0;
    currentCharIndex = 0;
    document.getElementById('progressFill').style.width = '0%';
    
    // Reset audio
    const audio = document.getElementById('audioPlayer');
    audio.pause();
    audio.currentTime = 0;
    
    initializeLyrics();
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
document.addEventListener('DOMContentLoaded', initializeLyrics);
