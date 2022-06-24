import commentsRepository from "../repositories/commentsRepository.js";
import hashtagRepository from "../repositories/hashtagRepository.js";
import postRepository from "../repositories/postRepository.js";
import timelineRepository from "../repositories/timelineRepository.js";

export async function getHashtags(req, res){

    try {
        
        const hashtags = await hashtagRepository.getHashtags();

        res.send(hashtags.rows);

    } catch (error) {
        res.status(500).send(error);
    }
}

export async function getHashtagPosts(req, res){

    const { hashtag } = req.params;

    try {
        const { user } = res.locals;

        const result = await hashtagRepository.getHashtagPosts(hashtag);
        const likeUser = await timelineRepository.likesUsersPost();
        const wasShared = await postRepository.shares();
        const commentsResult = await commentsRepository.getComments(parseInt(userId));
        commentsResult.rows.forEach(element => {
            element.postComments.forEach(e => {
                if(e.isMyFollowing !== true){
                    e.isMyFollowing = false;
                }
            })
        });

        const posts = [];

        for(let post of result.rows){

            const iLiked = likeUser.rows.some( element => element.userId == parseInt(user) && element.postId == post.id )
            const whoLiked = likeUser.rows.filter(element => element.postId == post.id);
            const whoShared = wasShared.rows.filter(element => element.postId === post.id)
            const comments = [];
            commentsResult.rows.forEach(element => {
                element.postComments.forEach(e => e.postId === post.id && comments.push(e))
            });
            const thePost = {iLiked:iLiked, whoLiked:whoLiked, whoShared:whoShared, comments:comments, post:post}
            posts.push(thePost);

        }

        if (posts.rowCount === 0) return res.sendStatus(404);
 
        res.status(200).send(posts);
        
    } catch (error) {
        res.status(500).send(error);       
    }
}
