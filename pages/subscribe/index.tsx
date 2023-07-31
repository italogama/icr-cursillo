'use client';
import React, { use, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Swal from 'sweetalert2';
import logoCursilho from '../../public/images/logoCursilho.png';
import BaseLayout from '../../app/baseLayout';
import classNames from 'classnames';

function Subscribe() {
  const [fullName, setFullName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
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

  const [confirmationDate, setConfirmationDate] = useState(
    new Date().toLocaleDateString(),
  );
  const [confirmationCheck, setConfirmationCheck] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestCursillo, setGuestCursillo] = useState('');
  const [payment, setPayment] = useState('Não');
  const [prefRoom, setPrefRoom] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const env = process.env.NEXT_PUBLIC_CURSILHO_ENV;
  const init = process.env.NEXT_PUBLIC_CURSILHO_INIT;
  const end = process.env.NEXT_PUBLIC_CURSILHO_END;

  const pagFisico = process.env.NEXT_PUBLIC_CURSILHO_PAYMENT_FISIC;
  const pagOnline = process.env.NEXT_PUBLIC_CURSILHO_PAYMENT_ONLINE;

  const resetFields = () => {
    setFullName('');
    setNickname('');
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
    setConfirmationDate(new Date().toISOString().substr(0, 10));
    setConfirmationCheck(!confirmationCheck);
    setGuestName('');
    setGuestPhone('');
    setGuestCursillo('');
    setPrefRoom('');
  };

  useEffect(() => {
    setConfirmationDate(new Date().toISOString().substr(0, 10));
    setDiet('Não');
    setHealthIssues('Não');
    setAlergyMedication('Não');
  }, []);

  const handleChange = () => {
    setConfirmationCheck(!confirmationCheck);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (confirmationCheck === false) {
      Swal.fire({
        title: 'Erro!',
        text: 'Você precisa confirmar que leu e concorda com o regulamento!',
        icon: 'warning',
        confirmButtonText: 'Ok',
      });
      return;
    }

    try {
      setIsLoading(true);

      const form = {
        fullName,
        nickname,
        email,
        birthDate,
        civilStatus,
        cpf,
        shirtSize,
        prefRoom,
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
        confirmationDate,
        confirmationCheck: confirmationCheck === true ? 'Confirmado' : 'Não',
        guestName,
        guestCursillo,
        guestPhone,
        payment,
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

      if (response.status === 200) {
        Swal.fire({
          title: 'Sucesso!!',
          text: 'Parabéns você realizou o seu cadastro! Agora é só aguardar o nosso contato!',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        setIsLoading(false);

        Swal.fire({
          title: 'Pagamento',
          text: 'Desejar ser redirecionado para realizar o pagamento? Se você cancelar, você deverá realizar o pagamento até 5 dias ANTES do cursilho.',
          icon: 'info',
          showCancelButton: true,
          confirmButtonColor: '#65a30d',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Realizar pagamento',
          cancelButtonText: 'Cancelar',
        }).then(async result => {
          if (result.isConfirmed) {
            const checkout = await fetch('/api/mercadopago', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email }),
            });
            const url = await checkout.json();
            window.location.replace(url.data);
          } else {
            resetFields();
            Swal.fire({
              title: 'Sucesso!!',
              text: 'Seu cadastro foi realizado com sucesso!',
              icon: 'success',
              confirmButtonText: 'Retornar para a página inicial',
            }).then(result => {
              if (result.value) {
                const homepageUrl = `${window.location.origin}/`; // Replace with your desired path
                window.location.href = homepageUrl;
              }
            });
          }
        });
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  function redirectMercadoPago(email: string) {}

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
    <BaseLayout>
      <form onSubmit={handleSubmit}>
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
              <br></br>* Descobrir seus dons e pô-los a serviço da comunidade;
              <br></br>* Ser fermento do EVANGELHO em seus ambientes; <br></br>*
              Demonstrar inquietação social.
            </label>
            <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">
              2) - O Preenchimento desta ficha NÃO implica na aceitação imediata
              e consequente participação
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
              placeholder={
                env === 'MASC'
                  ? 'Fulano da Silva Santos'
                  : 'Fulana da Silva Santos'
              }
              onChange={e => setFullName(e.target.value)}
              value={fullName}
              required
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              {env === 'MASC'
                ? 'Como deseja ser chamado?'
                : 'Como deseja ser chamada?'}
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="Apelido"
              onChange={e => setNickname(e.target.value)}
              value={nickname}
              required
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3">
          <div className="w-full px-3">
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

        <div className="flex flex-row -mx-3">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Data de Nascimento
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-12"
              type="date"
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

        <div className="flex flex-row -mx-3 mb-2">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Preferência Dormitório
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                onChange={e => setPrefRoom(e.target.value)}
                required
                value={prefRoom}
              >
                <option defaultValue=""></option>
                <option>Quarto com Ventilador(a)</option>
                <option>Quarto com Ar-condicionado</option>
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
              onChange={e => setCellPhone(formatPhoneNumber(e.target.value))}
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
              onChange={e => setCellPhone2(formatPhoneNumber(e.target.value))}
              value={cellPhone2}
            />
          </div>
        </div>

        <p className="text-gray-900 font-bold text-center bg-white rounded-md border">
          Indique o Nome e Telefone do cônjugue ou/e Parente ou/e amigo próximo
          <br></br> (2 opções de telefone)
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
              onChange={e => setPhoneParent(formatPhoneNumber(e.target.value))}
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
              onChange={e => setPhoneParent2(formatPhoneNumber(e.target.value))}
              value={phoneParent2}
            />
          </div>
        </div>

        <p className="text-gray-900 font-bold text-center bg-white rounded-md border">
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
                onChange={e => setHealthIssuesSpecification(e.target.value)}
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
                onChange={e => setAlergyMedicationSpecification(e.target.value)}
                value={alergyMedicationSpecification}
                required
              />
            </div>
          ) : (
            ''
          )}
        </div>

        <p className="text-gray-900 font-bold text-center bg-white rounded-md border">
          ACEITE DOS TERMOS
        </p>

        <div className="flex flex-wrap -mx-3 p-3 gap-2">
          <div className="w-full px-3 bg-white rounded-md">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold m-2">
              Eu, {fullName ? fullName : 'Seu nome aqui'} reafirmo todos os
              dados por mim citados acima, responsabilizando-me pela ida ao
              Movimento Cursilhista nos dias:{' '}
              <span className="text-red-500">{init}</span> a{' '}
              <span className="text-red-500">{end}</span>, e procurar a
              Secretaria do Cursilho a fim de confirmar minha presença,
              efetuando o pagamento da taxa no valor de R${pagFisico} reais (ou
              R${pagOnline} no cartão online), ou na entrega deste formulário
              preenchido 50% do valor e o restante em até 5(cinco) dias antes do
              Cursilho.
            </label>
            <div className="flex flex-row gap-2 justify-end mb-4">
              <input
                className="hidden"
                type="date"
                value={confirmationDate}
                onChange={e => setConfirmationDate(e.target.value)}
                required
              />
              <input
                className=""
                type="checkbox"
                onChange={e => handleChange()}
              />

              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold">
                Confirmar
              </label>
            </div>
          </div>
        </div>

        <div className="text-gray-900 font-bold text-center bg-white rounded-md border ">
          <p>VOCÊ FOI CONVIDADO POR ALGUEM?</p>
          <p>CONTA PRA GENTE!</p>
        </div>

        <div className="flex flex-wrap -mx-3 mt-3">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Nome Completo:
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder={
                env === 'MASC'
                  ? 'Fulano da Silva Santos'
                  : 'Fulana da Silva Santos'
              }
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
              onChange={e => setGuestPhone(formatPhoneNumber(e.target.value))}
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

        <div className="flex justify-center mb-5">
          <button
            className={classNames(
              'text-white font-bold py-2 px-4 rounded-full text-sm',
              {
                'bg-blue-500 hover:bg-blue-700': env === 'MASC',
                'bg-pink-600 hover:bg-pink-700': env === 'FEM',
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
    </BaseLayout>
  );
}

export default Subscribe;
