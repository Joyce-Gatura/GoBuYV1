import React from 'react'
import '../styles/banner.css'
import { Link } from 'react-router-dom'

const Banner = () => {
  return (
     <section className='classBanner'>

           <h2>Welcome to GoBy<br/>Computer Accessories, Beauty & Selfcare, Home Decors <br />Online Shop</h2>
            <p>Discover the best deals and products tailored just for you!</p>
            <Link to='/AllProductsPage'> 
            <button>Buy Now</button>
            </Link>


        </section>

  
  )
}

export default Banner