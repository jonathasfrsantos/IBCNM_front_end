import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainTable from "./components/MainTable/MainTable";
import MainForm from "./components/MainForm/MainForm";


function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<MainTable />}/>
            
            

            </Routes>
        </BrowserRouter>
    )

}

export default AppRoutes;