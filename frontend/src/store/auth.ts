// api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Type } from 'lucide-react';

const baseUrl = 'http://localhost:5001'; // Define your base URL
const getAccessToken = () => {
  const accessToken = sessionStorage.getItem('accessToken');
  return accessToken ? `Bearer ${accessToken}` : '';
};
export const auth = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders(headers) {
      const accessToken = getAccessToken();
      if (accessToken) {
        headers.set('Authorization', accessToken);
      }
      return headers;
    },
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    userDetails: builder.query({
      query: () => ({
        url: '/users/details',
        method: 'GET',
      }),
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: '/auth/sendResetPasswordEmail',
        method: 'POST',
        body: email,
        responseHandler: async (response) => response.text(),
      }),
    }),
    confirmEmail: builder.mutation({
      query: (data) => ({
        url: '/auth/confirmEmail',
        method: 'POST',
        body: data,
        responseHandler: async (response) => response.text(),
      }),
    }),
    createSupervise: builder.mutation({
      query: (data) => ({
        url: '/users/create_supervisee',
        method: 'POST',
        body: data,
        responseHandler: async (response) => response.text(),
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: '/auth/resetPassword',
        method: 'POST',
        body: data,
        responseHandler: async (response) => response.text(),
      }),
    }),
    setOrgRep: builder.mutation({
      query: (data) => ({
        url: '/users/org_rep',
        method: 'POST',
        body: data,
        responseHandler: async (response) => response.text(),
      }),
    }),
    signUp: builder.mutation({
      query: (data) => ({
        url: '/users',
        method: 'POST',
        body: data,
        responseHandler: async (response) => response.text(),
      }),
    }),
    addOrganisation: builder.mutation({
      query: (data) => ({
        url: '/organisations',
        method: 'POST',
        body: data,
        responseHandler: async (response) => response.text(),
      }),
    }),
    verifyMembers: builder.mutation({
      query: ({ data, id }) => ({
        url: `/organisations/verify_members/${id}`,
        method: 'POST',
        body: data,
        responseHandler: async (response) => response.text(),
      }),
    }),
    getAcademicOrganisation: builder.query({
      query: () => ({
        url: '/organisations/academic',
        method: 'GET',
      }),
    }),
    getIndustryOrganisation: builder.query({
      query: () => ({
        url: '/organisations/industry',
        method: 'GET',
      }),
    }),
    unverifiedUsers: builder.query({
      query: (id) => ({
        url: `/organisations/members/unverified/${id}`,
        method: 'GET',
      }),
    }),
    verifiedUsers: builder.query({
      query: (id) => ({
        url: `/organisations/members/verified/${id}`,
        method: 'GET',
      }),
    }),
    addAreaOfInterest: builder.mutation({
      query: (data) => ({
        url: '/area-of-interest',
        method: 'POST',
        body: data,
        responseHandler: async (response) => response.text(),
      }),
    }),
    getAreaOfInterest: builder.query({
      query: () => ({
        url: `/area-of-interest`,
        method: 'GET',
      }),
    }),
    getOrganisation: builder.query({
      query: ({ name, type }) => ({
        url: `/organisations?type=${type}&searchQuery=${name}`,
        method: 'GET',
      }),
    }),
    getUsers: builder.query({
      query: ({ query, type }) => ({
        url: `/users?role=${type}&searchQuery=${query}`,
        method: 'GET',
      }),
    }),
    addSupervisee: builder.mutation({
      query: (data) => ({
        url: '/users/add_supervisees',
        method: 'POST',
        body: data,
        responseHandler: async (response) => response.text(),
      }),
    }),
  }),
});

// Add a type annotation for 'auth'
type AuthApi = typeof auth;

export const {
  useLoginMutation,
  useForgotPasswordMutation,
  useConfirmEmailMutation,
  useResetPasswordMutation,
  useSetOrgRepMutation,
  useSignUpMutation,
  useAddOrganisationMutation,
  useUserDetailsQuery,
  useGetAcademicOrganisationQuery,
  useGetIndustryOrganisationQuery,
  useUnverifiedUsersQuery,
  useVerifiedUsersQuery,
  useVerifyMembersMutation,
  useAddAreaOfInterestMutation,
  useGetAreaOfInterestQuery,
  useGetOrganisationQuery,
  useCreateSuperviseMutation,
  useGetUsersQuery,
  useAddSuperviseeMutation,
} = auth as AuthApi;