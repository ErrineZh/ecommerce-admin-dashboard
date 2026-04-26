let mockOrders = [
  { id: '001', user: 'John', amount: 120, status: 'Paid' },
  { id: '002', user: 'Alice', amount: 80, status: 'Pending' },
  { id: '003', user: 'Bob', amount: 200, status: 'Shipped' },
  { id: '004', user: 'Tom', amount: 60, status: 'Paid' },
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