//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'


//import pizzaBackground from './assets/images/pizza.jpg'
import Header from '../Header'
import Main from '../Main'
import Footer from '../Footer'

import './App.css'



function App() {
  return (
    <div className="page">
      <Header title={"We love pizza"} version={0+1} />
      <Main />
      <Footer />
    </div>
  );
}


export default App;


