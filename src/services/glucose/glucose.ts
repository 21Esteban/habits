import {habitsApi} from '../habitsApi';

export interface GlucoseReading {
  timestamp: string;
  value: number;
  unit: string;
}

export interface GlucoseResponse {
  userId: string;
  date: string;
  readings: GlucoseReading[];
}

export const glucoseApi = habitsApi.injectEndpoints({
  endpoints: builder => ({
    getGlucoseData: builder.query<
      GlucoseResponse,
      {userId: string; date: string}
    >({
      query: ({userId, date}) => ({
        url: `api/glucose/getByUserAndDateRange?userId=${userId}`,
        method: 'POST',
        body: {date},
      }),
    }),
    // Otros endpoints de glucosa...
  }),
  overrideExisting: false,
});

export const {useGetGlucoseDataQuery} = glucoseApi;

// add "endpoints" that represents the specific data you want to fetch and cache, and export the auto-generated React hooks for each endpoint:
