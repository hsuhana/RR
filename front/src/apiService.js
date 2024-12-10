const apiUrl = process.env.REACT_APP_API_URL;

export const fetchData = () => {
  return fetch(`${apiUrl}/apiService`)
    .then((response) => response.json())
    .then((data) => data);
};
