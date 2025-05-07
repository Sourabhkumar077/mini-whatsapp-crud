const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

const chat = require("./models/chat.js");
const methodOverride = require("method-override");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

main().then(() =>
  console.log("Connected to MongoDB successfully!")
);
main().catch((err) =>
  console.log("Could not connect to MongoDB", err)
);

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsup");
}

// index route for showing all chats
app.get("/chats", async (req, res) => {
  const chats = await chat.find({});
  res.render("index", { chats });
});

// basic first route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// create new chat route 
app.get("/chats/new", (req, res) => {
  res.render("new");
});

app.post("/chats", async (req, res) => {
  let { from, to, msg } = req.body;
  let newChat = new chat({
    from: from,
    to: to,
    msg: msg,
    created_at: new Date()
  })

  newChat.save()
    .then((res) => { console.log(res) })
    .catch((err) => {
      console.log("Error occured: ", err);
    })
  res.redirect("/chats");
});
// edit message route 
app.get("/chats/:id/edit", async (req, res) => {
  const { id } = req.params;
  let chatData = await chat.findById(id);
  res.render("edit", { chatData });
})

// update route
app.put("/chats/:id", async (req, res) => {
  const { id } = req.params;
  let {msg : newMsg } = req.body;
  let updatedChat = await chat.findByIdAndUpdate(id, { msg: newMsg },{runValidators: true}, {new: true});
  console.log(updatedChat);
  
  res.redirect("/chats");
})

// destroy route

app.delete("/chats/:id", async (req, res) => {
  const { id } = req.params;
  await chat.findByIdAndDelete(id);
  res.redirect("/chats");
})  

let port = 3000;
app.listen(port, () => {
  console.log(`Server is running http://localhost:${port}`);
});
