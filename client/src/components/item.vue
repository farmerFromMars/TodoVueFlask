<template>
  <div class="input-group">
    <span class="input-group-addon">
      <input type="checkbox" :checked="status==='clear'" @change="changeStatus">
    </span>
      <input type="text" class="form-control" :value="title">
    <span class="input-group-btn">
      <button class="btn btn-default" type="button" @click="removeItem">X</button>
    </span>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Item extends Vue {
  @Prop() readonly id!: number;
  @Prop() readonly title!: string;
  @Prop() readonly status!: string;

  changeStatus($event: Event) {
    const checked: boolean | null = ($event.target as HTMLInputElement).checked;
    if (checked) {
      this.$store.dispatch('changeData', {id: this.id, title: this.title, status: 'clear'});
    } else {
      this.$store.dispatch('changeData', {id: this.id, title: this.title, status: 'active'});
    }
  }

  removeItem($event: Event) {
    this.$store.dispatch('removeData', this.id);
  }
}
</script>