import { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';

type SheetForm = {
  fullName: string;
  nickname: string;
  email: string;
  birthDate: string;
  civilStatus: string;
  cpf: string;
  shirtSize: string;
  prefRoom: string;
  street: string;
  streetNumber: string;
  neighborhood: string;
  city: string;
  residentialPhone: string;
  comercialPhone: string;
  cellPhone: string;
  cellPhone2: string;
  nameParent: string;
  phoneParent: string;
  nameParent2: string;
  phoneParent2: string;
  diet: string;
  dietSpecification: string;
  healthIssues: string;
  healthIssuesSpecification: string;
  alergyMedication: string;
  alergyMedicationSpecification: string;
  confirmationDate: string;
  confirmationCheck: string;
  guestName: string;
  guestPhone: string;
  guestCursillo: string;
  payment: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const body = req.body as SheetForm;

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(
          /\\n/g,
          '\n',
        ),
      },
      scopes: [
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    });

    const sheet = google.sheets({ version: 'v4', auth });

    const response = await sheet.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: 'A2:AF2',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [
            body.fullName,
            body.nickname,
            body.email,
            body.birthDate,
            body.civilStatus,
            body.cpf,
            body.shirtSize,
            body.prefRoom,
            body.street,
            body.streetNumber,
            body.neighborhood,
            body.city,
            body.residentialPhone,
            body.comercialPhone,
            body.cellPhone,
            body.cellPhone2,
            body.nameParent,
            body.phoneParent,
            body.nameParent2,
            body.phoneParent2,
            body.diet,
            body.dietSpecification,
            body.healthIssues,
            body.healthIssuesSpecification,
            body.alergyMedication,
            body.alergyMedicationSpecification,
            body.confirmationDate,
            body.confirmationCheck,
            body.guestName,
            body.guestPhone,
            body.guestCursillo,
            body.payment,
          ],
        ],
      },
    });

    return res.status(200).json({ data: response.data });
  } catch (e: any) {
    return res
      .status(500)
      .send({ message: e.message ?? 'Something went wrong' });
  }
}
