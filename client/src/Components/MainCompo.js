import React from 'react';
import axios from 'axios';
import url from './url';
import Header from './Header';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class MainCompo extends React.Component {
    constructor() {
        super();
        this.state = {
            products: [],
            cart: [],
            status: '',
            login: false,
            user: '',
        };
    }

    componentDidMount() {
        this.fetchProducts();
        this.fetchCart();
    }

    render() {
        return (
            <div className="container-fluid">
                {!this.state.login ? (
                    <div className="login-form">
                        <form onSubmit={this.login}>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input type="text" id="username" placeholder="Enter username" className="form-control" name="u_name" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" id="password" placeholder="Enter password" className="form-control" name="u_pwd" required />
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div>
                        <button onClick={this.logout} className='btn btn-outline-danger float-right'>Logout</button>
                        <Header />
                        <div className='h4 text-info mb-2' align="right">
                            Total amount: {this.calculateTotal()}
                            <button onClick={this.buyNow} className='btn btn-outline-success mx-2'>Buy Now</button>
                        </div>
                        <div className='row'>
                            <div className='col-10'>
                                <div className='row row-cols-3 my-3'>
                                    {this.state.products.map((product, index) => (
                                        <div className='col my-3' key={index}>
                                            <div className='card h-100'>
                                                <div className='card-header'>
                                                    <img src={product.p_img} className='card-img-top img-fluid' alt={product.p_name} style={{ maxHeight: '350px' }} />
                                                </div>
                                                <div className='card-body'>
                                                    <h2 className='card-title'>{product.p_name}</h2>
                                                    <h4 className='card-subtitle text-muted'>{product.p_cost}</h4>
                                                </div>
                                                <div className='card-footer'>
                                                    <button onClick={() => alert(product.p_desc)}
                                                        className="btn btn-outline-info btn-block btn-sm"
                                                        data-toggle="tooltip"
                                                        data-placement="bottom"
                                                        title={product.p_desc}>Learn More</button>
                                                    <button onClick={() => this.addToCart(product)} className="btn btn-outline-success btn-block btn-sm">Add to Cart</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='col'>
                                <div className='row my-3'>
                                    {this.state.cart.map((item, index) => (
                                        <div className='my-3' key={index}>
                                            <div className='card'>
                                                <div className='card-header'>
                                                    <img src={item.p_img} className='card-img-top img-fluid' alt={item.p_name} style={{ maxHeight: '150px' }} />
                                                </div>
                                                <div className='card-body'>
                                                    <h2 className='card-title'>{item.p_name}</h2>
                                                    <h4 className='card-subtitle text-muted'>{item.qty}</h4>
                                                </div>
                                                <div className='card-footer'>
                                                    <button onClick={() => this.reduce(item)} className="btn btn-outline-success btn-block btn-sm">Reduce</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    fetchProducts = () => {
        axios.get(url + '/fetch')
            .then((posRes) => {
                this.setState({
                    products: posRes.data,
                    status: ''
                });
            })
            .catch((errRes) => {
                console.log(errRes);
            });
    }

    fetchCart = () => {
        axios.post(url + "/fetch/fetchCart", { "uname": window.sessionStorage.getItem('user') })
            .then((posRes) => {
                this.setState({
                    cart: posRes.data,
                    user: window.sessionStorage.getItem('user')
                });
            })
            .catch((errRes) => {
                console.log(errRes);
            });
    }

    addToCart = (item) => {
        const existingItem = this.state.cart.find((cartItem) => cartItem.p_id === item.p_id);
    
        if (existingItem) {
            const updatedQuantity = existingItem.qty + 1;
            const updateObj = {
                u_name: this.state.user,
                p_id: existingItem.p_id,
                qty: updatedQuantity,
            };
    
            axios.post(url + "/update/updateCart", updateObj)
                .then((res) => {
                    const updatedCart = this.state.cart.map((cartItem) => {
                        if (cartItem.p_id === updateObj.p_id) {
                            return { ...cartItem, qty: updatedQuantity };
                        }
                        return cartItem;
                    });
                    this.setState({ cart: updatedCart, status: 'Update ' + res.statusText });
                })
                .catch((error) => {
                    console.error('Error updating cart:', error);
                    this.setState({ status: error.message });
                });
        } else {
            const newItem = {
                u_name: this.state.user,
                p_name: item.p_name,
                p_id: item.p_id,
                qty: 1,
                p_cost: item.p_cost,
                p_img: item.p_img,
            };
    
            axios.post(url + "/insert/cartInsert", newItem)
                .then((res) => {
                    this.setState((prevState) => ({ 
                        cart: [...prevState.cart, newItem], 
                        status: 'Record ' + res.statusText 
                    }));
                })
                .catch((error) => {
                    console.error('Error adding to cart:', error);
                });
        }
    
        this.setState({ total: this.calculateTotal() });
    }
    

    buyNow = () => {
        alert('Thank you for doing business with us! Total amount: ' + this.calculateTotal());
        const deletePromises = this.state.cart.map((item) => {
            return axios.delete(url + "/cart/" + item.id)
                .then((posRes) => {
                    console.log(posRes);
                    this.setState((prevState) => ({
                        cart: prevState.cart.filter((cartItem) => cartItem.id !== item.id),
                        status: 'Delete ' + posRes.statusText
                    }));
                })
                .catch((errRes) => {
                    console.error(errRes);
                    this.setState({ status: errRes.message });
                });
        });

        Promise.all(deletePromises)
            .then(() => {
                console.log('All cart items deleted');
            })
            .catch((error) => {
                console.error('Error deleting cart items:', error);
            });
    }

    reduce = (item) => {
        if (item.qty === 1) {
            axios.post(url + "/delete/deleteCart", { u_name: this.state.user, p_id: item.p_id })
                .then((posRes) => {
                    console.log(posRes);
                    this.setState((prevState) => ({
                        cart: prevState.cart.filter((cartItem) => cartItem.p_id !== item.p_id),
                        status: 'Delete ' + posRes.statusText
                    }));
                })
                .catch((errRes) => {
                    console.error(errRes);
                    this.setState({ status: errRes.message });
                });
        } else {
            const updatedQuantity = item.qty - 1;
            const updateObj = {
                u_name: this.state.user,
                p_id: item.p_id,
                qty: updatedQuantity,
            };

            axios.post(url + "/update/updateCart", updateObj)
                .then((posRes) => {
                    const updatedCart = this.state.cart.map((cartItem) => {
                        if (cartItem.p_id === updateObj.p_id) {
                            return { ...cartItem, qty: updatedQuantity };
                        }
                        return cartItem;
                    });
                    this.setState({ cart: updatedCart, status: 'Update ' + posRes.statusText });
                })
                .catch((errRes) => {
                    console.error(errRes);
                    this.setState({ status: errRes.message });
                });
        }
    
        this.setState({ total: this.calculateTotal() });
    }

    calculateTotal = () => {
        return this.state.cart.reduce((total, item) => {
            return total + item.qty * item.p_cost;
        }, 0);
    }

    login = (e) => {
        e.preventDefault();
        const username = e.target.u_name.value;
        const password = e.target.u_pwd.value;

        axios.post(url + "/fetch/login", { u_name: username, u_pwd: password })
            .then((posRes) => {
                if (posRes.data.auth === 'success') {
                    this.setState({
                        login: true,
                        user: username
                    });
                    window.sessionStorage.setItem('user', username);
                }
            })
            .catch((errRes) => {
                console.log(errRes);
            });
    }

    logout = () => {
        this.setState({
            login: false,
            user: ''
        });
        window.sessionStorage.removeItem('user');
    }
}
