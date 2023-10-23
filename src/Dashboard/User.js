import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class UserProfileEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            jobTitle: '',
            mobileNumber: '',
            email: '',
            NICnumber: '',
            address: '',
            qualification: '',
            description: '',
        };
    }

    componentDidMount() {
        // Fetch user profile data from the backend
        fetch('http://localhost:3001/profile-data')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch user profile');
                }
                return response.json();
            })
            .then((data) => {
                // Update the state with the fetched data
                this.setState({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    username: data.username,
                    jobTitle: data.JobTitle,
                    mobileNumber: data.mobileNumber,
                    email: data.email,
                    NICnumber: data.NICnumber,
                    address: data.address,
                    qualification: data.qualification,
                    description: data.Description,
                });
            })
            .catch((error) => {
                console.error('Error fetching user profile: ', error);
            });
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    render() {
        return (
            <div className="container">
                <h2>Edit Your Profile</h2>
                <div className="content-wrapper">
                    <div className="row">
                        <div className="col-md-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <form className="row g-3" name="frm_register_Student" method="post" action="#">
                                        <div className="col-md-4">
                                            <label htmlFor="inputFirstName" className="form-label">
                                                First Name
                                            </label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                className="form-control"
                                                placeholder=""
                                                value={this.state.firstName}
                                                onChange={this.handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="inputLastName" className="form-label">
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                className="form-control"
                                                placeholder=""
                                                value={this.state.lastName}
                                                onChange={this.handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="inputLastName" className="form-label"> User Name</label>
                                            <input
                                                type="text"
                                                name="username"
                                                className="form-control"
                                                placeholder=""
                                                value={this.state.username}
                                                onChange={this.handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-3">
                                            <label>Job Title</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="jobTitle"
                                                value={this.state.jobTitle}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                        <div className="col-md-3">
                                            <label>Mobile Number</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="mobileNumber"
                                                value={this.state.mobileNumber}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                        <div className="col-md-3">
                                            <label>Email</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                name="email"
                                                value={this.state.email}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                        <div className="col-md-3">
                                            <label>NIC Number</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="NICnumber"
                                                value={this.state.NICnumber}
                                                onChange={this.handleChange}
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <label>Address</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="address"
                                                value={this.state.address}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label>Qualification</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="qualification"
                                                value={this.state.qualification}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Description</label>
                                            <textarea
                                                className="form-control"
                                                name="description"
                                                value={this.state.description}
                                                onChange={this.handleChange}
                                            />
                                        </div>

                                        <div className="modal-footer">
                                            <input type="submit" name="btn_save" className="btn btn-primary m-2" value="SAVE" />
                                            <input type="reset" name="reset" className="btn btn-secondary m-2" value="Reset" />
                                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">
                                                Close
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserProfileEdit;
