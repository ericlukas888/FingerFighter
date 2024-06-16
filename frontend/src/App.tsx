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

function App() {
  return (
    <div className="App">
      <PreLoader isOpen={false}/>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path='/' element={<MainPage />} />
            <Route path='/mine' element={<MinePage />} />
            <Route path='/friends' element={<FriendsPage />} />
            <Route path='/earn' element={<EarnPage />} />
            <Route path='/wallet' element={<WalletPage />} />
            <Route path='/level' element={<LevelPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
