import { Mail, Phone, MapPin } from "lucide-react";
import "../styles/contact.css";
import Navbar from "../ReUsables/NavBar";
import Footer from "../ReUsables/Footer";

const contactItems = [
  {
    icon: Mail,
    bgColor: "#EA580C",
    color: "white",
    title: "Our Email",
    value: "gatura@mail.com",
    isLink: false,
  },
  {
    icon: Phone,
    bgColor: "#EA580C",
    color: "white",
    title: "Phone",
    value: "+254 746 550 967",
    isLink: false,
  },
  {
    icon: MapPin,
    bgColor: "#EA580C",
    color: "white",
    title: "Visit Us",
    value: "Nyeri, Kenya, Bomas",
    isLink: false,
  },
    {
    icon: MapPin,
    bgColor: "#EA580C",
    color: "white",
    title: "Visit Us",
    value: "Nakuru, Kenya, around Equity",
    isLink: false,
  },
];

const Contact = () => {
  return (
    <div className="contact-page">
      <Navbar />

      <div className="contact-container">
        <div className="contact-left">

          <p className="contact-text">We appreciate your genuine feedback...Enquiry,Compliment or Complain.</p>
          <h1>Contact Us Through:</h1>


          <div className="contact-cards">
            {contactItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <div className="contact-card" key={index}>
                  <div
                    className="contact-icon"
                    style={{
                      backgroundColor: item.bgColor,
                      color: item.color,
                    }}
                  >
                    <Icon size={22} />
                  </div>

                  <h3 className="contact-title">{item.title}</h3>

                  {item.isLink ? (
                    <a href="#" className="contact-value">
                      {item.value}
                    </a>
                  ) : (
                    <p className="contact-value">{item.value}</p>
                  )}
                </div>
              );
            })}
          </div>

        
        </div>

        <div className="contact-right">
          <form className="contact-form">
            <div className="input-group">
              <label htmlFor="fullname">Full Name:</label>
              <input id="fullname" type="text" placeholder="Full Name" />
            </div>

            <div className="input-group">
              <label htmlFor="email">Email Address:</label>
              <input id="email" type="email" placeholder="Enter your email address" />
            </div>

            <div className="input-group">
              <label htmlFor="message">About your inquiry:</label>
              <textarea id="message" rows="5" placeholder="Enter your message"></textarea>
            </div>

            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Contact;