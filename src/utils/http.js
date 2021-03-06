const baseUrl = 'https://api.moskitcrm.com/v1';

const headers = new Headers({
  'Content-Type': 'application/json',
  'apikey': '', //DEFINIR APIKEY
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
    .catch((error) => error.json());
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
  POST: (route, body = {}) => {
    const URL = formatUrl(route);
    const config = {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    };
    
    return newRequest(URL, config);
  },
};

export default http;
