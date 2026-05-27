type Product = {
  id: number
  name: string
  price: number
  category?: string
  categoryLabel?: string
  image?: string
}

let products: Product[] = [
  {
    id: 1,
    name: 'Daisy Hair Clip',
    price: 12.9,
    category: 'hair-clips',
    categoryLabel: 'Hair Clips',
    image: 'https://i.etsystatic.com/33325447/r/il/eecae2/5773055242/il_794xN.5773055242_goj1.jpg',
  },
  {
    id: 2,
    name: 'Rose Petal Clip',
    price: 12.9,
    category: 'hair-clips',
    categoryLabel: 'Hair Clips',
    image: 'https://i.etsystatic.com/20736769/r/il/c1f360/6332436708/il_1588xN.6332436708_jnmh.jpg',
  },
  {
    id: 3,
    name: 'Blossom Scrunchie',
    price: 14.9,
    category: 'scrunchies',
    categoryLabel: 'Scrunchies',
    image: 'https://images.asos-media.com/products/asos-design-handmade-crochet-scrunchie-in-pink/208701866-1-pinkmulti?$n_960w$&wid=952&fit=constrain',
  },
  {
    id: 4,
    name: 'Mini Puff Scrunchie',
    price: 10,
    category: 'scrunchies',
    categoryLabel: 'Scrunchies',
    image: 'https://images.unsplash.com/photo-1671272980311-9055ae800653?w=800&q=82',
  },
  {
    id: 5,
    name: 'Sweet Duo Gift Set',
    price: 28,
    category: 'gift-sets',
    categoryLabel: 'Gift Sets',
    image: 'https://images.unsplash.com/photo-1778686568681-699398da3b65?w=800&q=82',
  },
  {
    id: 6,
    name: 'Full Collection Set',
    price: 52,
    category: 'gift-sets',
    categoryLabel: 'Gift Sets',
    image: 'https://images.unsplash.com/photo-1646182504831-57f41a74318f?w=800&q=82',
  },
  {
    id: 7,
    name: 'Strawberry Hair Clip',
    price: 12.9,
    category: 'hair-clips',
    categoryLabel: 'Hair Clips',
    image: 'https://i.etsystatic.com/50282581/r/il/8290b5/6626150484/il_794xN.6626150484_jr8w.jpg',
  },
  {
    id: 8,
    name: 'Lilac Hair Clip',
    price: 12.9,
    category: 'hair-clips',
    categoryLabel: 'Hair Clips',
    image: 'https://i.etsystatic.com/64244265/r/il/b9e34c/7645040640/il_1588xN.7645040640_m2d8.jpg',
  },
]

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  })

const notFound = () =>
  json({
    code: 404,
    message: 'Not Found',
  }, 404)

export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const path = searchParams.get('path') || ''

  if (path === 'login') {
    return json({
      code: 0,
      data: {
        token: 'real-token',
        role: 'admin',
      },
    })
  }

  if (path === 'products') {
    return json({
      code: 0,
      data: products,
    })
  }

  return notFound()
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url)
  const path = searchParams.get('path') || ''
  const body = (await request.json().catch(() => ({}))) as Partial<Product> & {
    id?: number
  }

  if (path === 'products-add') {
    const nextProduct: Product = {
      id: Date.now(),
      name: String(body.name || ''),
      price: Number(body.price || 0),
      category: body.category,
      categoryLabel: body.categoryLabel || 'Custom Product',
      image: body.image,
    }

    products = [nextProduct, ...products]

    return json({
      code: 0,
      data: nextProduct,
    })
  }

  if (path === 'products-update') {
    const updatedProduct: Product = {
      id: Number(body.id),
      name: String(body.name || ''),
      price: Number(body.price || 0),
      category: body.category,
      categoryLabel: body.categoryLabel,
      image: body.image,
    }

    products = products.map((item) =>
      item.id === updatedProduct.id ? updatedProduct : item
    )

    return json({
      code: 0,
      data: updatedProduct,
    })
  }

  if (path === 'products-delete') {
    const id = Number(body.id)
    products = products.filter((item) => item.id !== id)

    return json({
      code: 0,
      data: { id },
    })
  }

  return notFound()
}
