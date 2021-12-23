import { useRouter } from 'next/router';
import { useParams } from 'react-router-dom';
// Hooks
import usePost from '../../hooks/usePost';
import Button from '../../components/reusable/Button';

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
          <Button
            type="button"
            className="inverted blue"
            onClick={() => router.back()}
          >
            <i className="hand point left outline icon"></i>
            Back
          </Button>
          <h2>{postQuery.data.title}</h2>
          <p>{postQuery.data.body}</p>
        </div>
      )}
    </>
  );
};
export default Post;
