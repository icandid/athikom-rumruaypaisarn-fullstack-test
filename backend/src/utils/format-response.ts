export function formatSuccess<T>(data: T): {
  status: 'success'
  data: T
} {
  return {
    status: 'success',
    data,
  }
}
