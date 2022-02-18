import { Route, Routes } from "react-router-dom"
import HomeScreen from "../components/HomeScreen/HomeScreen"


const myAllRoute = () => {

    console.log("testing routes");
    <Routes>
        <Route path="/" element={<HomeScreen />} />
    </Routes>
}

export default myAllRoute;


