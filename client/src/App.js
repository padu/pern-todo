import React from "react";
import "./App.css";
import { SocketContext, socket} from './context/socket';

//components

import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodos";

function App() {
  return (
    <SocketContext.Provider value={socket}>
      <div className="container">
        <InputTodo />
        <ListTodos />
      </div>
    </SocketContext.Provider>
  );
}

export default App;
