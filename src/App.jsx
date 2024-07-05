import { Provider } from "react-redux";
import Home from "./components/Home/home";
import { store } from "./Redux/store";


function App() {

  return(
    <>
    <Provider store={store}>
    <Home/>
    </Provider>
    </>
  )
  
}

export default App;
