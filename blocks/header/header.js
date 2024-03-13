import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * Loads and Decorates the header
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  const navMeta = getMetadata('nav');
  block.textContent = '';

  // Load nav fragment
  const navPath = navMeta.footer || '/nav';
  const fragment = await loadFragment(navPath);

  // Decorate footer DOM
  const nav = document.createElement('div');
  while (fragment.firstElementChild) nav.append(fragment.firstElementChild);

  block.append(nav);
}
