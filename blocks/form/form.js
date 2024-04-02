import { sampleRUM } from '../../scripts/aem.js';

/**
 * Represents a form field configuration.
 * @typedef {Object} FormFieldConfig
 * @property {string} Fieldset - The fieldset the form field belongs to.
 * @property {string} ID - The unique identifier for the form field.
 * @property {string} Label - The label for the form field.
 * @property {string} Mandatory - Indicates whether the form field is mandatory.
 * @property {string} Name - The name of the form field.
 * @property {string} Options - The options for the form field, if applicable.
 * @property {string} Placeholder - The placeholder text for the form field.
 * @property {string} Style - The style of the form field.
 * @property {string} Type - The type of the form field.
 * @property {string} Value - The value of the form field.
 */

/**
 * Fetches and parses JSON from a given link and returns form configuration.
 * @param {string} link URL to fetch JSON data from.
 * @returns {Promise<FormFieldConfig[]>} Parsed JSON object representing the form configuration, or null if an error occurs.
 */
const formJSON = async (link) => {
  console.log({ link });
  if (!link) {
    console.error('Invalid link provided');
    return null;
  }

  try {
    const resp = await fetch(link);
    if (!resp.ok) {
      throw new Error(`HTTP error! status: ${resp.status}`);
    }

    const json = await resp.json();
    return json.data;
  } catch (error) {
    console.error('Error fetching or parsing JSON:', error);
    return null;
  }
};

/**
 * Dynamically creates and appends form elements to the specified form element based on the provided configuration.
 * @param {Element} formElement - The form element to append generated form fields to.
 * @param {FormFieldConfig[]} formConfig - Array of form field configuration objects.
 */
const buildForm = (formElement, formConfig) => {
  formConfig.forEach((field) => {
    let element;
    switch (field.Type) {
      case 'heading':
        element = document.createElement('h3');
        element.textContent = field.Label;
        break;
      case 'plaintext':
        element = document.createElement('p');
        element.textContent = field.Label;
        break;
      case 'fieldset':
        element = document.createElement('fieldset');
        element.name = field.Name;
        if (field.Label) {
          const legend = document.createElement('legend');
          legend.textContent = field.Label;
          element.appendChild(legend);
        }
        break;
      case 'text':
      case 'email':
      case 'checkbox':
        element = document.createElement('input');
        element.type = field.Type;
        element.name = field.Name;
        element.placeholder = field.Placeholder;
        element.required = field.Mandatory === 'true';
        if (field.Value) element.value = field.Value;

        if (field.Label) {
          const label = document.createElement('label');
          label.textContent = field.Label;
          label.appendChild(element);
          element = label;
        }
        break;
      case 'submit':
        element = document.createElement('button');
        element.type = 'submit';
        element.textContent = field.Label || 'Submit';
        break;
      default:
        console.warn('Unhandled field type:', field.Type);
        return;
    }

    // Append element to form
    if (element) {
      // If the field belongs to a specific fieldset, append it there
      if (field.Fieldset) {
        const parentFieldset = formElement.querySelector(
          `fieldset[name="${field.Fieldset}"]`
        );
        parentFieldset
          ? parentFieldset.appendChild(element)
          : formElement.appendChild(element);
      } else {
        formElement.appendChild(element);
      }
    }
  });
};

function generatePayload(form) {
  const payload = {};

  [...form.elements].forEach((field) => {
    if (field.name && field.type !== 'submit' && !field.disabled) {
      if (field.type === 'radio') {
        if (field.checked) payload[field.name] = field.value;
      } else if (field.type === 'checkbox') {
        if (field.checked)
          payload[field.name] = payload[field.name]
            ? `${payload[field.name]},${field.value}`
            : field.value;
      } else {
        payload[field.name] = field.value;
      }
    }
  });
  return payload;
}

function handleSubmitError(form, error) {}

async function handleSubmit(form, formLink, confirmationLink) {
  console.log({ formLink });
  if (form.getAttribute('data-submitting') === 'true') return;

  const submit = form.querySelector('button[type="submit"]');
  try {
    form.setAttribute('data-submitting', 'true');
    submit.disabled = true;

    // create payload
    const payload = generatePayload(form);
    const response = await fetch(formLink, {
      method: 'POST',
      body: JSON.stringify({ data: payload }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      sampleRUM('form:submit', {
        source: '.form',
        target: formLink,
      });
      if (confirmationLink) {
        window.location.href = confirmationLink;
      }
    } else {
      const error = await response.text();
      throw new Error(error);
    }
  } catch (e) {
    handleSubmitError(form, e);
  } finally {
    form.setAttribute('data-submitting', 'false');
  }
}

/**
 * @param {Element} block
 */
export default async function decorate(block) {
  const formLink = block.querySelector('a').href;
  const innerChildren = block.querySelector('div');
  const formConfig = await formJSON(formLink);
  const confirmationLink = formConfig.find(
    (field) => field.Type === 'confirmation'
  ).Value;

  if (formConfig) {
    const form = document.createElement('form');
    buildForm(form, formConfig);
    block.removeChild(innerChildren);
    block.appendChild(form);

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const valid = form.checkValidity();
      if (valid) {
        handleSubmit(form, formLink, confirmationLink);
      } else {
        const firstInvalidEl = form.querySelector(':invalid:not(fieldset)');
        if (firstInvalidEl) {
          firstInvalidEl.focus();
          firstInvalidEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  } else {
    console.error('Failed to load form configuration.');
  }
}
