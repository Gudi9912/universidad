import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import './App.css';
import Consultar from './components/Consultar';
import Registrar from './components/Registrar';
import Menu from './components/Menu';
import Editar from './components/Editar'
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
                <Route path='/' element={<Consultar/>} />
                <Route path='/registrar' element={<Registrar/>} />
                <Route path='/:id' element={<Editar/>} />
              </Routes>
            </div>
        </div>
      </div>
    </div>
    </Router>
  );
}

export default App;
