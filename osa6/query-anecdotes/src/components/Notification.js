import { useEffect } from 'react'
import { useNotificationValue , useNotificationDispatch } from '../NotificationCondex'

const style = {
  border: 'solid',
  padding: 10,
  borderWidth: 1,
  marginBottom: 5
}
const Notification = () => {
  const dispatch = useNotificationDispatch()
  const notification = useNotificationValue()

  useEffect(() => {
    setTimeout(() => dispatch({ type: '' }),5000)
  }, [dispatch , notification])


  if (!notification) {
    return null
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
