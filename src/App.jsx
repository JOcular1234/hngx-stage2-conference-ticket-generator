import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import TicketSelection from "./components/TicketSelection";
import AttendeeForm from "./components/AttendeeForm";
import TicketConfirmation from "./components/TicketConfirmation";
import Footer from "./components/Footer";

const App = () => {
  const [step, setStep] = useState(1);
  const [ticketType, setTicketType] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [attendee, setAttendee] = useState({ fullName: "", email: "", avatar: "", notes: "" });

  // Load saved data from local storage on first render
  useEffect(() => {
    const savedStep = localStorage.getItem("step");
    const savedTicketType = localStorage.getItem("ticketType");
    const savedQuantity = localStorage.getItem("quantity");
    const savedAttendee = localStorage.getItem("attendee");

    if (savedStep) setStep(Number(savedStep));
    if (savedTicketType) setTicketType(savedTicketType);
    if (savedQuantity) setQuantity(Number(savedQuantity));
    if (savedAttendee) setAttendee(JSON.parse(savedAttendee));
  }, []);

  // Save data to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("step", step);
    localStorage.setItem("ticketType", ticketType);
    localStorage.setItem("quantity", quantity);
    localStorage.setItem("attendee", JSON.stringify(attendee));
  }, [step, ticketType, quantity, attendee]);

  // Move to next step after selecting a ticket
  const handleNextFromTicket = (type, qty) => {
    setTicketType(type);
    setQuantity(qty);
    setStep(2);
  };

  // Move to next step after submitting attendee details
  const handleSubmitAttendee = (fullName, email, avatar, notes) => {
    setAttendee({ fullName, email, avatar, notes });
    setStep(3);
  };

  const handleReset = () => {
    localStorage.clear(); // Clear all stored data
    setStep(1);
    setTicketType("");
    setQuantity(1);
    setAttendee({ fullName: "", email: "", avatar: "", notes: "" });
  };
  
  return (
    <div className=" bg-black ">
      <Navbar />

      {step === 1 && <TicketSelection onNext={handleNextFromTicket} />}
      {step === 2 && <AttendeeForm onBack={() => setStep(1)} onSubmit={handleSubmitAttendee} />}
      {step === 3 && <TicketConfirmation ticketType={ticketType} quantity={quantity} attendee={attendee} />}

      <Footer />
    </div>
  );
};

export default App;
