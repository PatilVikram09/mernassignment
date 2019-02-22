import React, {Component} from 'react';
import HeaderComponent from './HeaderComponent.js';
import FooterComponent from './FooterComponent.js';
import UserService from '../services/UserService';

class UserlistComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            users:[]
        }

        this.serv = new UserService();
        this.token = sessionStorage.getItem("token");
        this.roleId = sessionStorage.getItem("roleId");

        if(this.token==="" || this.token===null || this.roleId==="" || this.roleId===null || this.roleId !=="101" && this.roleId !=="102"){
            
            var h = this.props.history;
            h.push('/login');
        }
    }

    componentDidMount(){
        let prds = this.serv.getUsers(this.token)
                            .then((data) => data.json())
                            .then((value)=>{
                               //console.log(JSON.stringify(value.data));
                               this.setState({users:value.data})
                            })
                            .catch(error =>{
                                console.log(`Error Status ${error.status}`);
                            });
    }

    onClickMoreInfo(userId){
        //console.log(userId);
        var h = this.props.history;
        h.push('/personinfo/'+userId);  
    }

    render() { 
        return ( 
            <div className="container">
                <HeaderComponent/>

                <div className="main-content">
                    <div className="row roletable">
                        <div className="col-md-2">
                        </div>

                        <div className="col-md-8">
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>User Id</th>
                                        <th>UserName</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.users.map((u,i)=>(
                                            
                                           <TableRow key={i}  row={u} rec={this.state.users} moreInfo={this.onClickMoreInfo.bind(this)}></TableRow> 
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

class TableRow extends Component {
    constructor(props) {
      super(props);
    }

    clickMoreInfo(){
            this.props.moreInfo(this.props.row.userId);
    }
  
    render() {  
      return (
        <tr>
          {Object.keys(this.props.rec[0]).map((r, i) =>
             r !== "_id" ? r !== "__v" ? r !== "password" ? <td>{this.props.row[r]}</td> : null : null : null
          )}

          <div> 
            <input className="btn btn-primary" type="button" onClick={this.clickMoreInfo.bind(this)} value="More Info" />
          </div>
        </tr>
      );
    }
  }

 
export default UserlistComponent;