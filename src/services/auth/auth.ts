import { User } from '../../types/auth';
import {habitsApi} from '../habitsApi';

export const authApi = habitsApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<
      {token: string; user: User},
      {mail: string; pass: string}
    >({
      query: credentials => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation } = authApi;
//we are using the habitsApi to inject the endpoints for the authApi
