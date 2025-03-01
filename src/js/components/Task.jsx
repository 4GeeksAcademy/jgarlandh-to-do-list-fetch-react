import React, { useState, useEffect } from "react";



const Task = () => {

    const [lista, setLista] = useState([]);
    const [task, setTask] = useState("");

    const getTasks = async () => {
        try {
            const response = await fetch("https://playground.4geeks.com/todo/users/jesus");
            console.log(response.status, response.statusText);
            if (response.status === 404) {
                await createUser()
                return
            }
            const data = await response.json();
            console.log(data.todos);
            setLista(data.todos);
        } catch (error) {
            console.error(error);
        }
    };

    const createUser = async () => {
        try {
            const response = await fetch("https://playground.4geeks.com/todo/users/jesus", {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            });
            console.log(response.status, response.statusText);
            if (response.status === 201) {
                await getTasks()
                return
            }
        } catch (error) {
            console.error(error);
        }
    };

    const addTask = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://playground.4geeks.com/todo/todos/jesus", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(
                    {
                        "label": task,
                        "is_done": false
                    }
                )
            });
            console.log(response.status, response.statusText);
            if (response.status === 201) {
                await getTasks();
                setTask("");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const deleteTask = async(id) => {
        try {
            const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });
            console.log(response.status, response.statusText);
            if (response.status === 204) {
                await getTasks();
            }
        } catch (error) {
            console.error(error)
        }
    };

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <>
            <h1>To Do List</h1>
            <input value={task} onChange={(e) => setTask(e.target.value)} type="text" /><br />
            <button onClick={(e) => addTask(e)}>Agregar Tarea</button>
            <ul>
                {lista.map((tarea, index) => (
                    <li key={index}>
                        {tarea.label}
                        <button onClick={() => deleteTask(tarea.id)}><i className="fa-fa-trash">x</i></button>
                    </li>
                ))}
            </ul>
            <p>Pending Tasks: {lista.length}</p>
        </>
    )
};

export default Task;