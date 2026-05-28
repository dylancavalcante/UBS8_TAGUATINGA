import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Páginas públicas
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Projetos from './pages/Projetos';
import Horta from './pages/Horta';
import Publicacoes from './pages/Publicacoes';
import Contato from './pages/Contato';
import PublicacaoDetalhe from './pages/PublicacaoDetalhe';

// Páginas admin
import Login from './pages/admin/Login';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import CriarPost from './pages/admin/CriarPost';
import GerenciarHorta from './pages/admin/GerenciarHorta';

// Layout público
const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/sobre" element={<PublicLayout><Sobre /></PublicLayout>} />
        <Route path="/projetos" element={<PublicLayout><Projetos /></PublicLayout>} />
        <Route path="/horta" element={<PublicLayout><Horta /></PublicLayout>} />
        <Route path="/publicacoes" element={<PublicLayout><Publicacoes /></PublicLayout>} />
        <Route path="/contato" element={<PublicLayout><Contato /></PublicLayout>} />
        <Route 
          path="/publicacoes/:id" 
          element={
            <PublicLayout>
            <PublicacaoDetalhe />
          </PublicLayout>
        } 
        />
        
        {/* Rotas Admin */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="criar-post" element={<CriarPost />} />
          <Route path="editar-post/:id" element={<CriarPost />} />
          <Route path="horta" element={<GerenciarHorta />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
