import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';

const PostCard = ({ post }) => {
  const { id, titulo, resumo, imagem, data, categoria } = post;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <article className="card overflow-hidden hover:shadow-md transition-shadow">
      {imagem && (
        <div className="relative h-48 -mx-6 -mt-6 mb-4">
          <img 
            src={imagem} 
            alt={titulo}
            className="w-full h-full object-cover"
          />
          {categoria && (
            <span className="absolute top-3 left-3 px-3 py-1 bg-primary-500 text-white text-xs font-medium rounded-full">
              {categoria}
            </span>
          )}
        </div>
      )}
      
      <div className="flex items-center gap-2 text-sm text-neutral-500 mb-2">
        <Calendar className="w-4 h-4" />
        <time dateTime={data}>{formatDate(data)}</time>
      </div>
      
      <h3 className="text-lg font-semibold text-neutral-900 mb-2 line-clamp-2">
        {titulo}
      </h3>
      
      <p className="text-neutral-600 text-sm mb-4 line-clamp-3">
        {resumo}
      </p>
      
      <Link 
        to={`/publicacoes/${id}`}
        className="inline-flex items-center gap-1 text-primary-500 font-medium text-sm hover:text-primary-600 transition-colors"
      >
        Ler mais
        <ArrowRight className="w-4 h-4" />
      </Link>
    </article>
  );
};

export default PostCard;
