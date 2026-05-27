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
    <section className="relative bg-primary-700 min-h-[400px] lg:min-h-[500px] flex items-center overflow-hidden">
      {image && (
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          // A classe bg-fixed cria o efeito Parallax
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${image})` }}
        >
          {/* Gradiente Azul Profundo com base na sua paleta */}
          {overlay && <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-600/60" />}
        </motion.div>
      )}
      
      <div className="container-ubs relative z-10 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight drop-shadow-lg">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg md:text-xl text-primary-50 mb-8 drop-shadow-md font-medium">
              {subtitle}
            </p>
          )}
          
          {(primaryAction || secondaryAction) && (
            <div className="flex flex-wrap gap-4">
              {primaryAction && (
                <Link to={primaryAction.to}>
                  <Button variant="secondary" size="lg" className="shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    {primaryAction.label}
                  </Button>
                </Link>
              )}
              {secondaryAction && (
                <Link to={secondaryAction.to}>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-primary-900 transition-all duration-300 shadow-lg"
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