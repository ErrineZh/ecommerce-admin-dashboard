type Product = {
  id: number
  name: string
  price: number
}

let products: Product[] = [
  { id: 1, name: 'iPhone', price: 999 },
  { id: 2, name: 'MacBook', price: 1999 },
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
