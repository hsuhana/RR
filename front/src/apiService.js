//...
const apiUrl = process.env.REACT_APP_API_URL;

export const fetchData = () => {
  return fetch(`${apiUrl}/api`, {
  method: 'GET', // or 'POST', depending on the request
  mode: 'no-cors', // Set mode to 'no-cors'
})
    .then((response) => response.json())
    .then((data) => data);
};
