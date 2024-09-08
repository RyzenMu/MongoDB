const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db = require('./db');

const User = mongoose.model('User', {
    name : String,
    email : String
});

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get('/', async(req, res)=>{
    const data = await User.find();
    res.render('index.ejs', {data});
});

app.get('/create', async(req, res)=>{
    res.render('edit.ejs', {data:null});
});

app.post('/create', async(req, res)=>{
    const user = new User(req.body);
    await user.save();
    res.redirect('/');
});

app.get('/edit/:id', async (req, res)=>{
    const data = await User.findById(req.params.id);
    res.render('edit.ejs', {data});
});

app.get('delete/:id', async (req, res)=>{
    try {
        const user = await User.findByIdAndRemove(req.params.id);
        if (!user) {
          return res.status(404).send('User not found');   
     // Handle non-existent user
        }
        res.redirect('/'); // Redirect back to user list after successful deletion
      } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting user'); // Handle internal server errors
      }
});

app.post('/update', async(req, res)=>{
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/');
});

process.noDeprecation = true;
const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=>{
    console.log("server started on 8000");
    
})
