//DEPENDENCIES/PACKAGES
const express = require('express');
const pokemon = require('./models/pokemon')
const bodyParser = require('body-parser')
//PORT
const port = 3000;
//INIT EXPRESS
const app = express()
//MIDWARE
//allows access to req.body
app.use(express.urlencoded({ extended: false }))
//allow access to public folder w express static
app.use(express.static('public'))
///////////////
//DEFINE ROUTES
///////////////
//MAIN
app.get("/",(req,res)=>{
    res.send("Pokédex!")
})
/////////////////////
//I N D U C E S
/////////////////////

//I
app.get("/pokemon",(req,res)=>{
    res.render("index.ejs",{
        allPokemon: pokemon
    });
})
//NEW
app.get("/pokemon/new",(req,res)=>{
    res.render("new.ejs",{
        newPokemon: pokemon
    })
})
//D
app.delete("/pokemon/:id",(res,req)=>{
    pokemon.splice(req.params.id, 1)
    res.redirect("/pokemon/")
})
//UPDATE
app.put("/pokemon/:id",(req,res)=>{
    let statsObject={
       hp: req.body.hp,
       attack: req.body.attack,
       defense: req.body.defense,
   };
   let type = req.body.type;
   let typeArr = type.splice(', ')
   let newPokemon ={
       id: req.body.id,
       name: req.body.name,
       img: req.body.img,
       type: typeArr,
       stats: statsObject
   }
   pokemon.push(newPokemon)//push the new pokemon onto original index
   res.redirect("/pokemon/")
})

//CREATE NEW
app.post("/pokemon/",(req,res)=>{
     let statsObject={
        hp: req.body.hp,
        attack: req.body.attack,
        defense: req.body.defense,
    };
    let type = req.body.type;
    let typeArr = type.splice(', ')
    let newPokemon ={
        id: req.body.id,
        name: req.body.name,
        img: req.body.img,
        type: typeArr,
        stats: statsObject
    }
    pokemon.push(newPokemon)//push the new pokemon onto original index
    res.redirect("/pokemon/")
})
//E
app.get("/pokemon/:id/edit", (req,res)=>{
    res.render("pokemon_edit.ejs",{
        pokemon: pokemon[req.params.id],
        pokeIndex: req.params.id,
    })
})
//SHOW 
app.get("/pokemon/:id",(req,res)=>{
    res.render('show.ejs',{
        pokemonStats: pokemon[req.params.id]
    });
});
//LISTEN
app.listen(port, ()=>{
    console.log("listening to pokedex app")
})