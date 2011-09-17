$(function() {
  var Error;
  Error = function(msg) {
    $('#error').remove();
    $('body').append("<div id='error'>" + (msg) + "</div>");
    return setTimeout(function() {
      return $('#error').fadeOut();
    }, 5000);
  };
  return $('form[action="/regexps"]').submit(function(e) {
    e.preventDefault();
    return $.post($(this).attr('action'), $(this).serialize(), function(record, status) {
      if (status === "success") {
        $('footer ul').append("<li>" + (record.title) + "</li>");
      } else {
        new Error(record.error);
      }
      return console.log(status, record);
    });
  });
});