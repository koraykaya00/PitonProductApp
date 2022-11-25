import { API_URL } from '../utils/constants';

export const getProducts = async (token) => {
  try {
    // const token = localStorage.getItem('token');
    const response = await fetch(API_URL + 'product/all', {
      headers: {
        'access-token': token,
      },
    });
    const data = await response.json();
    const { products } = data;
    console.log({ data });
    return products;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getProduct = async (token, id) => {
  try {
    // const token = localStorage.getItem('token');
    const response = await fetch(API_URL + `product/get/${id}`, {
      headers: {
        'access-token': token,
      },
    });
    const data = await response.json();
    console.log({ data });
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const likeProduct = async (token, productId) => {
  try {
    console.log({ productId });
    const response = await fetch(API_URL + `product/like`, {
      headers: {
        'access-token': token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ productId }),
    });
    const data = await response.json();
    console.log({ data });
    if (!data.status) throw new Error(data.message);
  } catch (error) {
    console.log('in catch');
    return Promise.reject(error);
  }
};

export const unlikeProduct = async (token, productId) => {
  try {
    console.log({ productId });
    const response = await fetch(API_URL + `product/unlike`, {
      headers: {
        'access-token': token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ productId }),
    });
    const data = await response.json();
    console.log({ data });
    if (!data.status) throw new Error(data.message);
  } catch (error) {
    console.log('in catch');
    return Promise.reject(error);
  }
};
