import {
    createSelector,
    createEntityAdapter
  } from "@reduxjs/toolkit";
  import { apiSlice } from "../../app/api/apiSlice"
  
  const crewsAdapter = createEntityAdapter({})
  
  const initialState = crewsAdapter.getInitialState()
  
  export const crewsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCrews: builder.query({
            query: () => '/crews',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedcrews = responseData.map(crew => {
                    crew.id = crew._id
                    return crew
                });
                return crewsAdapter.setAll(initialState, loadedcrews)
            },
            providesTags: (result) => {
                if (result?.ids) {
                    return [
                        { type: 'crew', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'crew', id }))
                    ]
                } else return [{ type: 'crew', id: 'LIST' }]
            }
        }),
    }),
  })
  
  export const {
    useGetCrewsQuery,
  } = crewsApiSlice
  
  // returns the query result object
  export const selectCrewsResult = crewsApiSlice.endpoints.getCrews.select()
  
  // creates memoized selector
  const selectCrewsData = createSelector(
    selectCrewsResult,
    crewsResult => crewsResult.data // normalized state object with ids & entities
  )
  
  //getSelectors creates these selectors and we rename them with aliases using destructuring
  export const {
    selectAll: selectAllCrews,
    selectById: selectCrewById,
    selectIds: selectCrewIds
    // Pass in a selector that returns the crews slice of state
  } = crewsAdapter.getSelectors(state => selectCrewsData(state) ?? initialState)