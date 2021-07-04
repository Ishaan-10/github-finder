import {useEffect} from 'react';
import {useParams} from 'react-router-dom';

const User = (props) => {

    const query = useParams();
    useEffect(()=>{

        const fetchData = async ()=> {
        await props.getUser(query.login);
        console.log(props.user);
        }

        fetchData();
    },[])
    return ( 
        <div>
            <h1>{props.user.login}</h1>
        </div>
     );
}
 
export default User; 