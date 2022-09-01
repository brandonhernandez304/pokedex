//DEPENDENCIES/PACKAGES
const express = require('express');
const pokemon = require('./models/pokemon')

//PORT
const port = 3000;
//INIT EXPRESS
const app = express()
//MIDWARE

//DEFINE ROUTES
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
//N

//D

//U

//C

//E

//SHOW 
app.get("/pokemon/:id",(req,res)=>{
    res.render('show.ejs',{pokemonStats: pokemon[req.params.id]
    });
});
//LISTEN
app.listen(port, ()=>{
    console.log("listening to pokedex app")
})