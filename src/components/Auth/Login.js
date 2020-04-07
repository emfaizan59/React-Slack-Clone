import React from 'react'
import {Icon,Message, Grid, Form, Segment, Header, Button} from 'semantic-ui-react'
import './auth.css'
import firebase from 'firebase/app'
import {Link} from 'react-router-dom'
class Login extends React.Component {
    state = {
        email : '',
        password : '',
        loading : false,
        errors : [],
        success : ''
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.setState({errors : [] , loading : true})
        
        if(this.formValid())
        {
 
          firebase
          .auth()
          .signInWithEmailAndPassword(this.state.email,this.state.password)
          .then(signedInUser => {
              console.log(signedInUser)
              this.setState({loading:false , success : "Succesfully Login" , email : '' , password : ''})
          })
          .catch(err => {
              let error ={message : err.message}
              console.log(error)
              this.setState({errors: this.state.errors.concat(err) , loading:false})
         
            })
        }
    }

     formValid = () => {

        if(this.state.email === '' || this.state.password === '')
        {
            this.setState({errors : this.state.errors.concat({message :"Fill all the Fields"}) , loading : false})
            console.log("Not Send")
            return false
        }
        else 
        {
            console.log("Send")
            return true
        }
 
        }

        handleChange = (event) => {
            this.setState({ [event.target.name] : event.target.value})
        }

displayErrors = (errors) => {
    return errors.map( (err , i) => <p key={i}>{err.message}</p>)
}

    render()    {
        
     const {email , password , loading} = this.state
        return(
            <div>
                <Grid textAlign="center" verticalAlign="middle" className="register" >
                <Grid.Column style={{maxWidth:400}} >
                <Header as="h2" icon color="blue" textAlign="center">
                <Icon name="user circle" icon color="blue" textAlign="center" />
                    Log yourself in !
                </Header>
                <Form large onSubmit={this.handleSubmit}>
                    <Segment stacked>
                        <Form.Input fluid name="email" value={email} icon="mail" onChange={this.handleChange} iconPosition="left" type="text" placeholder="Email" />
                        <Form.Input fluid name="password" value = {password} icon="lock"  onChange={this.handleChange} iconPosition="left" type="password" placeholder="Password" />
                        <Button disabled={loading} className={this.state.loading ? 'loading' : ""}  fluid size="large" color="blue">Login</Button>
                    </Segment>
                </Form>
            {this.state.errors.length > 0 ? 
                <Message color="red" >
                    {this.displayErrors(this.state.errors)}
                </Message>
                : null }
                
            {this.state.success.length > 0 ? 
                <Message color="green" >
                        {this.state.success}
                </Message>
                : null }

                <Message>
                    Not a User ? <Link to="/register" >Register Yourself</Link> 
                </Message>
                </Grid.Column>
                </Grid>
            </div>
        )
    }
}


export default Login