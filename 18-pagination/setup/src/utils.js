const paginate = (followers) => {
  const itemsPerPage = 8;
  const pages = Math.ceil(followers.length / itemsPerPage)
  const newFollowers = Array.from({ length: pages }, (item, index) => {
    const start = index * itemsPerPage
    return followers.slice(start, start + itemsPerPage)
  })

  return newFollowers
}

export default paginate
