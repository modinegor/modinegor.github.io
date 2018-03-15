import React, {Component} from 'react'
import PropTypes from 'prop-types';


class Post extends Component {
    render() {
        return (
            <div className='card'>
                <div className='card-header'>
                    <span className='pointer-cursor'
                          title={`Filter by user ${this.props.post.user}`}>
                        {this.props.post.user}
                    </span>
                    <span> @ </span>
                    <time>{this.props.post.date}</time>
                </div>
                <div className="card-body">{this.props.post.text}</div>
            </div>
        )
    }
}

Post.propTypes = {
    post: PropTypes.shape({
        _id: PropTypes.number.isRequired,
        date: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        user: PropTypes.string.isRequired
    })
};

export default Post;
