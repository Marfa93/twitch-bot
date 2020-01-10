const socket = io()
const chatLimit = 10
const CMD_PREFIX = "!";

function doesFileExist(uri) {
    const xhr = new XMLHttpRequest()
    var isExist = false
    xhr.open('HEAD', uri, false)

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 0) {
                isExist = true
            } else {
                isExist = false
            }
        }
    }

    xhr.send(null)
    return isExist
}

Vue.component('message-line', {
    props: ['message'],
    template: '<div>[{{ message.sent }}] <{{ message.sender }}>: {{ message.message }}</div>'
})

const app = new Vue({
    el: '#app',
    data: {
        messages: [],
        currentSound: '',
        soundUri: '',
        playlist: []
    },
    created: function() {
        socket.on('chat-message', (data) => {
            if (this.messages.length > chatLimit) {
                this.messages = this.messages.slice(-(chatLimit - 1))
            }

            this.getSound(data.message)
            data.sent = new Date(parseInt(data.sent)).toLocaleTimeString()

            this.messages.push(data);
        });
    },
    mounted: function() {
        const player = this.$refs.player
        // When the current sound has ended
        player.onended = (event) => {
            if (this.playlist.length) {
                this.soundUri = this.playlist.shift()
            }
        }

        player.onerror = function() {
            this.soundUri = ''
            console.log("Error " + player.error.code + "; details: " + player.error.message);
        }
    },
    computed: {
        hasMessages: function() {
            return this.messages.length > 0
        }
    },
    watch: {
        currentSound: function(sound) {
            const uri = `assets/music/${sound}.mp3`

            if (!doesFileExist(uri)) {
                return
            }

            if ((this.$refs.player.ended && this.playlist.length === 0) || !this.soundUri) {
                this.soundUri = uri
                // this.$refs.player.play()
            } else {
                this.playlist.push(uri)
            }
        }
    },
    methods: {
        getSound: function(message) {
            if (message.charAt(0) == CMD_PREFIX) {
                const sound = message.replace(CMD_PREFIX, '').toLowerCase();
                this.currentSound = sound
            }
        }
    }
})
