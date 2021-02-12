<template>
    <div class="single-question mt-3">
        <div class="container">
            <h1>
                {{ question.content }}
            </h1>
            <p class="mb-3">Posted by: 
                <span class="author">{{ question.author }}</span>
            </p>
            <p>Total Answers: {{ question.answers_count }}</p>
            <p>Created at: {{ question.created_at }}</p>
        </div>
    </div>
</template>

<script>

import { apiService } from "../common/api.service"


export default {
    name: "Question",
    props: {
        slug: {
            type: String,
            required: true
        }
    },
    data(){
        return{
            question: {}
        }
    },
    methods: {
        setPageTitle(title){
            document.title = title;
        },
        getQuestionData(){
            let endpoint = `/api/questions/${this.slug}/`

            apiService(endpoint)
                .then(data => {
                    this.question = data;
                    this.setPageTitle(data.content)
                })

        }
    },
    created() {
        this.getQuestionData()
    }
}
</script>

<style scoped>
.author{
  font-weight: bold;
  color: chocolate;
}
</style>