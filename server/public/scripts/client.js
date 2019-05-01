$(document).ready(onReady);

function onReady() {
    $('.js-btn-addRestaurant').on('click', addRestaurant);
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

    console.log(restaurantObject);
}

function postRestaurant() {

}

function getRestaurants() {

}

function render() {

}