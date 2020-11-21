import { NotificationManager } from 'react-notifications'
export default function createNotification(option) {
    return () => {
        switch (option.type) {
            case 'info':
                NotificationManager.info(option.message, option.title, option.duration)
                break
            case 'success':
                NotificationManager.success(option.message, option.title, option.duration)
                break
            case 'warning':
                NotificationManager.warning(option.message, option.title, option.duration)
                break
            case 'error':
                NotificationManager.error(option.message, option.title, option.duration)
                break
            default:
                break
        }
    };
};
