import { Mail, Phone, MapPin } from "lucide-react";
import "../styles/contact.css";
import Navbar from "../ReUsables/NavBar";

const contactItems = [
  {
    icon: Mail,
    bgColor: "#F3E8FF",
    color: "green",
    title: "Our Email",
    value: "gatura@mail.com",
    isLink: false,
  },
  {
    icon: Phone,
    bgColor: "#DBEAFE",
    color: "#58c4f6",
    title: "Phone",
    value: "+254 46 550 967",
    isLink: false,
  },
  {
    icon: MapPin,
    bgColor: "#FFEDD5",
    color: "#ffb703",
    title: "Visit Us",
    value: "Nyeri, Kenya, Bomas",
    isLink: false,
  },
];

const Contact = () => {
  return (
    <div className="contact-page">
      <Navbar />

      <div className="contact-container">
        <div className="contact-left">
          <h1>Contact Us</h1>

          <p className="contact-text">Your feedback helps us improve our services.</p>

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
              <label htmlFor="fullname">Full Name</label>
              <input id="fullname" type="text" placeholder="Full Name" />
            </div>

            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <input id="email" type="email" placeholder="Enter your email address" />
            </div>

            <div className="input-group">
              <label htmlFor="message">About your inquiry</label>
              <textarea id="message" rows="5" placeholder="Enter your message"></textarea>
            </div>

            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;