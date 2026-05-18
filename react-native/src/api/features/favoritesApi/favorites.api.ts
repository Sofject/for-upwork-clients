// @ts-nocheck

import { callRequest, rootApi } from '@api';
import { ENDPOINTS } from '@api/endpoints';
import { createOffsetPagination } from '@api/helpers';
import { transformPostDetailResponse } from '../postApi/post.mapper';
import { NewsfeedListResponse } from '../postApi/post.types';

export const favoritesApi = rootApi.injectEndpoints({
  endpoints: builder => ({
    getSavedPosts: builder.query<
      NewsfeedListResponse,
      { limit: number; offset: number }
    >({
      query: ({ limit, offset }) =>
        callRequest.get(ENDPOINTS.POSTS.SAVED(limit, offset)),
      transformResponse: (response: any) =>
        transformPostDetailResponse(response),
      ...createOffsetPagination('items'),
      providesTags: ['SavedPosts'],
    }),
  }),
  overrideExisting: true,
});

export const { useGetSavedPostsQuery } = favoritesApi;
