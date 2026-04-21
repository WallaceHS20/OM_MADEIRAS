import React from 'react';
import { Button } from 'primereact/button';
import { socialActions } from '@/utils/CallActions';
import imageContact from "@/assets/mesa.jpeg"

export const ContactCTA: React.FC = () => {

  return (
    <section className="contact-section border-round-xl my-6">
      <div className="contact-card">
        
        {/* Imagem Retrato substituindo o ícone */}
        <img 
            src={imageContact} 
            alt="Nosso trabalho" 
            className="contact-portrait-img" 
        />

        <h2 className="contact-title">Pronto para tirar seu projeto do papel?</h2>
        <p className="contact-subtitle text-lg">
          Seja para sua casa ou estabelecimento, a <strong>OM Madeiras</strong> entrega o melhor acabamento.
        </p>

        <div className="flex flex-column md:flex-row justify-content-center gap-3">
          {/* Botão WhatsApp */}
          <Button 
            label="Chamar no WhatsApp" 
            icon="pi pi-whatsapp" 
            severity="success" 
            className="px-5 py-3 font-bold shadow-2 w-full md:w-auto"
            onClick={() => socialActions.sendWhatsApp()}
          />

          {/* Botão Instagram */}
          <Button 
            label="Siga no Instagram" 
            icon="pi pi-instagram" 
            style={{ background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', border: 'none' }}
            className="px-5 py-3 font-bold shadow-2 w-full md:w-auto"
            onClick={() => socialActions.goToInstagram()}
          />
        </div>
      </div>
    </section>
  );
};