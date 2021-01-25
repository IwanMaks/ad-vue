import firebase from "firebase";

class Ad {
    constructor(title, description, ownerId = '', imgSrc = '', promo = false, id = null) {
        this.title = title
        this.description = description
        this.ownerId = ownerId
        this.imgSrc = imgSrc
        this.promo = promo
        this.id = id
    }
}

export default {
    state: {
        ads: []
    },
    mutations: {
        createAd (state, payload) {
            state.ads.push(payload)
        },
        loadAds (state, payload) {
            state.ads = payload
        },
        updateAd (state, {title, description, id}) {
            const ad = state.ads.find(a => {
                return a.id = id
            })
            ad.title = title
            ad.description = description
        }
    },
    actions: {
        async createAd ({commit, getters}, payload) {
            commit('clearError')
            commit('setLoading', true)

            const image = payload.imgSrc

            try {
                const newAd = new Ad(payload.title, payload.description, getters.user.id, '', payload.promo)
                const imgExt = image.name.slice(image.name.lastIndexOf('.'))

                const ad = await firebase.database().ref('ads').push(newAd)
                const fileData = await firebase.storage().ref(`ads/${ad.key}${imgExt}`).put(image)
                const imgSrc = await fileData.ref.getDownloadURL()

                await firebase.database().ref('ads').child(ad.key).update({
                    imgSrc
                })

                commit('setLoading', false)
                commit('createAd', {
                    ...newAd,
                    id: ad.key,
                    imgSrc
                })
            } catch (e) {
                commit('setError', e.message)
                commit('setLoading', false)
                throw e
            }
        },
        async fetchAds ({commit}) {
            commit('clearError')
            commit('setLoading', true)

            const resultAds = []
            
            try {
                const fbVal = await firebase.database().ref('ads').once('value')
                const ads = fbVal.val()

                Object.keys(ads).forEach(key => {
                    const ad = ads[key]
                    resultAds.push(
                        new Ad(ad.title, ad.description, ad.ownerId, ad.imgSrc, ad.promo, key)
                    )
                })

                commit('loadAds', resultAds)
                commit('setLoading', false)
            } catch (e) {
                commit('setError', e.message)
                commit('setLoading', false)
                throw e
            }
        },
        async updateAd ({commit}, {title, description, id}) {
            commit('clearError')
            commit('setLoading', true)

            try {
                await firebase.database().ref('ads').child(id).update({
                    title, description
                })
                commit('updateAd', {
                    title, description, id
                })
                commit('setLoading', false)
            } catch (e) {
                commit('setError', e.message)
                commit('setLoading', false)
                throw e
            }
        }
    },
    getters: {
        ads (state) {
            return state.ads
        },
        promoAds (state) {
            return state.ads.filter(ad => {
                return ad.promo
            })
        },
        myAds (state, getters) {
            return state.ads.filter(ad => {
                return ad.ownerId === getters.user.id
            })
        },
        adById (state) {
            return adId => {
                return state.ads.find(ad => adId === ad.id)
            }
        }
    }
}