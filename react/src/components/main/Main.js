import React, {Component} from 'react';
import Input from "./Input";
import PostsList from "./posts/PostsList";
import EmptyBlog from "./EmptyBlog";


export default class Main extends Component {
    render() {
        const input = this.props.user !== null && !this.props.filtered && <Input />;
        let content = null;

        if (this.props.posts.length === 0)
            content = <EmptyBlog />;
        else
            content = <PostsList posts={this.props.posts}/>;

        return (
            <div className='float-left' style={{marginLeft: '20%', width: '55%'}}>
                {input}
                <div>
                    {content}
                </div>
            </div>
        )
    }
}