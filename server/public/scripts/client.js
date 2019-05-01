$(document).ready(onReady);

// When document is ready, run this function
function onReady() {
    // Go get the restaurants inside the database
    getRestaurants();
    $('.js-btn-addRestaurant').on('click', addRestaurant);
}

// Takes the information from the Front End and moves it to
// the client
function addRestaurant() {
    const name = $('#name').val();
    const address = $('#address').val();
    const bestfood = $('#bestfood').val();

    // Create an object, and store values,
    // related to the input fields above.
    // Note that the 'key name' is the same
    // as the above variable names. This both
    // creates a key and maps the value to the
    // closest variable of the same name.
    const restaurantObject = {
        name,
        address,
        bestfood
    }

    // Call postRestaurant giving it the object we created
    // above
    postRestaurant(restaurantObject);
}

// Send information to server, to eventually be saved
// to the database
function postRestaurant(restaurantObject) {
    $.ajax({
        type: 'POST',
        url: '/restaurants',
        data: restaurantObject
    }).then(function(response) {
        getRestaurants();
    })
}

// Go to the database for the restaurant list
function getRestaurants() {
    // First part hops over to the server, with a 
    // GET request to the url restaurants.
    $.ajax({
        type: 'GET',
        url: '/restaurants'
    }).then(function(arrayFromDatabase) {
        // Take the data from the server (that we got from the
        // database), and send that over to the render function.
        render(arrayFromDatabase);
    });
}

function render(arrayFromDatabase) {
    // Find container, and wipe out all its children
    $('.container').empty();

    // The argument above, called arrayFromDatabase,
    // has an array of objects, and for each object
    // do the things in the loop
    for (let restaurant of arrayFromDatabase) {
        // Add a new div and children to container,
        // for each item inside the array
        $('.container').append(`
            <div>
                <h2>${restaurant.name}</h2>
                <h6>${restaurant.address}</h6>
                <p>${restaurant.bestfood}</p>
            </div>
        `);
    }
}