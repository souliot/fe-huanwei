<template>
  <Card :bordered="false">
    <div class="bk" :style="bk_style"></div>
    <div class="carousel-demo">
      <Carousel v-model="carousel_index" :current-index.sync="currentIndex" loop radius-dot :height="c_config.height" :trigger="c_config.trigger" @on-change="changeHandler">
        <CarouselItem v-for="item,index in c_item" :key="index">
          <img :src="item.img" alt="">
        </CarouselItem>
      </Carousel>
    </div>
  </Card>
</template>

<script>
  import bgImg1 from "@/assets/images/carousel/1.jpg"
  import bgImg2 from "@/assets/images/carousel/2.jpg"
  import bgImg3 from "@/assets/images/carousel/3.jpg"
  import bgImg4 from "@/assets/images/carousel/4.jpg"
  import bgImg5 from "@/assets/images/carousel/5.jpg"
  export default {
    name: 'carousel',
    data() {
      return {
        currentIndex: 0,
        carousel_index: 0,
        c_config: {
          height: 400,
          trigger: 'click',
        },
        c_item: [{
            title: 'title1',
            img: bgImg1,
          },
          {
            title: 'title2',
            img: bgImg2,
          },
          {
            title: 'title3',
            img: bgImg3,
          },
          {
            title: 'title4',
            img: bgImg4,
          },
          {
            title: 'title5',
            img: bgImg5,
          },
        ],
        bk_style: {
          height: '180px',
          opacity: '0.3',
          filter: 'blur(100px)',
          backgroundImage: 'url(' + bgImg1 + ')',
          backgroundSize: 'cover',
        },
      }
    },
    mounted() {},
    methods: {
      changeHandler(old_index, index) {
        console.log("ada")
        this.bk_style.backgroundImage = 'url(' + this.c_item[index].img + ')'
      },
    },
  }
</script>
<style>
  .ivu-card {
    height: 100%;
  }
</style>
<style scoped>
  .carousel-demo {
    width: 600px;
    margin: 0 auto;
  }

  .carousel-demo img {
    width: 100%;
    height: 100%;
  }
</style>