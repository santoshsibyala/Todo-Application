var app=angular.module('todoAPP',[]);
app.controller('todoController',function($scope,$http,$location){
	$scope.hide=true;
	$scope.loginHide=true;
	$scope.addTask=function(){
		$scope.hide=false;
/*		$http({
	    	method: 'POST',
	    	url: '/addTask',
	    	data: { "title": $scope.title, "taskDetails": $scope.taskDetails,"notes":$scope.notes,"remainder":$scope.remainder,"repeat":$scope.repeat,"date":$scope.date}
	    	}).success(function(response){
	    			alert(JSON.stringify(response));
	    			if(response.status == "success")
	    	    		window.location = '/successLogin';
	    			else
	    	    		alert("Oops!", response.msg, "error");
	    	}).error(function(error){
	    	alert("Oops!", error, "error");
	   	});
*/
	};
	$scope.save=function(){
		$scope.hide=true;
	};
	
	$scope.logon=function(){
		$scope.loginHide=false;
	};

});