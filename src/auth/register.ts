import http from '../utilities/http';
import type { Errors } from '../types';

const html = String.raw;

const registerHtml = html`<div
    class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8"
>
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2
            class="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
        >
            Create your account
        </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" id="register-form" novalidate>
            <!-- Form Group -->
            <div>
                <label
                    for="email"
                    class="block text-sm font-medium leading-6 text-gray-900"
                    >Email address</label
                >
                <div class="mt-2">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autocomplete="email"
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div>
                <label
                    for="firstName"
                    class="block text-sm font-medium leading-6 text-gray-900"
                    >First Name</label
                >
                <div class="mt-2">
                    <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        autocomplete="email"
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div>
                <label
                    for="lastName"
                    class="block text-sm font-medium leading-6 text-gray-900"
                    >Last Name</label
                >
                <div class="mt-2">
                    <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        autocomplete="name"
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div>
                <div class="flex items-center justify-between">
                    <label
                        for="password"
                        class="block text-sm font-medium leading-6 text-gray-900"
                        >Password</label
                    >
                </div>
                <div class="mt-2">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autocomplete="new-password"
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div>
                <div class="flex items-center justify-between">
                    <label
                        for="passwordAgain"
                        class="block text-sm font-medium leading-6 text-gray-900"
                        >Repeat Password</label
                    >
                </div>
                <div class="mt-2">
                    <input
                        id="passwordAgain"
                        name="passwordAgain"
                        type="password"
                        autocomplete="new-password"
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Sign up
                </button>
            </div>
        </form>
    </div>
</div>`;

export const showRegisterPage = () => {
    document.querySelector('#main-content')!.innerHTML = registerHtml;

    const registerFormElement = document.querySelector('#register-form');

    registerFormElement?.addEventListener('submit', async event => {
        event.preventDefault();
        clearErrors();

        const email = document.querySelector<HTMLInputElement>('#email')?.value;
        const firstName =
            document.querySelector<HTMLInputElement>('#firstName')?.value;
        const lastName = document.querySelector<HTMLInputElement>('#lastName')?.value;
        const password = document.querySelector<HTMLInputElement>('#password')?.value;
        const passwordAgain =
            document.querySelector<HTMLInputElement>('#passwordAgain')?.value;

        try {
            const response = await http.post('/register', {
                email,
                firstName,
                lastName,
                password,
                passwordAgain
            });
            console.log(response);
        } catch (exception: any) {
            if (exception.response.status === 422) {
                console.error(exception.response.data.errors);
                renderErrors(exception.response.data.errors);
            }
        }
    });
};

const clearErrors = () => {
    const errors = document.querySelectorAll('.error-message');
    errors.forEach(error => error.remove());
};

const renderErrors = (errors: Errors) => {
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

const render = (html: string) => {
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content;
};
