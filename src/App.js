
import './App.css';
import Navbar from './components/Navbar';
import {Route,Routes} from 'react-router-dom'
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import PranksPage from './pages/PrankListPage';
import PrankDetailPage from './pages/PrankDetailPage';
import MyPranksPage from './pages/MyPranksPage';


function App() {
  return (
    <div className="App">

      <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/signup' element={<SignUpPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/pranks' element={<PranksPage/>}/>
        <Route path='/pranks/:id' element={<PrankDetailPage/>}/>
        <Route path='/mypranks' element={<MyPranksPage/>}/>
      </Routes>

    </div>
  );
}

export default App;
