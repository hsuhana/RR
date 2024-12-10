const apiUrl = process.env.REACT_APP_API_URL;

export const fetchData = () => {
  return fetch(`${apiUrl}/api`)
    .then((response) => response.json())
    .then((data) => data);
};
