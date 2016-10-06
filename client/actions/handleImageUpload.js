import HANDLE_IMG_UPLOAD from './types';
import axios from 'axios';
import Cookies from 'js-cookie';


export function handleImageUpload(file){
  const photoReader = new FileReader()
  photoReader.readAsDataURL(file.image[0])
  photoReader.onload = () => {
    console.log('started')
  }
  photoReader.onloadend = () => {
    console.log('DONE', photoReader.result.slice(22))
    const data = {
      image: photoReader.result.slice(22),
      type: 'base64'
    }
    const config = {
      headers : {
        Authorization: 'Client-ID 9d052d270eaeaec',
        Accept: 'application/json'
      }
    }
    return axios.post('https://api.imgur.com/3/image', data, config)
    .then((response)=>{
      console.log(response.data.data.link)
      return {
        type: HANDLE_IMG_UPLOAD,
        payload: response.data.link
      }
    })
    .catch((error)=> {
      console.error(error)
    })
  }
}
