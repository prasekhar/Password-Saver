angular.module('passwordSaver')

.factory('userService', function($cordovaSQLite, $q, SQLiteService, emailService) {

    return {
        authenticateUser: authenitcateUser,
        registerUser: registerUser,
        forgotPassword: forgotPassword,
        resetPassword: resetPassword
    };

    function authenitcateUser(user) {

        return SQLiteService.get('select userName , name from psusers where userName = ? and password = ?', [user.userName, user.password]).then(function(res) {
            if (res.rows.length > 0) {
                sessionStorage.userName = res.rows[0].userName;
                return "User Authorized";
            } else {
                return "Invalid User Name or Password";
            }
        });
    }

    function registerUser(user) {

        var userName = user.userName,
            password = user.password,
            emailId = user.emailId,
            name = user.name,
            query = "INSERT INTO psusers (userName, password, email) VALUES (?,?,?)";


        return SQLiteService.checkTable('psusers', [{ column: "userName", type: "text primary key" }, {column : "name", type:"text"}, { column: "password", type: "text" }, { column: "email", type: "text" }]).then(function(res) {
            if (res) {
                return SQLiteService.insert('INSERT INTO psusers (userName,  name, password, email) VALUES (?,?,?,?)', [userName, name, password, emailId])
                    .then(function(res) {
                        if (res === "success") {
                            return "success";
                        } else {
                            var error = {
                                errCode: '6',
                                message: "User already Exists"
                            };
                            return error;
                        }
                    });
            } else {
                SQLiteService.create('psusers', [{ column: "userName", type: "text primary key" }, {column : "name", type:"text"}, { column: "password", type: "text" }, { column: "email", type: "text" }]);
            }
        });
    }

    function forgotPassword(user) {
        return SQLiteService.get('select email , userName, password from psusers where userName = ? and email = ?', [user.userName, user.emailId]).then(function(res) {

            if (res.rows.length > 0) {
                if (res.rows[0].userName === user.userName && res.rows[0].email === user.emailId) {
                    emailService.sendEmail(res.rows[0]);
                    return "success";
                } else {
                    return "Email entered is not registered";
                }
            } else {
                return "Email entered is not registered";
            }
        });
    }

    function resetPassword(user) {
        return SQLiteService.update('update psusers set password = ? where userName = ? and password = ?', [user.newPassword, user.userName, user.oldPassword])
            .then(function(res) {
                console.log(res);
                if (res.rowsAffected > 0) {
                    return "Password changed Successfully";
                } 
                else if(res.rowsAffected == 0){
                    return "Old password entered is wrong";
                }else {
                    return "Password change failed";
                }
            });

    }

});
