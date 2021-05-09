// import { useReducer, useCallback } from 'react'
import { queryCache, useMutation } from 'react-query'
import axios from 'axios'

export default function useSavePost() {
  // const [state, setState] = useReducer((_, action) => action, {
  //   isIdle: true,
  // })

  // const mutate = useCallback(async (values) => {
  //   setState({ isLoading: true })
  //   try {
  //     const data = await axios
  //       .patch(`/api/posts/${values.id}`, values)
  //       .then((res) => res.data)
  //     setState({ isSuccess: true, data })
  //   } catch (error) {
  //     setState({ isError: true, error })
  //   }
  // }, [])

  // return [mutate, state]
  const [savePost, savePostInfo] = useMutation(
    (values) =>
      axios.patch(`/api/posts/${values.id}`, values).then((res) => res.data),
    {
      onMutate: (values) => {
        queryCache.setQueryData(['post', values.id], values)
      },
      onSuccess: (data, values) => {
        // console.log('DATA : ', data)
        queryCache.setQueryData(['post', values.id], data)
        queryCache.invalidateQueries(['post', values.id])
      },
      onError: (error, values) => {
        // console.log('ERROR : ', error.response.data)
        // alert(error.response.data.message)
      },
      onSettled: (data, error, values) => {},
    }
  )
  return [savePost, savePostInfo]
}
