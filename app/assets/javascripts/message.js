$(function(){


  var reloadMessages = function() {
    var last_message_id = $('.chat-main__list__box:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
      var insertHTML = '';
      $.each(messages, function(i, message){
        insertHTML += buildHTML(message)
      });
      $('.chat-main__list').append(insertHTML);
      $('.chat-main__list').animate({scrollTop: $('.chat-main__list')[0].scrollHeight});
    }
    })
    .fail(function() {
      alert('error');
    });
  };


  function buildHTML(message){
    if ( message.image ) {
      var html =
       `<div class ="chat-main__list__box" data-message-id =${message.id}>
          <div class ="chat-main__list__box__group">
            <div class = "chat-main__list__box__group__myname">
              ${message.user_name} 
            </div>
            <div class ="chat-main__list__box__group__date">
                ${message.created_at}
              <p class ="chat-main__list__box__message">
                ${message.text}
              </p>
              <img class ="chat-main__list__img"src =${message.image}>
            </div>
          </div>
        </div>`
      return html;
    } else {
      var html =
      `<div class ="chat-main__list__box" data-message-id =${message.id}>
          <div class ="chat-main__list__box__group">
            <div class = "chat-main__list__box__group__myname">
              ${message.user_name} 
            </div>
            <div class ="chat-main__list__box__group__date">
                ${message.created_at}
              <p class ="chat-main__list__box__message">
                ${message.text}
              </p>
            </div>
          </div>
        </div>`
      return html;
    };
  }
  $('#new_message').on('submit',function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      disabled: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__list').append(html);
      $('.chat-main__list').animate({scrollTop: $('.chat-main__list')[0].scrollHeight}, 'fast');
      $('form')[0].reset();
    })
    .fail(function(){
      alert('error');
    });
    return false;
  });
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});