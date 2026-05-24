import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User } from 'lucide-react';
import Button from '../../components/Button';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ usuario: '', senha: '' });
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    // Simulação de login (implementar autenticação real)
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (formData.usuario === 'admin' && formData.senha === 'admin123') {
      localStorage.setItem('admin_token', 'token_exemplo');
      navigate('/admin');
    } else {
      setErro('Usuário ou senha incorretos');
    }
    
    setCarregando(false);
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
      {/* CAIXA PRINCIPAL: Tudo fica aqui dentro! */}
      <div className="w-full max-w-md">
        
        {/* CABEÇALHO */}
        <div className="text-center mb-8">
          <img 
            src="/logo.png" 
            alt="Logo da UBS 8 de Taguatinga" 
            className="w-16 h-16 object-contain mx-auto mb-4" 
          />
          <h1 className="text-2xl font-bold text-neutral-900">Painel Administrativo</h1>
          <p className="text-neutral-600">UBS 8 de Taguatinga</p>
        </div>

        {/* CARD DO FORMULÁRIO */}
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-4">
            {erro && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {erro}
              </div>
            )}

            <div>
              <label htmlFor="usuario" className="label">Usuário</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  id="usuario"
                  value={formData.usuario}
                  onChange={(e) => setFormData({ ...formData, usuario: e.target.value })}
                  required
                  className="input-field pl-10"
                  placeholder="Digite seu usuário"
                />
              </div>
            </div>

            <div>
              <label htmlFor="senha" className="label">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="password"
                  id="senha"
                  value={formData.senha}
                  onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                  required
                  className="input-field pl-10"
                  placeholder="Digite sua senha"
                />
              </div>
            </div>

            <Button type="submit" disabled={carregando} className="w-full">
              {carregando ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
        </div>

        {/* RODAPÉ */}
        <p className="text-center text-sm text-neutral-500 mt-4">
          Acesso restrito a administradores
        </p>

      </div>
    </div>
  );
};

export default Login;