import Vue from 'vue'
import Vuex from 'vuex'
import http from '../http'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: null,
  },
  mutations: {},
  actions: {
  ////////////////////////////////////////
  ////////////////////////// CREATE ASSET
    async postCreateAssetProduct(context, data) {
      return http.post("/invoke/createAsset", {
        "asset": [
          {
            "@assetType": "product",
            "name": data.name,
            "code": data.code,
            "price": data.price,
            "soldBy": { "cnpj":data.cnpj }
          }
        ]
      });
    },
    async postCreateAssetSeller(context, data) {
      return http.post("/invoke/createAsset", {
        "asset": [
          {
            "@assetType": "seller",
            "cnpj": data.cnpj,
            "name": data.name,
            "address": data.address,
            "dateJoined": data.dateJoined
          }
        ]
      });
    },
    async postCreateAssetCategory(context, data) {
      return http.post("/invoke/createAsset", {
        "asset": [
          {
            "@assetType": "category",
            "name": data.name
          }
        ]
      });
    },

  ////////////////////////////////////////
  ////////////////////////// READ ASSET
    async postReadAsset(context, data) {
      if(data.type == "product"){
        return http.post("/invoke/readAsset", {
          "key": {
            "@assetType": "product",
            "code": data.code
          }
        });
      }
      else if(data.type == "seller"){
        return http.post("/invoke/readAsset", {
          "key": {
            "@assetType": "seller",
            "cnpj": data.code
          }
        });
      }
      else {
        return http.post("/invoke/readAsset", {
          "key": {
            "@assetType": "category",
            "name": data.code
          }
        });
      }
    },
   
  ////////////////////////////////////////
  ////////////////////////// SEARCH ASSET
    async postSearchAsset(context, data) {
      if(data.type == "product"){
        return http.post("/query/search", {
          "query": {
            "selector": {
              "@assetType": "product"
            }
          }
        });
      }
      else if(data.type == "seller"){
        return http.post("/query/search", {
          "query": {
            "selector": {
              "@assetType": "seller"
            }
          }
        });
      }
      else {
        return http.post("/query/search", {
          "query": {
            "selector": {
              "@assetType": "category"
            }
          }
        });
      }
    },

  ////////////////////////////////////////
  ////////////////////////// UPDATE ASSET
    async putUpdateAssetProduct(context, data) {
      return http.put("/invoke/updateAsset", {
         "update": {
            "@assetType": "product",
            "name": data.name,
            "code": data.code,
            "price": data.price,
            "soldBy": { "cnpj":data.cnpj }
          }
      });
    },
    async putUpdateAssetSeller(context, data) {
      return http.put("/invoke/updateAsset", {
        "update": {
            "@assetType": "seller",
            "cnpj": data.cnpj,
            "name": data.name,
            "address": data.address,
            "dateJoined": data.dateJoined
          }
      });
    },

  ////////////////////////////////////////
  ////////////////////////// DELETE ASSET
    async deleteAsset(context, data) {
      if(data.type == "product"){
        return http.delete("/invoke/deleteAsset", {
          "key": {
            "@assetType": "product",
            "code": data.code
          }
        });
      }
      else if(data.type == "seller"){
        return http.delete("/invoke/deleteAsset", {
          "key": {
            "@assetType": "seller",
            "cnpj": data.code
          }
        });
      }
      else{
        return http.delete("/invoke/deleteAsset", {
          "key": {
            "@assetType": "category",
            "name": data.code
          }
        });
      }
    },
  },
  modules: {

  }
})

export default store