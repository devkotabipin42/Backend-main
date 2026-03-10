import React from 'react'
import FaceExpression from '../../Expression/components/FaceExpression'
import Player from './Player'
import { useSong } from '../hooks/useSong'

const Home = () => {
  const {handleGetSong} = useSong()
  return (
    <>
   <FaceExpression
   onclick={(expression)=>{handleGetSong({mood:expression})}}
   />
   <Player/>
   </>
  )
}

export default Home
