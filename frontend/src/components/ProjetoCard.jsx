import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const ProjetoCard = ({ projeto }) => {
  const { id, nome, area, descricao, icone: Icon, cor } = projeto;

  const cores = {
    nutricao: 'bg-orange-100 text-orange-600',
    farmacia: 'bg-blue-100 text-blue-600',
    psicologia: 'bg-purple-100 text-purple-600',
    fisioterapia: 'bg-green-100 text-green-600',
    assistenciaSocial: 'bg-pink-100 text-pink-600',
  };

  return (
    <article className="card hover:shadow-md transition-shadow group">
      <div className={`w-12 h-12 rounded-lg ${cores[cor] || 'bg-primary-100 text-primary-600'} flex items-center justify-center mb-4`}>
        {Icon && <Icon className="w-6 h-6" />}
      </div>
      
      <span className="text-xs font-medium text-neutral-500 uppercase tracking-wide">
        {area}
      </span>
      
      <h3 className="text-lg font-semibold text-neutral-900 mt-1 mb-2">
        {nome}
      </h3>
      
      <p className="text-neutral-600 text-sm mb-4 line-clamp-3">
        {descricao}
      </p>
      
      <Link 
        to={`/projetos/${id}`}
        className="inline-flex items-center gap-1 text-primary-500 font-medium text-sm hover:text-primary-600 transition-colors"
      >
        Saiba mais
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </article>
  );
};

export default ProjetoCard;
