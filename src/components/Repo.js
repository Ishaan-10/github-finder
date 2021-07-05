import React from 'react'

export default function Repo({repo}) {

    const{
        name,
        html_url,
        forks_count,
    }=repo;
    return (
        <div className="card" style={{margin:"10px 50px"}}>
            <h2 style={{display:"inline-block"}}><a href={html_url}>{name}</a></h2>

        </div>
    )
}
