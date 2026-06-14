import api from "../api/api";

export const getProducts = async () => {
  const res = await api.get("/products");
  return res.data;
};

export const getProduct = async (id) => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};

export const sendChatMessage = async (data) => {
  const res = await api.post("/chat", data);
  return res.data;
};

export const uploadDocument = async (formData) => {
  const res = await api.post("/upload", formData);
  return res.data;
};