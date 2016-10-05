import { CREATE_ROOM } from './types';

export function createRoom(friendObj) {
  const roomId = [friendObj.user1_id, friendObj.user2_id].sort().join('_');
  console.log("In createRoom: ", roomId);
  return {
    type: CREATE_ROOM,
    payload: roomId
  }
}
