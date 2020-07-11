import React from 'react';
import styles from './styles.module.scss'

const ArticleLoader = () => {
  const loopedSkeletons = [];
  for (let i = 0; i < 20; i++) {
    loopedSkeletons.push(<span className='indent' key={i} />);
  }
  return (
    <div className="row">
      {loopedSkeletons && loopedSkeletons.map((_, index) => (
        <div className="col-md-4 col-sm-6 col-12" key={`skeleton-${index}`}>
          <div className={styles['article-block--skeleton']}>
            <div className={styles['article-block--skeleton__img-wrapper']} />
            <div className={styles['article-block--skeleton__content']}>
              <div className={styles['article-block--skeleton__title']} />
              <div className={styles['article-block--skeleton__title-sec']} />
              <div className={styles['article-block--skeleton__author']} />
            </div>
          </div>
        </div>)
      )}
    </div>
  );
};

export default React.memo(ArticleLoader);
