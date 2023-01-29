import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './components/Navbar/Navbar'

import Buttons from './components/Buttons/Buttons';
import MainForm from './components/MainForm/MainForm';
import MainTable from './components/MainTable/MainTable';

function App() {

  return (
      <div>
        <NavBar />
        <Buttons />
        <MainTable />
        <MainForm />
      </div>
  );
};

export default App;
