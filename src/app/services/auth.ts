import { LoginResp } from "@/types/auth";
import api from "./api";
import { resetCredentials, setCredentials } from "./slices/authSlice";
import IUser from "@/types/User";

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
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
  }),
  overrideExisting: true,
});

export const {
  useLoginMutation,
} = authApi;
