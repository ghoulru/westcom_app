var DBStorage = {

	db : null,
	dbName: 'westcom',
	version: '1.0.0',
	size: 1000000,


	init: function() {
		this.db = window.openDatabase(this.dbName, this.version, "westcom app db", this.size);

		if (!this.db) {
			App.showAlert('webSQL не поддерживается');
			return false;
		}
		else
			console.log('db connected');

		return true;
	},

	dropTbl: function( tbl ){
		this.db.transaction( function(tx){
			tx.executeSql("DROP TABLE IF EXISTS " + tbl);
		}, this.errorHandler, this.successHandler('Table "'+ tbl + '" - deleted'));
	},

	createTablesIfNotExists: function(){

        db_create_tables(this.db, this.errorHandler, this.successHandler);
        /*var qCatalog = "CREATE TABLE IF NOT EXISTS " + this.tbl_catalog + "(" +
            "id INTEGER PRIMARY KEY ASC, " + /*ид*/
            "pid INTEGER, " + /*ид родительской категории*/
            "num INTEGER, " + /*порядковый номер, сортировка*/
            "name TEXT, " + /*название*/
            "created INTEGER, " + /*дата создания unixtime*/
            "version"
            ")";
        /*this.db.transaction( function(tx){
            tx.executeSql(qCatalog);
        }, this.errorHandler, this.successHandler('Table "'+ this.tbl_catalog + '" - created'));*/


	},

	query: function(query, _values, callback){
		var values = _values || [];
		this.db.transaction( function(tx){
			tx.executeSql(query, values, callback, this.errorHandler);
		}, this.errorHandler, this.successHandler(query + ' - ok'));

	},

	/**
	 * Получить заказы со статусом
	 * @param status - статус
	 * @param max - сколько
	 */
	getOrders: function(status, max){

	},

	errorHandler: function(err){
		console.log('DB error: ' +err.message + ' (' + err.code+ ')');
	},
	successHandler: function(msg){
		console.log(msg);
	}
}