import { requestHandler } from "../helpers/requestHandler";
import { TaskType } from "../../types";

interface TodoParams {
    id?: string;
    text?: string;
    isCompleted?: boolean;
}

export const getTodos = requestHandler<void, TaskType[]>((params) => {
    return Promise.resolve({
    method: 'get',
    url: '/api/todolist/',
    });
});

export const addTodo = requestHandler<TodoParams, any>((params) => {
    return Promise.resolve({
    method: 'post',
    url: '/api/todolist/add',
    params: params || {},
    data: {
        text: params?.text,
    }
    });
});

export const updateTodo = requestHandler<TodoParams, any>((params) => {
    return Promise.resolve({
    method: 'post',
    url: `/api/todolist/edit/${params?.id}`,
    data: {
        text: params?.text
    },
    params: params
    });
});

export const updateTodosStatus = requestHandler<TodoParams, any>((params) => {
    return Promise.resolve({
    method: 'post',
    url: `/api/todolist/edit/${params?.id}`,
    data: {
        isCompleted: params?.isCompleted
    },
    params: params
    });
});

export const deleteTodo = requestHandler<TodoParams, any>((params) => {
    return Promise.resolve({
    method: 'delete',
    url: `/api/todolist/delete/${params?.id}`,
    params: params
    });
});