import React, { PureComponent } from 'react';
import { getNewsBySearch } from '../services/client'
import ArticlesList from '../components/Article/ArticlesList';

class Search extends PureComponent {
  state = {
    isLoading: false,
    articles: []
  };
  
  componentDidMount() {
    this.loadNewsBySearch();
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname || this.props.location.search !== prevProps.location.search) {
      this.loadNewsBySearch();
    }
  }
  
  loadNewsBySearch = () => {
    const { match: { params } } = this.props;
    const { location: { search } } = this.props;
    const sortBy = search.split('=')[1];
    this.setState({ isLoading: true });
    getNewsBySearch(params.title, params.source, sortBy).then(res => {
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
            <h1>Search for "{ params.title }"</h1>
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

export default Search
