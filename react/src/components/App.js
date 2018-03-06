import React, {Component} from "react";
import Store from "../redux/store"
import Main from "./main/Main"
import UserPanel from "./user/UserPanel";
import actions from "../redux/actions";


const store = new Store();

export default class App extends Component {
    constructor(props) {
        super(props);

        store.subscribe(this.handleLogin,   actions.user.USER_LOGIN);
        store.subscribe(this.handleLogin,   actions.user.USER_SIGN_OUT);
        store.subscribe(this.handleAddPost, actions.posts.POST_ADD_NEW);
        store.subscribe(this.handleFilter,  actions.posts.POST_FILTER_USER);
    }

    state = store.getState();

    render() {
        let posts = this.state.posts;

        if (this.state.filtered) {
            posts = posts.filter(post => {
                return post.user === this.state.filtered;
            })
        }

        return (
            <div className="container">
                <div className='jumbotron'>
                    <h1 className='display-4'>React Blog</h1>
                </div>
                <div>
                    <Main posts={posts} user={this.state.user} filtered={this.state.filtered}/>
                    <UserPanel user={this.state.user}/>
                </div>
            </div>
        )
    }

    handleLogin = () => {
        this.setState({user: store.getState().user})
    };

    handleAddPost = () => {
        this.setState({posts: store.getState().posts})
    };

    handleFilter = () => {
        this.setState({filtered: store.getState().filtered})
    }
}
