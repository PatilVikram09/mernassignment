import React, {Component} from 'react';
import LoginService from '../services/LoginService.js';

class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            username:"",
            password:"",
            errormsg:""
        }

        this.serv = new LoginService();
    }

    OnPropertyChange(e){
        this.setState({
            [e.target.name]:e.target.value
        });
    }

    UserAuthentication(){
        var userCrd = {
            userName:this.state.username,
            password:this.state.password,
            ip:"103.76.9.30"
        }

        this.serv.userAuthentication(userCrd)
                                            .then(res=>res.json())
                                            .then(res=>{
                                                   if(res.status===200){
                                                    // console.log(res.data)
                                                         sessionStorage.setItem("token",res.data.token);
                                                         sessionStorage.setItem("roleId",res.data.roleId);
                                                         sessionStorage.setItem("userId",res.data.userId);
                                                         sessionStorage.setItem("userName",res.data.userName);
                                                         var h = this.props.history;
                                                         h.push('/home');
                                                   }
                                                   else{
                                                       this.setState({errormsg: res.message});
                                                   } 

                                            });
       
    }

    render() { 
        return ( 

            <div className="container login-main-content">
                <div className="col-md-4 login-container">
                    <h2><center>Login</center></h2>
                    <div className="error">{this.state.errormsg}</div>
                    <form>
                        <div className="form-group"> 
                            <label htmlFor="uname"> Username </label>
                            <input type="text" className="form-control" name="username" onChange={this.OnPropertyChange.bind(this)}/>
                         </div>  

                         <div className="form-group"> 
                            <label htmlFor="pass"> Password </label>
                            <input type="password" className="form-control" name="password" onChange={this.OnPropertyChange.bind(this)}/>
                         </div> 

                         <input type="button" value="Login" className="btn btn-success" onClick={this.UserAuthentication.bind(this)}/>
                    </form>
                </div>
            </div>
         );
    }
}
 
export default LoginComponent;