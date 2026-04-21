export const socialActions = {
  // Envia uma mensagem personalizada
  sendWhatsApp: (message: string = "Olá! Gostaria de fazer um orçamento com a OM Madeiras.") => {
    const phone = "5512996141491"; // COLOQUE SEU NÚMERO AQUI
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  },

  // Direciona para o perfil do Insta
  goToInstagram: () => {
    window.open(`https://instagram.com/o.m_marcenaria`, "_blank");
  }
};