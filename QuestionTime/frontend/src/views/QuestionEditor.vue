<template>
    <div class="container mt-3">
        <h1 class="mb-3">Ask a Question</h1>
        <form @submit.prevent="onSubmit">
            <textarea 
                rows="3"
                v-model="qeustion_body"
                class="form-control"
                placeholder="What do you want to ask?"
            ></textarea>
            <br>
            <button
                type="submit"
                class="btn btn-success"
                >Publish
            </button>
        </form>
        <p v-if="error" class="text-muted mt-2">{{ error }}</p>
    </div>
</template>

<script>
import { apiService } from "@/common/api.service.js"

export default {
    name: "QuestionEditor",
    data(){
        return {
            qeustion_body: null,
            error: null
        }
    },
    methods: {
        onSubmit(){
            if(!this.qeustion_body){
                this.error = "You can't send an empty question!";
            }
            else if(this.qeustion_body.length > 240){
                this.error = 
                "Ensure this field has no more than 240 Characters";
            }
            else{
                let endpoint = "/api/questions/";
                let method = "POST";

                apiService(endpoint, method, { content: this.qeustion_body })
                    .then(question_data => {
                        this.$router.push({
                            name: 'Question', 
                            params: { slug: question_data.slug }
                        })
                    })
            }
        }
    },
    created() {
        document.title = "Editor - QuestionTime";
    }
}
</script>