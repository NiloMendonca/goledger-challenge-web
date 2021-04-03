<template>
  <transition name="fade">
    <div class="modal" v-if="show">
      <div class="modalBackdrop" @click="closeModal()"/>

      <div class="modalDialog">
        <div class="modalHeader">
          <span class="textHeader" v-if="type == 'view'">
            <h1 class="textHeader">{{ data.name }}</h1>
          </span>
          <span class="textHeader" v-if="type == 'edit' || type == 'create'">
            <h1 class="textHeader">Product</h1>
          </span>
        </div>

        <div class="modalBody">
          <table v-if="type == 'view'">
            <tr>
              <td class="tdCategoriesTitle">
                CODE
              </td>
              <td class="tdCategoriesButtons">
                {{ data.code }}
              </td>
            </tr>
            <tr>
              <td class="tdCategoriesTitle">
                PRICE
              </td>
              <td class="tdCategoriesButtons">
                R${{ data.price }}
              </td>
            </tr>
            <tr>
              <td class="tdCategoriesTitle">
                COMPANY
              </td>
              <td class="tdCategoriesButtons">
                <span v-for="seller of sellers" :key="seller.cnpj">
                  <span class="spanTdCategoriesButtons" v-if="seller.cnpj == data.soldBy.cnpj">
                    {{ seller.name }}
                  </span>
                </span>
              </td>
            </tr>
            <tr>
              <td class="tdCategoriesTitle">
                CNPJ
              </td>
              <td class="tdCategoriesButtons">
                {{ data.soldBy.cnpj }}
              </td>
            </tr>
          </table>
          <span v-if="type == 'edit' || type == 'create'">
            <span v-if="type == 'edit'">Code:{{ data.code }}</span><br>
            <input class="inputProducts" type="text" v-model="data.name" placeholder="Name"/>
            <input class="inputProducts" type="text" v-model="data.code" placeholder="Code" v-if="type == 'create'"/>
            <input class="inputProducts" type="number" v-model="data.price" placeholder="Price"/>
            <select class="inputProducts" id="select" v-model="data.soldBy.cnpj">
              <option v-for="seller of sellers" :key="seller.cnpj" :value="seller.cnpj">
                {{ seller.name }}
              </option>
            </select>

            <table id="tableCategories">
              <tr>
                <td class="tableTitle">
                  <h3>Categories</h3>
                </td>
              </tr>
              <tr v-for="(category, i) of categories" :key="category.name">
                <td class="tableOptions">
                  <input class="checkbox" type="checkbox" :checked="checkedCategories[i]" v-model="checkedCategories[i]">
                  {{ category.name }}
                </td>
              </tr>
            </table>
          </span>
        </div>

        <div class="modalFooter">
          <button id="buttonFooter" v-if="type == 'edit' || type == 'create'" @click="save">Save</button>
          <button id="buttonFooter" v-if="type == 'edit' || type == 'view'" @click="deleteProduct">Delete</button>
          <button id="buttonFooter" class="modalClose" @click="closeModal()">Close</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ModalEditProduct",
  data() {
    return {
      show: false,
      data: [],
      code: "",
      type: "",
      sellers: [],
      categories: [],
      checkedCategories: []
    };
  },
  methods: {
    getSellers(){
      this.$store.dispatch("postSearchAsset", {type:"seller"}).then(res =>{
        this.sellers = JSON.parse(JSON.stringify(res.data.result));
      });
    },
    getCategories(){
      this.$store.dispatch("postSearchAsset", {type:"category"}).then(res =>{
        this.categories = JSON.parse(JSON.stringify(res.data.result));
      });
    },
    deleteProduct(){
      this.$store.dispatch("deleteAsset", {type:"product", code:this.code}).then(res =>{
        if(res.status == 200)
          this.closeModal();
      });
    },
    save(){
      var categories = [];
      for(var i=0; i<this.categories.length; i++){
        if(this.checkedCategories[i] == 1){
          this.categories[i] = JSON.parse(JSON.stringify(this.categories[i]));
          var temp = {
            "@assetType":this.categories[i]["@assetType"],
            "@key":this.categories[i]["@key"],
            "@lastTouchBy":this.categories[i]["@lastTouchBy"],
            "name":this.categories[i].name
          }
          categories.push(temp);
        }
      }

      if(this.type == "edit"){
        this.$store.dispatch("putUpdateAssetProduct", {name: this.data.name, code: this.data.code, price: this.data.price, cnpj: this.data.soldBy.cnpj, categories: categories}).then(res =>{
          if(res.status == 200){
            this.data.name = "";
            this.data.code = "";
            this.data.price = 0;
            this.data.soldBy = {cnpj:""};
            this.data.categories = [];
            this.closeModal();
          }
        });
      }
      else if(this.type == "create"){
        this.$store.dispatch("postCreateAssetProduct", {name: this.data.name, code: this.data.code, price: this.data.price, cnpj: this.data.soldBy.cnpj, categories: categories}).then(res =>{
          if(res.status == 200){
            this.data.name = "";
            this.data.code = "";
            this.data.price = 0;
            this.data.soldBy = {cnpj:""};
            this.data.categories = [];
            this.closeModal();
          }
        });
      }
    },
    closeModal() {
      this.$emit('event', ['', '']);
      this.show = false;
    },
    openModal(code, type) {
      this.show = true;
      if(code)
        this.code = code;
      if(type){
        this.type = type;
        if(this.type == "create"){
          this.data.name = "";
          this.data.code = "";
          this.data.price = 0;
          this.data.soldBy = {cnpj:""};
          this.data.categories = [];
        }
      }

      this.$store.dispatch("postReadAsset", {type:"product", code: this.code}).then(res =>{
        this.data = JSON.parse(JSON.stringify(res.data));
        this.data.categories = [];
      });
      this.getSellers();
      this.getCategories();
    }
  }
};
</script>


<style lang="scss" scoped>
.modal {
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9;
  &Backdrop {
    background-color: rgba(0, 0, 0, 0.3);
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
  }
  &Dialog {
    background-color: #ffffff;
    position: relative;
    width: 350px;
    margin: 50px auto;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    z-index: 2;
    padding: 0px 15px 0px 15px;
    @media screen and (max-width: 992px) {
      width: 90%;
    }
  }
  &Header {
    padding: 20px 20px 0px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
  &Body {
    padding: 0px 20px 10px;
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    text-align: center;
  }
  &Footer {
    padding: 10px 20px 20px;
    text-align: right;
  }
}
.textHeader {
  text-align: center;
  width: 100%;
}
.tdCategoriesTitle {
  text-align: left;
  border-bottom: 1px solid rgba(44,62,80,.2);
}
.tdCategoriesButtons {
  text-align: left;
  position: relative;
}
.spanTdCategoriesButtons {
  position: absolute;
  left: 0px;
  top: 0px;
}
.inputProducts {
  width: 200px;
  height: 35px;
  border-radius: 5px;
  border: 1px solid #2c3e50;
  font-size: 15px;
  margin: 20px 2px 2px 2px;
  padding: 4px;
}
.inputProducts:focus {
  border: 2px solid black;
  box-shadow: 0 0 0 0;
  outline: 0;
}
#tableCategories {
  width: 200px;
  position: relative;
  left: 50%;
  margin-left: -100px;
  margin-top: 10px;
}
  .tableTitle {
    text-align: center;
  }
    .tableOptions {
      text-align: left;
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
#buttonFooter {
  width: 70px;
  height: 30px;
  color: #6300ff;
  font-weight: bolder;
  border-radius: 30px;
}
button:focus {
  border: 2px solid black;
  box-shadow: 0 0 0 0;
  outline: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>