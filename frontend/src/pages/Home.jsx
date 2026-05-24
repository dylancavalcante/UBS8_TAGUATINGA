import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  Leaf, 
  Clock, 
  Phone, 
  MapPin,
  ArrowRight,
  Stethoscope,
  Heart
} from 'lucide-react';
import Banner from '../components/Banner';
import PostCard from '../components/PostCard';
import Button from '../components/Button';
import ubs8_banner from '../assets/ubs8_banner.png';
import { useEffect, useState } from 'react';
import api from '../services/api';


// Adicionamos as propriedades bg e text para os serviços!
const servicos = [
  { icon: Stethoscope, titulo: 'Consultas Médicas', descricao: 'Atendimento clínico geral e especializado', bg: 'bg-blue-100', text: 'text-blue-600' },
  { icon: Heart, titulo: 'Saúde da Família', descricao: 'Acompanhamento integral da saúde familiar', bg: 'bg-rose-100', text: 'text-rose-600' },
  { icon: Users, titulo: 'Grupos de Apoio', descricao: 'Atividades em grupo para promoção de saúde', bg: 'bg-purple-100', text: 'text-purple-600' },
  { icon: Leaf, titulo: 'Horta Medicinal', descricao: 'Plantas medicinais cultivadas na UBS', bg: 'bg-green-100', text: 'text-green-600' },
];

const Home = () => {
  const [publicacoesRecentes, setPublicacoesRecentes] = useState([]);
  useEffect(() => {

  async function carregarPublicacoes() {

    try {

      const response = await api.get("/publicacoes")

      setPublicacoesRecentes(response.data)

    } catch (error) {

      console.error("Erro ao buscar publicações:", error)
    }
  }

  carregarPublicacoes()

}, [])
  return (
    <main>
      {/* Banner Principal */}
      <Banner
        title="Cuidando da Saúde da Nossa Comunidade"
        subtitle="A UBS 8 Taguatinga oferece atendimento humanizado e de qualidade para você e sua família."
        image={ubs8_banner}
        primaryAction={{ to: '/horarios', label: 'Ver Horários' }}
        secondaryAction={{ to: '/sobre', label: 'Conheça a UBS' }}
      />

      {/* Informações Rápidas */}
      <section className="bg-white py-8 shadow-sm">
        <div className="container-ubs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary-500" />
              </div>
              <div>
                <p className="font-medium text-neutral-900">Horário de Funcionamento</p>
                <p className="text-sm text-neutral-600">Seg-Sex: 07h-19h | Sáb: 07h-12h </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
                <Phone className="w-6 h-6 text-secondary-500" />
              </div>
              <div>
                <p className="font-medium text-neutral-900">Telefone</p>
                <p className="text-sm text-neutral-600">(61) 3475-2912</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <p className="font-medium text-neutral-900">Endereço</p>
                <p className="text-sm text-neutral-600">Taguatinga Norte QNL 24 - Taguatinga, Brasília - DF, 72161-409</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nossos Serviços */}
      <section className="py-16 bg-neutral-50">
        <div className="container-ubs">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-3">
              Atividades da equipe Multiprofissional
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Oferecemos uma variedade de atividades de saúde para atender às necessidades da comunidade.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicos.map((servico, index) => (
              <div key={index} className="card text-center hover:shadow-md transition-shadow">
                {/* Aplicamos as cores dinâmicas aqui! */}
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 ${servico.bg}`}>
                  <servico.icon className={`w-7 h-7 ${servico.text}`} />
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2">{servico.titulo}</h3>
                <p className="text-sm text-neutral-600">{servico.descricao}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/projetos">
              <Button variant="outline">
                Ver Todos os Projetos
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Publicações Recentes */}
      <section className="py-16 bg-white">
        <div className="container-ubs">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">
                Publicações e Novidades
              </h2>
              <p className="text-neutral-600">
                Fique por dentro das últimas notícias e eventos da UBS.
              </p>
            </div>
            <Link to="/publicacoes" className="hidden sm:block">
              <Button variant="ghost">
                Ver todas
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publicacoesRecentes.map((post) => (
              <PostCard
                key={post.publicacao_id}
                post={{
                ...post,
                imagem: post.imagem_url,
                id: post.publicacao_id
                }}
              />
            ))}
          </div>

          <div className="text-center mt-8 sm:hidden">
            <Link to="/publicacoes">
              <Button variant="outline">
                Ver Todas as Publicações
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Horta */}
      <section className="py-16 bg-secondary-50">
        <div className="container-ubs">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary-100 rounded-full mb-4">
                <Leaf className="w-4 h-4 text-secondary-600" />
                <span className="text-sm font-medium text-secondary-700">Horta Medicinal</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
                Conheça Nossa Horta de Plantas Medicinais
              </h2>
              <p className="text-neutral-600 mb-6">
                Cultivamos diversas plantas medicinais que auxiliam no tratamento complementar 
                de diversas condições de saúde. Venha conhecer e aprender sobre os benefícios naturais.
              </p>
              <Link to="/horta">
                <Button variant="secondary" size="lg">
                  Explorar Plantas Medicinais
                </Button>
              </Link>
            </div>
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-3xl font-bold text-secondary-500">25+</p>
                  <p className="text-sm text-neutral-600">Espécies de plantas</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-3xl font-bold text-secondary-500">100%</p>
                  <p className="text-sm text-neutral-600">Cultivo orgânico</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;