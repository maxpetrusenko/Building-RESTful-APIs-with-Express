const express = require('express')
const router = express.Router()
const db = require('../data/db')

//post post
router.post('/', (req, res) => {
    if(req.body.title !==undefined && req.body.contents !==undefined){
        const newpost = req.body;
        db.insert(newpost)
            .then(() => {
                res.status(201).json(newpost)
            })
            .catch(err =>{
                console.log(err)
                res.status(500).json({ error: "There was an error while saving the post to the database" })
            })
    }else {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    }
  });

//post comment 
router.post('/:id/comments', (req, res) => {
    if (req.body.text === undefined ) {
        res.status(400).json({ errorMessage: "Please provide text for the comment." });
    }
    else if (req.params.id === undefined){
        res.status(404).json({ message: "The post with the specified ID does not exist." });
    }
    else {
        var newComment = {
            text: req.body.text,
            post_id: req.params.id
        }
        db.insertComment(newComment)
        .then((id) =>{
            res.status(201).json(id)
        })
        .catch( (err)=>{
            res.status(500).json({ error: "There was an error while saving the comment to the database" })
        })
    }
});

//get posts
router.get('/', (req, res) => {
    db.find()
        .then(posts => {
            res.json(posts)
        })
        .catch(err =>{
            res.status(500).json({ errorMessage: "The posts information could not be retrieved." })
        })
  });

//get posts by id
router.get('/:id', (req, res) => {
    db.findById(req.params.id)
    .then(post => {
        res.json(post);
    })
    .catch(err =>{
        console.log(err)
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    })
});

//not working, find comments by postID
router.get('/:id/comments', (req, res) => {
    if (req.params.id === undefined){
        res.status(404),json({ message: "The post with the specified ID does not exist." })
    }
    db.findPostComments(req.params.id)
    .then((comment) =>{
        console.log(comment)
        res.json(comment)
    })
    .catch( (err)=>{
        res.status(500).json({ error: "The comments information could not be retrieved." })
    })
});

//update post
router.put('/:id', (req, res) => {
    if(req.params.id === undefined){
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
    if(!req.body.contents || !req.body.title){
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
    db.update(req.params.id, req.body)
    .then((updatedPost) => {
        // res.json(updatedPost);
        if (updatedPost === 1){
            db.findById(req.params.id)
            .then((post)=>{res.status(200).json(post)})
            .catch((err)=>{
                res.status(500).json({ error: "The post information could not be modified.or not found" })
            })
        }
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({ error: "The post information could not be modified." })
    })
});


//delete post not finished
router.delete('/:id', (req, res) => {
    console.log('postID' + req.params.id)
    db.find(req.params.id)
    .then(post => {
        console.log('post' + req.params.id)
        db.remove(req.params.id)
            .then(num => {
                console.log(num)
                res.json(num);
            })
            .catch(err =>{
                console.log(err)
                res.status(404).json({ error: "The post could not be removed" })
            })
     })
    .catch(err =>{
        res.status(500).json({ message: "The post with the specified ID does not exist." })
    })
    
})

module.exports = router