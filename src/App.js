import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Photos } from "./pages/Photos";
import { Todos } from "./pages/Todos";
import { ProtectedRoute } from "./components/ProtectedRoute";

import useWeather from "./hooks/useWeather";
import useNews from "./hooks/useNews"
import usePhotos from "./hooks/usePhotos";
import useTodos from "./hooks/useTodos";
import useWarmers from "./hooks/useWarmers";

import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);

  const [weather, setWeather] = React.useState({});
  // useWeather(setWeather, loggedIn)

  const [news, setNews] = React.useState({})
  useNews(setNews, loggedIn)

  const [photos, setPhotos] = React.useState([]);
  usePhotos(setPhotos, loggedIn);

  const [todos, setTodos] = React.useState([]);
  useTodos(setTodos, loggedIn);

  const [warmers, setWarmers] = React.useState({});
  useWarmers(setWarmers, loggedIn);

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/signup">
            <Signup />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <ProtectedRoute path="/photos" setLoggedIn={setLoggedIn}>
            <Photos photos={photos} setPhotos={setPhotos} />
          </ProtectedRoute>

          <ProtectedRoute path="/todos" setLoggedIn={setLoggedIn}>
            <Todos todos={todos} setTodos={setTodos} />
          </ProtectedRoute>

          <ProtectedRoute path="/" setLoggedIn={setLoggedIn}>
            <Home
              weather={weather}
              photos={photos}
              todos={todos}
              warmers={warmers}
              news={news}
            />
          </ProtectedRoute>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
