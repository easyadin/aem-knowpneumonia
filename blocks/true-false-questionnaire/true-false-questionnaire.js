/**
 *
 * @param {Element} block
 */
export default function decorate(block) {
  const questionElement = block.querySelector(
    '.true-false-questionnaire > div:first-child'
  );
  const trueElement = block.querySelector(
    '.true-false-questionnaire > div:first-child div:nth-child(2)'
  );
  const falseElement = block.querySelector(
    '.true-false-questionnaire > div:first-child div:nth-child(3)'
  );
  const trueAnswer = block.querySelector(
    '.true-false-questionnaire > div:nth-child(2)'
  );
  const falseAnswer = block.querySelector(
    '.true-false-questionnaire > div:nth-child(3)'
  );

  trueAnswer.style.display = 'none';
  falseAnswer.style.display = 'none';

  trueElement.addEventListener('click', () => {
    questionElement.style.display = 'none';
    trueAnswer.style.display = 'block';
    falseAnswer.style.display = 'none';
  });

  falseElement.addEventListener('click', () => {
    questionElement.style.display = 'none';
    falseAnswer.style.display = 'block';
    trueAnswer.style.display = 'none';
  });
}
