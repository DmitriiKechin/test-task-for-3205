import express from 'express';
import { getErrorMessage } from '../../helpers/getErrorMessage';
import { getResponse } from './services/getResponse';

export let currentAbortController: AbortController | null = null;

export const contactsController = {
  getContact: async (
    req: express.Request,
    res: express.Response
  ): Promise<express.Response> => {
    try {
      const abortController = new AbortController();
      const { signal } = abortController;

      currentAbortController = abortController;
      const response = await getResponse({ signal, req });

      return res.json(response);
    } catch (err) {
      const message = getErrorMessage(err);
      if (message === 'Aborted') {
        return res.end();
      }
      return res.status(400).json({ message });
    } finally {
      currentAbortController = null;
    }
  },
};
