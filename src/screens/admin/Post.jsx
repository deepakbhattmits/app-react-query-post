import { Link, useParams, useNavigate } from 'react-router-dom'

import { queryCache, useMutation } from 'react-query'
import axios from 'axios'
import Button from '../../components/reusable/Button'

// hooks

import usePost from '../../hooks/usePost'
import useSavePost from '../../hooks/useSavePost'
import useDeletePost from '../../hooks/useDeletePost'

import PostForm from '../../components/PostForm'
import { Loader } from '../../components/styled'

const Post = () => {
  const { postId } = useParams()
  const navigate = useNavigate()

  const postQuery = usePost(postId)
  // const [savePost, savePostInfo] = useSavePost()

  const [savePost, savePostInfo] = useMutation(
    (values) =>
      axios.patch(`/api/posts/${values.id}`, values).then((res) => res.data),
    {
      onSuccess: (data, values) => {
        // console.log('DATA : ', data)
        queryCache.setQueryData(['post', values.id], data)
        queryCache.invalidateQueries(['post', values.id])
      },
      onError: (error) => {
        console.log('ERROR : ', error)
        // alert(error.response.data.message)
      },
      // onSettled: (data, error) => {
      //   queryCache.invalidateQueries(['post', data.id])
      // },
    }
  )

  const [deletePost, deletePostInfo] = useDeletePost()

  const onSubmit = async (values) => {
    await savePost(values)
    postQuery.fetch()
  }

  const onDelete = async () => {
    await deletePost(postId)
    navigate('/admin')
  }

  return (
    <>
      {postQuery.isLoading ? (
        <span>
          <Loader /> Loading...
        </span>
      ) : (
        <div>
          <h3>{postQuery?.data?.title}</h3>
          <p>
            <Link to={`/blog/${postQuery.data.id}`}>View Post</Link>
          </p>
          <PostForm
            initialValues={postQuery.data}
            onSubmit={onSubmit}
            submitText={
              savePostInfo.isLoading
                ? 'Saving...'
                : savePostInfo.isError
                ? 'Error!'
                : savePostInfo.isSuccess
                ? 'Saved!'
                : 'Save Post'
            }
          >
            <Button
              onClick={onDelete}
              className="ui button red three wide column"
            >
              {deletePostInfo.isLoading
                ? 'Deleting...'
                : deletePostInfo.isError
                ? 'Error!'
                : deletePostInfo.isSuccess
                ? 'Deleted!'
                : 'Delete Post'}
            </Button>
          </PostForm>
        </div>
      )}
    </>
  )
}
export default Post
