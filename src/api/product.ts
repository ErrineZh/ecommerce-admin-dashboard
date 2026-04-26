import request from '../utils/request'

export type Product = {
  id: number
  name: string
  price: number
}

export const getProductList = async (params: {
  page: number
  pageSize: number
  keyword?: string
}) => {
  const list = (await request.get('/?path=products')) as Product[]

  let filteredList = [...list]

  if (params.keyword?.trim()) {
    const searchText = params.keyword.toLowerCase()
    filteredList = filteredList.filter((item) =>
      item.name.toLowerCase().includes(searchText)
    )
  }

  const total = filteredList.length
  const start = (params.page - 1) * params.pageSize
  const end = start + params.pageSize

  return {
    list: filteredList.slice(start, end),
    total,
  }
}

export const addProduct = (data: { name: string; price: number | string }) => {
  return request.post('/?path=products-add', data) as Promise<Product>
}

export const updateProduct = (data: Product) => {
  return request.post('/?path=products-update', data) as Promise<Product>
}

export const deleteProduct = (id: number) => {
  return request.post('/?path=products-delete', { id }) as Promise<{ id: number }>
}
