import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const todoApi = createApi({
	reducerPath: 'todoApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://192.168.20.42:5000/api/todos/',
	}),
	tagTypes: ['Todo'],
	endpoints: (builder) => ({
		getAllTodos: builder.query({
			query: () => '/',
			providesTags: ['Todo'],
		}),
		addNewTodo: builder.mutation({
			query: ({ title, content }) => ({
				url: 'add',
				method: 'POST',
				body: {
					title,
					content,
				},
			}),
			invalidatesTags: ['Todo'],
		}),
        removeTodo: builder.mutation({
            query: (id) => ({
                url: 'delete',
                method: 'DELETE',
                body: {
                    id
                }
            }),
            invalidatesTags: ['Todo'],
        })
	}),
})

export const { useGetAllTodosQuery, useAddNewTodoMutation, useRemoveTodoMutation } = todoApi
