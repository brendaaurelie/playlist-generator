import React from "react";
import Paper from '@mui/material/Paper';
import { Stack } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import axios from "axios";
import { useState, useEffect } from 'react';


const SongsPreview = ({songLists}) => {
    const [trackInfo, setTrackInfo]= useState([]);
    const access_token = window.localStorage.getItem("token");
    
    useEffect(() => {
        songLists.map((songList) => {
            const track_id = songList.substring(14);
            console.log(track_id);
            const api_url = `https://api.spotify.com/v1/tracks/${track_id}`;
        
            axios.get(api_url, {
                headers: {
                  Authorization: `Bearer ${access_token}`,
                  "Content-Type": "application/json",
                },
              }
            ).then(res => {
                const track = {}
                track['title'] = res.data.name;
                track['artist'] = res.data.artists[0].name;
                
                console.log(JSON.stringify(track));
                setTrackInfo(trackInfo => [...trackInfo,track]);
                // console.log(trackInfo);
              
            }).catch((e) => {
              console.log("ERR" + e);
            })
        })
      },[]);


    return(
        <Paper elevation={3} sx={{
            borderRadius: "8px",
            padding: "6% 10%",
            backgroundColor: "#fcefe1",
            paddingBottom: "6%",
            width: "100%"
          }}>
        <Stack spacing={2}>
            <List sx={{ width: "100%", maxWidth: 560, bgcolor: 'background.paper' }}>
                {trackInfo.map((songList) => (
                    <><ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        </ListItemAvatar>
                        <ListItemText
                            primary={songList.title}
                            secondary={<React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                   {songList.artist}
                                </Typography>
                                
                            </React.Fragment>} />
                    </ListItem><Divider variant="inset" component="li" /></>
                ))
                }
                
                
               
            </List>
        </Stack>
        </Paper>
    );
 };
 
 export default SongsPreview;