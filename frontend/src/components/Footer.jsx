import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-emerald-950 text-emerald-100 mt-8">
      <div className="container-ubs py-16 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Logo e Descrição */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-white p-2 rounded-xl shadow-sm">
                <img 
                  src="/logo.png" 
                  alt="Logo da UBS 8 de Taguatinga" 
                  className="w-10 h-10 object-contain" 
                />
              </div>
              <span className="font-bold text-xl text-white tracking-tight">UBS 8 de Taguatinga</span>
            </div>
            <p className="text-sm text-emerald-200/80 leading-relaxed pr-4">
              Cuidando da saúde da nossa comunidade com dedicação, tecnologia e acolhimento humano.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="font-bold text-white text-lg mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-amber-400 rounded-full inline-block"></span>
              Links Rápidos
            </h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/sobre" className="hover:text-amber-400 hover:translate-x-1 inline-block transition-all">Sobre a UBS</Link></li>
              <li><Link to="/projetos" className="hover:text-amber-400 hover:translate-x-1 inline-block transition-all">Projetos Comunitários</Link></li>
              <li><Link to="/horta" className="hover:text-amber-400 hover:translate-x-1 inline-block transition-all">Nossa Horta Medicinal</Link></li>
              <li><Link to="/publicacoes" className="hover:text-amber-400 hover:translate-x-1 inline-block transition-all">Publicações e Guias</Link></li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-bold text-white text-lg mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-amber-400 rounded-full inline-block"></span>
              Contato
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <div className="bg-emerald-900 p-2 rounded-lg">
                  <Phone className="w-4 h-4 text-amber-400" />
                </div>
                <span>(61) 3475-2912</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-emerald-900 p-2 rounded-lg">
                  <Mail className="w-4 h-4 text-amber-400" />
                </div>
                <span>contato@ubs8taguatinga.gov.br</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-emerald-900 p-2 rounded-lg shrink-0">
                  <MapPin className="w-4 h-4 text-amber-400" />
                </div>
                <span className="leading-relaxed">QNL 24 - Taguatinga Norte <br /> Brasília - DF, 72161-409</span>
              </li>
            </ul>
          </div>

          {/* Horário */}
          <div>
            <h4 className="font-bold text-white text-lg mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-amber-400 rounded-full inline-block"></span>
              Horário de Atendimento
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <div className="bg-emerald-900 p-2 rounded-lg shrink-0">
                  <Clock className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <span className="block font-semibold text-white mb-1">Segunda a Sexta</span>
                  <span className="text-emerald-200/80">07:00 às 19:00</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-emerald-900 p-2 rounded-lg shrink-0">
                  <Clock className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <span className="block font-semibold text-white mb-1">Sábado</span>
                  <span className="text-emerald-200/80">08:00 às 12:00</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-emerald-800/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-emerald-400/80">
          <p>©2026 Dylan Portela Cavalcante.</p>
          

          <div className="flex items-center gap-2">
            <p>Documentação do projeto pode ser encontrada em:</p>
            <a 
              href="https://github.com/dylancavalcante/UBS8_TAGUATINGA" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-medium transition-colors"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-4 h-4"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.5-1.4 6.5-7a4.6 4.6 0 0 0-1.39-3.2 4.2 4.2 0 0 0-.1-3.22s-1.14-.36-3.34 1.14a11.02 11.02 0 0 0-6-.1c-2.2-1.5-3.34-1.14-3.34-1.14a4.2 4.2 0 0 0-.1 3.22A4.6 4.6 0 0 0 3 8.98c0 5.6 3.35 6.65 6.5 7A4.8 4.8 0 0 0 8.5 19v3"></path>
              </svg>
              GitHub
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;