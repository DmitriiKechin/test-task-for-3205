import { CONFIG } from '../constants/config';

interface IData {
  number: string;
  email: string;
}

interface ReturnType {
  contact: { number: number; email: string } | null;
  error: string | null;
}

export const getContact = async (data: IData): Promise<ReturnType> => {
  data.number = data.number.replace(/\D/g, '');
  try {
    const response = await fetch(`${CONFIG.domainName}api/v1/contacts/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (responseData.hasOwnProperty('contact')) {
      return { contact: responseData.contact, error: null };
    } else {
      return {
        contact: null,
        error: getError(responseData.message),
      };
    }
  } catch (err) {
    console.error(err);
    return {
      contact: null,
      error: 'Ошибка получения данных',
    };
  }
};

const getError = (message: any) =>
  Array.isArray(message) ? message.join('\n') : message;
