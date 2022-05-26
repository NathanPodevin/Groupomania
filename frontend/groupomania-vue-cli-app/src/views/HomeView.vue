<template>
<div id="body">
    <!-- Header de la page d'accueil' -->
    <PageHeader/>

    <main id="main" class="main">

    </main>

</div>
</template>
    

<script>

import PageHeader from '../components/PageHeader.vue'

export default {
  components: {
  PageHeader
  }    
}
</script>

<style lang="scss">
#body {
    background: #091F43;
     height: 100%;
};

.main {
    min-height: 700px;
    margin-top: 40px;
    &__form {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 40%;
        margin: 40px auto 50px auto;
        padding: 20px 20px;
        background: #d4777d;
        border-radius: 10px;
        font-size: 15px;
   }
}

// Responsive mobile
@media screen and (max-width: 768px) {
    a, p, label {
        font-size: 14px;
    }
    .main {
        min-height: 600px;
        background-size: contain;
        &__form {
            width: 60%;
            & .form-input, .form__btn {
                font-size: 14px;
                width: auto;
            }
        }
    }
    
}
</style>