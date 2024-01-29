const express = require('express')
const facts = require('./facts.json');
const app = express()

const PORT = process.env.PORT || "3000"

app.set('view engine', 'ejs')

app.listen(PORT, ()=> {
    console.log( `App is running on http://localhost:${PORT}...`)
})

app.get("/", (req, res) => {

    res.send("Good Job!")

})

// http://localhost:3000/greet?name=kaylee&dob=2002
app.get('/greet', (req, res)=> {
    console.log(req.query)
    res.send(`Hello, ${req.query.name}! \n You are, ${2024 - req.query.year - 1} or ${2024 - req.query.year} years old.`)
})

app.get('/math/:num1/:op/:num2', (req, res)=> {
    console.log( req.params )
    let result = 0;
    const num1 = parseInt(req.params.num1);
    const num2 = parseInt(req.params.num2);
    switch(req.params.op){
        case 'plus':
            result = num1 + num2;
            break;
        case 'minus':
            result = num1 - num2;
            break;
        case 'times':
            result = num1 * num2;
            break;
        case 'dividedby':
            result = num1 / num2;
            break;
        case 'tothepowerof':
            result = Math.pow(num1, num2);
            break;
    }

    res.send(`${result}`);
})

app.get('/pandorasbox', (req, res)=> {

    // do the work
    //const message = "DAD JOKE"

    const factListLength = facts.length;

    const fact4 = facts[Math.floor((Math.random() * factListLength))].fact;

    res.render('pandorasbox', {title: "Pandora's Box", message: fact4} )

})