import React from 'react';
import { withRouter } from 'react-router-dom';
import { strSlice } from "../../utils/helpers";
import styles from './styles.module.scss'
import placeholder from "../../assets/img/placeholder.jpg";

const ArticleDetail = ({ article, history }) => {
  const month = article.publishedAt && article.publishedAt.split('T')[0];
  const imgSrc = article.urlToImage !== 'null' ? article.urlToImage : placeholder;
  
  const handleSourceClick = (source_id) => {
    history.push(`/source/${source_id}`)
  };
  
  return (
    <div className={styles['article-detail']}>
      <img src={imgSrc} alt={article.title} />
      <div className={styles['article-detail__content']}>
      <span
        className={styles['article-detail__source']}
        onClick={() => handleSourceClick(article.source.id)}
      >
        {article.source.name}
      </span>
        <h4 className={styles['article-detail__title']}>
          <a href={article.url} target="_blank">{article.title}</a>
        </h4>
        <p className={styles['article-detail__desc']} dangerouslySetInnerHTML={{__html: article.description}} />
        <h6 className={styles['article-detail__author']}>
          By <span>{ strSlice(article.author, 50) || 'Author' }</span> on {month}
        </h6>
      </div>
    </div>
  )
};

export default React.memo(withRouter(ArticleDetail));
