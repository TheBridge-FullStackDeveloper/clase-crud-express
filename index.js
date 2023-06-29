const express = require("express");
const app = express();

const members = [
  {
    id: 1,
    name: "John Doe",
    email: "john@gmail.com",
    status: "active",
  },
  {
    id: 2,
    name: "Bob Williams",
    email: "bob@gmail.com",
    status: "inactive",
  },
  {
    id: 3,
    name: "Shannon Jackson",
    email: "shannon@gmail.com",
    status: "active",
  },
];

app.use(express.json()); //parsea el body, sino el req.body llega undefined

app.get("/", (req, res) => {
  res.send(members);
});

app.get("/id/:id", (req, res) => {
  const found = members.some((member) => member.id == req.params.id);
  if (found) {
    res.send(members.filter((member) => member.id == req.params.id));
  } else {
    res.send(`Member with id ${req.params.id} not found`);
  }
});

app.post("/", (req, res) => {
  const newMember = {
    id: members.length + 1,
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };
  members.push(newMember);
  res.send({ msg: "Member successfully created", newMember, members });
});

app.put("/id/:id", (req, res) => {
  members.forEach((member) => {
    if (member.id == req.params.id) {
      member.name = req.body.name;
      member.email = req.body.email;
    }
  });
  res.send({ msg: `Member with id ${req.params.id} updated`, members });
});

app.delete("/id/:id", (req, res) => {
  console.log(typeof +req.params.id); // el + me convierte una string en number
  const found = members.some((member) => member.id == req.params.id);
  if (found) {
    const membersFiltered = members.filter(
      (member) => member.id !== +req.params.id
    );
    res.send(membersFiltered);
  } else {
    res.send(`Member with id ${req.params.id} not found`);
  }
});

app.listen(8080, () => console.log("Servidor levantado en el puerto 8080"));
  

