<template>
<div id="body">
    <!-- Header de la page de log in/sign up -->
    <header id="log-header" class="log-header">
        <h1 class="log-header__title"><img src="../assets/icon-left-font-monochrome-white.png" alt="Logo Groupomania Blanc" class="log-header__logo"></h1>
        <nav class="log-header__nav">
            <button @click="loginWindow = true; signupWindow = false" class="log-header__nav__login header__btn">
                Se connecter
            </button>
            <button @click="loginWindow = false; signupWindow = true" class="log-header__nav_signup header__btn">
                S'inscrire
            </button>
        </nav>
    </header>
    
    <main id="main" class="main">
    <!-- Bloc connexion -->
        <div v-if="loginWindow" class="main__form">
            <form method="post" @submit.prevent="login()">
                <div class="form">
                    <div>
                        <label for="email">Identifiant</label>
                        <input id="email" class="form-input" type="email" name="email" placeholder="Email" v-model="email" aria-label="email" required>
                    </div>

                    <div>
                        <label for="password">Mot de passe</label>
                        <input id="password" class="form-input" type="password" name="password" placeholder="Mot de passe" v-model="password" aria-label="mot de passe" required>
                    </div>

                    <p class="signup-error" v-if="this.$store.state.errorMsg != null">{{ this.$store.state.errorMsg }}</p>
                </div>
            
                <button type="submit" class="form__btn">Se connecter</button>
            </form>

            <p>Pas encore inscrit ? <span><a href="#" @click="loginWindow = false; signupWindow = true">S'inscrire</a></span></p>
        </div>

        <!-- Bloc inscription -->
        <div v-if="signupWindow" class="main__form">
            <form method="post" @submit.prevent="signup()">
                <div class="form">
                    <div>
                        <label for="name">Nom</label>
                        <input id="lastname" class="form-input" type="text" name="name" placeholder="Nom" v-model="name" aria-label="name" required>
                    </div>

                    <div>
                        <label for="firstname">Prénom</label>
                        <input id="firstname" class="form-input" type="text" name="firstname" placeholder="Prénom" v-model="firstname" aria-label="firstname" required>
                    </div>

                    <div>
                        <label for="email">Email</label>
                        <input id="email" class="form-input" type="email" name="email" placeholder="Email" v-model="email" aria-label="email" required>
                    </div>

                    <div>
                        <label for="password" id="pwLabel">Mot de passe</label>
                        <input id="password" class="form-input" type="password" name="password" placeholder="Mot de passe" v-model="password" aria-label="mot de passe" required>
                    </div>
                    <p class="signup-error" v-if="this.$store.state.errorMsg != null">{{ this.$store.state.errorMsg }}</p>
                </div>
            
                <button type="submit" class="form__btn">S'inscrire</button>
            </form>

            <p>Déjà inscrit ? <span><a href="#" @click="loginWindow = true; signupWindow = false">Se connecter</a></span></p>
        </div>
    </main>

</div>
</template>

<script>

import axios from "axios"

export default {
    data() {
        return {
            loginWindow: true,
            signupWindow: false,
            validPassword : false,
            name: null,
            firstname: null,
            email: null,
            password: null
        }
    },
    methods: {
         login() {
            axios.post('http://localhost:3000/api/login', {
                email: this.email,
                password: this.password
            })
            .then((res) => {
                localStorage.setItem("user", res.data.userId);
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("selectedUser", res.data.userId)
                this.$store.dispatch("getUserId", res.data.userId);
                this.$store.state.connectedUser = res.data.userId
                this.email = this.password = null;
                this.$router.push("/Home")
                alert("Bienvenue, vous êtes bien connecté !");
            })
            .catch(() => {
                this.password = null;
                this.$store.state.errorMsg = "Email ou mot de passe incorrect !"
            })
        },
        signup() {
            axios.post('http://localhost:3000/api/signup', {
                name: this.name,
                firstname: this.firstname,
                email: this.email,
                password: this.password
            })
            .then(() => {
                this.login();
            })
            .catch(() => {
                this.$store.state.errorMsg = "Une erreur est survenue !"
            })
        },
    },
}
</script>

<style lang="scss">
#body {
    background: #091F43;
     height: 100%;
};

.log-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: auto;
    min-height: 100px;
    &__title {
        display: flex;
        align-items: center;
        height: 100px;
    }
    &__logo {
        padding-left : 50px;
        height: 50%;
    };
}
.header {
    &__btn {
        width: 140px;
        margin: 10px 20px;
        padding: 5px;
        background: #d4777d;
        border-radius: 10px;
        color: #fff;
        font-size: 16px;
        border: none;
        &:hover {
            transform: scale(1.1);
            background: #fff;
            color: #d4777d;
        };        
    }
}
.main {
    min-height: 700px;
    margin-top: 40px;
    &__form {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        width: 40%;
        margin: 40px auto 50px auto;
        padding: 20px 20px;
        background: #d4777d;
        border-radius: 10px;
        font-size: 15px;
        & form {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        & input {
            border-radius: 7px;
            padding-right: 10px;
        }; 
    }
}
.form {
    margin-bottom: 30px;
    &__btn {
        width: 140px;
        margin: 10px 20px;
        padding: 5px;
        background: #091F43;
        border-radius: 10px;
        border: none;
        font-size: 16px;
        color: #fff;
        &:hover {
            transform: scale(1.11);
            color: #091F43;
            background: #B8B8B8;
            
        };
    };   
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
    & p {
        margin-top: 20px;
        font-style: italic;
    }
    & .signup-error {
        text-align: center;
    }
}
// Responsive mobile
@media screen and (max-width: 768px) {
    a, p, label {
        font-size: 14px;
    }
    .log-header {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 180px;
        padding: 0 0 20px 0;
        &__logo {
            padding: 0;
        }
        &__nav {
            padding: 0;
        }
        & button {
            font-size: 14px;
            width: 100px;
        }
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