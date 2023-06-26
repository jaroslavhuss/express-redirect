const express = require('express');
const fs = require('fs');

const app = express();
const port = 5005;

const websites = [
  'http://antikoncepce1.netlify.app',
  'http://antikoncepce2.netlify.app',
  'http://antikoncepce3.netlify.app'
];

let currentWebsiteIndex = 0;
function redirect(req, res) {
    currentWebsiteIndex++;
if(currentWebsiteIndex>2){
    currentWebsiteIndex = 0;
}
let nextWebsite = websites[currentWebsiteIndex]
  res.redirect(nextWebsite);
}

// Middleware pro zaznamenání každé návštěvy do souboru
app.use((req, res, next) => {
    try {
        fs.readFile("visit.txt",{}, (err, data)=>{
            if(data){
                let dataNumber = parseInt(data);
                dataNumber++;
                fs.writeFile("visit.txt", dataNumber.toString(), "utf-8", (err,data)=>{
                        //
                })
            } 
        })
    } catch (error) {
        const possibleError = `${new Date().toISOString()} - ${error.toString()}`
        fs.appendFile("visit.txt", possibleError, "utf-8", (err,data)=>{
            //
    })
    }
    
  next();
});

// Routa pro přesměrování na webovou stránku
app.get('/', redirect);

// Spuštění serveru
app.listen(port, () => {
  console.log(`Server běží na portu ${port}`);
});
