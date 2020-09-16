// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { setCookie } from 'nookies'

export default (req, res) => {
  console.log('loggin clicked, generating cookie')
  setCookie({ res }, 'accessToken', 'superSecretTokenWow!', {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  })
  console.log('cookie set!')
  res.status(200).end()
}
