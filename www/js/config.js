angular.module('passwordSaver.config')
.constant('DB_CONFIG', {
    name: 'DB',
    tables: [
      {
            name: 'psuers',
            columns: [
                {name: 'userName', type: 'text primary key'},
                {name: 'password', type: 'text'},
                {name: 'email', type: 'text'}
               
            ]
        }
    ]
});