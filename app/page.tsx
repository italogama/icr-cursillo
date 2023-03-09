'use client';
import React, { useEffect, useRef, useState } from 'react';
import { v4 } from 'uuid';
import Image from 'next/image';
import Swal from 'sweetalert2';
import logoCursilho from '../public/images/logoCursilho.png';
import Link from 'next/link';
import BaseLayout from './baseLayout';

function Home() {
  return (
    <>
      <BaseLayout>
        <div className="flex flex-row justify-center items-center">
          <Image
            alt="Vercel logo"
            src={logoCursilho}
            width={100}
            height={50}
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />

          <label className="block uppercase tracking-wide text-gray-900 text-3xl mt-2 text-center">
            Cursilho Masculino
          </label>

          <Image
            alt="Vercel logo"
            src={logoCursilho}
            width={100}
            height={50}
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </div>

        <article className="prose lg:prose-lg bg-white rounded-md p-2">
          <p className="text-black font-thin">
            Caros irmãos e irmãs em Cristo, É com grande alegria que anunciamos
            mais uma edição do Cursilho de Cristandade realizado pela Igreja
            Cristã em Recife. Uma experiência espiritual que tem transformado a
            vida de muitos cristãos ao redor do mundo. <br></br>O Cursilho é um
            movimento que nasceu na Espanha, em meados do século XX, e se
            espalhou por diversos países, incluindo o Brasil. Ele tem como
            objetivo proporcionar um encontro pessoal com Jesus Cristo e
            fortalecer a fé dos participantes. Esse movimento é aberto a
            cristãos de todas as denominações, e por isso pode ser uma
            oportunidade única para conhecermos irmãos e irmãs de outras igrejas
            e enriquecermos nossa fé com as diferentes experiências e visões de
            mundo.<br></br>
            Por isso, queridos irmãos e irmãs, convidamos a TODOS os homens a
            participarem dessa experiência transformadora. Que possamos juntos
            fortalecer nossa fé e nossa comunhão em Cristo.
            <br></br>
            Que a paz de Cristo esteja conosco sempre!
          </p>
        </article>

        <div className="flex flex-col mt-4 justify-center gap-4 text-center mb-4 items-center">
          <Link
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-center w-52"
            href="/subscribe"
          >
            Realizar inscrição
          </Link>

          <p className="text-center font-bold">
            Já realizou a sua inscrição antes <br></br> mas não realizou o
            pagamento?
          </p>
          <Link
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full text-center w-52"
            href="/payment"
          >
            Realizar Pagamento
          </Link>
        </div>
      </BaseLayout>
    </>
  );
}

export default Home;
