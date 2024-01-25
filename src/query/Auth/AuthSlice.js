import {createApi , fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { setAuth , logout, login } from '../../slices/accountSlice'


const baseQuery = fetchBaseQuery({
    baseUrl : 'http://185.243.48.51:8000/' ,
    prepareHeaders: (headers, { getState }) => {
        console.log('prepareHeaders is called');
        // const token = getState().auth.access;
        const token = localStorage.getItem('access')
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },

})


const baseQueryWithReauth = async (args , api , extraOptions) => {
    let result = await baseQuery(args , api , extraOptions)

        if(result?.error?.originalStatus === 403) {
            console.log('send refresh')
            /// send refresh token

            const refreshResult = await baseQuery({credentials : 'include' , url : 'token/refresh/'} , api , extraOptions)
            if(refreshResult?.data) {
                const refresh = api.getState().auth.refresh
                console.log('refresh ', refreshResult)

                //store new token 

                api.dispatch(login({...refreshResult.data , refresh}))
                result = await baseQuery(args , api , extraOptions)

            } else {
                api.dispatch(logout())
            }
        }
        // console.log('result' , result)
        return result
}





export const AuthSlice = createApi({
    baseQuery : baseQueryWithReauth,
    endpoints : (builder) => ({
        login : builder.mutation({
            query : ({username , password}) => ({
                url : '/token/',
                method : 'POST',
                body :  {username , password} , 
                credentials : 'include'
                
            })
        }),
      
        refresh : builder.mutation({
            query : (refresh) =>({
                url : '/token/refresh/',
                body : refresh , 
                method : 'POST'
            })
        }),
        home : builder.query({
            query : ()=> '/home/',
          
            
            
        })
    }),
   
        
}) 


export const {useLoginMutation , useHomeQuery } = AuthSlice