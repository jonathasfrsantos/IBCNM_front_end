import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './components/Navbar/Navbar'

import Buttons2 from './components/Buttons/Buttons';
import MainForm2 from './components/MainForm/MainForm';
import MainTable2 from './components/MainTable/MainTable2';

function App() {

  return (
      <div>
        <NavBar />
        <Buttons2 />
        <MainTable2 />
        <MainForm2 />
      </div>
  );
};

export default App;
