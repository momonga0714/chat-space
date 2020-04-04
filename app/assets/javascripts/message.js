$(function(){

  function buildHTML(message){
    if (message.image) {
      var html = `<div class="one-message">
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
      var html = `<div class="one-message">
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
      $(".submit-btn").prop("disabled",false);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  })
});