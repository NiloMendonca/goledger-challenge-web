<template>
  <transition name="fade">
    <div class="modal" v-if="show">
      <div class="modal__backdrop" @click="closeModal()"/>

      <div class="modal__dialog">
        <div class="modal__header">
          <span v-if="type == 'view'">
            {{ data.name }}
          </span>
          <span v-if="type == 'edit' || type == 'create'">
            <input type="text" v-model="data.name" placeholder="Name"/>
            {{ res }}
          </span>
          <button type="button" class="modal__close" @click="closeModal()">
            x
          </button>
        </div>

        <div class="modal__body">
          <span v-if="type == 'view'">
            Code:{{ data.code }}
            Price:{{ data.price }}
            CNPJ:{{ data.soldBy.cnpj }}
          </span>
          <span v-if="type == 'edit' || type == 'create'">
            <input type="text" v-model="data.code" placeholder="Code" v-if="type == 'create'"/>
            <span v-if="type == 'edit'">Code:{{ data.code }}</span>
            <input type="number" v-model="data.price" placeholder="Price"/>
            <input type="text" v-model="data.soldBy.cnpj" placeholder="CNPJ"/>
          </span>
        </div>

        <div class="modal__footer">
          <span v-if="type == 'edit' || type == 'create'">
            <button @click="save">Save</button>
          </span>
          <span v-if="type == 'edit' || type == 'view'">
            <button @click="deleteSeller">Delete</button>
          </span>
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
      res: ""
    };
  },
  methods: {
    deleteProduct(){
      this.$store.dispatch("deleteAsset", {type:"product", code:this.code}).then(res =>{
        if(res.status == 200)
          this.closeModal();
      });
    },
    save(){
      if(this.type == "edit"){
        this.$store.dispatch("putUpdateAssetProduct", {name: this.data.name, code: this.data.code, price: this.data.price, cnpj: this.data.soldBy.cnpj}).then(res =>{
          if(res.status == 200)
            this.res = "Updated";
            this.closeModal();
        });
      }
      else if(this.type == "create"){
        this.$store.dispatch("postCreateAssetProduct", {name: this.data.name, code: this.data.code, price: this.data.price, cnpj: this.data.soldBy.cnpj}).then(res =>{
          if(res.status == 200)
            this.res = "Created";
            this.closeModal();
        });
      }
    },
    closeModal() {
      this.$emit('event');
      this.show = false;
    },
    openModal(code, type) {
      this.show = true;
      if(code)
        this.code = code;
      if(type){
        this.res = "";
        this.type = type;
        if(this.type == "create"){
          this.data.name = "";
          this.data.code = "";
          this.data.price = 0;
          this.data.soldBy = {cnpj:""};
        }
      }

      this.$store.dispatch("postReadAsset", {type:"product", code: this.code}).then(res =>{
        this.data = JSON.parse(JSON.stringify(res.data));
      });
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
  &__backdrop {
    background-color: rgba(0, 0, 0, 0.3);
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
  }
  &__dialog {
    background-color: #ffffff;
    position: relative;
    width: 600px;
    margin: 50px auto;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    z-index: 2;
    @media screen and (max-width: 992px) {
      width: 90%;
    }
  }
  &__close {
    width: 30px;
    height: 30px;
  }
  &__header {
    padding: 20px 20px 10px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
  &__body {
    padding: 10px 20px 10px;
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
  &__footer {
    padding: 10px 20px 20px;
  }
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