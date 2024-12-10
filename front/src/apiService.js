//...
const apiUrl = process.env.REACT_APP_API_URL;

export const fetchData = () => {
  return fetch(`${apiUrl}/api`, {  // Make sure the URL is correct
    method: 'GET', // or 'POST', depending on the request
    mode: 'cors', // Use 'cors' to enable proper cross-origin requests
  })
  .then((response) => response.json())
  .then((data) => data);
};
