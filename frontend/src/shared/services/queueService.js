import api from "./api";
export const getMyQueue=()=>api.get("/queue/mine");
export const createQueueEntry=(payload)=>api.post("/queue",payload);
