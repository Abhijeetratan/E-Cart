import React from 'react'
import axios from 'axios'
import url from './url'

export default class Signup extends React.Component {
    constructor() {
        super()
        this.state = {
            status: ''
        }
    }

    render() {
        return (
            <div align='center'>
                <h3>{this.state.status}</h3>
                <form onSubmit={this.signup} className='btn btn-outline-light text-dark w-50'>
                    <h3 className='text-primary'>Signup User</h3>
                    <div className='form-group my-2 btn btn-outline-info p-3 w-75'>
                        <label className='float-left'>User id </label>
                        <input type='text' placeholder='Enter User id' className='form-control' name='u_id'></input>
                    </div>
                    <div className='form-group my-2 btn btn-outline-info p-3 w-75'>
                        <label className='float-left'>Username</label>
                        <input type='text' placeholder='Enter User name' className='form-control' name='u_name'></input>
                    </div>
                    <div className='form-group my-2 btn btn-outline-info p-3 w-75'>
                        <label className='float-left'>Password</label>
                        <input type='password' placeholder='Enter Password' className='form-control' name='u_pwd'></input>
                    </div>
                    <div className='form-group my-2 btn btn-outline-info p-3 w-75'>
                        <label className='float-left'>Email</label>
                        <input type='email' placeholder='Enter User email' className='form-control' name='u_email'></input>
                    </div>
                    <div className='form-group my-2 w-25 mx-auto' align='center'>
                        <input type='submit' className='btn btn-outline-success' value='Signup'></input>
                    </div>
                </form>
            </div>
        )
    }

    signup = (e) => {
        e.preventDefault()
        let obj = {
            u_id: e.target.u_id.value,
            u_name: e.target.u_name.value,
            u_pwd: e.target.u_pwd.value,
            u_email: e.target.u_email.value
        }
        axios.post(url + "/insert/addUser", obj)
            .then((posRes) => {
                console.log(posRes.data)
                this.setState({
                    status: posRes.data.UserInsert
                })
            })
            .catch((err) => {
                console.log(err)
                this.setState({
                    status: 'Error: Unable to sign up user. Please try again later.'
                })
            })
    }
}
