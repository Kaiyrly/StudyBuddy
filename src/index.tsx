import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { Login } from './pages/Login';
import { ErrorPage } from './pages/ErrorPage';
import { MainPage } from './pages/MainPage';
import { GoalPage } from './pages/GoalPage';
import { Statistics } from  './pages/Statistics';
import { Settings } from './pages/Settings'; 
import 'bootstrap/dist/css/bootstrap.css';
import { NavBar } from './components/NavBar';
import ToDoTypeView from './components/ToDoTypeView';
const demoTodo = [{name: "Do first subtask", value: false}, {name: "Do another subtask", value: false}]

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/statistics",
    element: <Statistics />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/settings",
    element: <Settings />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/main",
    element: <MainPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/goals/:id",
    element: <GoalPage/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/test",
    element: <ToDoTypeView todos={demoTodo}/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
    errorElement: <ErrorPage />
  }
]);

root.render(
  <React.StrictMode>
    <NavBar />
    <Container>
      <RouterProvider router={router} />
    </Container>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
