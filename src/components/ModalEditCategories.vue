<template>
  <transition name="fade">
    <div class="modal" v-if="show">
      <div class="modalBackdrop" @click="closeModal()"/>

      <div class="modalDialog">
        <div class="modalHeader">
          <h1>Categories</h1>
        </div>

        <div class="modalBody">
          <br>
          <table>
            <tr v-for="category of categories" :key="category.name">
              <td class="tdCategoriesButtons">
                <button @click="deleteCategory(category.name)"><i class="fas fa-trash-alt"></i></button>
              </td>
              <td class="tdCategoriesTitle">
                {{ category.name }}
              </td>
            </tr>
          </table>
          <span>
            <input id="inputNewCategory" type="text" v-model="name" placeholder="Name"/><br>
            <button id="buttonNewCategory" @click="createCategory">Add</button>
          </span>
        </div>

        <div class="modalFooter">
          <button id="buttonFooter" type="button" @click="closeModal()">close</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ModalEditCategories",
  data() {
    return {
      show: false,
      categories: [],
      name: "",
    };
  },
  mounted(){
    this.getCategories();
  },
  methods: {
    deleteCategory(name){
      this.$store.dispatch("deleteAsset", {type:"category", code:name}).then(res =>{
        if(res.status == 200)
          this.getCategories();
      });
    },
    createCategory(){
      this.$store.dispatch("postCreateAssetCategory", {name:this.name}).then(res =>{
        if(res.status == 200)
          this.getCategories();
        this.name = "";
      });
    },
    getCategories(){
      this.$store.dispatch("postSearchAsset", {type:"category"}).then(res =>{
        this.categories = JSON.parse(JSON.stringify(res.data.result));
      });
    },
    closeModal() {
      this.$emit('event');
      this.show = false;
    },
    openModal() {
      this.show = true;
    }
  }
};
</script>


<style lang="scss" scoped>
h1 {
  text-align: center;
  width: 100%;
}
  .tdCategoriesButtons {
    text-align: right;
    overflow: hidden;
    border-bottom: 1px solid rgba(44,62,80,.2);
    color: #2c3e50;
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
    width: 50px;
    height: 25px;
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
</style>