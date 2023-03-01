import React from 'react';

function Home() {
  return (
    <>
      <div className="h-screen flex bg-black">
        <div
          className="hidden lg:flex w-full lg:w-1/2 login_img_section
          justify-around items-center"
        >
          <div className="w-full mx-auto px-20 flex-col items-center space-y-6">
            <h1 className="text-white font-bold text-4xl font-sans">
              Cursilho de Cristantade
            </h1>
            <p className="text-white mt-1">Igreja Cristã em Recife</p>
            <div className="flex justify-center lg:justify-start mt-6">
              <a
                href="#"
                className="hover:bg-indigo-700 hover:text-white hover:-translate-y-1 transition-all duration-500 bg-white text-indigo-800 mt-4 px-4 py-2 rounded-2xl font-bold mb-2"
              >
                Conheça a Igreja
              </a>
            </div>
          </div>
        </div>
        <div className="flex w-full lg:w-1/2 justify-center items-center bg-black space-y-8">
          <div className="w-full px-4 md:px-32 lg:px-24 py-10 h-screen">
            <form className="w-full max-w-lg h-full overflow-y-scroll scrollbar-hide px-3 bg-gray-400 border rounded-lg pt-5">
              <label className="block uppercase tracking-wide text-gray-900 text-3xl font-mono mb-2 text-center">
                Ficha de Inscrição
              </label>

              <div className="flex flex-wrap -mx-3 p-3">
                <div className="w-full px-3 bg-white rounded-md border border-red-500">
                  <label className="block uppercase tracking-wide text-red-500 text-base font-bold mb-2 text-center">
                    LEIA COM ATENÇÃO
                  </label>
                  <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">
                    1) - O Cursilho destina-se a pessoas capazes de:
                  </label>
                  <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                    * Captar a mensagem CRISTÃ e comprometer-se;
                    <br></br>* Descobrir seus dons e pô-los a serviço da
                    comunidade;
                    <br></br>* Ser fermento do EVANGELHO em seus ambientes;{' '}
                    <br></br>* Demonstrar inquietação social.
                  </label>
                  <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">
                    2) - O Preenchimento desta ficha NÃO implica na aceitação
                    imediata e consequente participação
                  </label>
                  <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">
                    3) - PREENCHA TODOS OS CAMPOS ABAIXO COM ATENÇÃO
                  </label>
                </div>
              </div>

              <div className="flex flex-wrap -mx-3">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Nome Completo:
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    placeholder="Fulano da Silva Santos"
                  />
                </div>
              </div>

              <div className="flex flex-row -mx-3">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Data de Nascimento
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="date"
                    placeholder="Fulano da Silva Santos"
                  />
                </div>
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Estado Civil
                  </label>
                  <div className="relative">
                    <select
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-state"
                    >
                      <option>Solteiro(a)</option>
                      <option>Casado(a)</option>
                      <option>Separado(a)</option>
                      <option>Divorciado(a)</option>
                      <option>Viúvo(a)</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-row -mx-3">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    CPF
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    placeholder="xxx.xxx.xxx-xx"
                  />
                </div>
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Taman. Camisa
                  </label>
                  <div className="relative">
                    <select
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-state"
                    >
                      <option>P</option>
                      <option>M</option>
                      <option>G</option>
                      <option>GG</option>
                      <option>XG</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-row -mx-3">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Rua
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    placeholder="Fulano da Silva Santos"
                  />
                </div>
                <div className="w-36 px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Número
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    placeholder="N"
                  />
                </div>
              </div>

              <div className="flex flex-row -mx-3">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Bairro
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    placeholder="Fulano da Silva Santos"
                  />
                </div>
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Cidade
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    placeholder="N"
                  />
                </div>
              </div>

              <div className="flex flex-row -mx-3">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Tel. Res.
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    placeholder="Fulano da Silva Santos"
                  />
                </div>
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Tel. Com.
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    placeholder="N"
                  />
                </div>
              </div>

              <div className="flex flex-row -mx-3">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Celular:
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    placeholder="Fulano da Silva Santos"
                  />
                </div>
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Celular 2:
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    placeholder="N"
                  />
                </div>
              </div>

              <p className="text-gray-900 font-bold text-center bg-white rounded-md border border-red-500">
                Indique o Nome e Telefone do cônjugue ou/e Parente ou/e amigo
                próximo<br></br> (2 opções de telefone)
              </p>

              <div className="flex flex-row -mx-3 mt-3">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Nome
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    placeholder="Fulano da Silva Santos"
                  />
                </div>
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Tel. Fixo/Celular:
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    placeholder="N"
                  />
                </div>
              </div>

              <div className="flex flex-row -mx-3">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Nome:
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    placeholder="Fulano da Silva Santos"
                  />
                </div>
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Tel. Fixo/Celular:
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    placeholder="N"
                  />
                </div>
              </div>

              <p className="text-gray-900 font-bold text-center bg-white rounded-md border border-red-500">
                SITUAÇÃO ALIMENTAR E DE SAÚDE
              </p>

              <div className="flex flex-wrap -mx-3 mt-4">
                <div className="flex flex-row -mx-3 gap-4 ml-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-center pt-4">
                    Faz dieta prescrita por médico?
                  </label>
                  <div className="relative">
                    <select
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-state"
                    >
                      <option>Não</option>
                      <option>Sim</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Especifique:
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    placeholder="Especificar"
                  />
                </div>
              </div>

              <div className="flex flex-wrap -mx-3">
                <div className="flex flex-row -mx-3 gap-4 ml-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-center pt-4">
                    Tem problema de Saúde?
                  </label>
                  <div className="relative">
                    <select
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-state"
                    >
                      <option>Não</option>
                      <option>Sim</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Especifique:
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    placeholder="Especificar"
                  />
                </div>
              </div>

              <div className="flex flex-wrap -mx-3">
                <div className="flex flex-row -mx-3 gap-4 ml-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-center pt-4">
                    Usa Medicação ou é Alérgico?
                  </label>
                  <div className="relative">
                    <select
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-state"
                    >
                      <option>Não</option>
                      <option>Sim</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Especifique:
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    placeholder="Especificar"
                  />
                </div>
              </div>

              <p className="text-gray-900 font-bold text-center bg-white rounded-md border border-red-500">
                ASSINATURA
              </p>

              <div className="flex flex-wrap -mx-3 p-3 gap-2">
                <div className="w-full px-3 bg-white rounded-md">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold m-2">
                    Eu, Ítalo Florêncio da Gama reafirmo todos os dados por mim
                    citados acima, responsabilizando-me pela ida ao Movimento
                    Cursilhista nos dias: 00/00/0000 a 00/00/0000, e procurar a
                    Secretaria do Cursilho a fim de confirmar minha presença
                    efetuando o pagamento da taxa no valor de R$1000 reais, ou
                    na entrega deste formulário preenchido 50% do valor e o
                    restante em até 5(cinco) dias antes do Cursilho.
                  </label>
                </div>
                <div className="flex flex-row justify-between w-full gap-5">
                  <div className="w-full">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Data da Assinatura
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      type="date"
                      placeholder="Fulano da Silva Santos"
                    />
                  </div>
                  <div className="w-full">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Assinatura
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      type="text"
                      placeholder="Fulano da Silva Santos"
                    />
                  </div>
                </div>
              </div>

              <p className="text-gray-900 font-bold text-center bg-white rounded-md border border-red-500">
                ESPAÇO RESERVADO PARA PREENCHIMENTO EXCLUSIVO POR QUEM O
                CONVIDOU
              </p>

              <div className="flex flex-wrap -mx-3 mt-3">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Nome Completo:
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    placeholder="Fulano da Silva Santos"
                  />
                </div>
              </div>

              <div className="flex flex-row -mx-3">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Fone:
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    placeholder="Fulano da Silva Santos"
                  />
                </div>
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Ja Fez Cursilho?
                  </label>
                  <div className="relative">
                    <select
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-state"
                    >
                      <option>Não</option>
                      <option>Sim</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap -mx-3">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Por que apresenta este (a) candidato (a)?
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    placeholder="Fulano da Silva Santos"
                  />
                </div>
              </div>

              <div className="flex flex-row -mx-3">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Está abençoando com o valor da Taxa?
                  </label>
                  <div className="relative">
                    <select
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-state"
                    >
                      <option>Não</option>
                      <option>Sim</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-row justify-between w-full gap-5 mt-3">
                <div className="w-full">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Acertado com:
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    placeholder="Fulano da Silva Santos"
                  />
                </div>
                <div className="w-full">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Data Limite:
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="date"
                    placeholder="Fulano da Silva Santos"
                  />
                </div>
              </div>

              <div className="flex justify-center mb-5">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                  Confirmar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
