'use client';
import React, { useEffect, useRef, useState } from 'react';
// import { storage } from '../lib/firebase';
// import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';

import SignaturePad from 'react-signature-canvas';

function Home() {
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [civilStatus, setCivilStatus] = useState('');
  const [cpf, setCpf] = useState('');
  const [shirtSize, setShirtSize] = useState('');
  const [street, setStreet] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [residentalPhone, setResidentalPhone] = useState('');
  const [comercialPhone, setComercialPhone] = useState('');
  const [cellPhone, setCellPhone] = useState('');
  const [cellPhone2, setCellPhone2] = useState('');
  const [nameParent, setNameParent] = useState('');
  const [phoneParent, setPhoneParent] = useState('');
  const [nameParent2, setNameParent2] = useState('');
  const [phoneParent2, setPhoneParent2] = useState('');
  const [diet, setDiet] = useState('');
  const [dietSpecification, setDietSpecification] = useState('');
  const [healthIssues, setHealthIssues] = useState('');
  const [healthIssuesSpecification, setHealthIssuesSpecification] =
    useState('');
  const [alergyMedication, setAlergyMedication] = useState('');
  const [alergyMedicationSpecification, setAlergyMedicationSpecification] =
    useState('');
  const [signatureDate, setSignatureDate] = useState(
    new Date().toLocaleDateString(),
  );

  const [signature, setSignature] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [cursillo, setCursillo] = useState('');

  const [signatureUrl, setSignatureUrl] = useState('');
  const [signatureImage, setSignatureImage] = useState<File | null>(null);

  const sigPadRef = useRef<SignaturePad | null>(null);
  const [trimmedDataURL, setTrimmedDataURL] = useState<string | null>(null);

  const handleSaveSignature = (signature: string) => {
    setTrimmedDataURL(signature);
  };

  const handleTrim = () => {
    if (sigPadRef.current) {
      const signature = sigPadRef.current
        .getTrimmedCanvas()
        .toDataURL('image/png');
      setTrimmedDataURL(signature);
      console.log(trimmedDataURL);
      return signature;
    }
  };

  const handleClear = () => {
    if (sigPadRef.current) {
      sigPadRef.current.clear();
    }
  };

  // const uploadSignature = async (image: File | null) => {
  //   if (image == null) return;
  //   const imageRef = ref(storage, `images/${image.name}`);
  //   await uploadBytes(imageRef, image);
  //   const url = await getDownloadURL(imageRef);
  //   return url;
  // };

  useEffect(() => {
    setSignatureDate(new Date().toISOString().substr(0, 10));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const opa = handleTrim();

    console.log(opa);
    //onSave(trimmedDataURL);

    // const form = {
    //   fullName,
    //   birthDate,
    //   civilStatus,
    //   cpf,
    //   shirtSize,
    //   street,
    //   streetNumber,
    //   neighborhood,
    //   city,
    //   residentalPhone,
    //   comercialPhone,
    //   cellPhone,
    //   cellPhone2,
    //   nameParent,
    //   phoneParent,
    //   nameParent2,
    //   phoneParent2,
    //   diet,
    //   dietSpecification,
    //   healthIssues,
    //   healthIssuesSpecification,
    //   alergyMedication,
    //   alergyMedicationSpecification,
    //   signatureDate,
    //   signature,
    //   guestName,
    //   guestPhone,
    //   cursillo,
    // };

    // console.log(form);

    // const response = await fetch('/api/submit', {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(form),
    // });

    // const content = await response.json();

    // alert(content.data.tableRange);
  };

  const handleCpfKeyPress = (e: any) => {
    const value = e.target.value.replace(/\D/g, '');
    const cpfRegex = /^([\d]{0,3})([\d]{0,3})([\d]{0,3})([\d]{0,2})$/;
    const cpfMask = value.replace(cpfRegex, '$1.$2.$3-$4');
    setCpf(cpfMask);
  };

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
            <form
              className="w-full max-w-lg h-full overflow-y-scroll scrollbar-hide px-3 bg-gray-400 border rounded-lg pt-5"
              onSubmit={handleSubmit}
            >
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
                    onChange={e => setFullName(e.target.value)}
                    required
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
                    onChange={e => setBirthDate(e.target.value)}
                    required
                  />
                </div>
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Estado Civil
                  </label>
                  <div className="relative">
                    <select
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      onChange={e => setCivilStatus(e.target.value)}
                      required
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
                    onChange={e => handleCpfKeyPress(e)}
                    value={cpf}
                    required
                  />
                </div>
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Taman. Camisa
                  </label>
                  <div className="relative">
                    <select
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      onChange={e => setShirtSize(e.target.value)}
                      required
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
                    onChange={e => setStreet(e.target.value)}
                    required
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
                    onChange={e => setStreetNumber(e.target.value)}
                    required
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
                    onChange={e => setNeighborhood(e.target.value)}
                    required
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
                    onChange={e => setCity(e.target.value)}
                    required
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
                    onChange={e => setResidentalPhone(e.target.value)}
                    required
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
                    onChange={e => setComercialPhone(e.target.value)}
                    required
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
                    onChange={e => setCellPhone(e.target.value)}
                    required
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
                    onChange={e => setCellPhone2(e.target.value)}
                    required
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
                    onChange={e => setNameParent(e.target.value)}
                    required
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
                    onChange={e => setPhoneParent(e.target.value)}
                    required
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
                    onChange={e => setNameParent2(e.target.value)}
                    required
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
                    onChange={e => setPhoneParent2(e.target.value)}
                    required
                  />
                </div>
              </div>

              <p className="text-gray-900 font-bold text-center bg-white rounded-md border border-red-500">
                SITUAÇÃO ALIMENTAR E DE SAÚDE
              </p>

              <div className="flex flex-wrap -mx-3 mt-4">
                <div className="flex flex-row -mx-3 gap-4 ml-3 mb-2">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-center pt-4">
                    Faz dieta prescrita por médico?
                  </label>
                  <div className="relative">
                    <select
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      onChange={e => setDiet(e.target.value)}
                      required
                    >
                      <option defaultValue="Não">Não</option>
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
                {diet === 'Sim' ? (
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Especifique:
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      type="text"
                      placeholder="Especificar"
                      onChange={e => setDietSpecification(e.target.value)}
                      required
                    />
                  </div>
                ) : (
                  ''
                )}
              </div>

              <div className="flex flex-wrap -mx-3">
                <div className="flex flex-row -mx-3 gap-4 ml-3 mb-2">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-center pt-4">
                    Tem problema de Saúde?
                  </label>
                  <div className="relative">
                    <select
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      onChange={e => setHealthIssues(e.target.value)}
                      required
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
                {healthIssues === 'Sim' ? (
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Especifique:
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      type="text"
                      placeholder="Especificar"
                      onChange={e =>
                        setHealthIssuesSpecification(e.target.value)
                      }
                      required
                    />
                  </div>
                ) : (
                  ''
                )}
              </div>

              <div className="flex flex-wrap -mx-3">
                <div className="flex flex-row -mx-3 gap-4 ml-3 mb-2">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-center pt-4">
                    Usa Medicação ou é Alérgico?
                  </label>
                  <div className="relative">
                    <select
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      onChange={e => setAlergyMedication(e.target.value)}
                      required
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
                {alergyMedication === 'Sim' ? (
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Especifique:
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      type="text"
                      placeholder="Especificar"
                      onChange={e =>
                        setAlergyMedicationSpecification(e.target.value)
                      }
                      required
                    />
                  </div>
                ) : (
                  ''
                )}
              </div>

              <p className="text-gray-900 font-bold text-center bg-white rounded-md border border-red-500">
                ASSINATURA
              </p>

              <div className="flex flex-wrap -mx-3 p-3 gap-2">
                <div className="w-full px-3 bg-white rounded-md">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold m-2">
                    Eu, {fullName ? fullName : 'Seu nome aqui'} reafirmo todos
                    os dados por mim citados acima, responsabilizando-me pela
                    ida ao Movimento Cursilhista nos dias: 13/04/2022 a
                    16/04/2022, e procurar a Secretaria do Cursilho a fim de
                    confirmar minha presença efetuando o pagamento da taxa no
                    valor de R$300 reais, ou na entrega deste formulário
                    preenchido 50% do valor e o restante em até 5(cinco) dias
                    antes do Cursilho.
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
                      value={signatureDate}
                      onChange={e => setSignatureDate(e.target.value)}
                      required
                    />
                  </div>
                  {/* <div className="w-full">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Assinatura
                    </label> */}
                  {/* <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      type="text"
                      placeholder="Fulano da Silva Santos"
                      onChange={e => setSignature(e.target.value)}
                      required
                    /> */}
                  {/* </div> */}
                </div>
                <div className="w-full">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Assinatura
                  </label>

                  <div className="">
                    <div className="border-2 border-black">
                      <SignaturePad
                        canvasProps={{
                          width: 500,
                          height: 200,
                          className: 'sigCanvas',
                        }}
                        ref={sigPadRef}
                      />
                    </div>
                    <div className="flex flex-row justify-end mt-2">
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                        onClick={handleClear}
                      >
                        Limpar
                      </button>
                    </div>
                  </div>
                  {/* <div className="border-2 border-black">
                    <SignatureCanvas
                      penColor="black"
                      
                      canvasProps={{
                        width: 500,
                        height: 200,
                        className: 'sigCanvas',
                      }}
                    />
                  </div> */}
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
                    onChange={e => setGuestName(e.target.value)}
                    required
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
                    onChange={e => setGuestPhone(e.target.value)}
                    required
                  />
                </div>
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Ja Fez Cursilho?
                  </label>
                  <div className="relative">
                    <select
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      onChange={e => setCursillo(e.target.value)}
                      required
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
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  type="submit"
                >
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
