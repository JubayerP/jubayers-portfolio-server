const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const dotenv = require("dotenv");
dotenv.config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// middlewares
app.use(express.json());
app.use(cors());




const uri = process.env.URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const demoProject = client.db("portfolio").collection("projects");


        // find the projects
        app.get("/projects", async (req, res) => {
            try {
                const result = await demoProject.find({}).toArray();
                res.status(200).json({
                    status: "Success",
                    data: result
                })
            }
            catch (err) {

                if (err) {
                    res.status(400).json({ messgae: err.message })
                }
            }
        })


        // get specefic project using _id
        app.get("/projects/:id", async (req, res) => {
            try {
                const project = await demoProject.findOne({ _id: new ObjectId(req.params.id) });
                res.status(200).json({
                    status: "Success",
                    data: project
                })
            } catch (error) {
                if (error) {
                    res.status(400).json({
                        status: "failed",
                        message: error.message
                    })
                }
            }
        })

    } catch (err) {
        console.log(err);
    }
}
run().catch(console.dir)



app.get("/", (req, res) => {
    res.status(200).json({
        status: "Success",
        message: "portfolio is serving to you! mate!"
    })
})

// listen to port
app.listen(port, () => {
    console.log(`app is listening on port ${port}`)
})