const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
const API_URL = process.env.REACT_APP_NEWS_API;

export function getEverything(success) {
  return fetch(`${API_URL}/everything?q=technology&apiKey=${API_KEY}`)
    .then(checkStatus)
    .then(parseJSON)
    .then(success)
    .catch(() => {
      console.log('error')
    })
}

export function getSources(success) {
  return fetch(`${API_URL}/sources?language=en&apiKey=${API_KEY}`)
    .then(checkStatus)
    .then(parseJSON)
    .then(success)
    .catch(() => {
      console.log('error')
    })
}

export function getNewsBySource(source) {
  return fetch(`${API_URL}/everything?sources=${source}&apiKey=${API_KEY}`)
    .then(checkStatus)
    .then(parseJSON)
    .catch(() => {
      console.log('error')
    })
}

export function getNewsBySearch(search) {
  return fetch(`${API_URL}/everything?qInTitle=${search}&apiKey=${API_KEY}`)
    .then(checkStatus)
    .then(parseJSON)
    .catch(() => {
      console.log('error')
    })
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log(error);
    throw error;
  }
}

function parseJSON(response) {
  return response.json();
}
