//...
const apiUrl = process.env.REACT_APP_API_URL;

export const fetchData = () => {
  return fetch(`${apiUrl}/api`, {  // Change from `/api/index.js` to `/api`
    method: 'GET',
    mode: 'no-cors',  // Use 'cors' instead of 'no-cors'
  })
  .then((response) => response.json())
  .then((data) => data);
};
