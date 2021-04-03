<template>
	<section>
    <v-card
      width="200px"
      height="200px"
    >
      <v-card-title class="cardTitle">
        <svg @click="openModal(code, 'view')" class="cardSvg" x="0px" y="0px" width="200px" height="100px" viewBox="0 0 200 100" enable-background="new 0 0 200 100" xml:space="preserve">
          <switch>
            <g i:extraneous="self">
              <circle fill="#39383D" cx="98.2" cy="39.5" r="35.4"/>
              
                <polygon fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="
                98.2,41.7 121,28.5 121,50.7 98.1,64.3     "/>
              
                <polygon fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="
                98.5,41.7 74.5,28.3 74.6,49.6 98.1,64.3     "/>
              
                <polygon fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="
                121,28.5 98.2,15.2 74.6,28.3 98.5,41.7    "/>
              
                <polygon fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="
                83.8,23.2 107,36.5 107,44 112,41 112,33 89.7,19.9     "/>
              <text transform="matrix(1 0 0 1 73.7363 95.001)" fill="#39383D" font-family="'MyriadPro-Regular'" font-size="12">GoLedger</text>
              <text transform="matrix(1 0 0 1 86.874 83.667)" fill="#39383D" font-family="'MyriadPro-Regular'" font-size="7">Desafio</text>
            </g>
          </switch>
        </svg>
      </v-card-title>
      <v-card-text class="cardText">
        <p class="pNameProduct">{{ name }}</p>
        <div class="divPriceProduct">R$ &nbsp; {{ format(price) }}</div>
      </v-card-text>
      <v-card-actions class="cardActions">
        <button id="buttonEdit" @click="openModal(code, 'edit')"><i class="fas fa-pen"></i></button>
        <button id="buttonDelete" @click="deleteProduct"><i class="fas fa-trash-alt"></i></button>
      </v-card-actions>
    </v-card>
  </section>
</template>

<script>

export default {
  name: "Card",
  components: {
  },
  props: {
    name: String,
    code: String,
    price: Number,
    cnpj: String,
	},
  methods: {
    format(price){
      return price.toFixed(2);
    },
    openModal(code, type){
      this.$emit('event', [type, code]);
    },
    deleteProduct(){
      this.$store.dispatch("deleteAsset", {type:"product", code:this.code}).then(res =>{
        if(res.status == 200)
          this.$emit('event', ['', '']);
      });
    },
  },
}
</script>

<style scoped>
.cardSvg {
  position: absolute;
  left: 0px;
  top: 0px;
  background-color: rgba(100,100,100,.1);
}
.cardSvg:hover {
  position: absolute;
  left: 0px;
  top: 0px;
  background-color: rgba(100,100,100,.2);
  cursor:pointer;
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
    color: #6300ff;
    white-space: nowrap;
    width: 100%;
    overflow: hidden;
  }
  .divPriceProduct {
    font-size: 15px;
    margin: 8px 0px 0px 0px;
    color: #006400;
    background-color: #98FB98;
    border-radius: 10px;
    font-weight: bolder;
    display:inline-block;
    padding: 0px 10px 0px 10px;
  }

.cardActions {
  position: absolute;
  left: 0px;
  bottom: 0px;
  width: 100%;
  height: 30px;
}
  #buttonEdit {
    width: 30px;
    height: 20px;
    color: #2c3e50;
    margin: 5px;
    left: 50%;
    margin-left: -35px;
    position: absolute;
  }
  #buttonDelete {
    width: 30px;
    height: 20px;
    color: #2c3e50;
    margin: 5px;
    left: 50%;
    margin-left: 5px;
    position: absolute;
  }
</style>