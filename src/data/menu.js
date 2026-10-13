/**
 * Cafe Exchange (Dandenong South) menu.
 * Sourced from the cafe's official online ordering menu (ZiiCloud store 4550).
 * Cafe Exchange is not currently listed on Uber Eats or DoorDash.
 * Prices in AUD. Images are site assets (not from the ordering platform).
 */
export const SAMPLE_MODE = false;

export const categories = [
  {
    id: "all-day",
    label: "ALL DAY",
    shortLabel: "ALL DAY",
    tileTitle: "ALL DAY",
    description: "Breakfast classics, burgers and hearty plates — available all day.",
    image: "/images/menu/breakfast-01.jpg",
    previewImage: "/images/menu/avocado.jpg"
  },
  {
    id: "salads",
    label: "SALADS",
    shortLabel: "SALADS",
    tileTitle: "SALADS",
    description: "Fresh bowls and chilled pasta salads.",
    image: "/images/menu/avocado.jpg",
    previewImage: "/images/menu/avocado.jpg"
  },
  {
    id: "asian",
    label: "ASIAN",
    shortLabel: "ASIAN",
    tileTitle: "ASIAN",
    description: "Banh mi, rice bowls, noodles and fried rice favourites.",
    image: "/images/menu/lunch-01.jpg",
    previewImage: "/images/menu/lunch-01.jpg"
  },
  {
    id: "combos",
    label: "COMBO DEALS",
    shortLabel: "COMBOS",
    tileTitle: "COMBOS",
    description: "Breakfast combos for a quick start.",
    image: "/images/menu/breakfast-01.jpg",
    previewImage: "/images/menu/breakfast-01.jpg"
  },
  {
    id: "grab-n-go",
    label: "GRAB N GO",
    shortLabel: "GRAB N GO",
    tileTitle: "GRAB N GO",
    description: "Ready sandwiches, wraps and croissants.",
    image: "/images/menu/sandwich.jpg",
    previewImage: "/images/menu/sandwich.jpg"
  },
  {
    id: "lite-bites",
    label: "LITE BITES",
    shortLabel: "LITE BITES",
    tileTitle: "LITE BITES",
    description: "Pastries, sweets and lighter cabinet treats.",
    image: "/images/menu/croissant.jpg",
    previewImage: "/images/menu/pastry.jpg"
  },
  {
    id: "snacks",
    label: "SNACKS",
    shortLabel: "SNACKS",
    tileTitle: "SNACKS",
    description: "Quiches, dim sims, chips and sides.",
    image: "/images/menu/bakery-01.jpg",
    previewImage: "/images/menu/bakery-01.jpg"
  },
  {
    id: "sandwich-bar",
    label: "SANDWICH BAR",
    shortLabel: "SANDWICHES",
    tileTitle: "SANDWICHES",
    description: "Made-to-order rolls and wraps.",
    image: "/images/menu/sandwich.jpg",
    previewImage: "/images/menu/sandwich.jpg"
  },
  {
    id: "hot-drinks",
    label: "HOT DRINKS",
    shortLabel: "COFFEE",
    tileTitle: "COFFEE",
    description: "Espresso coffee, chai, matcha and hot chocolate.",
    image: "/images/menu/coffee-01.jpg",
    previewImage: "/images/coffee/latte-art.jpg"
  },
  {
    id: "cold-drinks",
    label: "COLD DRINKS",
    shortLabel: "COLD",
    tileTitle: "COLD DRINKS",
    description: "Iced drinks, shakes, smoothies and fresh juice.",
    image: "/images/coffee/latte-art.jpg",
    previewImage: "/images/menu/coffee-01.jpg"
  }
];

/** Four tiles for the What We Serve mosaic */
export const featuredCategories = [
  {
    id: "hot-drinks",
    label: "HOT DRINKS",
    shortLabel: "COFFEE",
    tileTitle: "COFFEE",
    description: "Espresso coffee, chai, matcha and hot chocolate.",
    image: "/images/menu/coffee-01.jpg",
    previewImage: "/images/coffee/latte-art.jpg"
  },
  {
    id: "all-day",
    label: "ALL DAY",
    shortLabel: "ALL DAY",
    tileTitle: "ALL DAY",
    description: "Breakfast classics, burgers and hearty plates — available all day.",
    image: "/images/menu/breakfast-01.jpg",
    previewImage: "/images/menu/avocado.jpg"
  },
  {
    id: "asian",
    label: "ASIAN",
    shortLabel: "ASIAN",
    tileTitle: "ASIAN",
    description: "Banh mi, rice bowls, noodles and fried rice favourites.",
    image: "/images/menu/lunch-01.jpg",
    previewImage: "/images/menu/lunch-01.jpg"
  },
  {
    id: "lite-bites",
    label: "LITE BITES",
    shortLabel: "LITE BITES",
    tileTitle: "LITE BITES",
    description: "Pastries, sweets and lighter cabinet treats.",
    image: "/images/menu/croissant.jpg",
    previewImage: "/images/menu/pastry.jpg"
  }
];

export const items = {
  "all-day": [
    {
      id: "all-day-AD01",
      name: "Eggs Your Way",
      description: "",
      image: "/images/menu/breakfast-01.jpg",
      price: 11
    },
    {
      id: "all-day-AD02",
      name: "Chilli Prawn Scrambled Egg Croissant",
      description: "",
      image: "/images/menu/avocado.jpg",
      price: 19.5
    },
    {
      id: "all-day-AD03",
      name: "Avo Delight (V)",
      description: "",
      image: "/images/gallery/g07.jpg",
      price: 17
    },
    {
      id: "all-day-AD04",
      name: "House Special Omlette",
      description: "",
      image: "/images/menu/lunch-01.jpg",
      price: 17
    },
    {
      id: "all-day-AD05",
      name: "The Benedict",
      description: "",
      image: "/images/menu/sandwich.jpg",
      price: 19
    },
    {
      id: "all-day-AD06",
      name: "The Big Breakfast",
      description: "",
      image: "/images/menu/breakfast-01.jpg",
      price: 25
    },
    {
      id: "all-day-AD07",
      name: "Aussie Brekky",
      description: "",
      image: "/images/menu/avocado.jpg",
      price: 22
    },
    {
      id: "all-day-AD08",
      name: "Chimichurri Steak Roll",
      description: "",
      image: "/images/gallery/g07.jpg",
      price: 22
    },
    {
      id: "all-day-AD09",
      name: "Breakfast Burger",
      description: "",
      image: "/images/menu/lunch-01.jpg",
      price: 22
    },
    {
      id: "all-day-AD10",
      name: "Classic Beef Burger",
      description: "",
      image: "/images/menu/sandwich.jpg",
      price: 19
    },
    {
      id: "all-day-AD11",
      name: "Chicken Schnitzel Burger",
      description: "",
      image: "/images/menu/breakfast-01.jpg",
      price: 17
    },
    {
      id: "all-day-AD12",
      name: "Spicy Chicken Burger",
      description: "",
      image: "/images/menu/avocado.jpg",
      price: 19
    },
    {
      id: "all-day-AD13",
      name: "House Special Beef Burger",
      description: "",
      image: "/images/gallery/g07.jpg",
      price: 25
    },
    {
      id: "all-day-AD14",
      name: "Roast Pork Meal",
      description: "",
      image: "/images/menu/lunch-01.jpg",
      price: 17
    },
    {
      id: "all-day-AD15",
      name: "Chicken Parma",
      description: "",
      image: "/images/menu/sandwich.jpg",
      price: 18
    },
    {
      id: "all-day-AD16",
      name: "Chicken Schnitzel And Chips",
      description: "",
      image: "/images/menu/breakfast-01.jpg",
      price: 12
    },
    {
      id: "all-day-AD17",
      name: "Flathead Tail",
      description: "",
      image: "/images/menu/avocado.jpg",
      price: 17
    }
  ],
  salads: [
    {
      id: "salads-CM170",
      name: "Superfood Salad (V) (GF)",
      description: "",
      image: "/images/menu/avocado.jpg",
      price: 16.5
    },
    {
      id: "salads-CM171",
      name: "Chicken Caesar Salad",
      description: "",
      image: "/images/gallery/g02.jpg",
      price: 15.5
    },
    {
      id: "salads-CM172",
      name: "Avocado Greek Salad (V) (GF)",
      description: "",
      image: "/images/menu/lunch-01.jpg",
      price: 15.5
    },
    {
      id: "salads-CM173",
      name: "Cold Chicken Pesto Pasta",
      description: "",
      image: "/images/menu/avocado.jpg",
      price: 15.5
    }
  ],
  asian: [
    {
      id: "asian-CM174",
      name: "Banh Mi Roll",
      description: "",
      image: "/images/menu/lunch-01.jpg",
      price: 12.5
    },
    {
      id: "asian-CM175",
      name: "Vermicelli Noodle Bowl (GF)",
      description: "",
      image: "/images/gallery/g07.jpg",
      price: 18
    },
    {
      id: "asian-CM176",
      name: "Rice Bowl (GF)",
      description: "",
      image: "/images/menu/sandwich.jpg",
      price: 18
    },
    {
      id: "asian-CM177",
      name: "Banh Mi Salad Bowl (GF)",
      description: "",
      image: "/images/menu/lunch-01.jpg",
      price: 18
    },
    {
      id: "asian-CM178",
      name: "Cambodian Rice Drop Noodle",
      description: "",
      image: "/images/gallery/g07.jpg",
      price: 18
    },
    {
      id: "asian-CM179",
      name: "Char Kway Teow",
      description: "",
      image: "/images/menu/sandwich.jpg",
      price: 18
    },
    {
      id: "asian-CM180",
      name: "Hokkien Noodle",
      description: "",
      image: "/images/menu/lunch-01.jpg",
      price: 18
    },
    {
      id: "asian-CM181",
      name: "Special Fried Rice (V)",
      description: "",
      image: "/images/gallery/g07.jpg",
      price: 13
    },
    {
      id: "asian-CM182",
      name: "XO Prawn Fried Rice",
      description: "",
      image: "/images/menu/sandwich.jpg",
      price: 18
    },
    {
      id: "asian-CM183",
      name: "Nasi Goreng Fried Rice",
      description: "",
      image: "/images/menu/lunch-01.jpg",
      price: 17
    },
    {
      id: "asian-CM184",
      name: "Stir-fry With Rice",
      description: "",
      image: "/images/gallery/g07.jpg",
      price: 18
    }
  ],
  combos: [
    {
      id: "combos-CM333",
      name: "Egg&Bacon Combo",
      description: "",
      image: "/images/menu/breakfast-01.jpg",
      price: 15
    },
    {
      id: "combos-CM231",
      name: "BREAKY WRAP (hash brown) COMBO",
      description: "",
      image: "/images/menu/sandwich.jpg",
      price: 17
    },
    {
      id: "combos-CM186",
      name: "BREAKY WRAP (Sausage) COMBO",
      description: "",
      image: "/images/menu/breakfast-01.jpg",
      price: 17
    }
  ],
  "grab-n-go": [
    {
      id: "grab-n-go-CM337",
      name: "Chicken Avo S/W",
      description: "",
      image: "/images/menu/sandwich.jpg",
      price: 11
    },
    {
      id: "grab-n-go-CM338",
      name: "Mashed Egg Lettuce S/W",
      description: "",
      image: "/images/menu/croissant.jpg",
      price: 11
    },
    {
      id: "grab-n-go-CM339",
      name: "H/C/T S/W",
      description: "",
      image: "/images/menu/avocado.jpg",
      price: 11
    },
    {
      id: "grab-n-go-CM340",
      name: "Ham Salad S/W",
      description: "",
      image: "/images/menu/sandwich.jpg",
      price: 11
    },
    {
      id: "grab-n-go-CM341",
      name: "Cheese Salad S/W",
      description: "",
      image: "/images/menu/croissant.jpg",
      price: 10
    },
    {
      id: "grab-n-go-CM342",
      name: "Delight Wrap",
      description: "",
      image: "/images/menu/avocado.jpg",
      price: 12.9
    },
    {
      id: "grab-n-go-CM343",
      name: "Club Wrap",
      description: "",
      image: "/images/menu/sandwich.jpg",
      price: 12.9
    },
    {
      id: "grab-n-go-CM346",
      name: "Ham Cheese Croissant",
      description: "",
      image: "/images/menu/croissant.jpg",
      price: 11
    }
  ],
  "lite-bites": [
    {
      id: "lite-bites-CM187",
      name: "Banana Bread",
      description: "",
      image: "/images/menu/croissant.jpg",
      price: 6
    },
    {
      id: "lite-bites-CM345",
      name: "Tiramisu",
      description: "",
      image: "/images/menu/pastry.jpg",
      price: 7.5
    },
    {
      id: "lite-bites-CM188",
      name: "Toast",
      description: "",
      image: "/images/menu/bakery-01.jpg",
      price: 6
    },
    {
      id: "lite-bites-CM189",
      name: "Creamy Tuna Salad",
      description: "",
      image: "/images/menu/croissant.jpg",
      price: 7.5
    },
    {
      id: "lite-bites-CM190",
      name: "Fruit Cup",
      description: "",
      image: "/images/menu/pastry.jpg",
      price: 6.5
    },
    {
      id: "lite-bites-CM191",
      name: "Berry Yoghurt Cup",
      description: "",
      image: "/images/menu/bakery-01.jpg",
      price: 6.5
    },
    {
      id: "lite-bites-CM192",
      name: "Mango Matcha Coconut Chia Pudding",
      description: "",
      image: "/images/menu/croissant.jpg",
      price: 7.5
    },
    {
      id: "lite-bites-CM193",
      name: "Pastry",
      description: "",
      image: "/images/menu/pastry.jpg",
      price: 7.5
    },
    {
      id: "lite-bites-CM194",
      name: "Muffin",
      description: "",
      image: "/images/menu/bakery-01.jpg",
      price: 6
    },
    {
      id: "lite-bites-CM195",
      name: "Slices",
      description: "",
      image: "/images/menu/croissant.jpg",
      price: 6
    },
    {
      id: "lite-bites-CM196",
      name: "Cookies",
      description: "",
      image: "/images/menu/pastry.jpg",
      price: 4
    }
  ],
  snacks: [
    {
      id: "snacks-CM197",
      name: "Ham Quiche",
      description: "",
      image: "/images/menu/bakery-01.jpg",
      price: 6.5
    },
    {
      id: "snacks-CM198",
      name: "Pumpkin Quiche",
      description: "",
      image: "/images/menu/pastry.jpg",
      price: 6.5
    },
    {
      id: "snacks-CM199",
      name: "Dim Sim",
      description: "",
      image: "/images/gallery/g02.jpg",
      price: 1.7
    },
    {
      id: "snacks-CM204",
      name: "South-mel Dim Sim",
      description: "",
      image: "/images/menu/bakery-01.jpg",
      price: 3
    },
    {
      id: "snacks-CM200",
      name: "Potato Cake",
      description: "",
      image: "/images/menu/pastry.jpg",
      price: 1.7
    },
    {
      id: "snacks-CM201",
      name: "Spring Roll",
      description: "",
      image: "/images/gallery/g02.jpg",
      price: 1.2
    },
    {
      id: "snacks-CM202",
      name: "Tender Strips",
      description: "",
      image: "/images/menu/bakery-01.jpg",
      price: 3
    },
    {
      id: "snacks-CM203",
      name: "Chicken Wing",
      description: "",
      image: "/images/menu/pastry.jpg",
      price: 3
    },
    {
      id: "snacks-CM205",
      name: "Small Chip",
      description: "",
      image: "/images/gallery/g02.jpg",
      price: 5.5
    },
    {
      id: "snacks-CM206",
      name: "Small Wedges",
      description: "",
      image: "/images/menu/bakery-01.jpg",
      price: 6.5
    },
    {
      id: "snacks-CM207",
      name: "Large Chips",
      description: "",
      image: "/images/menu/pastry.jpg",
      price: 10
    },
    {
      id: "snacks-CM208",
      name: "Large Wedges",
      description: "",
      image: "/images/gallery/g02.jpg",
      price: 12
    }
  ],
  "sandwich-bar": [
    {
      id: "sandwich-bar-CM209",
      name: "Chicken Avo Roll",
      description: "",
      image: "/images/menu/sandwich.jpg",
      price: 12.9
    },
    {
      id: "sandwich-bar-CM210",
      name: "Chicken Schnitzel Roll",
      description: "",
      image: "/images/menu/lunch-01.jpg",
      price: 12.9
    },
    {
      id: "sandwich-bar-CM211",
      name: "The Benny Roll",
      description: "",
      image: "/images/menu/avocado.jpg",
      price: 12.9
    },
    {
      id: "sandwich-bar-CM212",
      name: "Chicken Pesto Roll",
      description: "",
      image: "/images/menu/sandwich.jpg",
      price: 12.9
    },
    {
      id: "sandwich-bar-CM213",
      name: "Mediterranean Roll (V)",
      description: "",
      image: "/images/menu/lunch-01.jpg",
      price: 12.9
    },
    {
      id: "sandwich-bar-CM214",
      name: "Chicken Delight Wrap",
      description: "",
      image: "/images/menu/avocado.jpg",
      price: 12.9
    },
    {
      id: "sandwich-bar-CM215",
      name: "Club Wrap",
      description: "",
      image: "/images/menu/sandwich.jpg",
      price: 12.9
    },
    {
      id: "sandwich-bar-CM216",
      name: "Sweet Chilli Tender Strips",
      description: "",
      image: "/images/menu/lunch-01.jpg",
      price: 12.9
    },
    {
      id: "sandwich-bar-CM217",
      name: "Chicken Schnitzel Wrap",
      description: "",
      image: "/images/menu/avocado.jpg",
      price: 12.9
    },
    {
      id: "sandwich-bar-CM218",
      name: "Mashed Egg Lettuce S/W",
      description: "",
      image: "/images/menu/sandwich.jpg",
      price: 11
    },
    {
      id: "sandwich-bar-CM219",
      name: "Roast Pork Gravy Roll",
      description: "",
      image: "/images/menu/lunch-01.jpg",
      price: 11
    }
  ],
  "hot-drinks": [
    {
      id: "hot-drinks-CM306",
      name: "Espresso",
      description: "",
      image: "/images/coffee/espresso.jpg",
      price: 4
    },
    {
      id: "hot-drinks-CM307",
      name: "Short Macchiato",
      description: "",
      image: "/images/coffee/latte-art.jpg",
      price: 4.5
    },
    {
      id: "hot-drinks-CF11",
      name: "Long Macchiato",
      description: "",
      image: "/images/menu/flatwhite.jpg",
      price: 5
    },
    {
      id: "hot-drinks-CM309",
      name: "Piccolo",
      description: "",
      image: "/images/menu/coffee-01.jpg",
      price: 4.8
    },
    {
      id: "hot-drinks-CM310",
      name: "Magic",
      description: "",
      image: "/images/coffee/espresso.jpg",
      price: 5.5
    },
    {
      id: "hot-drinks-CM311",
      name: "Affogato",
      description: "",
      image: "/images/coffee/latte-art.jpg",
      price: 6
    },
    {
      id: "hot-drinks-CM312",
      name: "Babycino",
      description: "",
      image: "/images/menu/flatwhite.jpg",
      price: 2
    },
    {
      id: "hot-drinks-CM313",
      name: "Cappuccino",
      description: "",
      image: "/images/menu/coffee-01.jpg",
      price: 4.8
    },
    {
      id: "hot-drinks-CM314",
      name: "Latte",
      description: "",
      image: "/images/coffee/espresso.jpg",
      price: 4.8
    },
    {
      id: "hot-drinks-CM315",
      name: "Flat White",
      description: "",
      image: "/images/coffee/latte-art.jpg",
      price: 4.8
    },
    {
      id: "hot-drinks-CM316",
      name: "Long Black",
      description: "",
      image: "/images/menu/flatwhite.jpg",
      price: 4.8
    },
    {
      id: "hot-drinks-CM317",
      name: "Mocha",
      description: "",
      image: "/images/menu/coffee-01.jpg",
      price: 5.5
    },
    {
      id: "hot-drinks-CM318",
      name: "White Mocha",
      description: "",
      image: "/images/coffee/espresso.jpg",
      price: 5.5
    },
    {
      id: "hot-drinks-CM319",
      name: "Hot Chocolate",
      description: "",
      image: "/images/coffee/latte-art.jpg",
      price: 4.8
    },
    {
      id: "hot-drinks-CM320",
      name: "White Hot Chocolate",
      description: "",
      image: "/images/menu/flatwhite.jpg",
      price: 4.8
    },
    {
      id: "hot-drinks-CM321",
      name: "Chai Latte",
      description: "",
      image: "/images/menu/coffee-01.jpg",
      price: 4.8
    },
    {
      id: "hot-drinks-CM322",
      name: "Dirty Chai Latte",
      description: "",
      image: "/images/coffee/espresso.jpg",
      price: 5.5
    },
    {
      id: "hot-drinks-CM323",
      name: "Wet Leaf Chai",
      description: "",
      image: "/images/coffee/latte-art.jpg",
      price: 5.5
    },
    {
      id: "hot-drinks-CM324",
      name: "Matcha Latte",
      description: "",
      image: "/images/menu/flatwhite.jpg",
      price: 5.8
    },
    {
      id: "hot-drinks-CM325",
      name: "Tea",
      description: "",
      image: "/images/menu/coffee-01.jpg",
      price: 4.8
    }
  ],
  "cold-drinks": [
    {
      id: "cold-drinks-CM327",
      name: "Milk/thick Shake",
      description: "",
      image: "/images/menu/coffee-01.jpg",
      price: 6.5
    },
    {
      id: "cold-drinks-CM328",
      name: "Smoothies",
      description: "",
      image: "/images/coffee/latte-art.jpg",
      price: 9.5
    },
    {
      id: "cold-drinks-CM329",
      name: "Frappucino",
      description: "Ice, frappe creamer, milk, condensed milk.",
      image: "/images/gallery/g02.jpg",
      price: 9
    },
    {
      id: "cold-drinks-CM330",
      name: "Fresh Juice",
      description: "",
      image: "/images/menu/coffee-01.jpg",
      price: 9
    },
    {
      id: "cold-drinks-CM331",
      name: "Italian Soda",
      description: "Soda water, lemon juice, ice.",
      image: "/images/coffee/latte-art.jpg",
      price: 7
    }
  ]
};

export const favourites = [
  {
    id: "f1",
    name: "Flat White",
    description: "Flat White",
    image: "/images/coffee/latte-art.jpg",
    price: 4.8
  },
  {
    id: "f2",
    name: "Banh Mi Roll",
    description: "Banh Mi Roll",
    image: "/images/menu/lunch-01.jpg",
    price: 12.5
  },
  {
    id: "f3",
    name: "The Big Breakfast",
    description: "The Big Breakfast",
    image: "/images/menu/breakfast-01.jpg",
    price: 25
  },
  {
    id: "f4",
    name: "Latte",
    description: "Latte",
    image: "/images/coffee/espresso.jpg",
    price: 4.8
  },
  {
    id: "f5",
    name: "Rice Bowl (GF)",
    description: "Rice Bowl (GF)",
    image: "/images/menu/sandwich.jpg",
    price: 18
  },
  {
    id: "f6",
    name: "Ham Cheese Croissant",
    description: "Ham Cheese Croissant",
    image: "/images/menu/croissant.jpg",
    price: 11
  },
  {
    id: "f7",
    name: "Avo Delight (V)",
    description: "Avo Delight (V)",
    image: "/images/gallery/g07.jpg",
    price: 17
  },
  {
    id: "f8",
    name: "Tiramisu",
    description: "Tiramisu",
    image: "/images/menu/pastry.jpg",
    price: 7.5
  }
];

export function formatPrice(price) {
  if (price == null || Number.isNaN(Number(price))) return null;
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  }).format(price);
}

export function getCategory(id) {
  return categories.find((c) => c.id === id) ?? categories[0];
}

export function getItems(categoryId) {
  return items[categoryId] ?? [];
}
