var express = require('express');
var router = express.Router();
const db = require("../db");

/*GET home page. */
router.get('/', (req, res, next) => {
	res.render('new', { title: 'Novo Cadastro'});
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

router.post("/edit", async (req, res) => {
	const id = req.body.id;
	const name = req.body.name;
	const result = await db.update(id, name);
	console.log(result);
	res.json(result);

});
module.exports = router;


