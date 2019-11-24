const API_URL = 'http://localhost:3001/api/v1';

async function getMessages() {
  const res = await fetch(`${API_URL}/contact/getAll`);
  const json = await res.json();
  return json.all;
}

async function getEnquiries() {
  const res = await fetch(`${API_URL}/enquiries/getAll`);
  const json = await res.json();
  return json.all;
}

async function validateToken(token) {
  const res = await fetch(`${API_URL}/user/validate`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const json = await res.json();
  return json.valid;
}

module.exports = {
  API_URL,
  getMessages,
  getEnquiries,
  validateToken
};
