import React from 'react'
import EBIHeader from '../UI/EBIHeader';
import EBIFooter from '../UI/EBIFooter';
import Header from '../UI/Header';
import {Route,withRouter} from 'react-router-dom';
import Home from '../Pages/Home';
import Browse from '../Pages/Browse';
import Viewer from '../Pages/Viewer';
import About from '../Pages/About';

const Layout = () => {
    return (
        <>
            <EBIHeader />
            <Header/>
            <div id="content" role="main" className="row">
                <section>
                    <div id="main-content-area" className="row">
                        <div className="columns">
                            <Route path="/" exact component={Home} />
                            <Route path="/viewer" exact component={Viewer} />
                            <Route path="/browse" exact component={Browse} />
                            <Route path="/about" exact component={About} />
                        </div>
                    </div>
                </section>
            </div>
            <EBIFooter/>
        </>
    )
};

export default withRouter(Layout);

