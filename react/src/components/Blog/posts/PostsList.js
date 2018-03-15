import React, {Component} from 'react'
import PropTypes from 'prop-types';
import Post from "./Post";


export default class PostsList extends Component {
    render() {
        const postElements = this.props.posts.map(post =>
            <li key={post._id} style={{listStyle: 'none'}}>
                <Post post={post}/>
            </li>
        );

        return (
            <ul>
                {postElements}
            </ul>
        )
    }
};

PostsList.propTypes = {
    posts: PropTypes.array.isRequired
};
