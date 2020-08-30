const CLIENT_ID = '13FC_4hEJ71DUWK54sLH47jO3xhquw-OtZlrp3fSALoTNQw3jh4zIjbWeuqSHqDj';

const getAuthorizationToken = async () => {
  const params = `client_id=${CLIENT_ID}`;
  const endpoint = 'https://api.genius.com/oauth/authorize';
  const url = `${endpoint}?${params}`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Origin: 'www.google.com',
      'X-Requested-With': 'XMLHttpRequest',
    },
  };

  const response = await fetch(url, options);
  const result = await response.text();

  //   if (!result) {
  //     throw new Error('Invalid spotify response');
  //   }

  //   return result.access_token;
  return result;
};

getAuthorizationToken();
