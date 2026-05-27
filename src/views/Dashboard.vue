<template>
  <div class="dashboard">
    <div class="dashboard-main">
      <section class="stats" aria-label="Store summary">
        <article v-for="item in stats" :key="item.label" class="stat-card">
          <div class="stat-heading">
            <span>{{ item.label }}</span>
            <b :class="item.tone">
              <svg v-if="item.icon === 'revenue'" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 3.5v17M15.5 7.2c-.8-.7-1.9-1.2-3.5-1.2-2 0-3.4 1.1-3.4 2.8 0 4.2 7 2.2 7 6.3 0 1.8-1.5 2.9-3.7 2.9-1.7 0-3-.5-4-1.5" />
              </svg>
              <svg v-else-if="item.icon === 'orders'" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 8.5h12v11H6zM9 9V6.8A3 3 0 0 1 12 4a3 3 0 0 1 3 2.8V9" />
              </svg>
              <svg v-else-if="item.icon === 'customers'" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="8" r="3.5" />
                <path d="M5.8 19.5v-1.3a6.2 6.2 0 0 1 12.4 0v1.3" />
              </svg>
              <svg v-else viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 16.5 10 11l3.3 3.2L19 7.5M14.8 7.5H19v4.2" />
              </svg>
            </b>
          </div>
          <strong>{{ item.value }}</strong>
          <p><span>&uarr; {{ item.delta }}</span> vs last 7 days</p>
        </article>
      </section>

      <section class="panel chart-panel">
        <header class="panel-heading">
          <h2>Revenue Overview</h2>
          <span class="select-pill">
            Last 7 days
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 10 4 4 4-4" /></svg>
          </span>
        </header>
        <Chart />
      </section>

      <div class="bottom-panels">
        <section class="panel products-panel">
          <header class="panel-heading">
            <h2>Top Products</h2>
            <span class="link-pill">View all</span>
          </header>
          <div class="product-header">
            <span>Product</span>
            <span>Sold</span>
            <span>Revenue</span>
          </div>
          <div v-for="item in topProducts" :key="item.name" class="product-row">
            <img class="product-image" :src="item.image" :alt="item.name" />
            <span class="product-name">
              <strong>{{ item.name }}</strong>
              <small>{{ item.variant }}</small>
            </span>
            <span>{{ item.sold }}</span>
            <strong>{{ item.revenue }}</strong>
          </div>
        </section>

        <section class="panel channel-panel">
          <header class="panel-heading">
            <h2>Sales by Channel</h2>
            <span class="link-pill">View all</span>
          </header>
          <div class="channel-content">
            <div class="donut" aria-label="Sales distribution chart" />
            <ul>
              <li v-for="channel in channels" :key="channel.name">
                <i :style="{ background: channel.color }" />
                <span>{{ channel.name }}</span>
                <strong>{{ channel.share }}</strong>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>

    <aside class="dashboard-side">
      <section class="panel orders-panel">
        <header class="panel-heading">
          <h2>Recent Orders</h2>
          <span class="link-pill">View all</span>
        </header>
        <div v-for="order in recentOrders" :key="order.id" class="order-row">
          <i />
          <span>{{ order.id }}</span>
          <small>{{ order.time }}</small>
          <strong>{{ order.amount }}</strong>
        </div>
      </section>

      <section class="growth-card">
        <h2>Grow your store</h2>
        <p>Get insights and tips<br />to boost your sales.</p>
        <span class="guide-pill">Explore Guide <b>&rsaquo;</b></span>
        <span class="shape yellow" />
        <span class="shape purple" />
        <span class="shape coral" />
      </section>

      <section class="panel stock-panel">
        <header class="panel-heading">
          <h2>Low Stock</h2>
          <span class="link-pill">View all</span>
        </header>
        <div v-for="item in stock" :key="item.name" class="stock-row">
          <img class="product-image" :src="item.image" :alt="item.name" />
          <span>
            <strong>{{ item.name }}</strong>
            <small>{{ item.variant }}</small>
          </span>
          <b :class="item.level">{{ item.left }} left</b>
        </div>
      </section>
    </aside>
  </div>
</template>

<script setup lang="ts">
import Chart from '../components/Chart.vue'

const stats = [
  { label: 'Total Revenue', value: '$14,838', delta: '18.6%', icon: 'revenue', tone: 'purple' },
  { label: 'Orders', value: '4', delta: '12.4%', icon: 'orders', tone: 'blue' },
  { label: 'Customers', value: '731', delta: '8.7%', icon: 'customers', tone: 'green' },
  { label: 'Conversion Rate', value: '3.42%', delta: '6.1%', icon: 'conversion', tone: 'coral' },
]

const loopiImages = {
  daisy: 'https://i.etsystatic.com/33325447/r/il/eecae2/5773055242/il_794xN.5773055242_goj1.jpg',
  rose: 'https://i.etsystatic.com/20736769/r/il/c1f360/6332436708/il_1588xN.6332436708_jnmh.jpg',
  blossom: 'https://images.asos-media.com/products/asos-design-handmade-crochet-scrunchie-in-pink/208701866-1-pinkmulti?$n_960w$&wid=952&fit=constrain',
  gift: 'https://images.unsplash.com/photo-1778686568681-699398da3b65?w=800&q=82',
  collection: 'https://images.unsplash.com/photo-1646182504831-57f41a74318f?w=800&q=82',
}

const topProducts = [
  { name: 'Blossom Scrunchie', variant: 'Scrunchies', sold: '342', revenue: '$5,096', image: loopiImages.blossom },
  { name: 'Rose Petal Clip', variant: 'Hair Clips', sold: '286', revenue: '$3,689', image: loopiImages.rose },
  { name: 'Sweet Duo Gift Set', variant: 'Gift Sets', sold: '213', revenue: '$5,964', image: loopiImages.gift },
]

const channels = [
  { name: 'Online Store', share: '65%', color: '#7357fc' },
  { name: 'Instagram', share: '20%', color: '#6b94f8' },
  { name: 'Facebook', share: '10%', color: '#ee8dab' },
  { name: 'Others', share: '5%', color: '#fac34c' },
]

const recentOrders = [
  { id: '#001', time: 'May 13, 10:24 AM', amount: '$12.90' },
  { id: '#002', time: 'May 13, 9:41 AM', amount: '$28.00' },
  { id: '#003', time: 'May 12, 8:15 PM', amount: '$14.90' },
  { id: '#004', time: 'May 12, 4:31 PM', amount: '$52.00' },
]

const stock = [
  { name: 'Daisy Hair Clip', variant: 'Hair Clips', left: '8', image: loopiImages.daisy, level: 'urgent' },
  { name: 'Full Collection Set', variant: 'Gift Sets', left: '12', image: loopiImages.collection, level: 'warning' },
]
</script>

<style scoped>
.dashboard {
  display: grid;
  grid-template-columns: minmax(560px, 1fr) 300px;
  gap: 22px;
  color: #13203e;
}

.dashboard-main,
.dashboard-side {
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-width: 0;
}

.stats {
  display: grid;
  grid-template-columns: repeat(4, minmax(155px, 1fr));
  gap: 14px;
}

.stat-card,
.panel {
  border: 1px solid #e9edf5;
  border-radius: 10px;
  background: #fff;
}

.stat-card {
  min-height: 111px;
  padding: 18px 17px 15px;
}

.stat-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  color: #566480;
  font-size: 13px;
}

.stat-heading b {
  display: grid;
  width: 38px;
  height: 38px;
  place-items: center;
  border-radius: 10px;
}

.stat-heading b svg {
  width: 22px;
  height: 22px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.purple {
  color: #704ffe;
  background: #f0ecff;
}

.blue {
  color: #3378fb;
  background: #eaf3ff;
}

.green {
  color: #20b98c;
  background: #e7f8f1;
}

.coral {
  color: #fb6654;
  background: #feefec;
}

.stat-card > strong {
  display: block;
  margin-bottom: 10px;
  font-size: 26px;
  font-weight: 600;
  letter-spacing: -0.4px;
}

.stat-card p {
  color: #77849e;
  font-size: 12px;
}

.stat-card p span {
  margin-right: 16px;
  color: #704ffe;
  font-weight: 500;
}

.panel-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.panel-heading h2 {
  margin: 0;
  color: #111c3b;
  font-size: 14px;
  font-weight: 600;
}

.link-pill,
.select-pill,
.guide-pill {
  display: inline-flex;
  align-items: center;
  border: 1px solid #e4e8f1;
  border-radius: 7px;
  color: #44526e;
  background: #fbfcfe;
  font-size: 12px;
}

.link-pill {
  padding: 7px 12px;
}

.select-pill {
  gap: 13px;
  padding: 9px 12px;
}

.select-pill svg {
  width: 14px;
  height: 14px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
}

.chart-panel {
  padding: 21px 23px 9px;
}

.bottom-panels {
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  gap: 14px;
}

.products-panel,
.channel-panel {
  min-height: 250px;
  padding: 20px 23px;
}

.product-header {
  display: grid;
  grid-template-columns: 1fr 55px 73px;
  margin: 22px 0 12px;
  color: #60708c;
  font-size: 12px;
}

.product-row {
  display: grid;
  grid-template-columns: 46px 1fr 55px 73px;
  align-items: center;
  margin: 10px 0;
  color: #12203d;
  font-size: 13px;
}

.product-image {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 7px;
  background: #edf0ec;
  object-fit: cover;
}

.product-name strong,
.product-name small {
  display: block;
}

.product-name strong {
  margin-bottom: 2px;
  font-weight: 500;
}

.product-name small,
.stock-row small {
  color: #697892;
  font-size: 12px;
}

.channel-content {
  display: flex;
  align-items: center;
  gap: 45px;
  height: 188px;
}

.donut {
  flex-shrink: 0;
  width: 117px;
  height: 117px;
  border-radius: 50%;
  background: conic-gradient(#7357fc 0 65%, #6b94f8 65% 85%, #ee8dab 85% 95%, #fac34c 95% 100%);
}

.donut::after {
  display: block;
  width: 61px;
  height: 61px;
  margin: 28px;
  border-radius: 50%;
  background: #fff;
  content: '';
}

.channel-content ul {
  flex: 1;
  margin: 0;
  padding: 0;
  list-style: none;
}

.channel-content li {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 18px 0;
  font-size: 12px;
}

.channel-content li i {
  width: 9px;
  height: 9px;
  border-radius: 50%;
}

.channel-content li strong {
  margin-left: auto;
  font-weight: 500;
}

.orders-panel {
  min-height: 282px;
  padding: 20px 23px;
}

.order-row {
  display: grid;
  grid-template-columns: 10px 55px 1fr auto;
  align-items: center;
  gap: 8px;
  margin-top: 25px;
  font-size: 12px;
}

.order-row i {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #27bc91;
}

.order-row small {
  color: #72809b;
  font-size: 11px;
}

.order-row strong {
  font-weight: 500;
}

.growth-card {
  position: relative;
  min-height: 145px;
  overflow: hidden;
  padding: 24px;
  border-radius: 10px;
  background: #f1efff;
}

.growth-card h2 {
  margin: 0 0 9px;
  color: #17213d;
  font-size: 14px;
}

.growth-card p {
  margin: 0 0 18px;
  color: #67758f;
  font-size: 13px;
  line-height: 1.65;
}

.guide-pill {
  padding: 9px 13px;
  background: #fff;
  font-weight: 500;
}

.guide-pill b {
  margin-left: 14px;
  font-size: 18px;
}

.shape {
  position: absolute;
  transform: rotate(-43deg);
}

.shape.yellow {
  top: 29px;
  right: 26px;
  width: 31px;
  height: 36px;
  border-radius: 10px;
  background: linear-gradient(130deg, #fff3cc, #f7b844);
}

.shape.purple {
  right: 77px;
  bottom: 82px;
  width: 22px;
  height: 26px;
  border-radius: 50%;
  background: linear-gradient(130deg, #d7d0ff, #7758fa);
}

.shape.coral {
  right: 25px;
  bottom: 34px;
  width: 31px;
  height: 68px;
  border-radius: 13px;
  background: linear-gradient(135deg, #ffc74b, #f085bd);
}

.stock-panel {
  flex: 1;
  min-height: 190px;
  padding: 20px 23px;
}

.stock-row {
  display: grid;
  grid-template-columns: 49px 1fr auto;
  align-items: center;
  margin-top: 22px;
  font-size: 12px;
}

.stock-row span strong,
.stock-row span small {
  display: block;
}

.stock-row span strong {
  margin-bottom: 4px;
  font-weight: 500;
}

.stock-row b {
  padding: 7px 9px;
  border-radius: 7px;
  font-size: 11px;
  font-weight: 500;
}

.urgent {
  color: #f0544a;
  background: #ffefed;
}

.warning {
  color: #da8500;
  background: #fff3de;
}

@media (max-width: 1280px) {
  .dashboard {
    display: block;
  }

  .dashboard-side {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin-top: 16px;
  }
}

@media (max-width: 940px) {
  .stats,
  .bottom-panels,
  .dashboard-side {
    grid-template-columns: repeat(2, 1fr);
  }

  .dashboard {
    display: block;
  }
}

@media (max-width: 720px) {
  .dashboard,
  .stats,
  .bottom-panels,
  .dashboard-side {
    display: block;
  }

  .stat-card,
  .panel,
  .growth-card {
    margin-bottom: 14px;
  }

  .channel-content {
    gap: 25px;
  }
}
</style>
