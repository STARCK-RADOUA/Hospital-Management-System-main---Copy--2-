import React, { useState } from "react";
import axios from "axios";
import { IoLogoWhatsapp } from "react-icons/io";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [tx, setTx] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post("http://localhost:3001/api/message", {
        email,
        tx,
        message,
      });

      if (response.status === 200) {
        setSuccess(true);
        console.log("Email sent successfully!");
        // Handle success case
      } else {
        setError("Error sending email.");
        console.error("Error sending email.");
        // Handle error case
      }
    } catch (error) {
      setError("Error occurred while sending email.");
      console.error("Error occurred while sending email:", error);
      // Handle error case
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-content flex items-center justify-center ">
      <div className="w-full max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow sm:p-8 md:p-10 dark:bg-gray-800 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-center text-gray-900  mb-4">Contact Us</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h5 className="text-xl font-medium text-gray-900 ">
            Send us a Message
          </h5>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Email
            </label>
            <input
              type="email"
              style={{color : "black"}}
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-500 dark:placeholder-gray-400"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="tx"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Telephone
            </label>
            <input
              style={{color : "black"}}
              type="text"
              name="tx"
              id="tx"
              value={tx}
              onChange={(e) => setTx(e.target.value)}
              className="bg-white bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="0XXXXXXXXXX"
              required
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Message
            </label>
            <textarea
              style={{color : "black"}}
              id="message"
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="block p-2.5 w-full text-sm text-white bg-gray-900 bg-gray-50 rounded-lg border "
              placeholder="Ecrire votre message"
              required
            ></textarea>
          </div>
         
          <button
            type="submit"
            disabled={loading}
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {loading ? "Envoi en cours..." : "Envoyer message"}
          </button>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">Email sent successfully!</p>}
        </form>
      </div>
    </div>
  );
};

export default Contact;
