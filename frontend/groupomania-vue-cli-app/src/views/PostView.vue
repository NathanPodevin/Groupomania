<template>
<body>
    
  <PageHeader/>
    <main id="main" class="main">
        <form method="post" @submit.prevent="createPost()">
                <div class="postForm">
                    <h1>Publication</h1>
                    <div>
                        <label for="media">Media</label>
                        <input id="media" @change="uploadMedia()" class="form-input" type="file" name="image" accept=".png, .jpg, .jpeg, .gif" aria-label="Ajouter un media" required>
                    </div>
                    <div v-if="mediaPreview" id="previewMedia">
                      <img :src="mediaPreview" alt="Apperçu du media">
                    </div>
                    <div>
                        <label for="title">Titre</label>
                        <input id="title" class="form-input" type="text" name="title" placeholder="ex: Mon post" v-model="title" aria-label="title" required>
                    </div>

                    <div>
                        <label for="description">Description</label>
                        <textarea id="description" rows="5" class="form-input" type="text" name="description" placeholder="ex: Ceci est mon post" v-model="description" aria-label="description" required></textarea>
                    </div>

                    <button type="submit" class="form__btn">Publier</button>
                </div>
        </form>
    </main>
    <PageFooter/>
</body>
</template>
    

<script>

import PageHeader from '../components/PageHeader.vue';
import PageFooter from '@/components/PageFooter.vue';
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  components: {
  PageHeader,
  PageFooter
  },

  data() {
    return {
      mediaPreview: null,
      title: null,
      description: null,
      media: null,
    }
  },

  methods: {
    uploadMedia() {
            let inputFile = document.querySelector("#media");
            this.media = inputFile.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                this.mediaPreview = reader.result;
            };
            reader.readAsDataURL(this.media);
            console.log(this.media);
        },

    createPost() {
      const formData = new FormData();
            if(!this.media && !this.description && !this.title) {
                return
            } else {
                formData.append("userId", localStorage.getItem('userId'));
                formData.append("title", this.title);
                formData.append("description", this.description);
                formData.append("image", this.media);
                console.log(this.media);

      axios.post('http://localhost:3000/api/post', formData, {
                    headers: {"Content-Type": "multipart/form-data",
                    'Authorization': 'Bearer ' + localStorage.getItem('token') }
                })
            .then(() => { 
                Swal.fire({
                    icon: 'success',
                    title: 'Félicitation !',
                    text: 'Vôtre post à bien été créé',
                })
                this.mediaPreview = null;
                this.title = null;
                this.description = null;
                this.media = null;
                this.$router.push("/Home")
              })
            .catch(error =>  {console.log(error)
            console.log("impossible de créer le post")});
        }
    },
  }
}
</script>

<style lang="scss">

body {
    background: #4E5166;
};
  
.postForm {
    display: flex;
    flex-direction: column;
    width: 40%;
    margin: 40px auto 50px auto;
    padding: 20px 20px;
    justify-content: space-between;
    background: #FFD7D7;
    border-radius: 10px;
    align-items: center;
    text-align: left;
    & h1 {
      color: #4E5166;
      margin: 0px 0px 15px 0px;
      border-bottom: solid 7px #FD2D01;
    }
    & .form-input {
      border-radius: 7px;
      width: 300px;
      margin-top: 0px;
      font-size: 14px;
    }
    & div {
        display: flex;
        flex-direction: column;
        & input {
            margin-top: 10px;
            width: 300px;
            margin-bottom: 20px;
            border: #fff;
            padding: 2px;
            font-size: 16px;
        }
    }
    & textarea {
      margin-bottom: 15px;
      font-family:  Avenir, Helvetica, Arial, sans-serif; 
    }
    &__btn {
        width: 140px;
        margin: 30px 20px 20px 20px;
        padding: 5px;
        background: #4E5166;
        border-radius: 10px;
        border: none;
        font-size: 16px;
        color: #fff;
        &:hover {
            transform: scale(1.11);
            color: #FD2D01;
            background: #fff;     
        }
    }
}

#previewMedia {
  width: 280px;
  border: solid 10px #4E5166;
  border-radius: 10px;
  background: #fff;
}

form label {
  color: #4E5166;
  font-size: 18px;
  margin: 30px 0px 5px 0px;
}

form button {
  background: #4E5166;
  border-radius: 10px;
  border: none;
}

@media screen and (max-width: 768px) {
  form {
      width: 60%;
      & .form-input, .form__btn {
        font-size: 14px;
        width: auto;
    }
  }
}

  // Responsive mobile
@media screen and (max-width: 768px) {
  body {
    margin: 0px;
  }
  form {
    width: 100%;
  }
  .form__btn {
    margin-bottom: 20px;
  }
  .postForm {
    width: 100%;
    margin: 0px;
    padding: 0px;
    border-radius: 0px;
    & h1 {
      margin-top: 20px;
    }
  }
  #previewMedia {
    width: 80%;
  }
}
</style>
