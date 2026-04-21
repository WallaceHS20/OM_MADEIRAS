export const useWhatsApp = () => {
    const PHONE_NUMBER = '5512996141491';

    const sendBudgetRequest = (product: any, data: { quantity: number, hasVarnish: boolean, clientName: string }) => {
        const unitPrice = data.hasVarnish ? product.basePrice + 100 : product.basePrice;
        const totalPrice = unitPrice * data.quantity;

        const message = `Olá! Me chamo *${data.clientName}*.
Gostaria de um orçamento para:

- *Produto*: ${product.name}
- *Quantidade*: ${data.quantity} un.
- *Verniz*: ${data.hasVarnish ? 'Sim' : 'Não'}
- *Valor Unitário*: R$ ${unitPrice.toFixed(2)}
- *Total Estimado*: R$ ${totalPrice.toFixed(2)}

Aguardo retorno sobre disponibilidade e prazo!`;

        window.open(`https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
    };

    return { sendBudgetRequest };
};