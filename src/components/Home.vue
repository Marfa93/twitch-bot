<template>
    <div id="home">
        <h1>Bonjour tout le monde ! Voici un aperçu du chat :</h1>
        <div class="chatbox" v-if="hasMessages">
            <message-line
                v-for="message in messages"
                v-bind:message="message"
                v-bind:key="message.id"
                ></message-line>
        </div>
        <div v-else>
            <h2>Pas de message pour le moment :(</h2>
        </div>
        <h1>Et maintenant les sons que vous balancez !</h1>
        <audio :src="soundUri" autoplay controls ref="player">
            Votre navigateur ne supporte pas l'élément <code>audio</code>.
        </audio>
    </div>
</template>

<script>
import MessageLine from './MessageLine';
import io from 'socket.io-client';

const socket = io()
const chatLimit = 10
const CMD_PREFIX = "!";
const ttsUri = "assets/sounds/tts.mp3";

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

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

const data = {
    messages: [],
    soundUri: '',
    playlist: []
}

export default {
    name: 'Home',
    data: function(){
        return data
    },
    components: {
        MessageLine
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
            this.soundUri = ''
            if (this.playlist.length) {
                this.soundUri = this.playlist.shift()
                player.load()
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
    methods: {
        getSound: function(message) {
            if (message.charAt(0) == CMD_PREFIX) {
                const sound = message.replace(CMD_PREFIX, '').toLowerCase();
                this.getSoundUri(sound)
            }
        },
        getSoundUri: function(sound) {
            const time = Date.now();
            const uri = sound.startsWith('tts') ? `${ttsUri}?t=${time}` : `${sound}.mp3`;

            sleep(500); // I need this tempo to make sur the TTS has done processing

            if (!doesFileExist(uri)) {
                return
            }

            if ((this.$refs.player.ended && this.playlist.length === 0) || !this.soundUri) {
                this.soundUri = uri
            } else {
                this.playlist.push(uri)
            }
        }
    }
}
</script>
