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
    <div className="page-content flex items-center justify-center h-screen">
      <div className=" w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            Send us a Message
          </h5>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Mail
            </label>
            <input
              type="email"
              style={{color : "black"}}
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="tx"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="0XXXXXXXXXX"
              required
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Message
            </label>

            <textarea
              style={{color : "white"}}
              id="message"
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ecrire votre message"
            ></textarea>
          </div>
          <div className="py-4">
            <a
              href="https://wa.me/212622582379"
              className="flex items-center text-blue-500 hover:underline"
            >
              <IoLogoWhatsapp className="mr-2" />
              <span>ou contactez nous via WhatsApp</span>
            </a>
          </div>
          <div className="flex items-start">
            <div className="flex items-start">
              <div className="flex items-center h-5"></div>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {loading ? "Envoi en cours..." : "Envoyer message"}
          </button>
          {error && <p className="text-red-500">{error}</p>}
          {success && (
            <p className="text-green-500">Email sent successfully!</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Contact;
