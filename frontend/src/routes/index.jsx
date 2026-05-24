import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

import Home from "../pages/Home"
import PublicacaoDetalhe from "../pages/PublicacaoDetalhe"

import Login from "../pages/admin/Login"
import AdminLayout from "../pages/admin/AdminLayout"
import Dashboard from "../pages/admin/Dashboard"
import CriarPost from "../pages/admin/CriarPost"

function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/publicacoes/:id"
          element={<PublicacaoDetalhe />}
        />

        {/* ROTAS ADMIN */}

        <Route
          path="/admin/login"
          element={<Login />}
        />

        <Route
          path="/admin"
          element={<AdminLayout />}
        >

          <Route
            index
            element={<Dashboard />}
          />

          <Route
            path="criar-post"
            element={<CriarPost />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  )
}

export default AppRoutes