import React, { createContext, useState, useMemo, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import PropTypes from 'prop-types'

const TodosContext = createContext()

function TodosProvider({ children }) {
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState('All')
  const [timers, setTimers] = useState({})

  const addTodoHandler = useCallback((todo) => {
    const newTodo = {
      text: todo.text,
      minutes: todo.timer.minutes,
      seconds: todo.timer.seconds,
      totalSeconds: todo.timer.totalSeconds,
      isCompleted: false,
      id: uuidv4(),
      created: new Date(),
    }
    setTodos((prevTodos) => [...prevTodos, newTodo])
  }, [])

  const showAllHandler = useCallback(() => setFilter('All'), [])
  const showActiveHandler = useCallback(() => setFilter('Active'), [])
  const showCompletedHandler = useCallback(() => setFilter('Completed'), [])

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      if (filter === 'All') return true
      if (filter === 'Active') return !todo.isCompleted
      if (filter === 'Completed') return todo.isCompleted
      return false
    })
  }, [todos, filter])

  const toggleTodoEditHandler = useCallback((id, newText) => {
    setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo)))
  }, [])

  const deleteTodoHandler = useCallback(
    (id) => {
      if (timers[id]) {
        clearInterval(timers[id])
      }
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
      setTimers((prevTimers) => {
        const newTimers = { ...prevTimers }
        delete newTimers[id]
        return newTimers
      })
    },
    [timers]
  )

  const toggleTodoHandler = useCallback(
    (id) => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? { ...todo, isCompleted: !todo.isCompleted, totalSeconds: 0 } : todo))
      )
      if (timers[id]) {
        clearInterval(timers[id])
        setTimers((prevTimers) => {
          const newTimers = { ...prevTimers }
          delete newTimers[id]
          return newTimers
        })
      }
    },
    [timers]
  )

  const deleteCompletedTodosHandler = useCallback(() => {
    todos.forEach((todo) => {
      if (todo.isCompleted && timers[todo.id]) {
        clearInterval(timers[todo.id])
      }
    })
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.isCompleted))
  }, [todos, timers])

  const activeTodosCount = useMemo(() => todos.filter((todo) => !todo.isCompleted).length, [todos])

  const updateTodoTimeHandler = useCallback((id, newTotalSeconds) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, totalSeconds: newTotalSeconds } : todo))
    )
  }, [])

  const startTimer = useCallback(
    (id) => {
      if (todos.find((todo) => todo.id === id && todo.totalSeconds === 0)) return

      const timer = setInterval(() => {
        setTodos((prevTodos) => {
          return prevTodos.map((todo) => {
            if (todo.id === id) {
              if (todo.totalSeconds > 0) {
                return { ...todo, totalSeconds: todo.totalSeconds - 1 }
              }
              clearInterval(timers[id])
              setTimers((prevTimers) => {
                const newTimers = { ...prevTimers }
                delete newTimers[id]
                return newTimers
              })
              return todo
            }
            return todo
          })
        })
      }, 1000)

      setTimers((prevTimers) => ({ ...prevTimers, [id]: timer }))
    },
    [todos, timers]
  )

  const stopTimer = useCallback(
    (id) => {
      if (timers[id]) {
        clearInterval(timers[id])
        setTimers((prevTimers) => {
          const newTimers = { ...prevTimers }
          delete newTimers[id]
          return newTimers
        })
      }
    },
    [timers]
  )

  const contextValue = useMemo(
    () => ({
      todos,
      filter,
      addTodoHandler,
      showAllHandler,
      showActiveHandler,
      showCompletedHandler,
      filteredTodos,
      toggleTodoEditHandler,
      deleteTodoHandler,
      toggleTodoHandler,
      deleteCompletedTodosHandler,
      activeTodosCount,
      updateTodoTimeHandler,
      startTimer,
      stopTimer,
    }),
    [
      todos,
      filter,
      addTodoHandler,
      showAllHandler,
      showActiveHandler,
      showCompletedHandler,
      filteredTodos,
      toggleTodoEditHandler,
      deleteTodoHandler,
      toggleTodoHandler,
      deleteCompletedTodosHandler,
      activeTodosCount,
      updateTodoTimeHandler,
      startTimer,
      stopTimer,
    ]
  )

  return <TodosContext.Provider value={contextValue}>{children}</TodosContext.Provider>
}

TodosProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { TodosProvider, TodosContext }
