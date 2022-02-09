import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { ChakraProvider } from '@chakra-ui/provider'
import {Center, Button, Grid} from '@chakra-ui/react'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter();
  return (
    <ChakraProvider>
      <Center mt="30px">
        <Grid gap={4}>
          <Button colorScheme="green" onClick={() => router.push("/download")}>Youtube Download</Button>
          <Button colorScheme="green">Search</Button>
        </Grid>

     </Center>
    </ChakraProvider>
  )
}
