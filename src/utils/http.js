const baseUrl = 'https://api.moskitcrm.com/v1';
// nao consigui criar o .env para a apikey
const headers = new Headers({
  'Content-Type': 'application/json',
  'apikey': '',
})

function formatUrl(route, params) {
  let URL;
  const paramsString = new URLSearchParams(params).toString();

  if (paramsString.length) {
    URL = `${baseUrl}/${route}?${paramsString}`;
  } else {
    URL = `${baseUrl}/${route}`;
  }

  return URL;
}

function newRequest(URL, config) {
  return fetch(URL, config)
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

const http = {
  GET: (route, params = {}) => {
    const URL = formatUrl(route, params);
    const config = {
      method: 'GET',
      headers,
    };
    
    return newRequest(URL, config);
  },
  POST: (route, body) => {
    const URL = formatUrl(route);
    const config = {
      method: 'POST',
      headers,
      body
    };
    
    return newRequest(URL, config);
  },
};

export default http;
