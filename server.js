//DEPENDENCIES/PACKAGES
const express = require('express');
const pokemon = require('./models/pokemon')
const methodOverride = require("method-override")
//PORT
const port = 3000;
//INIT EXPRESS
const app = express()
//MIDWARE
//allows access to req.body
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
//allow access to public folder w express static
app.use(methodOverride("_method"))
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
        pokedex: pokemon
    });
})
//NEW
app.get("/pokemon/new",(req,res)=>{
    res.render("new.ejs",{
        pokedex: pokemon
    })
})
//D
app.delete("/pokemon/:id",(req,res)=>{
    pokemon.splice(req.params.id, 1)
    res.redirect("/pokemon")
})
//UPDATE
app.put("/pokemon/:id", (req, res) => {
    let type = req.body.type;  
    let typeArr = type.split(', ') 
    let statsObject = {
        hp: req.body.hp,
        attack: req.body.attack,
        defense: req.body.defense,
    };

    let newPokemon = {
        id: req.body.id,
        name: req.body.name,
        img: req.body.img,
        type: typeArr,
        stats: statsObject

    };
    pokemon[req.params.id] = newPokemon 
    res.redirect("/pokemon")}) 
//CREATE NEW
app.post("/pokemon", (req, res) => {
    let type = req.body.type;  
    let typeArr = type.split(', ') 
    let statsObject = {
        hp: req.body.hp,
        attack: req.body.attack,
        defense: req.body.defense,
    };

    let newPokemon = {
        id: req.body.id,
        name: req.body.name,
        img: req.body.img,
        type: typeArr,
        stats: statsObject

    };
    pokemon.push(newPokemon) 
    res.redirect("/pokemon") 
})
//E
app.get("/pokemon/:id/edit", (req,res)=>{
    res.render("edit.ejs",{
        pokemon: pokemon[req.params.id],
        pokemonId: req.params.id
    })
})
//SHOW 
app.get("/pokemon/:id",(req,res)=>{
    res.render('show.ejs',{
        pokemonId: pokemon[req.params.id]
    });
});
//LISTEN
app.listen(port, ()=>{
    console.log("listening to pokedex app")
})