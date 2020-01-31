<template>
    <div class="soundsList">
        <h4>Liste des sons disponibles :</h4>
        <ul>
            <li v-for="sound in sounds" :key="sound.id">
                {{sound.soundname}}
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios'

const data = {
    sounds: []
}

export default {
    name: 'sounds-list',
    data: function() {
        return data
    },
    mounted() {
        axios.get('/soundslist').then(res => (this.sounds = res.data))
    }
}
</script>
