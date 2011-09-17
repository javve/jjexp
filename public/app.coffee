$ ->
  Error = (msg) ->
    $('#error').remove()
    $('body').append("<div id='error'>#{msg}</div>")
    setTimeout ->
      $('#error').fadeOut()
    , 5000

  $('form[action="/regexps"]').submit (e) ->
    e.preventDefault()

    $.post $(this).attr('action'), $(this).serialize(), (record, status) ->
      if status=="success"
        # TODO: template?
        $('footer ul').append "<li>#{record.title}</li>"
      else
        new Error record.error
      console.log status, record
