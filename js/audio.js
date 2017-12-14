let i = 0;
let king = document.getElementById("king");
let dorm = document.getElementById("dorm");
let fate = document.getElementById("fate");
let deal = document.getElementById("deal");
let face = document.getElementById("face");
let playlist = [fate, face, king, dorm, deal];
let btn = document.getElementById("next");
playlist[0].autoplay = true;
playlist[0].loop = true;
playlist[0].volume = 0;

function goThrough()
{
    i++;
    if(i>= 0 && i <= 4)
    {
        if(i > 0)
        {   
        playlist[i-1].pause();
        playlist[i-1].currentTime = 0;
        }
        playlist[i].play();
        playlist[i].loop = true;
        playlist[i].volume = .5;
}
else
{
    playlist[4].pause();
    playlist[4].currentTime = 0;
    i = -1;
}
}

function changeVolume(amount)
{
    let audioobject = playlist[i];
    audioobject.volume = amount;
}

btn.addEventListener("click", goThrough);