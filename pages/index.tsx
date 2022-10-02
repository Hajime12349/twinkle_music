import {Button, FormControl} from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import SignSelect from '../components/SignSelect'
import {useEffect, useRef, useState} from 'react'
import {Box} from '@mui/system'
import {generate} from '../src/MusicGenerator'
import useInterval from 'use-interval'
import {load,load_mock} from '../src/Loader'

const Home: NextPage = () => {
  const [signId, setSignId]  = useState<string>('Cetus')
  const [isPlaying, setPlaying]  = useState<boolean>(false)
  const [image, setImage]  = useState<string|undefined>(undefined)
  const [sourceNode, setSourceNode]  = useState<AudioBufferSourceNode|undefined>(undefined)
  const audioCtxRef = useRef<AudioContext>(null)
  const analyserRef = useRef<AnalyserNode>(null)
  const [power, setPower]  = useState<number>(0.0)

  useInterval(() => {
    if (!isPlaying) return
    if (!analyserRef.current) return
    let freqArray =  new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(freqArray)
    let value = 0;
    let average = 0;
  
    
    for (var i = 0; i < freqArray.length; i++) {
      if (value < freqArray[i]) value = freqArray[i]
      // values += freqArray[i];
    }
    const power = Math.max((value-180) / 255, 0);
    setPower(power)
  }, 100);

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
        const analyser = audioCtxRef.current.createAnalyser()
        analyser.connect(audioCtxRef.current.destination)
        analyser.fftSize = 256
        // @ts-ignore
        analyserRef.current = analyser
      }
      const context = audioCtxRef!.current

      // 星座表示
      setImage(`/signs/${signId}.jpg`) 

      // 星データと鳴らす処理
      load_mock(`/csv/${signId}.csv`).then(stars => {
				let delta = 0;
				let next_buf = generate(delta,context.sampleRate,context, stars);
				let play_ = function play(){
					const buf = next_buf;
					delta += context.sampleRate;
					let src = context.createBufferSource();
          src.connect(analyserRef.current!)
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

  const rgb2hex  = ( rgb: number[] ) =>  {
    return "#" + rgb.map( function ( value ) {
      return ( "0" + value.toString( 16 ) ).slice( -2 ) ;
    } ).join( "" ) ;
  }

  return (
    <div>
      <Head>
        <title>Twinkle Music★</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box className={styles.main} sx={{backgroundColor: rgb2hex([0, 0, 255*power, 200])}} >
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
      </Box>
    </div>
  )
}

export default Home
