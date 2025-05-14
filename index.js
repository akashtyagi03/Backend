const express = require("express")
const app = express()


function usermiddleware(req, res, next){
    const username = req.headers.username;
    const password = req.headers.password;
    if (username != "akash" || password!="pass"){
        res.status(411).json({
            msg:"you given us wrong input"
        })
        return;
    }else{
        next();
    }
}
function kidneymiddleware(req, res, next){
    const kidneyid = req.query.kidneyid;
    const kidneylength = kidneyid.length;

    res.send("you have " + kidneylength + " kidney");
    // if (kidneyid!=1 && kidneyid!=2){
    //     res.status(400).json({
    //         msg: "you give wrong id"
    //     })
    //     return;
    // }else{
    //     next();
    // }
}
app.use(usermiddleware)


app.get("/health-checkup", kidneymiddleware, (req, res)=>{
    
    res.json({ message: "your kidney is fine!" })
})

app.use(function(err, req, res, next){
    res.json({
        msg: "here some issue with our server"
    })
})

app.listen(3000)