import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import SearchResult from "./pages/SearchResult";
import Order from "./pages/Order";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";



function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/products/:category" element={<ProductList/>}/>
        <Route path="/product/:id" element={<Product/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/search" element={<SearchResult />}/>
        <Route path="/order" element={<Order />}/>
        <Route path="/success" element={<Success />}/>
        <Route path="/cancel" element={<Cancel />}/>
        
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
