const fs = require("fs").promises;
const path = require("path");
const dbPath = path.join(__dirname, "database", "database.json");

async function readItems(
  id = null,
  { type = null, status = null, place = null } = {},
) {
  const data = await fs.readFile(dbPath, "utf8");
  const storedItems = JSON.parse(data);
  const items = Array.isArray(storedItems) ? storedItems : [storedItems];
  if (id) {
    return items.filter((item) => String(item.id) === String(id));
  }
  let finalData = items;
  if (type) {
    finalData = finalData.filter((item) => item.type === type);
  }
  if (status) {
    finalData = finalData.filter((item) => item.status === status);
  }
  if (place) {
    finalData = finalData.filter((item) =>
      item.place.toLowerCase().includes(place.toLowerCase()),
    );
  }
  return finalData;
}

module.exports = readItems;
