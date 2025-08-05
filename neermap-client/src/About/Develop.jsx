import React from 'react';
import './Develop.css';
import { useTranslation } from "react-i18next";
function Develop() {
     const {t}=useTranslation();
    return (  
        <div className='container'>
            <div className='row'>
                <h2 className='developed'>“{t("developed")}”</h2>
            </div>
        </div>
    );
}

export default Develop;