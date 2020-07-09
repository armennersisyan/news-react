import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Article from './Article';
import ArticleDetail from './ArticleDetail';
import Modal from '../Modal/Modal';

class ArticlesList extends PureComponent {
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
    const { articles } = this.props;
    return (
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
          <ArticleDetail article={this.state.activeArticle} />
        </Modal>
      </div>
    )
  }
}

ArticlesList.propTypes = {
  articles: PropTypes.array.isRequired,
};

export default ArticlesList;
