import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Footer from '../../components/Footer/';
import Dashboard from '../../components/Dashboard/';
import Analysis from "../../components/Analysis/Analysis";
import Step01 from "../../components/MyData/Step01/Step01";
import Step02 from "../../components/MyData/Step02/Step02";
import Step03 from "../../components/MyData/Step03/Step03";
import Step04 from "../../components/MyData/Step04/Step04";

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
                                <Route exact path="/cxo" name="Dashboard" component={Dashboard}/>
                                <Route path="/cxo/analysis/:job_id" name="Analysis" component={Analysis}/>
                                <Route path="/cxo/step01" name="Step01" component={Step01}/>
                                <Route path="/cxo/step02" name="Step02" component={Step02}/>
                                <Route path="/cxo/step03" name="Step03" component={Step03}/>
                                <Route path="/cxo/step04" name="Step04" component={Step04}/>
                                <Redirect from="/" to="/cxo"/>
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
