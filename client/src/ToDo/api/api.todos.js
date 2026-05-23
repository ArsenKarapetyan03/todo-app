import {authFetch} from "./api.auth.header.js"

export async function getTodos() {
  const response = await authFetch(`/todos/get`,{
    method:'GET',
  }
)
  if (!response.ok) {
    alert('Failed to fetch todos')
    throw new Error('Failed to fetch todos')
  }
  return response.json()
}

export async function addTodo(todo) {
  
    const response = await authFetch('/todos/add', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    })
    if (!response.ok) {
      alert('Failed to add todo')
      throw new Error('Failed to add todo')
    }
    return response.json()
}

export async function updateTodoStatus(id, completed) {
  const res = await authFetch('/todos/check', {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, completed }),
  })
  
  if (!res.ok) {
    console.error(res.statusText)
    throw new Error('Request failed')
  }
  return res.json();
}

export async function deleteTodos(completedTodosID) {
  const res = await authFetch('/todos/delete', {
    method: 'DELETE',
    headers: { 
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(completedTodosID),
  })
  if (!res.ok) {
    console.error(res.statusText)
    throw new Error('Failed to delete todos')
  }
}