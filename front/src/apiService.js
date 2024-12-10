//...
const apiUrl = process.env.REACT_APP_API_URL;

export const fetchData = () => {
  return fetch(`${apiUrl}/api`, {
    method: 'GET',  // Make sure the method is correct
    headers: {
      'Content-Type': 'application/json'  // Ensure Content-Type is set correctly
    }
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();  // Parse response as JSON
  })
  .then((data) => {
    return data;
  })
  .catch((error) => {
    console.error('Error fetching data:', error);  // Handle fetch errors
  });
};

