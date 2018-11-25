import React from 'react'
import { Link } from "react-router-dom";

export default function Reports() {
    return (
        <div className="row">
            <div className="col-sm-6">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Added info per year</h5>
                        <p className="card-text">Get data about all added birds per year</p>
                        <Link to="/reports/allPerYear" className="btn btn-primary">Get report</Link>
                    </div>
                </div>
            </div>
            <div className="col-sm-6">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">EURING codes per year</h5>
                        <p className="card-text">Get data about all added birds per year in EURING code</p>
                        <Link to="/reports/allPerYearEURING" className="btn btn-primary">Get report</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
