import React, { useEffect, useRef, useState } from 'react';
// import * as monaco from 'monaco-editor';
import Editor from '@monaco-editor/react';


import styles from './index.module.css'



const MonacoEditor = ({ setTest }) => {
    const [isChange, setIsChange] = useState(null);
    const [code, setCode] = useState(null);

    const [language, setLanguage] = useState('jsx');
    const [editorLanguage, setEditorLanguage] = useState('javascript');


    const [filePaths, setFilePaths] = useState({
        jsx: '/001/index.jsx',
        css: '/001/style.css',
        js: '/001/index.js',
    });

    const [fileContents, setFileContents] = useState({
        jsx: '',
        css: '',
        js: '',
    });

    const handleLanguageChange = (newLanguage) => {
        let lan = 'javascript'

        setLanguage(newLanguage)

        switch (newLanguage) {
            case 'jsx':
                lan = 'javascript'
                break;
            case 'javascript':
                lan = 'javascript'
                break;
            case 'css':
                lan = 'css'
                break;
        }

        setEditorLanguage(lan);
        setCode(fileContents[newLanguage])

    };


    
    const handleSave = async () => {
        try {
            const requestBody = {
                paths: Object.values(filePaths),
                content: Object.values(fileContents),
            };

            // Hacer la solicitud PUT usando fetch
            const response = await fetch('http://localhost:3002/api/test', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error(`Error de red: ${response.status}`);
            }

            // Imprimir la respuesta del servidor
            const data = await response.text();
            setIsChange(false)
        } catch (error) {
            console.error('Error al hacer la solicitud PUT:', error);
        }
    };



    const handleEditorChange = (value) => {
        setIsChange(true)

        setFileContents(prevFileContents => ({
            ...prevFileContents,
            [language]: value,
        }));
    };



    // -------------------------------------------------------------

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3002/api/test', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(filePaths),
                });

                if (response.ok) {
                    const result = await response.json();
                    setFileContents(result);
                } else {
                    console.error('Error al leer archivos:', response.statusText);
                }
            } catch (error) {
                console.error('Error en la solicitud de leer archivos:', error);
            }
        }

        if (!fileContents.jsx) fetchData()
    }, []);


    useEffect(() => {
        setCode(fileContents[language])
    }, [fileContents])


 


    useEffect(() => {
        const handleKeyDown = (event) => {
            if ((event.ctrlKey || event.metaKey) && event.key === 's') {
                event.preventDefault();
                handleSave();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [filePaths, fileContents, handleSave]);

    return (
        <div>
            <div className={styles["buttons-lms"]}>
                <div>
                    <button
                        onClick={() => handleLanguageChange('jsx')}
                        className={language === 'jsx' ? styles['active'] : ''}

                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M21.7 12c0-1.4-1.3-2.7-3.4-3.5V8c.3-2.1-.2-3.6-1.3-4.2-1.3-.7-3-.2-4.8 1.2-1.8-1.4-3.5-2-4.7-1.2C6.4 4.4 5.9 5.9 6 8v.5c-2 .8-3.4 2-3.4 3.5 0 1.4 1.4 2.7 3.5 3.5L6 16c-.2 2.1.3 3.6 1.4 4.2.3.2.8.3 1.2.3a6 6 0 0 0 3.5-1.5 6 6 0 0 0 3.5 1.5c.5 0 .9 0 1.3-.3 1-.6 1.6-2.1 1.3-4.2v-.5c2-.8 3.4-2 3.4-3.5Zm-6-7.5.8.1c.7.5 1 1.6.9 3.3l-.1.3c-.8-.3-1.7-.4-2.6-.5-.5-.7-1-1.4-1.7-2 .7-.7 1.7-1.1 2.7-1.2Zm-8 8.7.6 1 .6 1c-.5 0-1-.2-1.6-.4l.5-1.6Zm-.4-4L9 8.8l-.6 1-.5 1-.5-1.6Zm1 2.8a19.3 19.3 0 0 1 2-3.4 19.9 19.9 0 0 1 3.9 0 19.6 19.6 0 0 1 2 3.4 19.3 19.3 0 0 1-2 3.4 20 20 0 0 1-4 0A20.2 20.2 0 0 1 8.4 12Zm7.8 2.3.5-1 .5 1.5-1.6.4.6-1Zm.5-3.5-.5-1-.6-1c.6 0 1 .2 1.6.4l-.5 1.6Zm-4.4-4.5 1.1 1.2a20.9 20.9 0 0 0-2.2 0l1.1-1.2ZM8 4.6c.2 0 .5-.2.7-.1 1 0 2 .5 2.8 1.2-.7.6-1.3 1.3-1.8 2a8 8 0 0 0-2.6.5v-.3c-.2-1.7.1-2.8.9-3.3ZM3.7 12c0-.9 1-1.8 2.7-2.5l.8 2.5-.8 2.5C4.7 13.8 3.7 13 3.7 12ZM8 19.4c-.8-.5-1-1.6-1-3.3l.1-.3c.9.3 1.7.4 2.6.5.5.7 1.1 1.4 1.8 2-1.5 1.1-2.8 1.5-3.5 1Zm3-3a20.3 20.3 0 0 0 2.4 0l-1.2 1.3-1.1-1.2Zm5.5 3c-.8.4-2.1 0-3.5-1l1.7-2c.9-.2 1.8-.3 2.6-.6v.3c.2 1.7-.1 2.8-.8 3.3Zm1.6-4.9c-.2-.9-.5-1.7-.9-2.5.4-.8.7-1.6.9-2.5 1.6.7 2.6 1.6 2.6 2.5 0 .9-1 1.8-2.6 2.5Z" />
                            <path d="M12.2 13.8a1.8 1.8 0 1 0-1.8-1.8 1.8 1.8 0 0 0 1.8 1.8Z" />
                        </svg>

                        React
                    </button>
                    <button
                        onClick={() => handleLanguageChange('js')}
                        className={language === 'js' ? styles['active'] : ''}

                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M6 2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 1 0 0-2h-2v-2h2c.6 0 1-.4 1-1V4a2 2 0 0 0-2-2h-8v16h5v2H7a1 1 0 1 1 0-2h1V2H6Z" clipRule="evenodd" />
                        </svg>

                        JavaScript
                    </button>
                    <button
                        onClick={() => handleLanguageChange('css')}
                        className={language === 'css' ? styles['active'] : ''}

                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path d="m3 2 1.6 17.8L12 22l7.5-2.2L21 2H3Zm13.3 14.7L12 18l-4.3-1.2-.3-3.1h2.1l.2 1.5 2.3.6 2.3-.6.3-3H7.3l-.2-2h7.7l.1-2H7l-.2-2h10.6l-1 10.6Z" />
                        </svg>

                        CSS
                    </button>
                </div>
                <div>
                    {isChange && (
                        <button
                            onClick={() => handleSave()}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2m-8 1V4m0 12-4-4m4 4 4-4" />
                            </svg>

                            Guardar
                        </button>
                    )}
                </div>
            </div>
            <Editor
                height="100vh"
                language={editorLanguage}
                value={code}
                onChange={handleEditorChange}
                options={{ fontSize: 10 }}
            />
        </div>
    )

};

export default MonacoEditor;