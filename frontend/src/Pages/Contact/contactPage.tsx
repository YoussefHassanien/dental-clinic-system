import React, { useState } from "react";
import Navbar from "../../Common/Components/Navbar/navbar";
import SubNavbar from "../../Common/Components/Sub-Navbar/subNavbar";
import map from "../../assets/map.png";
import Footer from "../../Common/Components/Footer/footer";
import Button from "../../Common/Components/Button/button";
import SuccessMessage from "../../Common/Components/Success-Message/successMessage";

const ContactPage: React.FC = () => {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages((prev) => [...prev, { sender: "user", text: input }]);
      setInput("");

      // Simulate bot response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: generateBotResponse(input) },
        ]);
      }, 1000);
    }
  };

  const generateBotResponse = (userInput: string): string => {
    const lowerCaseInput = userInput.toLowerCase();

  if (lowerCaseInput.includes("hello") || lowerCaseInput.includes("hi")) {
    return "Hello! Welcome to dentiPlus. How can I assist you today?";
  }

  if (lowerCaseInput.includes("services")) {
    return "We offer a wide range of dental services including general check-ups, teeth cleaning, fillings, root canals, dental implants, and cosmetic dentistry.";
  }

  if (lowerCaseInput.includes("appointment")) {
    return "To schedule an appointment, please call us at (123) 456-7890 or visit our website to book online.";
  }

  if (lowerCaseInput.includes("pricing") || lowerCaseInput.includes("cost")) {
    return "Our pricing varies depending on the treatment required. Please contact our front desk for detailed pricing information or request an estimate through our website.";
  }

  if (lowerCaseInput.includes("teeth whitening")) {
    return "We offer professional teeth whitening services that are safe and effective. Book a consultation to learn more about our teeth whitening options.";
  }

  if (lowerCaseInput.includes("root canal")) {
    return "A root canal is a procedure to treat infection in the tooth's pulp. Our experienced dentists can perform this procedure with minimal discomfort. Contact us for more information.";
  }

  if (lowerCaseInput.includes("insurance")) {
    return "We accept most dental insurance plans. Please contact our office with your insurance details, and we can verify coverage for your visit.";
  }

  if (lowerCaseInput.includes("location")) {
    return "Our dental hospital is located at 123 Smile Ave, Dental City. We look forward to seeing you!";
  }

  if (lowerCaseInput.includes("emergency")) {
    return "If you're experiencing a dental emergency, please call our emergency hotline at (123) 456-7891 for immediate assistance.";
  }

  if (lowerCaseInput.includes("contact")) {
    return "You can reach us by phone at (123) 456-7890 or via email at info@dentalhospital.com. We look forward to assisting you!";
  }

  // Default response if no matching question is found
  return "I'm here to help! Please ask me a question about our dental services or treatments.";
};


  return (
    <div className="flex flex-col justify-start items-center relative w-full h-screen font-serif">
      <SubNavbar />
      <div className="translate-x-24 mb-5">
        <Navbar />
      </div>
      <hr className="bg-gray-100 -translate-y-[14px] w-full mb-10" />

      {/* Main Content */}
      <div className="flex flex-row justify-center items-start space-x-10 shadow-md p-4 mb-6">
        {/* Left Side: Map */}
        <div className="flex flex-col justify-start items-center space-y-5 p-4">
          <h1 className="text-2xl font-bold">
            We <span className="text-customBlue">exist</span> in more than{" "}
            <span className="font-sans text-customBlue">30 countries</span>
          </h1>
          <img src={map} alt="map" className="w-[500px] h-[300px]" />
        </div>

        {/* Right Side: Contact Us Form and Chatbot */}
        <div className="flex flex-row space-x-10">
          {/* Contact Us Form */}
          <div className="flex flex-col w-[400px] shadow-md p-6 rounded-lg bg-white">
            <p className="font-bold text-2xl text-center mb-4">
              Contact <span className="text-customBlue">With</span> Us
            </p>
            <hr className="bg-customBlue my-2 w-1/12 h-1" />
            <p className="text-black text-md text-center mb-4">
              If you have any questions, feel free to contact us.
            </p>
            <div className="flex flex-col space-y-4 mb-4">
              <input
                type="text"
                className="text-gray-400 rounded-md border-2 p-2 w-full"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="text"
                className="text-gray-400 rounded-md border-2 p-2 w-full"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
              <input
                type="text"
                className="text-gray-400 rounded-md border-2 p-2 w-full"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <textarea
                className="text-gray-400 rounded-md border-2 p-2 w-full h-40"
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            {/* Success Message */}
            <div className="w-full p-2">
              <SuccessMessage
                text="Your message has been sent successfully, A confirmation email will be sent to you."
                isVisible={showSuccessMessage}
              />
            </div>

            <div className="w-full p-4 justify-center flex flex-row">
              <Button
                text="Send"
                width="w-3/5"
                onClick={() => setShowSuccessMessage(true)}
              />
            </div>
          </div>

          {/* Chatbot Section */}
          <div className="flex flex-col w-[400px] shadow-md p-6 rounded-lg bg-white">
            <p className="font-bold text-2xl text-center mb-4">Chat with Us</p>
            <div className="flex-grow overflow-y-auto space-y-4 mb-4 p-4 border rounded-md" style={{ maxHeight: "400px", overflowY: "scroll", border: "1px solid #ccc", padding: "10px" }}>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`${
                      msg.sender === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-black"
                    } rounded-lg px-4 py-2 max-w-[75%]`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex space-x-2 mb-4">
              <input
                type="text"
                className="flex-grow border-2 rounded-md p-2"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSendMessage();
                }}
              />
              <Button text="Send" onClick={handleSendMessage} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};



export default ContactPage;
