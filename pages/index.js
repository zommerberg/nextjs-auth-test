import { useState } from 'react'
import axios from 'axios'
import cookie from 'cookie'
import styles from '../styles/Home.module.css'

export default function Home(props) {
  console.log(props.loggedIn)
  const [loggedIn, setLoggedIn] = useState(props.loggedIn)
  console.log(loggedIn)
  return (
    <div className={styles.container}>
      <div>{loggedIn ? 'User is logged in' : 'User is not logged in'}</div>
      <div>Click the log in button, this should generate a cookie.</div>
      <button
        onClick={async () => {
          await axios.post('/api/login')
          setLoggedIn(true)
        }}
      >
        Login
      </button>
      <div>
        Reload the page and you should be logged in. But the server does not
        know that so it will tell you that there is no cookie availible.
      </div>
      <div>
        We are not able to access the cookie from the server,now try to access
        it from the client.
      </div>
      <button
        onClick={async () => {
          await axios.post('/api/secret')
        }}
      >
        Access protected endpoint from the client
      </button>
      <div>Check your cookie in the terminal.</div>
    </div>
  )
}

export async function getServerSideProps(context) {
  //if the user is authenticated, this will navigate the user to / page.
  console.log(context.req.cookies)
  const cookieParsed = cookie.parse(context.req.cookies || '')
  console.log(cookieParsed)
  return {
    props: { loggedIn: !!cookieParsed.accessToken }, // will be passed to the page component as props
  }
}
