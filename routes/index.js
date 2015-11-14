var express = require('express');
var router = express.Router();

var ejs = require("ejs");
var mysql = require('./mysql');


function home(req,res){
	res.render('index', { title: 'Todo App' });

}
function save(req,res){
	var title = req.param('title');
	var taskDetails=req.param('taskDetails');
	var notes=req.param('notes');
	var date=req.param('date');
	title=title.trim();
	taskDetails=taskDetails.trim();
	notes=notes.trim();
	var params=[req.session.userid,title,taskDetails,notes,date];
	var qry = "insert into tasks (user_id,title,taskdetails,notes) values (?,?,?,?)";
	mysql.execQuery(qry,params, function(err,results){
		if(err){
			res.send({'status':'fail'});
		}
		else{
			var sqry = "select title from tasks where user_id = ?";
			var params = [req.session.userid];
			mysql.fetchData(sqry,params,function(err,results){
				res.send({"status":"success",results:results});	
			});
			
		}
	});



	
}

function register(req,res){
	var email=req.param('email');
	email=email.trim();
	console.log(email);
	var sqry = "select * from users where email = ?";
	var params = [email];
	mysql.fetchData(sqry,params,function(err,results){
		if(err){
			res.send({'status':'fail','msg':'error while fecthing data'});
			console.log("error while fecthing data");
		}
		else{
			if(results.length>0){
				res.send({'status':'fail','msg':'Email Id already exists'});
				console.log('Email Id already exists');
			}
			else{
				var qry = "insert into users (email,password) values (?,?)";
				var password=req.param('password');
				console.log(password);
				var params=[email,password];
				mysql.execQuery(qry,params, function(err,results){
					if(err){
						
						console.log("error singing up");
						var msg = "error singing up:     " + err;
						res.send({'status':'fail','msg':msg});
						throw err;
					}
					else{
						res.send({'status':'success'});
					}
			}); 
		}
}
});
}

function login(req,res){
	var getUser="select * from users where email=? and password= ?";
	//console.log(req);
	var email = req.param('email');
	var password = req.param('password');
	console.log("email :" + email);
	email = email.trim();
	var params = [email,password];
	console.log("Query is:"+getUser);
	
	mysql.fetchData(getUser,params,function(err,results){
		if(err){
			var msg = "Error occured while logging in " + err;
			res.send({"status":"fail" , 'msg': msg});
			console.log(err);
			throw err;
		}
		else 
		{
			if(results.length > 0){
				console.log("valid Login");
				console.log(results);
				//res.redirect('/successSignIn');
				req.session.userid = results[0].user_id;
				console.log("User id : " +req.session.userid );
				var sqry = "select task_id,title from tasks where user_id = ?";
				var params = [req.session.userid];
				mysql.fetchData(sqry,params,function(err,results){
					res.send({"status":"success",email:email,results:results});	
				});
				
			}
			else {    
				
				console.log("Invalid Login");
				res.send({"status":"fail",'msg':'Invalid password or  emailid, please verify and try again'});
			}
		}  
	});


}

function logout(req,res){
	req.session.userid =undefined;
	res.send({"status":"success"});


}
router.get('/',home);
router.post('/save',save);
router.post('/register',register);
router.post('/login',login);
router.post('/logout',logout); 


module.exports = router;
