import React from 'react'

export function ClientLayout(props) {

    const { children } = props

    return (
    <div>
        <h1>Se esta cargando el ClientLayout</h1>

        {children}
    </div>
  )
}
