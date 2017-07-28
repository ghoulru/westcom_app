// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;
//
var Config = {
    notifications: {
        titleError : "Ошибка",
        titleAlert: "Внимание!"
    }
};
var isFirstRun = false;
// Initialize app
var myApp = new Framework7({
    pushState: true,
    cache: false,
    sortable: false, //If you don't use sortable lists you can disable it for potentially better performance.
    panelLeftBreakpoint: 700,
    modalCloseByOutside: true,//разрешаем закрытие модальных окон по клику на поле за его пределами
    showBarsOnPageScrollTop: false,
    //swipePanel: 'left',//для пенелей

    onAjaxStart: function (xhr) {
        myApp.showIndicator();
    },
    onAjaxComplete: function (xhr) {
        myApp.hideIndicator();
    }
});


// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    //dynamicNavbar: true
});

var Log = $$('#log');
//myApp.openPanel('left', false);

document.addEventListener("deviceready", onDeviceReady, false);
document.addEventListener("resume", onResume, false);
//setOnline();
//setOffline();
//document.addEventListener("online", isOnline, false);
function onDeviceReady() {

    Log.append("Device is ready");
    document.addEventListener("online", isOnline, false);
    if( DBStorage.init() ) {

        var isFirstRun = localStorage.getItem("isFirstRun");

        if (isFirstRun == null || isFirstRun == 'true')
            isFirstRun = true;

        if (isFirstRun) {
            //DBStorage.dropTbl(DBStorage.ordersTbl);
            //DBStorage.dropTbl(DBStorage.customersTbl);
            DBStorage.createTablesIfNotExists();
            localStorage.setItem("isFirstRun", false);
        }
    }
    //setOnline();
    setOffline();

    generateCatalogMenu();
}
//generateCatalogMenu();
function onResume() {
    Log.append("Device resume");
    //setOnline();
    //setOffline();
    
}
function isOnline() {
    //setPageTile('online');
    Log.append("<br>online");
}
function setOnline() {
    //document.addEventListener("online", isOnline, false);
}
function isOffline() {
    setPageTile('offline');
    navigator.notification.alert('Отсутствует интернет-соединение. Обновление цен и заказ товаров невозможны.', null, Config.notifications.titleAlert);
    //myApp.alert('Отсутствует интернет-соединение. Обновление цен и заказ товаров невозможны.', Config.notifications.titleAlert);
}
function setOffline() {
    document.addEventListener("offline", isOffline, false);



}

function generateCatalogMenu() {
    var compiledCatItem = Template7.compile(Tpl.catalogMenuItem);
    var catMenu = {
        menu: [
            {
                name: "Название",
                url: ""
            },

        ]
    }
    for (var i = 0; i< 10; i++) {
        var itm = {
                name: "Название " + i,
                url: ""
            };
        catMenu.menu.push(itm);
    }
    var item = compiledCatItem(catMenu);
    //Log.html(item);
    $$('#catalog-menu').html(item);
}
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

