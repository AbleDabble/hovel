import {
  Box,
  Heading,
  Text,
  Center, 
  Button,
  VStack
} from '@chakra-ui/react'
import axios from 'axios'
import { convertBytes } from '../utils/videoUtils'

export const VideoBox = ({title, filesize, src, link}) => {
  console.log("VIDEOS", title);
  return (
    <Box 
      maxW='lg' 
      w='100%'
      borderWidth='2px' 
      borderColor='black' 
      borderRadius='xl'
      overflow='hidden'
      p={2}
    >
      <Center>
        <Heading fontSize='2xl' mb='10px'>
          {title} 
        </Heading>
      </Center>
      <video controls>
        <source src={src}/>
      </video>
      <Center>
      <VStack w='100%'>
        <Box mt={2} width='100%'>
          <form action={link}>
            <Button w='100%' height='2em' colorScheme='messenger' type='submit'>Link</Button>
          </form>
        </Box>
        <Box mt={1} fontSize='lg'>
          Size {convertBytes(filesize)}
        </Box>
        <Box>
        </Box>
      </VStack>
      </Center>
    </Box>
  )
}