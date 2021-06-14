import React, { useContext } from "react";
import { ScrollButtonContext } from "../../../src/App";
import "./Todo.css";


const Todo = () => {
    const scrollBtn = useContext(ScrollButtonContext)

    return(
        <div className='todo-container'>
            {scrollBtn}
            <div className="todo">
                <div className="todo___bgimage" />
                    <div className="todo___title">
                    <div className="todo___title_style">
                        <h2>Liste des tâches</h2>
                    </div>
                    <div className="todo-list">
                        <div className="todo-list___form">
                            <h3>Nouvelle tâche</h3>
                        </div>
                        <div className="todo-list___li">
                            <ul>

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Todo;