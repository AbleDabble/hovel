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
import NextLink from 'next/link'
import { Link } from '@chakra-ui/react'

export const VideoBox = ({title, filesize, src, link}) => {
  console.log("VIDEOS", title);
  const location = `location.href='${link}'`
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
        <NextLink href={link} passHref>
          <Link w='100%' borderRadius='4px' height='2em' bg='blue.600' color='white' mt={2} fontWeight='semibold'>
            <Center mt={1}>Link</Center>
          </Link>
        </NextLink>
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