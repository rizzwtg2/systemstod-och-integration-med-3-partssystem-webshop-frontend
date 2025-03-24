import axios from "axios";

export const get = async <T>(url: string): Promise<T> => {
  const response = await axios.get(url);
  return response.data;
};

export const remove = async (url: string): Promise<void> => {
  await axios.delete(`${url}`);
};

export const post = async <T>(url: string, data: T): Promise<void> => {
  await axios.post(url, data);
};

export const patch = async <T>(url: string, data: T): Promise<void> => {
  await axios.patch(url, data);
};
