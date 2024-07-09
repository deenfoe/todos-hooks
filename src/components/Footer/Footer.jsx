import PropTypes from 'prop-types'

function Footer(props) {
  const {
    deleteCompletedTodos,
    activeTodos,
    showAll,
    showActive,
    showCompleted,
    currentFilter, // Получаем текущий фильтр из пропсов
  } = props

  return (
    <footer className="footer">
      <span className="todo-count">{activeTodos} items left</span>
      <ul className="filters">
        <li>
          <button className={currentFilter === 'All' ? 'selected' : ''} onClick={showAll}>
            All
          </button>
        </li>
        <li>
          <button className={currentFilter === 'Active' ? 'selected' : ''} onClick={showActive}>
            Active
          </button>
        </li>
        <li>
          <button className={currentFilter === 'Completed' ? 'selected' : ''} onClick={showCompleted}>
            Completed
          </button>
        </li>
      </ul>
      <button className="clear-completed" onClick={deleteCompletedTodos}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.propTypes = {
  deleteCompletedTodos: PropTypes.func.isRequired,
  activeTodos: PropTypes.number.isRequired,
  showAll: PropTypes.func.isRequired,
  showActive: PropTypes.func.isRequired,
  showCompleted: PropTypes.func.isRequired,
  currentFilter: PropTypes.string.isRequired,
}

export default Footer
