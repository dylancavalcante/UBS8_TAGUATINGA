import { useState, useEffect } from 'react';

import {
  Plus,
  Edit,
  Trash2,
  Search,
  Leaf
} from 'lucide-react';

import Button from '../../components/Button';

import api from '../../services/api';

const GerenciarHorta = () => {

  const [plantas, setPlantas] = useState([]);

  const [busca, setBusca] = useState('');

  const [modalAberto, setModalAberto] = useState(false);

  const [plantaEditando, setPlantaEditando] = useState(null);

  const [formData, setFormData] = useState({
    nome: '',
    nome_cientifico: '',
    descricao: '',
    modo_de_uso: '',
    contraindicacoes: '',
    efeitos: '',
    imagem: null
  });

  useEffect(() => {

    carregarPlantas();

  }, []);

  async function carregarPlantas() {

    try {

      const response = await api.get('/horta/');

      setPlantas(response.data);

    } catch (error) {

      console.error('Erro ao buscar plantas:', error);

    }

  }

  const plantasFiltradas = plantas.filter((planta) =>
    planta.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const abrirModal = (planta = null) => {

    if (planta) {

      setPlantaEditando(planta);

      setFormData({
        nome: planta.nome || '',
        nome_cientifico: planta.nome_cientifico || '',
        descricao: planta.descricao || '',
        modo_de_uso: planta.modo_de_uso || '',
        contraindicacoes: planta.contraindicacoes || '',
        efeitos: planta.efeitos || '',
        imagem: null
      });

    } else {

      setPlantaEditando(null);

      setFormData({
        nome: '',
        nome_cientifico: '',
        descricao: '',
        modo_de_uso: '',
        contraindicacoes: '',
        efeitos: '',
        imagem: null
      });

    }

    setModalAberto(true);

  };

  const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    const token = localStorage.getItem(
      'admin_token'
    );

    const dados = new FormData();

    dados.append('nome', formData.nome);

    dados.append(
      'nome_cientifico',
      formData.nome_cientifico
    );

    dados.append(
      'descricao',
      formData.descricao
    );

    dados.append(
      'modo_de_uso',
      formData.modo_de_uso
    );

    dados.append(
      'contraindicacoes',
      formData.contraindicacoes
    );

    dados.append(
      'efeitos',
      formData.efeitos
    );

    if (formData.imagem) {

      dados.append(
        'imagem',
        formData.imagem
      );

    }

    if (plantaEditando) {

      await api.put(

        `/horta/${plantaEditando.horta_id}`,

        dados,

        {
          headers: {

            Authorization:
              `Bearer ${token}`,

            'Content-Type':
              'multipart/form-data'

          }
        }

      );

    } else {

      await api.post(

        '/horta/',

        dados,

        {
          headers: {

            Authorization:
              `Bearer ${token}`,

            'Content-Type':
              'multipart/form-data'

          }
        }

      );

    }

    await carregarPlantas();

    setModalAberto(false);

  } catch (error) {

    console.error(
      'Erro ao cadastrar planta:',
      error
    );

  }

};

  const excluirPlanta = async (id) => {

  const confirmar = confirm(
    'Deseja realmente excluir esta planta?'
  );

  if (!confirmar) return;

  try {

    const token = localStorage.getItem(
      'admin_token'
    );

    await api.delete(

      `/horta/${id}`,

      {
        headers: {

          Authorization:
            `Bearer ${token}`

        }
      }

    );

    await carregarPlantas();

  } catch (error) {

    console.error(
      'Erro ao excluir planta:',
      error
    );

  }

};

  return (
    <div>

      <div className="flex items-center justify-between mb-8">

        <div>
          <h1 className="text-2xl font-bold text-neutral-900">
            Gerenciar Horta
          </h1>

          <p className="text-neutral-600">
            Cadastre e edite plantas medicinais
          </p>
        </div>

        <Button onClick={() => abrirModal()}>
          <Plus className="w-4 h-4 mr-2" />
          Nova Planta
        </Button>

      </div>

      {/* busca */}

      <div className="card mb-6">

        <div className="relative max-w-md">

          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />

          <input
            type="text"
            placeholder="Buscar planta..."
            value={busca}
            onChange={(e) =>
              setBusca(e.target.value)
            }
            className="input-field pl-10"
          />

        </div>

      </div>

      {/* tabela */}

      <div className="card overflow-hidden p-0">

        <table className="w-full">

          <thead>

            <tr className="bg-neutral-50 border-b border-neutral-100">

              <th className="text-left px-6 py-4">
                Nome
              </th>

              <th className="text-left px-6 py-4">
                Nome Científico
              </th>

              <th className="text-left px-6 py-4">
                Efeitos
              </th>

              <th className="text-right px-6 py-4">
                Ações
              </th>

            </tr>

          </thead>

          <tbody>

            {plantasFiltradas.map((planta) => (

              <tr
                key={planta.horta_id}
                className="border-b border-neutral-100"
              >

                <td className="px-6 py-4">

                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">

                      <Leaf className="w-5 h-5 text-secondary-500" />

                    </div>

                    <span className="font-medium">
                      {planta.nome}
                    </span>

                  </div>

                </td>

                <td className="px-6 py-4 italic text-neutral-600">

                  {planta.nome_cientifico}

                </td>

                <td className="px-6 py-4">

                  <div className="flex flex-wrap gap-1">

                    {planta.efeitos
                      ?.split(',')
                      .slice(0, 2)
                      .map((efeito, i) => (

                        <span
                          key={i}
                          className="px-2 py-0.5 bg-secondary-100 text-secondary-700 text-xs rounded-full"
                        >
                          {efeito.trim()}
                        </span>

                      ))}

                  </div>

                </td>

                <td className="px-6 py-4">

                  <div className="flex justify-end gap-2">

                    <button
                      onClick={() => abrirModal(planta)}
                      className="p-2 hover:bg-neutral-100 rounded-lg"
                    >
                      <Edit className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() =>
                        excluirPlanta(planta.horta_id)
                      }
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

      </div>

      {/* modal */}

      {modalAberto && (

        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">

          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">

            <div className="p-6 border-b border-neutral-100">

              <h2 className="text-xl font-bold">

                {plantaEditando
                  ? 'Editar Planta'
                  : 'Nova Planta'}

              </h2>

            </div>

            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-4"
            >

              <input
                type="text"
                placeholder="Nome"
                value={formData.nome}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    nome: e.target.value
                  })
                }
                className="input-field"
              />

              <input
                type="text"
                placeholder="Nome científico"
                value={formData.nome_cientifico}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    nome_cientifico: e.target.value
                  })
                }
                className="input-field"
              />

              <textarea
                placeholder="Descrição"
                value={formData.descricao}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    descricao: e.target.value
                  })
                }
                className="input-field"
              />

              <textarea
                placeholder="Modo de uso"
                value={formData.modo_de_uso}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    modo_de_uso: e.target.value
                  })
                }
                className="input-field"
              />

              <textarea
                placeholder="Contraindicações"
                value={formData.contraindicacoes}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contraindicacoes: e.target.value
                  })
                }
                className="input-field"
              />

              <input
                type="text"
                placeholder="Efeitos separados por vírgula"
                value={formData.efeitos}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    efeitos: e.target.value
                  })
                }
                className="input-field"
              />

              <div>

                <label className="label">
                  Imagem da planta
                </label>

                <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      imagem: e.target.files[0]
                    })
                  }
                  className="input-field"
                />

              </div>

              <div className="flex justify-end gap-3 pt-4">

                <Button
                  type="button"
                  variant="ghost"
                  onClick={() =>
                    setModalAberto(false)
                  }
                >
                  Cancelar
                </Button>

                <Button type="submit">

                  {plantaEditando
                    ? 'Salvar'
                    : 'Cadastrar'}

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