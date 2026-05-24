import { Leaf } from 'lucide-react';

const PlantaCard = ({ planta, onClick }) => {
  const { nome, nomeCientifico, imagem, efeitosMedicinais } = planta;

  return (
    <article 
      className="card overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-40 -mx-6 -mt-6 mb-4 bg-secondary-50">
        {imagem ? (
          <img 
            src={imagem} 
            alt={nome}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Leaf className="w-12 h-12 text-secondary-300" />
          </div>
        )}
      </div>
      
      <h3 className="text-lg font-semibold text-neutral-900">{nome}</h3>
      
      {nomeCientifico && (
        <p className="text-sm text-neutral-500 italic mb-2">{nomeCientifico}</p>
      )}
      
      <div className="flex flex-wrap gap-1 mt-3">
        {efeitosMedicinais?.slice(0, 3).map((efeito, index) => (
          <span 
            key={index}
            className="px-2 py-1 bg-secondary-100 text-secondary-700 text-xs rounded-full"
          >
            {efeito}
          </span>
        ))}
        {efeitosMedicinais?.length > 3 && (
          <span className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-full">
            +{efeitosMedicinais.length - 3}
          </span>
        )}
      </div>
    </article>
  );
};

export default PlantaCard;
