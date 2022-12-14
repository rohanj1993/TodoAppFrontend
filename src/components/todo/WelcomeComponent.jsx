import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import HelloWorldService from '../../api/todo/HelloWorldService.js'

class WelcomeComponent extends Component {
    constructor(props){
        super(props)
        this.retriveClicked = this.retriveClicked.bind(this)
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this)
        this.handleError = this.handleError.bind(this)
        this.state = {
            welcomeMessage : ""
        }
    }

    retriveClicked() {
        //console.log("Retrive Clicked")
        //HelloWorldService.executeHelloWorldService()
        //.then( response => this.handleSuccessfulResponse(response))
        //.catch()

        //HelloWorldService.executeHelloWorldBeanService()
        //.then( response => this.handleSuccessfulResponse(response))

        HelloWorldService.executeHelloWorldPathVariableService(this.props.match.params.uname)
        .then( response => this.handleSuccessfulResponse(response))
        .catch( error => this.handleError(error))
    }

    handleSuccessfulResponse(response)
    {
        this.setState({
            welcomeMessage : response.data.message
        })
    }

    handleError(error)
    {
        console.log(error.response)
        let errorMessage = ''

        if(error.message)
            errorMessage += error.message;

        if(error.response && error.response.data)
            errorMessage += error.response.data.message;

        this.setState({
            welcomeMessage : errorMessage
        })

    }

    render() {
        return (
            <>
                <h1>Welcome!</h1>
                <div className="container">
                    Welcome {this.props.match.params.uname}. 
                    You can manage your todos <Link to="/todos">here</Link>.
                 </div>
                 <div className="container">
                    Click here to get a customized message. 
                    <button className="btn btn-success" onClick={this.retriveClicked}>Get Welcome Message</button>
                 </div>
                 <div className="container">
                    {this.state.welcomeMessage}
                 </div>
            </>
        )
    }

}

export default WelcomeComponent