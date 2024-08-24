import axios from "axios";

export const getLocation = async (): Promise<any> => {
  const res = await axios.get<any>("/api/location");

  return res.data;
};
