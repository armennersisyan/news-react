import React, { PureComponent } from 'react';
import { createPortal } from 'react-dom';
import styles from './styles.module.scss'

const modalRoot = document.getElementById('modal-root');

class Modal extends PureComponent {
  constructor(props) {
    super(props);
    this.modalRef = React.createRef();
  }
  
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
    const { open, children } = this.props;
    
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
            {children}
          </div>
        </div>
      </div>, modalRoot);
  }
};

export default Modal;
