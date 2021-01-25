<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <h1 class="text--secondary mb-3">Create New Ad</h1>
                <v-form ref="form" v-model="valid" validation>
                    <v-text-field
                        name="title"
                        label="Ad title"
                        type="text"
                        v-model="title"
                        :rules="[v => !!v || 'Title is required']"
                    ></v-text-field>
                    <v-textarea
                        no-resize
                        name="description"
                        label="Description"
                        type="text"
                        :rules="[v => !!v || 'Description is required']"
                        v-model="description"
                        class="mb-5"
                    ></v-textarea>
                </v-form>
                <v-layout row>
                    <v-flex xs12>
                        <v-btn
                            class="ma-3 warning"
                            @click="trigerUpload"
                        >
                            Upload
                            <v-icon
                                right
                                dark
                            >
                                mdi-cloud-upload
                            </v-icon>
                        </v-btn>
                        <input ref="fileInput" type="file" style="display: none;" accept="image/*" @change="onFileChange">
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12>
                        <img :src="imgSrc" height="200" class="ma-3" v-if="imgSrc"/>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12>
                        <v-switch
                            v-model="promo"
                            label="Add to promo?"
                            color="primary"
                            class="ma-3"
                        ></v-switch>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12>
                        <v-spacer></v-spacer>
                        <v-btn
                            class="primary ma-3"
                            @click="createAd"
                            :disabled="!valid || !img || loading"
                        >
                            Create Ad
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            title: '',
            description: '',
            promo: false,
            valid: false,
            img: null,
            imgSrc: ''
        }
    },
    computed: {
        loading() {
          return this.$store.getters.loading
        }
    },
    methods: {
        createAd() {
            if (this.$refs.form.validate() && this.img) {
                const ad = {
                    title: this.title,
                    description: this.description,
                    promo: this.promo,
                    imgSrc: this.img
                }

                this.$store.dispatch('createAd', ad)
                    .then(() => {
                        this.$router.push('/list')
                    })
                    .catch(() => {})
            }
        },
        trigerUpload () {
          this.$refs.fileInput.click()
        },
        onFileChange(event) {
            const file = event.target.files[0]

            const reader = new FileReader()
            reader.onload = () => {
                this.imgSrc = reader.result
            }
            reader.readAsDataURL(file)
            this.img = file
        }
    }
}
</script>

<style scoped>

</style>