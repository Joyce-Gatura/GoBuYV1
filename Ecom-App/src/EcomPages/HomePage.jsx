import '../styles/homepage.css'
import NavBar from '../ReUsables/NavBar'
import Footer from '../ReUsables/Footer'
import Banner from "../ReUsables/Banner"
import ProductBox from '../Components/ProductBox'
import products from '../ProductsData/Modern'

const HomePage = () => {
  return (
    <div className="home-container">
      <NavBar />
      <Banner />

      <section className="products-section">
        <h2 className="products-title">Featured Products</h2>
        <div className="products-grid">
          {products.map((product) => (
            <ProductBox key={product.id} product={product} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default HomePage
