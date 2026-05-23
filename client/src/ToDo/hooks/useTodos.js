import { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid";
import * as api from "../api/api.todos"

export function useTodos() {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  ////// Initial fetch
  useEffect(() => {
    api.getTodos()
      .then(data => setTodos(data))
      .catch(err => setError(err))
      .finally(() => setLoading(false))
  }, [])

  ////// Add todo
  const add = async (value) => {
    if (!value.trim()) return

    const newTodo = {
      id: uuidv4(),
      title: value,
      completed: false,
    }

    const prev = [...todos]
    setTodos(todo => [...todo, newTodo])

    ////Sending to server
    try {
      await api.addTodo(newTodo)
    } catch (err) {
      setTodos(prev) // rollback
      alert(err);
    }
  }

  ////// Toggle status
  const toggle = async (id, completed) => {
    const prev = [...todos]

    setTodos(t =>
      t.map(todo =>
        todo.id === id ? { ...todo, completed} : todo
      )
    )

    try {
      await api.updateTodoStatus(id, completed)
    } catch (err) {
      setTodos(prev) // rollback
      throw err
    }
  }

  ////// Delete completed
  const removeCompleted = async () => {
    const prev = [...todos]
    const { filtered, completedTodosID } = todos.reduce(
      (acc, todo) => {
        if (todo.completed) {
          acc.completedTodosID.push(todo.id);
        } else {
          acc.filtered.push(todo);
        }
        return acc;
      },
      {
        filtered: [],
        completedTodosID: [],
      }
    );
    if(completedTodosID.length){

        setTodos(filtered)
    
        try {
          await api.deleteTodos(completedTodosID)
        } catch (err) {
          setTodos(prev) // rollback
          throw err
        }
    }
  }

  return {
    todos,
    loading,
    error,
    add,
    toggle,
    removeCompleted,
  }
}