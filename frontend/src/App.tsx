import { useState } from "react";
import "./App.css";

const products = [
  { id: 1, name: "Smartphone Pro", price: 899000, category: "Téléphones", icon: "📱" },
  { id: 2, name: "Écouteurs Air", price: 149000, category: "Audio", icon: "🎧" },
  { id: 3, name: "Smart Watch X", price: 249000, category: "Accessoires", icon: "⌚" },
  { id: 4, name: "Laptop Pro", price: 2890000, category: "Ordinateurs", icon: "💻" },
  { id: 5, name: "Clavier RGB", price: 189000, category: "Gaming", icon: "⌨️" },
  { id: 6, name: "Souris Gaming", price: 99000, category: "Gaming", icon: "🖱️" },
];

function formatPrice(price: number) {
  return price.toLocaleString("fr-FR") + " Ar";
}

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tous");
  const [cart, setCart] = useState<number[]>([]);

  const filteredProducts = products.filter((product) =>
    (category === "Tous" || product.category === category) &&
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (id: number) => {
    setCart([...cart, id]);
  };

  return (
    <div className="app">

      <header className="header">
        <div className="logo">
          <span>4N</span> BOUTIQUE
        </div>

        <nav>
          <a href="#home">Accueil</a>
          <a href="#shop">Boutique</a>
          <a href="#categories">Catégories</a>
        </nav>

        <div className="header-actions">
          <button className="icon-button">♡</button>
          <button className="cart-button">
            🛒 <span>{cart.length}</span>
          </button>
        </div>
      </header>

      <main>

        <section className="hero" id="home">
          <div className="hero-content">
            <div className="badge">✦ 4N DEV MARKETPLACE</div>

            <h1>
              Le digital
              <span> nouvelle génération.</span>
            </h1>

            <p>
              Découvrez des produits modernes, technologiques et accessibles
              sélectionnés par 4N DEV.
            </p>

            <div className="hero-buttons">
              <a href="#shop" className="primary-button">
                Découvrir la boutique →
              </a>
              <button className="secondary-button">
                Voir les nouveautés
              </button>
            </div>
          </div>

          <div className="hero-visual">
            <div className="orb">
              <span>4N</span>
            </div>
          </div>
        </section>

        <section className="shop" id="shop">

          <div className="section-heading">
            <div>
              <div className="small-title">NOS PRODUITS</div>
              <h2>Explorez la boutique</h2>
            </div>

            <div className="search-box">
              🔎
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="categories" id="categories">
            {["Tous", "Téléphones", "Ordinateurs", "Audio", "Gaming", "Accessoires"].map((item) => (
              <button
                key={item}
                type="button"
                className={`category ${category === item ? "active" : ""}`}
                onClick={() => setCategory(item)}
                aria-pressed={category === item}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="product-grid">
            {filteredProducts.map((product) => (
              <article className="product-card" key={product.id}>

                <div className="product-image">
                  <span>{product.icon}</span>
                  <button className="favorite">♡</button>
                </div>

                <div className="product-info">
                  <div className="product-category">
                    {product.category}
                  </div>

                  <h3>{product.name}</h3>

                  <div className="product-bottom">
                    <strong>{formatPrice(product.price)}</strong>

                    <button
                      className="add-button"
                      onClick={() => addToCart(product.id)}
                    >
                      +
                    </button>
                  </div>
                </div>

              </article>
            ))}
          </div>

        </section>

        <section className="promo">
          <div>
            <div className="small-title">4N DEV</div>
            <h2>La technologie à votre portée.</h2>
            <p>
              Une expérience e-commerce pensée pour Madagascar.
            </p>
          </div>

          <div className="promo-icon">✦</div>
        </section>

      </main>

      <footer>
        <div className="footer-logo">4N DEV</div>
        <p>© 2026 4N DEV — Nous créons le digital de demain.</p>
      </footer>

    </div>
  );
}

export default App;
