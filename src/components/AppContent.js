import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CContainer, CSpinner } from '@coreui/react'

import { routesAdmin, routesDoctor, routesSecretary } from '../routes'

const AppContent = () => {
  const userRole = useSelector((state) => state.auth.user.role);
  const routes = userRole === "ADMIN" ? routesAdmin : userRole === "DOCTOR" ? routesDoctor : userRole === "SECRETARY" ? routesSecretary : [];
  const redirect = routes.length > 0 ? routes[1].path : "/login";

  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Switch>
          {routes.map((route, idx) => {
            return (
              route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={(props) => (
                    <>
                      <route.component {...props} />
                    </>
                  )}
                />
              )
            )
          })}
          <Redirect from="/" to={redirect} />
        </Switch>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
