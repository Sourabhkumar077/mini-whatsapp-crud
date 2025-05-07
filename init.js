const mongoose = require("mongoose");
const chat = require("./models/chat.js");

main().then(() => console.log("Connected to MongoDB sucessfully!"));
main().catch((err) => console.log("Could not connect to MongoDB", err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsup");
}
let allChats = [
    {
        from: "Aman",
        to: "Riya",
        msg: "Hi!",
        created_at: new Date("2025-04-20T09:30:00"),
    },
    {
        from: "Riya",
        to: "Aman",
        msg: "Hello!",
        created_at: new Date("2025-04-20T09:31:00"),
    },
    {
        from: "Sourabh",
        to: "Mehak",
        msg: "Where are you?",
        created_at: new Date("2025-04-21T14:10:00"),
    },
    {
        from: "Mehak",
        to: "Sourabh",
        msg: "In class.",
        created_at: new Date("2025-04-21T14:11:00"),
    },
    {
        from: "Neha",
        to: "Aman",
        msg: "Lunch?",
        created_at: new Date("2025-04-21T13:00:00"),
    },
    {
        from: "Aman",
        to: "Neha",
        msg: "Yes!",
        created_at: new Date("2025-04-21T13:01:00"),
    },
];

chat
    .insertMany(allChats)
    .then((res) => {
        console.log("All chats saved successfully!");
    })
    .catch((err) => {
        console.log("Error saving chats:", err);
    });
