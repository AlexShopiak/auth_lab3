const axios = require("axios");

async function getToken(domain, client_id, client_secret, audience) {
    const options = {
    method: 'POST',
    url: `https://${domain}/oauth/token`,
    headers: {'content-type': 'application/x-www-form-urlencoded'},
    data: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: client_id,
        client_secret: client_secret,
        audience: audience
    })
    };
    try {
        const response = await axios(options);
        return response.data;
    } catch (error) {
        console.error('Error changing password:', error.response ? error.response.data : error.message);
    }
}

async function changePassword(domain, token, userId, newPassword) {
    const options = {
        method: 'PATCH',
        url: `https://${domain}/api/v2/users/${userId}`,
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        data: {password: newPassword, connection: 'Username-Password-Authentication'}
      };
    try {
        const response = await axios(options);
        return response.data;
    } catch (error) {
        console.error('Error changing password:', error.response ? error.response.data : error.message);
    }
}

