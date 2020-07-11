import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Article from './Article';
import ArticleDetail from './ArticleDetail';
import ArticleLoader from './ArticleLoader';
import Modal from '../Modal/Modal';
import notFound from '../../assets/img/not found.png';

class ArticlesList extends PureComponent {
  static propTypes = {
    articles: PropTypes.array.isRequired,
    loading: PropTypes.bool,
  };
  
  state = {
    openModal: false,
    activeArticle: null,
  };
  
  handleActiveArticle = (article) => {
    this.setState({
      openModal: true,
      activeArticle: article,
    })
  };
  
  handleModalClose = () => {
    this.setState({
      openModal: false,
      activeArticle: null,
    })
  };
  
  render() {
    const { articles, loading } = this.props;
    return (
      !loading ?
      <div className="row">
        {articles && articles.map((article, index) => (
          <Article
            key={index}
            article={article}
            onClick={() => this.handleActiveArticle(article)}
          />
        ))}
        <Modal
          open={this.state.openModal}
          onClose={this.handleModalClose}
        >
          <ArticleDetail article={this.state.activeArticle}/>
        </Modal>
        {!articles?.length && <img src={notFound} className="not-found" alt="not found" />}
      </div> :
      <ArticleLoader />
    )
  }
}

export default ArticlesList;
