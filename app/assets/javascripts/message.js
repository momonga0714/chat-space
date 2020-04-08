$(function(){
  
  function buildHTML(message){
    if (message.image) {
      var html = `<div class=one-message" data-message-id=${message.id}>
                    <div class="one-message__name__box">
                      ${message.user_name}
                    </div>
                    <div class="one-message__name__day">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="one-message_box">
                    <p class="name-box__text">
                      ${message.content}
                    </p>
                  </div>
                    <img src=${message.image} >`
      return html;
    } else {
      var html = `<div class="one-message" data-message-id=${message.id}>
                    <div class="one-message__name__box">
                      ${message.user_name}
                    </div>
                    <div class="one-message__name__day">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="one-message_box">
                    <p class="name-box__text">
                      ${message.content}
                    </p>
                  </div>`
                return html;
                };
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $(".messages").append(html);
      $(".input-text").val("");
      $("#message_image").val("");
      $(".submit-btn").prop("disabled",false);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      location.href = 'messages';
    });
  })
  var reloadMessages = function() {
    
    var last_message_id = $('.one-message:last').data("message-id");
    
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      $('.one-message__box').append(insertHTML);
      
      $('.one-message__box').animate({ scrollTop: $('.messages')[0].scrollHeight});
      
      }
    })
    .fail(function() {
      alert('error');
      location.href = 'messages';
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});