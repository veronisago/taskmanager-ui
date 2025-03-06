export interface Task {
    id: string;
    title: string;
    description: string;
    status: 'To Do' | 'In Progress' | 'Done';
    createdAt: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export type LoginResponse = {
    user: { id: string; name: string; email: string };
    token: string;
};

export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
}

export type RegisterUserResponse = {
    user: { id: string; name: string; email: string };
    token: string;
};