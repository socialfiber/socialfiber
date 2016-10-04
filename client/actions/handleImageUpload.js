import HANDLE_IMG_UPLOAD from './types';
import axios from 'axios';
import Cookies from 'js-cookie';

export function handleImageUpload(file){
  const CLOUDINARY_UPLOAD_PRESET = 'l7mlj2bt'
  const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/tmlthesis/image/upload'
  const data = {
    params: {
      
    }
  };



  //refactor to post to server
    //when posted to server, take res URL and store in DB for user
    //render pic on component mounting
  return axios.post('/server/endpt', file)
    .then((response)=> {
      console.log(response)
      return {
        type: HANDLE_IMG_UPLOAD,
        payload: response
      };
    })
    .catch((error) => {
      console.error(error);
    })
}
