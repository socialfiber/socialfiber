import axios from 'axios';

//post req to db
  //rerender page on change
export function submitFoodDiaryEntry(foodDiaryEntryObj){
  return (dispatch) => {
    axios.post('/api/', foodDiaryEntryObj)
    .then(response=> {
      dispatch({ type: AUTH_USER, payload: response.data })
    })
    .catch(()=>{
      console.log("Wrong login info")
    });
  }
}
