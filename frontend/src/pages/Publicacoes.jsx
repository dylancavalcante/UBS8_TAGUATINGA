import { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';

import Banner from '../components/Banner';
import PostCard from '../components/PostCard';
import Button from '../components/Button';

import publicacoesfoto from '../assets/publicacoesfoto.png';

import api from '../services/api';

const categorias = ['Todos', 'Campanha', 'Eventos', 'Saúde', 'Comunicados'];

const Publicacoes = () => {

  const [publicacoes, setPublicacoes] = useState([]);
  const [busca, setBusca] = useState('');
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos');

  useEffect(() => {

    async function carregarPublicacoes() {

      try {

        const response = await api.get('/publicacoes');

        setPublicacoes(response.data);

      } catch (error) {

        console.error('Erro ao buscar publicações:', error);

      }

    }

    carregarPublicacoes();

  }, []);

  const publicacoesFiltradas = publicacoes.filter(pub => {

    const matchBusca =
      pub.titulo?.toLowerCase().includes(busca.toLowerCase()) ||
      pub.resumo?.toLowerCase().includes(busca.toLowerCase());

    const matchCategoria =
      categoriaAtiva === 'Todos' ||
      pub.categoria === categoriaAtiva;

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

          {/* filtros */}
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

          {/* publicações */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {publicacoesFiltradas.map((post) => (

              <PostCard
                key={post.publicacao_id}
                post={{
                  ...post,
                  id: post.publicacao_id,
                  imagem: post.imagem_url
                }}
              />

            ))}

          </div>

          {publicacoesFiltradas.length === 0 && (

            <div className="text-center py-12">

              <p className="text-neutral-500">
                Nenhuma publicação encontrada.
              </p>

            </div>

          )}

        </div>

      </section>

    </main>
  );
};

export default Publicacoes;