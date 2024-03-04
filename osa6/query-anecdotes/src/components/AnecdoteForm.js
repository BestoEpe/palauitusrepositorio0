import { useMutation  , useQueryClient } from 'react-query'
import { createAnecdote } from '../services/request'
import { useNotificationDispatch } from '../NotificationCondex'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
      notificationDispatch({ type: '', payload: `anecdote ${newAnecdote.content} created` })
    },
    onError: (err) => {
      const errorMessage = err?.response?.data?.error
      if (errorMessage) {
        notificationDispatch({ type: '', payload: errorMessage })
      }
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const votes = 0
    newAnecdoteMutation.mutate({ content , votes })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
