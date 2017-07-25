// Initialize app
var myApp = new Framework7({
    pushState: true,
    cache: false,
    sortable: false, //If you don't use sortable lists you can disable it for potentially better performance.
    panelLeftBreakpoint: 700,
    modalCloseByOutside: true,//разрешаем закрытие модальных окон по клику на поле за его пределами
    showBarsOnPageScrollTop: false,


    onAjaxStart: function (xhr) {
        myApp.showIndicator();
    },
    onAjaxComplete: function (xhr) {
        myApp.hideIndicator();
    }
});


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    //dynamicNavbar: true
});



// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");

});
//setPageTile('Главная');

var buttonBack = $$('#bnt-back');

$$(document).on('page:init', function (e) {
    var page = e.detail.page;

    console.log(page);

    if (page.name == 'index')
        buttonBack.hide();
    else
        buttonBack.show();

});

// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page
    console.log('about init');
});

// Option 2. Using one 'pageInit' event handler for all pages:
/*$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

    if (page.name === 'about') {
        // Following code will be executed for page with data-page attribute equal to "about"
        //myApp.alert('Here comes About page');
    }
});*/

// Option 2. Using live 'pageInit' event handlers for each page
/*$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    //myApp.alert('Here comes About page');
});*/

function setPageTile(str) {
    $$('.js-app-name').html(str);
}

