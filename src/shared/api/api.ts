import type { OperatorAddon, OperatorRaw } from '@/entity/operator/types';

export const apiUrl = `https://${import.meta.env.VITE_API_TOKEN}.mockapi.io/api/`;

export const fetchOperatorsApiCall = (): Promise<Array<OperatorRaw>> =>
  fetch(`${apiUrl}/operator`, {
    method: 'GET'
  }).then((res) => res.json());

export const fetchOperatorsAddonsApiCall = (): Promise<Array<OperatorAddon>> =>
  fetch(`${apiUrl}/operatorAddon`, {
    method: 'GET'
  }).then((res) => res.json());
