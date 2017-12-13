var buttonEl = document.querySelector('input');

function animateButton(scale, duration, elasticity) {
  anime.remove(buttonEl);
  anime({
    targets: buttonEl,
    scale: scale,
    duration: duration,
    elasticity: elasticity
  });
}

function enterButton() { animateButton(1.2, 800, 400) };
function leaveButton() { animateButton(1.0, 600, 300) };

buttonEl.addEventListener('mouseenter', enterButton, false);
buttonEl.addEventListener('mouseleave', leaveButton, false);