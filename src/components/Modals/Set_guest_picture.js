import React from 'react';
import ReactDom from 'react-dom';

const modalStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    padding: '10px 20px 20px 20px',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '10px'
  }

const buttonStyle = {
    alignSelf: 'flex-end'
}

const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(211, 211, 211, 0.1)",
    zIndex: 1000
}

export default function Set_guest_picture({ open, children, guestId, close, setOpen, pictureStatus }) {
    if(!open) return null

    const xxx = () => {
        setOpen(!open)
    }

    return ReactDom.createPortal(
        <>
            {pictureStatus ? xxx() : null}
            <div style={overlayStyle} onClick={close}/>
            <div style={modalStyle}>
                <button style={buttonStyle} onClick={close}>×</button>
                {children}
            </div>
        </>,
        document.getElementById('portal')
    )
}
