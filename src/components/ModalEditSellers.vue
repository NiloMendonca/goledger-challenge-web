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
            <h1 class="textHeader">Seller</h1>
          </span>
        </div>

        <div class="modalBody">
          <table v-if="type == 'view'">
            <tr>
              <td class="tdCategoriesTitle">
                CNPJ
              </td>
              <td class="tdCategoriesButtons">
                {{ data.cnpj }}
              </td>
            </tr>
            <tr>
              <td class="tdCategoriesTitle">
                ADDRESS
              </td>
              <td class="tdCategoriesButtons">
                {{ data.address }}
              </td>
            </tr>
            <tr>
              <td class="tdCategoriesTitle">
                DATE JOINED
              </td>
              <td class="tdCategoriesButtons">
                {{ data.dateJoined }}
              </td>
            </tr>
          </table>
          <span v-if="type == 'edit' || type == 'create'">
            <span v-if="type == 'edit'">CNPJ:{{ data.cnpj }}</span><br>
            <input class="inputSeller" type="text" v-model="data.name" placeholder="Name"/>
            <input class="inputSeller" type="text" v-model="data.cnpj" placeholder="CNPJ" v-if="type == 'create'"/>
            <input class="inputSeller" type="text" v-model="data.address" placeholder="Address"/>
            <input class="inputSeller" type="date" v-model="data.dateJoined"/>
          </span>
        </div>

        <div class="modalFooter">
          <button id="buttonFooter" v-if="type == 'edit' || type == 'create'" @click="save">Save</button>
          <button id="buttonFooter" v-if="type == 'edit' || type == 'view'" @click="deleteSeller">Delete</button>
          <button id="buttonFooter" class="modalClose" @click="closeModal()">Close</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ModalViewSellers",
  data() {
    return {
      show: false,
      data: [],
      cnpj: "",
      type: "",
    };
  },
  methods: {
    deleteSeller(){
      this.$store.dispatch("deleteAsset", {type:"seller", code:this.cnpj}).then(res =>{
        if(res.status == 200)
          this.closeModal();
      });
    },
    save(){
      var date = new Date(this.data.dateJoined);
      if(this.type == "edit"){
        this.$store.dispatch("putUpdateAssetSeller", {cnpj: this.data.cnpj, name: this.data.name, address: this.data.address, dateJoined: date}).then(res =>{
          this.data = JSON.parse(JSON.stringify(res.data));
          if(res.status == 200)
            this.closeModal();
        });
      }
      else if(this.type == "create"){
        this.$store.dispatch("postCreateAssetSeller", {cnpj: this.data.cnpj, name: this.data.name, address: this.data.address, dateJoined: date}).then(res =>{
          this.data = JSON.parse(JSON.stringify(res.data));
          if(res.status == 200)
            this.closeModal();
        });
      }
    },
    closeModal() {
      this.$emit('event');
      this.show = false;
    },
    openModal(cnpj, type) {
      this.show = true;
      if(cnpj)
        this.cnpj = cnpj;
      if(type){
        this.type = type;
        if(this.type == "create"){
          this.data.name = "";
          this.data.cnpj = "";
          this.data.address = "";
          this.data.dateJoined = "";
        }
      }

      this.$store.dispatch("postReadAsset", {type:"seller", code:cnpj}).then(res =>{
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
    padding: 20px 20px 0px 0px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
  &Body {
    padding: 0px 20px 10px 0px;
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
  }
  
  .inputSeller {
    width: 200px;
    height: 35px;
    border-radius: 5px;
    border: 1px solid #2c3e50;
    font-size: 15px;
    margin: 20px 2px 2px 2px;
    padding: 4px;
  }
    .inputSeller:focus {
      border: 2px solid black;
      box-shadow: 0 0 0 0;
      outline: 0;
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