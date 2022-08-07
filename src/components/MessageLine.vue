<template>
    <div>[{{ message.sent }}] &lt;{{ message.sender }}>: {{ message.message }}</div>
</template>

<script>
export default {
    name: 'message-line',
    props: [
        'message'
    ]
}
</script>
