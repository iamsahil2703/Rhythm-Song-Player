console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/Paradise.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Paradise", filePath: "songs/Paradise.mp3", coverPath: "covers/1.jpg"},
    {songName: "Major Minus", filePath: "songs/Major Minus.mp3", coverPath: "covers/2.jpg"},
    {songName: "Charlie Brown", filePath: "songs/Charlie Brown.mp3", coverPath: "covers/3.jpg"},
    {songName: "Sky full of stars", filePath: "songs/Sky full of stars.mp3", coverPath: "covers/4.jpg"},
    {songName: "Magic", filePath: "songs/Magic.mp3", coverPath: "covers/5.jpg"},
    {songName: "Hymn for the weekend", filePath: "songs/Hymn for the weekend.mp3", coverPath: "covers/6.jpg"},
    {songName: "The Scientist", filePath: "songs/The Scientist.mp3", coverPath: "covers/7.jpg"},
    {songName: "Viva La Vida", filePath: "songs/Viva la vida.mp3", coverPath: "covers/8.jpg"}
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        gif.style.opacity=0;
        makeAllPlays();
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        gif.style.opacity=1;
        makeAllPlays();
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
        console.log(songIndex);
        console.log(parseInt(element.id));
        if(songIndex==element.id&&gif.style.opacity==0)
        {
            element.classList.remove('fa-play-circle');
            element.classList.add('fa-pause-circle');
        }
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        if(e.target.id==songIndex&&gif.style.opacity==1)
        {
            audioElement.pause();
            makeAllPlays();
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity=0;
        }
        else
        {
            gif.style.opacity=0;
            if(e.target.id!=songIndex)
            {
                songIndex = parseInt(e.target.id);
                audioElement.src = songs[songIndex].filePath;
                masterSongName.innerText = songs[songIndex].songName;
                audioElement.currentTime = 0;
            }
            makeAllPlays();
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        }
        
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    gif.style.opacity=0;
    songIndex=(songIndex+1+8)%8;
    makeAllPlays();
    gif.style.opacity=1;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    gif.style.opacity=0;
    songIndex=(songIndex-1+8)%8;
    makeAllPlays();
    gif.style.opacity=1;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})