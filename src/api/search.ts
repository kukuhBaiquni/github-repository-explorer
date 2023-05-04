import API from '.'

export const searchUser = (q: string, page?: number) => API({
  path: '/search/users',
  params: {
    page: page || 1,
    q,
    per_page: 5,
  },
})

export const searchUserRepos = (username: string, page: number) => API({
  path: `/users/${username}/repos`,
  params: {
    page: page || 1,
  },
})
