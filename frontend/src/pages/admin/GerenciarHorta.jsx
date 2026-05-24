import { useState } from 'react';
import { Plus, Edit, Trash2, Search, Leaf } from 'lucide-react';
import Button from '../../components/Button';

const plantasIniciais = [
  { id: 1, nome: 'Camomila', nomeCientifico: 'Matricaria chamomilla', efeitos: ['Calmante', 'Digestivo'] },
  { id: 2, nome: 'Hortelã', nomeCientifico: 'Mentha spicata', efeitos: ['Digestivo', 'Refrescante'] },
  { id: 3, nome: 'Boldo', nomeCientifico: 'Peumus boldus', efeitos: ['Hepático', 'Digestivo'] },
];

const GerenciarHorta = () => {
  const [plantas, setPlantas] = useState(plantasIniciais);
  const [busca, setBusca] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [plantaEditando, setPlantaEditando] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    nomeCientifico: '',
    descricao: '',
    modoDeUso: '',
    contraindicacoes: '',
    efeitos: ''
  });

  const plantasFiltradas = plantas.filter(p => 
    p.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const abrirModal = (planta = null) => {
    if (planta) {
      setPlantaEditando(planta);
      setFormData({
        nome: planta.nome,
        nomeCientifico: planta.nomeCientifico,
        descricao: planta.descricao || '',
        modoDeUso: planta.modoDeUso || '',
        contraindicacoes: planta.contraindicacoes || '',
        efeitos: planta.efeitos?.join(', ') || ''
      });
    } else {
      setPlantaEditando(null);
      setFormData({
        nome: '',
        nomeCientifico: '',
        descricao: '',
        modoDeUso: '',
        contraindicacoes: '',
        efeitos: ''
      });
    }
    setModalAberto(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const novaPlanta = {
      horta_id: plantaEditando?.id || Date.now(),
      nome: formData.nome,
      nomeCientifico: formData.nomeCientifico,
      descricao: formData.descricao,
      modoDeUso: formData.modoDeUso,
      contraindicacoes: formData.contraindicacoes,
      efeitos: formData.efeitos.split(',').map(e => e.trim()).filter(Boolean)
    };

    if (plantaEditando) {
      setPlantas(plantas.map(p => p.id === plantaEditando.id ? novaPlanta : p));
    } else {
      setPlantas([...plantas, novaPlanta]);
    }

    setModalAberto(false);
  };

  const excluirPlanta = (id) => {
    if (confirm('Deseja realmente excluir esta planta?')) {
      setPlantas(plantas.filter(p => p.id !== id));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Gerenciar Horta</h1>
          <p className="text-neutral-600">Cadastre e edite plantas medicinais</p>
        </div>
        <Button onClick={() => abrirModal()}>
          <Plus className="w-4 h-4 mr-2" />
          Nova Planta
        </Button>
      </div>

      {/* Busca */}
      <div className="card mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder="Buscar planta..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="input-field pl-10"
          />
        </div>
      </div>

      {/* Lista de Plantas */}
      <div className="card overflow-hidden p-0">
        <table className="w-full">
          <thead>
            <tr className="bg-neutral-50 border-b border-neutral-100">
              <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-900">Nome</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-900">Nome Científico</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-900">Efeitos</th>
              <th className="text-right px-6 py-4 text-sm font-semibold text-neutral-900">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {plantasFiltradas.map((planta) => (
              <tr key={planta.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
                      <Leaf className="w-5 h-5 text-secondary-500" />
                    </div>
                    <span className="font-medium text-neutral-900">{planta.nome}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-neutral-600 italic">{planta.nomeCientifico}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {planta.efeitos?.slice(0, 2).map((efeito, i) => (
                      <span key={i} className="px-2 py-0.5 bg-secondary-100 text-secondary-700 text-xs rounded-full">
                        {efeito}
                      </span>
                    ))}
                    {planta.efeitos?.length > 2 && (
                      <span className="px-2 py-0.5 bg-neutral-100 text-neutral-600 text-xs rounded-full">
                        +{planta.efeitos.length - 2}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => abrirModal(planta)}
                      className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => excluirPlanta(planta.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {plantasFiltradas.length === 0 && (
          <div className="text-center py-12">
            <Leaf className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
            <p className="text-neutral-500">Nenhuma planta encontrada</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalAberto && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-neutral-100">
              <h2 className="text-xl font-bold text-neutral-900">
                {plantaEditando ? 'Editar Planta' : 'Nova Planta'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">Nome Popular</label>
                  <input
                    type="text"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    required
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="label">Nome Científico</label>
                  <input
                    type="text"
                    value={formData.nomeCientifico}
                    onChange={(e) => setFormData({ ...formData, nomeCientifico: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="label">Descrição</label>
                <textarea
                  rows={3}
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  className="input-field resize-none"
                />
              </div>

              <div>
                <label className="label">Efeitos Medicinais (separados por vírgula)</label>
                <input
                  type="text"
                  value={formData.efeitos}
                  onChange={(e) => setFormData({ ...formData, efeitos: e.target.value })}
                  placeholder="Ex: Calmante, Digestivo, Anti-inflamatório"
                  className="input-field"
                />
              </div>

              <div>
                <label className="label">Modo de Uso</label>
                <textarea
                  rows={2}
                  value={formData.modoDeUso}
                  onChange={(e) => setFormData({ ...formData, modoDeUso: e.target.value })}
                  className="input-field resize-none"
                />
              </div>

              <div>
                <label className="label">Contraindicações</label>
                <textarea
                  rows={2}
                  value={formData.contraindicacoes}
                  onChange={(e) => setFormData({ ...formData, contraindicacoes: e.target.value })}
                  className="input-field resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="ghost" onClick={() => setModalAberto(false)}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {plantaEditando ? 'Salvar Alterações' : 'Cadastrar Planta'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GerenciarHorta;
