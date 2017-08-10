loggedIn.use(function(req,res,next){
	const token = req.body.token || req.headers['token'];
	
	if(token){
		jwt.verify(token, process.env.SECTRET_KEY, function(err, decode){
			if(err){
				res.status(500).send("Invalid Token")
			}else{
				next();
			}
		})
		res.send('OK')
	}
})