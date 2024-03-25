/**
 * @param {Element} block
 */
export default function decorate(block) {
  const toggle = block.querySelector('ul > li');
  const dropdown = block.querySelector('ul li ul');

  toggle.addEventListener('click', () => {
    const isExpanded = dropdown.style.display === 'block';
    dropdown.style.display = isExpanded ? 'none' : 'block';
  });

  document.addEventListener('click', (event) => {
    if (!block.contains(event.target)) {
      dropdown.style.display = 'none';
    }
  });
}
