import React, {Component} from 'react';
import CardHeader from '../common/CardHeader';
import device_19 from '../img/topology/device_19.gif';

import Cpu_Charts from '../dashboard/Cpu_Charts';
import Mem_Charts from '../dashboard/Mem_Charts';



class Contents extends Component {
    render() {
        return (
            <div className="dashboard" id='dashboard' style={{backgroundColor:'black'}}>
                <div className="row mb-3">
                    <div className="col-2 mb-3 stretch-card justify-content-between">
                        <div className="card bg-critical status-wrap flex-column">
                            <div className="card-body cursor-pointer px-0"/*onClick="fn_selectFaultlevelTable(1);"*/>
                                <p className="mb-1 text-center text-light p-0 ">Critical</p>
                                <p className="h1 text-center text-light" id="Critical_count">0</p>
                            </div>
                        </div>
                        <div className="card bg-major status-wrap flex-column">
                            <div className="card-body cursor-pointer px-0" /*onClick="fn_selectFaultlevelTable(2);"*/>
                                <p className="mb-1 text-center text-light p-0 " /*onClick="fn_selectFaultlevelTable(2);"*/>Major</p>
                                <p className="h1 text-center  text-light" id="Major_count">0</p>
                            </div>
                        </div>
                        <div className="card bg-minor status-wrap flex-column">
                            <div className="card-body cursor-pointer px-0" /*onClick="fn_selectFaultlevelTable(3);"*/>
                                <p className="mb-1 text-center text-light p-0 ">Minor</p>
                                <p className="h1 text-center text-light" id="Minor_count">0</p>
                            </div>
                        </div>
                        <div className="card h-50">
                            <CardHeader title='플랫폼 그룹 선택'/>
                            <div className="card-body pt-0 px-2">
                                <div className="tree-warp">
                                    <div className="">
                                        <ul id="tree1">
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card h-35">
                            <CardHeader title='IP 교환기'/>
                            <div className="card-body px-2 d-flex flex-column" id="IPtable">
                                <div className="card-body-device-wrap mb-2 p-2" id="IPdevice1">
                                    <table className="h-100 w-100">
                                        <tr className="w-100">
                                            <td className="h-100 w-75">
                                                <img className="pr-3 p-2 h-75" src={device_19} alt=""/>
                                            </td>
                                            <td className="h-100 w-100">
                                                <table style="height: auto; width:90%;"
                                                style={{height: 'auto', width:'90%'}}>
                                                    <colgroup>
                                                        <col width="35%"></col>
                                                        <col width="65%"></col>
                                                    </colgroup>
                                                    <tr>
                                                        <th colSpan="2" className="text-left text-white text-size:100%">
                                                            교환기
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-left initialism">
                                                            CPU
                                                        </td>
                                                        <td>
                                                            <div className="text-center w-100">
                                                                <div className="progress" id="" style={{height:'1rem !important'}}>
                                                                    <div id="cpuPro0"
                                                                         className="progress-bar progress-bar-striped progress-bar-animated"
                                                                         role="progressbar"
                                                                         style={{backgroundColor:'#1cc88a !important', width:'60%'}}
                                                                         aria-valuenow="10" aria-valuemin="0"
                                                                         aria-valuemax="100"></div>
                                                                    <div className="progress-gageText"><span
                                                                        id="cpuGage0" className=""> 60 </span>%
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-left initialism">
                                                            MEM
                                                        </td>

                                                        <td>
                                                            <div className="text-center w-100">
                                                                <div className="progress" id=""
                                                                     style={{height:'1rem !important'}}>
                                                                    <div id="memPro0"
                                                                         className="progress-bar progress-bar-striped progress-bar-animated"
                                                                         role="progressbar"
                                                                         style={{backgroundColor:'#1cc88a !important', width:'40%'}}
                                                                         aria-valuenow="10" aria-valuemin="0"
                                                                         aria-valuemax="100"></div>
                                                                    <div className="progress-gageText"><span
                                                                        id="memGage0" className=""> 40 </span>%
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>

                                                    </tr>
                                                    <tr>
                                                        <td className="text-left initialism">
                                                            디스크
                                                        </td>
                                                        <td style={{width:'100px'}}>
                                                            <div className="text-center w-100">
                                                                <div className="progress" id=""
                                                                     style={{height:'1rem !important'}}>
                                                                    <div id="fsPro0"
                                                                         className="progress-bar progress-bar-striped progress-bar-animated"
                                                                         role="progressbar"
                                                                         style={{backgroundColor:'#1cc88a !important', width:'80%'}}
                                                                         aria-valuenow="10" aria-valuemin="0"
                                                                         aria-valuemax="100"></div>
                                                                    <div className="progress-gageText"><span
                                                                        id="fsGage0" className=""> 80 </span>%
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 mb-3 stretch-card">
                        <div className="card w-100 h-100" id="mainDiv"
                            style={{width:'100%', margin:'0px !important', border:'0px', float:'left'}}>
                            <div className="card-header d-flex"
                                style={{padding:'0px', margin:'0px !important', border:'0px'}}>
                                <h6 className="m-0 font-weight-bold py-1 ml-3" id="topoMap">토폴로지맵</h6>
                                <div className="ml-auto pr-2">
                                </div>
                            </div>

                            <div className="card-body-bg-topology"
                                style={{width:'100%', height:'100%', padding:'0px', margin:'0px !important', border:'0px'}}>
                                <div className="card-body pt-0 mx-2" id="infovis2"
                                    style={{width:'100%', height:'100%', padding:'0px', margin:'0px !important', border:'0px'}}>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-2 flex-column">
                        <div className="card mb-1 h-30">
                            <CardHeader title='CPU 성능'/>
                            <div className="card-body card-body-bg-black" style={{backgroundColor: 'black'}}>
                                <Cpu_Charts></Cpu_Charts>
                            </div>
                        </div>
                        <div className="card mb-1 h-40">
                            <CardHeader title='네트워크 성능'/>
                            <div className="card-body card-body-bg-black">
                                <div className="h-100" id="nw_Graph"
                                    style={{marginLeft:'-30px', marginBottom:'-200px'}}>
                                </div>
                            </div>
                        </div>
                        <div className="card h-30">
                            <CardHeader title='CPU Top/N'/>
                            <div className="card-body card-body-bg-black">
                                <div className="h-100" id="cputop" style={{marginLeft:'-30px'}}></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-2 flex-column">
                        <div className="card mb-1 h-30">
                            <CardHeader title='MEM 성능'/>
                            <div className="card-body card-body-bg-black">
                                <Mem_Charts></Mem_Charts>
                            </div>
                        </div>
                        <div className="card mb-1 h-40">
                            <CardHeader title='파일시스템 성능'/>
                            <div className="card-body card-body-bg-black">
                                <div className="h-100" id="file_Graph"
                                     style={{marginLeft:'-30px', marginBottom:'-200px'}}></div>
                            </div>
                        </div>
                        <div className="card h-30">
                            <CardHeader title='MEM Top/N'/>
                            <div className="card-body card-body-bg-black">
                                <div className="h-100" id="memtop"
                                     style={{marginLeft:'-30px', marginBottom:'-30px'}}></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <div className="card h-100">
                            <div className="card-header">
                                일반 고장 이력
                                <div className="ml-auto pr-2">
                                    <button type="button" id="tb_cri" style={{width:'3.5rem'}}
                                            /*onClick="fn_selectFaultlevelTable(1);"*/
                                            className="btn btn-critical btn-sm ml-2">0
                                    </button>
                                    <button type="button" id="tb_maj" style={{width:'3.5rem'}}
                                            /*onClick="fn_selectFaultlevelTable(2);"*/
                                            className="btn btn-major btn-sm ml-2">0
                                    </button>
                                    <button type="button" id="tb_min" style={{width:'3.5rem'}}
                                            /*onClick="fn_selectFaultlevelTable(3);"*/
                                            className="btn btn-minor btn-sm ml-2">0
                                    </button>
                                </div>
                            </div>
                            <div className="card-body p-0">
                                <div className="table-responsive table-dashboard-style py-2">
                                    <table className="table table-hover table-striped" id="selectAllFaultTable">
                                        <thead className="thead-dark">
                                        <tr>
                                            <th className="table-per-5">순서</th>
                                            <th className="table-per-5">선택</th>
                                            <th className="table-per-auto">처리<br/>상태</th>
                                            <th className="table-per-auto">고장<br/>등급</th>
                                            <th className="table-per-15">발생일자</th>
                                            <th className="table-per-auto">고장<br/>종류</th>
                                            <th className="table-per-auto">고장<br/>내용</th>
                                            <th className="table-per-auto">그룹명</th>
                                            <th className="table-per-auto">장비명</th>
                                            <th className="table-per-auto">포트명</th>
                                            <th className="table-per-auto">포트 IP</th>
                                            <th className="table-per-auto">운영자 <br/> 메세지</th>
                                        </tr>
                                        </thead>
                                    </table>
                                    <input type="button" className="btn btn-sm btn-primary mx-2" value="운영자 확인"
                                           /*onClick="fn_user_msg_click(1);"*//>
                                    <input type="button" className="btn btn-sm btn-primary" value="Trap Ack"
                                           /*onClick="fn_user_msg_click(2);"*//>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="card h-100">
                            <div className="card-header">
                                교환기 고장 이력
                                <div className="ml-auto pr-2">
                                    <button type="button" id="tb_IpCri" style={{width:'3.5rem'}}
                                            /*onClick="fn_selectIPFaultlevelTable(1)"*/
                                            className="btn btn-critical btn-sm ml-2">0
                                    </button>
                                    <button type="button" id="tb_IpMaj" style={{width:'3.5rem'}}
                                            /*onClick="fn_selectIPFaultlevelTable(2)"*/
                                            className="btn btn-major btn-sm ml-2">0
                                    </button>
                                    <button type="button" id="tb_IpMin" style={{width:'3.5rem'}}
                                            /*onClick="fn_selectIPFaultlevelTable(3)"*/
                                            className="btn btn-minor btn-sm ml-2">0
                                    </button>
                                </div>
                            </div>
                            <div className="card-body p-0">
                                <div className="table-responsive table-dashboard-style py-2">
                                    <table className="table table-hover table-striped" id="rt_event_list_table">
                                        <thead className="thead-dark">
                                        <tr>
                                            <th className="table-per-5">순서</th>
                                            <th className="table-per-auto">ALARM<br/>ID</th>
                                            <th className="table-per-auto">고장등급</th>
                                            <th className="table-per-auto">발생일자</th>
                                            <th className="table-per-20">고장내용</th>
                                            <th className="table-per-auto">캐비닛</th>
                                            <th className="table-per-auto">슬롯</th>

                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default Contents;