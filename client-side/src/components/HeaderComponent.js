import React, {Component} from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css';

class HeaderComponent extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            adminAuth:false,
            operatorAuth:false,
            accessUserAuth:false
         }

        this.token = sessionStorage.getItem("token");
        this.roleId = sessionStorage.getItem("roleId");
        this.userName = sessionStorage.getItem("userName");
       
        if(this.token==="" || this.token===null || this.roleId==="" || this.roleId===null){
            var h = this.props.history;
            h.push('/login');
        }

        if(this.roleId==="101"){
            this.state.adminAuth = true;
        }
        else if(this.roleId==="102"){
            this.state.operatorAuth = true;
        }
        else if(this.roleId==="103"){
            this.state.accessUserAuth = true;
        }
    }

    render() { 
        return ( 
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <ul className="nav navbar-nav">
                        <li ><a href="/home">Home</a></li>
                        { this.state.adminAuth ?
                             <li><a href="/role">Roles</a></li> : null
                        }

                        { this.state.adminAuth || this.state.operatorAuth ?
                             <li><a href="/users">Add Users</a></li> : null 
                        }
                        { this.state.adminAuth || this.state.operatorAuth ?
                              <li><a href="/userslist">Show Userslist</a></li> : null
                        }
                        { this.state.adminAuth ?
                             <li className="dropdown"><a className="dropdown-toggle" data-toggle="dropdown">Personal Info<span className="caret"></span></a>
                                <ul className="dropdown-menu">
                                    <li><a href="/personinfolist/pending">Pending</a></li>
                                    <li><a href="/personinfolist/rejected">Rejected</a></li>
                                    <li><a href="/personinfolist/approved">Approved</a></li>
                                </ul>
                            </li> : null
                        }
                        { this.state.accessUserAuth ?
                              <li><a href="/mypersonalinfo">My PersonalInfo</a></li> : null
                        }
                    </ul>
                    
                    <ul className="nav navbar-nav logout-menu">
                        <li className="dropdown"><a className="dropdown-toggle" data-toggle="dropdown">Hello {this.userName}<span className="caret"></span></a>
                            <ul className="dropdown-menu">
                                <li ><a href="/logout">Logout</a></li>
                            </ul>
                        </li>
                         
                    </ul>
                </div>
            </nav>
         );
    }
}
 
export default HeaderComponent;