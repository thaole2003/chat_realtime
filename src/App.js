import Home from './pages/Home';
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom';
import "./style.scss";
import { useContext } from 'react';
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
