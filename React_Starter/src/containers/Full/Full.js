import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Footer from '../../components/Footer/';
import Dashboard from '../../components/Dashboard/';
import Breadcrumb from "../../components/Breadcrumb";
import Analysis from "../../components/Analysis/Analysis";

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
                                <Route exact path="/cxo/analysis" name="Analysis" component={Analysis}/>
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
