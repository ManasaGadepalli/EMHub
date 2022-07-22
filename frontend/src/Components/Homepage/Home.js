import NavBar from "../Navbar/Navbar";
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../Homepage/Footer';
import pic7 from '../Images/six.png';
import '../Homepage/Home.css';


const Home = () => {
  return (
    <div className="page-container">
      <NavBar />
      <div className="home">
        <img src={pic7} className='img-fluid' />
        <Footer />
      </div>

    </div>
  )
}

export default Home