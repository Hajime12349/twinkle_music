import {Button, FormControl, MenuItem, Select} from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import SignSelect from '../components/SignSelect'
import {useState} from 'react'

const Home: NextPage = () => {

  const [signId, setSignId]  = useState<string>('')

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
        <Button variant='outlined'>再生</Button>
      </main>
    </div>
  )
}

export default Home
