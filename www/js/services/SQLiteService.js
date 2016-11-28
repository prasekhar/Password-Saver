angular.module('passwordSaver')

.factory('SQLiteService', function($cordovaSQLite, $q) {

    return {
        connect: connect,
        create: create,
        insert: insert,
        get: get,
        getAll: getAll,
        update: update,
        deleteSpecific: deleteSpecific,
        deleteAll: deleteAll,
        checkTable: checkTable
    };

    function connect() {

    }

    function create(table_name, params) {
        var query = "create table if not exists " + table_name + " (" + params[0].column + " " + params[0].type + ", " + params[1].column + " " + params[1].type + ", " + params[2].column + " " + params[2].type +", " +params[3].column + " " + params[3].type+")";
        $cordovaSQLite.execute(db, query);
        checkTable(table_name, params);
    }

    function insert(query, params) {
        return $cordovaSQLite.execute(db, query, params).then(function(res) {
            if (res.insertId > 0) {
                console.log(res);
                return "success";
            } else {
                return "failure"
            }
        }, function(err) {
            console.log(err);
            return err;
        });
    }

    function get(query, params) {
        return $cordovaSQLite.execute(db, query, params).then(function(res) {
                return res;
            },
            function(err) {
                return err;
            });
    }

    function getAll(query) {

    }

    function update(query, params) {
       return $cordovaSQLite.execute(db, query, params).then(function(res) {
                return res;
            },
            function(err) {
                return err;
            });    
    }

    function deleteSpecific(query, params) {

    }

    function deleteAll(query) {

    }

    function checkTable(table_name, params) {

        query = "SELECT name FROM sqlite_master WHERE type='table' AND name= ?";
        return $cordovaSQLite.execute(db, query, [table_name]).then(function(res) {
                if (res.rows.length === 1) {
                    return true;
                } else {
                    create(table_name, params);
                    return false;
                }
            },
            function(err) {
                create(table_name, params);
                console.log(err);
                return false;
            });
    }

});
