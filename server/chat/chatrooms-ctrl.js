const Chatrooms = require('./chatrooms-model.js');
const ChatMessages = require('./chatMessages-model.js');

const chatrooms = {
  '/api/chats/chatHistory': {
    'get': (req, res) => {
      Chatrooms.findOrCreate({
        where: {
          room_id: req.query.room_id
        },
        include: [ChatMessages]
      })
      .then((chatrooms) => {
        res.status(200).send(chatrooms[0]);
      })
      .catch((err) => {
        res.status(400).send({
          msg: 'Error getting chatroom messages.'
        });
      });
    },
    'post': (req, res) => {
      ChatMessages.bulkCreate(req.body.messages)
      .then((messages) => {
        res.status(201).send();
      })
      .catch((err) => {
        res.status(400).send({
          msg: 'Error storing messages.'
        });
      });
    }
  }
}

module.exports = chatrooms;
