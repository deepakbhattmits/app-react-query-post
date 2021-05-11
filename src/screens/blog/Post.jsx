import { useRouter } from 'next/router';
import { useParams } from 'react-router-dom';

//

import usePost from '../../hooks/usePost';

const Post = () => {
  const router = useRouter();
  const { postId } = useParams();
  const postQuery = usePost(postId);

  return (
    <>
      {postQuery.isLoading ? (
        <span>Loading...</span>
      ) : postQuery.isError ? (
        postQuery.error.message
      ) : (
        <div>
          <button className="ui button" onClick={() => router.back()}>
            Back
          </button>
          <h2>{postQuery.data.title}</h2>
          <p>{postQuery.data.body}</p>
        </div>
      )}
    </>
  );
};
export default Post;
