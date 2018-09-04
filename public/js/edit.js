$(document).ready(function() {
  $('#new-recipe').submit(function(e) {
    e.preventDefault();
    const maltData = [];
    const malts = Array.from($('[data-malt]'));
    malts.forEach(malt => {
      const m = {
        name: malt.children[0].value,
        amount: {
            value: malt.children[1].value,
            unit: malt.children[2].value
        }
      };
      maltData.push(m);
    });

    const hopData = [];
    const hops = Array.from($('[data-hop]'));
    hops.forEach(hop => {
      const h = {
        name: hop.children[0].value,
        amount: {
          value: hop.children[1].value,
          unit: hop.children[2].value
        },
        add: hop.children[3].value,
        attribute: hop.children[4].value
      };
      hopData.push(h);
    });

    const adjunctData = [];
    const adjuncts = Array.from($('[data-adjunct]'));
    if(adjuncts) {
      adjuncts.forEach(adjunct => {
        const a = {
          name: adjunct.children[0].value,
          amount: adjunct.children[1].value
        };
        adjunctData.push(a);
      });
    }

    const ingredients = {
      malt: maltData,
      hops: hopData,
      adjuncts: adjunctData,
      yeast: $('#yeast').val()
    }

    const data = {
      name: $('#name').val(),
      style: $('#style').val(),
      batchSize: $('#batchSize').val(),
      abv: $('#abv').val(),
      ibu: $('#ibu').val(),
      srm: $('#srm').val(),
      ebc: $('#ebc').val(),
      targetOg: $('#target-og').val(),
      targetFg: $('#target-fg').val(),
      mashTemp: $('#mash-temp').val(),
      fermTemp: $('#ferm-temp').val(),
      ingredients: JSON.stringify(ingredients)
    }

    $.ajax({
      method: 'put',
      url: $(this).attr('action'),
      data: data
    }).done(function() {
      window.location = "/profile/recipes";
    }).fail(function(err) {
      console.log(err);
    });
  });
});