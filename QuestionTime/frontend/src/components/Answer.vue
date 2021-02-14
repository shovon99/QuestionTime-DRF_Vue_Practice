<template>
    <div class="mt-2 mb-2">
        <p class="text-muted">
            <strong>
                {{ answer.author }} 
            </strong>
            &#8901; {{ answer.created_at }}
        </p>
        <p>
            {{ answer.body }}
        </p>
    </div>
    <hr>
</template>

<script>
export default {
    name: "AnswerComponent",
    props:{
        answer: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>

</style>