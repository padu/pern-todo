import React, { Fragment, useEffect, useState, useContext } from "react";
import { SocketContext } from '../context/socket';

import EditTodo from "./EditTodo";

const ListTodos = () => {
  const [todos, setTodos] = useState([]);
  const socket = useContext(SocketContext);

  //delete todo function

  const deleteTodo = async id => {
    try {
      const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE"
      });

      setTodos(todos.filter(todo => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();

      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  useEffect(() => {
    socket.on('new_todo', (newToDo) => {
      setTodos([...todos, newToDo])
    });

    socket.on('udpate_todo', (updatedToDo) => {
      const updatedToDoList = todos.map((todo) => {
        if (todo.todo_id === updatedToDo.todo_id) { 
          return {...updatedToDo} 
        } else {
          return {...todo}
        }
      });
      setTodos(updatedToDoList);
    });

    socket.on('delete_todo', (deletedToDo) => {
      setTodos([...todos.filter((todo) => deletedToDo.todo_id !== todo.todo_id)])
    });
  }, [socket, setTodos, todos]);

  console.log(todos);

  return (
    <Fragment>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => (
            <tr key={`${todo.todo_id}`}>
              <td>{todo.description}</td>
              <td>
                <EditTodo todo={todo} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodos;
