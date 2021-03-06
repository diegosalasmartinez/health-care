import React from 'react'
import { useLocation } from 'react-router-dom'

import { routesAdmin, routesDoctor, routesSecretary } from '../routes'
import { userTypes } from '../utils/userUtils'

import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react'
import { useSelector } from 'react-redux'

const AppBreadcrumb = () => {
  const currentLocation = useLocation().pathname
  const user = useSelector((state) => state.auth.user);
  const userRole = user.role; 
  const routes = userRole === "ADMIN" ? routesAdmin : userRole === "DOCTOR" ? routesDoctor : userRole === "SECRETARY" ? routesSecretary : [];

  const getRouteName = (pathname, routes) => {
    const currentRoute = routes.find((route) => route.path === pathname)
    return currentRoute ? currentRoute.name : ""
  }

  const getBreadcrumbs = (location) => {
    const breadcrumbs = []
    location.split('/').reduce((prev, curr, index, array) => {
      const currentPathname = `${prev}/${curr}`
      breadcrumbs.push({
        pathname: currentPathname,
        name: getRouteName(currentPathname, routes),
        active: index + 1 === array.length ? true : false,
      })
      return currentPathname
    })
    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs(currentLocation)
  const actualPage = breadcrumbs[breadcrumbs.length > 0 ? breadcrumbs.length-1 : 0];
  
  return (
    <CBreadcrumb className="m-0 ms-2">
      <CBreadcrumbItem>{actualPage.name}</CBreadcrumbItem>
      <div>{userTypes[user.role]}: {user.name} {user.lastName}</div>
    </CBreadcrumb>
  )
}

export default React.memo(AppBreadcrumb)
