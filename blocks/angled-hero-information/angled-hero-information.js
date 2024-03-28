/**
 *
 * @param {Element} block
 */
export default function decorate(block) {
  const angledBlocks = block.querySelectorAll(
    '.angled-hero-information > div:last-child div',
  );

  const zIndex = angledBlocks.length;

  angledBlocks.forEach((element) => {
    element.style.zIndex = zIndex - 1;
  });
}
