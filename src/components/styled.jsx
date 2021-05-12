import styled, { keyframes } from 'styled-components';
import { ImSpinner2 } from 'react-icons/im';

export const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;

export const SidebarStyles = styled.div`
  width: 175px;
  border-right: 1px solid var(--color-primary);
  padding: 1rem;
`;

export const Main = styled.div`
  flex: 1;
  padding: 1rem;
`;

export const PostStyles = styled.div`
  display: inline-block;
  border: solid 1px var(--color-primary);
  border-radius: 5px;
  padding: 1rem;
  color: inherit;

  :hover {
    box-shadow: 0 1px 3px 0 #d4d4d5, 0 0 0 1px #d4d4d5;
    text-decoration: none;
    h3 {
      text-decoration: underline;
    }
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;
export const PostListStyles = styled.div`
  box-shadow: 0 0 0 2px #54c8ff inset;
  border-radius: 3px;
  font-weight: bolder;
  padding: 10px;
  margin: 5px 0;
  color: #54c8ff;
  transition: 0.5s;
  text-align: center;
  :hover {
    background-color: #3ac0ff;
    color: #fff;
  }
`;
export const Loader = (props) => (
  <ImSpinner2
    {...props}
    css={`
      vertical-align: middle;
      animation: ${rotate} 1s linear infinite;
    `}
  />
);
