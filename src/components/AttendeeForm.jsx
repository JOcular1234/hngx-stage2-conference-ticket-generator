import { useState, useEffect } from "react";

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

  // Email Validation
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Avatar URL Validation
  const validateAvatar = (url) => url === "" || url.match(/\.(jpeg|jpg|gif|png)$/);

  // Handle Image Upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result);
        setAvatar(""); // Clear avatar URL when an image is uploaded
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    let valid = true;
    let newErrors = { fullName: "", email: "", image: "" };

    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required.";
      valid = false;
    }

    if (!email.trim() || !validateEmail(email)) {
      newErrors.email = "Enter a valid email address.";
      valid = false;
    }

    if (!uploadedImage && !avatar.trim()) {
      newErrors.image = "Please upload an image or provide an avatar URL.";
      valid = false;
    } else if (avatar && !validateAvatar(avatar)) {
      newErrors.image = "Avatar URL must be a valid image link (jpg, png, gif).";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      onSubmit(fullName, email, avatar || uploadedImage, notes);
    }
  };

  return (
    <div className="attendee-container max-w-lg mx-auto p-6 bg-white shadow-md rounded">
    <div className="main-attendee-container">

      <p className="text-lg font-bold">Attendee Details</p>
      <div className=" span-tickets w-38 h-1"></div>
      <div className=" span-ticket2 w-28 h-1 "></div>
      {/* Image Upload */}
      <div className="mt-4">
        <label className="upload block font-normal text-sm">Upload Profile Photo:</label>
        <div className="image-upload-div mx-auto flex justify-center ring ring-green-900 ">
        <input
          type="file"
          accept="image/*"
          className="image-upload-input w-40 mt-2 p-2 border ring  h-30"
          onChange={handleImageUpload}
        />
        
        </div>
      </div>

      {/* Avatar URL Input */}
      <div className="mt-4">
        <label className="upload block font-medium ">Avatar URL (optional):</label>
        <input
          type="url"
          className="w-full mt-2 p-2 border ring ring-emerald-700 rounded"
          placeholder="Paste image URL (Cloudinary)"
          value={avatar}
          onChange={(e) => {
            setAvatar(e.target.value);
            setUploadedImage(""); // Clear uploaded image when avatar URL is entered
          }}
        />
      </div>

      {/* Image Preview */}
      {uploadedImage || avatar ? (
        <div className="mt-4 ring bg-black ring-emerald-950 flex justify-center">
          <img
            src={uploadedImage || avatar}
            alt="Preview"
            className="w-24 h-24 rounded-md ring ring-gray-600 mx-auto border"
          />
        </div>
      ) : (
        errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>
      )}

      {/* Full Name */}
      <div className="mt-4">
        <label className="attendee-label block font-normal text-sm">Enter your Name: <span className="text-red-600">*</span></label>
        <input
          type="text" placeholder="jon doe"
          className="attendee-name w-full mt-2 p-2 border rounded"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
      </div>

      {/* Email */}
      <div className="mt-4">
        <label className="attendee-label block font-normal text-sm">Enter your Email: <span className="text-red-600">*</span></label>
        <input
          type="email" placeholder="hng@gmail.com"
          className="attendee-name w-full mt-2 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      {/* Notes */}
      <div className="mt-4">
        <label className="attendee-label block font-normal text-sm">Additional Notes:</label>
        <textarea
          className=" attendee-name w-full mt-2 p-2 border rounded" placeholder="write your message here..."
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
