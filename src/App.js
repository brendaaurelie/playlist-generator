import logo from './logo.svg';
import './App.css';
import SpotifyButton from './Components/SpotifyButton';
import { Stack } from '@mui/system';
import PlaylistForm from './Components/PlaylistForm';
import { useState, useEffect } from 'react';
import { Button } from '@mui/base';
import LogoutButton from './Components/LogoutButton';
import { Logout } from '@mui/icons-material';
import AIBUtton from './Components/AIButton';
import axios from 'axios';
import { getOpenAIResponse } from './openaiService';

function App() {
  const CLIENT_ID = "f1d5ed8ede8e41dfaf0c07f2f67449a9"
  const REDIRECT_URI = "http://localhost:3000/brendaaurelie/playlist-generator/"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const SCOPE = "playlist-modify-public playlist-modify-private"
  const RESPONSE_TYPE = "token"
  const [token, setToken] = useState("")
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
      const URLhash = window.location.hash
      let token = window.localStorage.getItem("token")
      retrieveTokenFromURL(URLhash,token)
      setToken(token)
  }, [])

  useEffect(()=>{
   if(token) {
    getUserId(token);
   }
  }, [token])

  function getUserId(access_token) {
    axios.get('https://api.spotify.com/v1/me',{
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    }).then(res => {
      const user_id = res.data.id;
      window.localStorage.setItem("user_id", user_id)
    }
  ).catch((e) => {
    window.localStorage.removeItem("token");
  });
  };
  
  const logout = () => {
    setToken("")
    setLoggedIn(false)
    window.localStorage.removeItem("token")
    window.localStorage.removeItem("loggedIn")
    window.localStorage.removeItem("user_id")
    window.location.assign("accounts.spotify.com/logout");
  }
  
  function retrieveTokenFromURL(URLHash, token){
    if (!token && URLHash) {
      console.log("token:",token)
      token = URLHash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
      window.location.hash = ""
      window.localStorage.setItem("token", token)
      setLoggedIn(true);
    }    
  }

  return (
    <div className='landing'>
      <Stack 
      direction="column"
      justifyContent="center"
      alignItems="center" 
      spacing={4}>
      <AIBUtton onpress={[console.log("HEREEEEE"), console.log("RESPONSE FROM OPENAI:", "PLEASE")]}/>
      <div className='SpotifyButton'>
      {!token ?
      <SpotifyButton link={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}/>
          : <LogoutButton onPress={logout}/>
      }
      </div>

      <PlaylistForm loggedIn={loggedIn}/>
      </Stack>
      
    </div>
  );
}

export default App;
