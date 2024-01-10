import { requestHandler } from "../../helpers/requestHandler";
import { TaskType } from "../../../types";

export const getTodos = requestHandler<void, TaskType[]>((params) => {
    return Promise.resolve({
    method: 'get',
    url: '/api/admin/todolist/',
    });
});