// @flow

import { fetchUtils } from "AppUtils";
import { HttpMethods } from "AppConstants";

const { makeRequest } = fetchUtils;
const { DELETE } = HttpMethods;
const CARD_PROXY_URI = "/payments/cards";

export const getCards = (): Promise<*> => makeRequest(CARD_PROXY_URI);

export const deleteCard = (cardId: string): Promise<*> =>
  makeRequest(`${CARD_PROXY_URI}/${cardId}`, DELETE);
