$(document).ready(onReady);

function onReady() {
    getRestaurants();
    $('.js-btn-addRestaurant').on('click', addRestaurant);
    $('.container').on('click', '.js-btn-visit-toggle', toggleVisitRestaurant);
    $('.container').on('click', '.js-btn-delete', deleteRestaurant);
}

function addRestaurant() {
    const name = $('#name').val();
    const address = $('#address').val();
    const bestfood = $('#bestfood').val();

    const restaurantObject = {
        name,
        address,
        bestfood
    }

    postRestaurant(restaurantObject);
}

function postRestaurant(restaurantObject) {
    $.ajax({
        type: 'POST',
        url: '/restaurants',
        data: restaurantObject
    }).then(function(response) {
        getRestaurants();
    })
}

function getRestaurants() {
    $.ajax({
        type: 'GET',
        url: '/restaurants'
    }).then(function(arrayFromDatabase) {
        render(arrayFromDatabase);
    });
}

function toggleVisitRestaurant() {
    const restaurantId = $(this).parent().data('id');

    $.ajax({
        type: 'PUT',
        url: `/restaurants/${restaurantId}`
    }).then(function(restaurant) {
        getRestaurants();
    });
}

function updateVisitRestaurant(restaurant) {
    $.ajax({
        type: 'PUT',
        url: `/restaurants/${restaurant.id}`,
        data: restaurant
    }).then(function(restaurant) {
        getRestaurants();
    });
}

function deleteRestaurant() {
    const restaurantId = $(this).parent().data('id');
    $.ajax({
        type: 'DELETE',
        url: `/restaurants/${restaurantId}`
    }).then(function(restaurant) {
        getRestaurants();
    });
}

function render(arrayFromDatabase) {
    $('.container').empty();

    for (let restaurant of arrayFromDatabase) {
        let bestFood = restaurant.bestfood;
        if (!bestFood) {
            bestFood = "N/A";
        }

        $('.container').append(`
            <div class="restaurant" data-id="${restaurant.id}">
                <div><h2>${restaurant.name}</h2></div>
                <div><h6>${restaurant.address}</h6></div>
                <div><p>${bestFood}</p></div>
                <div class="js-btn-visit-toggle hover"><p>Visited: ${restaurant.visited}</p></div>
                <div class="js-btn-delete hover">Remove</div>
            </div>
        `);
    }
}