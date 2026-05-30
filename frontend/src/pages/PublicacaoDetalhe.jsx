import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import api from "../services/api";

function PublicacaoDetalhe() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarPost() {
      try {
        const response = await api.get(`/publicacoes/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    carregarPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#0d4f28] animate-spin mb-4" />
        <p className="text-neutral-600">
          Carregando publicação...
        </p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center px-4">
        <h2 className="text-2xl font-semibold text-neutral-800 mb-3">
          Publicação não encontrada
        </h2>

        <Link
          to="/publicacoes"
          className="flex items-center gap-2 text-[#0d4f28] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para publicações
        </Link>
      </div>
    );
  }

  return (
    <main className="bg-neutral-50 min-h-screen py-12">
      <article className="max-w-4xl mx-auto px-4">

        {/* Voltar */}
        <Link
          to="/publicacoes"
          className="inline-flex items-center gap-2 text-sm text-[#0d4f28] hover:text-[#146b38] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Link>

        {/* Header */}
        <header className="mb-10">
          {post.categoria && (
            <span className="inline-block bg-green-100 text-[#0d4f28] text-sm font-medium px-4 py-1 rounded-full mb-5">
              {post.categoria}
            </span>
          )}

          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 leading-tight mb-6">
            {post.titulo}
          </h1>

          {post.resumo && (
            <p className="text-lg md:text-xl text-neutral-600 leading-relaxed max-w-3xl">
              {post.resumo}
            </p>
          )}
        </header>

        {/* Imagem */}
        {post.imagem_url && (
          <div className="mb-10 overflow-hidden rounded-3xl shadow-md">
            <img
              src={post.imagem_url}
              alt={post.titulo}
              className="w-full max-h-[500px] object-cover"
            />
          </div>
        )}

        {/* Conteúdo */}
        <section className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-neutral-200">
          <div className="prose prose-lg max-w-none text-neutral-700 whitespace-pre-wrap leading-loose">
            {post.conteudo}
          </div>
        </section>
      </article>
    </main>
  );
}

export default PublicacaoDetalhe;