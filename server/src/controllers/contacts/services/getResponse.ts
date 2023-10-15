import express from 'express';
import { validationResult } from 'express-validator';
import data from './data.json';

export function getResponse({
  signal,
  req,
}: {
  signal: AbortSignal;
  req: express.Request;
}) {
  if (signal?.aborted) {
    return Promise.reject(new Error('Aborted'));
  }

  return new Promise((resolve, reject) => {
    let timeout: string | number | NodeJS.Timeout | undefined;

    const abortHandler = () => {
      clearTimeout(timeout);
      reject(new Error('Aborted'));
    };
    // start async operation
    timeout = setTimeout(() => {
      const response = validateParams(req) ||
        getContact(req) || { message: 'Контакт не найден' };
      resolve(response);
      signal?.removeEventListener('abort', abortHandler);
    }, 5000);

    signal?.addEventListener('abort', abortHandler);
  });
}

const validateParams = (
  req: express.Request
): { message: string[] } | undefined => {
  const validation = validationResult(req);

  if (!validation.isEmpty()) {
    const message = validation.array().map((error) => error.msg);

    return { message };
  }
};

const getContact = (req: express.Request) => {
  const { email, number } = req.body;

  const contact = data.find(
    (contact) => contact.email === email && contact.number === Number(number)
  );

  if (contact) {
    return { contact };
  }
};
