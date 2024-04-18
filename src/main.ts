import './style.css';

import { showRegisterPage } from './auth/register';
import { showLoginPage } from './auth/login';
import { showTasksPage } from './tasks';

showRegisterPage();

const routes = {
    login: showLoginPage,
    register: showRegisterPage,
    tasks: showTasksPage
};

type Route = keyof typeof routes;

const navLinks = document.querySelectorAll<HTMLAnchorElement>('.nav-links a');

navLinks?.forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();

        const page = link.getAttribute('href');

        if (!page || !routes.hasOwnProperty(page)) return;
        routes[page as Route]();
    });
});
