import React, {Component} from 'react';
import HeaderComponent from './HeaderComponent.js';
import FooterComponent from './FooterComponent.js';
import PersonalInfoService from './../services/PersonalInfoService';

class PersoninfoComponent extends Component {
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

        if(this.token==="" || this.token===null || this.roleId==="" || this.roleId===null){
            
            var h = this.props.history;
            h.push('/login');
        }

        this.userId = this.props.match.params.userid;  
    }

    OnPropertyChange(e){
        this.setState({
            [e.target.name]:e.target.value
        });
    }

    onClickSubmit(){
        var personInfo = {
            personinfoId:this.state.personinfoId,
            fullName: {
                firstName: this.state.firstName,
                middleName: this.state.middleName,
                lastName: this.state.lastName
              },
            gender:this.state.gender,
            dob:this.state.dob,
            age:this.state.age,
            address:{
                flatNo:this.state.flatNo,
                societyName:this.state.societyName,
                areaName:this.state.areaName,
            },
            city:this.state.city,
            state:this.state.state,
            pin:this.state.pin,
            email:this.state.email,
            phone:this.state.phone,
            mobile:this.state.mobile,
            physicalDisablity:this.state.physicalDisablity,
            maritalStatus:this.state.maritalStatus,
            education:this.state.education,
            birthSign:this.state.birthSign,
            userRole:this.roleId,
            userId:this.userId
        }

       // console.log(personInfo)

        this.serv.postPersonalinfo(personInfo, this.token).then(res=>res.json())
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

    onClickClear(){

    }

    componentDidMount(){
        this.serv.getPersonalInfoById(this.userId,this.token).then(res=>res.json())
                                                                .then(res=>{
                                                                if(res.status===200){
                                                                   console.log("Data :",res.data);
                                                                    var perInfo = res.data;
                                                                   
                                                                    if(perInfo.length===0){
                                                                        this.setState({personInfo:[]});
                                                                    }
                                                                    else{
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
                                                                            birthSign:perInfo[0].birthSign
                                                                        });
                                                                    }
                                                                }
                                                                else{
                                                                    this.setState({errormsg: res.message});
                                                                    this.setState({personInfo:[]});
                                                                } 
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

                        <div className="col-md-8">
                            <div className="error">{this.state.errormsg}</div>
                            <div className="success">{this.state.successMsg}</div>
                                <form>
                                    <div className="row">
                                    <div className="form-group col-md-12">
                                            <label htmlFor="firstName">Personlinfo id </label>
                                            <input type="text" className="form-control" id="personinfoId" 
                                            value={this.state.personinfoId}
                                            onChange={this.OnPropertyChange.bind(this)}
                                            name="personinfoId" disabled/>
                                        </div>
                            
                                        <div className="form-group col-md-6">
                                            <label htmlFor="firstName"> First Name </label>
                                            <input type="text" className="form-control" id="firstName" 
                                            value={this.state.firstName}
                                            onChange={this.OnPropertyChange.bind(this)}
                                            name="firstName"/>
                                        </div>

                                        <div className="form-group col-md-6">
                                            <label htmlFor="middleName"> Middle Name </label>
                                            <input type="text" className="form-control" id="middleName" 
                                            value={this.state.middleName}
                                            onChange={this.OnPropertyChange.bind(this)}
                                            name="middleName"/>
                                        </div>

                                        <div className="form-group col-md-6">
                                            <label htmlFor="lastName"> Last Name </label>
                                            <input type="text" className="form-control" id="lastName"
                                             value={this.state.lastName} 
                                            onChange={this.OnPropertyChange.bind(this)}
                                            name="lastName"/>
                                        </div>

                                        <div className="form-group col-md-6">
                                            <label htmlFor="gender"> Gender </label>
                                            <select className="form-control" id="gender"
                                                onChange={this.OnPropertyChange.bind(this)}
                                                value={this.state.gender}
                                                name="gender" >
                                                <option value="Male"> Male </option>
                                                <option value="Female">Female</option>
                                            </select>
                                        </div>

                                        <div className="form-group col-md-6">
                                            <label htmlFor="dob"> Date of Birth </label>
                                            <input type="date" id="dob" className="form-control" 
                                             value={this.state.dob}
                                            onChange={this.OnPropertyChange.bind(this)}
                                            name="dob"/>
                                        </div>

                                        <div className="form-group col-md-6">
                                            <label htmlFor="age"> Age </label>
                                            <input type="text" id="age" className="form-control"
                                             value={this.state.age} 
                                            onChange={this.OnPropertyChange.bind(this)}
                                            name="age"/>
                                        </div>

                                        <div className="form-group col-md-12">
                                            <label htmlFor="flatNo"> Address </label>
                                        </div>
                                        <div className="form-group col-md-3">
                                            <label htmlFor="flatNo"> Flat No </label>
                                            <input type="text" id="flatNo" className="form-control"
                                             value={this.state.flatNo}
                                            onChange={this.OnPropertyChange.bind(this)}
                                            name="flatNo"/>
                                        </div>

                                        <div className="form-group col-md-4">
                                            <label htmlFor="societyName"> Society Name</label>
                                            <input type="text" id="societyName" className="form-control"
                                             value={this.state.societyName}
                                            onChange={this.OnPropertyChange.bind(this)}
                                            name="societyName"/>
                                        </div>

                                        <div className="form-group col-md-5">
                                            <label htmlFor="areaName"> Area Name</label>
                                            <input type="text" id="areaName" className="form-control" 
                                             value={this.state.areaName}
                                            onChange={this.OnPropertyChange.bind(this)}
                                            name="areaName"/>
                                        </div>

                                        <div className=" form-group col-md-6"> 
                                            <label htmlFor="city"> City </label>
                                            <input type="text" id="city" className="form-control" 
                                             value={this.state.city}
                                            onChange={this.OnPropertyChange.bind(this)}
                                            name="city"/>
                                        </div>

                                        <div className="form-group col-md-6">
                                            <label htmlFor="state"> State</label>
                                            <input type="text" id="state" className="form-control" 
                                             value={this.state.state}
                                            onChange={this.OnPropertyChange.bind(this)}
                                            name="state"/>
                                        </div>

                                        <div className="form-group col-md-6"> 
                                            <label htmlFor="pin"> PIN </label>
                                            <input type="text" id="pin" className="form-control" 
                                             value={this.state.pin}
                                            onChange={this.OnPropertyChange.bind(this)}
                                            name="pin"/>
                                        </div>

                                        <div className="form-group col-md-6"> 
                                            <label htmlFor="email"> Email </label>
                                            <input type="text" id="email" className="form-control" 
                                             value={this.state.email}
                                            onChange={this.OnPropertyChange.bind(this)}
                                            name="email"/>
                                        </div>

                                        <div className="form-group col-md-6"> 
                                            <label htmlFor="phone"> Phone No </label>
                                            <input type="text" id="pin" className="form-control" 
                                             value={this.state.phone}
                                            onChange={this.OnPropertyChange.bind(this)}
                                            name="phone" />
                                        </div>

                                        <div className="form-group col-md-6"> 
                                            <label htmlFor="phone"> Mobile No </label>
                                            <input type="text" id="mobile" className="form-control" 
                                             value={this.state.mobile}
                                            onChange={this.OnPropertyChange.bind(this)}
                                            name="mobile"/>
                                        </div>

                                        <div className="form-group col-md-6">
                                            <label htmlFor="physicalDisablity"> Physical Disability</label>
                                            <input type="text" id="physicalDisablity" className="form-control" 
                                             value={this.state.physicalDisablity}
                                            onChange={this.OnPropertyChange.bind(this)}
                                            name="physicalDisablity"/>
                                        </div>

                                        <div className="form-group col-md-6">
                                            <label htmlFor="maritalStatus"> Marital Status</label>
                                            <select name="maritalStatus" id="maritalStatus" className="form-control"
                                                 value={this.state.maritalStatus}
                                                onChange={this.OnPropertyChange.bind(this)}>
                                                <option value="Unmarried"> Unmarried </option>
                                                <option value="Married"> Married </option>
                                            </select>
                                        </div>

                                        <div className="form-group col-md-6">
                                            <label htmlFor="educationStatus"> Educational</label>
                                            <input type="text" id="education" className="form-control" 
                                             value={this.state.education}
                                            onChange={this.OnPropertyChange.bind(this)}
                                            name="education"/>
                                        </div>

                                        <div className="form-group col-md-6">
                                            <label htmlFor="birthSign"> Birth Sign</label>
                                            <input type="text" id="birthSign" className="form-control" 
                                             value={this.state.birthSign}
                                            onChange={this.OnPropertyChange.bind(this)}
                                            name="birthSign"/>
                                        </div>

                                        <input type="button" value="Submit" className="btn btn-success" onClick={this.onClickSubmit.bind(this)}/>
                                        <input type="button" value="Clear" className="btn btn-primary" onClick={this.onClickClear.bind(this)}/>
                                        
                                    </div>    
                            </form>

                        </div>
                    </div>
                </div>

                <FooterComponent/>
            </div>
         );
    }
}
 
export default PersoninfoComponent;