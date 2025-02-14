import { useState } from "react";
import Popup from "./Popup";

const Contact = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowPopup(true);
  };

  return (
    <section id="contact">
      <h2>Yhteystiedot</h2>
      <p>Ota yhteyttä meihin alla olevalla lomakkeella.</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nimi:</label>
        <input type="text" id="name" name="name" required />

        <label htmlFor="email">Sähköposti:</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="message">Viesti:</label>
        <textarea id="message" name="message" required></textarea>

        <button type="submit">Lähetä</button>
      </form>
      {showPopup && <Popup close={() => setShowPopup(false)} />}
    </section>
  );
};

export default Contact;
