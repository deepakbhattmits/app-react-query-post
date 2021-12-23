import { queryCache, useMutation } from 'react-query';
import axios from 'axios';

export default function useSavePost() {
  const [savePost, savePostInfo] = useMutation(
    (values) =>
      axios.patch(`/api/posts/${values.id}`, values).then((res) => res.data),
    {
      onMutate: (values) => {
        queryCache.setQueryData(['post', values.id], values);
      },
      onSuccess: (data, values) => {
        // console.log('DATA : ', data)
        queryCache.setQueryData(['post', values.id], data);
        queryCache.invalidateQueries(['post', values.id]);
      },
      onError: (error, values) => {
        // console.log('ERROR : ', error.response.data)
        // alert(error.response.data.message)
      },
      onSettled: (data, error, values) => {},
    }
  );
  return [savePost, savePostInfo];
}
