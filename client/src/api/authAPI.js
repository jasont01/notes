import axios from 'axios'

const authAPI = axios.create({
  baseURL: '/api/auth',
  withCredentials: true,
})

const loginUser = async (data) => {
  const response = await authAPI.post('/', JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  })
  return response.data
}

const getSession = async () => {
  try {
    const response = await authAPI.get('/')
    return response
  } catch (error) {
    return error.response
  }
}

const getAllSessions = async (accessToken) => {
  if (!accessToken) return
  const response = await authAPI.get('/sessions', {
    headers: { authorization: 'Bearer ' + accessToken },
  })
  return response.data
}

// const refreshToken = async (accessToken) => {
//   if (!accessToken) return
//   console.log(accessToken)
//   const response = await authAPI.put('/', {
//     headers: { authorization: 'Bearer ' + accessToken },
//   })
//   return response.data
// }

const logoutUser = async (accessToken) => {
  if (!accessToken) return
  const response = await authAPI.delete('/', {
    headers: { authorization: 'Bearer ' + accessToken },
  })
  return response.data
}

const deleteSession = async (accessToken, id) => {
  if (!accessToken) return
  const response = await authAPI.delete(`/${id}`, {
    headers: { authorization: 'Bearer ' + accessToken },
  })
  return response.data
}

export { loginUser, logoutUser, getSession, getAllSessions, deleteSession }
