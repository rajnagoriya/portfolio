import  {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${import.meta.env.VITE_SERVER}/user/`
    }),
    tagTypes: ["user"],
    endpoints: (builder) => ({
        getUserData : builder.query({
            query: ()=>({
                url: `66d0b4f603cccafe245be906`,
            }),
            providesTags: ["user"]
        }),
    }),
});



export const {
    useGetUserDataQuery
} = userApi;