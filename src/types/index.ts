export type Errors = Record<string, string[]>;

export type User = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: number;
    updatedAt: number;
    tasks: Task[];
};

export type Task = {
    id: number;
    title: string;
    description: string;
    status: 'To-Do' | 'In Progress' | 'Done';
    createdAt: number;
    updatedAt: number;
    userId: number;
};
