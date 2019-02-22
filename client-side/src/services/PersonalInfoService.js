class PersonalInfoService{

    postPersonalinfo(personalInfo, token){
        let promise = fetch("http://localhost:4070/api/personalinfo", {
                                method:"POST",
                                headers:{
                                    "content-type":"application/json",
                                    "Authorization":"bearer "+token
                                },
                                body:JSON.stringify(personalInfo)
                            });
        return promise;
    }

    getPersonalInfoByStatus(status,token){
        //console.log("Status :", status);
        
        let promise = fetch("http://localhost:4070/api/perinfoByStatus/"+status,{
                                method:"GET",
                                headers:{
                                    "Authorization":"bearer "+token
                                },
                            });
        return promise;
    }

    getPersonalInfoById(userId,token){
        
        let promise = fetch("http://localhost:4070/api/personalinfoid/"+userId,{
                                method:"GET",
                                headers:{
                                    "Authorization":"bearer "+token
                                },
                            });
        return promise;
    }

    approvePersonalInfo(userId,token){
        //console.log("userId : ",userId)
        let promise = fetch("http://localhost:4070/api/personalinfoapprove/"+userId,{
                                method:"GET",
                                headers:{
                                    "Authorization":"bearer "+token
                                },
                            });
        return promise;
    }

    personalinforeject(userId,token){
        let promise = fetch("http://localhost:4070/api/personalinforeject/"+userId,{
            method:"GET",
            headers:{
                "Authorization":"bearer "+token
            },
        });
        return promise;
    }
}

export default PersonalInfoService