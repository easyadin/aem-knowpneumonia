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
        dropMenu.classList.remove('dropdown-open');
      }

      n.querySelectorAll('a').forEach((link) => {
        link.classList.remove('nav-link-active');
        link.classList.add('nav-link-inactive');
      });

      const navigationTriggerLastElementImage =
        n.querySelector('a:nth-child(2) img');
      if (navigationTriggerLastElementImage) {
        navigationTriggerLastElementImage.classList.remove('img-filter-reset');
      }
    });
  }

  navigationList.forEach((n) => {
    n.addEventListener('click', (e) => {
      closeAllDropdowns();

      const navigationTriggerFirstElement = n.querySelector('a:first-child');
      const navigationTriggerLastElement = n.querySelector('a:nth-child(2)');

      navigationTriggerFirstElement.classList.add('nav-link-active');
      navigationTriggerLastElement.classList.add('nav-link-active');

      const navigationTriggerLastElementImage =
        navigationTriggerLastElement.querySelector('img');
      navigationTriggerLastElementImage.classList.add('img-filter-reset');

      e.preventDefault();
      e.stopPropagation();

      const dropMenu = n.querySelector('ul');
      if (dropMenu) {
        dropMenu.classList.toggle('dropdown-open');
        const aLinks = dropMenu.querySelectorAll('a');
        aLinks.forEach((alink) => {
          alink.addEventListener('click', (e) => {
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

  document.addEventListener('click', (e) => {
    const isClickInside = block.contains(e.target);
    if (!isClickInside) {
      closeAllDropdowns();
    }
  });
}
