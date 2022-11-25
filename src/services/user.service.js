import { API_URL } from '../utils/constants';

export const login = async (email, password) => {
  try {
    const response = await fetch(API_URL + 'user/login', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    const { token } = data;
    return token;
  } catch (error) {
    return '';
  }
};

export const register = async (name, password, email) => {
  try {
    const response = await fetch(API_URL + 'user/register', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ name, password, email }),
    });
    const data = await response.json();
    const { token } = data;
    return token;
  } catch (error) {
    return '';
  }
};
