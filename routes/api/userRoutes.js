const app = require("express").Router()

const db = require('../models');

app.post("/api/users",function(req,res){

    db.User.create(req.body)
      .then(dbUser => {
        console.log(dbUser);
        res.json(dbUser);
      })
      .catch(({ message }) => {
        console.log(message);
      });
})

// Retrieve all notes
app.put('/api/users/:id', (req, res) => {
  db.User.findOneAndUpdate({_id:req.params.id},req.body)
    .then(dbUSERDATA => {
      res.json(dbUSERDATA);
    })
    .catch(err => {
      res.json(err);
    });
});

// Retrieve all users
app.get('/api/users/:id', (req, res) => {
  db.User.find({_id:req.params.id})
  .populate('thought')
  .populate('user')
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
});

// Create a new note and associate it with user
app.delete('/api/users/:id', ({ body }, res) => {
  db.User.findByIdDelete({_id:req.params.id})
    .then(({ _id }) =>
      db.User.findOneAndUpdate({}, { $push: { notes: _id } }, { new: true })
    )
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
});

app.get('/api/users', (req, res) => {
  db.User.find({})
    .populate({
      path: 'thought',
      select: '-__v'
    })
    .select('-__v')
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
});



module.exports = app