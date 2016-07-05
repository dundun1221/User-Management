/**
 * Created by JieMa on 6/25/16.
 */
var app = angular.module("myApp", ['ngRoute']);

app.factory('userFactory',function(){
    var Users = [
        {id:1, fName:'Hege',  lName:"Pege" ,  gender:"F", age:'18', number:'315-438-6789', eMail:'hpage@usermanagement.com'},
        {id:2, fName:'Kim',   lName:"Pim" ,   gender:'M', age:'19', number:'529-450-5798', eMail:'kpim@usermanagement.com'},
        {id:3, fName:'Sal',   lName:"Smith" , gender:'M', age:'20', number:'410-587-2983', eMail:'ssmith@usermanagement.com'},
        {id:4, fName:'Hack',  lName:"Jones",  gender:'M', age:'21', number:'476-423-4363', eMail:'hjones@usermanagement.com'},
        {id:5, fName:'John',  lName:"Doe" ,   gender:'M', age:'22', number:'320-424-6455', eMail:'jDoe@usermanagement.com'},
        {id:6, fName:'Peter', lName:"Pan" ,   gender:'M', age:'23', number:'382-534-5577', eMail:'ppan@usermanagement.com'}
    ];

    return{

        getUser: function(){
            return Users;
        },
        deleteUser: function(user){
            var index = Users.indexOf(user);
            Users.splice(index,1);
        },
        newUser:function(user){
            if (Users.length > 0){
                user.id = Users[Users.length - 1].id + 1 ;
            }
            else{
                user.id = 1;
            }

            Users.push(user);
        },
        editUser:function(user){
            for (var i=0;i<Users.length;i++){
                if(Users[i].id == user.id){
                    Users[i]= user;
                };
            };
        }

    };

});




app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "table.html",
            controller : "tableCtrl"
        })
        .when("/new", {
            templateUrl : "newUser.html",
            controller : "newCtrl"
        })
        .when("/editUser/:id", {
            templateUrl: "editUser.html",
            controller: "editCtrl"
        })

});

app.controller('tableCtrl',function($scope, userFactory , $location){

    $scope.users = userFactory.getUser();
    $scope.goToEdit = function(user){
        $location.path('/editUser/' + user.id);
    };
    $scope.deleteUser = function(user){
        userFactory.deleteUser(user);
        $location.path('/');
    };

});
app.controller('newCtrl',function($scope,userFactory,$location){
    $scope.users =userFactory.getUser();
    $scope.newUser = function(user){
        userFactory.newUser(user);
        $location.path('/');
    };
});
app.controller('editCtrl',function($scope, userFactory, $routeParams, $location){
    $scope.uid = $routeParams.id;
    $scope.users = userFactory.getUser();
    for (var i=0;i<$scope.users.length;i++){
        if($scope.users[i].id == $scope.uid){
         $scope.user = $scope.users[i];
        };
    };
    $scope.goToList = function(){
        userFactory.editUser($scope.user);
        $location.path('/');
    };
});

