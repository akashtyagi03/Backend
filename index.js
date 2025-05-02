const express = require("express")
const app = express();

const user = [{
    name: "john",
    kidney: [{ healthy: true},
        {healthy: false}]
}]

app.use(express.json())

// Get - user can check how many kidney they have and their healthy.
// post - user can add a new kidney.
// put - user can replace a kidney, make it healthy. 
// delete - user can remove a kidney.

app.get("/", (req, res)=>{
    const kidneystatus = user[0].kidney;
    const kidneylength = kidneystatus.length;
    let noofhealthykidney = 0 
    for (let i = 0; i < kidneylength; i++) {
        if (kidneystatus[i].healthy === true){
            noofhealthykidney = noofhealthykidney + 1
        }
    }
    const noofunhealthy = kidneylength - noofhealthykidney
    res.json({
        kidneylength,
        noofhealthykidney,
        noofunhealthy,
        kidneystatus
    });
})

app.post("/", (req, res)=>{
    const ishealthy = req.body.ishealthy;
    user[0].kidney.push({
        healthy: ishealthy
    })
    res.json({
        msg: "done!"
    })
})

app.put("/", (req, res)=>{
    if (isanyunhealthykidney){
        for (let i = 0; i < user[0].kidney.length; i++){
            user[0].kidney[i].healthy = true;
        }
        res.json({
            msg : "all kidney updated to true"
        })
    }
    else{
        res.status(411).json({
            msg: "you have all healthy kidney. so you do'nt update!"
        })
    }
})

app.delete("/", (req, res)=>{
    if (isanyunhealthykidney){
        const newkidney = []
        for (let i = 0; i < user[0].kidney.length; i++){
            if (user[0].kidney[i].healthy === true){
                newkidney.push({
                    healthy: true
                })
            }
        }
        user[0].kidney = newkidney
        res.json({
            msg : "sucessfully deleted unhealthy kidney"
        })
    }
    else{
        res.status(411).json({
            msg: "you have no bad kidneys"
        })
    }
})

// what should happen if they try to delete when there are no kidneys?

function isanyunhealthykidney(){
    const atleastoneunhealthykidney = false
    for (let i = 0; i < user[0].kidney.length; i++){
        if (!user[0].kidney[i].healthy){
            atleastoneunhealthykidney = true
        }
    }
    return atleastoneunhealthykidney
}

app.listen(3001);