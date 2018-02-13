// @flow

import { fetchUtils } from "AppUtils";
import { HttpMethods } from "AppConstants";

const EMPTY_OBJECT = {};
const { makeRequest } = fetchUtils;
const { POST, DELETE } = HttpMethods;
const CARD_PROXY_URI = "/cards";

export const getCards = (): Promise<*> => makeRequest(CARD_PROXY_URI);

export const addCard = (tokenId: string): Promise<*> =>
  makeRequest(CARD_PROXY_URI, POST, EMPTY_OBJECT, { tokenId });

export const deleteCard = (cardId: string): Promise<*> =>
  makeRequest(`${CARD_PROXY_URI}/${cardId}`, DELETE);

export const changeDefaultCard = (id: string): Promise<*> =>
  makeRequest(`${CARD_PROXY_URI}/default/${id}`, POST);
