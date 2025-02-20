import axios from "axios"
import axiosInstance from "../instance/axiosInstance";

export let services={
    registerUser:async (payload)=>{
        try {
            let data=await axiosInstance.post("/users/register",payload,{
                headers:{
                    'Content-Type': 'multipart/form-data',
                }
            })
            console.log(data);
            
        } catch (error) {
            console.log(error);
            
        }
    },    loginUser:async (payload)=>{
        try {
            let {data:{user,token}}=await axiosInstance.post("/users/login",payload)
            sessionStorage.setItem("Token",token)
            return user
            
        } catch (error) {
            console.log(error);
            
        }
    },
    getArticle:async ()=>{
        try {
            console.log(sessionStorage.getItem('Token'));
            
            let {data}=await axiosInstance.get("/articles",{
                headers:{
                    Authorization:`Bearer ${sessionStorage.getItem("Token")}`
                }

            })
           
            
            return data
            
            
        } catch (error) {
            console.log(error);
            
        }
    },addComment:async (payload,id)=>{
        let {data}=await axiosInstance.post(`/articles/${id}/comment`,payload,{
            headers:{
                  Authorization:`Bearer ${sessionStorage.getItem("Token")}`
            }
        })
        return data
    },addArticle:async (payload)=>{
        let {data}=await axiosInstance.post(`/articles`,payload,{
            headers:{
                  Authorization:`Bearer ${sessionStorage.getItem("Token")}`
            }
        })
          console.log(data);
          
    },sendRequest:async (payload)=>{
        let message=await axiosInstance.post(`/follow/send-request`,payload,{
            headers:{
                  Authorization:`Bearer ${sessionStorage.getItem("Token")}`
            }
        })

        console.log(message);
        
    }
}

