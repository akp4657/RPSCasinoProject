let i = 0;
let dorm = document.getElementById("dorm");
let fate = document.getElementById("fate");
let deal = document.getElementById("deal");
let playlist = [dorm, fate, deal];
let btn = document.getElementById("options");
let vol = document.getElementById("test").value;
console.log(vol);
playlist[0].autoplay = true;
playlist[0].volume = vol;
playlist[0].loop = true;

function goThrough()
{
    i++;
    if(i >= 0 && i <= 2)
    {
        if(i > 0)
        {
            playlist[i-1].pause();
            playlist[i-1].currentTime = 0;
        }
        playlist[i].play();
        playlist[i].loop = true;
        playlist[2].volume = vol;
        playlist[1].volume = vol;
        playlist[0].volume = vol;
    }
    else
    {
        playlist[2].pause();
        playlist[2].currentTime = 0;
        i = -1;
    }
}

function changeVolume(sliderID, volume)
{
    number = document.getElementById(sliderID)
    volume = number.value;
}

window.onload = changeVolume("test", playlist[i].volume);
btn.addEventListener("click", goThrough);