import Home from './pages/Home';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import "./style.scss";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
                <Home />
            }
          />
        </Route>
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
