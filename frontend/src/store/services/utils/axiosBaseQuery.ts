import axios, { AxiosRequestConfig } from 'axios';
import type { BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { Auth } from 'aws-amplify';

export const axiosBaseQuery = ({ baseUrl }: { baseUrl: string }): BaseQueryFn<{
  url: string;
  method?: AxiosRequestConfig['method'];
  data?: AxiosRequestConfig['data'];
  params?: AxiosRequestConfig['params'];
}> =>
  async ({ url, method = 'GET', data, params }) => {
    try {
      // Acquire token via Amplify if available
      let token: string | undefined;
      try {
        const session = await Auth.currentSession();
        token = session.getIdToken().getJwtToken();
      } catch (err) {
        token = undefined; // unauthenticated local flow
      }

      const result = await axios.request({
        url: baseUrl.replace(/\/$/, '') + url,
        method,
        data,
        params,
        headers: token ? { Authorization: `Bearer ${token}` } : undefined
      });

      return { data: result.data };
    } catch (axiosError: any) {
      const err = axiosError;
      if (err.response) {
        return { error: { status: err.response.status, data: err.response.data } };
      }
      return { error: { status: 500, data: { message: err.message } } };
    }
  };
