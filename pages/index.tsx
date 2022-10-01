import {Button, FormControl, MenuItem, Select} from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import SignSelect from '../components/SignSelect'
import {useEffect, useRef, useState} from 'react'
import {Box} from '@mui/system'
import {waveform} from '../src/waveform.ts'

const Home: NextPage = () => {
  const [signId, setSignId]  = useState<string>('1')
  const [isPlaying, setPlaying]  = useState<boolean>(false)
  const [image, setImage]  = useState<string>('/backgrounds/GSFC_20171208_Archive_e001894_medium.jpeg')
  const audioCtxRef = useRef<AudioContext>(null);
  
  useEffect(()=>{
    // @ts-ignore
    audioCtxRef.current = new AudioContext({
      sampleRate: 48000
    });
  },[])

  const onPlayClick = () => {
    if (isPlaying) {
      setPlaying(false)
    } else {
      setPlaying(true)
      
      const context = audioCtxRef.current
      if (context === null) return
      // @ts-ignore
      let buf = audioCtxRef.current.createBuffer(1,context.sampleRate*3,context.sampleRate);
      let data = buf.getChannelData(0);
      for(let i=0;i<data.length;i++){
				data[i] = waveform(i,context.sampleRate,400,2,0.3);
      }

      let src = context.createBufferSource();
      src.buffer = buf;
      src.connect(context.destination);
      src.start()
    }
  }
  
  useEffect(() => {

  }, [signId])


  return (
    <div className={styles.container}>
      <Head>
        <title>Twinkle Music★</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Twinkle Music★</h1>
        <FormControl fullWidth>
          <SignSelect value={signId} onChange={(id) => setSignId(id)}></SignSelect>
        </FormControl>
        <Button sx={{my:2}} onClick={onPlayClick} variant='outlined' size='large'>
         { isPlaying ? <>停止</> : <>再生</>}
        </Button>
        { isPlaying && 
          <>
            <Box >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Box> 
            <Box component="img" src={image}>
            </Box>
          </>
        }
      </main>
    </div>
  )
}

export default Home
