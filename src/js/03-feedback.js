import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const email = document.querySelector('[type="email"]');
const textarea = document.querySelector('[name="message"]');
// console.log(form);
const LOCALSTORAGE_KEY = 'feedback-form-state';

const object = {};

form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);

onPageUpdate();

function onFormSubmit(evt) {
  evt.preventDefault();
  evt.currentTarget.reset();
  localStorage.removeItem(LOCALSTORAGE_KEY);
  console.log(object);
}

function onFormInput(evt) {
  object.email = email.value;
  object.message = textarea.value;
  //   object[evt.target.name] = evt.target.value;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(object));
  //   console.log(localStorage);
}

function onPageUpdate() {
  const savedValue = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
  //   console.log(savedValue);
  if (savedValue) {
    email.value = savedValue.email;
    textarea.value = savedValue.message;
  }
}
