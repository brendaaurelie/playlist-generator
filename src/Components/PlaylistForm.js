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
import axios from "axios";
import SongsPreview from "./SongsPreview";
import "../App.css"
import { getListOfSongs } from "../openaiService";


const PlaylistForm = ({loggedIn}) => {

  const userId = window.localStorage.getItem("user_id");
  const accessToken = window.localStorage.getItem("token");

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
  const [songURIS, setSongURIS] = useState([]);
  const [title, setTitle] = useState("");
  const [playlistId, setPlaylistId] = useState("");
  const [playlistGenerated, setPlaylistGenerated] = useState(false);
  const [tags, setTags] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [readyToAddToPlaylist,setReadyToAddToPlaylist] = useState(false);
  const [dataForSearchingTrack, setDataForSearchingTrack] = useState([]);

const populateTags = () => {
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
    'dreamy',
    'missing',
    'elated',
    'hype',
    'yearning',
    'mindful',
    'peaceful',
    'chill',
    'rowdy',
    'chaotic',
    'depressed',
    'emo',
    'disgusted',
    'happy',
    'winter',
    'fall'
  ];
  setTags(tags);
}

  useEffect(() => {
    localStorage.setItem("tags", tagName)
  },[tagName]);

  //Initialization
  useEffect(() => {
    populateTags();
  },[]);

  useEffect(()=>{
    localStorage.setItem("title",title);
  },[title]);

  useEffect(()=>{
    createPrompt();
  },[tagName]);

  useEffect(()=>{
    if (dataForSearchingTrack.length != 0) {
      dataForSearchingTrack.forEach(songTitleArtistYearLineArr => {
        getSongURIFromInfo(songTitleArtistYearLineArr[0],songTitleArtistYearLineArr[1],songTitleArtistYearLineArr[2]);
      })
    }
  },[dataForSearchingTrack]);

  useEffect(() => {
 if(readyToAddToPlaylist){
  addSongToPlaylist(playlistId);
  setPlaylistGenerated(true);
 }
  },[readyToAddToPlaylist])


  const handleTagChange = (event) => {
    const {
      target: { value },
    } = event;
    setTagName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const createPrompt = () => {
    let prompt = `Write a playlist that includes 10 songs with its respective song title, artist, and the year that best gives the mood of: ${tagName[0]}, ${tagName[1]}, and ${tagName[2]}. \n`+ 
    "Please use the format template. Do not repeat any songs. \n"+
    "---BEGIN FORMAT TEMPLATE---\n"+
    "\n"+ 
    "1. ${SONGTITLE1}; ${ARTIST1}; ${YEAR1}\n"+ 
    "2. ${SONGTITLE2}; ${ARTIST2}; ${YEAR2}\n"+  
    "3. ${SONGTITLE3}; ${ARTIST3}; ${YEAR3}\n"+ 
    "4. ${SONGTITLE4}; ${ARTIST4}; ${YEAR4}\n"+  
    "5. ${SONGTITLE5}; ${ARTIST5}; ${YEAR5}\n"+ 
    "6. ${SONGTITLE6}; ${ARTIST6}; ${YEAR6}\n"+  
    "7. ${SONGTITLE7}; ${ARTIST7}; ${YEAR7}\n"+  
    "8. ${SONGTITLE8}; ${ARTIST8}; ${YEAR8}\n"+  
    "9. ${SONGTITLE9}; ${ARTIST9}; ${YEAR9}\n"+  
    "10. ${SONGTITLE10}; ${ARTIST10}; ${YEAR10}\n"+  
    "\n"+ 
    "---END FORMAT TEMPLATE---\n";
    setPrompt(prompt);
}

const getSongURIFromInfo = (songTitle, artist, year) => {
  let songURI = "";
  let searchQuery = "track=" + songTitle + " artist=" + artist + " year=" + year;
  axios.get('https://api.spotify.com/v1/search', {
    params: {q: searchQuery,
      type: "track",
      market: "US",
      limit:1},
     headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  }).then(res => {
    songURI = res.data.tracks.items[0].uri;
    songURIS.push(songURI);
    if(songURIS.length==10){
      setReadyToAddToPlaylist(true);
    }
  }).catch(e => {
    console.log("ERR" + e);
  });
  return songURI;
}
  
const createPlaylist = () => {
  axios.post(`https://api.spotify.com/v1/users/${userId}/playlists`,{
    name: title,
    description: "testing from spotify api",
    public: true
  }, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  }
).then(res => {
  setPlaylistId(res.data.id);
  getListOfSongs(prompt).then((res) => {
    setDataForSearchingTrack(res);
  }).catch((e)=> console.log(e));
}).catch((e) => {
  console.log("ERR" + e);
})
};

    //add song to playlist by their ID
    const addSongToPlaylist = (playlistId) => {
      axios.post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`,{
        uris: songURIS,
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    ).then(res => {
    }).catch((e) => {
      console.log("ERR" + e);
    })
    };
  
    return (
        <Stack
        direction="column"
        justifyContent="center"
        alignItems="center" 
        spacing={4}>
       
        <Paper elevation={3} sx={{
        borderRadius: "8px",
        padding: "3% 22%",
        backgroundColor: "#fcefe1",
        paddingBottom: "6%"
      }}>

        <Stack width={450}>
          <h1>We love making playlist easy.</h1>

          <hr></hr>

          <h3>1. What's the title?</h3>
          <TextField
            disabled={!loggedIn}
            required
            id="outlined-required"
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)} />

          <h3>2. What's the vibe?</h3>

          <div className='selectTags'>
            <FormControl className='form' sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-chip-label">Tags</InputLabel>
              <Select
                disabled={!loggedIn}
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={tagName}
                onChange={handleTagChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={value}
                        style={{ backgroundColor: '#FF7171' }} />
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
            onClick={createPlaylist}
            endIcon={<PlaylistAddIcon />}
            sx={{
              background: "#1DB954",
              padding: "2%",
              color: "black",
              ":hover": {
                bgcolor: "#45bf70",
                color: "black"
              }
            }} variant="contained">ADD PLAYLIST</Button>
        </Stack>
        
      </Paper>
      {/* Show the content of the playlists */}
        {playlistGenerated && <SongsPreview songLists={songURIS}/>}
       
      </Stack>
      
    );   
};

export default PlaylistForm;