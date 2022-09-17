// HTML містить розмітку форми. Напиши скрипт, який буде зберігати значення полів у локальне сховище, коли користувач щось друкує:
// 1.Відстежуй на формі подію input, і щоразу записуй у локальне сховище об'єкт з полями email і message, у яких зберігай поточні значення полів форми. Нехай ключем для сховища буде рядок "feedback-form-state".
// 2.Під час завантаження сторінки перевіряй стан сховища, і якщо там є збережені дані, заповнюй ними поля форми. В іншому випадку поля повинні бути порожніми.
// 3.Під час сабміту форми очищуй сховище і поля форми, а також виводь у консоль об'єкт з полями email, message та їхніми поточними значеннями.
// 4.Зроби так, щоб сховище оновлювалось не частіше, ніж раз на 500 мілісекунд. Для цього додай до проекту і використовуй бібліотеку lodash.throttle.
import Throttle from "lodash.throttle";
// Variables
const form = document.querySelector(".feedback-form");
const email = form.querySelector("[name='email']");
const message = form.querySelector("[name='message']");
// 1. created a variable for the key in localStorage
const localKey = 'feedback-form-state';
// Listeners. Adds listeners on the form for the submit and input events. 
// Throttle is a function. 
form.addEventListener('input', Throttle(storageFormData, 500));
form.addEventListener('submit', onFormSubmit);
// Adds listener on the window for the load event. Saves what is recorded in the Storage.
window.addEventListener('load', checkStorage);
// Functions
// Check the Storage for the presence of recorded keys (якщо в localStorage щось є, то ф-ція бере дані з об'єкта з localStorage, і розбиває на окремі ключі і заповнює ними inputs, коли ми перезавантажуємо сторінку).
function checkStorage() {
    if (!localStorage.getItem(localKey)) return;
    const formValue = JSON.parse(localStorage.getItem(localKey));
// Added for..in statement since there can be many fields in the form!!!
    console.dir(formValue);
    for (const key in formValue) {
        form.elements[key].value = formValue[key];
    }
// Alternative. If the form has only 1 field.
    // email.value = formValue.email;
    // message.value = formValue.message;
}
// Function for submit. 
function onFormSubmit(event) {
    // prevent the default browser action
    event.preventDefault();
// receive the data and console it
    const savedData = JSON.parse(localStorage.getItem(localKey));
    console.dir(savedData);
// Alternative to receiving data.
    // const { email, message } = event.currentTarget.elements;
    // console.dir({ email: email.value, message: message.value });
// remove data from localStorage & clear/reset/ all forms
    localStorage.removeItem(localKey);
    event.currentTarget.reset();
}
// Function data storing in localStorage (in order for data from Inputs will be recorded in localStorage).
    function storageFormData(event) {
        const formValue = { email: '', message: '' };
// якщо наш об'ект щось містить, то додаємо нові до вже існуючих
// що б не затирались дані коли вводимо в іншому полі
        if (localStorage.getItem(localKey)) {
            Object.assign(formValue, JSON.parse(localStorage.getItem(localKey)));
        }
        // console.dir(event.target.value);
        // console.log('name input:', event.target.name);
        // console.log('value input:', event.target.value);
//  створюємо localSrorage, приводимо дані в строку та записуємо
        formValue[event.target.name] = event.target.value.trim();
        // console.log(formValue);
        localStorage.setItem(localKey, JSON.stringify(formValue));
    }
