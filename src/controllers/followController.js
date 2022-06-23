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