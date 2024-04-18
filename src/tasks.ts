import { showLoginPage } from './auth/login';
import { fetchUser } from './auth/user';
import type { Task } from './types';
import { html } from './utilities/html';
import http from './utilities/http';

export const showTasksPage = async () => {
    const user = await fetchUser();

    if (!user) {
        showLoginPage();
        return;
    }

    const toDos = user.tasks.filter(toDo => toDo.status === 'To-Do');
    const toDosHtml = renderTasks(toDos);

    const inProgress = user.tasks.filter(toDo => toDo.status === 'In Progress');
    const inProgressHtml = renderTasks(inProgress);

    const done = user.tasks.filter(toDo => toDo.status === 'Done');
    const doneHtml = renderTasks(done);

    const tasksHtml = html`<div>
        <!-- Task List -->
        <div>
            <div>
                <h2 class="font-bold text-lg">To-Dos</h2>
                ${toDosHtml}
            </div>
            <div>
                <h2 class="font-bold text-lg">In Progress</h2>
                ${inProgressHtml}
            </div>
            <div>
                <h2 class="font-bold text-lg">Done</h2>
                ${doneHtml}
            </div>
        </div>

        <form></form>
    </div>`;

    document.querySelector('#main-content')!.innerHTML = tasksHtml;

    const dropdowns = document.querySelectorAll<HTMLSelectElement>(
        '.change-status-dropdown'
    );

    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('change', async event => {
            const status = dropdown.selectedOptions[0].value;
            const taskId = dropdown.dataset.taskId;

            try {
                const response = await http.post(`/task/${taskId}`, { status });
                showTasksPage();
            } catch (exception) {
                console.error(exception);
            }
        });
    });
};

const renderTasks = (tasks: Task[]) => {
    const taskElements = tasks
        .map(task => {
            const selectHtml = renderSelect(task);

            console.log(selectHtml);

            return html`<li class="flex items-center justify-between py-2 group">
                <div>${task.title}</div>
                <p>${task.description}</p>
                <!-- Select Status -->
                ${selectHtml}
            </li>`;
        })
        .join('');

    const taskList = html`<ul class="divide-y divide-gray-100">
        ${taskElements}
    </ul>`;

    return taskList;
};

const renderSelect = (task: Task) => {
    const statuses = ['To-Do', 'In Progress', 'Done'];

    const selectHtml = html`
        <select class="change-status-dropdown" data-task-id="${task.id}">
            ${statuses.map(status => {
                return html`<option
                    value="${status}"
                    ${task.status === status && 'selected'}
                >
                    ${status}
                </option>`;
            })}
        </select>
    `;

    return selectHtml;
};
