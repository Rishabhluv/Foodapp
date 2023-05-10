import './App.css';
import Home from './component/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from './component/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import SignUp from './component/SignUp';
import { CartProvider } from './component/ContextReducer';
import MyOrder from './component/MyOrder';
function App() {
  return (
    
    <CartProvider>
      <Router>
        <Routes>

          <Route exact path="/" element={<Home></Home>}></Route>
          <Route exact path="/login" element={<Login></Login>}></Route>
          <Route exact path="/createuser" element={<SignUp></SignUp>}></Route>
          <Route exact path="/myOrder" element={<MyOrder></MyOrder>}></Route>
        </Routes>
      </Router>
       </CartProvider>
    
  );
}

export default App;
