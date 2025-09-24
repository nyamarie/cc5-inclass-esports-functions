// Esports Arena catalog (price per unit)
const products = [
    { id: 201, name: "Pro Mouse (wired)",   category: "gear",    price: 39.99 },
    { id: 202, name: "Team Jersey",         category: "apparel", price: 49.5  },
    { id: 203, name: "Energy Drink 6-pack", category: "snacks",  price: 12.0  },
    { id: 204, name: "Arena Day Pass",      category: "access",  price: 15.0  },
    { id: 205, name: "Switchable Keycaps",  category: "gear",    price: 19.0  }
  ];
  
  // Example cart (product & quantity)
  const cart = [
    { productId: 202, qty: 1 },
    { productId: 203, qty: 2 },
    { productId: 204, qty: 1 },
    { productId: 205, qty: 1 }
  ];
  
  // Try: "regular", "student", "member", or "vip"
  const customerType = "member";

  // 1) getCategoryDiscount(category)
  function getCategoryDiscount(category) {
    switch ((category ?? "").toLowerCase()) {
      case "gear":    return 0.10;
      case "apparel": return 0.15;
      case "snacks":  return 0.08;
      case "access":  return 0.05;
      default:        return 0;
    }
  }

  // 2) priceAfterCategoryDiscount(product)
  function priceAfterCategoryDiscount(product) {
    const rate = getCategoryDiscount(product.category);
    return product.price * (1 - rate);
  }
  
  // 3) findProductById(id)
  function findProductById(id) {
    const p = products.find(prod => prod.id === id);
    return p ?? null;
  }
  
  //  4) lineItemTotal(cartItem)
  function lineItemTotal(cartItem) {
    const product = findProductById(cartItem.productId);
    const qty = Number(cartItem.qty);
    if (!product || !Number.isFinite(qty) || qty <= 0) return 0;
    const discountedUnit = priceAfterCategoryDiscount(product);
    return qty * discountedUnit;
  }

  // 5) orderSubtotal(cart)
  function orderSubtotal(cart) {
    return cart.reduce((sum, item) => sum + lineItemTotal(item), 0);
  }

  //  6) customerAdjustmentRate(customerType)
  function customerAdjustmentRate(customerType) {
    switch ((customerType ?? "").toLowerCase()) {
      case "student": return 0.03;
      case "member":  return 0.05;
      case "vip":     return 0.10;
      default:        return 0;
    }
  }

  //  7) orderTotal(cart, customerType)
  function orderTotal(cart, customerType) {
    const sub = orderSubtotal(cart);
    const adj = customerAdjustmentRate(customerType);
    return sub * (1 - adj);
  }