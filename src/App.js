import Container from "@mui/material/Container";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/posts/:id" element={ <FullPost /> } />
          <Route path="/" element={ <Home /> } />
          <Route path="/add-posts" element={ <AddPost /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/register" element={ <Registration /> } />
        </Routes>
      </Container>
    </>
  );
}

export default App;