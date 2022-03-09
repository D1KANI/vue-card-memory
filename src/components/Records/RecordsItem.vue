<template>
  <div class="record-item">
    <div class="record-item__number">
      #<span>{{ number }}</span>
    </div>
    <div class="record-item__time">
      Time: <span>{{ minutes }}</span
      >:<span>{{ seconds }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "RecordsItem",
  props: {
    number: {
      type: Number,
      required: true,
    },
    time: {
      type: Number,
      required: true,
    },
  },
  computed: {
    minutes() {
      return String(Math.floor(this.time / 60)).padStart(2, "0");
    },
    seconds() {
      return String(this.time % 60).padStart(2, "0");
    },
  },
};
</script>
<style lang="scss" scoped>
.record-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  margin-bottom: 16px;
  &__number {
    color: $colorText;
  }
  &__time {
    color: $colorText;
  }
}
</style>
