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

var txt = $('.page-content');

$$(document).on('deviceready', function() {
    console.log("Device is ready!");

    if( DBStorage.init() ){

        var isFirstRun = localStorage.getItem("isFirstRun");

        if( isFirstRun == null || isFirstRun == 'true'){
            //DBStorage.dropTbl(DBStorage.ordersTbl);
            //DBStorage.dropTbl(DBStorage.customersTbl);
            DBStorage.createTablesIfNotExists();
            localStorage.setItem("isFirstRun", false);
        }

    }
});
$$(document).on('resume', function() {
    txt.html('resume');
});
$$(document).on('online', function() {
    console.log('online');
    txt.html('online');
});
$$(document).on('offline', function() {
    console.log('offline');
    txt.html('offline');
});
//setPageTile('Главная');

var buttonBack = $$('#btn-back');

myApp.onPageBeforeAnimation('*', function(page){
    if (page.name == 'index')
        buttonBack.css('opacity', '0');
    else
        buttonBack.css('opacity', '1');
});

// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
/*myApp.onPageInit('about', function (page) {
    // Do something here for "about" page
    console.log('about init');
});*/


function setPageTile(str) {
    $$('.js-app-name').html(str);
}

