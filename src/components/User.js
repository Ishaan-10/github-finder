import { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { finderContext } from '../App';
import { Link } from 'react-router-dom';
import Repo from './Repo';

const User = () => {

    const query = useParams();
    const [loadingData, setLoadingData] = useState(false);
    const {
        getUser,
        user,
        repos,
        getUserRepo
    } = useContext(finderContext);
    const {
        name,
        login,
        avatar_url,
        bio,
        location,
        blog,
        html_url,
        followers,
        following,
        public_repos,
        public_gists,
        hireable,
    } = user;

    useEffect(() => {

        setLoadingData(true);
        getUser(query.login);
        getUserRepo(query.login);
        setLoadingData(false);
    }, [])

    if (loadingData) return (
        <h2>Loading....</h2>
    );
    else {
        return (
            <>
                <Link to="/" className="btn" style={{margin:"10px 50px"}}>Back to search</Link>
                Hireable :{''}
                {hireable ? <i className="fas fa-check test-sucess" /> : <i className="fas fa-times-circle text-danger" />}
                <div className="card grid-2" style={{margin:"10px 50px"}}>
                    <div className="all-center">
                        <img src={avatar_url} alt="" style={{ width: "150px", height: "auto" }} />
                        <h1>{name}</h1>
                        {location && <p>Location:{location}</p>}
                    </div>
                    <div>
                        {bio &&
                            <>
                                <h3>Bio</h3>
                                <p>{bio}</p>
                            </>
                        }
                        <a href={html_url} className="btn btn-dark my-1" >Visit Github Profile</a>
                        <ul>
                            <li>
                                {login &&
                                    <>
                                        <strong>Username </strong>{login}
                                    </>
                                }
                            </li>
                            <li>
                                {blog &&
                                    <>
                                        <strong>Blog Site </strong>{blog}
                                    </>
                                }
                            </li>
                        </ul>
                    </div>

                </div>
                <div className="card text-center" style={{margin:"10px 50px"}}>
                    <div className="badge badge-primary">
                        Followers:{followers}
                    </div>
                    <div className="badge badge-success">
                        Following:{following}
                    </div>
                    <div className="badge badge-light">
                        Public Repos:{public_repos}
                    </div>
                    <div className="badge badge-dark">
                        Public Gists:{public_gists}
                    </div>

                </div>
                
                <h1 style={{margin:"10px 50px"}}>Top Repos</h1>
                {repos && repos.map(repo=>{
                        console.log(repo)
                        return <Repo repo={repo} key={repo.id} />
                    })}
                    
                
            </>
        );

    }



}

export default User;