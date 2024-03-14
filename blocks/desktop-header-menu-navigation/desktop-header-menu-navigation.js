/**
 * Toggles header navigation dropdowns and closes them when clicking outside
 * @param {Element} block The header block element
 */
export default async function desktopHeaderMenuNavigation(block) {
  const navigationList = block.querySelectorAll(
    '.fragment-container.desktop-header-menu-navigation .default-content-wrapper > ul > li'
  );

  function closeAllDropdowns() {
    navigationList.forEach((n) => {
      const dropMenu = n.querySelector('ul');
      if (dropMenu) {
        dropMenu.style.display = 'none';
      }
    });
  }

  navigationList.forEach((n) => {
    n.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      closeAllDropdowns();

      const dropMenu = n.querySelector('ul');
      if (dropMenu) {
        dropMenu.style.display =
          dropMenu.style.display === 'flex' ? 'none' : 'flex';
        const aLinks = dropMenu.querySelectorAll('a');
        aLinks.forEach((alink) => {
          alink.addEventListener('click', () => {
            e.preventDefault();
            e.stopPropagation();
            window.location.href = alink.href;
          });
        });
      } else {
        const aLink = n.querySelector('a');
        window.location.href = aLink.href;
      }
    });
  });

  document.addEventListener('click', function (e) {
    const isClickInside = block.contains(e.target);

    if (!isClickInside) {
      closeAllDropdowns();
    }
  });
}
