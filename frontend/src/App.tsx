import { useState } from "react";
import AdminPanel from "./admin/AdminPanel";
import { useStore } from "./storeContext";
import "./App.css";

type Cart = Record<number, number>;

function formatPrice(price: number) {
  return price.toLocaleString(store.locale) + " " + store.currency;
}

function App() {
  if (new URLSearchParams(window.location.search).get("admin") === "1") return <AdminPanel />;

  const { products, store } = useStore();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tous");
  const [cart, setCart] = useState<Cart>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [featuredOnly, setFeaturedOnly] = useState(false);

  const categories = ["Tous", ...new Set(products.map((product) => product.category))];
  const filteredProducts = products.filter((product) =>
    (category === "Tous" || product.category === category) &&
    (!favoritesOnly || favorites.includes(product.id)) &&
    (!featuredOnly || product.featured) &&
    (product.name + " " + product.category).toLocaleLowerCase().includes(search.trim().toLocaleLowerCase())
  );
  const cartItems = products.filter((product) => (cart[product.id] || 0) > 0);
  const cartCount = cartItems.reduce((sum, product) => sum + cart[product.id], 0);
  const cartTotal = cartItems.reduce((sum, product) => sum + product.price * cart[product.id], 0);

  const changeQuantity = (id: number, delta: number) => {
    setCart((current) => {
      const next = { ...current };
      const quantity = (next[id] || 0) + delta;
      if (quantity <= 0) delete next[id];
      else next[id] = quantity;
      return next;
    });
  };

  const toggleFavorite = (id: number) => {
    setFavorites((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  const showNew = () => {
    setSearch("");
    setCategory("Tous");
    setFavoritesOnly(false);
    setFeaturedOnly(true);
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
  };

  const orderText = [
    "Bonjour, je souhaite commander :",
    ...cartItems.map((product) =>
      "- " + product.name + " x" + cart[product.id] + " : " +
      formatPrice(product.price * cart[product.id])
    ),
    "Total : " + formatPrice(cartTotal),
  ].join("\n");
  const whatsapp = store.whatsappNumber.replace(/\D/g, "");

  return (
    <div className="app">
      <header className="header">
        <a href="#home" className="logo"><span>{store.logoAccent}</span> {store.name.replace(store.logoAccent, "").trim()}</a>
        <nav aria-label="Navigation principale">
          <a href="#home">Accueil</a>
          <a href="#shop">Boutique</a>
          <a href="#categories">Catégories</a>
        </nav>
        <div className="header-actions">
          <button className={`icon-button ${favoritesOnly ? "selected" : ""}`}
            aria-label="Afficher les favoris" aria-pressed={favoritesOnly}
            onClick={() => { setFavoritesOnly((value) => !value); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); }}>
            ♥ <span className="action-count">{favorites.length}</span>
          </button>
          <button className="cart-button" aria-label={`Ouvrir le panier, ${cartCount} articles`}
            onClick={() => setCartOpen(true)}>🛒 <span>{cartCount}</span></button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <div className="badge">{store.heroEyebrow}</div>
            <h1>{store.heroTitle}<span> {store.heroHighlight}</span></h1>
            <p>{store.heroDescription}</p>
            <div className="hero-buttons">
              <a href="#shop" className="primary-button">Découvrir la boutique →</a>
              <button className="secondary-button" onClick={showNew}>Voir les nouveautés</button>
            </div>
          </div>
          <div className="hero-visual"><div className="orb"><span>{store.logoAccent}</span></div></div>
        </section>

        <section className="shop" id="shop">
          <div className="section-heading">
            <div><div className="small-title">NOS PRODUITS</div><h2>Explorez la boutique</h2></div>
            <div className="search-box">🔎
              <input type="search" aria-label="Rechercher un produit" placeholder="Rechercher un produit..."
                value={search} onChange={(event) => setSearch(event.target.value)} />
            </div>
          </div>
          <div className="categories" id="categories">
            {categories.map((item) => (
              <button key={item} type="button"
                className={`category ${category === item ? "active" : ""}`}
                onClick={() => { setCategory(item); setFeaturedOnly(false); }} aria-pressed={category === item}>{item}</button>
            ))}
          </div>
          {featuredOnly && <p className="filter-notice">Nouveautés <button onClick={() => setFeaturedOnly(false)}>Tout afficher</button></p>}
          {favoritesOnly && <p className="filter-notice">Favoris uniquement <button onClick={() => setFavoritesOnly(false)}>Tout afficher</button></p>}
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-image">
                  {product.image
                    ? <img src={product.image} alt={product.name} loading="lazy" />
                    : <span role="img" aria-label={product.name}>{product.icon}</span>}
                  <button className={`favorite ${favorites.includes(product.id) ? "selected" : ""}`}
                    aria-label={favorites.includes(product.id) ? "Retirer des favoris" : "Ajouter aux favoris"}
                    aria-pressed={favorites.includes(product.id)}
                    onClick={() => toggleFavorite(product.id)}>{favorites.includes(product.id) ? "♥" : "♡"}</button>
                </div>
                <div className="product-info">
                  <div className="product-category">{product.category}</div>
                  <h3>{product.name}</h3>
                  <div className="product-bottom">
                    <strong>{formatPrice(product.price)}</strong>
                    <button className="add-button" aria-label={`Ajouter ${product.name} au panier`}
                      onClick={() => changeQuantity(product.id, 1)}>+</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {filteredProducts.length === 0 && <div className="empty-state">Aucun produit trouvé. Essayez une autre recherche ou catégorie.</div>}
        </section>

        <section className="promo">
          <div><div className="small-title">{store.logoAccent} DEV</div>
            <h2>{store.promoTitle}</h2><p>{store.promoDescription}</p></div>
          <div className="promo-icon">✦</div>
        </section>
      </main>

      <footer><div className="footer-logo">{store.name}</div><p>{store.footer}</p></footer>

      {cartOpen && (
        <div className="cart-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) setCartOpen(false); }}>
          <aside className="cart-panel" role="dialog" aria-modal="true" aria-label="Votre panier">
            <div className="cart-heading"><h2>Votre panier ({cartCount})</h2>
              <button className="cart-close" aria-label="Fermer le panier" onClick={() => setCartOpen(false)}>✕</button></div>
            {cartItems.length === 0
              ? <div className="empty-state">Votre panier est vide.</div>
              : <div className="cart-lines">{cartItems.map((product) => (
                <div className="cart-line" key={product.id}>
                  <span className="cart-item-icon">{product.icon}</span>
                  <div className="cart-item-info"><strong>{product.name}</strong>
                    <span>{formatPrice(product.price)}</span>
                    <div className="quantity-controls">
                      <button aria-label={`Diminuer ${product.name}`} onClick={() => changeQuantity(product.id, -1)}>−</button>
                      <span>{cart[product.id]}</span>
                      <button aria-label={`Augmenter ${product.name}`} onClick={() => changeQuantity(product.id, 1)}>+</button>
                      <button className="remove-item" onClick={() => changeQuantity(product.id, -cart[product.id])}>Retirer</button>
                    </div>
                  </div>
                </div>
              ))}</div>}
            <div className="cart-summary">
              <div className="cart-total"><span>Total</span><strong>{formatPrice(cartTotal)}</strong></div>
              {whatsapp && cartCount > 0
                ? <a className="checkout-button" href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(orderText)}`}
                    target="_blank" rel="noopener noreferrer">Commander sur WhatsApp</a>
                : <p className="checkout-note">Commande en ligne non activée. Configurez le contact du client avant publication.</p>}
              <button className="continue-button" onClick={() => setCartOpen(false)}>Continuer mes achats</button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

export default App;
