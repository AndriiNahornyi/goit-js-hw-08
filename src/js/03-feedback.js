import Throttle from "lodash.throttle";
// Variables
const form = document.querySelector(".feedback-form");
const email = form.querySelector("[name='email']");
const message = form.querySelector("[name='message']");

const localKey = 'feedback-form-state';
// Listeners
form.addEventListener('input', Throttle(storageFormData, 500));
form.addEventListener('submit', onFormSubmit);
window.addEventListener('load', checkStorage);
// Functions
function checkStorage(event) {
    if (!localStorage.getItem(localKey)) return;
    const formValue = JSON.parse(localStorage.getItem(localKey));
    email.value = formValue.email;
    message.value = formValue.message;
}
function onFormSubmit(event) {
    event.preventDefault();
    const { email, message } = event.currentTarget.elements;
    console.dir({ email: email.value, message: message.value });
    // Alternative
    // const savedData = JSON.parse(localStorage.getItem(localKey));
    // console.dir(savedData);
    localStorage.removeItem(localKey);
    event.currentTarget.reset();
}
function storageFormData(event) {
    const formValue = { email: '', message: '' };
    if (localStorage.getItem(localKey)) {
        Object.assign(formValue, JSON.parse(localStorage.getItem(localKey)));
    }
    // console.dir(event.target.value);
    // console.log('name input:', event.target.name);
    // console.log('value input:', event.target.value);
    formValue[event.target.name] = event.target.value;
    // console.log(formValue);
    localStorage.setItem(localKey, JSON.stringify(formValue));
}
