import React from "react";
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Chip from '@mui/material/Chip';
import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import "../App.css"

const PlaylistForm = ({loggedIn}) => {
    const tags = [
        'summer',
        'love',
        'sad',
        'garden',
        'breakup',
        'workout',
        'lifting',
        'crying',
        'angry',
        'worry',
      ];
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

      const [tagName, setTagName] = useState([]);
      const [title, setTitle] = useState("");

      useEffect(() => {
        localStorage.setItem("tags", tagName)
      },[tagName]);

      const handleChange = (event) => {
        const {
          target: { value },
        } = event;
        setTagName(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
       
      };

      const [open, setOpen] = React.useState(false);
      const handleClose = () => {
        setOpen(false);
      };
      const handleOpen = () => {
        setOpen(true);
      };

      useEffect(()=>{
        localStorage.setItem("title",title);
      },[title]);
  
    return (
        <Paper elevation={3} sx={{ 
            borderRadius: "8px",
            padding:"3% 8%", 
            backgroundColor:"#fcefe1",
            paddingBottom: "6%"
            }}> 
            
        <Stack>
        <h1>We love making playlist easy.</h1>

        <hr></hr>

        <h3>1. What's the title?</h3>
       <TextField
       disabled={!loggedIn}
       required
       id="outlined-required"
       label="Title"
       value={title}
       onChange={(e) => setTitle(e.target.value)}
        />

        <h3>2. What's the vibe?</h3>

        <div className='selectTags' >
        <FormControl className='form' sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-chip-label">Tags</InputLabel>
          <Select
           disabled={!loggedIn}
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={tagName}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip 
                  key={value} 
                  label={value}
                  style={{backgroundColor:'#FF7171'}}
                 />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {tags.map((tag) => (
              <MenuItem
                key={tag}
                value={tag}
               
              >
                {tag}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        </div>

        <h3>3. Done </h3>
        <Button 
        disabled={!loggedIn}
        onClick={handleOpen} 
        endIcon=
        {<PlaylistAddIcon/>}
        sx={{
            background:"#1DB954", 
            padding:"2%",
            color:"black",
            ":hover": {
                bgcolor: "#45bf70",
                color: "black"
                    }
        }}variant="contained">ADD PLAYLIST</Button>
        </Stack>    
            <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
        >
        <CircularProgress color="inherit" />
        </Backdrop>
     </Paper>
      
    );


    
};

export default PlaylistForm;


