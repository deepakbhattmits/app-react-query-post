import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import PostForm from '../../components/PostForm';
import { Loader } from '../../components/styled';
// Hooks
import usePosts from '../../hooks/usePosts';
import useCreatePost from '../../hooks/useCreatePost';

const Posts = () => {
  const postsQuery = usePosts();
  const [createPost, createPostInfo] = useCreatePost();
  const onSubmit = useCallback(async (values) => {
    await createPost(values);
    // after add success load updated data
    postsQuery.fetch();
  }, []);

  return (
    <section>
      <div>
        <div className="posts-list">
          {postsQuery.isLoading ? (
            <span>
              <Loader /> Loading
            </span>
          ) : (
            <>
              <h3>Posts</h3>
              <div className="ui list ordered">
                {postsQuery.data.map((post) => (
                  <div className="item" key={post.id}>
                    <div className="">
                      <Link to={`./${post.id}`}>{post.title}</Link>
                    </div>
                  </div>
                ))}
              </div>
              <br />
            </>
          )}
        </div>
      </div>
      <hr />
      <div>
        <h3>Create New Post</h3>
        <div>
          <PostForm
            onSubmit={onSubmit}
            clearOnSubmit
            submitText={
              createPostInfo.isLoading
                ? 'Saving...'
                : createPostInfo.isError
                ? 'Error!'
                : createPostInfo.isSuccess
                ? 'Saved!'
                : 'Create Post'
            }
          />
          {/* {createPostInfo.isError ? (
            <pre>{createPostInfo.error.response?.data}</pre>
          ) : null} */}
        </div>
      </div>
      <style jsx>{`
        .posts-list {
          height: 200px;
          overflow: hidden;
          overflow-y: auto;
        }
      `}</style>
    </section>
  );
};
export default Posts;
