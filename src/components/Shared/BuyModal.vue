<template>
  <v-dialog width="400" v-model="modal">
    <template v-slot:activator="{ on }">
      <v-btn class="primary" v-on="on">Buy</v-btn>
    </template>
    <v-card>
      <v-container>

        <v-layout row>
          <v-flex xs12>
            <v-card-title>
              <h1 class="text--primary">Buy modal</h1>
            </v-card-title>
          </v-flex>
        </v-layout>

        <v-divider></v-divider>

        <v-layout row>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                  name="name"
                  label="Your name"
                  type="text"
                  v-model="name"
              ></v-text-field>
              <v-text-field
                  name="phone"
                  label="Your phone"
                  type="text"
                  v-model="phone"
              ></v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="error" @click="onCancel" :disabled="localLoading">Close</v-btn>
              <v-btn class="success" @click="onSave" :disabled="localLoading" :loading="localLoading">Buy it!</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>

      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['ad'],
  data () {
    return {
      modal: false,
      localLoading: false,
      name: '',
      phone: ''
    }
  },
  methods: {
    onCancel() {
      this.name = ''
      this.phone = ''
      this.modal = false
    },
    onSave() {
      if (this.name !== '' && this.phone !== '') {
        this.localLoading = true
        this.$store.dispatch('createOrder', {
          name: this.name,
          phone: this.phone,
          adId: this.ad.id,
          ownerId: this.ad.ownerId
        })
        .finally(() => {
          this.name = ''
          this.phone = ''
          this.localLoading = false
          this.modal = false
        })
      }
    }
  }
}
</script>
