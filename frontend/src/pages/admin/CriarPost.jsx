import { useEffect, useState } from 'react';

import {
  Plus,
  Edit,
  Trash2,
  Search,
  FileText,
  X
} from 'lucide-react';

import Button from '../../components/Button';

import api from '../../services/api';

const GerenciarPublicacoes = () => {

  const [publicacoes, setPublicacoes] = useState([]);

  const [busca, setBusca] = useState('');

  const [modalAberto, setModalAberto] = useState(false);

  const [publicacaoEditando, setPublicacaoEditando] = useState(null);

  const [formData, setFormData] = useState({
    titulo: '',
    resumo: '',
    conteudo: '',
    categoria: '',
    imagem: null
  });

  useEffect(() => {

    carregarPublicacoes();

  }, []);

  async function carregarPublicacoes() {

    try {

      const response = await api.get('/publicacoes/');

      setPublicacoes(response.data);

    } catch (error) {

      console.error(
        'Erro ao buscar publicações:',
        error
      );

    }

  }

  const publicacoesFiltradas = publicacoes.filter(
    (publicacao) =>
      publicacao.titulo
        .toLowerCase()
        .includes(busca.toLowerCase())
  );

  const abrirModal = (
    publicacao = null
  ) => {

    if (publicacao) {

      setPublicacaoEditando(publicacao);

      setFormData({
        titulo: publicacao.titulo || '',
        resumo: publicacao.resumo || '',
        conteudo: publicacao.conteudo || '',
        categoria: publicacao.categoria || '',
        imagem: null
});

    } else {

      setPublicacaoEditando(null);

      setFormData({
        titulo: '',
        resumo: '',
        conteudo: '',
        categoria: '',
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

    dados.append(
      'titulo',
      formData.titulo
    );

    dados.append(
      'resumo',
      formData.resumo
    );

    dados.append(
      'conteudo',
      formData.conteudo
    );

    dados.append(
      'categoria',
      formData.categoria
    );

    if (formData.imagem) {

      dados.append(
        'imagem',
        formData.imagem
      );

    }

    if (publicacaoEditando) {

      await api.put(

        `/publicacoes/${publicacaoEditando.publicacao_id}`,

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

        '/publicacoes/',

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

    await carregarPublicacoes();

    setModalAberto(false);

    setFormData({

      titulo: '',
      resumo: '',
      conteudo: '',
      categoria: '',
      imagem: null

    });

  } catch (error) {

    console.error(
      'Erro ao salvar publicação:',
      error
    );

    if (
      error.response?.status === 401
    ) {

      alert(
        'Sessão expirada. Faça login novamente.'
      );

    }

  }

};

  const excluirPublicacao = async (id) => {

  const confirmar = confirm(
    'Deseja excluir esta publicação?'
  );

  if (!confirmar) return;

  try {

    const token = localStorage.getItem(
      'admin_token'
    );

    await api.delete(

      `/publicacoes/${id}`,

      {
        headers: {

          Authorization:
            `Bearer ${token}`

        }
      }

    );

    await carregarPublicacoes();

  } catch (error) {

    console.error(
      'Erro ao excluir publicação:',
      error
    );

  }

};

  return (

    <div>

      <div className="flex items-center justify-between mb-8">

        <div>

          <h1 className="text-2xl font-bold text-neutral-900">
            Gerenciar Publicações
          </h1>

          <p className="text-neutral-600">
            Crie e edite publicações do site
          </p>

        </div>

        <Button onClick={() => abrirModal()}>

          <Plus className="w-4 h-4 mr-2" />

          Nova Publicação

        </Button>

      </div>

      <div className="card mb-6">

        <div className="relative max-w-md">

          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />

          <input
            type="text"
            placeholder="Buscar publicação..."
            value={busca}
            onChange={(e) =>
              setBusca(e.target.value)
            }
            className="input-field pl-10"
          />

        </div>

      </div>

      <div className="card overflow-hidden p-0">

        <table className="w-full">

          <thead>

            <tr className="bg-neutral-50 border-b border-neutral-100">

              <th className="text-left px-6 py-4">
                Título
              </th>

              <th className="text-left px-6 py-4">
                Categoria
              </th>

              <th className="text-right px-6 py-4">
                Ações
              </th>

            </tr>

          </thead>

          <tbody>

            {publicacoesFiltradas.map(
              (publicacao) => (

                <tr
                  key={publicacao.publicacao_id}
                  className="border-b border-neutral-100"
                >

                  <td className="px-6 py-4">

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">

                        <FileText className="w-5 h-5 text-secondary-500" />

                      </div>

                      <span className="font-medium">
                        {publicacao.titulo}
                      </span>

                    </div>

                  </td>

                  <td className="px-6 py-4">

                    {publicacao.categoria}

                  </td>

                  <td className="px-6 py-4">

                    <div className="flex justify-end gap-2">

                      <button
                        onClick={() =>
                          abrirModal(publicacao)
                        }
                        className="p-2 hover:bg-neutral-100 rounded-lg"
                      >

                        <Edit className="w-4 h-4" />

                      </button>

                      <button
                        onClick={() =>
                          excluirPublicacao(
                            publicacao.publicacao_id
                          )
                        }
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >

                        <Trash2 className="w-4 h-4" />

                      </button>

                    </div>

                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

      {modalAberto && (

        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">

          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">

            <div className="p-6 border-b border-neutral-100 flex items-center justify-between">

              <h2 className="text-xl font-bold">

                {publicacaoEditando
                  ? 'Editar Publicação'
                  : 'Nova Publicação'}

              </h2>

              <button
                onClick={() =>
                  setModalAberto(false)
                }
              >

                <X className="w-5 h-5" />

              </button>

            </div>

            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-4"
            >

              <input
                type="text"
                placeholder="Título"
                value={formData.titulo}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    titulo: e.target.value
                  })
                }
                className="input-field"
              />

              <textarea
                placeholder="Resumo"
                value={formData.resumo}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    resumo: e.target.value
                  })
                }
                className="input-field"
              />

              <textarea
                placeholder="Conteúdo"
                rows={8}
                value={formData.conteudo}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    conteudo: e.target.value
                  })
                }
                className="input-field"
              />

              <input
                type="text"
                placeholder="Categoria"
                value={formData.categoria}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    categoria: e.target.value
                  })
                }
                className="input-field"
              />

              <div>

                <label className="label">
                  Imagem da publicação
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

                  {publicacaoEditando
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

export default GerenciarPublicacoes;