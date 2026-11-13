import api from "./api";
export const getPrescriptions=()=>api.get("/prescriptions");
export const createPrescription=(payload)=>api.post("/prescriptions",payload);
