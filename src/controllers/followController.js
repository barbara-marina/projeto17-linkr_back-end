import followRepository from "../repositories/followRepository.js";

export async function follow (req, res){
    const { userId, userToFollow } = req.params;
    
    try {
        await followRepository.follow(parseInt(userId), parseInt(userToFollow));
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500);
        console.log(error)
    }

}

export async function unFollow(req, res){
    const {userId, userTounFollow } = req.params;

    try {
        const unfollow = await followRepository.unFollow(userId, userTounFollow);
        res.sendStatus(204);
    } catch (error) {
        res.sendStatus(500)
        console.log(error)
    }
}

export async function getFollowing(req, res){
    const {user} = res.locals;

    try {
        const seguindo = await followRepository.getFollowingUser(Number(user.id));
        res.send(seguindo.rows).status(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}