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
    props:{
        slug: {
            type: String,
            required: false
        }
    },
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
                
                if(this.slug !== undefined){
                    endpoint += `${this.slug}/`;
                    method = "PUT";
                }

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
    async beforeRouteEnter(to, from, next){
        if(to.params.slug !== undefined){
            let endpoint = `/api/questions/${to.params.slug}/`
            let data = await apiService(endpoint)
            return next(vm =>(
                vm.qeustion_body = data.content
            ))
        }
        else{
            return next()
        }
    },
    created() {
        document.title = "Editor - QuestionTime";
    }
}
</script>