import { useState, useEffect } from "react";
import { MapPin } from "lucide-react";

const TicketSelection = ({ onNext }) => {
  const [ticketType, setTicketType] = useState(localStorage.getItem("ticketType") || "");
  const [quantity, setQuantity] = useState(Number(localStorage.getItem("quantity")) || 1);
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("ticketType", ticketType);
    localStorage.setItem("quantity", quantity);
  }, [ticketType, quantity]);

  const handleNext = () => {
    if (!ticketType) {
      setError("Please select a ticket type.");
      return;
    }
    setError("");
    onNext(ticketType, quantity);
  };

  return (
    <div className=" main-container max-w-lg mx-auto p-6 shadow-md rounded">
      <h1 className="ticket1 text-2xl font-bold text-white">Ticket Selection</h1>
      <div className="span-ticket w-55 h-1 bg-amber-200"></div>
      <div className="span-ticket2 w-28 h-1 bg-amber-200"></div>
      <div className="main-ticket-section ">
        <p className="name-event text-white text-5xl md">TechemberFest '25</p>
        <div className="mx-auto flex justify-center text-sm">
          <p className="text-white text-center w-3xs">Join us for an unforgettable experience at Techember Fest! Secure your spot now.</p>
        </div>
        <p className="flex justify-center items-center text-center text-sm text-white">
          <span><MapPin className="text-red-500" /></span> TinoHub, Lagos, Nigeria || December 10, 2025 | 7:00PM
        </p>
      </div>
      {/* Ticket Type Selection */}
      <div className="ticket-selections">
        <label className="ticket-text block font-medium text-white border-green-300">Select Ticket Type:</label>
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-3 h-20 justify-center items-center ">
          {[{ type: "Free", price: "FREE", access: "REGULAR ACCESS" }, { type: "VIP", price: "$150", access: "VIP ACCESS" }, { type: "VVIP", price: "$250", access: "VVIP ACCESS" }].map(({ type, price, access }) => (
            <div
              key={type}
              className={` access border rounded cursor-pointer text-center ring p-8 text-white ${ticketType === type ? "border-blue-500 bg-green-800" : "border-gray-300"}`}
              onClick={() => setTicketType(type)}
            >
              <h2 className="text-lg font-bold">{price}</h2>
              <p className="text-sm text-white">{access}</p>
            </div>
          ))}
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>

      {/* Ticket Quantity */}
      <div className="ticket-quality mt-4 sm:mt-24">
        <label className="block font-medium text-white">Number of Tickets:</label>
        <select
          className="number-select w-full mt-2 p-2 border rounded text-black"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>

      {/* Navigation Buttons */}
      <div className="navigation-div-btn mt-6 flex justify-between">
        <button className="cancel-div text-white px-4 py-2 rounded ring bg-black">Cancel</button>
        <button className="next-btn bg-blue-500 text-white px-4 py-2" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default TicketSelection;
