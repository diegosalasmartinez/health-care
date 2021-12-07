import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div style={{fontSize: '15px'}}>
        Desarrollado por Diego Alejandro Salas Martínez
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
