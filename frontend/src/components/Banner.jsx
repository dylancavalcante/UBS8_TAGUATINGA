import { Link } from 'react-router-dom';
import Button from './Button';
import { motion } from 'framer-motion';

const Banner = ({ 
  title, 
  subtitle, 
  image, 
  primaryAction, 
  secondaryAction,
  overlay = true 
}) => {
  return (
    // 1. Fundo da seção agora possui o gradiente quente
    // 2. Adicionado o rounded-b-[3rem] para a borda inferior arredondada
    <section className="relative bg-gradient-to-r from-emerald-500 via-amber-400 to-orange-500 min-h-[400px] lg:min-h-[500px] flex items-center justify-center overflow-hidden rounded-b-[3rem] shadow-md">
      
      {image && (
        <motion.div 
          // Animação de escala (zoom) foi removida para resolver o bug
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }} // Controle de opacidade
          transition={{ duration: 1.5, ease: "easeOut" }}
          // bg-fixed foi removido (causava problemas com o zoom)
          // mix-blend-multiply adicionado para fundir a foto com as cores quentes
          className="absolute inset-0 bg-cover bg-center mix-blend-multiply"
          style={{ backgroundImage: `url(${image})` }}
        />
      )}
      
      {/* Centralizei o conteúdo para manter a estética do último design */}
      <div className="container-ubs relative z-10 py-16 px-4 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight drop-shadow-md">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg md:text-xl text-white/95 mb-8 drop-shadow-md font-medium max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
          
          {(primaryAction || secondaryAction) && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {primaryAction && (
                <Link to={primaryAction.to}>
                  {/* Botões atualizados com formato de pílula (rounded-full) */}
                  <Button variant="secondary" size="lg" className="rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 px-8 py-3">
                    {primaryAction.label}
                  </Button>
                </Link>
              )}
              {secondaryAction && (
                <Link to={secondaryAction.to}>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="rounded-full border-white text-white hover:bg-white hover:text-orange-500 transition-all duration-300 shadow-lg px-8 py-3"
                  >
                    {secondaryAction.label}
                  </Button>
                </Link>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;