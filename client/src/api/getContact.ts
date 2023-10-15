import { CONFIG } from '../constants/config';

interface IData {
  number: string;
  email: string;
}

interface ReturnType {
  contacts: { number: number; email: string }[] | null;
  error: string | null;
}

export const getContact = async ({
  email,
  number,
}: IData): Promise<ReturnType> => {
  const body: { number?: string; email: string } = { email };

  if (number) {
    body.number = number.replace(/\D/g, '');
  }

  try {
    const response = await fetch(`${CONFIG.domainName}api/v1/contacts/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(body),
    });

    const responseData = await response.json();

    if (responseData.hasOwnProperty('contact')) {
      return { contacts: responseData.contact, error: null };
    } else {
      return {
        contacts: null,
        error: getError(responseData.message),
      };
    }
  } catch (err) {
    console.error(err);
    return {
      contacts: null,
      error: 'Ошибка получения данных',
    };
  }
};

const getError = (message: any) =>
  Array.isArray(message) ? message.join('\n') : message;
