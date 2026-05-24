import { Link } from 'react-router-dom';
import Button from './Button';

const Banner = ({ 
  title, 
  subtitle, 
  image, 
  primaryAction, 
  secondaryAction,
  overlay = true 
}) => {
  return (
    <section className="relative bg-primary-500 min-h-[400px] lg:min-h-[500px] flex items-center">
      {image && (
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        >
          {overlay && <div className="absolute inset-0 bg-primary-900/60" />}
        </div>
      )}
      
      <div className="container-ubs relative z-10 py-16">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg md:text-xl text-primary-100 mb-8">
              {subtitle}
            </p>
          )}
          
          {(primaryAction || secondaryAction) && (
            <div className="flex flex-wrap gap-4">
              {primaryAction && (
                <Link to={primaryAction.to}>
                  <Button variant="secondary" size="lg">
                    {primaryAction.label}
                  </Button>
                </Link>
              )}
              {secondaryAction && (
                <Link to={secondaryAction.to}>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-white text-white hover:bg-white/10"
                  >
                    {secondaryAction.label}
                  </Button>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Banner;
