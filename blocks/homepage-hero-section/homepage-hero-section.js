/**
 * Loads and Decorates the homepage hero section
 * @param {Element} block The homepage hero section block element
 */
export default async function decorate(block) {
  const slides = block.querySelectorAll(
    '.homepage-hero-section.block > div > div:nth-child(2) > ul > li'
  );

  const sliderNav = document.createElement('div');
  sliderNav.className = 'homepage-hero-section-slider-nav-button-wrapper';

  Array.from(slides).forEach((slide, index) => {
    const button = document.createElement('button');
    button.className = `homepage-hero-section-slider-nav-button slide-${
      index + 1
    }`;
    button.addEventListener('click', () => {
      slides.forEach((s) => s.classList.remove('active'));
      Array.from(sliderNav.children).forEach((b) =>
        b.classList.remove('active')
      );

      slide.classList.add('active');
      button.classList.add('active');

      slides.forEach((s) => (s.style.display = 'none'));
      slide.style.display = 'block';
    });

    sliderNav.appendChild(button);
  });

  block.append(sliderNav);

  if (slides.length > 0) {
    slides[0].classList.add('active');
    slides[0].style.display = 'block';
  }
  if (sliderNav.children.length > 0) {
    sliderNav.children[0].classList.add('active');
  }
}
