import React, {useState, useRef} from 'react';
import classes from './MyModal.module.css';

const MyModal = ({children, visible, setVisible}) => {
    const rootClasses = [classes.myModal]

    if (visible === true) {
        rootClasses.push(classes.active);
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={classes.myModalContent} onClick={(e) => e.stopPropagation()}> {/*event.stopPropagation отменяет событие родительского клика*/}
                {children}
            </div>
        </div>
    );
}

export default MyModal;