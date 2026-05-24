import { Link } from 'react-router-dom';
// Você pode remover o 'Heart' daqui se não for usar em mais nenhum lugar no Footer
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-neutral-800 text-neutral-300">
      <div className="container-ubs py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              
              {/* --- AQUI ESTÁ A MUDANÇA: A tag img apontando para o public --- */}
              <img 
                src="/logo.png" 
                alt="Logo da UBS 8 de Taguatinga" 
                className="w-10 h-10 object-contain" 
              />
              {/* ----------------------------------------------------------- */}

              <span className="font-semibold text-white">UBS 8 de Taguatinga</span>
            </div>
            <p className="text-sm text-neutral-400">
              Cuidando da saúde da nossa comunidade com dedicação e qualidade.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="font-semibold text-white mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/sobre" className="hover:text-primary-400 transition-colors">Sobre a UBS</Link></li>
              <li><Link to="/projetos" className="hover:text-primary-400 transition-colors">Projetos</Link></li>
              <li><Link to="/horta" className="hover:text-primary-400 transition-colors">Horta Medicinal</Link></li>
              <li><Link to="/publicacoes" className="hover:text-primary-400 transition-colors">Publicações</Link></li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contato</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary-400" />
                <span>(61) 3475-2912</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary-400" />
                <span>contatoficticio@algo.gov.br</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary-400 mt-0.5" />
                <span>Taguatinga Norte QNL 24 <br /> Taguatinga, Brasília - DF, 72161-409</span>
              </li>
            </ul>
          </div>

          {/* Horário */}
          <div>
            <h4 className="font-semibold text-white mb-4">Horário de Funcionamento</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary-400" />
                <span>Segunda a Sexta</span>
              </li>
              <li className="pl-6">07:00 às 19:00</li>
              <li className="flex items-center gap-2 mt-2">
                <Clock className="w-4 h-4 text-primary-400" />
                <span>Sábado</span>
              </li>
              <li className="pl-6">08:00 às 12:00</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-700 mt-8 pt-8 text-center text-sm text-neutral-400">
          <p>©2025 Dylan Portela Cavalcante. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;