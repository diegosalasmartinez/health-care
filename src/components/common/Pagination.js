import React, { Component } from 'react'
import { CPagination, CPaginationItem } from '@coreui/react'

export default class Pagination extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentIndex: 1
        }
    }

    componentDidMount(){
        this.setState({currentIndex: this.props.pageSelected || 1})
    }

    onClickPage = (indexPage) => {
        this.setState({currentIndex: indexPage});
        this.props.onClickPage(indexPage);
    }

    render() {
        const { itemsLength = 0, pagination } = this.props;
        const indexSelected = this.state.currentIndex;
        const numberPages = Math.ceil(itemsLength / pagination.limit);
        const showFirstPages = indexSelected > 1;
        const showLastPages = indexSelected < numberPages;
        
        return (
            <CPagination aria-label="Page navigation example">
                <CPaginationItem aria-label="Start" disabled={!showFirstPages} onClick={() => this.onClickPage(1)}>
                    <span aria-hidden="true">&laquo;</span>
                </CPaginationItem>
                <CPaginationItem aria-label="Previous" disabled={!showFirstPages} onClick={() => this.onClickPage(indexSelected - 1)}>
                    <span aria-hidden="true">&lt;</span>
                </CPaginationItem>
                { indexSelected - 2 > 0 && 
                    <CPaginationItem key={0} active={this.state.currentIndex === (indexSelected - 2)} onClick={() => this.onClickPage(indexSelected - 2)}>
                        {indexSelected - 2}
                    </CPaginationItem>
                }
                { indexSelected - 1 > 0 && 
                    <CPaginationItem key={1} active={this.state.currentIndex === (indexSelected - 1)} onClick={() => this.onClickPage(indexSelected - 1)}>
                        {indexSelected - 1}
                    </CPaginationItem>
                }
                <CPaginationItem key={2} active={this.state.currentIndex === indexSelected} onClick={() => this.onClickPage(indexSelected)}>
                    {indexSelected}
                </CPaginationItem>
                { indexSelected + 1 <= numberPages && 
                    <CPaginationItem key={3} active={this.state.currentIndex === (indexSelected + 1)} onClick={() => this.onClickPage(indexSelected + 1)}>
                        {indexSelected + 1}
                    </CPaginationItem>
                }
                { indexSelected + 2 <= numberPages && 
                    <CPaginationItem key={4} active={this.state.currentIndex === (indexSelected + 2)} onClick={() => this.onClickPage(indexSelected + 2)}>
                        {indexSelected + 2}
                    </CPaginationItem>
                }
                <CPaginationItem aria-label="Next" disabled={!showLastPages} onClick={() => this.onClickPage(indexSelected + 1)}>
                    <span aria-hidden="true">&gt;</span>
                </CPaginationItem>
                <CPaginationItem aria-label="End" disabled={!showLastPages} onClick={() => this.onClickPage(numberPages)}>
                    <span aria-hidden="true">&raquo;</span>
                </CPaginationItem>
            </CPagination>
        )
    }
}
