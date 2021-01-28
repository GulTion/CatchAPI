const express = require("express")
const bodyParser = require('body-parser')
const cookieParser =  require('cookie-parser')

const path = require("path")
const app = express()
const m = require("./module")


app.use(express.static(path.join(__dirname,'frontend', 'build')))
app.use(bodyParser())
app.use(cookieParser())

app.get("/", (req, res)=>{
  res.sendFile(path.join(__dirname,'frontend', 'build', 'index.html'))
})


app.post("/",(req, res)=>{
  res.json(req.body)
})

app.post('/api/user/signup', m.UserSignup);
app.post('/api/user/signin', m.UserSignin);


//https://www.npmjs.com/package/crypto-js
const json = {
  type:"error",
  sysinfo:"",
  argv:"",
  error:"",
  "53cret":"eyakjioasdkloiklsnvol"

}

//http://gultion.me/GOS/
app.listen(3000,()=>{
  console.log("Server is starting...");
})



//-----Backend
// auth
// aes-256
// sqlite
// https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.atlassian.com%2Fsoftware%2Fjira&psig=AOvVaw3Dnj-b77kGLvgNxifIJgmQ&ust=1611895178980000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIic9tPnve4CFQAAAAAdAAAAABAD

//
//----FrontEnd
//Group 5.png
//THE END
