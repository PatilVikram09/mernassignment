import React, {Component} from 'react';
import HeaderComponent from './HeaderComponent.js';
import FooterComponent from './FooterComponent.js';
import PersonalInfoService from './../services/PersonalInfoService';
import { confirmAlert } from 'react-confirm-alert';


class PersoninfolistComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            personInfo:[]
         }

        this.serv = new PersonalInfoService(); 
        this.token = sessionStorage.getItem("token");
        this.roleId = sessionStorage.getItem("roleId");

        if(this.token==="" || this.token===null || this.roleId==="" || this.roleId===null || this.roleId !=="101"){
            
            var h = this.props.history;
            h.push('/login');
        }
        this.status = this.props.match.params.status;
    }

    componentDidMount(){
        this.serv.getPersonalInfoByStatus(this.status,this.token).then(res=>res.json())
                                             .then(res=>{
                                              if(res.status===200){
                                                  //console.log("Data :",res.data);
                                                  this.setState({personInfo:[]});
                                                this.setState({personInfo:res.data});
                                              }
                                              else{
                                                    this.setState({errormsg: res.message});
                                                    this.setState({personInfo:[]});
                                              } 
                                        });
    }

    onClickMoreInfo(userId){
        var h = this.props.history;
        h.push('/personinfo/'+userId);
    }

    onClickApprove(userId){
        //console.log("UserId : ", userId);
        
        this.serv.approvePersonalInfo(userId, this.token).then(res=>res.json())
                                                        .then(res=>{
                                                        if(res.status===200){
                                                            console.log("Data :",res);
                                                        }
                                                        else{
                                                            this.setState({errormsg: res.message});
                                                        } 
                                                });
    }

    onClickReject(userId){
        this.serv.personalinforeject(userId, this.token).then(res=>res.json())
                                                        .then(res=>{
                                                        if(res.status===200){
                                                            console.log("Data :",res);
                                                        }
                                                        else{
                                                            this.setState({errormsg: res.message});
                                                        } 
                                                });
    }

    render() { 
        return ( 
            <div className="container">
                <HeaderComponent/>
                <div className="main-content">
                    <div className="row">
                        <div className="col-md-12">
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>User Id</th>
                                    <th>PersonalInfo Id</th>
                                    <th>Full Name</th>
                                    <th>DOB</th>
                                    <th>Mobile</th>
                                    <th>Email</th>
                                    <th>City</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                                <tbody>
                                {
                                    //console.log(this.state.personInfo)
                                    this.state.personInfo.map((pers, idx) => (
                                        <TableRow key={idx} row={pers} moreInfo={this.onClickMoreInfo.bind(this)} approve={this.onClickApprove.bind(this)}
                                                                reject={this.onClickReject.bind(this)}></TableRow>
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

class TableRow extends Component{

    constructor(props){
        super(props);
    }

    clickMoreInfo(){
        this.props.moreInfo(this.props.row.userId);
    }

    clickApprove(){
        confirmAlert({
            title: 'Confirm to Approve',
            message: 'Are you sure to approve this.',
            buttons: [
              {
                label: 'Yes',
                onClick: () =>  this.props.approve(this.props.row.userId)
              },
              {
                label: 'No',
              }
            ]
          });
       
    }

    clickReject(){
        
        confirmAlert({
            title: 'Confirm to Reject',
            message: 'Are you sure to reject this.',
            buttons: [
              {
                label: 'Yes',
                onClick: () =>  this.props.reject(this.props.row.userId)
              },
              {
                label: 'No',
              }
            ]
          });
    }

    render(){
        return(
            <tr>
                {
                    Object.values(this.props.row).map((ele, id) =>(
                            ele === "pending" ? 
                            <td key={id}> 
                                <button className="btn btn-success" onClick={this.clickApprove.bind(this)}>Approve</button> 
                                <button className="btn btn-danger" onClick={this.clickReject.bind(this)}>Reject</button>
                            </td> 
                            : ele === "approved" ?  
                            <td key={id}> 
                                <button className="btn btn-warning" onClick={this.clickMoreInfo.bind(this)}>View More..</button> 
                            </td> 
                            : ele === "rejected" ?  
                            <td key={id}> 
                                <button className="btn btn-success" onClick={this.clickApprove.bind(this)}>Approve</button>  
                            </td> 
                            :
                            <td key={id}> {ele} </td>
                    )) 
                }
            </tr>
        );
    }
}   

export default PersoninfolistComponent;