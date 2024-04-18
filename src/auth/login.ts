import http from '../utilities/http';
import { clearErrors, html, renderErrors } from '../utilities/html';
import { showTasksPage } from '../tasks';

const loginHtml = html`<div
    class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8"
>
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2
            class="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
        >
            Sign in to your account
        </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" id="login-form" novalidate>
            <!-- Form Group -->
            <div>
                <label
                    for="email"
                    class="block text-sm font-medium leading-6 text-gray-900"
                >
                    Email address
                </label>
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
                <div class="flex items-center justify-between">
                    <label
                        for="password"
                        class="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Password
                    </label>
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
                <button
                    type="submit"
                    class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Sign in
                </button>
            </div>
        </form>
    </div>
</div>`;

export const showLoginPage = () => {
    document.querySelector('#main-content')!.innerHTML = loginHtml;

    const loginFormElement = document.querySelector('#login-form');

    loginFormElement?.addEventListener('submit', async event => {
        event.preventDefault();
        clearErrors();

        const email = document.querySelector<HTMLInputElement>('#email')?.value;
        const password = document.querySelector<HTMLInputElement>('#password')?.value;

        try {
            const response = await http.post('/login', {
                email,
                password
            });

            showTasksPage();
        } catch (exception: any) {
            if (exception.response.status === 422) {
                console.error(exception.response.data.errors);
                renderErrors(exception.response.data.errors);
            }
        }
    });
};
