        var myAppModule = angular.module('myApp', ['ngRoute']);

        myAppModule.config(function ($routeProvider) {
          $routeProvider
            .when('/',{
                templateUrl: 'partials/main.html'
            })
            .when('/users',{
                templateUrl: 'partials/users.html'
            })
            .when('/discussions',{
                templateUrl: 'partials/discussions.html'
            })
            .when('/view_user/:id',{
                templateUrl: 'partials/user.html'
            })            
            .when('/view_discussion/:id',{
                templateUrl: 'partials/discussion.html'
            })            
            .otherwise({
              redirectTo: '/'
            });
        });

        var current_user;

        myAppModule.factory('nameFactory', function ($http){
            var names = [];
            var factory = {};

            factory.getNames = function(callback) {
                $http.get('/users').success(function(output) {
                    names = output;
                    callback(names);
                })
            }

            factory.getOneName = function(current_id, callback) {
                $http.get('/view_user/'+current_id).success(function(output) {
                    names = output;
                    callback(names);
                })
            }

            factory.addName = function (info, callback){
                var data = {name: info.name, date: Date.now()};
                current_user = info.name;
                $http.post('/add_name', data).success(function(output) {
                })
            }

            factory.checkName = function(newNameName) {
                for (var i = 0; i < names.length; i++) {
                    if (names[i].name == newNameName) {
                        return true;
                    }
                }
                return false;
            }
            return factory;
        });

        myAppModule.controller('namesController', function ($scope,  $routeParams, nameFactory){
            $scope.names = [];
            $scope.user = '';

            nameFactory.getNames(function (data){
                $scope.names = data;
            })

            var current_name_id = $routeParams.id;

            nameFactory.getOneName(current_name_id, function (data){
                $scope.names = data;
            })

            $scope.addName = function(data) {
                if(!nameFactory.checkName($scope.newName.name)) {
                    $('.error').addClass('hide');
                    $scope.user = $scope.newName.name;
                    console.log($scope.user)
                    nameFactory.addName($scope.newName);                    
                } else if($scope.newName.name == null) {
                    $('.blank').removeClass('hide');
                }
                else {
                    $('.error').removeClass('hide');
                }
            }
        })

        myAppModule.factory('discussionFactory', function ($http){
            var discussions = [];
            var factory = {};
            var user;

            factory.getDiscussions = function(callback) {
                $http.get('/discussions').success(function(output) {
                    
                    discussions = output;
                    callback(discussions);
                })
            }

            factory.getOneDiscussion = function(current_id, callback) {
                $http.get('/view_discussion/'+current_id).success(function(output) {
                    discussion = output;
                    callback(discussion);
                })
            }

            factory.addDiscussion = function(info, callback) {
                var data = {discussion_topic: info.discussion_topic, discussion_description: info.discussion_description, discussion_category: info.discussion_category, discussion_created_at: Date.now()};
                console.log(data)
                $http.post('/add_discussion', data).success(function(output) {
                    data = output;
                    callback(data);
                    console.log('Discussion received!')
                })
            }

            factory.removeDiscussion = function(discussionName){
                for (var i = 0; i < discussions.length; i++) {
                    if (discussions[i].name == discussionName) {
                        discussions.splice(i, i+1);
                    }
                }
            }

            factory.checkDiscussion = function(newDiscussionName) {
                for (var i = 0; i < discussions.length; i++) {
                    if (discussions[i].name == newDiscussionName) {
                        return true;
                    }
                }
                return false;
            }
            return factory;
        });

        myAppModule.controller('discussionsController', function ($scope, $routeParams, discussionFactory){
            $scope.discussions = [];
            $scope.user;

            discussionFactory.getDiscussions(function (data){
                $scope.discussions = data;
                $scope.user = current_user;
            })

            $scope.addDiscussion = function() {
                    discussionFactory.addDiscussion($scope.newDiscussion, function() {
                        discussionFactory.getDiscussions(function (data){
                            $scope.discussions = data;
                        });
                        $scope.discussions = {};
                    });

            }

            var current_discussion_id = $routeParams.id;

            discussionFactory.getOneDiscussion(current_discussion_id, function (data){
                $scope.discussions = data;
            })

            $scope.removeDiscussion = function(discussionName) {
                discussionFactory.removeDiscussion(discussionName);
            }
        })


        console.log(current_user)
        // myAppModule.factory('productFactory', function ($http){
        //     var products = [];
        //     var factory = {};

        //     factory.getProducts = function(callback) {
        //         $http.get('/products').success(function(output) {
        //             products = output;
        //             callback(products);
        //         })
        //     }

        //     factory.addProduct = function(info) {
        //         var data = {product_name: info.product_name, product_img_url: info.product_img_url, product_description: info.product_description, product_price: info.product_price, product_quantity: info.product_quantity, product_date: Date.now()};
        //         console.log(data)
        //         $http.post('/add_product', data).success(function(output) {
        //             console.log('Product added!')
        //         })
        //     }

        //     factory.removeProduct = function(ProductName){
        //         for (var i = 0; i < products.length; i++) {
        //             if (products[i].name == ProductName) {
        //                 products.splice(i, i+1);
        //             }
        //         }
        //     }

        //     factory.checkProduct = function(newProductName) {
        //         for (var i = 0; i < products.length; i++) {
        //             if (products[i].name == newProductName) {
        //                 return true;
        //             }
        //         }
        //         return false;
        //     }
        //     return factory
        // });

        // myAppModule.controller('productsController', function ($scope, productFactory){
        //     $scope.products = [];

        //     productFactory.getProducts(function (data){
        //         $scope.products = data;
        //     })

        //     $scope.addProduct = function() {
        //         productFactory.addProduct($scope.newProduct);
        //     }

        //     $scope.removeProduct = function(productName) {
        //         productFactory.removeProduct(productName);
        //     }
        // })

        // myAppModule.controller('productsMainController', function ($scope, productFactory){
        //     $scope.filteredProducts = [];
        //     $scope.products = [];    
        //     $scope.currentPage = 1;
        //     $scope.numPerPage = 5;
        //     $scope.maxSize = 10;                
            

        //     $scope.$watch('currentPage + numPerPage', function() {
        //         var begin = (($scope.currentPage - 1) * $scope.numPerPage), end = begin + $scope.numPerPage;
                
        //         $scope.filteredProducts = $scope.products.slice(begin, end);


        //         console.log('Filtered Products: '+$scope.filteredProducts);
        //         console.log('Products: '+$scope.products);
        //         console.log('Total Products: '+$scope.products.length);
        //         console.log('Filtered Begin: '+begin+", Filtered End: "+end);
        //     });

        //     productFactory.getProducts(function (data){
        //         $scope.products = data;
        //     })
        // })

