import { AuthProvider } from "@pankod/refine-core";
import { getOpenInstance } from "connection";

export const TOKEN_KEY = "TOKEN_KEY";
export const TOKEN_EXPIRE = "TOKEN_EXPIRE";
export const DISPLAY_NAME = "DISPLAY_NAME"

const loginURL='api/auth/login';

type LoginResponse = {
    access_token: string;
    displayName:string;
    validUpto: string;
  };
  async function login(email:string , password:string ):Promise<LoginResponse|null>{
    const response = await getOpenInstance().post<LoginResponse>(
      loginURL,
      {
       username:email,password
      },
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );
    if(response.status===201){
      return response.data
    }else if(response.status===401){
      return null;
    }
    throw Error('Error while calling API'); 
  }

  export const authProvider: AuthProvider = {
    login: async ({ email, password }) => {
      try{
        const user = await login(email, password);
        if(!user){
          return Promise.reject(new Error("email: admin, password: admin"));
        }else{
          localStorage.setItem(TOKEN_KEY, user.access_token);
          localStorage.setItem(DISPLAY_NAME, user.displayName);
          localStorage.setItem(TOKEN_EXPIRE, user.validUpto);
        
          return Promise.resolve();
        }
      }catch(error){
      return Promise.reject(error);
      }
    },
    logout: () => {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(DISPLAY_NAME);
      localStorage.removeItem(TOKEN_EXPIRE);
      return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: () => {
      //TODO add more checks here
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        return Promise.resolve();
      }
  
      return Promise.reject();
    },
    getPermissions: () => Promise.resolve(),
    getUserIdentity: async () => {
      const displayName = localStorage.getItem(DISPLAY_NAME);
      if (!displayName) {
        return Promise.reject();
      }
  
      return Promise.resolve({
        displayName
      });
    },
  };
  