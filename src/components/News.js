import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export default class News extends Component {

    static defaultProps={
     country:'in',
     pageSize:6,
     category: "sports"
    }
    static propTypes={
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string

        
    }
   constructor(){
       super();
       this.state={
           articles:  [],
           loading: false,
           page: 1
           
       }
    //    console.log('con')
   }
   async componentDidMount(){
    //    console.log('cdm')
    let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c5cd6556fc3c4b7ca87b404f7f31fc5e&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await  data.json();
    this.setState({
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false
    })
  // console.log(parsedData);
   }
  
   handlepre= async()=>{
      console.log('pre')
        let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c5cd6556fc3c4b7ca87b404f7f31fc5e&page=${this.state.page -1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedData = await  data.json();
        this.setState({
            page: this.state.page-1,
            articles: parsedData.articles,
            loading: false
        })
   }
   handlenext= async()=>{
    console.log('next')
        if(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)){

        }
        else{
            let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c5cd6556fc3c4b7ca87b404f7f31fc5e&page=${this.state.page +1}&pageSize=${this.props.pageSize}`;
            this.setState({loading:true});
            let data = await fetch(url);
            let parsedData = await  data.json();
            this.setState({
                page: this.state.page+1,
                articles: parsedData.articles,
                loading: false
            })
        }
    }
   
    render() {
       
        return (
            
            <div className="container">
             <h1 className="text-center my-3"> NewsMonkey-Top Heading</h1>
            {this.state.loading && <Spinner/>}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element)=>{
                        return   <div className="col-md-4" key={element.url}>
                        <NewsItem title={element.title} description={element.description} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                    </div>   
                    })}
      
                </div>
                <div className="container d-flex justify-content-between"> 
                <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlepre}> &#8592; Previous</button>
                <button disabled={this.state.page +1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handlenext}>Next 	&#8594;</button>
                </div>
                
                
            </div>
        )
    }
}
