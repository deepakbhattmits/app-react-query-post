import { Link } from 'react-router-dom'
//
import usePosts from '../../hooks/usePosts'
import { PostStyles } from '../../components/styled'

const Home = () => {
  const postsQuery = usePosts()

  return (
    <>
      <h1>Blog</h1>

      <div
        css={`
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 1rem;
        `}
      >
        {postsQuery.isLoading ? (
          <span>Loading...</span>
        ) : postsQuery.isError ? (
          postsQuery.error.message
        ) : (
          postsQuery.data.map((post) => (
            <PostStyles as={Link} to={`./${post.id}`} key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </PostStyles>
          ))
        )}
      </div>
    </>
  )
}
export default Home
