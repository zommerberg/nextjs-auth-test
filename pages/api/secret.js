import cookie from 'cookie'
export default (req, res) => {
  console.log('trying to get access to a scret route...')
  const cookies = cookie.parse(req.headers.cookie || '')

  console.log(`Your cookie is ${cookies.accessToken}`)

  res.status(200).end()
}
