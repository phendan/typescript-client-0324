import { Errors } from '../types';

export const html = String.raw;

export const clearErrors = () => {
    const errors = document.querySelectorAll('.error-message');
    errors.forEach(error => error.remove());
};

export const renderErrors = (errors: Errors) => {
    for (let fieldName in errors) {
        const error = errors[fieldName];

        const errorElement = render(html`<div
            class="error-message py-4 text-red-800 border border-red-700 rounded-md px-7 mt-2"
        >
            ${error}
        </div>`);

        const inputField = document.querySelector(`#${fieldName}`);
        const formGroup = inputField?.parentElement?.parentElement;
        formGroup?.appendChild(errorElement);
    }
};

export const render = (html: string) => {
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content;
};
