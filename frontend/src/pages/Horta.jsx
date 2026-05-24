import { useState } from 'react';
import { Search, Leaf, Info, X } from 'lucide-react';
import Banner from '../components/Banner';
import PlantaCard from '../components/PlantaCard';
import horta from '../assets/horta.png'
import boldo from '../assets/boldo.png'

const plantas = [
  {
    id: 1,
    nome: 'Boldo',
    nomeCientifico: 'Peumus boldus',
    imagem: boldo,
    efeitosMedicinais: ['Hepático', 'Digestivo', 'Colerético'],
    descricao: 'Planta tradicionalmente usada para problemas hepáticos e digestivos, auxiliando na digestão de gorduras.',
    modoDeUso: 'Infusão: 1 folha em 150ml de água. Não ferver, apenas escaldar.',
    contraindicacoes: 'Contraindicado para gestantes, lactantes e pessoas com problemas biliares obstrutivos.'
  }
];

const Horta = () => {
  const [busca, setBusca] = useState('');
  const [plantaSelecionada, setPlantaSelecionada] = useState(null);

  const plantasFiltradas = plantas.filter(planta =>
    planta.nome.toLowerCase().includes(busca.toLowerCase()) ||
    planta.efeitosMedicinais.some(e => e.toLowerCase().includes(busca.toLowerCase()))
  );

  return (
    <main>
      <Banner
        title="Horta: Raízes do cuidar"
        image={horta}
        subtitle="Conheça as plantas medicinais cultivadas na UBS e seus benefícios para a saúde."
      />

      <section className="py-16 bg-neutral-50">
        <div className="container-ubs">
          {/* Busca */}
          <div className="max-w-md mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Buscar por nome ou efeito medicinal..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>

          {/* Informativo */}
          <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-4 mb-8 flex items-start gap-3">
            <Info className="w-5 h-5 text-secondary-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-secondary-800">
              <p className="font-medium mb-1">Importante</p>
              <p>
                As informações aqui apresentadas são apenas educativas. Sempre consulte um 
                profissional de saúde antes de utilizar plantas medicinais para tratamento.
              </p>
            </div>
          </div>

          {/* Grid de Plantas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {plantasFiltradas.map((planta) => (
              <PlantaCard 
                key={planta.id} 
                planta={planta}
                onClick={() => setPlantaSelecionada(planta)}
              />
            ))}
          </div>

          {plantasFiltradas.length === 0 && (
            <div className="text-center py-12">
              <Leaf className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
              <p className="text-neutral-500">Nenhuma planta encontrada com este termo.</p>
            </div>
          )}
        </div>
      </section>

      {/* Modal de Detalhes */}
      {plantaSelecionada && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setPlantaSelecionada(null)}
        >
          <div 
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-48 bg-secondary-100">
              {plantaSelecionada.imagem ? (
                <img 
                  src={plantaSelecionada.imagem} 
                  alt={plantaSelecionada.nome}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Leaf className="w-16 h-16 text-secondary-300" />
                </div>
              )}
              <button
                onClick={() => setPlantaSelecionada(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-neutral-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-bold text-neutral-900">{plantaSelecionada.nome}</h2>
              <p className="text-neutral-500 italic mb-4">{plantaSelecionada.nomeCientifico}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {plantaSelecionada.efeitosMedicinais.map((efeito, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-secondary-100 text-secondary-700 text-sm rounded-full"
                  >
                    {efeito}
                  </span>
                ))}
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-2">Descrição</h3>
                  <p className="text-neutral-600 text-sm">{plantaSelecionada.descricao}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-neutral-900 mb-2">Modo de Uso</h3>
                  <p className="text-neutral-600 text-sm">{plantaSelecionada.modoDeUso}</p>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="font-semibold text-red-800 mb-2">Contraindicações</h3>
                  <p className="text-red-700 text-sm">{plantaSelecionada.contraindicacoes}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Horta;
