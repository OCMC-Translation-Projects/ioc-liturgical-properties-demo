import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.css';
import React, { Component } from 'react';
import { Well } from 'react-bootstrap';
import { Labels, LiturgicalDayProperties } from 'ioc-liturgical-react';
import RestServer from './restServer';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    /**
     * @description Because ioc-liturgical-react components reply on an object that supplies the literals, it is important to initialize the state using the Labels object.
     * @type {{restServer: string, username: string, password: string, authenticated: boolean, loginFormPrompt: string, loginFormMsg: string, language: {language: string, labels: {compSimpleSearch: (*), resultsTable: (*), header: (*), help: (*), pageAbout: (*), pageLogin: (*), search: (*)}}}}
     */

    this.state = {
      restServer: RestServer.getWsServer()
      , username: ""
      , password: ""
      , language: {
        language: "en"
        , labels: {
          resultsTable: Labels.labels.en.resultsTable
          , linkSearchResultsTable: Labels.labels.en.linkSearchResultsTable
          , header: Labels.labels.en.header
          , help: Labels.labels.en.help
          , pageAbout: Labels.labels.en.pageAbout
          , pageLogin: Labels.labels.en.pageLogin
          , search: Labels.labels.en.search
          , searchLinks: Labels.labels.en.searchLinks
          , ldp: Labels.labels.en.ldp
        }
      }
    };

    // component callbacks
    this.handleLdpCallback = this.handleLdpCallback.bind(this);
  }

  handleLdpCallback = (value) => {
    console.log(value);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to the IOC Liturgical Day Properties Demo</h2>
        </div>
        <Well>
          <p>Each day of the year has certain liturgical properties, e.g. the mode of the week, what day of the
            Triodion or Pentecostarion it might be, what the Eothinon is, etc.</p>
          <p/>
          <p>This component allows the user to select a date. The component will request the information from the
            backend REST API.</p>
          <LiturgicalDayProperties
              restServer={this.state.restServer}
              username={this.state.username} // initially set to ""
              password={this.state.password} // initially set to ""
              callback={this.handleLdpCallback}
              labels={this.state.language.labels.ldp}
          />
        </Well>
      </div>
    );
  }
}

export default App;
