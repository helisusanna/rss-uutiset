const express = require("express");
const app = express();

const portti = process.env.PORT || 3009;

const uutiset = require("./models/uutiset");

app.use(express.static("./public"));

app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {


    uutiset.haeKaikki((err, tulokset) => {

        let uutiset = [];

        tulokset[0].forEach((tulos) => {

            uutiset.push(tulos);

        });

        function sortFunction(a,b){  
            var dateA = (a.pvm).getTime();
            var dateB = (b.pvm).getTime();
            return dateA < dateB ? 1 : -1;  
        }; 

        uutiset.sort(sortFunction);
        uutiset = uutiset.slice(0, 10);

        if (err) throw err;

        res.render("index", { "uutiset" : uutiset});


    });

});

app.listen(portti, () => {

    console.log(`Palvelin käynnistyi porttiin: ${portti}`);

});