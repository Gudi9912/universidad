import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import './App.css';
import ConsultarObra from './components/Consultar';
import RegistrarObra from './components/Registrar';
import Menu from './components/Menu';
import EditarObra from './components/Editar'
//BOOSTRAP SE IMPORTA EN INDEX.HTML

function App() {
  return (
    <Router>
    <div className='container'>
      <Menu></Menu>
      <div className='row'>
        <div className='col-12'>
            <div>
              <Routes>
                {/* Se toma la url actual del usuario y se le dice que cuando vaya a esa url + /, deberia ir
                a ConsultarPiloto */}
                <Route path='/' element={<ConsultarObra />} />
                <Route path='/registrar' element={<RegistrarObra />} />
                <Route path='/:id' element={<EditarObra />} />
              </Routes>
            </div>
        </div>
      </div>
    </div>
    </Router>
  );
}

export default App;
