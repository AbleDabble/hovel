import { ChakraProvider } from '@chakra-ui/provider'
import {Center, Heading, Box, StackDivider, VStack} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { VideoBox } from '../components/VideoBox'
import axios from 'axios'
import { useState } from 'react'
import { useQuery, QueryClient, QueryClientProvider } from 'react-query'
import { Pagination } from '../components/Pagination'

export default function Library() {
  const router = useRouter();
  const client = new QueryClient()
  return (
    <ChakraProvider>
      <QueryClientProvider client={client}>
      <Center mt="30px">
        <VStack
          spacing={4}
        >
          <Heading>
            Library
          </Heading>
          <Pagination/>
        </VStack>
     </Center>
    </QueryClientProvider>
    </ChakraProvider>
  )
}

