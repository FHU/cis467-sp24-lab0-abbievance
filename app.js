const express = require('express')
const facts = require('./facts.json');
const app = express()

const PORT = process.env.PORT || "3000"

app.set('view engine', 'ejs')

app.listen(PORT, ()=> {
    console.log( `App is running on http://localhost:${PORT}...`)
})

app.use(express.static('public'));

app.get("/", (req, res) => {

    res.render('index', {title: "Home"} )

})

app.get('/greet', (req, res)=> {
    const name = req.query.name;
    const age1 = 2024 - req.query.year - 1;
    const age2 = 2024 - req.query.year;
    res.render('greet', {title: "Greet", name, age1, age2} )
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

    res.render('math', {title: "Math", result} )
})

app.get('/pandorasbox', (req, res)=> {

    let random = Math.random();

    let joke = {}

    if(random < 0.3){
        fetch('https://icanhazdadjoke.com/', {
            headers: {
                "Accept" : "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                joke = data.joke
                res.render('pandorasbox', {title: "Pandora's Box", message: `joke: ${joke}`, img: "#"} )});
    }
    else if (random >= 0.3 && random < 0.6){
        fetch('https://picsum.photos/v2/list?page=2&limit=100', {

        })
            .then(res => res.json())
            .then(data => {
                res.render('pandorasbox', {title: "Pandora's Box", message: `picture (it might take a while to load)`, img: data[Math.floor((Math.random() * data.length))].download_url} )});
    }
    else{
        const factListLength = facts.length;
        const fact = facts[Math.floor((Math.random() * factListLength))].fact;
        res.render('pandorasbox', {title: "Pandora's Box", message: `fact: ${fact}`, img: "#"} )
    }


})
