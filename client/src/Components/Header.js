import React from "react";
import './style.css'

export default class Header extends React.Component{   
    constructor(){
        super()
        this.state = {
            user: window.sessionStorage.getItem('user'),
            wish: '',
            stl: ''
        }
    } 

    componentDidMount(){
        this.setGreeting();
    }

    setGreeting() {
        let date = new Date().getHours();
        
        if (date < 12) {
            this.setState({
                stl: 'mrng',
                wish: 'Good Morning'
            });
        } else if (date < 16) {
            this.setState({
                stl: 'aftr',
                wish: 'Good Afternoon'
            });
        } else if (date < 20) {
            this.setState({
                stl: 'eve',
                wish: 'Good Evening'
            });
        }
    }

    render(){    
        return(
            <div>
                <h1 className={this.state.stl}>{this.state.wish} {this.state.user}</h1>
            </div>
        )
    }
}
