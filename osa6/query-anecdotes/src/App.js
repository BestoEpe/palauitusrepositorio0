import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdote } from './services/request'
import { useNotificationDispatch } from './NotificationCondex'

const App = () => {
  const { isLoading, isError, data, error } = useQuery('anecdotes', getAnecdotes, {
    retry: false,
    refetchOnWindowFocus: false,
  })
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (likedAnecdote) => {
      queryClient.invalidateQueries('anecdotes')
      notificationDispatch({ type: '', payload: `anecdote ${likedAnecdote.content} voted` })
    },
  })

  if (isLoading) {
    return <div>loading data...</div>
  }
  if (isError) {
    console.log(error)
    return <div>anecdote service not available duo to problems in server</div>
  }
  const anecdotes = data

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  )
}

export default App
