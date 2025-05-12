import JsBarcode from "jsbarcode";
import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { MapPin } from "lucide-react";

import "../styles/ticket.css";

const TicketConfirmation = ({ onBack, ticketType, quantity, attendee }) => {
  const barcodeRef = useRef(null);
  const ticketRef = useRef(null); // Reference for capturing ticket
  const [isDownloading, setIsDownloading] = useState(false); // Loading state

  useEffect(() => {
    
    if (barcodeRef.current && attendee.email) {
      JsBarcode(barcodeRef.current, attendee.email, {
        format: "CODE128",
        displayValue: false,
        width: 2,
        height: 50,
      });
    }
  }, [attendee.email]);

  // const downloadTicket = async () => {
  //   setIsDownloading(true);

  //   try {
  //     const canvas = await html2canvas(ticketRef.current, {
  //       scale: 2,
  //       useCORS: true, // Fix CORS issues
  //       backgroundColor: "#ffffff", // Ensures a solid background
  //       ignoreElements: (element) => {
  //           return element.tagName.toLowerCase() === "svg" || 
  //                  (element.style && element.style.color && element.style.color.includes('oklch'));
  //         },
  //     });

  //     const imgData = canvas.toDataURL("image/png");
  //     const pdf = new jsPDF("p", "mm", "a4");
  //     pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
  //     pdf.save(`TechemberFest_Ticket_${attendee.fullName || "Guest"}.pdf`);
  //   } catch (error) {
  //     console.error("Error generating PDF:", error);
  //   }

  //   setIsDownloading(false); // Hide loading state
  // };

  
  const handleReset = () => {
    localStorage.clear(); 
    window.location.reload(); 
  };
  

  return (
    <div className="ticket-confirmation-container max-w-lg mx-auto p-6 shadow-lg rounded-md mt-6 text-center ring ring-white ">
      {/* Ticket Content */}
      <div ref={ticketRef} className="p-4  rounded-md"> 
        <p className="text-2xl text-white font-bold">Your Ticket is Booked 🎉</p>
        <p className="text-gray-400">Check your email for a copy or you can <span className="text-white font-bold">download</span></p>
        </div>
        <div className="summary-div r ">
          <div className="summary-div-inner text-center ">
            <div className="all-details-image-container ">
        {/* Event Details */}
        <div className="hero ">
          <p className="confirmaiton-location text-2xl font-semibold">TechemberFest "25</p>
          <div className="">
          <p className="text-gray-300 text-sm flex justify-center "><span className="location-icon"><MapPin className=" text-red-500" /></span> 4, Ikoyi Lagos, Nigeria</p>
          </div>
          <p className="text-gray-300 text-sm">Date: December 10, 2025</p>
        </div>

        {/* Avatar Display */}
        {attendee.avatar && (
          <div className="image-avarter mt-4 flex justify-center mx-auto ">
            <img
              src={attendee.avatar}
              alt="Attendee Avatar"
              className="images-div w-24 h-24 rounded-sm mx-auto border "
              crossOrigin="anonymous" // Fix CORS issues
            />
          </div>
        )}

        <div className="details-component-container ">
          <div className="name-email-component  ">
            <div className="main-person-div">
            <div className="person-name ">
                <p>Name</p>
            </div>
            <div className="fullname ">
                  <p >{attendee.fullName || "N/A"}</p>
                </div>
              </div>

                <div className="main-email-div">
            <div className="person-email">
              <p>Email:</p>
            </div>
            <div className="full-email">
            <p>{attendee.email  || "N/A"}</p>
            </div>
            </div>
            
          </div>

          <div className="name-email-component ">
            <div className="main-vip-div ">
            <div className="person-name ">
                <p>Ticket Type:</p>
            </div>
            <div className="fullname">
                  <p >{ticketType}</p>
                </div>
                </div>
                <div className="main-quality-div ">
            <div className="person-email ">
              <p>Ticket for:</p>
            </div>
            <div className="full-email">
            <p>{quantity}</p>
            </div>
            </div>
            
          </div>
          <div className=" attendees-note-div">
            <div className="special ">
            <p >Special Request?</p>
            </div>
            <div className="attendee-notes">
          {attendee.notes}
          </div>
            </div>

        </div>
        </div>

        {/* Barcode Generation */}
        <div className="bar-code-container mt-6 ">
          <svg className="confirmation-bar-code" ref={barcodeRef}></svg>
          <p className="text-sm text-gray-200 mt-2">Scan this barcode at the event.</p>
        </div>
      </div>
      </div>

      <div className="download-section flex justify-between">
      <button className="book-btn" onClick={handleReset}>Book Another Ticket</button>
      <button
        className="download-btn mt-4 bg-blue-500 text-white px-4 py-2 rounded flex justify-center items-center"
      >Download Ticket
      </button>
      </div>
    </div>
  );
};

export default TicketConfirmation;
