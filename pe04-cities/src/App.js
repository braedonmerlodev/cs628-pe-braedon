import { BrowserRouter as Router } from 'react-router-dom';
import CitiesLayout from './components/CitiesLayout';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Cities Application</h1>
        <CitiesLayout />
      </div>
    </Router>
  );
}

export default App;
