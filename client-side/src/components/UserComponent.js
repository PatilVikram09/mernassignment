import React, {Component} from 'react';
import HeaderComponent from './HeaderComponent.js';
import FooterComponent from './FooterComponent.js';
import UserService from '../services/UserService';

class UserComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            userid:'',
            username:'',
            email:'',
            password:'',
            role:'',
            errorMsg:"",
            successMsg:""
         }

        this.serv = new UserService();
        this.token = sessionStorage.getItem("token");
        this.roleId = sessionStorage.getItem("roleId");

        if(this.token==="" || this.token===null || this.roleId==="" || this.roleId===null || this.roleId !="101" && this.roleId !="102"){
            
            var h = this.props.history;
            h.push('/login');
        }
    }

    OnPropertyChange(e){
        this.setState({
            [e.target.name]:e.target.value
        });
    }

    onClickSubmit(){
        if(this.state.userid===""){
            this.setState({errormsg: "Please Enter UserId"});
        }
        else if(this.state.username===""){
            this.setState({errormsg: "Please Enter User Name"});
        }
        else if(this.state.email===""){
            this.setState({errormsg: "Please Enter Email"});
        }
        else if(this.state.password===""){
            this.setState({errormsg: "Please Enter Password"});
        }
        else if(this.state.role===""){
            this.setState({errormsg: "Please Enter Role"});
        }
        else{
            var user = {
                userId:this.state.userid,
                userName:this.state.username,
                email:this.state.email,
                password:this.state.password,
                roleId:this.state.role
            }
            
    
           this.serv.postUser(user, this.token).then(res=>res.json())
                                                        .then(res=>{
                                                        if(res.status===200){
                                                            this.setState({successMsg: res.message});
                                                            this.onClickClear();
                                                        }
                                                        else{
                                                            this.setState({errormsg: res.message});
                                                        } 
    
                                                    });
        }
    }

    onClickClear(e){

    }


    render() { 
        return ( 
            <div className="container">
                <HeaderComponent/>

                <div className="main-content">
                    <div className="row">
                        <div className="col-md-3">
                        </div>

                        <div className="col-md-5">
                            <div className="error">{this.state.errormsg}</div>
                            <div className="success">{this.state.successMsg}</div>
                            <form>
                                    <div className="form-group"> 
                                        <label htmlFor="userId"> User Id</label>
                                        <input type="text" className="form-control" name="userid" onChange={this.OnPropertyChange.bind(this)}/>
                                    </div>

                                    <div className="form-group"> 
                                        <label htmlFor="uname"> UserName</label>
                                        <input type="text" className="form-control" name="username" onChange={this.OnPropertyChange.bind(this)}/>
                                    </div>

                                    <div className="form-group"> 
                                        <label htmlFor="email"> Email</label>
                                        <input type="text" className="form-control" name="email" onChange={this.OnPropertyChange.bind(this)}/>
                                    </div>

                                    <div className="form-group"> 
                                        <label htmlFor="pass"> Password</label>
                                        <input type="password" className="form-control" name="password" onChange={this.OnPropertyChange.bind(this)}/>
                                    </div>

                                    <div className="form-group"> 
                                        <label htmlFor="role"> Role</label>
                                        <input type="text" className="form-control" name="role" onChange={this.OnPropertyChange.bind(this)}/>
                                    </div>

                                    <input type="button" value="Submit" className="btn btn-success" onClick={this.onClickSubmit.bind(this)}/>
                                    <input type="button" value="Clear" className="btn btn-primary" onClick={this.onClickClear.bind(this)}/>

                            </form>
                        </div>
                    </div>

                    
                </div>
                <FooterComponent/>
            </div>
         );
    }
}


 
export default UserComponent;