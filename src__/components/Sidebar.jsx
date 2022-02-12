import { Link } from 'react-router-dom';

import { SidebarStyles, PostListStyles } from './styled';

const Sidebar = () => (
  <SidebarStyles>
    <div className="ui list navigation">
      {[' ', 'Blog', 'Admin'].map((el, i) => (
        <Link className="item" to={`/${el}`} key={i}>
          <PostListStyles>{el.includes(' ') ? 'Home' : el}</PostListStyles>
        </Link>
      ))}
    </div>
  </SidebarStyles>
);

export default Sidebar;
