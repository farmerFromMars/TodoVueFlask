<template>
  <div class="form-group">
    <input type="text" 
           class="form-control" 
           @keyup.enter="addItem"
           placeholder="Input your Todo"
           v-model ="title">
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
@Component
export default class ItemInput extends Vue {
  title = '';
  addItem($event: Event) {
    this.$store.dispatch('addData', { title: this.title });
  }
}
</script>