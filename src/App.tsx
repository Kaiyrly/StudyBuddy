import React from 'react';
import './App.css';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { ErrorPage } from './pages/ErrorPage';
import { NavBar } from './components/NavBar';
import { Container } from 'react-bootstrap';
import { Settings } from './pages/Settings';
import { GoalPage } from './pages/GoalPage';
import { Login } from './pages/Login';
import { Layout } from './components/Layout';
import { Statistics } from './pages/Statistics';
import useToken from './hooks/useToken';

function App() {
  const {token, setToken} = useToken()
  return (
    <>
      <NavBar token={token} setToken={setToken}/>
      <Container>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route 
              path="settings" 
              element={
                <RequireAuth>
                  <Settings />
                </RequireAuth>
              } 
            />
            <Route path="statistics" element={<Statistics />} />
            <Route path="goals/:id" element={<GoalPage />} />
            <Route path='login' element={<Login token={token} setToken={setToken}/>} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </Container>
    </>
  );
}

function RequireAuth({ children }: { children: JSX.Element }) {
  let {token} = useToken();
  let location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default App;
