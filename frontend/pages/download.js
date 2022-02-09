import { ChakraProvider } from '@chakra-ui/provider'
import {
  Center,
  Button, 
  Stack,
  Text,
  Box
} from '@chakra-ui/react'
import {useRouter} from 'next/router'
import { Downloader } from '../components/Downloader'
import { useState } from 'react'

export default function Download() {
  const router = useRouter();
  const [video, setVideo] = useState(undefined);
  const checkVideo = () => {
    if(video){
      return (
        <video 
          width='auto' 
          height='auto' 
          position='absolute'
          background-size='cover'
          key={video} 
          min-height='100%'
          min-width='100%'
          object-fit='contain'
          overflow='hidden'
          controls
        >
          <source src={video}/>
        </video>
      )
    }
  }
  return (
    <ChakraProvider>
      <Center>
        <Stack mt='20px'>
          <Downloader setVideo={setVideo}></Downloader>
          <Box className='video-container' bg='beige' >
            {checkVideo()}
          </Box>
        </Stack>
      </Center>
        <Center>
            <Button position='fixed' bottom='-4px' marginBottom="1%" colorScheme="green" onClick={() => router.push("/")}>Back</Button>
        </Center>
    </ChakraProvider>
  )
}

