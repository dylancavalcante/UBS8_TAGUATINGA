import { useState } from 'react';
import { 
  Apple, 
  Pill, 
  Brain, 
  Activity, 
  HeartHandshake,
  Filter 
} from 'lucide-react';
import Banner from '../components/Banner';
import ProjetoCard from '../components/ProjetoCard';
import Button from '../components/Button';
import medicas from '../assets/medicas.png'

const projetos = [
  {
    id: 1,
    nome: 'Educação Alimentar',
    area: 'Nutrição',
    descricao: 'Programa de orientação nutricional para pacientes com doenças crônicas, gestantes e idosos. Inclui consultas individuais e grupos educativos.',
    icone: Apple,
    cor: 'nutricao',
    detalhes: {
      responsavel: 'Nutricionista Camila Oliveira',
      horario: 'Segundas e Quartas, 14h às 17h',
      publico: 'Pacientes cadastrados na UBS'
    }
  },
  {
    id: 2,
    nome: 'Uso Racional de Medicamentos',
    area: 'Farmácia',
    descricao: 'Acompanhamento farmacoterapêutico e orientação sobre uso correto de medicamentos, interações e armazenamento.',
    icone: Pill,
    cor: 'farmacia',
    detalhes: {
      responsavel: 'Farmacêutico Ricardo Lima',
      horario: 'Terças e Quintas, 08h às 12h',
      publico: 'Todos os pacientes'
    }
  },
  {
    id: 3,
    nome: 'Saúde Mental Comunitária',
    area: 'Psicologia',
    descricao: 'Grupos terapêuticos, atendimento individual e oficinas de promoção de saúde mental para a comunidade.',
    icone: Brain,
    cor: 'psicologia',
    detalhes: {
      responsavel: 'Psicóloga Fernanda Souza',
      horario: 'Segunda a Sexta, 08h às 17h',
      publico: 'Pacientes encaminhados ou com demanda espontânea'
    }
  },
  {
    id: 4,
    nome: 'Movimento pela Saúde',
    area: 'Fisioterapia',
    descricao: 'Grupos de exercícios, alongamento e fortalecimento para prevenção e reabilitação de condições musculoesqueléticas.',
    icone: Activity,
    cor: 'fisioterapia',
    detalhes: {
      responsavel: 'Fisioterapeuta Paulo Mendes',
      horario: 'Terças e Quintas, 07h às 10h',
      publico: 'Idosos e pacientes com condições crônicas'
    }
  },
  {
    id: 5,
    nome: 'Rede de Apoio Social',
    area: 'Assistência Social',
    descricao: 'Orientação sobre direitos, benefícios sociais e encaminhamentos para a rede de proteção social do município.',
    icone: HeartHandshake,
    cor: 'assistenciaSocial',
    detalhes: {
      responsavel: 'Assistente Social Mariana Costa',
      horario: 'Segunda a Sexta, 08h às 17h',
      publico: 'Famílias em situação de vulnerabilidade'
    }
  },
  {
    id: 6,
    nome: 'Grupo de Gestantes',
    area: 'Nutrição',
    descricao: 'Encontros semanais com orientações sobre alimentação saudável, preparo para o parto e cuidados com o bebê.',
    icone: Apple,
    cor: 'nutricao',
    detalhes: {
      responsavel: 'Equipe multidisciplinar',
      horario: 'Sextas, 09h às 11h',
      publico: 'Gestantes cadastradas no pré-natal'
    }
  }
];

const areas = [
  { id: 'todos', label: 'Todos' },
  { id: 'Nutrição', label: 'Nutrição' },
  { id: 'Farmácia', label: 'Farmácia' },
  { id: 'Psicologia', label: 'Psicologia' },
  { id: 'Fisioterapia', label: 'Fisioterapia' },
  { id: 'Assistência Social', label: 'Assistência Social' },
];

const Projetos = () => {
  const [filtroAtivo, setFiltroAtivo] = useState('todos');

  const projetosFiltrados = filtroAtivo === 'todos' 
    ? projetos 
    : projetos.filter(p => p.area === filtroAtivo);

  return (
    <main>
      <Banner
        title="Projetos por Área Profissional"
        image={medicas}
        subtitle="Conheça os programas e ações desenvolvidos pela nossa equipe multidisciplinar."
      />

      <section className="py-16 bg-neutral-50">
        <div className="container-ubs">
          {/* Filtros */}
          <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
            <Filter className="w-5 h-5 text-neutral-500 flex-shrink-0" />
            {areas.map((area) => (
              <Button
                key={area.id}
                variant={filtroAtivo === area.id ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setFiltroAtivo(area.id)}
                className="whitespace-nowrap"
              >
                {area.label}
              </Button>
            ))}
          </div>

          {/* Grid de Projetos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projetosFiltrados.map((projeto) => (
              <ProjetoCard key={projeto.id} projeto={projeto} />
            ))}
          </div>

          {projetosFiltrados.length === 0 && (
            <div className="text-center py-12">
              <p className="text-neutral-500">Nenhum projeto encontrado para esta área.</p>
            </div>
          )}
        </div>
      </section>

      {/* Informações Adicionais */}
      <section className="py-16 bg-white">
        <div className="container-ubs">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
              Como participar dos projetos?
            </h2>
            <p className="text-neutral-600 mb-6">
              Para participar de qualquer um dos nossos projetos, basta comparecer à UBS 
              com seus documentos ou entrar em contato pelo telefone. Nossa equipe irá 
              orientá-lo sobre os horários e requisitos de cada programa.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-lg text-primary-700">
              <span className="font-medium">Telefone:</span>
              <span>(61) 3475-2912</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Projetos;
