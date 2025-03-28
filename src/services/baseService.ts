import axios from "axios";

export const get = async <R>(url: string): Promise<R> => {
  const response = await axios.get(url);
  return response.data;
};

export const remove = async <R>(url: string): Promise<R> => {
  const response = await axios.delete(url);
  return response.data;
};

export const post = async <T, R>(url: string, data: T): Promise<R> => {
  const response = await axios.post(url, data);
  return response.data;
};

export const patch = async <T, R>(url: string, data: T): Promise<R> => {
  const response = await axios.patch(url, data);
  return response.data;
};
