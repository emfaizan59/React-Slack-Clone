import React from 'react'
import {Link} from 'react-router-dom'
import './auth.css'
import md5 from 'md5';
import firebase from '../../firebase'
import {Grid, Button ,Segment, Header, Message , Form, Icon } from 'semantic-ui-react'
class Register extends React.Component {
    state = {

        username : '',
        email: '',
        password: '',
        confirmPassword: '',
        errors : [],
        loading : false ,
        userRef : firebase.database().ref("users"),
        success : ''
    }
    
    isFormValid = () => {
        let errorArr = []
        let error
        if(this.isFormEmpty())
        {

             error = {Message : "Fill all the Fields"}
   
            this.setState({errors : errorArr.concat(error) })
                return false
        }   
        else if(!this.isPassValid())
        {
         
            error = {Message : "Password Invalid"}
            this.setState({errors : errorArr.concat(error) })
            return false
        }
        else 
        {
            this.setState({errors : []})
            return true
        }
    }

    isFormEmpty = () => {
        if(this.state.username.length > 0 && this.state.email.length > 0 && this.state.password.length > 0 && this.state.confirmPassword.length > 0)
        {
            return false
        }
        else 
        { return true}
    }

    isPassValid = () => {

        if(this.state.password.length < 6 || this.state.confirmPassword < 6)
        {
            return false
        }
        else if(this.state.password !== this.state.confirmPassword)
        {
            return false
        }
        else{
            return true
        }

    }

    handleChange = event => {
        this.setState({ [event.target.name] : event.target.value})
    }
    handleSubmit = (event) => {
    if(this.isFormValid())
    {
        this.setState({errors : [], loading : true , success : ''})

        event.preventDefault()
        firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email , this.state.password)
        .then(createdUser => {
            console.log(firebase.auth().currentUser)
            
            
            firebase.auth().currentUser.updateProfile({
                displayName : this.state.username ,
                photoURL : `https://gravatar.com/avatar/${md5(firebase.auth().currentUser.email)}?d=identicon`
            })         
            .then(() => {
            // this.setState({username:'', password:'', email:'', confirmPassword:'', loading: false})
            let createUser = firebase.auth().currentUser
            this.saveUser(createUser).then( () => {
                console.log("User Saved")
                // this.setState({loading : false})
            this.setState({username:'', password:'', email:'', confirmPassword:'', loading: false , success : "Successfully Registered"})

            })

            }).catch(err => {
                let error = {Message : err.message}
                this.setState({errors : this.state.errors.concat(error),loading : false})         
            })

            .catch(err => {
                let error = {Message : err.message}
                this.setState({errors : this.state.errors.concat(error),loading : false})         
            }) 
            
        })
        .catch(err => {
        console.log(err)
        let error = {Message : err.message}
        this.setState({errors : this.state.errors.concat(error),loading : false})
        })
    }
}   

saveUser = createUser => {
    return this.state.userRef.child(createUser.uid).set({
        displayName : createUser.displayName,
        avatar : createUser.photoURL
    })
}


displayErrors = errors => errors.map( (error, i) => <p key={i}>{error.Message}</p>)

// handleInputError = (errors , inputName) => {
    
//     return errors.some(error => error.message.toLowerCase().inludes(inputName)) ? 
//     "error" : ""
// }

    render()    {

      const {username , password , email , confirmPassword, loading} = this.state
        return(
            <div>
                <Grid textAlign="center" verticalAlign="middle" className="register">
                <Grid.Column style={{maxWidth : 400}} >
                <Header as="H2" icon color ="Orange" textAlign="center">
                <Icon name ="rendact" icon color ="orange" textAlign="center"/>
                Get Yourself Registered
                </Header>
                <Form large onSubmit={this.handleSubmit}>
                <Segment>
                    <Form.Input value={username} fluid name="username" iconPosition="left" type="text" icon ="user" placeholder="Username" onChange={this.handleChange} />
                    <Form.Input  value={email} fluid name="email" type="Email" iconPosition="left" icon ="mail" placeholder="Email" onChange={this.handleChange} />
                    <Form.Input value={password} fluid name="password" type="password" iconPosition="left" icon ="lock" placeholder="Password" onChange={this.handleChange} />
                    <Form.Input value={confirmPassword} fluid name="confirmPassword" type="password" iconPosition="left" icon ="repeat" placeholder="Confirm Password" onChange={this.handleChange} />
                    

                <Button disabled={loading} className={loading ? 'loading' : ''} color ="orange" fluid size="large">Submit</Button>

                </Segment>
                </Form>
        {this.state.errors.length > 0 ?
        <Message color ="red"> 

            
            {this.displayErrors(this.state.errors)}
{/*         
       { this.state.errors.map((error , i) => {
        <p key={i}>{error.message}</p>
        })}      */}
    </Message>
    
    : null }

{this.state.success.length > 0 ?
        <Message color ="green"> 

            
            {<p>{this.state.success}</p>}
{/*         
       { this.state.errors.map((error , i) => {
        <p key={i}>{error.message}</p>
        })}      */}
    </Message>
    
    : null }

                <Message>Already a User? <Link to="/login">Login</Link></Message>
                </Grid.Column>
                </Grid>
            
            </div>
        )
    }
}


export default Register