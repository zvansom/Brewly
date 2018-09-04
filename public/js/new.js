$(document).ready(function() {
  $('.add-button').click(function(e) {
    e.preventDefault();
    const type = $(this).attr('id');
    const name = $(`#${type}-name`).val();
    const qty = $(`#${type}-qty`).val();
    if(!name) { 
      console.log('no name!');
      return; }
    if(!qty) { 
      console.log('no qty!');
      return; }
    const unit = $(`#${type}-unit`).val() || '';
    const form = $(`#${type}-form`).val() || '';
    const time = $(`#${type}-time`).val() || '';
    const use = $(`#${type}-use`).val() || '';

    const newItem = `
      <div class="ingredient">
        <p data-category="${type}">
          <span data-type="name">${name} </span>
          <span data-type="qty">${qty} </span>
          <span data-type="unit">${unit} </span>
          <span data-type="form">${form} </span>
          <span data-type="time">${time} </span>
          <span data-type="use">${use} </span>
          <a class="button remove">Remove Ingredient</a>
        </p>
      </div>
    `;

    $(`#archive-${type}`).append(newItem);
    $(`#${type}-name`).val('');
    $(`#${type}-qty`).val('');
  });

  $('.ingredient-archive').on('click', 'a', function(e) {
    e.preventDefault();
    $(this).parent().remove();
  });


  $('#new-recipe').submit(function(e) {
    e.preventDefault();
    
    let malts = [];
    let hops = [];
    let adjuncts = [];
    
    // Deal with the inputs in the malts section if they exist.
    if( $('#malt-name').val() && $('#malt-qty').val() ) {
      const maltAssembler = {
        name: $('#malt-name').val(),
        amount: {
          value: $('#malt-qty').val(),
          unit: $('#malt-unit').val()
        },
        form: $('#malt-form').val()
      };
      malts.push(maltAssembler);
    } else {
      console.log('No name or qty');
    }
    
    // Deal with the archived malts section.
    const collectedMalts = Array.from($('p[data-category="malt"]'));
    collectedMalts.forEach(malt => {
      const maltAssembler = {
        name: malt.children[0].textContent,
        amount: {
          value: malt.children[1].textContent,
          unit: malt.children[2].textContent
        },
        form: malt.children[3].textContent
      };
      malts.push(maltAssembler);
    });
    
    // Deal with the inputs in the hops section if they exist.
    if($('#hop-name').val() && $('#hop-qty').val()) {
      const hopAssembler = {
        name: $('#hop-name').val(),
        amount: {
          value: $('#hop-qty').val(),
          unit: "grams"
        },
        add: $('#hop-time').val(),
        attribute: $('#hop-use').val()
      };
      hops.push(hopAssembler);
    }
    
    // Deal with the archived hops section.
    const collectedHops = Array.from($('p[data-category="hop"]'));
    collectedHops.forEach(hop => {
      const hopAssembler = {
        name: hop.children[0].textContent,
        amount: {
          value: hop.children[1].textContent,
          unit: "grams"
        },
        add: hop.children[4].textContent,
        attribute: hop.children[5].textContent
      };
      hops.push(hopAssembler);
    });
    
    // Deal with the inputs in the adjuncts section if they exist.
    if($('#adjunct-name').val() && $('#adjunct-qty').val()) {
      const adjunctAssembler = {
        name: $('#adjunct-name').val(),
        amount: {
          value: $('#adjunct-qty').val(),
          unit: "grams"
        }
      };
      adjuncts.push(adjunctAssembler);
    }
    
    // Deal with the archived hops section.
    const collectedAdjuncts = Array.from($('p[data-category="adjunct"]'));
    collectedAdjuncts.forEach(adjunct => {
      const adjunctAssembler = {
        name: adjunct.children[0].textContent,
        amount: {
          value: adjunct.children[1].textContent,
          unit: "grams"
        }
      }
      adjuncts.push(adjunctAssembler);
    });
    
    // Package all the ingredients together
    const ingredients = {
      malt: malts,
      hops: hops,
      adjunct: adjuncts,
      yeast: $('#yeast-name').val()
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
      ingredients: JSON.stringify(ingredients),
      userId: $('#userId').val()
    };
    
    $.ajax({
      method: 'post',
      url: $(this).attr('action'),
      data: data
    }).done(function() {
      window.location = "/profile/recipes";
    }).fail(function(err) {
      console.log(err)
    });
  });
});
