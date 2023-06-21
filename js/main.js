var thicknessBreadArr = ["thin", "regular", "thick"];
var sizeBreadArr = ["small", "medium", "large"]; 
var productsToTopArr = ["tomato", "pickledCucember", "turkeyMeat", "mushroom", "olive", "horseMeat"]; 
var addedProductsToTopArr = []; 
var addsArr = ["pepper", "sausages"]; 
var addedAddsArr = []; 


var elForm = document.querySelector('.js-form'); 
var elSelectBreadThickness = elForm.querySelector('.js-select');
var elRadiosBox = elForm.querySelector('.js-radios');
var elCheckboxesBoxOnTop = elForm.querySelector('.js-checkboxes'); 
var elCheckboxesBoxAdds = elForm.querySelector('.js-checkboxes-adds');


var elOutputBreadThickness = document.querySelector('.js-bread-type');
var elOutputBreadSize = document.querySelector('.js-bread-size');
var elOutputTopProducts = document.querySelector('.js-top-list'); 
var elOutputTopAddsProducts = document.querySelector('.js-adds-list');

elOutputBreadThickness.textContent = thicknessBreadArr[0];


for (let i = 0; i < thicknessBreadArr.length; i++) {
    var newOptionItem = document.createElement('option'); 
    newOptionItem.value = newOptionItem.textContent = thicknessBreadArr[i]; 
    newOptionItem.selected = (i === 0) ? true : false; 
    
    elSelectBreadThickness.append(newOptionItem); 
}

for (let i = 0; i < sizeBreadArr.length; i++) {
    var wrapperDiv = document.createElement('div'); 
    wrapperDiv.classList.add('form-check'); 
    
    var radioItem = document.createElement('input');
    radioItem.classList.add('btn-check');
    radioItem.type = 'radio';
    radioItem.name = 'Bread-size';
    radioItem.id = `radio-${i}`; 
    radioItem.value = sizeBreadArr[i]; 
    
    if (i === 0) {
        wrapperDiv.classList.add('p-0');
        radioItem.checked = true; 
    }
    
    var newLabel = document.createElement('label');
    newLabel.classList.add('btn', 'btn-outline-dark', 'rounded-pill'); 
    newLabel.setAttribute('for', `radio-${i}`); 
    newLabel.textContent = sizeBreadArr[i]; 
    
    wrapperDiv.append(radioItem); 
    wrapperDiv.append(newLabel); 
    
    elRadiosBox.append(wrapperDiv);
    
    radioItem.addEventListener('change', function () {
        elOutputBreadSize.textContent = this.value;
    });
}



for (let i = 0; i < productsToTopArr.length; i++) {
    var wrapperDiv = document.createElement('div'); 
    wrapperDiv.classList.add('form-check', 'col-6'); 
    
    var checkItem = document.createElement('input'); 
    checkItem.classList.add('form-check-input'); 
    checkItem.type = 'checkbox'; 
    checkItem.name = productsToTopArr[i]; 
    checkItem.id = `check-top-${i}`;
    checkItem.value = productsToTopArr[i]; 
    
    var newLabel = document.createElement('label'); 
    newLabel.classList.add('form-check-label'); 
    newLabel.setAttribute('for', `check-top-${i}`); 
    newLabel.textContent = productsToTopArr[i];
    
    wrapperDiv.append(checkItem);
    wrapperDiv.append(newLabel); 
    
    elCheckboxesBoxOnTop.append(wrapperDiv); 
    
    checkItem.addEventListener('change', function () {
        var currentValue = this.value; 
        var index = addedProductsToTopArr.indexOf(currentValue); 
        if (index > -1) {
            addedProductsToTopArr.splice(index, 1); 
        }
        else {
            addedProductsToTopArr.push(currentValue);
        }
        refreshAddedTopProducts(); 
    });
}



for (let i = 0; i < addsArr.length; i++) {
    var wrapperDiv = document.createElement('div'); 
    wrapperDiv.classList.add('form-check', 'col-6'); 
    
    var checkItem = document.createElement('input'); 
    checkItem.classList.add('form-check-input'); 
    checkItem.type = 'checkbox'; 
    checkItem.name = addsArr[i];
    checkItem.id = `check-adds-${i}`; 
    checkItem.value = addsArr[i]; 
    
    var newLabel = document.createElement('label'); 
    newLabel.classList.add('form-check-label'); 
    newLabel.setAttribute('for', `check-adds-${i}`); 
    newLabel.textContent = addsArr[i]; 
    
    wrapperDiv.append(checkItem); 
    wrapperDiv.append(newLabel); 
    
    elCheckboxesBoxAdds.append(wrapperDiv); 
    
    checkItem.addEventListener('change', function () {
        var currentValue = this.value; 
        var index = addedAddsArr.indexOf(currentValue); 
        if (index > -1) {
            addedAddsArr.splice(index, 1);
        }
        else {
            addedAddsArr.push(currentValue); 
        }
        refreshAddedAddsProducts(); 
    });
}


elSelectBreadThickness.addEventListener('change', function () {
    elOutputBreadThickness.textContent = this.value;
});


var refreshAddedTopProducts = function () {
    elOutputTopProducts.innerHTML = ''; 
    for (var i = 0; i < addedProductsToTopArr.length; i++) {
        var itemLi = document.createElement('li'); 
        itemLi.textContent = `- ${addedProductsToTopArr[i]}`; 
        elOutputTopProducts.append(itemLi); 
    }
}

var refreshAddedAddsProducts = function () {
    elOutputTopAddsProducts.innerHTML = ''; 
    for (var i = 0; i < addedAddsArr.length; i++) {
        var itemLi = document.createElement('li'); 
        itemLi.textContent = `- ${addedAddsArr[i]}`; 
        elOutputTopAddsProducts.append(itemLi); 
    }
}

const pizzaSizes = {
    small: 10,
    medium: 12,
    large: 15
};

const pizzaThickness = {
    thin: 10,
    regular: 12,
    thick: 15
};

let toppingPrices = {
    tomato: 5,
    turkeyMeat: 5,
    olive: 5,
    pickledCucember: 5,
    mushroom: 5,
    horseMeat: 5
  };
  

// let toppingPrices = {
//     tomato: 5,
//     turkeyMeat: 5,
//     olive: 5,
//     pickledCucember: 5,
//     mushroom: 5,
//     horseMeat: 5
// };

const additionalItem = {
    pepper: 3,
    sausages: 3,
};



var elCalculateButton = document.querySelector('.js-calculate');
var elTotalCostOutput = document.querySelector('.js-total-cost');

elCalculateButton.addEventListener('click', function() {
  var selectedSize = elForm.querySelector('input[name="Bread-size"]:checked').value;
  var selectedThickness = elSelectBreadThickness.value;

  var basePrice = pizzaSizes[selectedSize] + pizzaThickness[selectedThickness];

  var totalToppingsCost = addedProductsToTopArr.reduce(function(total, topping) {
    return total + toppingPrices[topping];
  }, 0);

  var totalAddsCost = addedAddsArr.reduce(function(total, add) {
    return total + additionalItem[add];
  }, 0);

  var totalCost = basePrice + totalToppingsCost + totalAddsCost;

  elTotalCostOutput.textContent = totalCost.toFixed(2);
});



// function calculateOrderCost(size, thickness, toppings, quantity, additionalItems) {
//     const pizzaPrice = pizzaSizes[size];
//     const thicknessMultiplier = pizzaThickness[thickness];
//     let toppingsCost = 0;

// try {
//         // Calculate the cost of selected toppings
//         for (let topping of toppings) {
//             toppingsCost += toppingPrices[topping];
//         }

//         // Calculate the cost of additional items
//         let additionalItemsCost = 0;
//         for (const item of additionalItems) {
//             additionalItemsCost += item.price;
//         }

//         // Calculate the total cost of the order
//         const totalCost = ((pizzaPrice + toppingsCost) * thicknessMultiplier + additionalItemsCost) * quantity;
//         return totalCost.toFixed(2); // Round to two decimal places
// } catch (error) {
//     console.log(error);
// }
// }


// const size = sizeBreadArr;
// const thickness = thicknessBreadArr;
// const toppings = addedProductsToTopArr;
// const quantity = 1;
// const additionalItems = addedAddsArr;

// const totalCost = calculateOrderCost(size, thickness, toppings, quantity, additionalItems);
// console.log(`Total cost: $${totalCost}`);


// var elCalculateButton = document.querySelector('.js-calculate');
// var elTotalCostOutput = document.querySelector('.js-total-cost');

// elCalculateButton.addEventListener('click', function() {
//    try {
//     var selectedSize = elForm.querySelector('input[name="Bread-size"]:checked').value;
//     var selectedThickness = elSelectBreadThickness.value;
    
//     var totalToppingsCost = addedProductsToTopArr.reduce(function(total, topping) {
//         return total + 5; // Assuming a fixed price of $1.99 per topping
//     }, 0);
    
//     var totalAddsCost = addedAddsArr.reduce(function(total, add) {
//         return total + 3; // Assuming a fixed price of $0.99 per additional item
//     }, 0);
    
//     var totalCost = calculateOrderCost(selectedSize, selectedThickness, [], 1, []) + totalToppingsCost + totalAddsCost;
    
//     elTotalCostOutput.textContent = totalCost.toFixed(2);
//    } catch (err) {
//         console.log(err);
//    }
// });

// function calculateOrderCost(size, thickness, toppings, quantity, additionalItems) {
//     try {
//         const pizzaPrice = pizzaSizes[size];
//     const thicknessMultiplier = pizzaThickness[thickness];
//     let toppingsCost = 0;
    
//     for (let topping of toppings) {
//         toppingsCost += toppingPrices[topping];
//     }

//     let additionalItemsCost = 0;
//         for (const item of additionalItems) {
//             additionalItemsCost += item.price;
//         }

//     const quantityPizza = quantity;
//     } catch (error) {
//         console.log(error);
//     }
// }

// console.log(elTotalCostOutput);
