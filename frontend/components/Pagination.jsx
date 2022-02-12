import { useQuery } from 'react-query'
import { VideoBox } from './VideoBox'
import { Box, StackDivider, VStack } from '@chakra-ui/react'
import axios from 'axios'
export const Pagination = (props) => {

  const videos = useQuery(
    'videos',
    async () => 
      await axios.get(process.env.backend_url + '/yt/videos')
  )
  console.log(videos);
  return (
    <VStack 
      spacing={4} 
      divider={<StackDivider borderColor='gray.300'/>}
    >
      {videos?.data?.data?.map((format) => (
        <VideoBox 
        title={format.title}
        filesize={format.filesize}
        src={'videos/' + format.filename}
        link={format.link}
        />
      ))}
    </VStack>
  )
}