import PropTypes from 'prop-types'

import Task from '../Task/Task'

function TaskList(props) {
  const { todos, deleteTodo, toggleTodo, toggleTodoEdit } = props

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <Task
          key={todo.id}
          todo={todo}
          toggleTodoEdit={toggleTodoEdit}
          deleteTodo={deleteTodo}
          toggleTodo={toggleTodo}
        />
      ))}
    </ul>
  )
}

TaskList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      created: PropTypes.instanceOf(Date).isRequired,
      isCompleted: PropTypes.bool.isRequired,
    })
  ).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  toggleTodoEdit: PropTypes.func.isRequired,
}

export default TaskList
