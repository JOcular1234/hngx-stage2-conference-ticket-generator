import JsBarcode from "jsbarcode";
import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { MapPin } from "lucide-react";

import "../styles/ticket.css"; // Ensure this file exists or remove this import

const TicketConfirmation = ({onBack, ticketType, quantity, attendee }) => {
  const barcodeRef = useRef(null);
  const ticketRef = useRef(null); // Reference for capturing ticket
  const [isDownloading, setIsDownloading] = useState(false); // Loading state

  useEffect(() => {
    // Generate barcode using the attendee's email
    if (barcodeRef.current && attendee.email) {
      JsBarcode(barcodeRef.current, attendee.email, {
        format: "CODE128",
        displayValue: false,
        width: 2,
        height: 50,
      });
    }
  }, [attendee.email]);

  // 📥 Function to Download Ticket as PDF
  const downloadTicket = async () => {
    setIsDownloading(true); // Show loading state

    try {
      const canvas = await html2canvas(ticketRef.current, {
        scale: 2,
        useCORS: true, // Fix CORS issues
        backgroundColor: "#ffffff", // Ensures a solid background
        // ignoreElements: (element) => element.tagName.toLowerCase() === "svg", // Exclude SVG (barcode)
        ignoreElements: (element) => {
            return element.tagName.toLowerCase() === "svg" || 
                   (element.style && element.style.color && element.style.color.includes('oklch'));
          },
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
      pdf.save(`TechemberFest_Ticket_${attendee.fullName || "Guest"}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }

    setIsDownloading(false); // Hide loading state
  };

  return (
    <div className="ticket-confirmation-container max-w-lg mx-auto p-6 shadow-lg rounded-md mt-6 text-center">
      {/* Ticket Content */}
      <div ref={ticketRef} className="p-4  rounded-md"> 
        <p className="text-2xl text-white font-bold">Your Ticket is Booked 🎉</p>
        <p className="text-gray-400">Check your email for a copy or you can <span className="text-white font-bold">download</span></p>

        </div>
        <div className="summary-div">
          <div className="summary-div-inner text-center ">
        {/* Event Details */}
        <div className="">
          <p className="confirmaiton-location text-2xl font-semibold">TechemberFest "25</p>
          <div className="">
          <p className="text-gray-300 text-sm flex justify-center "><span className="location-icon"><MapPin className=" text-red-500" /></span> 4, Ikoyi Lagos, Nigeria</p>
          </div>
          <p className="text-gray-300 text-sm">Date: December 10, 2025</p>
        </div>

        {/* Avatar Display */}
        {attendee.avatar && (
          <div className="mt-4 flex justify-center mx-auto">
            <img
              src={attendee.avatar}
              alt="Attendee Avatar"
              className="w-24 h-24 rounded-sm mx-auto border"
              crossOrigin="anonymous" // Fix CORS issues
            />
          </div>
        )}

<div className="details-container">
          <table>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>
            <tr>
              <td className="text-name">{attendee.fullName || "N/A"}</td>
              <td className="text-email">{attendee.email  || "N/A"}</td>
            </tr>
            <tr>
              <th>Ticket Type</th>
              <th>Ticket for:</th>
            </tr>
            <tr>
              <td className="text-sm ">{ticketType}</td>
              <td className="text-sm">{quantity}</td>
            </tr>
            
          </table>
          <div className="textarea-special">
            <div className="attendee-note text-sm text-start text-gray-200" name="" id="">{attendee.notes}</div>
          </div>
          </div>

        {/* Barcode Generation */}
        <div className="bar-code-container mt-6 ">
          <svg className="confirmation-bar-code" ref={barcodeRef}></svg>
          <p className="text-sm text-gray-200 mt-2">Scan this barcode at the event.</p>
        </div>
      </div>
      </div>
      {/* ✅ Single Download Button (Removed Duplicate) */}
      <div className="download-section flex justify-between">
      <button className="book-btn" onClick={onBack}>Book Another Ticket</button>
      <button
        onClick={downloadTicket}
        className="download-btn mt-4 bg-blue-500 text-white px-4 py-2 rounded flex justify-center items-center"
        disabled={isDownloading}
      >
        {isDownloading ? "Generating..." : "Download Ticket"}
      </button>
      </div>
    </div>
  );
};

export default TicketConfirmation;
