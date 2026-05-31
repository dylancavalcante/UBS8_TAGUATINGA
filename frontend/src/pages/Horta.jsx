import { useState, useEffect } from 'react';

import {
  Search,
  Leaf,
  X,
  Info
} from 'lucide-react';

import {
  motion,
  AnimatePresence
} from 'framer-motion';

import Banner from '../components/Banner';
import PlantaCard from '../components/PlantaCard';

import horta from '../assets/horta.png';

import api from '../services/api';

const API_URL =
  import.meta.env.VITE_API_URL ||
  'https://ubs8taguatinga-production.up.railway.app';

const Horta = () => {

  const [busca, setBusca] = useState('');

  const [plantaSelecionada,
    setPlantaSelecionada] = useState(null);

  const [plantas, setPlantas] = useState([]);

  useEffect(() => {

    async function carregarPlantas() {

      try {

        const response =
          await api.get('/horta/');

        setPlantas(response.data);

      } catch (error) {

        console.error(
          'Erro ao buscar plantas:',
          error
        );

      }

    }

    carregarPlantas();

  }, []);

  const plantasFiltradas =
    plantas.filter((planta) => {

      const nome =
        planta.nome?.toLowerCase() || '';

      const efeitos =
        planta.efeitos?.toLowerCase() || '';

      const termo =
        busca.toLowerCase();

      return (
        nome.includes(termo) ||
        efeitos.includes(termo)
      );

    });

  const imagemSelecionada =
    plantaSelecionada?.imagem_horta_url || null;

  return (

    <main className="bg-neutral-50 min-h-screen pb-16 overflow-hidden">

      <div className="relative z-0">

        <Banner
          title="Horta: Raízes do cuidar"
          image={horta}
          subtitle="Conheça as plantas medicinais cultivadas na UBS e seus benefícios para a saúde."
        />

      </div>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 relative z-20">

        {/* busca */}

        <div className="max-w-2xl mx-auto -mt-8 md:-mt-14 relative mb-8">

          <div className="relative shadow-xl rounded-full bg-white border border-neutral-100">

            <Search
              className="
                absolute
                left-5
                top-1/2
                -translate-y-1/2
                w-6
                h-6
                text-neutral-400
              "
            />

            <input
              type="text"
              placeholder="Buscar por nome ou efeito medicinal..."
              value={busca}
              onChange={(e) =>
                setBusca(e.target.value)
              }
              className="
                w-full
                pl-14
                pr-6
                py-4
                rounded-full
                border-none
                text-lg
                text-neutral-800
                focus:outline-none
                bg-transparent
              "
            />

          </div>

        </div>

        {/* aviso */}

        <div
          className="
            bg-secondary-50
            border
            border-secondary-200
            rounded-xl
            p-4
            mb-10
            flex
            items-start
            gap-3
          "
        >

          <Info
            className="
              w-5
              h-5
              text-secondary-600
              flex-shrink-0
              mt-0.5
            "
          />

          <div className="text-sm text-secondary-800">

            <p className="font-semibold mb-1">
              Informação Importante
            </p>

            <p>
              As informações apresentadas nesta página possuem caráter educativo.
              O uso de plantas medicinais não substitui avaliação médica,
              diagnóstico ou tratamento realizado por profissionais de saúde.
            </p>

          </div>

        </div>

        {/* grid */}

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            gap-6
          "
        >

          {plantasFiltradas.map((planta) => (

            <PlantaCard
              key={planta.horta_id}
              planta={planta}
              onClick={() =>
                setPlantaSelecionada(planta)
              }
            />

          ))}

        </div>

        {/* não encontrou */}

        {plantasFiltradas.length === 0 && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >

            <Leaf
              className="
                w-16
                h-16
                text-neutral-300
                mx-auto
                mb-4
              "
            />

            <h3
              className="
                text-xl
                font-semibold
                text-neutral-700
                mb-2
              "
            >
              Nenhuma planta encontrada
            </h3>

            <p className="text-neutral-500">
              Não existe nenhuma planta cadastrada
              com esse nome ou efeito medicinal.
            </p>

          </motion.div>

        )}

      </section>

      <AnimatePresence>

        {plantaSelecionada && (

          <motion.div

            initial={{ opacity: 0 }}

            animate={{ opacity: 1 }}

            exit={{ opacity: 0 }}

            className="
              fixed
              inset-0
              bg-black/60
              backdrop-blur-sm
              z-50
              flex
              items-center
              justify-center
              p-4
            "

            onClick={() =>
              setPlantaSelecionada(null)
            }

          >

            <motion.div

              initial={{
                scale: 0.95,
                opacity: 0
              }}

              animate={{
                scale: 1,
                opacity: 1
              }}

              exit={{
                scale: 0.95,
                opacity: 0
              }}

              transition={{
                duration: 0.2
              }}

              className="
                bg-white
                rounded-2xl
                max-w-2xl
                w-full
                max-h-[90vh]
                overflow-y-auto
              "

              onClick={(e) =>
                e.stopPropagation()
              }

            >

              <div
                className="
                  relative
                  h-56
                  bg-green-50
                  overflow-hidden
                "
              >

                {imagemSelecionada ? (

                  <img
                    src={imagemSelecionada}
                    alt={plantaSelecionada.nome}
                    className="
                      w-full
                      h-full
                      object-cover
                    "
                  />

                ) : (

                  <div
                    className="
                      w-full
                      h-full
                      flex
                      items-center
                      justify-center
                    "
                  >

                    <Leaf
                      className="
                        w-20
                        h-20
                        text-green-200
                      "
                    />

                  </div>

                )}

                <button
                  onClick={() =>
                    setPlantaSelecionada(null)
                  }
                  className="
                    absolute
                    top-4
                    right-4
                    w-10
                    h-10
                    bg-white
                    rounded-full
                    flex
                    items-center
                    justify-center
                    shadow
                  "
                >

                  <X className="w-5 h-5" />

                </button>

              </div>

              <div className="p-8">

                <h2
                  className="
                    text-3xl
                    font-bold
                    text-neutral-900
                    mb-1
                  "
                >
                  {plantaSelecionada.nome}
                </h2>

                <p
                  className="
                    text-[#0d4f28]
                    italic
                    mb-6
                    text-lg
                  "
                >
                  {plantaSelecionada.nome_cientifico}
                </p>

                <div
                  className="
                    flex
                    flex-wrap
                    gap-2
                    mb-8
                  "
                >

                  {plantaSelecionada.efeitos
                    ?.split(',')
                    .map((efeito, index) => (

                      <span
                        key={index}
                        className="
                          px-4
                          py-1.5
                          bg-green-100
                          text-[#0d4f28]
                          font-medium
                          text-sm
                          rounded-full
                        "
                      >

                        {efeito.trim()}

                      </span>

                    ))}

                </div>

                <div className="space-y-6">

                  <div>

                    <h3
                      className="
                        text-lg
                        font-bold
                        text-neutral-900
                        mb-2
                      "
                    >
                      Descrição
                    </h3>

                    <p
                      className="
                        text-neutral-600
                        leading-relaxed
                      "
                    >
                      {plantaSelecionada.descricao}
                    </p>

                  </div>

                  <div
                    className="
                      bg-neutral-50
                      p-5
                      rounded-xl
                      border
                      border-neutral-100
                    "
                  >

                    <h3
                      className="
                        text-lg
                        font-bold
                        text-neutral-900
                        mb-2
                      "
                    >
                      Modo de Uso
                    </h3>

                    <p
                      className="
                        text-neutral-600
                        leading-relaxed
                      "
                    >
                      {plantaSelecionada.modo_de_uso}
                    </p>

                  </div>

                  <div
                    className="
                      bg-red-50
                      border-l-4
                      border-red-500
                      p-5
                      rounded-r-xl
                    "
                  >

                    <h3
                      className="
                        text-lg
                        font-bold
                        text-red-800
                        mb-2
                      "
                    >
                      Contraindicações
                    </h3>

                    <p
                      className="
                        text-red-700
                        leading-relaxed
                      "
                    >
                      {plantaSelecionada.contraindicacoes}
                    </p>

                  </div>

                </div>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </main>

  );

};

export default Horta;