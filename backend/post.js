const fs = require('fs');
const readItems = require("./get.js");
const dbPath = path.join(__dirname, "database", "database.json");

async function addItem(item){
    let items = await readItems();
    items.push(item)
    fs.writeFile(dbPath, items)
}
