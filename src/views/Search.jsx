import React, { PureComponent } from 'react';
import { getNewsBySearch } from '../services/client'
import ArticlesList from '../components/Article/ArticlesList';

class Search extends PureComponent {
  state = {
    articles: []
  };
  
  componentDidMount() {
    this.loadNewsBySearch();
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.loadNewsBySearch();
    }
  }
  
  loadNewsBySearch = () => {
    const { match: { params } } = this.props;
    getNewsBySearch(params.title).then(res => {
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
            <h1>Search for "{ params.title }"</h1>
          </div>
          <ArticlesList articles={this.state.articles} />
        </div>
      </>
    )
  }
}

export default Search
