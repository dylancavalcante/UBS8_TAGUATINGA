import { Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

const PlantaCard = ({ planta, onClick }) => {
  const { nome, nomeCientifico, imagem, efeitosMedicinais } = planta;

  return (
    <motion.article 
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="card overflow-hidden bg-white hover:shadow-2xl hover:shadow-secondary-500/20 transition-all duration-300 cursor-pointer border border-transparent hover:border-secondary-200"
      onClick={onClick}
    >
      {/* Fundo sutil do card usando sua paleta */}
      <div className="relative h-48 -mx-6 -mt-6 mb-4 bg-secondary-50 overflow-hidden">
        {imagem ? (
          <motion.img 
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
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
      
      {/* Título com gradiente verde elegante */}
      <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-secondary-700 to-secondary-500">
        {nome}
      </h3>
      
      {nomeCientifico && (
        <p className="text-sm text-neutral-500 italic mb-3">{nomeCientifico}</p>
      )}
      
      <div className="flex flex-wrap gap-1 mt-3">
        {/* Tags com verde suave (Comentário movido para cá!) */}
        {efeitosMedicinais?.slice(0, 3).map((efeito, index) => (
          <span 
            key={index}
            className="px-2 py-1 bg-secondary-100 text-secondary-800 text-xs font-medium rounded-full border border-secondary-200"
          >
            {efeito}
          </span>
        ))}
        {efeitosMedicinais?.length > 3 && (
          <span className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs font-medium rounded-full border border-neutral-200">
            +{efeitosMedicinais.length - 3}
          </span>
        )}
      </div>
    </motion.article>
  );
};

export default PlantaCard;