import React, { useEffect, useState,useNavigate } from "react";
import { useParams } from "react-router-dom";
import Nav from "./Nav";
import PhotoContainer from "./PhotoContainer";

const SharePhoto = ({ socket }) => {
    // const navigate = useNavigate();
    const [photos, setPhotos] = useState([]);
    //👇🏻 This accepts the username from the URL (/share/:user)
    const { user } = useParams();
    useEffect(() => {
        function authenticateUser() {
            const id = localStorage.getItem("_id");
           
            if (!id) {
                // navigate("/");
            }
            else{
                socket.emit("sharePhoto", user);
            }
        }
        socket.on("sharePhotoMessage", (data) => setPhotos(data));

        authenticateUser();
    }, [socket]);
    return (
        <div>
            <Nav />
            <PhotoContainer socket={socket} photos={photos} />
        </div>
    );
};

export default SharePhoto;