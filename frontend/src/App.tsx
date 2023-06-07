import "bootstrap";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { setCurrntUser } from "./action/authAction";
import { TypeTokenData } from "./action/actionType";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import Navbar from "./components/layout/navbar";
import Blog from "./components/Blog";
import MyBlog from "./components/MyBlog";
if (localStorage.token) {
  const decoded: TypeTokenData = jwt_decode(localStorage.token);
  store.dispatch(setCurrntUser(decoded));
  const currentTime = Date.now() / 1000;
}

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Navbar></Navbar>
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/" element={<Blog />}></Route>
            <Route path="/myblog" element={<MyBlog />}></Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
