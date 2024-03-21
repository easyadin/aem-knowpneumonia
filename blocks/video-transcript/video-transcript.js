/**
 *
 * @param {Element} block
 */
export default function decorate(block) {
  const showTranscriptEl = block.querySelector('ul > li:first-child');
  const transcriptContainer = block.querySelector('ul > li:nth-child(3)');
  const hideTranscriptEl = block.querySelector('ul > li:nth-child(2)');
  const closeTranscriptEl = block.querySelector('div > ul > li:nth-child(4)');

  hideTranscriptEl.style.display = 'none';
  closeTranscriptEl.style.display = 'none';

  const transcriptText = transcriptContainer.childNodes[0];
  const wrapperSpan = document.createElement('span');
  wrapperSpan.textContent = transcriptText.nodeValue.trim();
  transcriptText.nodeValue = '';
  transcriptContainer.insertBefore(wrapperSpan, transcriptContainer.firstChild);

  wrapperSpan.style.display = 'none';

  const showTranscript = () => {
    transcriptContainer.style.display = 'flex';
    showTranscriptEl.style.display = 'none';
    hideTranscriptEl.style.display = 'flex';
    closeTranscriptEl.style.display = 'flex';
    wrapperSpan.style.display = 'none';
  };

  const hideTranscript = () => {
    transcriptContainer.style.display = 'none';
    showTranscriptEl.style.display = 'flex';
    hideTranscriptEl.style.display = 'none';
    closeTranscriptEl.style.display = 'none';
  };

  showTranscriptEl.addEventListener('click', showTranscript);
  hideTranscriptEl.addEventListener('click', hideTranscript);
  closeTranscriptEl.addEventListener('click', hideTranscript);
}
