<template>
    <div  v-if="question" class="single-question mt-3">
        <div class="container">
            <h1>
                {{ question.content }}
            </h1>
            <QuestionActions
                v-if="isQuestionAuthor"
                :slug="question.slug"
            />
            <p class="mb-3">Posted by: 
                <span class="author">{{ question.author }}</span>
            </p>
            <p>
                Total Answers: {{ question.answers_count }} &#8901;
                Created at: {{ question.created_at }}
            </p>
            <hr>

            <!-- For Adding New Answer -->
            <div v-if="userHasAnswered">
                <p class="answer-added">
                    You've written an answer. 
                </p>
            </div>
            <div v-else-if="showForm">
                <form class="card" @submit.prevent="onSubmit">
                    <div class="card-header px-3">
                        Answer the Question
                    </div>
                    <div class="card-block">
                        <textarea 
                            rows="5"
                            v-model="newAnswerBody"
                            class="form-control"
                            placeholder="Share your Knowledge"
                            >
                        </textarea>
                    </div>
                    <div class="card-footer px-3">
                        <button
                            type="submit"
                            class="btn btn-sm btn-success"
                            >Submit Your Answer
                        </button>
                    </div>
                </form>
                <p v-if="error"
                    class="error-text mt-3"
                    >{{ error }}
                </p>
            </div>
            <div v-else>
                <button
                    class="btn btn-sm btn-success"
                    @click="showForm = true"
                    >Show Form
                </button>
            </div>
            <!--  -->

            <hr>
        </div>

        

        <div class="container"> 
            <AnswerComponent
                v-for="answer in answers"
                :answer="answer"
                :requestUser="requestUser"
                :key="answer.id"
                @delete-answer="deleteAnswer"
            />
        </div>
        
        <div class="container my-4">
            <p v-show="loadingAnswers">
                Loading Answers...
            </p>
            <button
                v-show="next"
                class="btn btn-sm btn-primary"
                @click="getQuestionAnswers"
                >Load More Answers
            </button>
        </div>
    </div>
    <div v-else>
        <h1 id="notfoundheader">404 - Question Not Found</h1>
    </div>
</template>

<script>

import { apiService } from "@/common/api.service"
import AnswerComponent from "@/components/Answer"
import QuestionActions from '@/components/QuestionActions'

export default {
    name: "Question",
    props: {
        slug: {
            type: String,
            required: true
        }
    },
    components: {
        AnswerComponent,
        QuestionActions
    },
    data(){
        return{
            question: {},
            answers: [],

            newAnswerBody: null,
            error: null,
            userHasAnswered: false,
            showForm: false,

            next: null,
            loadingAnswers: false,

            requestUser: null
        }
    },
    computed: {
        isQuestionAuthor() {
            return this.question.author === this.requestUser;
        }
    },
    methods: {
        setPageTitle(title){
            document.title = title;
        },
        setReqeustUser(){
            this.requestUser = window.localStorage.getItem("username")
        },
        getQuestionData(){
            let endpoint = `/api/questions/${this.slug}/`

            apiService(endpoint)
                .then(data => {

                    if(data){
                        this.question = data;
                        this.userHasAnswered = data.user_has_answered;
                        this.setPageTitle(data.content)
                    }
                    else{
                        this.question = null;
                        this.setPageTitle("404 - Page Not Found!")
                    }
                    
                })

        },
        getQuestionAnswers(){
            let endpoint = `/api/questions/${this.slug}/answers/`
            
            if(this.next){
                endpoint = this.next;
            }

            this.loadingAnswers = true;

            apiService(endpoint)
                .then(data => {
                    this.answers.push(...data.results);

                    this.loadingAnswers = false;

                    if(data.next) {
                        this.next = data.next;
                    }
                    else {
                        this.next = null;
                    }
                })
        },
        onSubmit(){
            if(this.newAnswerBody){
                let endpoint = `/api/questions/${this.slug}/answer/`
                let method = "POST"
                apiService(endpoint, method, { body: this.newAnswerBody })
                .then(data => {
                    this.answers.unshift(data)
                })
                this.newAnswerBody = null
                this.userHasAnswered = true;
                this.showForm = false
                if(this.error)
                {
                    this.error = null
                }
            }
            else{
                this.error = "You can't answer an Empty Answer!"
            }
        },
        async deleteAnswer(answer){
            let endpoint = `/api/answers/${answer.id}/`
            try{
                await apiService(endpoint, "DELETE")
                //this.$delete(this.answers, this.answers.indexOf(answer))
                this.answers.splice(this.answers.indexOf(answer), 1)
                this.userHasAnswered = false;
            }
            catch(err){
                console.log(err)
            }
        }
    },
    created() {
        this.getQuestionData();
        this.getQuestionAnswers();
        this.setReqeustUser();
    }
}
</script>

<style scoped>
.author{
  font-weight: bold;
  color: chocolate;
}
.answer-added{
    font-weight: bold;
    color: green;
}
.error-text{
    font-weight: bold;
    color: red;
}
#notfoundheader{
    color: red;
    text-align: center;

}
</style>