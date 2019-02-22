import React, {Component} from 'react';
import HeaderComponent from './HeaderComponent.js';
import FooterComponent from './FooterComponent.js';
import PersonalInfoService from './../services/PersonalInfoService';

class MyPersonalInfoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            personinfoId:'',
            firstName: '',
            middleName: '',
            lastName: '',
            gender:'',
            dob:'',
            age:'',
            flatNo:'',
            societyName:'',
            areaName:'',
            city:'',
            state:'',
            pin:'',
            email:'',
            phone:'',
            mobile:'',
            physicalDisablity:'',
            maritalStatus:'',
            education:'',
            birthSign:'',
            userRole:'',
            userId:''
         }
        
        this.serv = new PersonalInfoService(); 
        this.token = sessionStorage.getItem("token");
        this.roleId = sessionStorage.getItem("roleId");
        this.userId = sessionStorage.getItem("userId");

        if(this.token==="" || this.token===null || this.roleId==="" || this.roleId===null){
            
            var h = this.props.history;
            h.push('/login');
        }
    }

    componentDidMount(){
        this.serv.getPersonalInfoById(this.userId,this.token).then(res=>res.json())
                                                                .then(res=>{
                                                                if(res.status===200){
                                                                   console.log("Data :",res.data);
                                                                    var perInfo = res.data;
                                                                   
                                                                    this.setState({
                                                                        personinfoId:perInfo[0].personinfoId,
                                                                        firstName:perInfo[0].fullName.firstName,
                                                                        middleName:perInfo[0].fullName.middleName,
                                                                        lastName:perInfo[0].fullName.lastName,
                                                                        gender:perInfo[0].gender,
                                                                        dob:perInfo[0].dateOfBirth,
                                                                        age:perInfo[0].age,
                                                                        flatNo:perInfo[0].address.flatNumber,
                                                                        societyName:perInfo[0].address.societyName,
                                                                        areaName:perInfo[0].address.areaName,
                                                                        city:perInfo[0].city,
                                                                        state:perInfo[0].state,
                                                                        pin:perInfo[0].pincode,
                                                                        email:perInfo[0].email,
                                                                        phone:perInfo[0].phoneNo,
                                                                        mobile:perInfo[0].mobileNo,
                                                                        physicalDisablity:perInfo[0].physicalDisability,
                                                                        maritalStatus:perInfo[0].maritalStatus,
                                                                        education:perInfo[0].education,
                                                                        birthSign:perInfo[0].birthSign,
                                                                        userId:perInfo[0].userId
                                                                    });
                                                                    
                                                                }
                                                                else{
                                                                    this.setState({errormsg: res.message});
                                                                } 
                                                        });
    }

    onClickUpdate(e){
        //console.log(this.state.userId)
        var h = this.props.history;
        h.push('/personinfo/'+this.state.userId);
    }

    render() { 
        return ( 
            <div className="container">
                <HeaderComponent/>
                    <div className="main-content">
                        <div className="row">
                            <div className="col-md-3">
                           
                            </div>

                            <div className="col-md-8">
                                
                                <h3 className="perinfo-title">My PersonalInfo</h3>
                               <table className="table table-bordered table-striped">
                                    <tbody>
                                         <tr>
                                            <td>PersonalInfo Id</td>
                                            <td>{this.state.personinfoId}</td>
                                         </tr> 
                                         <tr>
                                            <td>Full Name</td>
                                            <td>{this.state.firstName} {this.state.middleName} {this.state.lastName}</td>
                                         </tr> 
                                         <tr>
                                            <td>Gender</td>
                                            <td>{this.state.gender}</td>
                                         </tr>
                                         <tr>
                                            <td>Date Of Birth</td>
                                            <td>{this.state.dob}</td>
                                         </tr>
                                         <tr>
                                            <td>Age</td>
                                            <td>{this.state.age}</td>
                                         </tr> 
                                         <tr>
                                            <td>Address</td>
                                            <td>{this.state.flatNo}, {this.state.societyName}, {this.state.areaName}</td>
                                         </tr>
                                         <tr>
                                            <td>City</td>
                                            <td>{this.state.city}</td>
                                         </tr>
                                         <tr>
                                            <td>State</td>
                                            <td>{this.state.state}</td>
                                         </tr>
                                         <tr>
                                            <td>Pin</td>
                                            <td>{this.state.pin}</td>
                                         </tr>
                                         <tr>
                                            <td>Email</td>
                                            <td>{this.state.email}</td>
                                         </tr>
                                         <tr>
                                            <td>Phone</td>
                                            <td>{this.state.phone}</td>
                                         </tr>
                                         <tr>
                                            <td>Mobile</td>
                                            <td>{this.state.mobile}</td>
                                         </tr>
                                         <tr>
                                            <td>Physical Disablity</td>
                                            <td>{this.state.physicalDisablity}</td>
                                         </tr>
                                         <tr>
                                            <td>Marital Status</td>
                                            <td>{this.state.maritalStatus}</td>
                                         </tr>
                                         <tr>
                                            <td>Education</td>
                                            <td>{this.state.education}</td>
                                         </tr>
                                         <tr>
                                            <td>Birth Sign</td>
                                            <td>{this.state.birthSign}</td>
                                         </tr>

                                    </tbody>
                                </table>

                                  <input type="button" value="Update" className="btn btn-success" onClick={this.onClickUpdate.bind(this)}/>
                               
                            </div>
                        </div>
                    </div>
                <FooterComponent/>
            </div>
         );
    }
}
 
export default MyPersonalInfoComponent;