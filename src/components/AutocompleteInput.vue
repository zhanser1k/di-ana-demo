<template>
  <div class="w-full" v-click-outside="hideMenu">
    <div class="mt-1 flex rounded-md shadow-sm relative">
      <slot name="icon"></slot>
      <input
        type="text"
        :class="inputClass"
        :placeholder="placeholder"
        aria-label="Search"
        :value="modelValue"
        @input="onInput"
        ref="searchBox"
      />
    </div>
    <aside
      class="absolute max-w-80 z-10 flex flex-col items-start w-full !rounded-2xl px-2 bg-white border rounded-md shadow-md mt-1"
      role="menu"
      aria-labelledby="menu-heading"
      v-if="filteredList.length > 0 && showSearchItems"
    >
      <ul class="flex flex-col w-full">
        <li
          class="px-2 py-3 space-x-2 hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white focus:outline-none"
          v-for="(item, index) in filteredList"
          :key="index"
          @click="selectSearchItem(item)"
        >
          {{ item.name }}
        </li>
      </ul>
    </aside>
  </div>
</template>

<script>

export default {
  name: 'AutocompleteInput',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    lists: {
      type: Array,
      default: () => []
    },
    ignoredList: {
      type: Array,
      default: () => []
    },
    clearInputWhenClicked: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: 'Search here...'
    },
    inputClass: {
      type: Array,
      default: () => [
        'input-base',
        'w-full'
      ]
    },
    field: {
      type: String,
      default: 'name',
    },
  },
  data() {
    return {
      search: this.modelValue,
      showSearchItems: false,
      searchItemList: this.lists
    }
  },
  watch: {
    modelValue(newVal) {
      this.search = newVal
    }
  },
  computed: {
    filteredList() {
      return this.searchItemList.filter(
        (item) =>
          item.name.toLowerCase().includes(this.search.toLowerCase()) &&
          !this.isIgnoredItem(item.id)
      )
    }
  },
  methods: {
    onInput(event) {
      this.search = event.target.value
      this.showSearchItems = true
      this.$emit('update:modelValue', this.search)
    },
    selectSearchItem(item) {
      this.search = item[this.field];
      this.showSearchItems = false;
      this.$emit('update:modelValue', item.label);
      this.$emit('item-selected', item[this.field]);
      if (this.clearInputWhenClicked) {
        this.search = '';
      }
    },
    isIgnoredItem(itemId) {
      return this.ignoredList.includes(itemId)
    },
    hideMenu() {
      this.showSearchItems = false
    }
  },
  created() {
    const selected = this.lists.find((item) => item.id === this.selectedData)
    if (selected) {
      this.search = selected.name
    }
  }
}
</script>
