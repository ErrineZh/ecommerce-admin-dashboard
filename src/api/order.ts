let mockOrders = [
  { id: '001', user: 'John', product: 'Daisy Hair Clip', amount: 12.9, status: 'Paid' },
  { id: '002', user: 'Alice', product: 'Sweet Duo Gift Set', amount: 28, status: 'Pending' },
  { id: '003', user: 'Bob', product: 'Blossom Scrunchie', amount: 14.9, status: 'Shipped' },
  { id: '004', user: 'Tom', product: 'Full Collection Set', amount: 52, status: 'Paid' },
]

export const getOrderList = (params: {
  status?: string
}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let list = [...mockOrders]

      if (params.status && params.status !== 'All') {
        list = list.filter((o) => o.status === params.status)
      }

      resolve({
        code: 0,
        data: list,
      })
    }, 300)
  })
}
