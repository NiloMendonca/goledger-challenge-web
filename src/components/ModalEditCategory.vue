<template>
  <transition name="fade">
    <div class="modal" v-if="show">
      <div class="modalBackdrop" @click="closeModal()"/>

      <div class="modalDialog">
        <div class="modalHeader">
          <h1>Categories</h1>
        </div>

        <div class="modalBody">
          <table>
            <tr v-for="category of categories" :key="category.name">
              <td class="tdCategoriesTitle">
                {{ category.name }}
              </td>
              <td class="tdCategoriesButtons">
                <button @click="deleteCategory(category.name)"><i class="fas fa-trash-alt"></i></button>
              </td>
            </tr>
          </table>
          <span>
            <input id="inputNewCategory" type="text" v-model="name" placeholder="Name"/>
            <button id="buttonNewCategory" @click="createCategory"><i class="fas fa-plus-circle"></i></button><br>
            <span id="resGreen" v-if="res=='Sucess'">{{ res }}</span>
            <span id="resRed" v-if="res=='Erro'">{{ res }}</span>
          </span>
        </div>

        <div class="modalFooter">
          <button id="buttonClose" type="button" @click="closeModal()">close</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ModalEditCategory",
  data() {
    return {
      show: false,
      categories: [],
      name: "",
      res: "",
    };
  },
  mounted(){
    this.getCategories();
  },
  methods: {
    deleteCategory(name){
      this.$store.dispatch("deleteAsset", {type:"category", code:name}).then(res =>{
        if(res.status == 200)
          this.res = "Sucess";
        else
          this.res = "Erro";
        this.getCategories();
      });
    },
    createCategory(){
      this.$store.dispatch("postCreateAssetCategory", {name:this.name}).then(res =>{
        if(res.status == 200)
          this.res = "Sucess";
        else
          this.res = "Erro";
        this.name = "";
        this.getCategories();
      });
    },
    getCategories(){
      this.$store.dispatch("postSearchAsset", {type:"category"}).then(res =>{
        this.categories = JSON.parse(JSON.stringify(res.data.result));
      });
    },
    closeModal() {
      this.show = false;
      document.querySelector("body").classList.remove("overflow-hidden");
    },
    openModal() {
      this.show = true;
      document.querySelector("body").classList.add("overflow-hidden");
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
  text-align: center;
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
    @media screen and (max-width: 992px) {
      width: 90%;
    }
  }
  &Header {
    padding: 20px 20px 10px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    color: #2c3e50;
  }
  &Body {
    padding: 10px 20px 10px;
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
  &Footer {
    padding: 10px 20px 20px;
  }
}
h1 {
  text-align: center;
  width: 100%;
}
.tdCategoriesTitle {
  text-align: center;
  overflow: hidden;
  border-bottom: 1px solid rgba(44,62,80,.2);
}
.tdCategoriesButtons {
  text-align: left;
  overflow: hidden;
}
#inputNewCategory {
  width: 200px;
  height: 35px;
  border-radius: 5px;
  border: 1px solid #2c3e50;
  font-size: 15px;
  margin: 20px 2px 2px 2px;
  padding: 4px;
}
#inputNewCategory:focus {
  border: 2px solid black;
  box-shadow: 0 0 0 0;
  outline: 0;
}
#buttonNewCategory {
  width: 35px;
  height: 35px;
  border-radius: 25px;
  background-color: #2c3e50;
  color: white;
  font-size: 15px;
  margin: 5px;  
}
#buttonNewCategory:focus {
  border: 2px solid black;
  box-shadow: 0 0 0 0;
  outline: 0;
}
#resGreen {
  font-size: 10px;
  width: 100%;
  text-align: center;
  color: green;
}
#resRed {
  font-size: 10px;
  width: 100%;
  text-align: center;
  color: red;  
}
#buttonClose {
  width: 100px;
  height: 30px;
  color: red;
  border: 1px solid red;
  border-radius: 30px;
}
#buttonClose:focus {
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