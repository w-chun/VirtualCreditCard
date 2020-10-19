import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../pages/index.scss'

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Virtual Credit Card</title>
        <meta name="description" content="Virtual Credit Card" />
      </Helmet>
      <div className="main">{children}</div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
