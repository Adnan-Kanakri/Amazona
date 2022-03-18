import { Fragment } from "react";
import { Route, Routes } from "react-router-dom"
import HomeScreen from "../components/HomeScreen/HomeScreen"


const registerOptionalParamRoute = (optionalParams, element) => {
    if (optionalParams.length === 0)
        return <Fragment />;

    const param = optionalParams[0];
    optionalParams.splice(0, 1);

    return <Route path={param} element={element}>
        {registerOptionalParamRoute(optionalParams, element)}
    </Route>;
};

const registerOptionalParams = (path, element) => {
    const params = path.split("/");
    let basePath = "";
    let optionalParams = [];

    for (let i = 0; i < params.length; i++) {
        if (params[i] === '')
            continue;

        if (!params[i].includes("?"))
            basePath += "/" + params[i];
        else
            optionalParams.push(params[i].substr(0, params[i].length - 1));
    }

    return <Route path={basePath} key={basePath} element={element}>
        {registerOptionalParamRoute(optionalParams, element)}
    </Route>;
};



const myAllRoute = () => {

    console.log("testing routes");
    <Routes>
        <Route path="/" element={<HomeScreen />} />
    </Routes>
}

export default myAllRoute;


