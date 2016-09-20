export default function(state = null, action) {
  switch(action.type) {
    case 'CREATING_ACCOUNT':
      return 'hi';
      // Store info into DB
    default:
      return 'bi';
  }
}
