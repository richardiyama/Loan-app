import mongoose from 'mongoose';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import passport from 'passport';
import passportLocal from 'passport-local';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bcrypt from 'bcryptjs';
import User from './User'
import bodyParser from 'body-parser'

import { UserInterface, DatabaseUserInterface } from './Interfaces/UserInterface';

const LocalStrategy = passportLocal.Strategy



mongoose.connect("mongodb+srv://richardiyama:admin@loanapp.w6oma.mongodb.net/<dbname>?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true}, err => {
  if(err){
      console.log(err);
  }else{
      console.log("Connected to the databases");
  }

});

// Middleware
const app = express();
//app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors({ origin: "http://localhost:3000", credentials: true }))
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
// Passport 
passport.use(new LocalStrategy((username: string, password: string, done) => {
  User.findOne({ phone: username }, (err, user: DatabaseUserInterface) => {
    if (err) throw err;
    if (!user) return done(null, false);
    bcrypt.compare(password, user.password, (err, result: boolean) => {
      if (err) throw err;
      
      if (result === true) {
    
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  });
})
);

passport.serializeUser((user: DatabaseUserInterface, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id: string, cb) => {
  User.findOne({ _id: id }, (err, user: DatabaseUserInterface) => {
    const userInformation: UserInterface = {
        fullName:user.fullName,
        email:user.email,
        bvn:user.bvn,
      phone: user.phone,
      password:user.password,
      isAdmin: user.isAdmin,
      id: user._id
    };
    cb(err, userInformation);
  });
});


// Routes
app.post('/register', async (req, res) => {
  const { fullName,email,phone,bvn,password } = req?.body;
  if (!phone || !password || typeof phone !== "string" || typeof password !== "string" || typeof bvn !== "string") {
    res.send("Improper Values");
    console.log("Improper Values")
    return;
  }
  User.findOne({ phone }, async (err, doc: DatabaseUserInterface) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        fullName,
        email,
        phone,
        bvn,
        password: hashedPassword,
      });
      await newUser.save();
      res.send("success")
    }
  })
});

const isAdministratorMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { user }: any = req;
  if (user) {
    User.findOne({ phone: user.phone }, (err, doc: DatabaseUserInterface) => {
      if (err) throw err;
      if (doc?.isAdmin) {
        next();
      }
      else {
        res.send("Sorry, only admin's can perform this.")
      }
    })
  }
  else {
    res.send("Sorry, you arent logged in.")
  }
}

app.post("/login", passport.authenticate("local"), (req, res) => {
 res.send("success")
 
 
  
});

app.get("/user", (req, res) => {
  res.send(req.user);
});

app.get("/logout", (req, res) => {
  req.logout();
  res.send("success")
});

//app.post("/deleteuser", isAdministratorMiddleware, async (req, res) => {
//const { id } = req?.body;
  //await User.findByIdAndDelete(id, (err) => {
  //  if (err) throw err;
 // });
 // res.send("success");
//});

app.get("/getallusers", isAdministratorMiddleware, async (req, res) => {
  await User.find({}, (err, data: DatabaseUserInterface[]) => {
    if (err) throw err;
    const filteredUsers: UserInterface[] = [];
    data.forEach((item: DatabaseUserInterface) => {
      const userInformation = {
        id: item._id,
        phone: item.phone,
        fullName:item.fullName,
        email:item.email,
        bvn:item.bvn,
        password:item.password,
        isAdmin: item.isAdmin
      }
      filteredUsers.push(userInformation);
    });
    res.send(filteredUsers);
  })
});


app.listen(4000, () => {
  console.log("Server Started");
});
