import { message } from 'antd';
const duration = 2;

const messageSuccess = (text: string, custom_duration: number = duration) => {
    message.success(text, custom_duration);
};
const messageError = (text: string, custom_duration: number = duration) => {
    message.error(text, custom_duration);
};
const messageWarning = (text: string, custom_duration: number = duration) => {
    message.warning(text, custom_duration);
};

export { messageSuccess, messageError, messageWarning };