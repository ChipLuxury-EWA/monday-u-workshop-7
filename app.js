import express from "express";
import routes from "./router.js";

const app = express();
app.use(express.json());
const port = 8080;

app.use("/", routes);

//DONE 1. create GET /jedi route and handle logic inside of it

//DONE 2. create PUT /jedi/:id route and handle logic of updating jedi that already exists in the list.
//Dont forget to take care of errors (e.g. jedi with id not exists)

//DONE 3. create DELETE /jedi/:id route and handle logic of deleting jedi

app.listen(port, () => {
    console.log("Server started on port", port);
});
