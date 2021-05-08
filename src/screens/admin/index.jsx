import { Link } from 'react-router-dom'
import { queryCache, useMutation } from 'react-query'
import axios from 'axios'

import PostForm from '../../components/PostForm'
import { Loader } from '../../components/styled'
import usePosts from '../../hooks/usePosts'
// import useCreatePost from '../../hooks/useCreatePost'

const Posts = () => {
  const postsQuery = usePosts()
  // const [createPost, createPostInfo] = useCreatePost()
  const [createPost, createPostInfo] = useMutation(
    (values) => axios.post('/api/posts', values),
    {
      onMutate: (values) => {
        queryCache.setQueryData('posts', (oldPosts) => {
          return [...oldPosts, { ...values, id: Date.now() }]
        })
      }, // onSuccess: () => {
      //   queryCache.invalidateQueries('posts')
      // },
      onError: (error) => {
        console.log('ERROR : ', error)
        // alert(error.response.data.message)
      },
      onSettled: () => {
        queryCache.invalidateQueries('posts')
      },
    }
  )

  const onSubmit = async (values) => {
    await createPost(values)
    // after add success load updated data
    postsQuery.fetch()
  }

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
              <ul>
                {postsQuery.data.map((post) => (
                  <li key={post.id}>
                    <Link to={`./${post.id}`}>{post.title}</Link>
                  </li>
                ))}
              </ul>
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
            <pre>{createPostInfo.error.response.data?.message}</pre>
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
  )
}
export default Posts
