const express = require('express')
const app = express()

const {User} = require("./models/User")
const {auth} = require("./middleware/auth")
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const config = require('./config/key')

//application/x-www.form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
//application/json
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose')

mongoose.connect(config.mongoURI)
.then(() => console.log('MongoDB connected..'))
.catch(err => console.log(err))


app.get('/' , (req, res) => res.send("Hello World!"))

app.get('/api/hello', (req, res) => {
    res.send('안녕~')
})


app.post('/api/users/register', async (req, res) =>{


      //회원가입할 때 필요한 정보들을 client에서 가져오면,
        //그 정보들을 DB에 넣어준다.
        const user = new User(req.body);
        //user모델에 정보가 저장됨
        //실패 시, 실패한 정보를 보내줌
        user.save().then(()=>{
            res.status(200).json({
                success:true
            })
        }).catch((err)=>{
            return res.json({success:false,err})
        });

})

app.post('/api/users/login',(req,res) => {
    User.findOne({ email: req.body.email})
    .then(user=>{
        if(!user){
            return res.json({
                loginSuccess:false,
                message:"제공된 이메일에 해당되는 유저가 없습니다."

        })
    }
    user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch) 
            return res.json({loginSuccess: false, message: "비밀번호가 틀렸습니다."})
    // Password가 일치하다면 토큰 생성
    user.generateToken((err, user)=>{
                if(err) return res.status(400).send(err);
                // 토큰을 저장
                res.cookie("x_auth", user.token)
                .status(200)
                .json({loginSuccess: true, userId: user._id})
            })
        })
    })
    .catch((err)=>{
        return res.status(400).send(err);
    })

})

app.get('/api/users/auth', auth ,(req,res) => {
  res.status(200).json({
    _id : req.user._id,
    isAdmin: req.user.role ===0? false: true,
    isAuth: true,
    email:req.user.email,
    name : req.user.name,
    lastname : req.user.lastname,
    role: req.user.role,
    Image:req.user.Image
  })
})


app.get('/api/users/logout', auth, (req, res ) => {
    User.findOneAndUpdate({ _id: req.user._id}, {token: ""})
        .then(()=>{
            console.log('findOneAndUpdate=', req.token ,req.user._id)
            res.status(200).send({ success: true  })
        })
        .catch((err) =>{
            return res.json({success:false, err})
        })
})

const port = 5000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))