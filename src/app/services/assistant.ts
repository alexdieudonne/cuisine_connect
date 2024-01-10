import Message from "@/types/message";
import api from "./api";
import { Recipe } from "@/types/recipe";
import { BaseResp } from "@/types/base";


export const recipeApi = api.injectEndpoints({
    endpoints: (build) => ({
        getMessages: build.query<BaseResp<Recipe[]>, void>({
            query: () => ({
                url: `/recipes`,
                method: "GET",
            }),
        }),
        sendMessage: build.mutation<string, Message>({
            query: (body) => ({
                url: `/assistant/message`,
                method: "POST",
                body: {
                    prompt: body.content
                }
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                const { data } = await queryFulfilled;

            }
        }),
    }),
    overrideExisting: true,
});

export const {
    useGetMessagesQuery,
    useSendMessageMutation,
} = recipeApi;
