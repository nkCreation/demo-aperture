function initSlider(selector) {
  let interval;
  let currentSlide = 0;

  const sliderContainer = document.querySelector(selector);
  const sliderElements = sliderContainer.querySelectorAll('.slider__element');
  const sliderNavElement = sliderContainer.querySelector('.slider__nav');

  sliderElements.forEach((_, index) => {
    sliderNavElement.innerHTML += `<button type="button" class="slider__bullet" data-index="${index}">Aller à l'image ${index}</button>`
  })

  goToSlide(currentSlide);
  launchSlideInterval();

  sliderContainer.addEventListener('click', ({ target }) => {
    const prevButton = target.closest('.slider__button--prev');
    const nextButton = target.closest('.slider__button--next');
    const bulletButton = target.closest('.slider__bullet');

    if (!prevButton && !nextButton && !bulletButton) {
      return;
    }

    if (nextButton) {
      currentSlide = currentSlide === sliderElements.length - 1 ? 0 : currentSlide + 1;
    }

    if (prevButton) {
      currentSlide = currentSlide === 0 ? sliderElements.length - 1 : currentSlide - 1;
    }

    if (bulletButton) {
      currentSlide = parseInt(bulletButton.getAttribute('data-index'));
    }

    goToSlide(currentSlide)
    launchSlideInterval();
  })

  function goToSlide(index) {
    const elements = sliderContainer.querySelectorAll('.slider__element');
    const bullets = sliderContainer.querySelectorAll('.slider__bullet');

    elements.forEach(element => element.classList.remove('is-on'))
    bullets.forEach(bullet => bullet.classList.remove('is-on'))

    elements[index].classList.add('is-on');
    bullets[index].classList.add('is-on');
  }

  function launchSlideInterval() {
    clearInterval(interval);
    interval = setInterval(() => {
      currentSlide = currentSlide === sliderElements.length - 1 ? 0 : currentSlide + 1;

      goToSlide(currentSlide);
    }, 10000)
  }
}

initSlider('.slider');
