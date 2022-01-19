import React, { useState, useReducer } from "react";
import './App.css';

// 3 Fälle, die ausgeführt werden sollen per buttonClick
const ACTIONS = {
  ADD_TODO: 'add_todo',
  TOGGLE_TODO: 'toggle_todo',
  DELETE_TODO: 'delete_todo'
}

const greeting = "Hello User";
const title = "Todo-App";

// die reducer Funktion mit 2 parameter und 3 Fällen
function reducer(todos, action) {
  switch (action.type) {
    // 1.Fall: todo hinzufügen
    case ACTIONS.ADD_TODO:
      return [...todos, newTodo(action.payload.name)]

    // 2.Fall: todo auf done setzen
    case ACTIONS.TOGGLE_TODO:
      return todos.map(todo => {
        if (todo.id === action.payload.id) {
          return { ...todo, complete: !todo.complete }
        }
        return todo
      })

    // 3.Fall: todo löschen
    case ACTIONS.DELETE_TODO:
      return todos.filter(todo => todo.id !== action.payload.id)

    default:
      return todos
  }
}

function newTodo(name) {
  return { id: Date.now(), name: name, complete: false }

}

function App() {

  const [todos, dispatch] = useReducer(reducer, []);
  const [name, setName] = useState('');

  function handleClick(e) {
    e.preventDefault()
    dispatch({ type: ACTIONS.ADD_TODO, payload: { name: name } })
    setName('')
  }
  console.log(todos)

  return (
    <div className="TodoApp">
      <div className="content">

        <header>
          <h1>{title}</h1>
          <h3>{greeting}</h3>
        </header>

        <div className="formBox">
          <form className="createTodo">
            <input className="createInput" value={name} placeholder="Add todo" onChange={e => setName(e.target.value)} />
            <button className='btn' onClick={handleClick}>
              Create
            </button>
          </form>
        </div>

        <div className="existingTodo">
          {todos.map((todo, i) => {
            return (
              <div className="todoBox" >
                <div
                  style={{
                    color: todo.complete ? "grey" : "darkgreen"
                  }}
                  className="todoTitle"
                >
                  {todo.name}
                </div>

                <br />

                <div className="todoButtons">
                  <button
                    className="btn"
                    onClick={() => {
                      dispatch({ type: ACTIONS.TOGGLE_TODO, payload: { id: todo.id } })
                    }}
                  >
                    Toggle
                  </button>
                  <button
                    className="btn"
                    onClick={() => {
                      dispatch({ type: ACTIONS.DELETE_TODO, payload: { id: todo.id } })
                    }}
                  >
                    Delete
                  </button>

                </div>

              </div>
            )
          })}
        </div>

      </div>
    </div>
  );
}

export default App;
