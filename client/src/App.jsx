import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Main from './components/main/Main'
import Login from './components/login/Login'
import { useCheckAuth } from './hooks/useCheckAuth'
import Registration from './components/register/Registration'
import Account from './components/account/Account'
import AddLot from './components/addLot/AddLot'

export default function App() {
  const {auth, setAuth} = useCheckAuth()
  
  return(
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<Main auth={auth}/>}/>
          {
            !auth && <Route path='/login' element={<Login setAuth={setAuth}/>}/>
          }
          {
            !auth && <Route path='/registration' element={<Registration/>}/>
          }
          {
            auth && <Route path='/account' element={<Account setAuth={setAuth}/>}/>
          }
          {
            auth && <Route path='/addNewLot' element={<AddLot/>}/>
          }
        </Routes>
      </BrowserRouter>
    </div>
  )
}
