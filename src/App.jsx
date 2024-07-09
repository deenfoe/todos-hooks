import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import './App.css'
import Header from './components/Header/Header'
import NewTaskForm from './components/NewTaskForm/NewTaskForm'
import TaskList from './components/TaskList/TaskList'
import Footer from './components/Footer/Footer'

function App() {
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState('All') // Установить начальный фильтр

  // Добавление задачи
  const addTodoHandler = (text) => {
    const newTodo = {
      text,
      isCompleted: false,
      id: uuidv4(),
      created: new Date(),
    }
    setTodos([...todos, newTodo])
  }

  // Обработчики для фильтров
  const showAllHandler = () => setFilter('All')
  const showActiveHandler = () => setFilter('Active')
  const showCompletedHandler = () => setFilter('Completed')

  // Фильтрация задач
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'All') return true
    if (filter === 'Active') return !todo.isCompleted
    if (filter === 'Completed') return todo.isCompleted
    return false
  })

  // Редактирование задачи
  const toggleTodoEditHandler = (id, newText) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : { ...todo })))
  }

  // Удаление задачи
  const deleteTodoHandler = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  // Завершение задачи
  const toggleTodoHandler = (id) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : { ...todo })))
  }

  // Удаление завершенных задач
  const deleteCompletedTodosHandler = () => {
    setTodos(todos.filter((todo) => !todo.isCompleted))
  }

  // Количество активных задач
  const activeTodosCount = todos.filter((todo) => !todo.isCompleted).length

  return (
    <section className="todoapp">
      <Header />
      <NewTaskForm addTodo={addTodoHandler} />
      <section className="main">
        <TaskList
          todos={filteredTodos} // Используем отфильтрованные задачи
          toggleTodoEdit={toggleTodoEditHandler}
          deleteTodo={deleteTodoHandler}
          toggleTodo={toggleTodoHandler}
        />
        <Footer
          deleteCompletedTodos={deleteCompletedTodosHandler}
          activeTodos={activeTodosCount}
          showAll={showAllHandler}
          showActive={showActiveHandler}
          showCompleted={showCompletedHandler}
          currentFilter={filter} // Передаем текущий фильтр
        />
      </section>
    </section>
  )
}

export default App
