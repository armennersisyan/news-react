import React, { PureComponent } from 'react';
import { getNewsBySource } from '../services/client'
import ArticlesList from '../components/Article/ArticlesList';

class Source extends PureComponent {
  state = {
    isLoading: false,
    articles: []
  };
  
  componentDidMount() {
    this.loadNewsBySource();
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.loadNewsBySource();
    }
  }
  
  loadNewsBySource = () => {
    const { match: { params } } = this.props;
    this.setState({ isLoading: true });
    getNewsBySource(params.source).then(res => {
      this.setState({
        articles: res.articles,
        isLoading: false,
      })
    })
  };
  
  render() {
    const { match: { params } } = this.props;
    return (
      <>
        <div className="container">
          <div className="text-center">
            <h1>News by Source "{ params.source }"</h1>
          </div>
          <ArticlesList
            articles={this.state.articles}
            loading={this.state.isLoading}
          />
        </div>
      </>
    )
  }
}

export default Source
