import React, { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const UploadPhoto = ({ socket }) => {
  const navigate = useNavigate();
  const [photoURL, setPhotoURL] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const id = localStorage.getItem("_id");
    const email = localStorage.getItem("_myEmail");
    console.log(photoURL)
    console.log({id,email,photoURL})
    socket.emit("uploadPhoto", { id, email, photoURL });
  };
///error



useEffect(()=>{
console.log("called")
socket.on("uploadPhotoMessage",(data)=>{
  toast.update(data);
  navigate("/photos");
})
console.log("end")

},[socket,navigate])

  return (
    <main className="uploadContainer">
      <div className="uploadText">
        <h2>Upload Image</h2>
        <form method="POST" onSubmit={handleSubmit}>
          <label>Paste the image URL</label>
          <input
            type="text"
            name="fileImage"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
          />
          <button className="uploadBtn">UPLOAD</button>
        </form>
      </div>
    </main>
  );
};

export default UploadPhoto;
