<template>
  <div class="card-wrapper">
    <div
      class="card"
      :class="{ flipped: card.isFlipped, matched: card.isMatched }"
    >
      <div class="card-front">
        <img
          :src="require(`@/assets/icons/${card.value}`)"
          :alt="card.id"
          class="card-front__image"
        />
      </div>
      <div @click="flip" class="card-back"><span>D</span></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "GameCard",
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
  methods: {
    flip() {
      this.$emit("flip-card", this.card);
    },
  },
};
</script>
<style lang="scss" scoped>
.card {
  &-wrapper {
    position: relative;
    width: calc(100% / 6 - 8px);
    margin: 0 4px 8px;
  }
  width: 100%;
  height: 100px;
  &-front,
  &-back {
    backface-visibility: hidden;
    transition: 0.6s;
    transform-style: preserve-3d;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f0ddc1;
    border-radius: 30px;
    border: 4px solid $colorText;
  }
  &-front {
    transform: rotateY(-180deg);
    position: absolute;
    &__image {
      display: block;
      max-width: 80%;
      max-height: 80%;
    }
  }
  &-back {
    cursor: pointer;
    span {
      font-family: "Fredoka One", sans-serif;
      font-size: 68px;
      line-height: 54px;
      color: $colorText;
      user-select: none;
    }
  }
  &.flipped {
    .card {
      &-front {
        transform: rotateY(0deg);
      }
      &-back {
        transform: rotateY(180deg);
      }
    }
  }
  &.matched {
    .card {
      &-front {
        opacity: 0;
      }
    }
  }
}
</style>