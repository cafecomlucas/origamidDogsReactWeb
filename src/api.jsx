const API_URL = 'https://dogsapi.origamid.dev/json';

export const TOKEN_POST = (body) => ({
  url: `${API_URL}/jwt-auth/v1/token`,
  options: {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(body),
  },
});

export const GET_USER = (token) => ({
  url: `${API_URL}/api/user`,
  options: {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  },
});

export const TOKEN_VALIDATE_POST = (token) => ({
  url: `${API_URL}/jwt-auth/v1/token/validate`,
  options: {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  },
});

export const USER_POST = (body) => ({
  url: `${API_URL}/api/user`,
  options: {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(body),
  },
});

export const PHOTO_POST = (formData, token) => ({
  url: `${API_URL}/api/photo`,
  options: {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  },
});
