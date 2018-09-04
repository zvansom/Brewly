$('#delete-recipe').click(function(e) {
  e.preventDefault();
  console.log('clicked.  Time to make this go away.');
  // console.log($(this).attr('href'));
  $.ajax({
    method: "DELETE",
    url: $(this).attr('href')
  }).done( data => {
    console.log('Bingo!', data);
    window.location = '/profile/recipes';
  }).fail( err => {
    console.log("Err:", err)
  });
});