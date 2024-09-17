
import React from "react";
import Button from '@mui/material/Button';
import { Avatar } from "@mui/material";
import "../App.css"

const AIBUtton = ({onPress}) => {
   
   
    return (
        <div className="ai">
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
        AI
        </Button>
        </div>
    );


    
};

export default AIBUtton;