const axios = require('axios');

async function getUserTokens(domain, audience, client_id, client_secret, username, password) {
  const data = {
    grant_type: 'password',
    audience: audience,
    client_id: client_id,
    client_secret: client_secret,
    username: username,
    password: password,
    scope: 'offline_access'
  };

  const url = 'https://' + domain +'/oauth/token';

  try {
    const response = await axios.post(url, data, {
      headers: {'content-type': 'application/x-www-form-urlencoded'}
    });
    return response.data;
  } catch (error) {
    console.error('Error getting user token', error.response ? error.response.data : error.message);
    //throw error;
  }
}

async function getRefreshedToken(domain, client_id, client_secret, refresh_token) {
  const data = {
    grant_type: 'refresh_token',
    client_id : client_id,
    client_secret : client_secret,
    refresh_token : refresh_token,
  };

  const url = 'https://' + domain +'/oauth/token';

  try {
    const response = await axios.post(url, data, {
      headers: {'content-type': 'application/x-www-form-urlencoded'}
    });
    return response.data;
  } catch (error) {
    console.error('Error refreshing token:', error.response ? error.response.data : error.message);
  }
}


