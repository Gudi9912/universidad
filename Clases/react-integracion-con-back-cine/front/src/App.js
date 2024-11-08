import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import './App.css';
import ConsultarPelicula from './components/ConsultarPeliculas';
import RegistrarPelicula from './components/RegistrarPelicula';
import Menu from './components/Menu';

function App() {
  return (
    <div className='container'>
      <Menu></Menu>
      <div className='row'>
        <div className='col-12'>
          <Router>
            <div>
              <Routes>
                <Route path='/' element={<ConsultarPelicula />} />
                <Route path='/registrar' element={<RegistrarPelicula />} />
              </Routes>
            </div>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
