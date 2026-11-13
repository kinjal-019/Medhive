import api from "./api";
export const loginUser=(email,password)=>api.post("/auth/login",{email,password});
export const registerUser=(payload)=>api.post("/auth/register",payload);
