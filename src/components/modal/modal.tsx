import React from 'react';
import './modal.css';
import Draggable from 'react-draggable';

interface PropTypes {
    title: string,
    showHideClassName: string,
    handleClose: any,
    children: any
}

class Modal extends React.PureComponent<PropTypes, {}> {
    render() {
        return (
            <div className={this.props.showHideClassName}>
                <Draggable>
                    <section className="modal-main">
                        <div className="modal-header">
                            <div className="modal-header-title">{this.props.title}</div>
                            <div className="modal-header-close" onClick={this.props.handleClose}>X</div>
                        </div>
                        {this.props.children}
                    </section>
                </Draggable>
            </div>
        );
    }
}

export default Modal;