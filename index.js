// // what should happen if they try to delete when there are no kidneys?
// // Get - user can check how many kidney they have and their healthy.
// // post - user can add a new kidney.
// // put - user can replace a kidney, make it healthy. 
// // delete - user can remove a kidney.

const express = require("express");
const app = express();

const user=[{
    name: "akash",
    kidney: [{
        healthy: true
    },{
        healthy: false
    }]
}]

app.use(express.json());

app.get("/", (req, res)=>{
    const akashhealthy = user[0].kidney;
    const noofkidney = akashhealthy.length;

    // we use filter instead of for loop. and this is cleaner
    const healthykidney = akashhealthy.filter(kidney => kidney.healthy)
    let noofhealthykidney = healthykidney.length
    const noofunhealthykidney = noofkidney - noofhealthykidney
    res.json({
        noofkidney,
        noofhealthykidney,
        noofunhealthykidney
    })
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
    user[0].kidney=user[0].kidney.map(healthy => {return{healthy:true}})
    console.log(user[0].kidney)
    res.json({
        msg: "done"
    })
})

app.delete("/", (req, res)=>{
    if (  atleastoneunhealthykidney()){
        user[0].kidney =user[0].kidney.filter(kidney => kidney.healthy)
        res.json({
            msg: "done"
        })
    }else{
        res.status(411).json({
            msg:"you have no bad item"
        });
    }
})

function atleastoneunhealthykidney(){
    let atleastONEunhealthykidney=false
    for (let i=0; i<user[0].kidney.length; i++){
        if (!user[0].kidney[i].healthy){
            atleastONEunhealthykidney=true;
        }
    }
    return atleastONEunhealthykidney
}

app.listen(3000);