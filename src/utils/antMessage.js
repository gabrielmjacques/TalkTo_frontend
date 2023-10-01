import { message } from 'antd';
const duration = 2;

const messageSuccess = ( text, custom_duration = duration ) => {
    message.success( text, custom_duration );
};
const messageError = ( text, custom_duration = duration ) => {
    message.error( text, custom_duration );
};
const messageWarning = ( text, custom_duration = duration ) => {
    message.warning( text, custom_duration );
};

export { messageSuccess, messageError, messageWarning };