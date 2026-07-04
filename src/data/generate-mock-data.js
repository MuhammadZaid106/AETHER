const fs = require('fs');
const path = require('path');

const categories = [
  'Electronics',
  'Fashion',
  'Beauty',
  'Home & Living',
  'Sports',
  'Groceries',
  'Kids',
  'Auto'
];

const subcategories = {
  'Electronics': ['Audio', 'Wearables', 'Computers', 'Smart Home'],
  'Fashion': ['Menswear', 'Womenswear', 'Accessories', 'Footwear'],
  'Beauty': ['Skincare', 'Makeup', 'Fragrance', 'Haircare'],
  'Home & Living': ['Furniture', 'Decor', 'Kitchen', 'Bedding'],
  'Sports': ['Fitness', 'Outdoor', 'Apparel', 'Gear'],
  'Groceries': ['Beverages', 'Snacks', 'Pantry', 'Organic'],
  'Kids': ['Toys', 'Clothing', 'Baby Gear', 'Education'],
  'Auto': ['Accessories', 'Tools', 'Care', 'Gadgets']
};

const brands = {
  'Electronics': ['AetherAudio', 'Chronos', 'NovaCompute', 'VortexHome'],
  'Fashion': ['Arcane Studio', 'Vellum', 'Sartorialist', 'Tread Co.'],
  'Beauty': ['Glow Lab', 'Velvet Iris', 'Flora', 'Elixir'],
  'Home & Living': ['Modura', 'Atelier Loft', 'Sienna Kettle', 'Haven'],
  'Sports': ['Apex', 'Terra Trail', 'Kinetix', 'Vanguard Sport'],
  'Groceries': ['Nectar', 'Crisp Co.', 'Savor', 'Pure Harvest'],
  'Kids': ['Playbox', 'Tiny Thread', 'Stellar Kids', 'Bright Mind'],
  'Auto': ['Carbon Drive', 'Torque Tech', 'Lume Auto', 'Drive Gear']
};

// Pexels/Coverr placeholder image topics
const imageTopics = {
  'Electronics': ['headphones', 'smartwatch', 'laptop', 'speaker'],
  'Fashion': ['jacket', 'dress', 'sunglasses', 'shoes'],
  'Beauty': ['skincare', 'perfume', 'cosmetics', 'serum'],
  'Home & Living': ['chair', 'vase', 'kitchenware', 'bedding'],
  'Sports': ['dumbbells', 'backpack', 'sneakers', 'waterbottle'],
  'Groceries': ['coffee', 'chocolate', 'oil', 'tea'],
  'Kids': ['toy', 'kids-clothing', 'stroller', 'boardgame'],
  'Auto': ['car-accessories', 'tools', 'car-wash', 'dashcam']
};

const productTemplates = {
  'Electronics': [
    { name: 'Studio ANC Headphones', basePrice: 299, desc: 'High-fidelity audio with hybrid active noise cancellation, premium memory foam earcups, and 40-hour battery life.' },
    { name: 'Chronos Smartwatch X', basePrice: 199, desc: 'Advanced fitness tracking, AMOLED display, ECG monitor, and blood oxygen tracking in a sleek titanium shell.' },
    { name: 'Vortex Mechanical Keyboard', basePrice: 149, desc: 'Hot-swappable switches, PBT keycaps, per-key RGB backlighting, and a solid CNC aluminum frame.' },
    { name: 'Nova Book 14 Pro', basePrice: 1299, desc: 'Powerful processing meets stunning 120Hz OLED display. The ultimate thin-and-light laptop for creators.' },
    { name: 'Beam Wireless Soundbar', basePrice: 249, desc: 'Immersive Dolby Atmos sound, built-in voice assistants, and seamless multi-room audio synchronization.' },
    { name: 'Aura Smart Ambient Light', basePrice: 79, desc: 'Syncs with your music or screen colors to create custom dynamic atmospheres in any space.' },
    { name: 'Eclipse Wireless Charger 3-in-1', basePrice: 89, desc: 'Charges your phone, watch, and earbuds simultaneously with fast magnetic alignment.' },
    { name: 'Apex ANC Earbuds', basePrice: 179, desc: 'True wireless earbuds with custom dynamic drivers, transparency mode, and IPX7 sweat resistance.' }
  ],
  'Fashion': [
    { name: 'Vellum Oversized Trench Coat', basePrice: 220, desc: 'Water-resistant gabardine cotton with signature double-breasted closure and adjustable waist belt.' },
    { name: 'Arcane Linen Blazer', basePrice: 160, desc: 'Breathable European linen construction. Relaxed fit suitable for smart-casual summer styles.' },
    { name: 'Tread Co. Chelsea Boots', basePrice: 180, desc: 'Handcrafted premium leather with elastic side panels, Goodyear welt construction, and durable rubber outsoles.' },
    { name: 'Minimalist Leather Tote', basePrice: 140, desc: 'Full-grain Italian leather bag with internal laptop sleeve and magnetic top closure.' },
    { name: 'Sartorialist Knit Polo', basePrice: 85, desc: 'Fine-gauge merino wool polo knit with a classic flat collar and three-button placket.' },
    { name: 'Solstice Acetate Sunglasses', basePrice: 120, desc: 'Hand-polished bio-acetate frames paired with polarized UVA/UVB protection lenses.' },
    { name: 'Raw Denim Slim Jeans', basePrice: 110, desc: '14oz Japanese selvedge denim that breaks in uniquely over time for a customized fit.' },
    { name: 'Vellum Merino Wool Sweater', basePrice: 130, desc: 'Ultra-soft, temperature-regulating merino wool sweater with ribbed cuffs and hem.' }
  ],
  'Beauty': [
    { name: 'Hydra-Glow Peptide Serum', basePrice: 58, desc: 'Plumping formula with multi-molecular hyaluronic acid, peptides, and niacinamide for ultimate radiance.' },
    { name: 'Iris Noir Eau de Parfum', basePrice: 110, desc: 'A rich scent combining midnight iris, warm cedarwood, and delicate vanilla extracts.' },
    { name: 'Flora Botanical Cleansing Oil', basePrice: 34, desc: 'Gentle oil-to-milk cleanser infused with sweet almond, jojoba, and vitamin E to dissolve makeup.' },
    { name: 'Velvet Skin Tint SPF 30', basePrice: 42, desc: 'Lightweight foundation offering sheer-to-medium coverage with mineral sun protection.' },
    { name: 'Elixir Recovery Face Oil', basePrice: 65, desc: 'Rich blend of rosehip, squalane, and evening primrose oils to restore the skin barrier overnight.' },
    { name: 'Silk Sleep Lip Mask', basePrice: 24, desc: 'Nourishing lip treatment with shea butter and berry extracts for soft lips by morning.' },
    { name: 'Pro-Caffeine Eye Cream', basePrice: 38, desc: 'De-puffing formula with green tea extract and vitamin C to target dark circles and fine lines.' },
    { name: 'Mineral Shield Sunscreen SPF 50', basePrice: 32, desc: 'Non-greasy, broad-spectrum mineral sunscreen that leaves zero white cast.' }
  ],
  'Home & Living': [
    { name: 'Atelier Bouclé Lounge Chair', basePrice: 499, desc: 'Ergonomic statement chair upholstered in premium textured bouclé fabric with solid oak legs.' },
    { name: 'Sienna Ceramic Kettle', basePrice: 95, desc: 'Electric gooseneck kettle with precise temperature control and sleek matte ceramic body.' },
    { name: 'Haven Organic Waffle Blanket', basePrice: 110, desc: 'Ultra-soft waffle knit made from 100% organic long-staple cotton.' },
    { name: 'Modura Brass Floor Lamp', basePrice: 160, desc: 'Mid-century design with brushed brass finish, adjustable dome head, and marble base.' },
    { name: 'Atelier Stoneware Dinner Set', basePrice: 140, desc: '16-piece hand-glazed stoneware set, dishwasher and microwave safe.' },
    { name: 'Terrazzo Soy Wax Candle', basePrice: 32, desc: 'Hand-poured candle in a reusable terrazzo pot, scented with sandalwood and amber.' },
    { name: 'Haven Linen Bedding Set', basePrice: 220, desc: 'Made from premium French flax, pre-washed for exceptional softness and breathability.' },
    { name: 'Modura Glass Carafe Set', basePrice: 48, desc: 'Hand-blown glass carafe with two matching tumblers in a subtle smoke tint.' }
  ],
  'Sports': [
    { name: 'Apex Adjustable Dumbbells', basePrice: 329, desc: 'Space-saving weights adjusting from 5 to 52.5 lbs with a simple dial mechanism.' },
    { name: 'Terra Trail Hiking Pack 45L', basePrice: 145, desc: 'Lightweight, weather-resistant pack with ergonomic harness and integrated hydration sleeve.' },
    { name: 'Kinetix Road Running Shoes', basePrice: 130, desc: 'Responsive cushioning with breathable engineered mesh and high-traction carbon rubber sole.' },
    { name: 'Vanguard Hydro Flask 32oz', basePrice: 42, desc: 'Double-wall vacuum insulation keeps drinks cold for 24 hours or hot for 12.' },
    { name: 'Terra Trail Pop-up Tent 2P', basePrice: 180, desc: 'Assembles in under a minute. Weather-resistant rainfly, spacious interior, and dual doors.' },
    { name: 'Kinetix Cork Yoga Mat', basePrice: 65, desc: 'Non-slip natural cork surface with cushioned TPE backing for joint support.' },
    { name: 'Vanguard Running Windbreaker', basePrice: 85, desc: 'Ultralight, windproof, and water-repellent jacket with reflective detailing for night runs.' },
    { name: 'Apex Massage Gun Pro', basePrice: 199, desc: 'Percussive therapy device with 5 speed levels and 6 interchangeable attachments.' }
  ],
  'Groceries': [
    { name: 'Aromatic Single-Origin Coffee Beans', basePrice: 18, desc: 'Ethically sourced, medium roast beans from Ethiopian highlands. Notes of citrus and floral jasmine.' },
    { name: 'Artisanal Dark Chocolate Bar', basePrice: 8, desc: '72% single-origin cacao from Ecuador, infused with sea salt crystals.' },
    { name: 'Cold-Pressed Organic Olive Oil', basePrice: 24, desc: 'Extra virgin olive oil from early harvest olives in Crete. Rich, peppery finish.' },
    { name: 'Matcha Ceremonial Tea Powder', basePrice: 28, desc: 'Stone-ground Uji matcha with vibrant green color and smooth, sweet umami flavor.' },
    { name: 'Raw Wildflower Honey', basePrice: 12, desc: 'Unfiltered, pure honey harvested from wildflower meadows.' },
    { name: 'Organic Herbal Infusions Gift Set', basePrice: 22, desc: 'Assortment of chamomile, peppermint, hibiscus, and rooibos loose leaf teas.' },
    { name: 'Ancient Grains Granola', basePrice: 9, desc: 'Toasted oats, quinoa, chia, and pumpkin seeds sweetened with pure maple syrup.' },
    { name: 'Pure Maple Syrup Grade A', basePrice: 15, desc: '100% pure organic dark maple syrup harvested in Vermont.' }
  ],
  'Kids': [
    { name: 'Playbox Wooden Block Set', basePrice: 45, desc: '50-piece set made from sustainable beechwood. Promotes fine motor skills and spatial awareness.' },
    { name: 'Tiny Thread Cotton Romper', basePrice: 28, desc: 'Organic ribbed cotton bodysuit with snap closures for easy dressing and changing.' },
    { name: 'Bright Mind Magnetic Tiles 100pc', basePrice: 68, desc: '3D magnetic building blocks in vibrant colors. Encourages STEM learning and creativity.' },
    { name: 'Stellar Kids Stroller Organizer', basePrice: 35, desc: 'Universal fit with insulated cup holders, main storage compartment, and zip-off wristlet.' },
    { name: 'Playbox Montessori Activity Cube', basePrice: 55, desc: '5-in-1 sensory toy featuring bead maze, shape sorter, gear spinners, and clock.' },
    { name: 'Stellar Convertible High Chair', basePrice: 160, desc: 'Modern wooden high chair that converts into a toddler chair as your child grows.' },
    { name: 'Tiny Thread Knitted Blanket', basePrice: 42, desc: 'Soft pointelle knit baby blanket made from organic cotton.' },
    { name: 'Bright Mind Wooden Balance Board', basePrice: 79, desc: 'Multi-use curved board supporting balance, coordination, and imaginative play.' }
  ],
  'Auto': [
    { name: 'Torque Tech Portable Tire Inflator', basePrice: 59, desc: 'Digital pressure preset, auto shut-off, and built-in LED flashlight. Recharges via USB.' },
    { name: 'Carbon Drive Leather Seat Covers', basePrice: 120, desc: 'Premium synthetic leather covers, waterproof and breathable. Universal fit.' },
    { name: 'Lume Auto Dual Dash Cam Pro', basePrice: 140, desc: 'Front and rear cameras recording in 4K with night vision, G-sensor, and GPS tracking.' },
    { name: 'Drive Gear Microfiber Wash Mitt', basePrice: 14, desc: 'Lint-free, scratch-free plush microfiber for safe and efficient car washing.' },
    { name: 'Torque Tech OBD2 Scanner Tool', basePrice: 45, desc: 'Reads and clears engine trouble codes, retrieves vehicle info, and runs emissions tests.' },
    { name: 'Carbon Drive Trunk Organizer', basePrice: 38, desc: 'Collapsible multi-compartment organizer with securing straps and non-slip bottom.' },
    { name: 'Lume Auto Smart Phone Mount', basePrice: 24, desc: 'Air vent mount with auto-clamping magnetic induction charging.' },
    { name: 'Drive Gear Ceramic Wax Spray', basePrice: 20, desc: 'Hydrophobic coating providing high-gloss shine and long-lasting paint protection.' }
  ]
};

// Generate 64 products
const products = [];
let productIdCounter = 1;

categories.forEach(category => {
  const templates = productTemplates[category];
  const categorySubcategories = subcategories[category];
  const categoryBrands = brands[category];
  const imageTopic = imageTopics[category];

  templates.forEach((tpl, index) => {
    const id = `p_${productIdCounter++}`;
    const slug = tpl.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const hasDiscount = index % 3 === 0; // 33% of items have discount
    const compareAtPrice = hasDiscount ? Math.round(tpl.basePrice * 1.3) : undefined;
    
    // Generate mock unsplash images (quality, beautiful shots based on topic)
    const topic = imageTopic[index % imageTopic.length];
    const imageWidth = 600;
    const imageHeight = 600;
    const images = [
      `https://images.unsplash.com/photo-${getPhotoId(topic, 1)}?auto=format&fit=crop&w=${imageWidth}&q=80`,
      `https://images.unsplash.com/photo-${getPhotoId(topic, 2)}?auto=format&fit=crop&w=${imageWidth}&q=80`
    ];

    // Some detailed specs
    const specs = {
      Brand: categoryBrands[index % categoryBrands.length],
      Subcategory: categorySubcategories[index % categorySubcategories.length],
      Warranty: index % 2 === 0 ? '1 Year' : '2 Years',
      Material: index % 2 === 0 ? 'Premium Recycled' : 'Eco-conscious'
    };

    // Color/size variants
    const variants = [
      { id: `${id}_v1`, color: 'Slate Grey', size: 'M', stock: 15 },
      { id: `${id}_v2`, color: 'Chalk White', size: 'M', stock: 8 },
      { id: `${id}_v3`, color: 'Midnight Black', size: 'M', stock: 3 },
      { id: `${id}_v4`, color: 'Slate Grey', size: 'L', stock: 5 },
      { id: `${id}_v5`, color: 'Chalk White', size: 'L', stock: 12 }
    ];

    products.push({
      id,
      slug,
      name: tpl.name,
      category,
      price: tpl.basePrice,
      compareAtPrice,
      images,
      description: tpl.desc,
      specs,
      variants,
      stock: variants.reduce((acc, v) => acc + v.stock, 0),
      rating: parseFloat((4 + Math.random() * 0.9).toFixed(1)),
      reviewCount: Math.floor(10 + Math.random() * 240),
      tags: [category.toLowerCase(), specs.Subcategory.toLowerCase(), specs.Brand.toLowerCase()]
    });
  });
});

function getPhotoId(topic, offset) {
  // A lookup of clean high-quality photo IDs from Unsplash so they load beautifully
  const lookups = {
    'headphones': ['1505740420928-5e560c06d30e', '1583394838336-acd977736f90'],
    'smartwatch': ['1523275335684-37898b6baf30', '1542496658-e33a6d0d50f6'],
    'laptop': ['1488590528505-98d2b5aba04b', '1498050108023-c5249f4df085'],
    'speaker': ['1545454675-3531b543be5d', '1618384887929-16ec33fab9ef'],
    'jacket': ['1591047139829-d91aecb6caea', '1551028719-00167b16eac5'],
    'dress': ['1595777457583-95e059d581b8', '1566174053879-31528523f8ae'],
    'sunglasses': ['1511499767150-a48a237f0083', '1572635196237-14b3f281503f'],
    'shoes': ['1549298916-b41d501d3772', '1542291026-7eec264c27ff'],
    'skincare': ['1556228720-195a672e8a03', '1608248597279-f99d160bfcbc'],
    'perfume': ['1523293182086-7651a899d37f', '1541643600914-78b084683601'],
    'cosmetics': ['1596462502278-27bfdc403348', '1522335789203-aabd1fc54bc9'],
    'serum': ['1620916566398-39f1143ab7be', '1615397349754-cfa2066a298e'],
    'chair': ['1567538096630-e0c55bd6374c', '1592078615290-033ee584e267'],
    'vase': ['1612196808214-b8e1d6145a8c', '1556228720-195a672e8a03'],
    'kitchenware': ['1584269600464-37b1b58a9fe7', '1590794056226-79ef3a8147e1'],
    'bedding': ['1522771739844-6a9f6d5f14af', '1505693416388-ac5ce068fe85'],
    'dumbbells': ['1638536532686-d610adfc8e5c', '1517838277536-f5f99be501cd'],
    'backpack': ['1553062407-98eeb64c6a62', '1622560480605-d83c853bc5c3'],
    'sneakers': ['1595950653106-6c9ebd614d3a', '1606107557195-0e29a4b5b4aa'],
    'waterbottle': ['1523275335684-37898b6baf30', '1505740420928-5e560c06d30e'],
    'coffee': ['1497515114629-f71d768fd07c', '1509042239860-f550ce710b93'],
    'chocolate': ['1505740420928-5e560c06d30e', '1523275335684-37898b6baf30'],
    'oil': ['1505740420928-5e560c06d30e', '1523275335684-37898b6baf30'],
    'tea': ['1505740420928-5e560c06d30e', '1523275335684-37898b6baf30'],
    'toy': ['1505740420928-5e560c06d30e', '1523275335684-37898b6baf30'],
    'kids-clothing': ['1505740420928-5e560c06d30e', '1523275335684-37898b6baf30'],
    'stroller': ['1505740420928-5e560c06d30e', '1523275335684-37898b6baf30'],
    'boardgame': ['1505740420928-5e560c06d30e', '1523275335684-37898b6baf30'],
    'car-accessories': ['1552519507-da3b142c6e3d', '1525609004556-c46c7d6cf0a3'],
    'tools': ['1526170375885-4d8ecf77b99f', '1488590528505-98d2b5aba04b'],
    'car-wash': ['1552519507-da3b142c6e3d', '1525609004556-c46c7d6cf0a3'],
    'dashcam': ['1552519507-da3b142c6e3d', '1525609004556-c46c7d6cf0a3']
  };

  const images = lookups[topic];
  const id = images && images[offset - 1] ? images[offset - 1] : '1505740420928-5e560c06d30e';
  return id;
}

// Generate mock orders
const orders = [];
const orderStatuses = ['Processing', 'Shipped', 'Delivered', 'Cancelled'];
for (let i = 1; i <= 24; i++) {
  const orderProducts = [
    products[Math.floor(Math.random() * products.length)],
    products[Math.floor(Math.random() * products.length)]
  ];
  const total = orderProducts.reduce((sum, p) => sum + p.price, 0);

  orders.push({
    id: `ORD_${1000 + i}`,
    date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
    status: orderStatuses[i % orderStatuses.length],
    total,
    customer: {
      name: `User ${i}`,
      email: `user${i}@example.com`,
      phone: `+1 555-01${i}`,
      address: `${100 + i} Main St`,
      city: 'Metropolis',
      state: 'NY',
      zip: `100${i}`,
      country: 'United States'
    },
    items: orderProducts.map(p => ({
      productId: p.id,
      name: p.name,
      price: p.price,
      qty: 1,
      variant: 'Slate Grey / M'
    }))
  });
}

// Generate reviews
const reviews = {};
products.forEach(p => {
  reviews[p.id] = [
    {
      id: `r_${p.id}_1`,
      userName: 'Avery K.',
      rating: 5,
      comment: 'Absolutely exceeded my expectations. Built quality is stellar!',
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: `r_${p.id}_2`,
      userName: 'Marcus L.',
      rating: 4,
      comment: 'Very solid. Only feedback is shipping took a day longer than expected.',
      date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
    }
  ];
});

// Ensure directory exists
const dir = path.join(__dirname, '..', '..', 'src', 'data');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(path.join(dir, 'products.json'), JSON.stringify(products, null, 2));
fs.writeFileSync(path.join(dir, 'orders.json'), JSON.stringify(orders, null, 2));
fs.writeFileSync(path.join(dir, 'reviews.json'), JSON.stringify(reviews, null, 2));

console.log('Successfully generated mock data files!');
