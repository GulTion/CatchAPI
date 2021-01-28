const crypto = require('crypto');

const PouchDB = require('pouchdb');
var db = new PouchDB(__dirname + '/db.json');
const Err = {
  user_exist:{type:"error", message:"User is already Exist", short:"user_exist"},
  user_login:{
    type:"ok", message:"successfull login",short:"user_login"
  },
  user_wrong_password:{type:"error", message:"password is Wrong", short:"user_wrong_password"}
}

const key = "thisIsKey"
const Encry = (data)=>{

const cipher = crypto.createCipher('aes128', key);
var encrypted = cipher.update(data, 'utf8', 'hex');
encrypted += cipher.final('hex');
return encrypted
}

const Decry = (hash)=>{
const decipher = crypto.createDecipher('aes128',key);
var decrypted = decipher.update(hash,'hex', 'utf8');
decrypted += decipher.final('utf8');
return decrypted
}

const UserSignup =async (req, res) =>{
  console.log("Steip 1")
    //Create the User
    //_id is username
    //first check if user is exist or not
    const user = req.body;
    db.get(user.name.toLowerCase()).then(e=>{
      //send Userexist
      console.log("Steip 2")
      res.json(Err.user_exist)

    }).catch(err=>{
      console.log("Steip 3")
      console.log(err)
      //check in error if user is not found then Create new open
      if(err.name=="not_found"){
        console.log("User not found")
        //_id is username keep in mind
        user.password = Encry(user.password);
        user.token = Encry(user.name+user.password);
        user._id = user.name.toLowerCase();
        db.put(user).then(e=>{
            console.log("Steip 4")
            // db.get(e.name).then(_createdUser=>{
            //   res.cookie("token",_createdUser.token)
            //   res.json(_createdUser)
            // }).catch(_createdErr=>{

            // })
            res.cookie("token",user.token)
            res.json(user)
            console.log(user)
    

        }).catch(err2=>{
          console.log(err2)
        })
        
        }

      
    })

  
}

const UserSignin =(req,res)=>{
  const user=req.body;
  const password = Encry(user.password);
  db.get(user.name.toLowerCase()).then(data=>{

    if(data.password==password){
        res.json(Err.user_login)
    }else{
        res.json(Err.user_wrong_password)
    }
  }).catch(err=>{
    console.log(err);
    res.json({})
  })
}



module.exports = {Encry, Decry,UserSignup,UserSignin}