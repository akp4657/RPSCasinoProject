let dealButton= document.getElementsByClassName('dBtn');
let nextButton = document.getElementsByClassName('nBtn');

function animateButton(scale, duration, elasticity) {
  anime.remove(nextButton);
  anime({
    targets: dealButton, nextButton,
    scale: scale,
    duration: duration,
    elasticity: elasticity
  });
}

function enterButton() 
{ 
  animateButton(1.2, 800, 400) 
};

function leaveButton() 
{ 
  animateButton(1.0, 600, 300) 
};

dealButton.addEventListener('mouseenter', enterButton);
nextButton.addEventListener('mouseenter', enterButton);

dealButton.addEventListener('mouseleave', leaveButton);
nextButton.addEventListener('mouseleave', leaveButton);