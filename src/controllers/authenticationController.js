

export async function createUser(req, res){
    console.log("entrou aqui")


    const {email, name, username, password, picture_url} = req.body;


    console.log(email, name, username, password, picture_url);


    res.sendStatus(201);


}