
var app = {};
var allMessages = [];
var allRooms = [];
var oldRooms = [];
$(document).ready(function() {
  // app.init();
  var $sendMessage = $('#send-message');
  var $createRoom = $('#create-room');
  setInterval(function() { app.fetch() }, 3000);
  setInterval(function() { app.init() }, 3000);
  
  ($sendMessage).click(function() {
    $('#chats').html('');
    var currentRoom = $('#roomSelect').find(':selected').text();
    var message = {};
    message.username = window.location.search;
    message.text = $('.input').val();
    message.roomname = currentRoom;
    app.send(message);
    app.fetch();
    for (var i = 0; i < allMessages.length; i++) {
      // console.log(allMessages[i].roomname);
      if (allMessages[i].roomname === currentRoom) {
        app.renderMessage(allMessages[i]);
      }
    }
  $('.input').html('');
  });
  
  ($createRoom).click(function() {
    console.log($('.roomInput').val())
    var newRoomName = $('.roomInput').val();
    app.renderRoom(newRoomName);
    $('.roomInput').html('');
  });
  
  //helperfucntion
  //call fetch
  //grabs all the message and calls app.rendermesseges with that
  
  //interval(xxx, )
  
});


app.init = function() {
  app.clearMessages();
  var currentRoom = $('#roomSelect').find(':selected').text();
  for (var i = 0; i < allMessages.length; i++) {
    if (allMessages[i].roomname === currentRoom) {
      app.renderMessage(allMessages[i]);
    }
  }
  //rendermessage for each item
  //but only render them if they are the room we are in
  
};

app.send = function(message) {
  
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.fetch = function() {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    data: 'order=-createdAt',
    contentType: 'application/json',  
    success: function (data) {
      console.log('chatterbox: Message received');
      allMessages = [];
      allMessages = allMessages.concat(data.results);
      allMessages.forEach(function(message) {
        if(!allRooms.includes(message.roomname)) {
          allRooms.push(message.roomname);
        }
      })
      allRooms.forEach(function(roomName) {
        if(!oldRooms.includes(roomName)) {
          app.renderRoom(roomName);
          oldRooms.push(roomName);
        }
      })
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to get message', data);
    }
  });
  //arr.push(all our stuff);
};

app.clearMessages = function() {  
  var $chats = document.getElementById('chats');
  while ($chats.firstChild) {
    $chats.removeChild($chats.firstChild);
  }
};

app.renderMessage = function(message) {  
  // console.log(message);
  var escapedText = function(input) {
    return input.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }
  var chat = $('<div class="chat"><div class="text"><p>' + escapedText(message.text) + '</p></div>' + `<div class="username">${message.username}</div>` + `<div class="roomname">${message.roomname}</div></div>`);
  // var chat = $('<div class="chat"><div class="text"><p>' + message.text + '</p></div>' + `<div class="username">${message.username}</div>` + `<div class="roomname">${message.roomname}</div></div>`);
  chat.appendTo('#chats');
};

app.renderRoom = function(roomName) {  
  // console.log(roomName);
  var room = $(`<option value="${roomName}">${roomName}</option>`);
  room.appendTo('#roomSelect');
  //filter posts by room
};


app.filterByRoom = function(roomName) {
  
};

app.handleUsernameClick = function() {
  var $username = document.getElementByClassName('username');
  ($username).click(function() {
  });
};




























