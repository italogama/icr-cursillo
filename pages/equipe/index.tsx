import Link from 'next/link';
import BaseLayout from '../../app/baseLayout';
import logoCursilho from '../../public/images/logoCursilho.png';
import Image from 'next/image';
import { useState } from 'react';
import Swal from 'sweetalert2';

export default function Equipe() {
  const [name, setName] = useState('');
  const [paymentType, setPaymentType] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const env = process.env.NEXT_PUBLIC_CURSILHO_ENV;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const response = await fetch('/api/mercadopagoequipe', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, paymentType }),
      });

      const data = await response.json();

      if (data.data === 'USER_NOT_FILLED') {
        setIsLoading(false);
        Swal.fire({
          title: 'Erro!',
          text: 'O nome completo deve ser informado!',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      } else {
        window.location.replace(data.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <BaseLayout>
      <article className="prose lg:prose-lg">
        <div className="flex flex-row">
          <h1 className="text-center pt-10">
            {env === 'MASC' ? 'Cursilho Masculino' : 'Cursilho Feminino'}
          </h1>
          <Image
            alt="Vercel logo"
            src={logoCursilho}
            width={100}
            height={100}
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-3 p-3">
            <div className="w-full px-3 bg-white rounded-md border border-red-500">
              <label className="block tracking-wide text-red-500 text-base font-bold mb-2 mt-3 text-center">
                ATENÇÃO
              </label>
              <label className="block tracking-wide text-gray-700 text-sm font-bold mb-2">
                Se você está nessa página, pressupomos que você faz parte da
                Equipe do Cursilho Masculino de 2023 da Igreja Cristã em Recife,
                e está aqui para realizar o seu pagamento.
              </label>
              <label className="block tracking-wide text-red-500 text-sm font-bold mb-2 text-center">
                SÓ PROSSIGA SE VOCÊ FAZ PARTE DA EQUIPE
              </label>
            </div>
          </div>

          <div className="flex flex-wrap -mx-3">
            <div className="w-full px-3">
              <label className="block tracking-wide text-white text-sm font-bold mb-2 text-center animate-bounce bg-red-500 rounded-md mt-3">
                ATENÇÃO: Você deve informar o seu nome completo para constar que
                o pagamento foi feito por você.
              </label>
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Nome completo
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="Seu nome aqui"
                onChange={e => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Tipo de pagamento
              </label>
              <select
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                name="select"
                onChange={e => setPaymentType(Number(e.target.value))}
                value={paymentType}
              >
                <option value={1}>Taxa + Camisa R$: 310,00</option>
                <option value={2}>Apenas Taxa R$: 270,00</option>
                <option value={3}>Apenas Camisa R$: 40,00</option>
              </select>
            </div>
          </div>
          <div className="flex flex-row justify-center">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded-full"
              type="submit"
              disabled={isLoading}
            >
              {!isLoading ? (
                'Realizar pagamento'
              ) : (
                <div className="flex flex-row gap-2 items-center">
                  Processando...
                  <svg
                    aria-hidden="true"
                    className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                </div>
              )}
            </button>
          </div>
        </form>
      </article>

      <div className="flex flex-col mt-4 justify-center gap-4 text-center mb-4 items-center">
        <Link
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-center"
          href="/"
        >
          Voltar para a página inicial
        </Link>
      </div>
    </BaseLayout>
  );
}
