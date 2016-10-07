import { HANDLE_IMG_UPLOAD } from './types';
import axios from 'axios';
import Cookies from 'js-cookie';


export function handleImageUpload(file) {
  const photoReader = new FileReader();
  photoReader.readAsDataURL(file.image[0]);
  photoReader.onloadend = () => {
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
    .then((response) => {
      console.log(response.data.data.link)
      const data = {
        userID: Cookies.get('userID'),
        url: response.data.data.link
      }
      const config = {
        headers : { 'x-access-token': Cookies.get('token') }
      }
      axios.post('/api/profilePics/pic', data, config)
      .then((response) => {
        return { type: HANDLE_IMG_UPLOAD, payload: 'Successfully stored image.' }
      })
      .catch((error) => {
        console.error(error);
        return { type: HANDLE_IMG_UPLOAD, payload: 'Error storing image.' }
      });
    })
    .catch((error)=> {
      console.error(error);
      return { type: HANDLE_IMG_UPLOAD, payload: 'Error uploading image.' }
    });
  }
}
