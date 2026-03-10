import { useState } from "react";
import { createContext } from "react";


export const SongContext = createContext();

export const SongContextProvider = ({ children }) => {
  const [song, setSong] = useState({
    url: "https://ik.imagekit.io/b8slwt3znj/cohort-2/moodify/songs/Allah_Meherban__DOWNLOAD_MING__E5VAYojnO.mp3",
    posterUrl:
      "https://ik.imagekit.io/b8slwt3znj/cohort-2/moodify/posters/Allah_Meherban__DOWNLOAD_MING__jBtAYUhMp.jpeg",
    title: "Allah Meherban [DOWNLOAD MING]",
    mood: "happy",
  });
  const [loading,setLoading]=useState(false)

  return(
    <SongContext.Provider value={{loading,setLoading,song,setSong}}>
    {children}
    </SongContext.Provider>
  )
};
