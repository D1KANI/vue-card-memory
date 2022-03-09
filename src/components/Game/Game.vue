<template>
  <section class="game" id="game">
    <div class="container">
      <h1>Game</h1>
      <div v-if="errors.length > 0" class="game-errors">
        <div
          v-for="(error, index) in errors"
          :key="index"
          class="game-errors__item"
        >
          {{ error }}
        </div>
      </div>
      <template v-else>
        <transition name="fade" mode="out-in">
          <div v-if="!isStarted" @click="startGame()" class="game__btn">
            Start
          </div>
          <div v-else>
            <div class="game__time">
              Time: <span>{{ minutes }}</span
              >:<span>{{ seconds }}</span>
            </div>
            <div class="game-field">
              <GameCard
                v-for="card in cards"
                :key="card.id"
                :card="card"
                @flip-card="flipCard"
              />
            </div>
          </div>
        </transition>
      </template>
    </div>
  </section>
</template>
<script>
import axios from "axios";
import GameCard from "@/components/Game/GameCard.vue";

export default {
  name: "Game",
  data() {
    return {
      cards: [],
      errors: [],
      time: 0,
      timer: null,
      isStarted: false,
      activeCard: [],
    };
  },
  computed: {
    minutes() {
      return String(Math.floor(this.time / 60)).padStart(2, "0");
    },
    seconds() {
      return String(this.time % 60).padStart(2, "0");
    },
  },
  methods: {
    startGame() {
      if (this.errors.length === 0) {
        setTimeout(() => {
          this.startTimer();
          this.isStarted = true;
        }, 400);
      }
    },
    startTimer() {
      this.timer = setInterval(() => {
        this.time++;
      }, 1000);
    },
    flipCard(payload) {
      if (
        payload.isMatched ||
        payload.isFlipped ||
        this.activeCard.length === 2
      )
        return;
      payload.isFlipped = true;
      if (this.activeCard.length < 2) this.activeCard.push(payload);
      if (this.activeCard.length === 2) this._checkMatched();
    },
    _checkMatched() {
      if (this.activeCard[0].value === this.activeCard[1].value) {
        setTimeout(() => {
          this.activeCard.forEach((card) => (card.isMatched = true));
          this.activeCard = [];
          if (this.cards.every((card) => card.isMatched === true)) {
            this.isStarted = false;
            this.$store.commit("setRecord", this.time);
            this.cards.forEach((card) => {
              card.isMatched = false;
              card.isFlipped = false;
            });
            clearInterval(this.timer);
            this.time = 0;
          }
        }, 400);
      } else {
        setTimeout(() => {
          this.activeCard.forEach((card) => {
            card.isFlipped = false;
          });
          this.activeCard = [];
        }, 800);
      }
    },
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const rand = Math.floor(Math.random() * (i + 1));
        [array[i], array[rand]] = [array[rand], array[i]];
      }
      return array;
    },
  },
  async beforeMount() {
    this.$store.commit("sortRecords");
    await axios
      .get("/icons.json")
      .then((result) => {
        result.data.icons.forEach((item) => {
          const card = {
            value: item.value,
            isMatched: false,
            isFlipped: false,
            id: item.id,
          };
          const cardTwo = {
            value: item.value,
            isMatched: false,
            isFlipped: false,
            id: item.id + "_copy",
          };
          this.cards.push(card);
          this.cards.push(cardTwo);
          this.cards = this.shuffleArray(this.cards);
        });
      })
      .catch((error) => {
        if (error.response.status === 404) {
          this.errors.push("Oops, icons not found. Please try reboot page");
        }
        console.error("Oops, icons not found. Please try reboot page");
      });
  },
  components: {
    GameCard,
  },
};
</script>
<style lang="scss" scoped>
.game {
  padding: 60px 0 30px;
  &__time {
    color: $colorText;
    text-align: center;
    margin-top: 32px;
  }
  &__btn {
    width: max-content;
    margin: 32px auto 0;
    border-radius: 16px;
    padding: 16px 24px;
    font-size: 24px;
    color: $colorText;
    font-weight: 500;
    border: 4px solid $colorText;
    background-color: $colorBackground;
    box-shadow: 0px 10px 0px #efc17c;
    cursor: pointer;
    transition: all 175ms linear;
    &:hover {
      transform: translateY(5px);
      box-shadow: 0px 5px 0px #efc17c;
    }
    &:active {
      transform: translateY(10px);
      box-shadow: 0px 0px 0px #efc17c;
    }
  }
  &-field {
    margin: 32px -4px 0;
    display: flex;
    align-items: stretch;
    flex-wrap: wrap;
  }
  &-errors {
    width: max-content;
    margin: 0 auto;
    padding: 24px;
    border-radius: 16px;
    text-align: center;
    margin-top: 24px;
    background-color: rgb(221, 130, 130);
    color: #fff;
  }
}
.fade {
  &-enter {
    &-active {
      transition: opacity 200ms;
    }
    &-from {
      opacity: 0;
    }
  }
  &-leave {
    &-active {
      transition: opacity 200ms;
    }
    &-to {
      opacity: 0;
    }
  }
}
</style>
