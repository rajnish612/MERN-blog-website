import { useState } from 'react'
import Register from './components/register'
import Login from './components/Login';
import Dashboard from './components/dashboard';
import MyPosts from './components/myPosts';
import { BrowserRouter, Routes, Route } from "react-router";
import Createblog from './components/create';
import PreviewBlog from './components/previewBlog';
import Home from './components/home';
import Reset from './components/reset';
import AboutUs from './components/about';
import RemoveAccount from './components/removeAccount';
// import { fileURLToPath } from 'url';
// import dotenv from "dotenv"
// import path from 'path';
// const filepath = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(filepath);
// dotenv.config({ path: path.resolve(__dirname, "../.env") })
function App() {
  const [count, setCount] = useState(0)


  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/dashboard/myPost' element={<MyPosts/>}></Route>
        <Route path='/removeAccount' element={<RemoveAccount/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/reset' element={<Reset/>}></Route>
        <Route path='/aboutus' element={<AboutUs/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/dashboard/create' element={<Createblog/>}></Route>
        <Route path='/dashboard/:id' element={<PreviewBlog/>}></Route>
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
