import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './utils/axiosBaseQuery';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({ baseUrl: (import.meta.env.VITE_API_URL as string) || 'http://localhost:3000' }),
  endpoints: (build) => ({
    getBalance: build.query<{ accountId: string; balance: number; currency: string }, string>({
      query: (accountId) => ({ url: `/accounts/${accountId}/balance`, method: 'GET' }),
      keepUnusedDataFor: 2
    }),
    getTransactions: build.query<{ items: any[]; nextToken?: string }, { accountId: string; limit?: number; nextToken?: string }>({
      query: ({ accountId, limit = 25, nextToken }) => ({ url: `/accounts/${accountId}/transactions`, method: 'GET', params: { limit, nextToken } }),
      keepUnusedDataFor: 10
    })
  })
});

export const { useGetBalanceQuery, useGetTransactionsQuery } = api;
