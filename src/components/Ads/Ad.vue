<template>
    <v-container>
        <v-layout row>
            <v-flex xs12>
                <v-card class="mt-5" v-if="!loading">
                    <v-img :src="ad.imgSrc" height="300"></v-img>
                    <v-card-text>
                        <h1 class="text--primary mb-3">{{ad.title}}</h1>
                        <p>{{ad.description}}</p>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <appEditAdModal :ad="ad" v-if="isOwner" class="mr-10"></appEditAdModal>
                        <app-buy-modal :ad="ad"></app-buy-modal>
                    </v-card-actions>
                </v-card>
              <div v-else class="text-center">
                <v-progress-circular
                    :size="100"
                    :width="4"
                    color="purple"
                    indeterminate
                ></v-progress-circular>
              </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import EditAdModal from "@/components/Ads/EditAdModal";

export default {
    props: ['id'],
    computed: {
        ad() {
            const id = this.id
            return this.$store.getters.adById(id);
        },
      loading() {
          return this.$store.getters.loading
      },
      isOwner() {
          if (this.$store.getters.user) {
            return this.ad.ownerId === this.$store.getters.user.id
          } else {
            return false
          }
      }
    },
    components: {
      appEditAdModal: EditAdModal
    }
}
</script>

<style scoped>

</style>