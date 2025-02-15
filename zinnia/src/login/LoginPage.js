/**
This js is for login page.
It will link to registration, forgetPw ,admin and User Home Page 
according to users' action
*/

import React from "react";
import {Link,useNavigate} from "react-router-dom";

class LoginPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {email: "",
                      passport: ""
                    }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(event){
        this.setState({[event.target.name]:event.target.value})
    }
    handleSubmit(event){
        event.preventDefault();
        console.log(this.state.email);
        console.log(this.state.password);
        if (this.state.email === "" || this.state.password === ""){
            window.alert("Please fill in all the blanks")
        } else {
            fetch("http://localhost:8080/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: this.state.email, password: this.state.password }),
                mode: 'cors'
            })
            .then(response => {
                response.json().then(df => {
                    window.alert(df.msg)
                })
            })
        }
    }

    render(){
        return(
            <>
            <div >
                <br/>
                <h3 className ="d-flex justify-content-center">ZINNIA</h3>
                <br/>
                <div className = "d-flex justify-content-center align-middle">
                    <form onSubmit = { this.handleSubmit }>
                        <label>
                            Email:
                            <input type='email' name='email' value ={this.state.email} onChange={ this.handleChange } className='form-control' />
                        </label>
                        <br/>
                        <label>
                            Password:
                            <input type='password' name='password' value ={this.state.password} onChange={this.handleChange} className='form-control' />
                        </label>
                        <br/><br/>
                        <div className="d-flex justify-content-center">
                        <button type = 'submit'  className = "button">Login</button>
                        </div>
                        
                    </form>
                </div>
                
                <br/>
                <div className="d-flex justify-content-center">
                    <li><Link to="/registration" >Don't have an account?</Link></li>
                    <li><Link to="/forgotPassword" >Forgot Password?</Link></li>
                </div>
                <div className="d-flex justify-content-center">
                    <li><Link to="/admin" >Temporary Link for AdminPage</Link></li>
                </div>
            </div>    
            </>
        )
    }



}

/* function LoginPage(){
    let navigate = useNavigate()
    const handleSubmit= ()=>{
        navigate("/user")
    }
    return(
        <>
        <div >
            <br/>
            <h3 className ="d-flex justify-content-center">ZINNIA</h3>
            <br/>
            <div className = "d-flex justify-content-center align-middle">
                <form onSubmit={handleSubmit}>
                    <label>
                        Username:
                        <input type='text' className = 'form-control' />
                    </label>
                    <br/>
                    <label>
                        Password:
                        <input type='password' className = 'form-control' />
                    </label>
                    <br/><br/>
                    <div className="d-flex justify-content-center">
                    <button type = 'submit'  className = "button">Login</button>
                    </div>
                    
                </form>
            </div>
            
            <br/>
            <div className="d-flex justify-content-center">
                <li><Link to="/registration" >Don't have an account?</Link></li>
                <li><Link to="/forgotPassword" >Forgot Password?</Link></li>
            </div>
            <div className="d-flex justify-content-center">
                <li><Link to="/admin" >Temporary Link for AdminPage</Link></li>
            </div>
        </div>    
        </>
    )
}
 */


export default LoginPage

