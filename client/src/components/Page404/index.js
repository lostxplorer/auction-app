import React, { Component } from "react";

class Page404 extends Component {
  /**
   * Render page 404 error
   */
  render() {
    return (
      <div className="app align-items-center">
        <div className="container page-not-found">
          <div className="row justify-content-center">
            <div className="col-md-6 col-sm-12">
              <div className="clearfix">
                <h1 className="float-left display-3 mr-4 page-not-found-404">
                  404
                </h1>
                <h4 className="pt-3">Oops! You're lost.</h4>
                <p className="text-muted float-left">
                  The page you are looking for was not found.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Page404;
