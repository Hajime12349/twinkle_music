import {Button, FormControl} from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import SignSelect from '../components/SignSelect'
import {useRef, useState} from 'react'
import {Box} from '@mui/system'
import {generate} from '../src/MusicGenerator'
import {load} from '../src/Loader'

const Home: NextPage = () => {
  const [signId, setSignId]  = useState<string>('Cetus')
  const [isPlaying, setPlaying]  = useState<boolean>(false)
  const [image, setImage]  = useState<string|undefined>(undefined)
  const [sourceNode, setSourceNode]  = useState<AudioBufferSourceNode|undefined>(undefined)
  const audioCtxRef = useRef<AudioContext>(null);
  
  const onPlayClick = () => {
    if (isPlaying) {
      setPlaying(false)

      // 鳴らす処理の停止
      sourceNode && sourceNode.stop()

    } else {
      setPlaying(true)
      if (audioCtxRef.current === null) {
        // @ts-ignore
        audioCtxRef.current = new AudioContext({
          sampleRate: 48000
        });
      }
      const context = audioCtxRef.current
      if (context === null) return

      // 星座表示
      setImage(`/signs/${signId}.jpg`) 

      // 星データと鳴らす処理
      load(`/csv/${signId}.csv`).then(stars => {
        const buf = generate(context, stars)
        let src = context.createBufferSource();
        src.buffer = buf;
        src.connect(context.destination);
        src.loop = true
        src.start()
        setSourceNode(src)
      })
    }
  }
  

  return (
    <div className={styles.container}>
      <Head>
        <title>Twinkle Music★</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Twinkle Music★</h1>
        <FormControl fullWidth>
          <SignSelect value={signId} onChange={(id) => setSignId(id)} disabled={isPlaying}></SignSelect>
        </FormControl>
        <Button sx={{my:2}} onClick={onPlayClick} variant='outlined' size='large'>
         { isPlaying ? <>停止</> : <>再生</>}
        </Button>
        { isPlaying && 
          <>
            <Box >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Box> 
            { image && <Box component="img" src={image} /> }
          </>
        }
      </main>
    </div>
  )
}

export default Home
