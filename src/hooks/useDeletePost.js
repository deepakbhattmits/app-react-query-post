import { useReducer, useCallback } from 'react'
import axios from 'axios'

export default function useDeletePost() {
  const [state, setState] = useReducer((_, action) => action, {
    isIdle: true,
  })

  const mutate = useCallback(async (postId) => {
    setState({ isLoading: true })
    try {
      await axios.delete(`/api/posts/${postId}`).then((res) => res.data)
      setState({ isSuccess: true })
    } catch (error) {
      setState({ isError: true, error })
    }
  }, [])

  return [mutate, state]
}
