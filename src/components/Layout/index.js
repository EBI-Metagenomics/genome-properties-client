import React from 'react'
import EBIHeader from '../UI/EBIHeader';
import EBIFooter from '../UI/EBIFooter';
import Header from '../UI/Header';
import {Route,withRouter} from 'react-router-dom';
import Home from '../Pages/Home';
import Browse from '../Pages/Browse';
import Viewer from '../Pages/Viewer';
import About from '../Pages/About';
import GenomeProperty from "../Pages/GenomeProperty";

const Layout = () => {
    return (
        <>
            <EBIHeader />
            <Header/>
            <div id="content" role="main" className="row">
                <section>
                    <div id="main-content-area" className="row">
                        <div className="columns">
                            <Route path={`${process.env.PUBLIC_URL}/`} exact={true} component={Home} />
                            <Route path={`${process.env.PUBLIC_URL}/viewer`} exact={true} component={Viewer} />
                            <Route path={`${process.env.PUBLIC_URL}/browse`} exact={true} component={Browse} />
                            <Route path={`${process.env.PUBLIC_URL}/about`} exact={true} component={About} />
                            <Route path={`${process.env.PUBLIC_URL}/genome-property/:accession`} exact={true} component={GenomeProperty} />
                        </div>
                    </div>
                </section>
            </div>
            <EBIFooter/>
        </>
    )
};

export default withRouter(Layout);

