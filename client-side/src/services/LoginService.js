class LoginService{

    userAuthentication(userCrd){
        let promise = fetch("http://localhost:4070/api/users/auth", {
                                method:"POST",
                                headers:{
                                    "content-type":"application/json"
                                },
                                body:JSON.stringify(userCrd)
                            });
        return promise;
    }
}

export default LoginService