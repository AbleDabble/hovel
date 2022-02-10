import {
  Center,
  Button,
  Grid,
  GridItem, 
  Input,
  Select,
  FormControl,
  FormLabel,
} from '@chakra-ui/react'
import {Formik, Field, Form, FormikHelpers} from 'formik';
import { useState } from 'react'
import axios from 'axios'



export const Downloader = (props) => {
  const [formats, setFormats] = useState([]); 
  const url = process.env.backend_url + '/yt/download';
  const convertBytes = (bytes) => {
    const names = ["B", "KB", "MB", "GB", "TB"];
    let ind = Math.floor(Math.log10(bytes) / 3);
    if(ind < 0) ind = 0;
    console.log(`bytes ${bytes} with names ${ind}`);
    console.log(ind)
    let name = names[ind];
    let size = bytes / Math.pow(10, ind * 3);
    size = size.toFixed(2);
    return  `${size} ${name}`;
  }
  return (
    <Formik 
      initialValues={{
        link: "",
        format_id: '', 
        setVideo: props.setVideo, 
        action: ""
      }}
      onSubmit={ async (values) => {
        // If Clicking available formats button
        if(values.action === "format") {
          const params = {
            params: {
              url: values.link
            }
          }
          const response = await axios.get(url, params);
          const formatItems = response.data.map((format) => (
            <option key={format['format_id']} value={format['format_id']}>{`${format['format_id']} ${format['acodec'] == 'none' ? 'video-only' : format['vcodec'] == 'none' ? 'audio only' : 'video/audio'} ${convertBytes(format['filesize'])} ${format['ext']}`}</option>
          ));
          if(response.data.length > 0){
            values.format_id = response.data[0]['format_id'];
          }
          setFormats(formatItems);
        }
        // If clicking download
        if(values.action === "download"){
          const formData = new FormData();
          formData.append("url", values['link']);
          formData.append("format", values['format_id']);
          const response = await axios.post(url, formData);
          const decoded = decodeURI(response.data['filename']);
          decoded = "/videos/" + decoded; 
          if(response.data['success']){
            props.setVideo(decoded);
          }
        }
      }}
    >
      {({handleChange, setFieldValue, handleSubmit}) => (
        <Form>
          <Grid 
            className='download-grid'
            templateRows='repeat(3, 1fr)'
            templateColumns='repeat(2, 2fr)'
            gap={4}
          >
            <GridItem colSpan={2} >
              <Field name='link' placeholder='link'>
                {({field, form}) => (
                  <FormControl isInvalid={form.errors.link && form.touched.link}>
                    <FormLabel htmlFor='link'>Youtube Download Link</FormLabel>
                    <Input {...field} id='link' placeholder='Youtube Link'></Input>
                  </FormControl>
                )}
              </Field>
            </GridItem>
            <GridItem colSpan={2}>
              <Field name='format_id' placeholder='format_id'>
                {(values, form) => (
                  <FormControl>
                    <Select onChange={handleChange} value={values.format_id} id='format_id'>
                      {formats}
                    </Select>
                  </FormControl>
                )}
              </Field>
            </GridItem>
            <Button colorScheme='blue' onClick={() => {
              setFieldValue("action", "format", false);
              handleSubmit();
            }}>Get Formats</Button>
            <Button colorScheme='red' onClick={() => {
              setFieldValue("action", "download", false);
              handleSubmit();
            }}>Download</Button>
          </Grid>
        </Form>
      )}
      
    </Formik>

  )
}