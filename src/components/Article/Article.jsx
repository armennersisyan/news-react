import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { strSlice } from '../../utils/helpers'
import styles from './styles.module.scss'
import placeholder from '../../assets/img/placeholder.jpg';

const Article = ({ article, onClick, history }) => {
  const month = article.publishedAt && article.publishedAt.split('T')[0];
  const imgSrc = article.urlToImage !== 'null' ? article.urlToImage : placeholder;
  
  const handleSourceClick = (e, source_id) => {
    e.stopPropagation();
    history.push(`/source/${source_id}`)
  };
  
  return (
    <div className="col-md-4 col-sm-6 col-12">
      <div className={styles['article-block']} onClick={onClick}>
        <span
          className={styles['article-block__source']}
          onClick={(e) => handleSourceClick(e, article.source.id)}
        >
          {article.source.name}
        </span>
        <div className={styles['article-block__img-wrapper']}>
          <img src={imgSrc} alt={article.title}/>
        </div>
        <div className={styles['article-block__content']}>
          <h4 className={styles['article-block__title']}>
            {strSlice(article.title)}
          </h4>
          <h6 className={styles['article-block__author']}>
            By <span>{ strSlice(article.author, 20) || 'Author' }</span> on {month}
          </h6>
        </div>
      </div>
    </div>
  )
};

Article.propTypes = {
  article: PropTypes.object.isRequired,
};

export default React.memo(withRouter(Article));
