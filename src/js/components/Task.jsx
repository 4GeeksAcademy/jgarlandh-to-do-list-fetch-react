import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';

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
            <div className="container-md">
            <input className="rounded-pill mb-2" value={task} onChange={(e) => setTask(e.target.value)} type="text" /><br />
            <Button className="mb-2" variant="success" onClick={(e) => addTask(e)}>Agregar Tarea</Button>
            <ListGroup as="ol" numbered>
                {lista.map((tarea, index) => (
                    <ListGroup.Item as="li" className="mb-2" key={index}>
                        {tarea.label}
                        <Button variant="secondary" onClick={() => deleteTask(tarea.id)}><i className="fa-solid fa-trash mb-2 fs-6"></i></Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <Alert variant="warning">
                <Alert.Heading>Pending Tasks: {lista.length}</Alert.Heading>
            </Alert>
            </div>
        </>
    )
};

export default Task;