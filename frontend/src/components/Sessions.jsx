import { useState, useEffect } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { getAllSessions, deleteSession } from '../api/authAPI'

const Sessions = () => {
  const { accessToken } = useAuthContext()

  const [sessions, setSessions] = useState([])
  const [current, setCurrent] = useState(null)

  useEffect(() => {
    const getSessions = async () => {
      const response = await getAllSessions(accessToken)
      setSessions(response.sessions)
      setCurrent(response.current)
    }
    getSessions()
  }, [accessToken])

  const handleDeleteSession = async (id) => {
    await deleteSession(accessToken, id)
    setSessions(sessions.filter((session) => session._id !== id))
  }

  return (
    <div>
      <h4>Sessions</h4>
      <ul>
        {sessions &&
          sessions.map((session) => (
            <li key={session._id}>
              -show user agent-
              {session._id} : {session.ip}
              last login: {session.updatedAt}
              {session._id === current ? (
                '(Current Session)'
              ) : (
                <button onClick={() => handleDeleteSession(session._id)}>
                  X
                </button>
              )}
            </li>
          ))}
      </ul>
    </div>
  )
}
export default Sessions
