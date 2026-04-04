const Product = require('../models/productmodel');
const router = require('express').Router();

// 🔥 داتا تجريبية
const sendproducts = [
  // 💻 Laptops
  {
    name: 'Lenovo',
    description: 'A powerhouse laptop built for professionals and students. Features a lightning-fast Intel Core i7 processor, 16GB RAM, and a long-lasting battery. The Full HD IPS display delivers crisp visuals for work or entertainment, while the fast SSD ensures instant app loading. Perfect for multitasking and everyday productivity.',
    qty: 30,
    price: 500,
    category: '69cd911d35ae451096639710',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853'
  },
  {
    name: 'MacBook',
    description: 'Experience the future of computing with Apple\'s M2 chip delivering incredible performance and efficiency. The stunning Retina display with True Tone, Magic Keyboard, and up to 18 hours of battery life make this the ultimate laptop for creators and developers who demand the very best.',
    qty: 20,
    price: 1299,
    category: '69cd911d35ae451096639710',
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef'
  },
  {
    name: 'HP Laptop',
    description: 'Reliable and beautifully designed for modern work. The HP laptop combines a vibrant Full HD display with a powerful processor that handles everything from spreadsheets to video streaming. Fast SSD storage, an ergonomic keyboard, and all-day battery life keep you productive wherever you go.',
    qty: 25,
    price: 450,
    category: '69cd911d35ae451096639710',
    image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2'
  },
  {
    name: 'Dell',
    description: 'Engineered for peak performance with a stunning InfinityEdge display, blazing NVMe SSD, and a premium aluminum chassis. Thunderbolt ports, Wi-Fi 6, and a powerful processor make this the complete package for business professionals and creative users who never compromise.',
    qty: 15,
    price: 750,
    category: '69cd911d35ae451096639710',
    image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89'
  },
  {
    name: 'Asus ROG',
    description: 'Dominate every game with an NVIDIA RTX 4070 GPU, Intel Core i9 processor, and a 144Hz display for buttery smooth visuals. The advanced liquid metal cooling keeps temperatures low during marathon sessions, while per-key RGB lighting lets you game in style.',
    qty: 10,
    price: 1500,
    category: '69cd911d35ae451096639710',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302'
  },
  {
    name: 'Acer Aspire',
    description: 'The perfect laptop for students who refuse to compromise on performance. Solid processing power, generous SSD storage, and an all-day battery make it ideal for classes and assignments. Its lightweight design slips easily into your backpack for effortless portability every day.',
    qty: 40,
    price: 350,
    category: '69cd911d35ae451096639710',
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed'
  },
  {
    name: 'Microsoft Surface',
    description: 'Redefine productivity with this stunning 2-in-1 that switches between laptop and tablet mode instantly. The PixelSense touchscreen, Surface Pen support, and Windows 11 make it perfect for artists, students, and professionals. Its premium magnesium build feels both luxurious and durable.',
    qty: 18,
    price: 1100,
    category: '69cd911d35ae451096639710',
    image: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519'
  },
  {
    name: 'Razer Blade',
    description: 'Power and elegance in one stunning package. The CNC aluminum body houses a top-tier GPU and processor for 4K editing and AAA gaming. A 240Hz OLED display, Chroma RGB keyboard, and vapor chamber cooling make this the ultimate laptop for those who accept nothing but the best.',
    qty: 12,
    price: 1800,
    category: '69cd911d35ae451096639710',
    image: 'https://images.unsplash.com/photo-1542393545-10f5cde2c810'
  },
  {
    name: 'LG Gram',
    description: 'Weighing under 1kg with military-grade durability and up to 22 hours of battery life, the LG Gram proves portability and performance can coexist. The WQXGA display covers 99% DCI-P3, making it ideal for creative professionals who work on the move without compromise.',
    qty: 22,
    price: 980,
    category: '69cd911d35ae451096639710',
    image: 'https://images.unsplash.com/photo-1484788984921-03950022c9ef'
  },

  // 📱 Phones
  {
    name: 'iPhone 15',
    description: 'Apple\'s most advanced iPhone yet features the Dynamic Island, a stunning 48MP camera, and the powerful A16 Bionic chip. The Super Retina XDR display with ProMotion delivers silky 120Hz scrolling, while USB-C and a titanium frame complete this extraordinary flagship package.',
    qty: 50,
    price: 999,
    category: '69cd911d35ae45109663970f',
    image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5'
  },
  {
    name: 'Samsung S24',
    description: 'The Galaxy S24 combines a breathtaking 120Hz AMOLED display with Galaxy AI features that translate, edit photos, and assist smarter than ever. A 200MP camera system captures stunning detail day and night, while the Snapdragon 8 Gen 3 and 45W fast charging power through your busiest days.',
    qty: 40,
    price: 850,
    category: '69cd911d35ae45109663970f',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9'
  },
  {
    name: 'Xiaomi 14',
    description: 'Co-engineered with Leica, the Xiaomi 14 features a 1-inch sensor and Summicron lens that captures breathtaking photos with natural color accuracy. The Snapdragon 8 Gen 3 delivers blazing performance, while 120W HyperCharge fills the battery from zero to full in just 31 minutes.',
    qty: 35,
    price: 700,
    category: '69cd911d35ae45109663970f',
    image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505'
  },
  {
    name: 'Google Pixel 8',
    description: 'Powered by the Tensor G3 chip, the Pixel 8 brings unmatched AI intelligence to photography and daily tasks. Real-time translation, magical photo editing, and seven years of guaranteed updates make it the smartest long-term smartphone investment you can make today.',
    qty: 20,
    price: 799,
    category: '69cd911d35ae45109663970f',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97'
  },
  {
    name: 'Samsung A54',
    description: 'Flagship features at a mid-range price. The Galaxy A54 boasts a gorgeous 120Hz Super AMOLED display, a versatile 50MP triple camera, IP67 water resistance, and a massive 5000mAh battery. Five years of security updates make it a smartphone purchase you can feel truly confident about.',
    qty: 60,
    price: 400,
    category: '69cd911d35ae45109663970f',
    image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0'
  },
  {
    name: 'OnePlus 12',
    description: 'The ultimate flagship killer with a Hasselblad-tuned triple camera, a stunning 120Hz LTPO AMOLED display, and 100W SUPERVOOC charging that fills the 5400mAh battery in just 25 minutes. The Snapdragon 8 Gen 3 with 16GB RAM ensures absolutely zero compromise on performance.',
    qty: 30,
    price: 650,
    category: '69cd911d35ae45109663970f',
    image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2'
  },
  {
    name: 'Samsung Galaxy Z Fold 5',
    description: 'The future of smartphones unfolds before your eyes. The Z Fold 5 transforms from a pocket-sized phone into a stunning 7.6-inch tablet with a refined flat hinge and zero gap. S Pen support, three-app multitasking, and a pro camera system make it the most versatile device ever created.',
    qty: 10,
    price: 1200,
    category: '69cd911d35ae45109663970f',
    image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e'
  },
  {
    name: 'Oppo Find X7',
    description: 'A Hasselblad-certified camera system with a 1-inch Sony sensor and periscope telephoto delivers professional-grade photography in your pocket. The 100W SuperVOOC charging fills the 5000mAh battery in under 30 minutes, while the Dimensity 9300 processor handles everything with outstanding speed.',
    qty: 20,
    price: 720,
    category: '69cd911d35ae45109663970f',
    image: 'https://images.unsplash.com/photo-1567581935884-3349723552ca'
  },
  {
    name: 'Sony Xperia 5',
    description: 'Built for creators and audiophiles, the Xperia 5 features a 4K HDR OLED CinemaWide display and ZEISS-branded cameras with Cinema Pro controls. A 3.5mm jack, Hi-Res Audio, and Dolby Atmos support deliver an audio experience that dedicated music lovers will absolutely treasure.',
    qty: 15,
    price: 880,
    category: '69cd911d35ae45109663970f',
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd'
  },
];


// ✅ إضافة المنتجات (مرة واحدة بس)
router.post('/', async (req, res) => {
  try {
    const products = await Product.insertMany(sendproducts);
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});


// ✅ جلب كل المنتجات (ده المهم)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({
       message: error.message
       });
  }
});


// ✅ جلب منتجات حسب category
router.get('/category/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).send({ message: "Invalid ID" });
    }

    const products = await Product.find({ category: id });
    res.status(200).send(products);

  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
// ✅ جلب منتج واحد بالـ ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).send({ message: "Product not found" })
    res.status(200).send(product)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
})

module.exports = router;