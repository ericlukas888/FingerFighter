import './App.css';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Header from './components/header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from './pages/LoginPage';
import { MainContextProvider } from './utils/context';
import RegisterPage from './pages/RegisterPage';
import UsersPage from './pages/UsersPage';
import RankingPage from './pages/RankingPage';
import RewardPage from './pages/RewardPage';
import GamePage from './pages/GamePage';

const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

function App() {
  return (
    <div className="App" data-bs-theme="dark">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
/>
    <MainContextProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path='/home' element={<HomePage />} />
            <Route path='/' element={<LoginPage />} />            
            <Route path='/register' element={<RegisterPage />} />       
            <Route path='/users'  element={<UsersPage/>}/>
            <Route path='/rankings' element={<RankingPage/>}/>
            <Route path='/rewards' element={<RewardPage/>}/>
            <Route path='/games' element={<GamePage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </MainContextProvider>
    </div>
  );
}

export default App;
