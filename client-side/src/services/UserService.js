class Userservice{

    getUsers(token){
        let promise = fetch("http://localhost:4070/api/users",{
                                method:"GET",
                                headers:{
                                    "Authorization":"bearer "+token
                                },
                            });
        return promise;
    }

    postUser(user, token){
        let promise = fetch("http://localhost:4070/api/users", {
                                method:"POST",
                                headers:{
                                    "content-type":"application/json",
                                    "Authorization":"bearer "+token
                                },
                                body:JSON.stringify(user)
                            });
        return promise;
    }
}

export default Userservice;