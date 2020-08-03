const express = require("express");
const shortid = require("shortid");
const server = express();

server.use(express.json());

let hubs = [
  {
    id: shortid.generate(),
    name: "Jane Doe",
    bio: "Not Tarzan's Wife, another Jane"
  },
  {
    id: shortid.generate(),
    name: "Travis Gent",
    bio: "Also not Tarzan's Wife. His name is Travis."
  },
  {
    id: shortid.generate(),
    name: "Fakewomen Bobson",
    bio: "Might be Tarzan's wife, if her name was actually Jane, not Fakewomen."
  }
];

server.get(`/`, (req, res) => {
  res.send("<h1>Hello Travo!</h1>")
})

server.get("/api/users", (req, res) => {
  res.json(hubs)
})

server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;

  const specificUser = hubs.find(h => h.id === id);
  res.json(specificUser);
})

server.post("/api/users", (req, res) => {
  const newUser = req.body;
  newUser.id = shortid.generate();
  
  if (newUser.name === null || newUser.bio === null) {
    res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
  } else {
    hubs.push(newUser);
    res.json(newUser);
  }
})

server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const deleted = hubs.find(h => h.id === id);

  hubs = hubs.filter(h => h.id !== id);

  res.json(deleted);
})

server.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  let found = hubs.find(h => h.id === id);;

  const index = hubs.findIndex(h => h.id === id);

  if (found) {
    // found it
    Object.assign(found, changes);
  } else {
    res.status(404).json({ message: "user not found" });
  }

  res.json(found);
})

const PORT = 8000;
server.listen(PORT, () => console.log(`Server is Running on port http://localhost:${PORT}`));