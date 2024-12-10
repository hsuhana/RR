//...
const apiUrl = process.env.REACT_APP_API_URL;

export const fetchData = () => {
  return fetch(`${apiUrl}/api`) // Change from `/api/index.js` to `/api`
  .then((response) => response.json())
  .then((data) => data);
};
