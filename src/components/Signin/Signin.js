import React from 'react';

class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInLogin: '',
            signInPassword: '',
            rememberMe: false
        }
    }

    onLoginChange = (event) => {
        this.setState({signInLogin: event.target.value})
    }
    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    onClickRememberMe = () => {
        this.setState({rememberMe: true})
    }

    onSubmitSignIn = () => {
        fetch('https://pacific-beyond-36413.herokuapp.com/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                login: this.state.signInLogin,
                password: this.state.signInPassword
            })
        }) 
        .then(response => response.json())
        .then(user => {
            if(this.state.rememberMe) {
                if (user.login === 'egolf' && user.password === 'password'){
                    this.props.loadLogin(user)
                    this.props.rememberMe(user)
                    this.props.onRouteChange('Calendar')
                }
            } else if (user.login === 'egolf' && user.password === 'password'){
                this.props.loadLogin(user)
                this.props.onRouteChange('Calendar')
            } else {
                alert('Incorrect login/password. Try again.')
            }
        })
    }

    render() {
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-near-white">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="login">Login</label>
                                <input 
                                    className="pa2 input-reset ba bg-white hover-bg-black hover-white w-100" 
                                    type="login" 
                                    name="login"  
                                    id="login"
                                    value = {this.state.signInLogin}
                                    onChange={this.onLoginChange}/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input 
                                    className="b pa2 input-reset ba bg-white hover-bg-black hover-white w-100" 
                                    type="password" 
                                    name="password"  
                                    id="password" 
                                    value = {this.state.signInPassword}
                                    onChange={this.onPasswordChange}/>
                            </div>
                            <label className="pa0 ma0 lh-copy f6 pointer">
                                <input 
                                    onClick = {this.onClickRememberMe}
                                    type="checkbox"/> Remember me
                            </label>
                        </fieldset>
                        <div className="">
                            <input 
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                type="submit" 
                                value="Sign in"
                                id="submit"
                                onClick = {this.onSubmitSignIn}/>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default Signin;