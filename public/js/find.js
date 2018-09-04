$(document).ready(function() {
  $('.add-favorite').submit(function(e) {
    e.preventDefault();
    const favoritedBeer = $(this);
    $.ajax({
      method: "post",
      url: $(this).attr('action'),
      data: $(this).serialize()
    }).done(function() {
      favoritedBeer.find('.favSubmit').hide();
      favoritedBeer.append('<p>🍺 Favorited!</p>');
    }).fail(function(err) {
      console.log(err);
    });
  });
});