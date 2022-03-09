<template>
  <section class="records" id="records">
    <div class="container">
      <h1>Leaderboard</h1>
      <div class="records__content_empty">
        Oops, You never played. Hurry up to play
      </div>
      <div class="records__content">
        <RecordsItem
          v-for="(record, index) in records"
          :key="index"
          :time="record"
          :number="index + 1"
        />
      </div>
    </div>
  </section>
</template>
<script>
import { mapGetters } from "vuex";
import RecordsItem from "@/components/Records/RecordsItem.vue";

export default {
  name: "RecordsList",
  computed: {
    ...mapGetters(["records"]),
  },
  components: {
    RecordsItem,
  },
};
</script>
<style lang="scss" scoped>
.records {
  padding: 30px 0;
  &__content {
    width: 600px;
    max-width: 100%;
    margin-top: 40px;
    &_empty {
      text-align: center;
      margin-top: 40px;
      color: $colorText;
      font-size: 24px;
    }
  }
}
</style>
