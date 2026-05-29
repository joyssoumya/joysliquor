export const CATEGORIES = [
  { id: 'all', name: 'All', icon: '🍾' },
  { id: 'spirits', name: 'Spirits', icon: '🥃' },
  { id: 'wine', name: 'Wine', icon: '🍷' },
  { id: 'beer', name: 'Beer', icon: '🍺' },
  { id: 'champagne', name: 'Champagne', icon: '🥂' },
  { id: 'mixers', name: 'Mixers', icon: '🧊' },
];

export const PRODUCTS = [
  { id: 1, name: 'Hennessy VS', category: 'spirits', price: 39.99, size: '750ml', image: '🥃', tag: 'Popular' },
  { id: 2, name: 'Casamigos Blanco', category: 'spirits', price: 49.99, size: '750ml', image: '🥃', tag: 'Trending' },
  { id: 3, name: 'Grey Goose Vodka', category: 'spirits', price: 34.99, size: '750ml', image: '🥃', tag: null },
  { id: 4, name: "Jack Daniel's Old No.7", category: 'spirits', price: 27.99, size: '750ml', image: '🥃', tag: null },
  { id: 5, name: 'Don Julio 1942', category: 'spirits', price: 159.99, size: '750ml', image: '🥃', tag: 'Premium' },
  { id: 6, name: 'Patron Silver', category: 'spirits', price: 44.99, size: '750ml', image: '🥃', tag: null },
  { id: 7, name: 'Ciroc Vodka', category: 'spirits', price: 32.99, size: '750ml', image: '🥃', tag: null },
  { id: 8, name: 'Bacardi Superior', category: 'spirits', price: 14.99, size: '750ml', image: '🥃', tag: 'Value' },
  { id: 9, name: 'Moët & Chandon Imperial', category: 'champagne', price: 54.99, size: '750ml', image: '🥂', tag: 'Celebration' },
  { id: 10, name: 'Veuve Clicquot Yellow', category: 'champagne', price: 59.99, size: '750ml', image: '🥂', tag: null },
  { id: 11, name: 'La Marca Prosecco', category: 'champagne', price: 15.99, size: '750ml', image: '🥂', tag: 'Best Value' },
  { id: 12, name: 'Dom Pérignon', category: 'champagne', price: 249.99, size: '750ml', image: '🥂', tag: 'Luxury' },
  { id: 13, name: 'Josh Cellars Cabernet', category: 'wine', price: 14.99, size: '750ml', image: '🍷', tag: 'Staff Pick' },
  { id: 14, name: 'Kendall-Jackson Chardonnay', category: 'wine', price: 13.99, size: '750ml', image: '🍷', tag: null },
  { id: 15, name: '19 Crimes Red Blend', category: 'wine', price: 11.99, size: '750ml', image: '🍷', tag: null },
  { id: 16, name: 'Stella Rosa Black', category: 'wine', price: 12.99, size: '750ml', image: '🍷', tag: 'Sweet' },
  { id: 17, name: 'Apothic Red', category: 'wine', price: 10.99, size: '750ml', image: '🍷', tag: null },
  { id: 18, name: 'Barefoot Moscato', category: 'wine', price: 7.99, size: '750ml', image: '🍷', tag: 'Budget' },
  { id: 19, name: 'Corona Extra 12-Pack', category: 'beer', price: 17.99, size: '12pk', image: '🍺', tag: null },
  { id: 20, name: 'Modelo Especial 12-Pack', category: 'beer', price: 17.99, size: '12pk', image: '🍺', tag: 'Popular' },
  { id: 21, name: 'Blue Moon Belgian White', category: 'beer', price: 10.99, size: '6pk', image: '🍺', tag: null },
  { id: 22, name: 'Heineken 12-Pack', category: 'beer', price: 16.99, size: '12pk', image: '🍺', tag: null },
  { id: 23, name: 'Guinness Draught', category: 'beer', price: 11.99, size: '6pk', image: '🍺', tag: null },
  { id: 24, name: 'White Claw Variety 12-Pack', category: 'beer', price: 18.99, size: '12pk', image: '🍺', tag: 'Seltzer' },
  { id: 25, name: 'Coca-Cola 2L', category: 'mixers', price: 2.49, size: '2L', image: '🧊', tag: null },
  { id: 26, name: 'Fever-Tree Tonic Water', category: 'mixers', price: 6.99, size: '4pk', image: '🧊', tag: 'Premium' },
  { id: 27, name: 'Lime Juice', category: 'mixers', price: 3.99, size: '12oz', image: '🧊', tag: null },
  { id: 28, name: 'Ginger Beer', category: 'mixers', price: 5.99, size: '4pk', image: '🧊', tag: null },
  { id: 29, name: 'Club Soda 1L', category: 'mixers', price: 1.99, size: '1L', image: '🧊', tag: null },
  { id: 30, name: 'Cranberry Juice', category: 'mixers', price: 4.49, size: '32oz', image: '🧊', tag: null },
];

export const STORE_HOURS = [
  { day: 'Monday – Thursday', hours: '9:00 AM – 9:00 PM' },
  { day: 'Friday – Saturday', hours: '9:00 AM – 10:00 PM' },
  { day: 'Sunday', hours: '12:00 PM – 6:00 PM' },
];

export const STORE_INFO = {
  name: "Joy's Liquor",
  address: '65 Broadway',
  city: 'Haverstraw',
  state: 'NY',
  zip: '10927',
  phone: '',  // Add your phone number
  fullAddress: '65 Broadway, Haverstraw, NY 10927',
};
