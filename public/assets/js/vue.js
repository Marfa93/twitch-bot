Vue.component('message-line', {
    props: ['message'],
    template: '<div>[{{ message.sent }}] <{{ message.sender }}>: {{ message.message }}</div>'
})

const app = new Vue({
    el: '#app',
    data: {
        messages: [{id: '1', sent: '17:30', sender: 'Marfa_LeVrai', message: 'Salut tout le monde !'}]
    }
})
