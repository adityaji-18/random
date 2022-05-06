
import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {
        let {title, description,imgUrl,newsUrl,author,date,source} = this.props;
        return (
            
           
                <div className="card my-3" >
                        <img src={!imgUrl? "https://i.gadgets360cdn.com/large/apple_old_building_logo_reuters_1604987763894.jpg":imgUrl} className="card-img-top" alt="..."/>
                        <div className="card-body">
                        <span class="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{zIndex:'1', left:'89%'}}>
                            {source}
                            <span class="visually-hidden">unread messages</span>
                        </span>
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{description}</p>
                            <p className="card-text"><small className="text-muted">Author: {!author? "Unknown": author } Last updated { new Date(date).toGMTString()} ago</small></p>
                            <a  rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-dark">Read More</a>
                        </div>
                </div>
          
           
        )
    }
}
