<template>
	<section>
    <v-card
      width="200px"
      height="200px"
    >
      <v-card-title class="cardTitle">
        <img @click="$refs.ModalEditProducts.openModal(code, 'view')" src="../assets/sale.jpg" class="cardImg"/>
      </v-card-title>
      <v-card-text class="cardText">
        <p class="pNameProduct">{{ name }}</p>
        <p class="pPriceProduct">{{ price }}</p>
      </v-card-text>
      <v-card-actions class="cardActions">
        <button id="buttonEdit" @click="$refs.ModalEditProducts.openModal(code, 'edit')">Edit</button>
        <button id="buttonDelete" @click="deleteProduct">Delete</button>
      </v-card-actions>
    </v-card>
    
    <slot>
      <ModalEditProducts ref="ModalEditProducts" />
    </slot>
  </section>
</template>

<script>
import ModalEditProducts from "./ModalEditProducts";

export default {
  name: "Card",
  components: {
    ModalEditProducts,
  },
  props: {
    name: String,
    code: String,
    price: Number,
    cnpj: String,
	},
  methods: {
    deleteProduct(){
      this.$store.dispatch("deleteAsset", {type:"product", code:this.code}).then(res =>{
        if(res.status == 200)
          this.$emit('event');
      });
    },
  },
}
</script>

<style scoped>
.cardTitle {
    
}
    .cardImg {
      width: 200px;
      height: 100px;
      position: absolute;
      left: 0px;
      top: 0px;
    }
  .cardText {
    padding-top: 8px;
    color: #2c3e50;
    text-align: center;
    height: 60px;
    width: 100%;
    position: absolute;
    top: 100px;
  }
    .pNameProduct {
      font-size: 18px;
      margin: 0px;
      font-weight: bolder;
      color: #2c3e50;
    }
    .pPriceProduct {
      font-size: 14px;
      margin: 8px 0px 0px 0px;
      color: #2c3e50;
      background-color: green;
      border-radius: 10px;
    }
  .cardActions {
    position: absolute;
    left: 0px;
    bottom: 0px;
    width: 100%;
    height: 40px;
    text-align: center;
  }
    #buttonEdit {
      width: 70px;
      height: 20px;
      border-radius: 10px;
      color: green;
      border: 1px solid green;
      margin: 5px;
    }
    #buttonDelete {
      width: 70px;
      height: 20px;
      border-radius: 10px;
      color: red;
      border: 1px solid red;
      margin: 5px;
    }
</style>