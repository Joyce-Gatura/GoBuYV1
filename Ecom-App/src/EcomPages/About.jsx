import { useNavigate } from "react-router-dom";
import NavBar from "../ReUsables/NavBar";
import Footer from "../ReUsables/Footer";
import "../styles/about.css";
import Laptop2 from "../assets/laptop2.jpg";
import duvet1 from "../assets/duvet1.jpg";
import jewerly1 from "../assets/jewerly1.jpg";
import { useProductFilters } from "../UseContext/ProductFilterContext";

const About = () => {
  const navigate = useNavigate();
  const { setFilters } = useProductFilters();

  const handleExplore = (category) => {
    setFilters((prev) => ({ ...prev, category }));
    navigate("/allproductspage");
  };

  return (
    <div className="about-page">
      <NavBar />

      <section className="heros">
        <h2>Your daily priorities, delivered with quality and care</h2>
      </section>

      <section className="mission">
        <h2>MISSION</h2>
        <p>
          To carefully select products that combine modernity, self-care, and comfort.
          Whether it is computer accessories, beauty and grooming, or home décor, we
          ensure you shop with confidence and satisfaction.
        </p>
      </section>

      <section className="values">
        <h2>OUR VALUES</h2>
        <ul>
          <li>High-quality products from trusted suppliers</li>
          <li>Affordable pricing for all budgets</li>
          <li>Easy online shopping and fast checkout</li>
          <li>Dedicated customer support whenever you need it</li>
        </ul>
      </section>

      <section className="our-products">
        <h2>OUR PRODUCTS</h2>

        <div className="categories">
          <div className="modern">
            <h3>Computer Accessories</h3>
            <img src={Laptop2} alt="Computer accessories" />
            <button type="button" onClick={() => handleExplore("Tech-Gudgets")}>Explore</button>
          </div>

          <div className="beauty">
            <h3>Beauty & Selfcare</h3>
            <img src={jewerly1} alt="Beauty and self-care products" />
            <button type="button" onClick={() => handleExplore("Beauty & Selfcare")}>Explore</button>
          </div>

          <div className="home">
            <h3>Home Decors</h3>
            <img src={duvet1} alt="Home decor products" />
            <button type="button" onClick={() => handleExplore("Home-Decor")}>Explore</button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;