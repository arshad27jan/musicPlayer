//Initialise the variables

let songIndex = 0;
let audioElement = new Audio('./songs/1.mp3');
// audioElement.play();
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar')
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItem = Array.from(document.getElementsByClassName('songItem'));
let songItemPlay = Array.from(document.getElementsByClassName('songItemPlay'));
let songs = [
    {
        songName: "track1", 
        filepath:'./songs/1.mp3',
        coverPath:'./covers/1.jpg'
    },
    {
        songName: "track2", 
        filepath:'./songs/2.mp3',
        coverPath:'./covers/2.jpg'
    },
    {
        songName: "track3", 
        filepath:'./songs/3.mp3',
        coverPath:'./covers/3.jpg'
    },
    {
        songName: "track4", 
        filepath:'./songs/4.mp3',
        coverPath:'./covers/4.jpg'
    },
    {
        songName: "track5", 
        filepath:'./songs/5.mp3',
        coverPath:'./covers/5.jpg'
    },
    {
        songName: "track6", 
        filepath:'./songs/6.mp3',
        coverPath:'./covers/6.jpg'
    },
    {
        songName: "track7", 
        filepath:'./songs/7.mp3',
        coverPath:'./covers/7.jpg'
    },
    {
        songName: "track8", 
        filepath:'./songs/8.mp3',
        coverPath:'./covers/8.jpg'
    },
    {
        songName: "track9", 
        filepath:'./songs/9.mp3',
        coverPath:'./covers/9.jpg'
    },
    {
        songName: "track10", 
        filepath:'./songs/10.mp3',
        coverPath:'./covers/10.jpg'
    },

]

console.log(songItem);
songItem.forEach((element,index) => {
    // console.log(element.getElementsByTagName('img'));
    // console.log(element.getElementsByClassName('songName'));
    element.getElementsByTagName('img')[0].src = songs[index].coverPath;
    element.getElementsByClassName('songName')[0].innerHTML = songs[index].songName;
})


//handle play pause click
masterPlay.addEventListener("click",()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove("fa-circle-play")
        masterPlay.classList.add("fa-circle-pause")
        gif.style.opacity = 1
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove("fa-circle-pause")
        masterPlay.classList.add("fa-circle-play")
        gif.style.opacity = 0
    }
})

//Eventlisteners
audioElement.addEventListener('timeupdate',()=>{
    console.log("timeupdate");
    //updateSeekbar
    let progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    console.log(progress);
    myProgressBar.value = progress;
})
myProgressBar.addEventListener("change",()=>{
    audioElement.currentTime = (myProgressBar.value * audioElement.duration)/100;
})

//update the Song Item Play
const makeAllPlays = () => {
    songItemPlay.forEach((e)=>{
        e.classList.add('fa-circle-play');
        e.classList.remove('fa-circle-pause');
    })
}
songItemPlay.forEach((element,index)=>{
    element.addEventListener("click",(e)=>{
        console.log(e.target);
        makeAllPlays();
        songIndex = parseInt(e.target.id)
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.currentTime = 0;
        audioElement.src = `./songs/${songIndex}.mp3`;
         masterSongName.innerText = songs[songIndex-1].songName;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play')
        masterPlay.classList.add('fa-circle-pause')
    })
})

document.getElementById('previous').addEventListener("click",()=>{
    if(songIndex<= 0){
        songIndex = 10
    }
    else{
        songIndex = songIndex - 1;
    }
    audioElement.currentTime = 0;
    audioElement.src = `./songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex-1].songName;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play')
    masterPlay.classList.add('fa-circle-pause')
})

document.getElementById('next').addEventListener("click",()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex = songIndex + 1;
    }
    audioElement.currentTime = 0;
    audioElement.src = `./songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex-1].songName;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play')
    masterPlay.classList.add('fa-circle-pause')
})