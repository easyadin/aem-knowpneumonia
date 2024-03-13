import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * Loads and Decorates the header
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // Load nav as fragment
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta).pathname : '/nav';
  const fragment = await loadFragment(navPath);

  // Decorate nav DOM
  const nav = document.createElement('nav');
  nav.id = 'nav';
  while (fragment.firstElementChild) nav.append(fragment.firstElementChild);

  // Remove useless element - No idea why its added / how
  block.removeChild(block.firstChild);
  nav.removeChild(nav.lastChild);

  // Append
  block.append(nav);
}
