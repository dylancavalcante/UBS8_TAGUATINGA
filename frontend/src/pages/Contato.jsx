import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import Banner from '../components/Banner';
import ubs8_banner from '../assets/ubs8_banner.png';


const Contato = () => {
  return (
    <main>
      <Banner
        title="Entre em Contato"
        image={ubs8_banner}
        subtitle="Estamos aqui para ajudar. Visite nossa unidade ou entre em contato pelos nossos canais de atendimento."
      />

      <section className="py-16 bg-neutral-50">
        <div className="container-ubs">
          {/* Centralizamos o conteúdo usando max-w-3xl e mx-auto */}
          <div className="max-w-3xl mx-auto space-y-8">
            
            {/* Informações de Contato */}
            <div className="card">
              <h2 className="text-xl font-bold text-neutral-900 mb-8 text-center">Informações de Contato</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary-500" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">Endereço</p>
                    <p className="text-neutral-600">Taguatinga Norte QNL 24</p>
                    <p className="text-neutral-600">Taguatinga, Brasília - DF, 72161-409</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-secondary-500" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">Telefone</p>
                    <p className="text-neutral-600">(61) 3475-2912</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">E-mail</p>
                    <p className="text-neutral-600">contatoficticio@algo.gov.br</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">Horário de Funcionamento</p>
                    <p className="text-neutral-600">Segunda a Sexta: 07h às 19h</p>
                    <p className="text-neutral-600">Sábado: 08h às 12h</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mapa */}
            <div className="card p-0 overflow-hidden">
              <iframe 
                src="https://maps.google.com/maps?q=UBS%208%20Taguatinga&t=&z=16&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="384"
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa da UBS 8 de Taguatinga"
                className="w-full"
              ></iframe>
            </div>
            
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contato;