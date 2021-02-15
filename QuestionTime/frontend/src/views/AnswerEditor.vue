<template>
    <div class="container mt-3">
        <h1 class="mb-3">Edit Answer</h1>
        <form @submit.prevent="onSubmit">
            <textarea 
                rows="3"
                v-model="answerBody"
                class="form-control"
            ></textarea>
            <br>
            <button
                type="submit"
                class="btn btn-success"
                >Update Answer
            </button>
        </form>
        <p v-if="error" class="text-muted mt-2">{{ error }}</p>
    </div>
</template>

<script>
import {apiService} from "@/common/api.service"
export default {
    name: "AnswerEditor",
    props: {
        id: {
            type: String,
            required: true
        },
        previousAnswer: {
            type: String,
            required: true
        },
        questionSlug: {
            type: String,
            required: true
        }
    },
    data(){
        return{
            answerBody: this.previousAnswer,
            error: null
        }
    },
    methods: {
        onSubmit(){
            if(this.answerBody){
                let endpoint = `/api/answers/${this.id}/`;
                let method = "PUT"

                apiService(endpoint, method, {body: this.answerBody})
                .then(()=>{
                    this.$router.push({
                        name: "Question",
                        params: { slug: this.questionSlug}
                    })
                })
            }
            else{
                this.error = "You cant publish empty Answer!"
            }

        }
    },
    async beforeRouteEnter(to, from, next){
        let endpoint = `/api/answers/${to.params.id}/`;
        let data = await apiService(endpoint);
        to.params.previousAnswer = data.body;
        to.params.questionSlug = data.question_slug;
        return next();
    }
}
</script>