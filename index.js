const express = require("express")
const {z} = require("zod")
const app = express()

const schema = z.string().email();
app.use(express.json());


app.post("/health-checkup",(req, res)=>{
    const kidney = req.body.kidney;
    const response = schema.safeParse(kidney)
    if (!response.success){
        res.status(400).json({
            msg:"wrong input"
        })
    }
    res.send({ response})
});

app.listen(3000)