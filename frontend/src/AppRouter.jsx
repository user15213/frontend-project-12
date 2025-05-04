import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Home from './pages/Home'
import Login from './pages/Login'
import NotFound from './pages/NotFound'

function RequireAuth({ children }) {
  const token = useSelector(state => state.auth.token)
  return token ? children : <Navigate to="/login" replace />
}

function RedirectIfAuth({ children }) {
  const token = useSelector(state => state.auth.token)
  return token ? <Navigate to="/" replace /> : children
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectIfAuth>
              <Login />
            </RedirectIfAuth>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
