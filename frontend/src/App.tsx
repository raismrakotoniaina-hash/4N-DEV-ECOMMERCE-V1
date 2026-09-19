import { useMemo, useState } from "react";
import "./App.css";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  badge?: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Smartphone Pro X",
    category: "Électronique",
    price: 899000,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
    badge: "Nouveau",
  },
  {
    id: 2,
    name: "Casque Wireless Pro",
    category: "Audio",
    price: 249000,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    badge: "Populaire",
  },
  {
    id: 3,
    name: "Montre Smart X",
    category: "Accessoires",
    price: 329000,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Laptop Ultra",
    category: "Informatique",
    price: 2499000,
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
    badge: "Premium",
  },
  {
    id: 5,
    name: "Camera Creator",
    category: "Photo",
    price: 1299000,
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Gaming Keyboard",
    category: "Gaming",
    price: 189000,
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
  },
];

const categories = [
  "Tous",
  "Électronique",
  "Audio",
  "Accessoires",
  "Informatique",
  "Photo",
  "Gaming",
];

function formatPrice(price: number) {
  return new Intl.NumberFormat("fr-FR").format(price) + " Ar";
}

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tous");
  const [cartCount, setCartCount] = useState(0);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "Tous" || product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-mark">4N</span>
            <span className="logo-text">SHOP</span>
          </div>

          <nav className="nav">
            <a href="#home">Accueil</a>
            <a href="#products">Produits</a>
            <a href="#categories">Catégories</a>
            <a href="#about">À propos</a>
          </nav>

          <button className="cart-button">
            🛒
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <div className="hero-badge">✦ 4N DEV E-COMMERCE V1</div>

            <h1>
              Votre boutique.
              <br />
              <span>Votre univers.</span>
            </h1>

            <p>
              Découvrez une nouvelle expérience shopping moderne,
              rapide et pensée pour le mobile.
            </p>

            <div className="hero-actions">
              <a href="#products" className="primary-button">
                Découvrir les produits →
              </a>

              <a href="#categories" className="secondary-button">
                Explorer
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-glow" />
            <div className="hero-card">
              <span>COLLECTION</span>
              <strong>FUTURE</strong>
              <small>2026</small>
            </div>
          </div>
        </section>

        <section className="search-section">
          <div className="search-box">
            <span>🔍</span>

            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            {search && (
              <button onClick={() => setSearch("")}>×</button>
            )}
          </div>
        </section>

        <section className="categories-section" id="categories">
          <span className="section-label">CATÉGORIES</span>
          <h2>Explorez nos univers</h2>

          <div className="categories">
            {categories.map((item) => (
              <button
                key={item}
                className={`category-button ${
                  category === item ? "active" : ""
                }`}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        <section className="products-section" id="products">
          <div className="section-heading">
            <div>
              <span className="section-label">COLLECTION</span>
              <h2>Produits sélectionnés</h2>
            </div>

            <span>{filteredProducts.length} produits</span>
          </div>

          <div className="product-grid">
            {filteredProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-image">
                  <img src={product.image} alt={product.name} />

                  {product.badge && (
                    <span className="product-badge">
                      {product.badge}
                    </span>
                  )}
                </div>

                <div className="product-info">
                  <span className="product-category">
                    {product.category}
                  </span>

                  <h3>{product.name}</h3>

                  <div className="product-bottom">
                    <strong>{formatPrice(product.price)}</strong>

                    <button
                      className="add-button"
                      onClick={() =>
                        setCartCount((count) => count + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="features-section">
          <div className="feature">
            <strong>⚡ Rapide</strong>
            <p>Une expérience simple et rapide.</p>
          </div>

          <div className="feature">
            <strong>🔒 Sécurisé</strong>
            <p>Vos données sont protégées.</p>
          </div>

          <div className="feature">
            <strong>📱 Mobile First</strong>
            <p>Optimisé pour le téléphone.</p>
          </div>
        </section>

        <section className="about-section" id="about">
          <span className="section-label">4N DEV</span>

          <h2>Une nouvelle génération de commerce digital.</h2>

          <p>
            Une plateforme moderne conçue pour créer des boutiques
            professionnelles, rapides et évolutives.
          </p>
        </section>
      </main>

      <footer className="footer">
        <strong>4N SHOP</strong>
        <p>Une solution e-commerce créée par 4N Dev.</p>
        <small>© 2026 4N Dev. Tous droits réservés.</small>
      </footer>
    </div>
  );
}

export default App;
