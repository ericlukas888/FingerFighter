import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import MinePage from './pages/MinePage';
import FriendsPage from './pages/FriendsPage';
import EarnPage from './pages/EarnPage';
import WalletPage from './pages/WalletPage';
import MainLayout from './components/layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import LevelPage from './pages/LevelPage';
import { PreLoader } from './components/Preloader';
import LandingPage from './pages/LandingPage';
import EndlessRunnerGame from './pages/games/endless_runner';
import { MainContextProvider } from './context/MainContext';

function App() {
  return (
    <div className="App">
      <PreLoader isOpen={false} />
      <BrowserRouter>
        <MainContextProvider>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route element={<MainLayout />}>
              <Route path='/games' element={<MainPage />} />
              <Route path='/mine' element={<MinePage />} />
              <Route path='/friends' element={<FriendsPage />} />
              <Route path='/earn' element={<EarnPage />} />
              <Route path='/wallet' element={<WalletPage />} />
              <Route path='/level' element={<LevelPage />} />
              {/* Games */}
              <Route path='/games/endless_runner' element={<EndlessRunnerGame />} />
            </Route>
          </Routes>
        </MainContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
