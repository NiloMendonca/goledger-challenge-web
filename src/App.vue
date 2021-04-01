<template>
  <v-app>
    <section>
      <div id="app">
        <h1>Blockchain</h1>
        <button @click="showAll" class="selectButtons">All</button>
        <button @click="showProducts" class="selectButtons">Products</button>
        <button @click="showSellers" class="selectButtons">Sellers</button>
        <button @click="showCategories" class="selectButtons">Categories</button>
      </div>
    </section>
    <v-main>
      <v-container fluid>
        <v-row justify="center">
          <v-col cols="12" md="11" lg="9" xl="8">
            <span v-for="product of products" :key="product.name">
              <Card :name="product.name"/>
            </span>
            <tr v-for="seller of sellers" :key="seller.name">
              <Card :name="seller.name"/>
            </tr>
            <tr v-for="category of categories" :key="category.name">
              <Card :name="category.name"/>
            </tr>
            
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Card from "./components/Card";

export default {
  name: "App",
  components: {
    Card,
  },
  data() {
    return {
      products: [],
      sellers: [],
      categories: []
    }
  },
  methods: {
    showAll(){
      this.showProducts();
      this.showSellers();
      this.showCategories();
    },
    showProducts(){
      this.$store.dispatch("postSearchAsset", {type:"product"}).then(res =>{
        this.products = JSON.parse(JSON.stringify(res.data.result));
        console.log(this.products);
      });
    },
    showSellers(){
      this.$store.dispatch("postSearchAsset", {type:"seller"}).then(res =>{
        this.sellers = JSON.parse(JSON.stringify(res.data.result));
        console.log(this.sellers);
      });
    },
    showCategories(){
      this.$store.dispatch("postSearchAsset", {type:"category"}).then(res =>{
        this.categories = JSON.parse(JSON.stringify(res.data.result));
        console.log(this.categories);
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

.selectButtons {
  border: 1px solid #2c3e50;
  width: 100px;
  height: 30px;
  position: relative;
  padding: 3px;
  border-radius: 30px;
  font-size: 15px;
  color: #2c3e50;
  text-align: center;
  margin: 10px;
}
</style>