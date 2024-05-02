import { BrowserRouter,Route,Router } from 'react-router-dom';
import './App.css';
import { AuthWrapper } from './auth/AuthWrapper';

import { BrowserRouter as Routes } from 'react-router-dom';
import SearchResult from './components/SearchResult';
import ResearchDetailPage from './components/pages/ResultPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthWrapper />
        
  
      </BrowserRouter>   

    </div>
    
  );
}

export default App;
