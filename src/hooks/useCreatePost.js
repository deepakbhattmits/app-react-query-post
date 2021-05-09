// import { useReducer, useCallback } from 'react'
import { queryCache, useMutation } from 'react-query'
import axios from 'axios'

export default function useCreatePost() {
  // const [state, setState] = useReducer((_, action) => action, {
  //   isIdle: true,
  // })

  // const mutate = useCallback(async (values) => {
  //   setState({ isLoading: true })
  //   try {
  //     const data = axios.post('/api/posts', values).then((res) => res.data)
  //     setState({ isSuccess: true, data })
  //   } catch (error) {
  //     setState({ isError: true, error })
  //   }
  // }, [])
  // return [mutate, state]
  const [createPost, createPostInfo] = useMutation(
    (values) => axios.post('/api/posts', values),
    {
      onMutate: (values) => {
        // this will make sure no outgoing request for this posts query are inflight while we are performing optimistic mutation.
        // queryCache.cancelQueries('posts')
        // const oldPosts = queryCache.getQueryData('posts')
        // queryCache.setQueryData('posts', (oldPosts) => {
        //   return [...oldPosts, { ...values, id: Date.now() }]
        // })
        // return queryCache.setQueryData('posts', oldPosts)
      }, // onSuccess: () => {
      //   queryCache.invalidateQueries('posts')
      // },
      onError: (error, values, rollbackValue) => {
        // console.log('ERROR : ', error)
        // queryCache.setQueryData('posts', rollbackValue)
        // alert(error.response.data.message)
      },
      onSettled: () => {
        queryCache.invalidateQueries('posts')
      },
    }
  )
  return [createPost, createPostInfo]
}
