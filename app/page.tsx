'use client';
import React, { useEffect, useRef, useState } from 'react';
import { storage } from '../lib/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import SignaturePad from 'react-signature-canvas';
import Image from 'next/image';
import Swal from 'sweetalert2';
import logoCursilho from '../public/images/logoCursilho.png';
import { v4 } from 'uuid';

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
  const [residentialPhone, setResidentialPhone] = useState('');
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
  const [signatureUrl, setSignatureUrl] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestReason, setGuestReason] = useState('');
  const [guestAgreed, setGuestAgreed] = useState('');
  const [guestFee, setGuestFee] = useState('');
  const [guestDateDeadline, setGuestDeadline] = useState('');
  const [guestCursillo, setGuestCursillo] = useState('');

  const sigPadRef = useRef<SignaturePad | null>(null);
  const [trimmedDataURL, setTrimmedDataURL] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTrim = () => {
    if (sigPadRef.current?.isEmpty() === false) {
      const signature = sigPadRef.current
        .getTrimmedCanvas()
        .toDataURL('image/png');
      setTrimmedDataURL(signature);
      return signature;
    }
    return '';
  };

  const handleClearSignature = () => {
    if (sigPadRef.current) {
      sigPadRef.current.clear();
      setTrimmedDataURL('');
    }
  };

  const resetFields = () => {
    setFullName('');
    setBirthDate('');
    setCivilStatus('');
    setCpf('');
    setShirtSize('');
    setStreet('');
    setStreetNumber('');
    setNeighborhood('');
    setCity('');
    setResidentialPhone('');
    setComercialPhone('');
    setCellPhone('');
    setCellPhone2('');
    setNameParent('');
    setPhoneParent('');
    setNameParent2('');
    setPhoneParent2('');
    setDiet('');
    setDietSpecification('');
    setHealthIssues('');
    setHealthIssuesSpecification('');
    setAlergyMedication('');
    setAlergyMedicationSpecification('');
    setSignatureDate(new Date().toLocaleDateString());
    setSignatureUrl('');
    setGuestName('');
    setGuestPhone('');
    setGuestCursillo('');
    setGuestReason('');
    setGuestAgreed('');
    setGuestFee('');
    setGuestDeadline('');
    handleClearSignature();
  };

  const uploadSignature = async () => {
    const base64Signature = handleTrim();
    if (base64Signature === '') {
      Swal.fire({
        title: 'Error!',
        text: 'Você não deu sua assinatura! Por favor, é de suma importância que você faça.',
        icon: 'error',
        confirmButtonText: 'Voltar',
      });
      return 'ERROR';
    } else {
      const byteCharacters = atob(base64Signature.split(',')[1]);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'image/png' });
      const imageRef = ref(storage, `/signatures/${fullName}-${v4()}`);
      try {
        await uploadBytes(imageRef, blob);
        const url = await getDownloadURL(imageRef);
        setSignatureUrl(url);
        console.log('Signature uploaded successfully!');
        return url;
      } catch (error) {
        console.error('Error uploading signature: ', error);
        return false;
      }
    }
  };

  useEffect(() => {
    setSignatureDate(new Date().toISOString().substr(0, 10));
    setDiet('Não');
    setHealthIssues('Não');
    setAlergyMedication('Não');
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    const signatureStatus = await uploadSignature();

    if (signatureStatus === false) {
      Swal.fire({
        title: 'Error!',
        text: 'Ocorreu um erro ao salvar sua assinatura. tente novamente!',
        icon: 'error',
        confirmButtonText: 'Voltar',
      });
      setIsLoading(false);
    } else {
      const form = {
        fullName,
        birthDate,
        civilStatus,
        cpf,
        shirtSize,
        street,
        streetNumber,
        neighborhood,
        city,
        residentialPhone,
        comercialPhone,
        cellPhone,
        cellPhone2,
        nameParent,
        phoneParent,
        nameParent2,
        phoneParent2,
        diet,
        dietSpecification: diet === 'Sim' ? dietSpecification : 'Nenhum',
        healthIssues,
        healthIssuesSpecification:
          healthIssues === 'Sim' ? healthIssuesSpecification : 'Nenhum',
        alergyMedication,
        alergyMedicationSpecification:
          alergyMedication === 'Sim' ? alergyMedicationSpecification : 'Nenhum',
        signatureDate,
        signatureUrl: signatureStatus,
        guestName,
        guestPhone,
        guestCursillo,
        guestReason,
        guestAgreed,
        guestFee,
        guestDateDeadline,
      };

      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      console.log(response);

      const content = await response.json();

      Swal.fire({
        title: 'Sucesso!!',
        text: 'Parabéns você realizou o seu cadastro! Agora é só aguardar o nosso contato!',
        icon: 'success',
        confirmButtonText: 'Ok',
      });

      setIsLoading(false);
      resetFields();
    }
  };

  const handleCpfKeyPress = (e: any) => {
    const value = e.target.value.replace(/\D/g, '');
    const cpfRegex = /^([\d]{0,3})([\d]{0,3})([\d]{0,3})([\d]{0,2})$/;
    const cpfMask = value.replace(cpfRegex, '$1.$2.$3-$4');
    setCpf(cpfMask);
  };

  function formatPhoneNumber(phoneNumber: string) {
    return phoneNumber
      .replace(/\D/g, '')
      .replace(/^(\d{2})\B/, '($1) ')
      .replace(/(\d{1})?(\d{4})(\d{4})/, '$1$2-$3');
  }

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
                href="https://www.instagram.com/igrejacristaemrecife/"
                target="_blank"
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

                <label className="block uppercase tracking-wide text-gray-900 text-3xl font-mono mt-2 text-center">
                  Ficha de Inscrição
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

              <div className="flex flex-col items-center tracking-wide text-gray-900 text-base font-mono mt-2 md:hidden">
                <p>Cursilho de Cristandade </p>
                <p>Igreja Cristã em Recife</p>
                <div className="flex flex-row gap-2 underline">
                  <a
                    href="https://www.instagram.com/igrejacristaemrecife/"
                    target="_blank"
                  >
                    Conheça a Igreja!
                  </a>
                  <a
                    href="https://www.instagram.com/igrejacristaemrecife/"
                    target="_blank"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-7 w-7"
                      fill="currentColor"
                      color="red"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                </div>
              </div>

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
                    value={fullName}
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
                    value={birthDate}
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
                      value={civilStatus}
                    >
                      <option defaultValue=""></option>
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
                      value={shirtSize}
                      required
                    >
                      <option defaultValue={''}></option>
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
                    Endereço (Rua)
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    placeholder="Rua"
                    onChange={e => setStreet(e.target.value)}
                    value={street}
                    required
                  />
                </div>
                <div className="w-36 px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Número
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="number"
                    placeholder="Nº "
                    value={streetNumber}
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
                    placeholder="Bairro"
                    onChange={e => setNeighborhood(e.target.value)}
                    value={neighborhood}
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
                    placeholder="Cidade"
                    onChange={e => setCity(e.target.value)}
                    value={city}
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
                    maxLength={15}
                    placeholder="(xx) xxxxx-xxxx"
                    onChange={e =>
                      setResidentialPhone(formatPhoneNumber(e.target.value))
                    }
                    value={residentialPhone}
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
                    maxLength={15}
                    placeholder="(xx) xxxxx-xxxx"
                    onChange={e =>
                      setComercialPhone(formatPhoneNumber(e.target.value))
                    }
                    value={comercialPhone}
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
                    maxLength={15}
                    placeholder="(xx) xxxxx-xxxx"
                    onChange={e =>
                      setCellPhone(formatPhoneNumber(e.target.value))
                    }
                    value={cellPhone}
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
                    maxLength={15}
                    placeholder="(xx) xxxxx-xxxx"
                    onChange={e =>
                      setCellPhone2(formatPhoneNumber(e.target.value))
                    }
                    value={cellPhone2}
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
                    placeholder="Fulaninho"
                    onChange={e => setNameParent(e.target.value)}
                    value={nameParent}
                  />
                </div>
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Tel. Fixo/Celular:
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    maxLength={15}
                    placeholder="(xx) xxxxx-xxxx"
                    onChange={e =>
                      setPhoneParent(formatPhoneNumber(e.target.value))
                    }
                    value={phoneParent}
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
                    placeholder="Sicrano"
                    onChange={e => setNameParent2(e.target.value)}
                    value={nameParent2}
                  />
                </div>
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Tel. Fixo/Celular:
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    maxLength={15}
                    placeholder="(xx) xxxxx-xxxx"
                    onChange={e =>
                      setPhoneParent2(formatPhoneNumber(e.target.value))
                    }
                    value={phoneParent2}
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
                      value={diet}
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
                      value={dietSpecification}
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
                      value={healthIssues}
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
                      value={healthIssuesSpecification}
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
                      value={alergyMedication}
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
                      value={alergyMedicationSpecification}
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
                      disabled
                    />
                  </div>
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
                        type="button"
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                        onClick={handleClearSignature}
                      >
                        Limpar
                      </button>
                    </div>
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
                    value={guestName}
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
                    placeholder="(xx) xxxxx-xxxx"
                    value={guestPhone}
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
                      onChange={e => setGuestCursillo(e.target.value)}
                      value={guestCursillo}
                      required
                    >
                      <option defaultValue=""></option>
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
                    placeholder="Escreva o por que"
                    onChange={e => setGuestReason(e.target.value)}
                    value={guestReason}
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
                      onChange={e => setGuestFee(e.target.value)}
                      value={guestFee}
                    >
                      <option defaultValue=""></option>
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
                    placeholder="Com quem você acertou o pagamento?"
                    onChange={e => setGuestAgreed(e.target.value)}
                    value={guestAgreed}
                  />
                </div>
                <div className="w-full">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Data Limite:
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="date"
                    onChange={e => setGuestDeadline(e.target.value)}
                    value={guestDateDeadline}
                    placeholder="Fulano da Silva Santos"
                  />
                </div>
              </div>

              <div className="flex justify-center mb-5">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
