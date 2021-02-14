<template>
  <div class="home">
    <div class="container mt-3">
      <!-- For showing the Questions -->
      <div v-for="question in questions" :key="question.pk">
        <p class="mb-2">Posted by: 
          <span class="question-author">{{ question.author }}</span>
        </p>
        <h2>
          <router-link :to="{ name: 'Question', 
            params: { slug: question.slug } }" 
            class="question-link">
            {{ question.content }}
          </router-link>
        </h2>
        <p>Answers: {{ question.answers_count }}</p>
        <hr>
      </div>

      <!-- Load More Functionality -->
      <div class="my-4">
        <p v-show="loadingQuestions">
          ...loading...
        </p>
        <button 
          v-show="next"
          @click="getQuestions"
          class="btn btn-sm btn-info"
          >Load More
        </button>
      </div>

    </div>   
  </div>
</template>


<script>

import { apiService } from "@/common/api.service"

export default {
  name: "Home",
  data(){
    return{
      questions: [],
      next: null,
      loadingQuestions: false
    }
  },
  methods: {
    getQuestions(){
      let endpoint = "/api/questions/";

      if(this.next){
        endpoint = this.next;
      }

      this.loadingQuestions = true;
      apiService(endpoint)
        .then(data => {
          this.questions.push(...data.results);
          this.loadingQuestions = false;
          if(data.next) {
            this.next = data.next;
          }
          else {
            this.next = null;
          }
        })
    }
  },
  created() {
    this.getQuestions();
    document.title = "QuestionTime"
  }
}
</script>

<style scoped>
.question-author{
  font-weight: bold;
  color: chocolate;
}

.question-link{
  color: black;
  font-weight: bold;
}

.question-link:hover{
  color: rgb(77, 77, 78);
  text-decoration: none;
}
</style>