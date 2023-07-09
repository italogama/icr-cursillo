import Link from 'next/link';
import BaseLayout from '../../app/baseLayout';
import logoCursilho from '../../public/images/logoCursilho.png';
import Image from 'next/image';
import { useState } from 'react';
import Swal from 'sweetalert2';
import classNames from 'classnames';

export default function Success() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const env = process.env.NEXT_PUBLIC_CURSILHO_ENV;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await fetch('/api/checkEmail', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.data === 'USER_NOT_FOUND') {
        setIsLoading(false);
        Swal.fire({
          title: 'Erro!',
          text: 'O email informado não existe no sistema!',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      } else if (data.data === 'USER_PAYED_ALREADY') {
        setIsLoading(false);
        Swal.fire({
          title: 'Erro!',
          text: 'O email informado já realizou o pagamento!',
          icon: 'warning',
          confirmButtonText: 'Ok',
        });
      } else {
        const mercadopago = await fetch('/api/mercadopago', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        const url = await mercadopago.json();
        window.location.replace(url.data);
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
          <h1 className="text-center pt-10 font-roboto">
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
                LEIA COM ATENÇÃO
              </label>
              <label className="block tracking-wide text-gray-700 text-sm font-bold mb-2">
                Se você está nessa página, pressupomos que você já fez o seu
                cadastro anteriormente mas{' '}
                <a className="text-red-500 font-bold no-underline">NÃO</a>{' '}
                realizou o pagamento.
              </label>
              <label className="block tracking-wide text-red-500 text-sm font-bold mb-2 text-center">
                SÓ PROSSIGA SE VOCÊ JÁ FEZ O CADASTRO ANTERIORMENTE E NÃO
                REALIZOU O PAGAMENTO.
              </label>
            </div>
          </div>

          <div className="flex flex-wrap -mx-3">
            <div className="w-full px-3">
              <label className="block tracking-wide text-white text-sm font-bold mb-2 text-center animate-bounce bg-red-500 rounded-md mt-3">
                ATENÇÃO: Você deve informar o MESMO email que você utilizou no
                cadastro pois é nele que será validado que você realizou o
                pagamento
              </label>
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Email
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="email"
                placeholder={
                  env === 'MASC' ? 'fulaninho@gmail.com' : 'fulaninha@gmail.com'
                }
                onChange={e => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
          </div>
          <div className="flex flex-row justify-center">
            <button
              className={classNames(
                'text-white font-bold py-2 px-4 rounded-full text-sm',
                {
                  'bg-blue-500 hover:bg-blue-700': env === 'MASC',
                  'bg-pink-500 hover:bg-pink-700': env === 'FEM',
                },
              )}
              type="submit"
              disabled={isLoading}
            >
              {!isLoading ? (
                'Confirmar'
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
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full text-center text-sm"
          href="/"
        >
          Voltar para a página inicial
        </Link>
      </div>
    </BaseLayout>
  );
}
