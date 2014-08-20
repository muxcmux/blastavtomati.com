$(function() {
  $('#contact-us').on('submit', function(e) {
    e.preventDefault();
    if (form_is_valid()) {
      send_email();
    }
  });
  
  function start_loading() { $('.loading-overlay').removeClass('hide') }
  function stop_loading() { $('.loading-overlay').addClass('hide') }
  
  function show_sent() {
    $('.the-form').addClass('hide');
    $('.thanks').removeClass('hide');
  }
  
  function form_is_valid() {
    var errors = [];
    var name = $.trim($('#name').val());
    var email = $.trim($('#email').val());
    var message = $.trim($('#message').val());
    if (!name) {
      errors.push('name');
    }
    if (!message) {
      errors.push('message');
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      errors.push('email');
    }
    if (!errors.length) return true;
    $('#name, #email, #message').parents('.form-group:first').removeClass('has-error');
    $.each(errors, function(index, error) {
      $('#' + error).parents('.form-group:first').addClass('has-error');
    });
    return false;
  }
  
  function send_email() {
    start_loading();
    $.ajax({
      type: "POST",
      url: "https://mandrillapp.com/api/1.0/messages/send.json",
      data: {
        key: "e9GklGWSlOd4ufVQO8XaiQ",
        message: {
          from_email: $('#email').val(),
          from_name: $('#name').val(),
          to: [
            {
              email: 'karasavov@yahoo.com',
              name: 'Hristo Karasavov',
              type: 'to'
            }
          ],
          autotext: true,
          subject: "Website enquiry",
          text: $('#message').val()
        }
      }
   }).done(function(response) {
     stop_loading();
     show_sent();
   });
  }
});