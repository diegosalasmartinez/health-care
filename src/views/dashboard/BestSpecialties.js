import React, { Component } from 'react';
import {
    CRow,
    CCol,
    CDropdown,
    CDropdownMenu,
    CDropdownItem,
    CDropdownToggle,
    CWidgetStatsA,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilOptions } from '@coreui/icons'

export default class BestSpecialties extends Component {
  render() {
    return (
        <CRow>
            <CCol xs="4">
                <CWidgetStatsA
                    className="mb-4"
                    color="primary"
                    value={
                    <>
                        26K{' '}
                    </>
                    }
                    title="Users"
                />
            </CCol>
        </CRow>
    )
  }
}
