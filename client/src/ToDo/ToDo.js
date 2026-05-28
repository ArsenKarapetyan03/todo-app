import "./ToDo.css"
import { useState } from "react"
import { useTodos } from "./hooks/useTodos"
import Logout from "../Auth/logout"

export default function Todo() {
  const [inputValue, setInputValue] = useState('')
  const { todos, add, toggle, removeCompleted, loading, error } = useTodos()

  if (loading) return <p>Loading...</p>
  if (error) return <p>Something went wrong</p>

  return (
    <>
    <div className="container">
      <input
        id="todoInput"
        placeholder="Add a new task"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onKeyDown={e => {
          if (e.key === "Enter") {
            add(inputValue)
            setInputValue('')
          }
        }}
      />
      
      <button
      className="addButton"
      onClick={ async () => {
        await add(inputValue)
        setInputValue('')
      }}>
        add
      </button>

      <button
      className="deleteButton"
      onClick={removeCompleted}>
        delete
      </button>

      <ul className="todos">
        {todos.map(todo => (
          <li key={todo.id} className="todo">
            <input
              className="todoCheckbox"
              type="checkbox"
              checked={todo.completed}
              onChange={e => toggle(todo.id, e.target.checked)}
            />
            <span>{todo.title}</span>
          </li>
        ))}
      </ul>
    </div>
    <Logout />
      </>
  )
}