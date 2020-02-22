$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
       `<div class ="chat-main__list__box">
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
      `<div class ="chat-main__list__box">
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
});