import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
var apiBaseUrl = "http://localhost:4000/api/";
import Register from './Register';

import axios from 'axios';
class Login extends Component {
  constructor(props){
    super(props);
    var localloginComponent=[];
    localloginComponent.push(

      <MuiThemeProvider key={"theme"}>

        <div>

         <TextField
           hintText="Enter your UserName"
           floatingLabelText="UserName"
           onChange={(event,newValue) => this.setState({username:newValue})}
           />

         <br/>

           <TextField
             type="password"
             hintText="Enter your Password"
             floatingLabelText="Password"
             onChange = {(event,newValue) => this.setState({password:newValue})}
             />

           <br/>
           <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>

       </div>
       </MuiThemeProvider>
    )
    this.state={
      username:'',
      password:'',
      menuValue:1,
      loginComponent:localloginComponent,
      loginRole:'student',
      registerscreen:[],
      isLogin:true
    }
  }
  // componentWillMount(){
  // // console.log("willmount prop values",this.props);
  // if(this.props.role != undefined){
    
  //   if(this.props.role == 'student'){
  //     console.log("in student componentWillMount");
  //     var localloginComponent=[];
  //     localloginComponent.push(
  //       <MuiThemeProvider>
  //         <div>
  //          <TextField
  //            hintText="Enter your College Rollno"
  //            floatingLabelText="Student Id"
  //            onChange = {(event,newValue) => this.setState({username:newValue})}
  //            />
  //          <br/>
  //            <TextField
  //              type="password"
  //              hintText="Enter your Password"
  //              floatingLabelText="Password"
  //              onChange = {(event,newValue) => this.setState({password:newValue})}
  //              />
  //            <br/>
  //            <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
  //        </div>
  //        </MuiThemeProvider>
  //     )
  //     this.setState({menuValue:1,loginComponent:localloginComponent,loginRole:'student'})
  //   }
  //   else if(this.props.role == 'teacher'){
  //     console.log("in teacher componentWillMount");
  //     var localloginComponent=[];
  //     localloginComponent.push(
  //       <MuiThemeProvider>
  //         <div>
  //          <TextField
  //            hintText="Enter your College Rollno"
  //            floatingLabelText="Teacher Id"
  //            onChange={(event,newValue) => this.setState({username:newValue})}
  //            />
  //          <br/>
  //            <TextField
  //              type="password"
  //              hintText="Enter your Password"
  //              floatingLabelText="Password"
  //              onChange={(event,newValue) => this.setState({password:newValue})}
  //              />
  //            <br/>
  //            <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
  //        </div>
  //        </MuiThemeProvider>
  //     )
  //     this.setState({menuValue:2,loginComponent:localloginComponent,loginRole:'teacher'})
  //   }
  // }
  // }
  async handleClick(event){
   
    var payload={
      "userid":this.state.username,
	    "password":this.state.password,
      "role":this.state.loginRole
    }
    console.log(this.state.registerscreen);
    await this.setState({isLogin:false},)

    if(!this.state.isLogin){
     var registerscreen=[];
     registerscreen.push(<Register/>);
  
     var localloginComponent=[];

     await this.setState({
      registerscreen:registerscreen,
      loginComponent:localloginComponent
        })  
   }

    axios.post(apiBaseUrl+'login', payload)
   .then(function (response) {
     console.log(response);
     if(response.data.code == 200){
       console.log("Login successfull");
       var uploadScreen=[];
       //uploadScreen.push(<UploadPage appContext={self.props.appContext} role={self.state.loginRole}/>)
       //self.props.appContext.setState({loginPage:[],uploadScreen:uploadScreen})
     }
     else if(response.data.code == 204){
       console.log("Username password do not match");
       alert(response.data.success)
     }
     else{
       console.log("Username does not exists");
       alert("Username does not exist");
     }
   })
   .catch(function (error) {
     console.log(error);
   });  
  }
  render() {
    var islogin=this.state.isLogin;
    let appBar;
    if (islogin) {
      appBar=  <AppBar
      title="Login"
    />
    }else{
      appBar= <AppBar
      title="Register"
    />
    }

    return (
     

      <div>
         <MuiThemeProvider>
         {appBar}
        </MuiThemeProvider>
        
        {this.state.registerscreen}
      
        {this.state.loginComponent}
      </div>
    );
  }
}

const style = {
  margin: 15,
};

export default Login;
