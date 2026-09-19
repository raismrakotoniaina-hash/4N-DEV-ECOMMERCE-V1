<template>
  <div class="app">
    <header class="header">
      <div class="logo">4N DEV</div>

      <nav>
        <a href="#">Accueil</a>
        <a href="#">Boutique</a>
        <a href="#">Produits</a>
        <a href="#">Contact</a>
      </nav>

      <button class="cart">
        🛒 Panier
      </button>
    </header>

    <main>
      <section class="hero">
        <div>
          <p class="badge">4N DEV E-COMMERCE</p>

          <h1>
            Découvrez notre
            <span>boutique digitale</span>
          </h1>

          <p class="description">
            Une expérience e-commerce moderne, rapide et pensée pour le digital de demain.
          </p>

          <button class="primary">
            Découvrir les produits →
          </button>
        </div>

        <div class="hero-card">
          <div class="glow"></div>
          <div class="card-content">
            <span>4N</span>
            <strong>DEV</strong>
            <small>Digital Store</small>
          </div>
        </div>
      </section>

      <section class="products">
        <div class="section-title">
          <p>NOTRE SÉLECTION</p>
          <h2>Produits populaires</h2>
        </div>

        <div class="product-grid">
          <article class="product">
            <div class="product-image">💻</div>
            <h3>Solution Web</h3>
            <p>Création de site web professionnel.</p>
            <strong>À partir de 150 000 Ar</strong>
            <button>Acheter</button>
          </article>

          <article class="product">
            <div class="product-image">🤖</div>
            <h3>Solution IA</h3>
            <p>Automatisation et intelligence artificielle.</p>
            <strong>À partir de 250 000 Ar</strong>
            <button>Acheter</button>
          </article>

          <article class="product">
            <div class="product-image">📱</div>
            <h3>Application Mobile</h3>
            <p>Applications modernes et responsives.</p>
            <strong>À partir de 350 000 Ar</strong>
            <button>Acheter</button>
          </article>
        </div>
      </section>
    </main>

    <footer>
      <strong>4N DEV</strong>
      <span>Nous créons le digital de demain.</span>
    </footer>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, sans-serif;
  background: #070b18;
  color: white;
}

.app {
  min-height: 100vh;
  background:
    radial-gradient(circle at 80% 10%, #183b73 0, transparent 30%),
    radial-gradient(circle at 10% 50%, #111d45 0, transparent 30%),
    #070b18;
}

.header {
  height: 75px;
  padding: 0 6%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255,255,255,.08);
  background: rgba(5,10,25,.7);
  backdrop-filter: blur(15px);
}

.logo {
  font-size: 22px;
  font-weight: 900;
  color: #65bfff;
}

nav {
  display: flex;
  gap: 28px;
}

nav a {
  color: #dbe8ff;
  text-decoration: none;
}

.cart {
  border: 1px solid #318fff;
  background: transparent;
  color: white;
  padding: 10px 18px;
  border-radius: 12px;
}

main {
  width: 88%;
  max-width: 1200px;
  margin: auto;
}

.hero {
  min-height: 560px;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  align-items: center;
  gap: 50px;
}

.badge,
.section-title p {
  color: #55baff;
  font-size: 13px;
  font-weight: bold;
  letter-spacing: 2px;
}

h1 {
  margin: 18px 0;
  font-size: clamp(42px, 6vw, 72px);
  line-height: 1.05;
}

h1 span {
  display: block;
  color: #55baff;
}

.description {
  max-width: 560px;
  color: #aab8d5;
  font-size: 18px;
  line-height: 1.7;
}

.primary {
  margin-top: 30px;
  padding: 15px 24px;
  border: 0;
  border-radius: 12px;
  background: #218cff;
  color: white;
  font-weight: bold;
  font-size: 15px;
}

.hero-card {
  height: 330px;
  border: 1px solid rgba(90,180,255,.3);
  border-radius: 30px;
  background: rgba(255,255,255,.05);
  backdrop-filter: blur(20px);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.glow {
  width: 220px;
  height: 220px;
  position: absolute;
  border-radius: 50%;
  background: #168cff;
  filter: blur(90px);
  opacity: .4;
}

.card-content {
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.card-content span {
  font-size: 70px;
  font-weight: 900;
  color: #55baff;
}

.card-content strong {
  font-size: 42px;
}

.card-content small {
  color: #9fb3d8;
}

.products {
  padding: 70px 0;
}

.section-title h2 {
  margin-top: 10px;
  font-size: 36px;
}

.product-grid {
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}

.product {
  padding: 25px;
  border: 1px solid rgba(255,255,255,.09);
  border-radius: 20px;
  background: rgba(255,255,255,.045);
}

.product-image {
  height: 150px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  background: rgba(30,130,255,.1);
}

.product h3 {
  margin-top: 20px;
  font-size: 21px;
}

.product p {
  margin: 10px 0;
  color: #9eacc8;
  line-height: 1.5;
}

.product strong {
  display: block;
  color: #62c1ff;
  margin: 15px 0;
}

.product button {
  width: 100%;
  padding: 12px;
  border: 0;
  border-radius: 10px;
  background: #167ff0;
  color: white;
  font-weight: bold;
}

footer {
  margin-top: 40px;
  padding: 30px 6%;
  border-top: 1px solid rgba(255,255,255,.08);
  display: flex;
  justify-content: space-between;
  color: #8fa1c1;
}

footer strong {
  color: #55baff;
}

@media (max-width: 750px) {
  .header {
    padding: 0 20px;
  }

  nav {
    display: none;
  }

  main {
    width: 90%;
  }

  .hero {
    grid-template-columns: 1fr;
    padding: 50px 0;
  }

  .hero-card {
    height: 250px;
  }

  .product-grid {
    grid-template-columns: 1fr;
  }

  footer {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
