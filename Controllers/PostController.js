import PostModel from "../Models/postModel.js";
import mongoose from "mongoose";
import UserModel from "../Models/userModel.js";

// Create new Post

export const createPost= async(req,res)=> {
    const newPost= new PostModel(req.body)

    try {
        await newPost.save()
        res.status(200).json("Post created!")
    } catch (error) {
        res.status(500).json(error)
        
    }
}

// Get a post

export const getPost = async(req,res)=>{
    const id= req.params.id
        try {
            const post=await PostModel.findById(id)
            res.status(200).json(post)
        } catch (error) {
            res.status(500).json(error)

        }
}

export const updatePost= async(req,res)=>{
    const postId=req.params.id
    const {userId} =req.body

    try {
        const post = await PostModel.findById(postId)
        if(post.userId === userId){
            await post.updateOne( { $set:req.body} )
            res.status(200).json("Post Updated!")
        }
        else{
            res.status(403).json("Action Forbidden")
        }
    } catch (error) {
        res.status(500).json(error)

    }

}


// Delete a post

export const deletePost = async(req,res)=>{
    const id= req.params.id;
    const {userId}=req.body

    try {
        const post = await PostModel.findById(id)
        if(post.userId === userId)
        {
            await post.deleteOne();
            res.status(200).json("Post deleted succesfully")
        }
        else 
        {
            res.status(403).json("Action Forbidden")
        }


    } catch (error) {
        res.status(500).json(error)
 
    }




}

// like/disliket a post 
export const likePost= async(req,res)=>{
    const id = req.params.id
    const {userId} = req.body
    try {
        const post = await PostModel.findById(id)
        if(!post.likes.includes(userId)) 
        {
            await post.updateOne({$push : {likes: userId}})
            res.status(200).json("Post Liked")
        }
        else{
            await post.updateOne({$pull : {likes: userId}})
            res.status(200).json("Post Disliked")
        }

    } catch (error) {
        res.status(500).json(error)
    }
}

// Get Timeline Posts