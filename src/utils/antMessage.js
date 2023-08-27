import { message } from 'antd';
const duration = 2;

const messageSuccess = ( text ) => {
    message.success( text, duration )
};
const messageError = ( text ) => {
    message.error( text, duration )
};
const messageWarning = ( text ) => {
    message.warning( text, duration )
};

export { messageSuccess, messageError, messageWarning }