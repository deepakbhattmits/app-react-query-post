import { queryCache, useMutation } from 'react-query';
import axios from 'axios';

export default function useCreatePost() {
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
      },
      // onSuccess: (data, values) => {
      //   queryCache.setQueryData('posts', data);
      //   queryCache.invalidateQueries('posts');
      // },
      onError: (error, values, rollbackValue) => {
        // console.log('ERROR : ', error)
        // queryCache.setQueryData('posts', rollbackValue)
        // alert(error.response.data.message)
      },
      onSettled: () => {
        queryCache.invalidateQueries('posts');
      },
    }
  );
  return [createPost, createPostInfo];
}
