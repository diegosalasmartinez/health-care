export default class notification {
    constructor(mode = '', title = '', body = ''){
        this.mode = mode || 'info';
        this.title = title || 'Notification Title';
        this.body = body || 'Notification Body';
    }
} 
