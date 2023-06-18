import React from "react";
import Button from '@mui/material/Button';
import { Avatar } from "@mui/material";
import "../App.css"
const SpotifyButton = ({link}) => {
   console.log(link)
    return (
        <div className="but">
        <Button href={link} variant="contained" 
        endIcon=
            {<Avatar src={'/Spotify_Icon_RGB_Black.png'} />}
            sx={{
                borderRadius: "8px",
                background: "#1DB954", 
                color:"black", 
                ":hover": {
                        bgcolor: "#45bf70",
                        color: "black"
                            }
                }}>
        CONNECT YOUR SPOTIFY
        </Button>
        </div>
    );


    
};

export default SpotifyButton;