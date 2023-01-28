import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './components/Navbar/Navbar'
import MainTable from './components/MainTable/MainTable';
import Buttons2 from './components/Buttons/Buttons';
import MainForm2 from './components/MainForm/MainForm';

function App() {

  return (
      <div>
        <NavBar />
        <Buttons2 />
        <MainTable />
        <MainForm2 />
      </div>
  );
};

export default App;