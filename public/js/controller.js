var app=angular.module('todoAPP',[]);
app.controller('todoController',function($scope,$http,$location){
	$scope.hide=true;
	$scope.loginHide=true;
	$scope.popupContainer=true;
	$scope.save=function(){
		//alert("clicked");
		//alert($scope.title);
		$http({
			method:'POST',
			url:'/save',
			data: { "title": $scope.title, "taskDetails": $scope.taskDetails,"notes":$scope.notes,"date":$scope.date}
		}).success(function (data){
			alert(JSON.stringify(data));
			if(data.status=="success"){
				//window.location='/';
				//$scope.title1=data.title;
				$scope.results=data.results;
				alert("Task is Successfully added");
			}
			else{
				alert("Error while saving data");
			}

		}).error(function (error){
			alert("This error "+error+" occured when saving the data");

		});
		$scope.hide=true;

	};
	$scope.addTask=function(){
		$scope.hide=false;	
	}

	$scope.register=function(){
		//alert("clicked");
		//alert($scope.email);
		//alert($scope.password);
		$http({
			method:'POST',
			url:'/register',
			data: { "email": $scope.email, "password": $scope.password}
		}).success(function (data){
			//alert(JSON.stringify(data));
			if(data.status=="success"){
				//window.location='/';
				//$scope.title1=data.title;
				document.getElementById("singupform").reset();
	    	    alert('succesfully registered please login');
	    	    window.location='/';
			}
			else{
				alert("Error while saving data");
			}

		}).error(function (error){
			alert("This error "+error+" occured when saving the data");

		});

	}

	$scope.login=function(){
		//alert("clicked");
		//alert($scope.email);
		//alert($scope.password);
		$http({
			method:'POST',
			url:'/login',
			data: {"email": $scope.email, "password": $scope.password}
		}).success(function (data){
			//alert(JSON.stringify(data));
			if(data.status=="success"){
				//window.location='/';
				//$scope.title1=data.title;
				$scope.userEmail=data.email;
				$scope.results=data.results;
				alert("email from server is "+$scope.userEmail);
				
				document.getElementById("login").reset();
	    	    //alert('succesfully registered please login');
	    	    $scope.loginHide=false;
	    	    document.getElementById("modal").style.display = "none";
	    	    //window.location='/';
			}
			else{
				alert("Error while saving data");
			}

		}).error(function (error){
			alert("This error "+error+" occured when saving the data");

		});

	}

	$scope.showLogin=function(){
		$scope.popupContainer=false;


	}

	$scope.logout=function(){
		$http({
			method:'POST',
			url:'/logout',
			data: {}
		}).success(function (data){
			if(data.status=="success"){
				$scope.loginHide=true;
				$scope.results=undefined;
				alert("Successfully logout from account");


			}
			else{
				alert("Error while saving data");
			}

		}).error(function (error){
			alert("This error "+error+" occured when saving the data");

		});		
	}
	$scope.showTask=function(id){
		alert("clicked show task");
		//var id=document.getElementById('tasks').value;
		alert(id);
	};
	

});