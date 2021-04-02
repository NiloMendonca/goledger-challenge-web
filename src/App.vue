<template>
<!-- 
- Editar produto em modal
- Delete produto em modal
 -->
  <v-app id="main">
    <section>
      <div id="app">
        <h1>Blockchain</h1>
        <select id="select" v-model="selectedCategory">
          <option value="" selected>All</option>
          <option v-for="category of categories" :key="category.name" value="category.name">
            {{category.name}}
          </option>
        </select>
        <br>
        <button id="editCategory" @click="$refs.ModalEditCategory.openModal()">Edit</button>
      </div>
    </section>
    
    <v-container class="my-5">
      <v-layout row wrap justify-center>
        <v-flex xs12 md2 id="sellers">
          <table id="tableSellers">
            <tr>
              <td class="tdSellersTitle">
                <h3>Sellers</h3>
              </td>
              <td class="tdSellersButtons">
                <button @click="$refs.ModalEditSellers.openModal('', 'create')"><i class="fas fa-plus-circle"></i></button>
              </td>
            </tr>
            <tr v-for="(seller, i) of sellers" :key="seller.cnpj">
              <td class="tdSellersTitle">
                <input type="checkbox" :checked="checkedSellers[i]" v-model="checkedSellers[i]">
                {{ seller.name }}
              </td>
              <td class="tdSellersButtons">
                <button class="buttonSeller" @click="$refs.ModalEditSellers.openModal(seller.cnpj, 'view')"><i class="fas fa-eye"></i></button>
                <button class="buttonSeller" @click="$refs.ModalEditSellers.openModal(seller.cnpj, 'edit')"><i class="fas fa-pen"></i></button>
                <button class="buttonSeller" @click="deleteSeller(seller.cnpj)"><i class="fas fa-trash-alt"></i></button>
              </td>
            </tr>
          </table>
        </v-flex>

        <v-flex xs12 md10 id="products">
          <h3>Products found</h3>
          <span v-for="product of products" :key="product.code">
            <Card class="cardProduct" @event="handlerProducts" v-if="selectedCategory == product.category || selectedCategory == ''" :name="product.name" 
                                                              :code="product.code"
                                                              :price="product.price"
                                                              :cnpj="product.soldBy.cnpj"
            />
          </span>

          <h3>Other products</h3>
          <span v-for="product of products" :key="product.code">
            <Card class="cardProduct" @event="handlerProducts" v-if="selectedCategory != product.category && selectedCategory != ''" :name="product.name" 
                                                              :code="product.code"
                                                              :price="product.price"
                                                              :cnpj="product.soldBy.cnpj"
            />
          </span>

          <button @click="$refs.ModalEditProducts.openModal('', 'create')"><i class="fas fa-plus-circle"></i></button>
        </v-flex>
      </v-layout>
    </v-container>

    <div id="modals">
      <ModalEditSellers ref="ModalEditSellers" @event="handlerSellers" />
      <ModalEditCategory ref="ModalEditCategory" />
      <ModalEditProducts ref="ModalEditProducts" @event="handlerProducts" />
    </div>
  </v-app>
</template>

<script>
import Card from "./components/Card";
import ModalEditSellers from "./components/ModalEditSellers";
import ModalEditProducts from "./components/ModalEditProducts";
import ModalEditCategory from "./components/ModalEditCategory";

export default {
  name: "App",
  components: {
    Card,
    ModalEditSellers,
    ModalEditProducts,
    ModalEditCategory,
  },
  data() {
    return {
      products: [],
      sellers: [],
      categories: [],
      checkedSellers: [],
      selectedCategory: "",
    }
  },
  mounted(){
    this.showCategories();
    this.showSellers();
    this.showProducts();
  },
  methods: {
    handlerProducts(){
      this.showProducts();
    },
    handlerSellers() {
      this.showSellers();
    },
    deleteSeller(cnpj){
      this.$store.dispatch("deleteAsset", {type:"seller", code:cnpj}).then(res =>{
        if(res.status == 200)
          this.showSellers();
      });
    },
    showProducts(){
      this.$store.dispatch("postSearchAsset", {type:"product"}).then(res =>{
        this.products = JSON.parse(JSON.stringify(res.data.result));
      });
    },
    showSellers(){
      this.$store.dispatch("postSearchAsset", {type:"seller"}).then(res =>{
        this.sellers = JSON.parse(JSON.stringify(res.data.result));
      });
    },
    showCategories(){
      this.$store.dispatch("postSearchAsset", {type:"category"}).then(res =>{
        this.categories = JSON.parse(JSON.stringify(res.data.result));
      });
    },
  },
}
</script>

<style scoped>
body {
  font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
  text-rendering: optimizelegibility;
  -moz-osx-font-smoothing: grayscale;
  -moz-text-size-adjust: none;
}
#main {
  background-color: white;
}
h1,.muted {
  color: #2c3e50;
}
h1 {
  font-size: 45px;
  font-weight: 600;
  text-align: center;
  margin: 30px 10px 10px 10px;
}
#app {
  max-width: 30em;
  margin: 1em auto;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(230,230,230,.8);
}
#modals {
  z-index: 100;
}
#select {
  width: 200px;
  height: 40px;
  border-radius: 20px;
  border: 1px solid #2c3e50;
  font-size: 20px;
  text-align: center;
  text-align-last: center;
  left: 50%;
  margin-left: -100px;
  overflow: hidden;
  position: relative;
}
#select:focus {
    box-shadow: 0 0 0 0;
    border: 2px solid black;
    outline: 0;
}
#editCategory {
  width: 50px;
  height: 20px;
  border-radius: 20px;
  background-color: #2c3e50;
  font-size: 13px;
  font-weight: bolder;
  text-align: center;
  left: 50%;
  margin-left: -25px;
  margin-top: 10px;
  position: relative;
  color: white;  
}
#editCategory:focus {
  box-shadow: 0 0 0 0;
  border: 2px solid black;
  outline: 0;
}
#sellers{
  padding: 10px;
}
  #tableSellers {
    width: 180px;
    position: relative;
    left: 50%;
    margin-left: -90px;
  }
    .tdSellersTitle {
      overflow: hidden;
      text-align: left;
    }
    .tdSellersButtons {
      overflow: hidden;
      text-align: right;
    }
      .buttonSeller {
        margin: 3px;
      }
#products{
  padding: 10px;
}
.cardProduct {
  display: inline-block;
  margin: 5px;
  border: 1px solid #2c3e50;
  border-radius: 8px;
  overflow: hidden;
}
</style>