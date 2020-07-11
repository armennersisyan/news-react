import React, { PureComponent } from 'react';
import { getEverything } from '../services/client';
import ArticlesList from '../components/Article/ArticlesList';

class Home extends PureComponent {
  state = {
    isLoading: false,
    articles: []
  };
  
  loadNews = () => {
    this.setState({ isLoading: true });
    getEverything().then(res => {
      this.setState({
        articles: res.articles,
        isLoading: false,
      })
    })
  };
  
  componentDidMount() {
    this.loadNews()
  }
  
  render() {
    const { isLoading } = this.state;
    return (
      <>
        <div className="container">
          <div className="text-center">
            <h1>Latest News</h1>
          </div>
            <ArticlesList
              articles={this.state.articles}
              loading={isLoading}
            />
        </div>
      </>
    )
  }
}

export default Home
