import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'
import { ru } from 'date-fns/locale'
import { useState } from 'react'

function Task(props) {
  const { todo, deleteTodo, toggleTodo, toggleTodoEdit } = props
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const startEditing = () => {
    setIsEditing(true)
    setEditText(todo.text)
  }

  const stopEditing = () => {
    setIsEditing(false)
  }

  const editChangeHandle = (event) => {
    setEditText(event.target.value)
  }

  const saveEdit = () => {
    toggleTodoEdit(todo.id, editText)
    stopEditing()
  }

  const taskCreated = formatDistanceToNow(new Date(todo.created), {
    addSuffix: true,
    locale: ru,
  })

  return (
    <li className={`${todo.isCompleted ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={todo.isCompleted} onChange={() => toggleTodo(todo.id)} />
        <label>
          <span className="description">{todo.text}</span>
          <span className="created">{`создано ${taskCreated}`}</span>
        </label>
        <button className="icon icon-edit" onClick={startEditing} />
        <button className="icon icon-destroy" onClick={() => deleteTodo(todo.id)} />
      </div>
      {isEditing && (
        <input
          type="text"
          className="edit"
          value={editText}
          onChange={editChangeHandle}
          onBlur={saveEdit}
          onKeyDown={(event) => event.key === 'Enter' && saveEdit()}
          autoFocus
        />
      )}
    </li>
  )
}

Task.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    created: PropTypes.instanceOf(Date).isRequired, // Или PropTypes.instanceOf(Date) в зависимости от типа
    isCompleted: PropTypes.bool.isRequired,
  }).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  toggleTodoEdit: PropTypes.func.isRequired,
}

export default Task
