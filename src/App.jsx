import './App.css';
import Home from './Home';
import Work from './Work';
import { useState } from 'react';

function App() {
  const [information, setInformation] = useState([]);
  const [showHome, setShowHome] = useState(true);

  console.log("In App — typeof setInformation:", typeof setInformation); // ✅ Should be 'function'

  return (
    <div className="App">
      app.jsx
      {showHome ? (
        <Home
          showHome={showHome}
          setShowHome={setShowHome}
          information={information}
          setInformation={setInformation} // ✅ THIS IS CRUCIAL
        />
      ) : (
        <Work
          showHome={showHome}
          setShowHome={setShowHome}
            information={information}
            setInformation={setInformation}
        />
      )}
    </div>
  );
}

export default App;
