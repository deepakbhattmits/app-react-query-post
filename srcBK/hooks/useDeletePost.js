import { queryCache, useMutation } from 'react-query';
import axios from 'axios';

export default function useDeletePost() {
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
