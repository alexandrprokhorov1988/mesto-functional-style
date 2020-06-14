const validation = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_visible'
};

function showInputError(formElement, inputElement, message, {inputErrorClass, errorClass}) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = message;
  errorElement.classList.add(errorClass);
}

function hideInputError(formElement, inputElement, {inputErrorClass, errorClass}) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
}

function checkInputValidity(formElement, inputElement, {...rest}) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, rest);
  } else {
    hideInputError(formElement, inputElement, rest);
  }
}

function hasValidInput(inputs) {
  return inputs.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputs, submitButton, {inactiveButtonClass}) {
  if (hasValidInput(inputs)) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
  } else {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = '';
  }
}

function setEventListeners(formElement, inputs, submitButton, formActivationButton, {...rest}) {
  inputs.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, rest);
      toggleButtonState(inputs, submitButton, rest);
    });
  });
  if (formActivationButton) {
    formActivationButton.addEventListener('click', () => {
      inputs.forEach((inputElement) => {
        if (inputElement.value !== '') {
          checkInputValidity(formElement, inputElement, rest);
        } else {
          hideInputError(formElement, inputElement, rest);
        }
      });
      toggleButtonState(inputs, submitButton, rest);
    });
  }
}

function enableValidation({formSelector, inputSelector, submitButtonSelector, ...rest}) {
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach((formElement) => {
    const formData = formElement.dataset.form;
    const formActivationButton = document.querySelector(`button[data-button=${formData}]`);
    const inputs = Array.from(formElement.querySelectorAll(inputSelector));
    const submitButton = formElement.querySelector(submitButtonSelector);
    setEventListeners(formElement, inputs, submitButton, formActivationButton, rest);
  });
}

enableValidation(validation);

