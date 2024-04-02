import React from 'react'
import { TaskType, TodosProps } from '../../../../types'
import Todo from '../Todo/Todo'

interface TodolistProps extends TodosProps {
    searchValue: string;
    selected: string;
}
const Todolist = (props: TodolistProps) => {
    const { 
        todos, 
        searchValue, 
        selected, 
        checked, 
        setMessage, 
        setMessageType, 
        setTodos, 
        setTodo 
    } = props

  return (
    <section>
        {todos
            .filter((todo: TaskType) => {
            return (
                todo.text
                .toLowerCase()
                .indexOf(searchValue.toLowerCase()) >= 0
            );
            })
            .reverse()
            .filter((task) => {
            if (selected === "done") {
                return task.isCompleted;
            } else if (selected === "incomplete") {
                return !task.isCompleted;
            } else {
                return task;
            }
            })
            .map((todo: TaskType) => (
            <Todo
            todo={todo}
            todos={todos}
            key={todo._id}
            setTodos={setTodos}
            setMessage={setMessage}
            setMessageType={setMessageType}
            setTodo={setTodo}
            checked={checked}
            />
            ))}
    </section>
  )
}

export default Todolist