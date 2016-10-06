import HANDLE_IMG_UPLOAD from './types';
import axios from 'axios';
import Cookies from 'js-cookie';

export function handleImageUpload(file){
  const CLOUDINARY_UPLOAD_PRESET = 'l7mlj2bt'
  const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/tmlthesis/upload'
  const data = file;

  return axios.post(CLOUDINARY_UPLOAD_URL, data){
    .then((response)=> {
      return {
        type: HANDLE_IMG_UPLOAD,
        payload: response
      };
    })
    .catch((error) => {
      console.error(error);
    })
  }
}
