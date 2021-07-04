import PropTypes from 'prop-types'
import {Link} from 'react-router-dom';
const UserItem = ({user}) => {

    const state = user
    return ( 
        <div className= "card text-center">
                <img className="round-img" src={state.avatar_url} alt="" style={{width:"60px"}}/>
                <h3>{state.login}</h3>

                <div>
                    <Link to={`/user/${user.login}`} className="btn btn-dark btn-sm my-1">View</Link>
                </div>
        </div>
     );
     
}

UserItem.propTypes = {
    user: PropTypes.object.isRequired,
}
 
export default UserItem;