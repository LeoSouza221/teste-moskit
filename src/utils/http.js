const baseUrl = 'https://api.moskitcrm.com/v1';
// nao consigui criar o .env para a apikey
const headers = new Headers({
  'Content-Type': 'application/json',
  'apikey': '',
})

function http(method, route) {
  const URL = `${baseUrl}/${route}`;

  return fetch(URL, {
    method,
    headers,
  })
    .then((response) => response.json())
    .catch((error) => console.error(error));
}


export default http;