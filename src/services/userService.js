import axios from 'axios';

// 使用你提供的 Key 和正确的 ReqRes 地址
const API_KEY = 'reqres_1fbae3e4191d463d9b79e3b1eac746d5'; 
const API_URL = 'https://reqres.in/api/users?page=1'; // 文档要求的 GET 接口

export const fetchUsers = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: { 'x-api-key': API_KEY }
    });

    // 转换 ReqRes 原始数据 (first_name) 为 App 所需字段 (firstName) 
    return response.data.data.map(user => ({
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      avatar: user.avatar
    }));
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};