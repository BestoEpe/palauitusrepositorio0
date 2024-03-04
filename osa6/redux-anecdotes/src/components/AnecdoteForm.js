import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const AddAnecdote = (event) => {
    event.preventDefault()
    const newAnecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(newAnecdote))
    dispatch(setNotification(`You created '${newAnecdote}'`,5))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={AddAnecdote}>
        <div><input name="anecdote" /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm