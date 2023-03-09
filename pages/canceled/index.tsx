import Link from 'next/link';
import BaseLayout from '../../app/baseLayout';
import logoCursilho from '../../public/images/logoCursilho.png';
import Image from 'next/image';

export default function Success() {
  return (
    <BaseLayout>
      <article className="prose lg:prose-lg">
        <div className="flex flex-row">
          <h1 className="text-center pt-10">Cursilho Masculino</h1>
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
        <div className="items-center flex flex-col">
          <p className="text-white bg-red-500 rounded-md animate-bounce text-2xl">
            Cancelado!
          </p>
          <p>Seu Pagamento foi cancelado!</p>
        </div>
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
