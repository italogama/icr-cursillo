import { NextApiRequest, NextApiResponse } from 'next';
const mercadopago = require('mercadopago');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const body = req.body;

  if (!body.name) {
    return res.status(400).json({ data: 'USER_NOT_FILLED' });
  }

  mercadopago.configure({
    access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN,
  });

  const getReference = () => {
    console.log(req.body);
    if (req.body.paymentType === 1) {
      let preference = {
        items: [
          {
            title: 'Cursilho ICR - EQUIPE - Taxa + Camisa',
            description:
              'Pagamento da Equipe do Cursilho de Cristandade da Igreja Cristã em Recife',
            unit_price: 360,
            quantity: 1,
          },
        ],
        payer: {
          name: body.name,
        },
      };
      return preference;
    }
    if (req.body.paymentType === 2) {
      let preference = {
        items: [
          {
            title: 'Cursilho ICR - EQUIPE - Apenas Taxa',
            description:
              'Pagamento da Equipe do Cursilho de Cristandade da Igreja Cristã em Recife',
            unit_price: 320,
            quantity: 1,
          },
        ],
        payer: {
          name: body.name,
        },
      };
      return preference;
    }

    if (req.body.paymentType === 3) {
      let preference = {
        items: [
          {
            title: 'Cursilho ICR - EQUIPE - Apenas Camisa',
            description:
              'Pagamento da Equipe do Cursilho de Cristandade da Igreja Cristã em Recife',
            unit_price: 45,
            quantity: 1,
          },
        ],
        payer: {
          name: body.name,
        },
      };
      return preference;
    }
  };

  const reference = getReference();

  mercadopago.preferences
    .create(reference)
    .then(function (response: any) {
      return res.status(200).json({ data: response.body.init_point });
    })
    .catch(function (error: any) {
      console.log(error);
    });
}
