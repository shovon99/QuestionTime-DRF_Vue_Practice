<template>
    <div class="single-question mt-3">
        <div class="container">
            <h1>
                {{ question.content }}
            </h1>
            <p class="mb-3">Posted by: 
                <span class="author">{{ question.author }}</span>
            </p>
            <p>
                Total Answers: {{ question.answers_count }} &#8901;
                Created at: {{ question.created_at }}
            </p>
            <hr>
        </div>

        

        <div class="container"> 
            <AnswerComponent
                v-for="(answer, index) in answers"
                :answer="answer"
                :key="index"
            />
        </div>
    </div>
</template>

<script>

import { apiService } from "@/common/api.service"
import AnswerComponent from "@/components/Answer"

export default {
    name: "Question",
    props: {
        slug: {
            type: String,
            required: true
        }
    },
    components: {
        AnswerComponent
    },
    data(){
        return{
            question: {},
            answers: []
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

        },
        getQuestionAnswers(){
            let endpoint = `/api/questions/${this.slug}/answers/`

            apiService(endpoint)
                .then(data => {
                    this.answers=data.results;
                })
        }
    },
    created() {
        this.getQuestionData();
        this.getQuestionAnswers();
    }
}
</script>

<style scoped>
.author{
  font-weight: bold;
  color: chocolate;
}
</style>