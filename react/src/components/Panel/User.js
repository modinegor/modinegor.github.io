import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {Link} from "react-router-dom";
import {userLogOut} from "../../actions/userActions";
import {connect} from "react-redux";


const mapDispatchToProps = dispatch => {
    return {
        userLogout: () => {
            dispatch(userLogOut())
        }
    }
};

@connect(null, mapDispatchToProps)
class User extends Component {
    state = {
        showLogout: false
    };

    render() {
        let content = null,
            show = this.state.showLogout ? 'show' : '';

        if (this.props.user === null)
            content = <Link to='/login'>login</Link>;
        else
            content = (
                <div className={'dropdown ' + show}>
                    <span className='dropdown-toggle pointer-cursor'
                          onClick={this.handleShowLogout}>
                        {this.props.user}
                    </span>
                    <div className={'dropdown-menu ' + show}>
                        <span className='dropdown-item pointer-cursor'
                              onClick={this.handleLogout}>logout</span>
                    </div>
                </div>
            );

        return (
            <div className='user-section text-light'>
                {content}
            </div>
        )
    }

    handleShowLogout = () => {
        this.setState({
            showLogout: !this.state.showLogout
        })
    };

    handleLogout = () => {
        this.setState({
            showLogout: false
        });

        this.props.userLogout();
    };
}

User.propTypes = {
    user: PropTypes.string,
    userLogout: PropTypes.func
};

export default User;
