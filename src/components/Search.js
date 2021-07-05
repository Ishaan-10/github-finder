import {useState} from 'react';
import { useContext } from 'react';
import { finderContext } from '../App';
import Alert from './Alert';

const Search = (props) => {




    const [search, setSearch] = useState('');
    const {sendAlert} = useContext(finderContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(search===''){
            sendAlert('Please enter something','light');
        }else{
            props.searchUsers(search);            
        }
    }


    return ( 
        <div className="container">
            <h1>Search</h1>
            {props.alert && <Alert />}
            <form onSubmit={handleSubmit} className='form'>
                <input type="text" 
                name="text" 
                value={search}
                placeholder="Search Users..." 
                onChange={(e) => {
                    setSearch(e.target.value)
                }}
                />
                <input type="submit" value="Search" className="btn btn-dark btn-block" />
            </form>
            {props.showClear && <button className="btn btn-light btn-block" onClick={()=>{
                props.clearUsers()
                setSearch('');
            }}>Clear Users</button>}
        </div>
     );
}
 
export default Search;