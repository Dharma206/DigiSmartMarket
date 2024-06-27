// src/services/userService.js
import axiosInstance from "./axiosInstance";

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
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const requestAccess = async (data) => {
  try {
    const response = await axiosInstance.post("/request-access", data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const changeRequestAcces = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/vendor-approval/${id}`);
    return response.data;
  } catch (error) {
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
export const getCategories={}

export const getLabours = async () => {
  try {
    const response = await axiosInstance.get("/labourer");
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
    console.error("Error fetching user data:", error);
    throw error;
  }
};


export const getMarkets = async () => {
  try {
    const response = await axiosInstance.get("/market");
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
    console.error("Error editing item:", error);
    throw error;
  }
};

export const deleteVendor = async (id) => {
  try {
    const response = await axiosInstance.delete(`/market-vendors/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error editing item:", error);
    throw error;
  }
};

export const addLabourer= async (data) => {
  try {
    const response = await axiosInstance.post("/labourer", data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }

};








export const createMerket = async (data) => {
  try {
    const response = await axiosInstance.post("/market", data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
export const getFarmItems = async (id) => {
  try {
    const response = await axiosInstance.get("/farmItems", {
      params: id,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching farm items:", error);
    throw error;
  }
};
export const getFarmItemActivities = async (id) => {
  try {
    const response = await axiosInstance.get("/farmItemActivities", {
      params: id,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching farm items:", error);
    throw error;
  }
};
export const putEditItem = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/farmItems/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error editing item:", error);
    throw error;
  }
};
export const putEditProfile = async (data) => {
  try {
    const response = await axiosInstance.put("/profile", data);
    return response.data;
  } catch (error) {
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

export const deleteFarmItem = async (id) => {
  try {
    const response = await axiosInstance.delete(`/farmItems/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error editing item:", error);
    throw error;
  }
};
export const postAddFarmActivity = async (data) => {
  try {
    const response = await axiosInstance.post("/farmItemActivities", data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
export const putEditFarmActivity = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/farmItemActivities/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error editing item:", error);
    throw error;
  }
};
export const deleteFarmActivity = async (id) => {
  try {
    const response = await axiosInstance.delete(`/farmItemActivities/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error editing item:", error);
    throw error;
  }
};
