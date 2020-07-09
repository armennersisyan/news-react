import React, { PureComponent } from 'react';
import { getEverything } from '../services/client';
import ArticlesList from '../components/Article/ArticlesList';

class Home extends PureComponent {
  state = {
    articles: []
  };
  
  loadNews = () => {
    getEverything().then(res => {
      if (!res?.articles?.length) return;
      this.setState({ articles: res.articles })
    })
  };
  
  componentDidMount() {
    this.loadNews()
  }
  
  render() {
    return (
      <>
        <div className="container">
          <div className="text-center">
            <h1>Latest News</h1>
          </div>
          <ArticlesList articles={this.state.articles} />
        </div>
      </>
    )
  }
}

export default Home
