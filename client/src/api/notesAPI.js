import axios from 'axios'

const notesAPI = axios.create({
  baseURL: '/api/notes',
})

const createNote = async (accessToken, data) => {
  if (!accessToken) return
  const response = await notesAPI.post('/', JSON.stringify(data), {
    headers: {
      authorization: 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
    },
  })
  return response.data
}

const getAllNotes = async (accessToken) => {
  if (!accessToken) return
  const response = await notesAPI.get('/', {
    headers: { authorization: 'Bearer ' + accessToken },
  })
  return response.data
}

//TODO: Implement / needed?
const getNote = async (accessToken, id) => {
  if (!accessToken) return
  const response = await notesAPI.get(`/${id}`, {
    headers: { authorization: 'Bearer ' + accessToken },
  })
  return response.data
}

const updateNote = async (accessToken, id, data) => {
  if (!accessToken) return
  const response = await notesAPI.patch(`/${id}`, data, {
    headers: { authorization: 'Bearer ' + accessToken },
  })
  return response.data
}

const archiveNote = async (accessToken, id) => {
  if (!accessToken) return
  const response = await notesAPI.patch(`/archive/${id}`, null, {
    headers: { authorization: 'Bearer ' + accessToken },
  })
  return response.data
}

const deleteNote = async (accessToken, id) => {
  if (!accessToken) return
  const response = await notesAPI.delete(`/${id}`, {
    headers: { authorization: 'Bearer ' + accessToken },
  })
  return response.data
}

export { createNote, getAllNotes, getNote, updateNote, archiveNote, deleteNote }
