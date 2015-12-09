var app=angular.module('todoAPP',[]);
app.controller('todoController',function($scope,$http,$location){
	$scope.hide=true;
	$scope.loginHide=true;
	$scope.popupContainer=true;
	$scope.tasks=true;
	$scope.aboutme=true;
	$scope.save=true;
	$scope.save=function(){
		alert("clicked");
		//alert($scope.title);
		$http({
			method:'POST',
			url:'/save',
			data: { "title": $scope.title, "taskDetails": $scope.taskDetails,"notes":$scope.notes}
		}).success(function (data){
			alert(JSON.stringify(data));
			if(data.status=="success"){
				//window.location='/';
				//$scope.title1=data.title;
				$scope.results=data.results;
				document.getElementById('task_title').value='';
				document.getElementById('task_details').value='';
				document.getElementById('task_notes').value='';
				/*var elementStyle = document.getElementsByTagName("body").style;
				alert(elementStyle);
				elementStyle.position = "absolute";*/
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
		//$scope.hide=true;	
		$scope.save=true;
		//document.getElementById("id").style.display = "block";
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
		alert("clicked");
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
				//$scope.tasks=false;
				//document.login.reset();
				$scope.userEmail=data.email;
				$scope.results=data.results;
				//alert("email from server is "+$scope.userEmail);
				
				//alert(document.getElementById("login1").reset());
	    	    alert('succesfully login');
	    	    
	    	    document.getElementById("modal").style.display = "none";
	    	    $scope.loginHide=false;
				$scope.tasks=false;
				$scope.aboutme=false;
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
				$scope.aboutme=true;
				$scope.loginHide=true;
				$scope.results=undefined;
				$scope.hide=true;
				$scope.tasks=true;
				document.getElementById('task_title').value='';
				document.getElementById('task_details').value='';
				document.getElementById('task_notes').value='';
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
		//alert("clicked show task");
		//var id=document.getElementById('tasks').value;
		//alert(id);
		$http({
			method:'POST',
			url:'/showTask/'+id,
			data: {}
		}).success(function (data){
			if(data.status=="success"){
				
				/*$scope.title=data.results.title;
				$scope.taskDetails=data.results.taskdetails;
				$scope.notes=data.results.notes;*/
				$scope.hide=true;
				$scope.save=false;
				document.getElementById('task_title').value=data.results[0].title;
				document.getElementById('task_details').value=data.results[0].taskdetails;
				document.getElementById('task_notes').value=data.results[0].notes;
					
				alert("Successfully showed the task");

			}
			else{
				alert("Error while saving data");
			}

		}).error(function (error){
			alert("This error "+error+" occured when saving the data");

		});		
	};

	$scope.deleteTask=function(id){
		//alert("clicked delete task");
		//alert(id);
		var ok=confirm("Are you sure you want to delete");
		if(ok===true){
		$http({
			method:'POST',
			url:'/deleteTask/'+id,
			data: {}
		}).success(function (data){
			if(data.status=="success"){
				
				$scope.results=data.results;
				$scope.hide=true;
				alert("Successfully deleted the task");

			}
			else{
				alert("Error while saving data");
			}

		}).error(function (error){
			alert("This error "+error+" occured when saving the data");

		});		

	}
};

$scope.loginBefore=function(){
	
};

$scope.cancel=function(){
	document.getElementById('task_title').value='';
	document.getElementById('task_details').value='';
	document.getElementById('task_notes').value='';
	

};
	

});