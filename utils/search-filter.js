export function stringify(filter) {
  let text = "Produk "
  filter.brands.forEach((value, index) => {
    text += BRAND[value]
    if (index < filter.brands.length - 1) {
      text += ", "
    }
  })

  if (filter.brands.length !== 0) {
    text += " - "
  }
  filter.categories.forEach((value, index) => {
    text += CATEGORY[value]
    if (index < filter.categories.length - 1) {
      text += ", "
    }
  })

  if (filter.categories.length !== 0) {
    text += " - "
  }
  text += SORT_BY[filter.sortBy]
  return text
}

export const BRAND = {
  'fluffy': 'Fluffy Baby Wear',
  'little-palmerhaus': 'Little Palmerhaus',
  'kacakids': 'Kaca Kids'
};

export const CATEGORY = {
  'setelan': 'Setelan',
  'sleepsuit': 'Sleepsuit',
  'jumper': 'Jumper',
};

export const SORT_BY = {
  'popularity': 'Terpopuler',
  '-date': 'Terbaru',
  'date': 'Terlama',
  '-price': 'Termurah',
  'price': 'Termahal',
};
