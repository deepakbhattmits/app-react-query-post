import { useReducer, useCallback, useEffect } from 'react'
import axios from 'axios'

export const fetchPost = (postId) =>
  axios.get(`/api/posts/${postId}`).then((res) => res.data)

export default function usePost(postId) {
  const [state, setState] = useReducer((_, action) => action, {
    isLoading: true,
  })

  const fetch = useCallback(async () => {
    setState({ isLoading: true })
    try {
      const data = await fetchPost(postId)
      setState({ isSuccess: true, data })
    } catch (error) {
      setState({ isError: true, error })
    }
  }, [postId])

  useEffect(() => {
    fetch()
  }, [fetch])

  return {
    ...state,
    fetch,
  }
}
