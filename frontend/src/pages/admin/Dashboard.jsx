import { FileText, Eye, Leaf, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Button from '../../components/Button';
import api from '../../services/api';

const estatisticas = [
  { titulo: 'Publicações', valor: 0, icone: FileText, cor: 'bg-primary-100 text-primary-500' },
  { titulo: 'Visualizações', valor: 0, icone: Eye, cor: 'bg-secondary-100 text-secondary-500' },
  { titulo: 'Plantas Cadastradas', valor: 1, icone: Leaf, cor: 'bg-orange-100 text-orange-500' },
  { titulo: 'Visitantes/Mês', valor: 0, icone: Users, cor: 'bg-purple-100 text-purple-500' },
];

const Dashboard = () => {

  const [publicacoesRecentes, setPublicacoesRecentes] = useState([]);

  useEffect(() => {

    async function carregarPublicacoes() {

      try {

        const response = await api.get("/publicacoes");

        setPublicacoesRecentes(response.data);

      } catch (error) {

        console.error("Erro ao carregar publicações", error);
      }
    }

    carregarPublicacoes();

  }, []);

  return (
    <div>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Dashboard</h1>
          <p className="text-neutral-600">Visão geral do sistema</p>
        </div>

        <Link to="/admin/criar-post">
          <Button>Nova Publicação</Button>
        </Link>
      </div>
      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {estatisticas.map((stat, index) => (
          <div key={index} className="card">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.cor}`}>
                <stat.icone className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-neutral-900">{stat.valor}</p>
                <p className="text-sm text-neutral-600">{stat.titulo}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Publicações Recentes */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-neutral-900">Publicações Recentes</h2>
          <Link to="/admin/posts" className="text-sm text-primary-500 hover:text-primary-600">
            Ver todas
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-100">
                <th className="text-left py-3 text-sm font-medium text-neutral-600">Título</th>
                <th className="text-left py-3 text-sm font-medium text-neutral-600">Data</th>
                <th className="text-left py-3 text-sm font-medium text-neutral-600">Status</th>
                <th className="text-right py-3 text-sm font-medium text-neutral-600">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {publicacoesRecentes.map((pub) => (
                <tr key={pub.publicacao_id}>
                  <td className="py-3 text-neutral-900">{pub.titulo}</td>
                  <td className="py-3 text-neutral-600">
                    {new Date(pub.data).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="py-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      pub.status === 'publicado' 
                        ? 'bg-secondary-100 text-secondary-700' 
                        : 'bg-neutral-100 text-neutral-600'
                    }`}>
                      {pub.status === 'publicado' ? 'Publicado' : 'Rascunho'}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <Link 
                      to={`/admin/editar-post/${pub.id}`}
                      className="text-primary-500 hover:text-primary-600 text-sm"
                    >
                      Editar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
