import { useState, useEffect } from "react";
import { CloudUpload } from "lucide-react";

const AttendeeForm = ({ onBack, onSubmit }) => {
  const [fullName, setFullName] = useState(localStorage.getItem("fullName") || "");
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [avatar, setAvatar] = useState(localStorage.getItem("avatar") || "");
  const [uploadedImage, setUploadedImage] = useState(localStorage.getItem("uploadedImage") || "");
  const [notes, setNotes] = useState(localStorage.getItem("notes") || "");
  const [errors, setErrors] = useState({ fullName: "", email: "", image: "" });

  useEffect(() => {
    localStorage.setItem("fullName", fullName);
    localStorage.setItem("email", email);
    localStorage.setItem("avatar", avatar);
    localStorage.setItem("uploadedImage", uploadedImage);
    localStorage.setItem("notes", notes);
  }, [fullName, email, avatar, uploadedImage, notes]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result);
        setAvatar("");
        setErrors((prev) => ({ ...prev, image: "" })); // Clear image error on successful upload
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    let validationErrors = {};
    
    if (!fullName.trim()) {
      validationErrors.fullName = "Full Name is required.";
    }
    if (!email.trim()) {
      validationErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = "Enter a valid email address.";
    }
    if (!uploadedImage && !avatar.trim()) {
      validationErrors.image = "Please upload an image or provide an avatar URL.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    onSubmit(fullName, email, avatar || uploadedImage, notes);
  };

  return (
    <div className="attendee-container max-w-lg mx-auto p-6 bg-white shadow-md rounded">
      <div className="main-attendee-container">
        <p className="ticket1 text-lg font-bold">Attendee Details</p>
        <div className="span-tickets w-58 h-1"></div>
        <div className="span-ticket2 w-28 h-1"></div>
        
        {/* Image Upload Container */}
        <div className="ringss mt-4 flex justify-center">
          <label className="w-32 h-32 flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg cursor-pointer overflow-hidden">
            {uploadedImage ? (
              <img src={uploadedImage} alt="Preview" className="w-full h-full object-cover ring" />
            ) : (
              <div className="image-upload flex flex-col items-center ">
                <CloudUpload size={32} className="text-gray-200" />
                <span className="text-sm text-gray-200">Click to upload</span>
              </div>
            )}
            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          </label>
        </div>
        {errors.image && <p className="text-red-500 text-xs mt-1 text-center">{errors.image}</p>}

        {/* Avatar URL Input */}
        <div className="mt-4">
          <label className="upload block font-medium">Avatar URL (optional):</label>
          <input
            type="url"
            className="w-full mt-2 p-2 border ring ring-emerald-700 rounded"
            placeholder="Paste image URL (Cloudinary)"
            value={avatar}
            onChange={(e) => {
              setAvatar(e.target.value);
              setUploadedImage("");
            }}
          />
        </div>

        {/* Full Name */}
        <div className="mt-4">
          <label className="attendee-label block font-normal text-sm">Enter your Name: <span className="text-red-600">*</span></label>
          <input
            type="text"
            placeholder="Jon Doe"
            className="attendee-name w-full mt-2 p-2 border rounded"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
        </div>

        {/* Email */}
        <div className="mt-4">
          <label className="attendee-label block font-normal text-sm">Enter your Email: <span className="text-red-600">*</span></label>
          <input
            type="email"
            placeholder="hng@gmail.com"
            className="attendee-name w-full mt-2 p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        {/* Notes */}
        <div className="mt-4">
          <label className="attendee-label block font-normal text-sm">Special Requirement?</label>
          <textarea
            className="attendee-name w-full mt-2 p-2 border rounded"
            placeholder="Write your message here..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        {/* Navigation Buttons */}
        <div className="navigation-attendee-btn mt-6 flex justify-between">
          <button className="return-back-btn ring bg-gray-400 text-white px-4 py-2 rounded" onClick={onBack}>
            Back
          </button>
          <button className="get-ticket-btn bg-green-500 text-white px-4 py-2 rounded" onClick={handleSubmit}>
            Get Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendeeForm;
