import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import SampleDashBoard from '../../components/Dashboard/SummarySampleRender/SampleDashboard'
import DashBoard from '../../components/Dashboard/SummaryRender/Dashboard'

import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Footer from '../../components/Footer/';
import Analysis from "../../components/Analysis/Shared/Analysis";
import Step01 from "../../components/MyData/Step01/Step01";
import Step02 from "../../components/MyData/Step02/Step02";
import Step03 from "../../components/MyData/Step03/Step03";
import Step04 from "../../components/MyData/Step04/Step04";
import MyPage from "../../components/MyPage/MyPage";
import Algorithm from "../../components/Algorithem/Algorithm";



class Full extends Component {
    render() {
        return (
            <div className="app">
                <Header />
                <div className="app-body">
                    <Sidebar {...this.props} />
                    <main className="main">
                        <Container fluid>
                            <Switch>
                                <Route exact path="/cxo/sampledashboard" name="SampleDashBoard" component={SampleDashBoard}/>
                                <Route exact path="/cxo/dashboard" name="DashBoard" component={DashBoard}/>
                                <Route exact path="/cxo/analysis/:job_id" name="Analysis" component={Analysis}/>
                                <Route exact path="/cxo/algorithm/:service_id" name="Algorithm" component={Algorithm}/>
                                <Route exact path="/cxo/mypage" name="MyPage" component={MyPage}/>
                                <Route exact path="/cxo/step01" name="Step01" component={Step01}/>
                                <Route exact path="/cxo/step02" name="Step02" component={Step02}/>
                                <Route exact path="/cxo/step03" name="Step03" component={Step03}/>
                                <Route exact path="/cxo/step04" name="Step04" component={Step04}/>
                                <Redirect from="/" to="/cxo/sampledashboard"/>
                            </Switch>
                        </Container>
                    </main>
                </div>
                <Footer />
            </div>
        );
    }
}
export default Full;
