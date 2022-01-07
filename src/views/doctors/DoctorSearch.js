import React, { Component } from 'react'
import { 
    CButton, 
    CModal, 
    CModalBody, 
    CModalFooter, 
    CModalHeader, 
    CModalTitle 
} from '@coreui/react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as doctorActions from '../../services/redux/actions/doctorActions'
import colorTypes from '../../services/models/others/colorTypes'
import actionTypes from '../../services/models/others/actionTypes'
import DoctorTable from './DoctorTable'
import pagination from '../../services/models/others/pagination'

export class DoctorSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchParams: {
                code: '',
                name: '',
                specialtyId: ''
            },
            pagination: new pagination(0,10),
            pageSelected: 1,
            doctors: [],
            doctorsLength: [],
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
        await this.props.getDoctors(this.state.pagination, this.state.searchParams);
        const { doctor } = this.props;
        this.setState({
            doctors: [...doctor.doctors],
            doctorsLength: doctor.length,
            loaded: doctor.loaded,
            failed: doctor.failed,
            error: doctor.error,
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

    onSelect = (d) => {
        this.props.onSelectDoctor(d);
        this.props.onClose();
    }

    render() {
        const { visible, doctors, doctorsLength, pageSelected, pagination, searchParams, loaded, failed, error } = this.state;
        const { specialties } = this.props;

        return (
            <CModal visible={visible} onClose={this.onClose} backdrop="static" size='xl'>
                <CModalHeader>
                    <CModalTitle>Search doctor</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <DoctorTable 
                        selectMode={true}
                        doctors={doctors}
                        specialties={specialties}
                        doctorsLength={doctorsLength}
                        pageSelected={pageSelected}
                        pagination={pagination}
                        searchParams={searchParams}
                        onClickPage={this.onClickPage}
                        onChangeParams={this.onChangeParams}
                        onSelect={this.onSelect}
                        onSearch={this.loadList}
                    />
                </CModalBody>
            </CModal>
        )
    }
}


const mapStateToProps = state => {
    return {
        doctor: state.doctor,
        specialties: state.specialty.specialties
    }
}

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators(doctorActions, dispatch)
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(DoctorSearch)