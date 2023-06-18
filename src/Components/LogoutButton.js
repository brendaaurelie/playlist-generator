import React from "react";
import Button from '@mui/material/Button';
import { Avatar } from "@mui/material";
import "../App.css"
const LogoutButton = ({onPress}) => {
   
   
    return (
        <div className="but">
        <Button variant="contained" onClick={onPress}
            sx={{
                borderRadius: "8px",
                background: "#1DB954", 
                color:"black", 
                ":hover": {
                        bgcolor: "#45bf70",
                        color: "black"
                            }
                }}>
        LOG OUT
        </Button>
        </div>
    );


    
};

export default LogoutButton;