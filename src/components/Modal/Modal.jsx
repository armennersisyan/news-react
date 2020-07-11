import React, { PureComponent } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './styles.module.scss'

const modalRoot = document.getElementById('modal-root');

class Modal extends PureComponent {
  constructor(props) {
    super(props);
    this.modalRef = React.createRef();
  }
  
  static propTypes = {
    open: PropTypes.bool,
    closable: PropTypes.bool,
    children: PropTypes.element,
  };
  
  static defaultProps = {
    open: false,
    closable: true,
  };
  
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }
  
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }
  
  /**
   * When clicked on modal fallback
   */
  handleClickOutside = (event) => {
    if (!this.modalRef.current) return;
    if (this.modalRef && !this.modalRef.current.contains(event.target)) {
      this.props.onClose()
    }
  };
  
  
  render() {
    const { open, children, closable, onClose } = this.props;
    return open && createPortal(
      <div
        className={styles['modal-fallback']}
        onClick={(e) => this.handleClickOutside(e)}
      >
        <div
          ref={this.modalRef}
          className={styles.modal}
        >
          <div>
            {closable &&
              <button
                className={styles['modal-close__btn']}
                onClick={onClose}
              >
                <i className="ti-close"/>
              </button>
            }
            {children}
          </div>
        </div>
      </div>, modalRoot);
  }
};

export default Modal;
