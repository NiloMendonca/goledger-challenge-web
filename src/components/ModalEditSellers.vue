<template>
  <transition name="fade">
    <div class="modal" v-if="show">
      <div class="modalBackdrop" @click="closeModal()"/>

      <div class="modalDialog">
        <div id="load" v-if="load">
          <div id="titleLoad"></div>
          <div id="bodyLoad"></div>
          <div id="buttonFooterLoad"></div>
        </div>
        <div class="modalHeader">
          <span class="textHeader" v-if="type == 'view'">
            <h1 class="textHeader">{{ data.name }}</h1><br>
          </span>
          <span class="textHeader" v-if="type == 'edit' || type == 'create'">
            <h1 class="textHeader">Seller</h1>
            <span class="textHeader" v-if="type == 'edit'">
              <br>
            </span>
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
            <input class="inputModal" type="text" v-model="data.name" placeholder="Name"/>
            <input class="inputModal" type="text" v-model="data.cnpj" placeholder="CNPJ" v-if="type == 'create'"/>
            <input class="inputModal" type="text" v-model="data.address" placeholder="Address"/>
            <input class="inputModal" type="date" v-model="data.dateJoined"/>
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
      load: true,
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
      this.load = true;
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

      if(this.type == "view" || this.type == "edit"){
        this.$store.dispatch("postReadAsset", {type:"seller", code:cnpj}).then(res =>{
          this.data = JSON.parse(JSON.stringify(res.data));
          this.load = false;
        });
      }
      else
        this.load = false;
    }
  }
};
</script>