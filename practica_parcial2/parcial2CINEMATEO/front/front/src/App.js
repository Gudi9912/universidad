import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import './App.css';
import Menu from './components/Menu';
import ConsultarConductores from './components/ConsultarConductores';
import RegistrarConductor from './components/RegistrarConductor';
import EditarConductor from './components/EditarConductor';

function App() {
  return (
    <div className="container">
      <Menu/>
      <div className="row">
        <div className="col-12">
          <Router>
            <div>
              <Routes>
                <Route path="/" element={<ConsultarConductores/>} />
                <Route path="/registrar" element={<RegistrarConductor/>}/>
                <Route path="/editar/:id" element={<EditarConductor/>}/>
              </Routes>
            </div>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
