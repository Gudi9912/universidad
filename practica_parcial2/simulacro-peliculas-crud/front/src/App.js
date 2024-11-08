import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import './App.css';
import ConsultarPelicula from './components/ConsultarPeliculas';
import RegistrarPelicula from './components/RegistrarPelicula';
import Menu from './components/Menu';
import EditarPelicula from './components/EditarPelicula';

function App() {
  // recuerden siempre tener abierta las DEV TOOLS, pestañas red y consola.
  return (
    <div className='container'>
      <Menu></Menu>
      <div className='row'>
        <div className='col-12'>
          <Router>
            <div>
              <Routes>
                {/* rutas de la app */}
                <Route path='/' element={<ConsultarPelicula />} />
                <Route path='/registrar' element={<RegistrarPelicula />} />
                <Route path='/editar/:id' element={<EditarPelicula />} />  {/* el :id es replazado por numeros en tiempo de ejecucion para despues en el componente hacer un getPeliculaByID */}
              </Routes>
            </div>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
