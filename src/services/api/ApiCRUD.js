
import axios from "axios";

const baseUrl = "http://localhost:8080/lancamentos";

export const ApiCRUD = {
  async getAll() {
    try {
      const response = await axios.get(`${baseUrl}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  async getByDyId(id) {
    try {
      const response = await axios.get(`${baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  async create(data) {
    try {
      const response = await axios.post(`${baseUrl}`, data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  async update(id, data) {
    try {
      const response = await axios.put(`${baseUrl}/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  async delete(id) {
    try {
      await axios.delete(`${baseUrl}/${id}`);
    } catch (error) {}
  },

  async saveOrUpdate(id, data){

    try {
        if(id) {
            await this.update(id, data);

        }else {
            await this.create(data);
        }
        
    } catch (error) {
        console.error(error);
        
    }

  }
};
