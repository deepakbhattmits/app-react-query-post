import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ReactQueryDevtools } from 'react-query-devtools'
//

import { Wrapper, Main } from './components/styled'
import Sidebar from './components/Sidebar'

import Admin from './screens/admin'
import AdminPost from './screens/admin/Post'
import Blog from './screens/blog'
import BlogPost from './screens/blog/Post'
import DarkModeToggle from './components/DarkModeToggle'

const SafeHydrate = ({ children }) => {
  return (
    <div suppressHydrationWarning>
      {typeof document === 'undefined' ? null : children}
    </div>
  )
}
const App = () => {
  return (
    <SafeHydrate>
      <BrowserRouter>
        <Wrapper>
          <Sidebar />
          <DarkModeToggle />
          <Main>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <h1>Welcome!</h1>
                  </>
                }
              />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/:postId" element={<AdminPost />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:postId" element={<BlogPost />} />
            </Routes>
          </Main>
          <ReactQueryDevtools initialIsOpen />
        </Wrapper>
      </BrowserRouter>
    </SafeHydrate>
  )
}
export default App
