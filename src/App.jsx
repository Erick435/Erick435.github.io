import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Adding the route for the Dashboard component */}
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
