import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import Banner from '../components/Banner';
import PostCard from '../components/PostCard';
import Button from '../components/Button';
import publicacoesfoto from '../assets/publicacoesfoto.png';


const publicacoes = [
  {
    id: 1,
    titulo: 'Bem vindo ao site!',
    resumo: 'Desenvolvido por Dylan Cavalcante, estudante de Engenharia de Software da UnB, este projeto surgiu com o objetivo de facilitar a comunicação entre a UBS e a comunidade, inspirado no trabalho de Sandra Portela, farmacêutica da equipe multiprofissional.',
    imagem: '/public/publicacao_dylan.png',
    data: '2026-05-23',
    categoria: 'Comunicados'
  }
];

const categorias = ['Todos', 'Campanha', 'Eventos', 'Saúde', 'Comunicados'];

const Publicacoes = () => {
  const [busca, setBusca] = useState('');
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos');

  const publicacoesFiltradas = publicacoes.filter(pub => {
    const matchBusca = pub.titulo.toLowerCase().includes(busca.toLowerCase()) ||
                       pub.resumo.toLowerCase().includes(busca.toLowerCase());
    const matchCategoria = categoriaAtiva === 'Todos' || pub.categoria === categoriaAtiva;
    return matchBusca && matchCategoria;
  });

  return (
    <main>
      <Banner
        title="Publicações e Novidades"
        image={publicacoesfoto}
        subtitle="Acompanhe as últimas notícias, eventos e campanhas da UBS."
      />

      <section className="py-16 bg-neutral-50">
        <div className="container-ubs">
          {/* Filtros */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Buscar publicação..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
              <Filter className="w-5 h-5 text-neutral-500 flex-shrink-0" />
              {categorias.map((cat) => (
                <Button
                  key={cat}
                  variant={categoriaAtiva === cat ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setCategoriaAtiva(cat)}
                  className="whitespace-nowrap"
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          {/* Grid de Publicações */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publicacoesFiltradas.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {publicacoesFiltradas.length === 0 && (
            <div className="text-center py-12">
              <p className="text-neutral-500">Nenhuma publicação encontrada.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Publicacoes;
