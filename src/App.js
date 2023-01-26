import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './components/Navbar/Navbar'
import MainTable from './components/MainTable/MainTable';
import Toolbar from './components/Buttons/Buttons';
import MainForm from './components/MainForm/MainForm';

function App() {

  return (
      <div>
        <NavBar />
        <Toolbar />
        <MainTable />
        <MainForm />
      </div>
  );
};

export default App;