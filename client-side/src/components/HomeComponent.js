import React, {Component} from 'react';
import HeaderComponent from './HeaderComponent.js';
import FooterComponent from './FooterComponent.js';

class HomeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {  }

        this.token = sessionStorage.getItem("token");
        this.roleId = sessionStorage.getItem("roleId");

        if(this.token==="" || this.token===null || this.roleId==="" || this.roleId===null){
            
            var h = this.props.history;
            h.push('/login');
        }
    }
    render() { 
        return ( 
            
            <div className="container">
                <HeaderComponent/>

                <div className="main-content">
                    <h2>Welcome in PersonalInfo Portal</h2>
                </div>
                <FooterComponent/>
            </div>
         )
    }
}
 
export default HomeComponent;