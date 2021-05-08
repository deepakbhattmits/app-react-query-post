import { Loader } from './styled'

const GlobalLoader = () => {
  return (
    <Loader
      css={`
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        font-size: 1.5rem;
        transition: 0.3s ease;
      `}
      style={{
        opacity: 1,
      }}
    />
  )
}
export default GlobalLoader
