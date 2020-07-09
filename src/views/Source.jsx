import React, { PureComponent } from 'react';
import { getNewsBySource } from '../services/client'
import ArticlesList from '../components/Article/ArticlesList';

class Source extends PureComponent {
  state = {
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
    getNewsBySource(params.source).then(res => {
      if (!res?.articles?.length) return;
      this.setState({ articles: res.articles })
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
          <ArticlesList articles={this.state.articles} />
        </div>
      </>
    )
  }
}

export default Source
