import React, {Component} from 'react'
import Input from "./Input";
import EmptyBlog from "./EmptyBlog";
import PostsList from "./posts/PostsList";
import PropTypes from 'prop-types';
import {connect} from "react-redux";


const mapStateToProps = state => {
    return {
        posts: state.blog,
        user: state.user
    }
};

@connect(mapStateToProps)
class Blog extends Component {
    render() {
        const input = this.props.user !== null && <Input />;
        let content = null;

        if (this.props.posts.length === 0)
            content = <EmptyBlog />;
        else
            content = <PostsList posts={this.props.posts}/>;

        return (
            <div className='jumbotron'>
                {input}
                <div>
                    {content}
                </div>
            </div>
        )
    }
}

Blog.propTypes = {
    user: PropTypes.string,
    posts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired
        })
    )
};

export default Blog;
