import React, {Component} from 'react';
import HeaderComponent from './HeaderComponent.js';
import FooterComponent from './FooterComponent.js';
import RoleService from '../services/RoleService.js';
import TableRow from './TableRowComponent.js';

class RoleComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            roleid:"0",
            rolename:"",
            errorMsg:"",
            successMsg:"",
            roles:[]
        }

        this.serv = new RoleService();
        this.token = sessionStorage.getItem("token");
        this.roleId = sessionStorage.getItem("roleId");

        if(this.token==="" || this.token===null || this.roleId==="" || this.roleId===null || this.roleId !="101"){
            
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
        if(this.state.roleid===""){
            this.setState({errormsg: "Please Enter Product Id"});
        }
        else if(this.state.rolename===""){
            this.setState({errormsg: "Please Enter Product Name"});
        }
        else{
            var role = {
                roleId:this.state.roleid,
                roleName:this.state.rolename
            }
    
            this.serv.postRole(role, this.token).then(res=>res.json())
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
        this.setState({roleid: 0});
        this.setState({rolename: ""});
        this.setState({errorMsg: ""});   
    }

    componentDidMount(){
        let prds = this.serv.getRoles(this.token)
                            .then((data) => data.json())
                            .then((value)=>{
                               //console.log(value.data);
                               this.setState({roles:value.data})
                            })
                            .catch(error =>{
                                console.log(`Error Status ${error.status}`);
                            });
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
                                        <label htmlFor="roleId"> Role Id</label>
                                        <input type="text" className="form-control" name="roleid" onChange={this.OnPropertyChange.bind(this)}/>
                                    </div>  

                                    <div className="form-group"> 
                                        <label htmlFor="rolename"> Role Name </label>
                                        <input type="text" className="form-control" name="rolename" onChange={this.OnPropertyChange.bind(this)}/>
                                    </div> 

                                    <input type="button" value="Submit" className="btn btn-success" onClick={this.onClickSubmit.bind(this)}/>
                                    <input type="button" value="Clear" className="btn btn-primary" onClick={this.onClickClear.bind(this)}/>
                            </form>
                        </div>
                    </div>

                    <div className="row roletable">
                        <div className="col-md-2">
                        </div>

                        <div className="col-md-8">
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>Role Id</th>
                                        <th>Role Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.roles.map((r,i)=>(
                                            
                                           <TableRow key={i}  row={r} rec={this.state.roles}></TableRow> 
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <FooterComponent/>
            </div>
         );
    }
}


export default RoleComponent;