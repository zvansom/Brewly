$(document).ready(function() {
  $('#add-malt').click(function(e) {
    e.preventDefault();
    const maltInput = $('#malt-name').val();
    const maltQty = $('#malt-qty').val();
    const maltUnit = $('#malt-unit').val();
    if(!maltInput && !maltQty) { console.log('You must add a malt name and qty first.')}
    else {
      const archiveMalt = $(`<p>${maltInput} ${maltQty} ${maltUnit}</p>`);
      $('#archive-malt').append(archiveMalt);
      $('#malt-name').val('');
      $('#malt-qty').val('');
      console.log($('#malt-unit').val());
    }
  });
});