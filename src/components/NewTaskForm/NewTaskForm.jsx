import PropTypes from 'prop-types'
import { useState } from 'react'

function NewTaskForm(props) {
  const { addTodo } = props
  const [text, setText] = useState('')

  const onSubmitHandler = (event) => {
    event.preventDefault()
    addTodo(text)
    setText('')
  }

  return (
    <form onSubmit={onSubmitHandler}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={text}
        onChange={(event) => setText(event.target.value)}
        autoFocus
      />
    </form>
  )
}

NewTaskForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
}

export default NewTaskForm
