var express = require('express');
var router = express.Router();
const db = require("../db");

router.get('/newuser', (req, res, next) => {
	res.render('new', { title: 'Novo Cadastro', result: {"name":"", "age":""}, action: '/new' });
});

router.post('/new', async (req, res, next) => {
	const name = req.body.name;
	const age = parseInt(req.body.age);

	try{
	   const result = await db.insert({ name, age});
	   console.log(result);
	   res.redirect('/');
	}catch(err){
	   next(err);
	}
});

router.get('/userlist', async(req, res, next) => {
    try{		
  	const result = await db.findAll();
	res.render('index', {title: 'Lista de Clientes', result});
     }catch(err){
	next(err);
     }	
});

router.post("/delete", async (req, res) => {
	const id= req.body.id;
	const result = await db.remove(id);
	res.json(result);
});

router.get('/edit/:id', async (req, res, next) => {
	const id = req.params.id;
	
	try{
	    const result = await db.findOne(id);
	    res.render('new', { title: 'Edição de Cliente', result, action: '/edit/' + result._id });
	}catch(err){
	   next(err);
	}
});

router.post('/edit/:id', async (req, res) => {
	const id = req.params.id;
	const name = req.body.name;
	const age = parseInt(req.body.age);

	try{
		const result = await db.update(id, { name, age });
		console.log(result);
		res.redirect('/userlist');
	}catch(err){
		next(err);
	}
});

module.exports = router;


