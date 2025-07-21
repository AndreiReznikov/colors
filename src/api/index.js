import axios from 'axios';

const API_BASE_URL = `https://${process.env.MOCK_API_SECRET}.mockapi.io/api`;

export const productApi = {
  async getProducts(params = {}) {
    try {
      const response = await axios.get(`${API_BASE_URL}/products`, { params });
      return response.data;
    } catch (error) {
      console.error('Ошибка при получении продуктов:', error);
    }
  }
};