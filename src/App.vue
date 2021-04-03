<template>
<!--
- filtrar select com categoria na pagina inicial
-->
  <v-app id="main">
    <section>
      <div id="app">
        <h1>Block<span id="blockchain">chain</span></h1>
        <select id="select" v-model="selectedCategory">
          <option value="" selected>All</option>
          <option v-for="category of categories" :key="category.name" value="category.name">
            {{category.name}}
          </option>
        </select>
        <br>
        <button id="editCategory" @click="$refs.ModalEditCategories.openModal()">Edit</button>
      </div>
    </section>
    
    <v-container class="my-5">
      <v-layout row wrap justify-center>
        <v-flex xs12 md3 id="sellers">
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
                <input class="checkbox" type="checkbox" :checked="checkedSellers[i]" v-model="checkedSellers[i]">
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

        <v-flex xs12 md9 id="products">
          <h3>Products found</h3><br>
          <span v-for="product of productsCategory" :key="product.code">
            <Card class="cardProduct" @event="handlerProducts" v-if="selectedCategory == product.category || selectedCategory == ''" :name="product.name" :code="product.code" :price="product.price" :cnpj="product.soldBy.cnpj"/>
          </span>

          <h3>Other products</h3><br>
          <span v-for="product of productsOther" :key="product.code">
            <Card class="cardProduct" @event="handlerProducts" v-if="selectedCategory != product.category && selectedCategory != ''" :name="product.name" :code="product.code" :price="product.price" :cnpj="product.soldBy.cnpj" />
          </span>

          <div id="addProduct">
            <button @click="$refs.ModalEditProducts.openModal('', 'create')"><i class="fas fa-plus-circle"></i></button>
          </div>
        </v-flex>
      </v-layout>
    </v-container>

    <div id="modals">
      <ModalEditSellers ref="ModalEditSellers" @event="handlerSellers" />
      <ModalEditCategories ref="ModalEditCategories" @event="handlerCategories" />
      <ModalEditProducts ref="ModalEditProducts" @event="handlerProducts" />
    </div>
  </v-app>
</template>

<script>
import Card from "./components/Card";
import ModalEditSellers from "./components/ModalEditSellers";
import ModalEditProducts from "./components/ModalEditProducts";
import ModalEditCategories from "./components/ModalEditCategories";

export default {
  name: "App",
  components: {
    Card,
    ModalEditSellers,
    ModalEditProducts,
    ModalEditCategories,
  },
  data() {
    return {
      productsCategory: [],
      productsOther: [],
      sellers: [],
      categories: [],
      checkedSellers: [],
      selectedCategory: ""
    }
  },
  mounted(){
    this.showCategories();
    this.showSellers();
    this.showProducts();
  },
  methods: {
    handlerProducts(params){
      if(params[1] && params[0]){
        this.$refs.ModalEditProducts.openModal(params[1], params[0]);
      }
      else{
        this.showProducts();
      }
    },
    handlerCategories() {
      this.showCategories();
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
        this.productsCategory = JSON.parse(JSON.stringify(res.data.result));
        this.productsOther = JSON.parse(JSON.stringify(res.data.result));
        for(var i=0; i<this.productsOther.length; i++){
          console.log(this.productsOther[i].name);
          console.log(this.productsOther[i].categories);
        }
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
#blockchain {
  background-color: #6300ff;
  color: white;
  border-radius: 8px;
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
    width: 205px;
    position: relative;
    left: 50%;
    margin-left: -90px;
  }
    .tdSellersTitle {
      overflow: hidden;
      text-align: left;
      white-space: nowrap;
      max-width: 130px;
      height: 20px;
    }
      .checkbox {
        all: unset;
        width: 11px;
        height: 11px;
        display: inline-block;
        border-radius: 2px;
        border: 1px solid #2c3e50;
        margin: 4px 0px 0px 0px;
      }
      .checkbox:checked{
        background-color: #6300ff;
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
@media(max-width: 442px){
  #products{
    padding: 10px;
    text-align: center;
  }
}
.cardProduct {
  display: inline-block;
  margin: 5px;
  border: 1px solid #2c3e50;
  border-radius: 8px;
  overflow: hidden;
}
.cardProduct:hover {
  box-shadow: 1px 1px 5px rgba(0,0,0,.5);
}
#addProduct {
  width: 200px;
  height: 200px;
  background-color: #2c3e50;
  color: white;
  border-radius: 8px;
  font-size: 80px;
  text-align: center;
  padding-top: 40px;
  display: inline-block;
}
</style>