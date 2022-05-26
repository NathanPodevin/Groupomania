<template>
    <header id="log-header" class="log-header">
        <h1 class="log-header__title"><img src="../assets/icon-left-font-monochrome-white.png" alt="Logo Groupomania Blanc" class="log-header__logo"></h1>
        <nav class="log-header__nav">
            <div class="log-header__nav_menu">
                <router-link to="/Home">Home</router-link> |
                <router-link to="/Post">Publier</router-link> |
                <router-link to="/Profil">Profil</router-link>
            </div>
            <button @click="logout()" class="log-header__nav_logout header__btn">
                Se déconnecter
            </button>
        </nav>
    </header>
</template>

<script>

import {mapActions} from 'vuex'

export default {
    name: 'PageHeader',

    methods: {
        ...mapActions(["logout"]),
    },
}

</script>

<style lang="scss">

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
    }
    &__nav {
        display: flex;
        flex-direction: row;
        &_menu {
            margin: auto;
        }
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
}

</style>