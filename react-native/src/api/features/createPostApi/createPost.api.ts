// @ts-nocheck

import { callRequest, rootApi } from '@api';
import { SearchOption } from '@components/AppSuggestionInput/AppSuggestionInput';
import { ENDPOINTS } from '@api/endpoints';
import { transformNutritionData } from '@api/features/createPostApi/createPost.mapper';

export const createPostApi = rootApi.injectEndpoints({
  endpoints: builder => ({
    searchIngredients: builder.query<SearchOption[], string>({
      serializeQueryArgs: ({ queryArgs }) => queryArgs,
      query: value => callRequest.get(ENDPOINTS.SEARCH.INGREDIENTS(value)),
      transformResponse: (response: any) => {
        return response.map((item: any) => ({
          label: item.name,
          value: item.name,
          id: item.id,
        }));
      },
    }),
    calculateNutrition: builder.mutation({
      query: data => callRequest.post(ENDPOINTS.NUTRITION.CALCULATE, data),
      transformResponse: response => transformNutritionData(response),
    }),
    createPost: builder.mutation({
      query: data => callRequest.post(ENDPOINTS.POSTS.BASE, data),
    }),
    editPost: builder.mutation({
      query: ({ id, data }) =>
        callRequest.put(ENDPOINTS.POSTS.EDIT_POST(id), data),
      invalidatesTags: (result, error, arg) => [{ type: 'Posts', id: arg.id }],
    }),
    uploadMedia: builder.mutation({
      query: ({ id, data }) =>
        callRequest.post(ENDPOINTS.POSTS.UPLOAD_MEDIA(id), data),
    }),
    deleteMedia: builder.mutation({
      query: data => callRequest.delete(ENDPOINTS.MEDIA.DELETE_MEDIA, data),
    }),
  }),
});

export const {
  useLazySearchIngredientsQuery,
  useCalculateNutritionMutation,
  useCreatePostMutation,
  useUploadMediaMutation,
  useEditPostMutation,
  useDeleteMediaMutation,
} = createPostApi;
