import { 
  Users, 
  Award, 
  Heart, 
  Clock,
  Apple, 
  Brain, 
  Pill, 
  HeartHandshake, 
  Activity,
  Stethoscope,
  Smile
} from 'lucide-react';
import Banner from '../components/Banner';
import ubs8fora from '../assets/ubs8fora.png';

const Sobre = () => {
  // Adicionamos as propriedades bg e text aqui também!
  const valores = [
    { icon: Heart, titulo: 'Humanização', descricao: 'Atendimento acolhedor e respeitoso a todos os pacientes.', bg: 'bg-rose-100', text: 'text-rose-500' },
    { icon: Users, titulo: 'Equidade', descricao: 'Acesso igualitário aos serviços de saúde para toda a comunidade.', bg: 'bg-indigo-100', text: 'text-indigo-500' },
    { icon: Award, titulo: 'Qualidade', descricao: 'Compromisso com a excelência em todos os nossos serviços.', bg: 'bg-amber-100', text: 'text-amber-500' },
    { icon: Clock, titulo: 'Agilidade', descricao: 'Atendimento eficiente e resolutivo.', bg: 'bg-emerald-100', text: 'text-emerald-500' },
  ];

  const equipe = [
    { nome: 'Nutrição', icon: Apple, cargo: 'Especialidade', bg: 'bg-green-100', text: 'text-green-600' },
    { nome: 'Psicologia', icon: Brain, cargo: 'Especialidade', bg: 'bg-purple-100', text: 'text-purple-600' },
    { nome: 'Farmácia', icon: Pill, cargo: 'Especialidade', bg: 'bg-teal-100', text: 'text-teal-600' },
    { nome: 'Assistência Social', icon: HeartHandshake, cargo: 'Especialidade', bg: 'bg-rose-100', text: 'text-rose-600' },
    { nome: 'Fisioterapia', icon: Activity, cargo: 'Especialidade', bg: 'bg-amber-100', text: 'text-amber-600' },
  ];

  return (
    <main>
      <Banner
        title="Sobre a UBS 8 de Taguatinga"
        image={ubs8fora}
        subtitle="Conheça nossa história, missão e equipe dedicada à saúde da comunidade."
      />

      {/* História */}
      <section className="py-16 bg-white">
        <div className="container-ubs">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">Nossa História</h2>
            <div className="prose prose-neutral">
              <p className="text-neutral-600 mb-4">
                A UBS 8 Taguatinga tem um perfil bastante comunitário e ativo, 
                realizando uma média de 4.500 atendimentos mensais. Oferecemos os serviços 
                essenciais da Atenção Primária, como consultas médicas, acompanhamento pré-natal, 
                vacinação, entrega de medicamentos, curativos e atendimento odontológico. Ao longo dos anos, 
                expandimos nossos serviços e projetos para atender às diversas necessidades de saúde 
                da população.
              </p>
              <p className="text-neutral-600 mb-4">
                Nossa essência reside na colaboração de uma <strong>equipe 
                multiprofissional</strong> dedicada ao cuidado integral e humanizado. 
                Contamos com médicos, enfermeiros, nutricionistas, psicólogos, 
                fisioterapeutas, farmacêuticos e assistentes sociais trabalhando
                em sinergia para acolher as diversas necessidades de saúde da 
                nossa comunidade.
              </p>
              <p className="text-neutral-600">
                O grande diferencial do nosso trabalho é o engajamento ativo na
                <strong> promoção da saúde preventiva</strong>. Nossos profissionais 
                conduzem regularmente grupos de acompanhamento e projetos de bem-estar
                para a população da UBS 8 de Taguatinga, como aulas de tai chi chuan,
                capoterapia, grupos de caminhadas, grupo da Melhor-idade e o HiperDia
                consolidando um espaço de cuidado, convivência e qualidade de vida.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Missão, Visão e Valores */}
      <section className="py-16 bg-neutral-50">
        <div className="container-ubs">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="card">
              <h3 className="text-xl font-bold text-secondary-30 mb-3">Missão</h3>
              <p className="text-neutral-600">
                Garantir ao cidadão acesso universal à saúde mediante atenção integral e humanizada.
              </p>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold text-secondary-30 mb-3">Visão</h3>
              <p className="text-neutral-600">
                Ser um sistema de saúde que a população conheça, preze e confie, 
                sendo excelência e referência na atenção primária à saúde.
              </p>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold text-secondary-30 mb-3">Valores</h3>
              <p className="text-neutral-600">
                Ética, respeito, transparência, responsabilidade social e compromisso 
                com a melhoria contínua dos serviços de saúde.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-neutral-900 mb-8 text-center">Nossos Princípios</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {valores.map((valor, index) => (
              <div key={index} className="card text-center">
                {/* Aqui aplicamos as cores dinâmicas nos princípios! */}
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 ${valor.bg}`}>
                  <valor.icon className={`w-7 h-7 ${valor.text}`} />
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2">{valor.titulo}</h3>
                <p className="text-sm text-neutral-600">{valor.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipe */}
      <section className="py-16 bg-white">
        <div className="container-ubs">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 mb-3">Nossa Equipe</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Especialidades dos profissionais da equipe multiprofissional do Programa de Residência em Atenção Básica da instituição FIOCRUZ.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {equipe.map((membro, index) => (
              <div key={index} className="card text-center hover:shadow-md transition-shadow">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 ${membro.bg}`}>
                  <membro.icon className={`w-10 h-10 ${membro.text}`} />
                </div>
                <h3 className="font-semibold text-neutral-900">{membro.nome}</h3>
                <p className="text-sm text-neutral-600">{membro.cargo}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Sobre;