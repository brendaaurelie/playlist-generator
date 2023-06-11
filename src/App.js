import logo from './logo.svg';
import './App.css';
import SpotifyButton from './Components/SpotifyButton';
import { Stack } from '@mui/system';
import PlaylistForm from './Components/PlaylistForm';
function App() {
  return (
    <div className='landing'>
      <Stack 
      direction="column"
      justifyContent="center"
      alignItems="center" 
      spacing={4}>

      <div className='SpotifyButton'>
      <SpotifyButton/>
      </div>

      <PlaylistForm/>
      </Stack>
      
    </div>
  );
}

export default App;
