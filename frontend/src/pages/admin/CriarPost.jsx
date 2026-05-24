import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, X, Image as ImageIcon } from 'lucide-react';
import Button from '../../components/Button';
import api from '../../services/api';

const CriarPost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titulo: '',
    resumo: '',
    conteudo: '',
    categoria: '',
    imagem: null
  });
  const [previewImagem, setPreviewImagem] = useState(null);
  const [salvando, setSalvando] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, imagem: file });
      setPreviewImagem(URL.createObjectURL(file));
    }
  };

  const removerImagem = () => {
    setFormData({ ...formData, imagem: null });
    setPreviewImagem(null);
  };

  const handleSubmit = async (e) => {

  e.preventDefault();

  setSalvando(true);

  try {

    const novaPublicacao = {

      titulo: formData.titulo,
      resumo: formData.resumo,
      conteudo: formData.conteudo,
      categoria: formData.categoria,
      imagem_url:
        "https://images.unsplash.com/photo-1584515933487-779824d29309"
    };

    await api.post(
      "/publicacoes/",
      novaPublicacao
    );

    navigate("/");

  } catch (error) {

    console.error(
      "Erro ao criar publicação:",
      error.response?.data || error
    );

  } finally {

    setSalvando(false);
  }
};

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 rounded-lg hover:bg-neutral-100"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Nova Publicação</h1>
          <p className="text-neutral-600">Crie uma nova publicação para o site</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna Principal */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card">
              <div className="space-y-4">
                <div>
                  <label htmlFor="titulo" className="label">Título</label>
                  <input
                    type="text"
                    id="titulo"
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="Digite o título da publicação"
                  />
                </div>

                <div>
                  <label htmlFor="resumo" className="label">Resumo</label>
                  <textarea
                    id="resumo"
                    name="resumo"
                    rows={3}
                    value={formData.resumo}
                    onChange={handleChange}
                    required
                    className="input-field resize-none"
                    placeholder="Breve descrição da publicação"
                  />
                </div>

                <div>
                  <label htmlFor="conteudo" className="label">Conteúdo</label>
                  <textarea
                    id="conteudo"
                    name="conteudo"
                    rows={12}
                    value={formData.conteudo}
                    onChange={handleChange}
                    required
                    className="input-field resize-none"
                    placeholder="Escreva o conteúdo completo da publicação..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Coluna Lateral */}
          <div className="space-y-6">
            {/* Imagem */}
            <div className="card">
              <h3 className="font-semibold text-neutral-900 mb-4">Imagem de Capa</h3>
              
              {previewImagem ? (
                <div className="relative">
                  <img 
                    src={previewImagem} 
                    alt="Preview" 
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={removerImagem}
                    className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-neutral-300 rounded-lg cursor-pointer hover:border-primary-500 transition-colors">
                  <ImageIcon className="w-10 h-10 text-neutral-400 mb-2" />
                  <span className="text-sm text-neutral-600">Clique para enviar</span>
                  <span className="text-xs text-neutral-400 mt-1">PNG, JPG até 5MB</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImagemChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Categoria */}
            <div className="card">
              <h3 className="font-semibold text-neutral-900 mb-4">Configurações</h3>
              
              <div>
                <label htmlFor="categoria" className="label">Categoria</label>
                <select
                  id="categoria"
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                  required
                  className="input-field"
                >
                  <option value="">Selecione...</option>
                  <option value="Campanha">Campanha</option>
                  <option value="Eventos">Eventos</option>
                  <option value="Saúde">Saúde</option>
                  <option value="Comunicados">Comunicados</option>
                </select>
              </div>
            </div>

            {/* Ações */}
            <div className="card">
              <div className="space-y-3">
                <Button 
                  type="submit" 
                  disabled={salvando}
                  className="w-full"
                >
                  {salvando ? 'Salvando...' : 'Publicar'}
                </Button>
                <Button 
                  type="button"
                  variant="outline"
                  onClick={(e) => handleSubmit(e, false)}
                  disabled={salvando}
                  className="w-full"
                >
                  Salvar como Rascunho
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CriarPost;
