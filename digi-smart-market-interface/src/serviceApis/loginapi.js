// src/services/userService.js
import { toast } from "react-toastify";
import axiosInstance from "./axiosInstance";

const handleError=(error)=>{
  toast.error(error?.response?.data?.messsage||error?.response?.data?.error||error?.message || error?.error?.error ||'Something went wrong');

}

export const postLogin = async (data) => {
  try {
    const response = await axiosInstance.post("/login", data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const signUp = async (data) => {
  try {
    const response = await axiosInstance.post("/register", data);
    return response.data;
  } catch (error) {
    handleError(error)
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const requestAccess = async (data) => {
  try {
    const response = await axiosInstance.post("/request-access", data);
    return response.data;
  } catch (error) {
    handleError(error)
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const changeRequestAcces = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/vendor-approval/${id}`);
    return response.data;
  } catch (error) {
    handleError(error)
    console.error("Error editing item:", error);
    throw error;
  }
};

export const getProfile = async () => {
  try {
    const response = await axiosInstance.get("/profile");
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getMarketVendor = async () => {
  try {
    const response = await axiosInstance.get("/market-vendors");
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};


export const getLabours = async () => {
  try {
    const response = await axiosInstance.get("/labourer");
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getproduces = async () => {
  try {
    const response = await axiosInstance.get("/produce");
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await axiosInstance.get("/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};


export const deleteLabour = async (id) => {
  try {
    const response = await axiosInstance.delete(`/labourer/${id}`);
    return response.data;
  } catch (error) {
    handleError(error)
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const deleteProduce = async (id) => {
  try {
    const response = await axiosInstance.delete(`/produce/${id}`);
    return response.data;
  } catch (error) {
    handleError(error)
    console.error("Error fetching user data:", error);
    throw error;
  }
};


export const getMarkets = async (id) => {
  try {
    const response = await axiosInstance.get(`/market${id?`?userId=${id}`:''}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getVendorRequest = async () => {
  try {
    const response = await axiosInstance.get("/vendor-approval");
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};


export const deleteMarket = async (id) => {
  try {
    const response = await axiosInstance.delete(`/market/${id}`);
    return response.data;
  } catch (error) {
    handleError(error)
    console.error("Error editing item:", error);
    throw error;
  }
};

export const deleteVendor = async (id) => {
  try {
    const response = await axiosInstance.delete(`/market-vendors/${id}`);
    return response.data;
  } catch (error) {
    handleError(error)
    console.error("Error editing item:", error);
    throw error;
  }
};

export const addLabourer= async (data) => {
  try {
    const response = await axiosInstance.post("/labourer", data);
    return response.data;
  } catch (error) {
    handleError(error)
    console.error("Error fetching user data:", error);
    throw error;
  }

};

export const putEditLabourer = async (id,data) => {
  try {
    const response = await axiosInstance.put(`/labourer/${id}`, data);
    return response.data;
  } catch (error) {
    handleError(error)
    console.error("Error editing item:", error);
    throw error;
  }
};

export const addProduce= async (data) => {
  try {
    const response = await axiosInstance.post("/produce", data);
    return response.data;
  } catch (error) {
    handleError(error)
    console.error("Error fetching user data:", error);
    throw error;
  }

};

export const putEditProduce = async (id,data) => {
  try {
    const response = await axiosInstance.put(`/produce/${id}`, data);
    return response.data;
  } catch (error) {
    handleError(error)
    console.error("Error editing item:", error);
    throw error;
  }
};

export const createMerket = async (data) => {
  try {
    const response = await axiosInstance.post("/market", data);
    return response.data;
  } catch (error) {
    handleError(error)
    console.error("Error fetching user data:", error);
    throw error;
  }
};


export const putEditProfile = async (data) => {
  try {
    const response = await axiosInstance.put("/profile", data);
    return response.data;
  } catch (error) {
    handleError(error)
    console.error("Error editing item:", error);
    throw error;
  }
};
export const putRestPassword = async (data) => {
  try {
    const response = await axiosInstance.post("/reset-password", data);
    return response.data;
  } catch (error) {
    console.error("Error editing item:", error);
    throw error;
  }
};
