import {Button, FormControl, Paper} from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import SignSelect from '../components/SignSelect'
import {useRef, useState} from 'react'
import {Box} from '@mui/system'
import {generate} from '../src/MusicGenerator'
import {load} from '../src/Loader'
// import useInterval from 'use-interval'

const Home: NextPage = () => {
  const [signId, setSignId]  = useState<string>('Cetus')
  const [isPlaying, setPlaying]  = useState<boolean>(false)
  const [image, setImage]  = useState<string|undefined>(undefined)
  const [description, setDescription]  = useState<string|undefined>(undefined)
  const [sourceNode, setSourceNode]  = useState<AudioBufferSourceNode|undefined>(undefined)
  const audioCtxRef = useRef<AudioContext>(null)
  const analyserRef = useRef<AnalyserNode>(null)
  const [power, setPower]  = useState<number>(0.0)

  // useInterval(() => {
  //   if (!isPlaying) return
  //   if (!analyserRef.current) return
  //   let freqArray =  new Uint8Array(analyserRef.current.frequencyBinCount);
  //   analyserRef.current.getByteFrequencyData(freqArray)
  //   let values = 0
  //   let count = 1
    
  //   console.log(freqArray)
  //   for (var i = 0; i < freqArray.length; i++) {
  //     if (freqArray[i] === 0) continue
  //     values += freqArray[i]
  //     count += 1
  //   }
  //   const value = values / count
  //   console.log(value / 255)
  //   setPower(value / 255)
  // }, 100);

  const onPlayClick = () => {

    if (isPlaying) {
      setPlaying(false)
      setPower(0.0)

      // 鳴らす処理の停止
      if (sourceNode) {
        sourceNode.stop()
        // @ts-ignore
        sourceNode.isPlaying = false
      }
    } else {
      setPlaying(true)
      if (audioCtxRef.current === null) {
        // @ts-ignore
        audioCtxRef.current = new AudioContext({
          sampleRate: 48000
        });
        // const analyser = audioCtxRef.current.createAnalyser()
        // analyser.connect(audioCtxRef.current.destination)
        // analyser.fftSize = 256
        // // @ts-ignore
        // analyserRef.current = analyser
      }
      const context = audioCtxRef!.current

      // 星座表示
      setImage(`/signs/${signId}.jpg`) 

      // 説明表示
      fetch(`/signs/${signId}.txt`)
      .then(data => data.text())
      .then(text => {
        setDescription(text)
      })

      // 星データと鳴らす処理
      load(`/csv/${signId}.csv`).then(stars => {
				let delta = 0;
				let next_buf = generate(delta,context.sampleRate,context, stars);
				let play_ = function play(){
					const buf = next_buf;
					delta += context.sampleRate;
					let src = context.createBufferSource();
          // src.connect(analyserRef.current!)
					src.buffer = buf;
					src.connect(context.destination);
          // @ts-ignore
          src.isPlaying = true;
					src.onended = ()=>{
            // @ts-ignore
						if(src.isPlaying){
							play();
						}
					};
					src.start()
					setSourceNode(src)
					next_buf = generate(delta,context.sampleRate,context,stars);
				};
				play_();
      });
    }
  }

  // const rgb2hex  = ( rgb: number[] ) =>  {
  //   return "#" + rgb.map( function ( value ) {
  //     return ( "0" + value.toString( 16 ) ).slice( -2 ) ;
  //   } ).join( "" ) ;
  // }

  return (
    <div>
      <Head>
        <title>Twinkle Heartbeat★</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box className={styles.main} sx={{mx: 4}} >
          <h1 className={styles.title}>Twinkle Heartbeat★</h1>
          <FormControl fullWidth>
            <SignSelect value={signId} onChange={(id) => setSignId(id)} disabled={isPlaying}></SignSelect>
          </FormControl>
          <Button sx={{my:2}} onClick={onPlayClick} variant='outlined' size='large'>
           {isPlaying ? <>Stop</> : <>Play</>}
          </Button>
          {isPlaying && 
            <>
              <Paper elevation={3} sx={{mx:2, my: 2, p: 1, color:"#bbbbbb"}}>
                {description}
              </Paper> 
              {image && <Box sx={{mx:2}} component="img" src={image} /> }
            </>
          }
      </Box>
    </div>
  )
}

export default Home
