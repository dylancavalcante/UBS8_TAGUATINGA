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
import banner_teste from '../assets/banner_teste.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';

//comentando a api para resolver problema de requisições falhas 
// import { useEffect, useState } from 'react';
// import api from '../services/api';

const servicos = [
  { icon: Stethoscope, titulo: 'Consultas Médicas', descricao: 'Atendimento clínico geral e especializado', bg: 'bg-blue-100', text: 'text-blue-600', bgGradient: 'bg-gradient-to-b from-orange-400 to-rose-500' },
  { icon: Heart, titulo: 'Saúde da Família', descricao: 'Acompanhamento integral da saúde familiar', bg: 'bg-rose-100', text: 'text-rose-600', bgGradient: 'bg-gradient-to-b from-emerald-400 to-green-600' },
  { icon: Users, titulo: 'Grupos de Apoio', descricao: 'Atividades em grupo para promoção de saúde', bg: 'bg-purple-100', text: 'text-purple-600', bgGradient: 'bg-gradient-to-b from-amber-400 to-orange-500' },
  { icon: Leaf, titulo: 'Horta Medicinal', descricao: 'Plantas medicinais cultivadas na UBS', bg: 'bg-green-100', text: 'text-green-600', bgGradient: 'bg-gradient-to-b from-teal-400 to-emerald-600' },
];

const Home = () => {

    //dados fakes, remover dps
  const publicacoesRecentes = [
  {
    publicacao_id: 1,
    titulo: 'Campanha de Vacinação',
    resumo: 'Participe da campanha de vacinação da UBS.',
    imagem_url: 'https://placehold.co/600x400',
    data_publicacao: '2026-05-27'
  },
  {
    publicacao_id: 2,
    titulo: 'Grupo de Apoio',
    resumo: 'Novo grupo de apoio disponível para a comunidade.',
    imagem_url: 'https://placehold.co/600x400',
    data_publicacao: '2026-05-26'
  },
  {
    publicacao_id: 3,
    titulo: 'Horta Medicinal',
    resumo: 'Conheça as novas plantas medicinais da UBS.',
    imagem_url: 'https://placehold.co/600x400',
    data_publicacao: '2026-05-25'
  }
];
  /* const [publicacoesRecentes, setPublicacoesRecentes] = useState([]);
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

}, []) */
  return (
    <main>
      {/* Banner Principal - MANTIDO INTACTO */}
      <Banner
        title="Cuidando da Saúde da Nossa Comunidade"
        subtitle="A UBS 8 Taguatinga oferece atendimento humanizado e de qualidade para você e sua família."
        image={banner_teste}
        primaryAction={{ to: '/horarios', label: 'Ver Horários' }}
        secondaryAction={{ to: '/sobre', label: 'Conheça a UBS' }}
      />

      {/* BARRA DE INFORMAÇÕES FLUTUANTE (Sobrepondo o banner) */}
      <section className="relative z-20 -mt-12 mb-16 container-ubs px-4">
        {/* Alterado rounded-full para rounded-3xl para corrigir o bug de alinhamento e as pontas cortadas */}
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 border border-neutral-100 max-w-5xl mx-auto">
          
          <div className="flex items-center gap-4 w-full md:w-auto justify-center md:justify-start">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-center md:text-left flex flex-col justify-center">
              <p className="font-bold text-blue-600 text-base">Horário</p>
              <p className="text-sm text-neutral-600">Seg-Sex: 07h-19h | Sáb: 07h-12h</p>
            </div>
          </div>
          
          <div className="hidden md:block w-px h-12 bg-neutral-200"></div>
          
          <div className="flex items-center gap-4 w-full md:w-auto justify-center md:justify-start">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0">
              <Phone className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="text-center md:text-left flex flex-col justify-center">
              <p className="font-bold text-emerald-600 text-base">Telefone</p>
              <p className="text-sm text-neutral-600">(61) 3475-2912</p>
            </div>
          </div>

          <div className="hidden md:block w-px h-12 bg-neutral-200"></div>
          
          <div className="flex items-center gap-4 w-full md:w-auto justify-center md:justify-start">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-center md:text-left flex flex-col justify-center">
              <p className="font-bold text-orange-600 text-base">Endereço</p>
              <p className="text-sm text-neutral-600">QNL 24 - Taguatinga Norte</p>
            </div>
          </div>

        </div>
      </section>

      {/* Nossas Frentes de Cuidado - MANTIDO EXATAMENTE COMO VOCÊ PEDIU */}
      <section className="py-8 bg-neutral-50">
        <div className="container-ubs">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-3">
              Nossas Frentes de Cuidado
            </h2>
          </div>

          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            className="pb-16 px-2"
          >
            {servicos.map((servico, index) => (
              <SwiperSlide key={index} className="h-auto">
                {/* Cards Coloridos do Design 
                  Usando os gradientes definidos no array para dar o visual de identidade forte
                */}
                <div className={`${servico.bgGradient} text-white h-[260px] rounded-3xl p-6 flex flex-col items-center text-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-grab active:cursor-grabbing`}>
                  
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 mt-2 shadow-inner">
                    <servico.icon className="w-10 h-10 text-white" />
                  </div>
                  
                  <h3 className="font-bold text-lg mb-2 leading-tight">{servico.titulo}</h3>
                  <p className="text-white/90 text-sm leading-relaxed px-2">{servico.descricao}</p>
                
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
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