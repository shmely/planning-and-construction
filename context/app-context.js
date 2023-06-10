import React, { useState } from 'react';

const AppContext = React.createContext({
    buildingsDefentions: {},
    message: undefined


});

export const AppContextProider = (props) => {
    const [message, setMessage] = useState(undefined);
    const [buildingsDefentions, setBuildingsDef] = useState(
        {
            '1-12': {
                type: 'בניין רגיל',
                definition: ''
            },
            '13-29': {
                type: 'בניין גבוה',
                definition: 'בניין גבוה – בנין שבו הפרש הגובה בין מפלס הכניסה הקובעת לבנין לבין מפלס הכניסה לקומה הגבוהה ביותר המיועדת לאכלוס, שהכניסה אליה דרך חדר מדרגות משותף, עולה על 13 מטרים'
            },
            '30-999': {
                type: 'בניין רב קומות',
                definition: 'בניין רב קומות – בנין שבו הפרש הגובה בין מפלס הכניסה הקובעת לבנין לבין מפלס הכניסה לקומה הגבוהה ביותר המיועדת לאכלוס, שהכניסה אליה דרך חדר מדרגות משותף, עולה על 29 מטרים',

            }
        });



    const showMessage = (msg) => {
        setMessage(msg);
    }

    return (
        <AppContext.Provider
            value={{ buildingsDefentions, message, showMessage }}
        >
            {props.children}
        </AppContext.Provider>
    );
};



export default AppContext
