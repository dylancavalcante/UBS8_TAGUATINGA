import { Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

const API_URL =
  import.meta.env.VITE_API_URL ||
  'https://ubs8taguatinga-production.up.railway.app';

const PlantaCard = ({ planta, onClick }) => {

  const {
    nome,
    nome_cientifico,
    imagem_horta_url,
    efeitos
  } = planta;

  const efeitosMedicinais =
    efeitos
      ? efeitos.split(',')
      : [];

  const imagemUrl =
    imagem_horta_url
      ? `${API_URL}${imagem_horta_url}`
      : null;

  return (

    <motion.article
      whileHover={{
        y: -6,
        scale: 1.02
      }}
      transition={{
        type: 'spring',
        stiffness: 250,
        damping: 18
      }}
      className="
        bg-white
        rounded-3xl
        overflow-hidden
        shadow-sm
        hover:shadow-xl
        transition-all
        duration-300
        cursor-pointer
        border
        border-neutral-100
      "
      onClick={onClick}
    >

      <div className="relative h-52 bg-secondary-50 overflow-hidden">

        {imagemUrl ? (

          <img
            src={imagemUrl}
            alt={nome}
            className="
              w-full
              h-full
              object-cover
              transition-transform
              duration-500
              hover:scale-105
            "
          />

        ) : (

          <div className="w-full h-full flex items-center justify-center">

            <Leaf className="w-14 h-14 text-secondary-300" />

          </div>

        )}

      </div>

      <div className="p-5">

        <h3 className="text-xl font-bold text-neutral-900 mb-1">
          {nome}
        </h3>

        {nome_cientifico && (

          <p className="text-sm italic text-neutral-500 mb-4">
            {nome_cientifico}
          </p>

        )}

        <div className="flex flex-wrap gap-2">

          {efeitosMedicinais
            .slice(0, 3)
            .map((efeito, index) => (

              <span
                key={index}
                className="
                  px-3
                  py-1
                  rounded-full
                  bg-green-100
                  text-[#0d4f28]
                  text-xs
                  font-medium
                "
              >
                {efeito.trim()}
              </span>

            ))}

          {efeitosMedicinais.length > 3 && (

            <span
              className="
                px-3
                py-1
                rounded-full
                bg-neutral-100
                text-neutral-600
                text-xs
                font-medium
              "
            >
              +{efeitosMedicinais.length - 3}
            </span>

          )}

        </div>

      </div>

    </motion.article>

  );

};

export default PlantaCard;