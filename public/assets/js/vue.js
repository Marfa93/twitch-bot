const socket = io()
const chatLimit = 10

Vue.component('message-line', {
    props: ['message'],
    template: '<div>[{{ message.sent }}] <{{ message.sender }}>: {{ message.message }}</div>'
})

const app = new Vue({
    el: '#app',
    data: {
        messages: []
    },
    created: function() {
        socket.on('chat-message', (data) => {
            if (this.messages.length > chatLimit) {
                this.messages = this.messages.slice(-(chatLimit - 1))
            }

            data.sent = new Date(parseInt(data.sent)).toLocaleTimeString()

            this.messages.push(data);
        });
    },
    computed: {
        hasMessages: function() {
            return this.messages.length > 0
        }
    }
})
