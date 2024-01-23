import logo from './logo.svg';
import './App.css';
import SpotifyButton from './Components/SpotifyButton';
import { Stack } from '@mui/system';
import PlaylistForm from './Components/PlaylistForm';
import { useState, useEffect } from 'react';
import { Button } from '@mui/base';
import LogoutButton from './Components/LogoutButton';
import { Logout } from '@mui/icons-material';
function App() {
  
  const CLIENT_ID = "f1d5ed8ede8e41dfaf0c07f2f67449a9"
  const REDIRECT_URI = "http://localhost:3000/brendaaurelie/playlist-generator/"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"
  const [token, setToken] = useState("")
  const [status, setStatus] = useState(false)

  useEffect(() => {
      const hash = window.location.hash
      let token = window.localStorage.getItem("token")

      if (!token && hash) {
          token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

          window.location.hash = ""
          window.localStorage.setItem("token", token)
          setStatus(true);
      }

      setToken(token)
  }, [])

  const logout = () => {
    setToken("")
    setStatus(false)
    window.localStorage.removeItem("token")
    window.localStorage.removeItem("loggedIn")
    }

  return (
    <div className='landing'>
      <Stack 
      direction="column"
      justifyContent="center"
      alignItems="center" 
      spacing={4}>

      <div className='SpotifyButton'>
      {!token ?
      <SpotifyButton link={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}/>
          : <LogoutButton onPress={logout}/>
      }
      </div>

      <PlaylistForm loggedIn={status}/>
      </Stack>
      
    </div>
  );
}

export default App;
