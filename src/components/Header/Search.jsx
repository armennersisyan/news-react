import React, { PureComponent } from 'react';
import PropTypes from "prop-types";
import { withRouter } from 'react-router-dom';
import { sortOptions } from '../../utils/helpers';
import styles from './styles.module.scss'

class Search extends PureComponent {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }
  
  static propTypes = {
    sources: PropTypes.array,
  };
  
  state = {
    search: null,
    searchSource: undefined,
    sortBy: undefined,
    isOpen: false,
  };
  
  handleSearchChange = (e) => {
    e.persist();
    this.setState({ search: e.target.value })
  };
  
  requestSearch = () => {
    if (!this.state.search) return;
    this.setState({ isOpen: false });
    const sourceQuery = this.state.searchSource ? `/${this.state.searchSource}` : '';
    const sortByQuery = this.state.sortBy ? `?sortBy=${this.state.sortBy}` : '';
    this.props.history.push(`/search/${this.state.search}${sourceQuery}${sortByQuery}`)
  };
  
  handleKeyPress = (evt) => {
    if(evt.keyCode === 13){
      this.requestSearch()
    }
  };
  
  handleSourceChange = (evt) => {
    this.setState({ searchSource: evt.target.value })
  };
  
  handleSortByChange = (evt) => {
    this.setState({ sortBy: evt.target.value })
  };
  
  handleCollapse = () => {
    if (!this.state.isOpen) {
      this.inputRef.current.setAttribute("autofocus", "");
    }
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen
    }))
  };
  
  render() {
    const { isOpen } = this.state;
    const { sources } = this.props;
    return (
      <div className={styles.search}>
        <div className={ `${styles['search-wrapper']} ${isOpen ? styles['is-open'] : null }` }>
          <div className={`${styles['search-wrapper__inner']} row`}>
            <div className="col-md-3 col-sm-6 col-6">
              <label className={`${styles.label} ml-0`}>Enter some keywords</label>
              <input
                ref={this.inputRef}
                type="text"
                placeholder="Search..."
                onKeyUp={(e) => this.handleKeyPress(e)}
                onChange={(e) => this.handleSearchChange(e)}
              />
            </div>
            <div className="col-md-3 col-sm-6 col-6">
              <label className={styles.label}>Choose Source</label>
              <select onChange={(e) => this.handleSourceChange(e)}>
                <option value="">All Sources</option>
                { sources && sources.map(source => (
                  <option key={source.id} value={source.id}>{source.name}</option>)
                )}
              </select>
            </div>
            <div className="col-md-3 col-sm-6 col-6">
              <label className={styles.label}>Choose Sort </label>
              <select onChange={(e) => this.handleSortByChange(e)}>
                <option value="">Sort By</option>
                { sortOptions && sortOptions.map(sort => (
                  <option key={sort.id} value={sort.id}>{sort.name}</option>)
                )}
              </select>
            </div>
            <div className="col-md-3 col-sm-6 col-6 d-flex align-center justify-content-end">
              <button onClick={this.handleCollapse}><i className="ti-close" /></button>
              <button onClick={this.requestSearch}><i className="ti-search" /></button>
            </div>
          </div>
        </div>
        <button onClick={this.handleCollapse}><i className="ti-search" /></button>
      </div>
    )
  }
}

export default withRouter(Search)
