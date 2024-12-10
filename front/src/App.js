//import {useEffect, useState} from 'react';

//for JSX syntax transformed into React function calls, React 17+ no need this
import React from 'react';

import NavbarRouter from './components/NavbarRouter';
import MainRouter from './components/MainRouter';
import Footer from './components/Footer';
import { fetchData } from './apiService'; // Import API utility function(Vercel)
import './App.css';


function App() {

  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData()
      .then((data) => setData(data)) // Set the data once it's fetched...
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="App">
      <NavbarRouter />
      <main>
        {/* Pass the fetched data as a prop to MainRouter or other components */}
        <MainRouter data={data} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
