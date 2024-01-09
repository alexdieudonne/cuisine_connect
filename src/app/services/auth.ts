import { LoginResp } from "@/types/auth";
import api from "./api";
import { resetCredentials, setCredentials } from "./slices/authSlice";
import IUser from "@/types/User";

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    logout: build.mutation<void, void>({
      query: () => ({
        url: `/logout`,
        method: "POST",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        // await queryFulfilled;
        // dispatch(resetCredentials());
        // dispatch(authApi.util.resetApiState());
      },
    }),
    login: build.mutation<LoginResp, IUser>({
      query: (body) => ({
        url: `/login-signup`,
        body,
        method: "POST",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        const { data } = await queryFulfilled;
        if(data.status === 'error') throw new Error(data as any)
        dispatch(setCredentials({ user: data.data.user, token: data.data.token }));
      },
    }),
    getMyProfile: build.query<IUser, string>({
      query: (token) => {
        return {
          url: `/getMyProfile`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      async onQueryStarted(token, { queryFulfilled, dispatch }) {
        // const { data: user } = await queryFulfilled;
        // dispatch(setCredentials({ user, token }));
      },
      // providesTags: ["Me"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useLogoutMutation,
  useLoginMutation,
  useLazyGetMyProfileQuery,
} = authApi;
