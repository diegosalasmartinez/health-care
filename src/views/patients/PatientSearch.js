import React, { Component } from 'react'
import { 
    CModal, 
    CModalBody, 
    CModalHeader, 
    CModalTitle, 
    CRow,
    CSpinner
} from '@coreui/react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as patientActions from '../../services/redux/actions/patientActions'
import PatientTable from './PatientTable'
import pagination from '../../services/models/others/pagination'
import colorTypes from '../../services/models/others/colorTypes'

export class PatientSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchParams: {
                code: '',
                dni: '',
                name: ''
            },
            pagination: new pagination(0,10),
            pageSelected: 1,
            patients: [],
            patientsLength: [],
            visible: false,
            loaded: false,
            failed: false,
            error: "",
        }
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.visible !== this.props.visible) {
            if (this.props.visible) {
                await this.loadList();
            }
            this.setState({visible: this.props.visible})
        }
    }

    loadList = async () => {
        this.setState({loaded: false, failed: false});
        await this.props.getPatients(this.state.pagination, this.state.searchParams);
        const { patient } = this.props;
        this.setState({
            patients: [...patient.patients],
            patientsLength: patient.length,
            loaded: patient.loaded,
            failed: patient.failed,
            error: patient.error,
        })
    }

    onClickPage = (indexPage) => {
        const { pagination } = this.state;
        let paginationUpdated = {...pagination};
        paginationUpdated.offset = paginationUpdated.limit * (indexPage - 1);
        this.setState({ pagination: paginationUpdated, pageSelected: indexPage }, async function(){
            await this.loadList();
        })
    }

    onChangeParams = (key) => (e = {}) => {
        const { searchParams } = this.state;
        let val = e.target.value;
        let searchParamsUpdated = { ...searchParams };
        searchParamsUpdated[key] = val;
        this.setState({searchParams: searchParamsUpdated});
    }

    onClose = () => {
        this.setState({visible: false});
        this.props.onClose();
    }

    onAccept = () => {
        this.props.onAccept(this.props.object);
    }

    onSelect = (p) => {
        this.props.onSelectPatient(p);
        this.props.onClose();
    }

    render() {
        const { visible, patients, patientsLength, pageSelected, pagination, searchParams, loaded, failed, error } = this.state;
        
        return (
            <CModal visible={visible} onClose={this.onClose} backdrop="static" size='xl'>
                <CModalHeader>
                    <CModalTitle>Search doctor</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    { loaded && !failed &&
                        <PatientTable
                            selectMode={true}
                            patients={patients}
                            patientsLength={patientsLength}
                            pageSelected={pageSelected}
                            pagination={pagination}
                            searchParams={searchParams}
                            onClickPage={this.onClickPage}
                            onChangeParams={this.onChangeParams}
                            onSelect={this.onSelect}
                            onSearch={this.loadList}
                        />
                    }
                    { !loaded &&
                        <CRow className="center">
                            <CSpinner color={colorTypes.PRIMARY}/>
                        </CRow>
                    }
                </CModalBody>
            </CModal>
        )
    }
}

const mapStateToProps = state => {
    return {
        patient: state.patient,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators(patientActions, dispatch)
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(PatientSearch)