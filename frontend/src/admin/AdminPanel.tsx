import { useState } from "react";
import type { Product } from "../products";
import { useStore } from "../storeContext";
import "./admin.css";

function AdminPanel() {
  const { products, store, setProducts, setStore, resetStore } = useStore();
  const [saved, setSaved] = useState(false);

  const updateProduct = (id: number, patch: Partial<Product>) => {
    setProducts(products.map((product) => product.id === id ? { ...product, ...patch } : product));
    setSaved(false);
  };

  const addProduct = () => {
    const nextId = Math.max(0, ...products.map((product) => product.id)) + 1;
    setProducts([
      ...products,
      { id: nextId, name: "Nouveau produit", price: 0, category: "Nouveautés", icon: "🛍️" },
    ]);
    setSaved(false);
  };

  const removeProduct = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
    setSaved(false);
  };

  const save = () => setSaved(true);

  return (
    <main className="admin-page">
      <header className="admin-header">
        <div>
          <div className="admin-kicker">4N DEV TEMPLATE</div>
          <h1>Administration</h1>
          <p>Gestion locale du contenu de la boutique.</p>
        </div>
        <div className="admin-actions">
          <a href="/" className="admin-button secondary">Voir la boutique</a>
          <button className="admin-button" onClick={save}>Enregistrer</button>
        </div>
      </header>

      {saved && <div className="admin-success">✓ Modifications enregistrées dans ce navigateur.</div>}

      <section className="admin-card">
        <div className="admin-card-heading">
          <div><h2>Informations de la boutique</h2><p>Ces champs servent de base pour chaque nouveau client.</p></div>
        </div>
        <div className="admin-grid">
          <label>Nom
            <input value={store.name} onChange={(e) => setStore({ ...store, name: e.target.value })} />
          </label>
          <label>Logo / accent
            <input value={store.logoAccent} onChange={(e) => setStore({ ...store, logoAccent: e.target.value })} />
          </label>
          <label>Devise
            <input value={store.currency} onChange={(e) => setStore({ ...store, currency: e.target.value })} />
          </label>
          <label>WhatsApp
            <input value={store.whatsappNumber} placeholder="261XXXXXXXXX" onChange={(e) => setStore({ ...store, whatsappNumber: e.target.value })} />
          </label>
          <label className="wide">Description
            <textarea value={store.heroDescription} onChange={(e) => setStore({ ...store, heroDescription: e.target.value })} />
          </label>
        </div>
      </section>

      <section className="admin-card">
        <div className="admin-card-heading">
          <div><h2>Catalogue produits</h2><p>{products.length} produit(s) dans le catalogue.</p></div>
          <button className="admin-button" onClick={addProduct}>+ Ajouter</button>
        </div>
        <div className="admin-products">
          {products.map((product) => (
            <article className="admin-product" key={product.id}>
              <div className="admin-product-icon">{product.icon}</div>
              <div className="admin-product-fields">
                <label>Nom<input value={product.name} onChange={(e) => updateProduct(product.id, { name: e.target.value })} /></label>
                <label>Prix<input type="number" min="0" value={product.price} onChange={(e) => updateProduct(product.id, { price: Number(e.target.value) || 0 })} /></label>
                <label>Catégorie<input value={product.category} onChange={(e) => updateProduct(product.id, { category: e.target.value })} /></label>
                <label>Icône<input value={product.icon} onChange={(e) => updateProduct(product.id, { icon: e.target.value })} /></label>
                <label className="wide">Image URL<input value={product.image || ""} placeholder="https://..." onChange={(e) => updateProduct(product.id, { image: e.target.value || undefined })} /></label>
                <label className="checkbox"><input type="checkbox" checked={Boolean(product.featured)} onChange={(e) => updateProduct(product.id, { featured: e.target.checked })} /> Nouveauté</label>
              </div>
              <button className="delete-button" onClick={() => removeProduct(product.id)}>Supprimer</button>
            </article>
          ))}
        </div>
      </section>

      <section className="admin-card warning">
        <h2>Réinitialiser le template</h2>
        <p>Supprime les modifications locales et revient au catalogue de démonstration.</p>
        <button className="admin-button danger" onClick={resetStore}>Réinitialiser</button>
      </section>

      <div className="admin-notice">
        <strong>Important :</strong> cette administration est volontairement locale pour le template.
        Pour un client réel, l'étape suivante sera l'authentification admin + API + base de données.
      </div>
    </main>
  );
}

export default AdminPanel;
