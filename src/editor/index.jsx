
import React, { useState } from 'react';
import Editor from './Editor';


import styles from './index.module.css'

const Lms = () => {
    const [test, setTest] = useState('001');


    return (
        <div className={styles["editor-lms"]}>
            <div style={{ width: '50%' }}>
                <Editor setTest={setTest} />
            </div>
            <div style={{ width: '50%' }}>
                <div className={styles["editor-container"]}>

                <iframe
                    className={styles["editor-iframe"]}
                    id="iframe"
                    title="Contenido externo"
                    src={`/test/${test}`}
                    frameBorder="0"
                    allowFullScreen
                />
                </div>
            </div>
        </div>
    )
}



export default Lms
