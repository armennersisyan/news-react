import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { getSources } from '../../services/client';
import styles from './styles.module.scss'
import logo from '../../assets/img/news.svg'

class Home extends PureComponent {
  state = {
    sources: [],
    search: null,
  };
  
  loadSources = () => {
    getSources().then(({ sources }) => {
      if (!sources) return;
      const sourcesCut = [ ...sources ];
      sourcesCut.length = 5;
      this.setState({ sources: sourcesCut })
    })
  };
  
  handleSearchChange = (e) => {
    e.persist();
    this.setState({ search: e.target.value })
  };
  
  handleSearch = () => {
    this.props.history.push(`/search/${this.state.search}`)
  };
  
  componentDidMount() {
    this.loadSources()
  }
  
  render() {
    const { history } = this.props;
    return (
      <header className={styles.header}>
        <div className={`${styles.wrapper} container`}>
          <div className={styles.logo}>
            <Link to='/'>
              <img src={logo} alt="logo"/>
              <h2>News App</h2>
            </Link>
          </div>
          <div className={styles.navigation}>
            <ul>
              { this.state.sources && this.state.sources.map(source => (
                  <li key={source.id} className={history.location.pathname === `/source/${source.id}` ? styles.active : ''}>
                    <Link to={`/source/${source.id}`}>
                      { source.name }
                    </Link>
                  </li>
                ))
              }
            </ul>
            <div className={styles.search}>
              <input
                type="text"
                onChange={(e) => this.handleSearchChange(e)}
              />
              <button onClick={this.handleSearch}>Search</button>
            </div>
          </div>
        </div>
      </header>
    )
  }
}

export default withRouter(Home)
