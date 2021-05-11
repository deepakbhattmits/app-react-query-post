// import { useReducer, useCallback } from 'react';
import { queryCache, useMutation } from 'react-query';
import axios from 'axios';

export default function useDeletePost() {
  // const [state, setState] = useReducer((_, action) => action, {
  //   isIdle: true,
  // })

  // const mutate = useCallback(async (postId) => {
  //   setState({ isLoading: true })
  //   try {
  //     await axios.delete(`/api/posts/${postId}`).then((res) => res.data)
  //     setState({ isSuccess: true })
  //   } catch (error) {
  //     setState({ isError: true, error })
  //   }
  // }, [])
  // return [mutate, state]
  const [deletePost, deletePostInfo] = useMutation(
    (postId) => axios.delete(`/api/posts/${postId}`).then((res) => res.data),
    {
      onMutate: (postId) => {
        // queryCache.setQueryData(['post', postId], values)
        // queryCache.invalidateQueries(['post', postId]);
      },
      onSuccess: (data, postId) => {
        // console.log('DATA : ', data)
        queryCache.setQueryData(['post', postId], data);
        queryCache.invalidateQueries(['post', postId]);
      },
      onError: (error, postId) => {
        // console.log('ERROR : ', error.response.data)
        // alert(error.response.data.message)
      },
      onSettled: (data, error, postId) => {},
    }
  );
  return [deletePost, deletePostInfo];
}
