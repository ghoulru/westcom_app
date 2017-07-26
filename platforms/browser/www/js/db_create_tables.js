/**
 * Создает таблицы
 */
var db_create_tables = function(db, err, success){

    var tbl_catalog = 'catalog';

    var qCatalog = "CREATE TABLE IF NOT EXISTS " + tbl_catalog + "(" +
        "id INTEGER PRIMARY KEY ASC, " + /*ид*/
        "pid INTEGER, " + /*ид родительской категории*/
        "num INTEGER, " + /*порядковый номер, сортировка*/
        "name TEXT, " + /*название*/
        "created INTEGER, " + /*дата создания unixtime*/
        "hash TEXT" +
    ")";
    db.transaction( function(tx){
        tx.executeSql(qCatalog);
    }, err, success('Table "'+ tbl_catalog + '" - created'));
}
