import React, { Component } from 'react'
import Select from 'react-select'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

export class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            subjects: [],
            students: [],

            // new subjects
            new_subject_name: "",

            // new_students
            new_student_first_name: "",
            new_student_last_name: "",
            new_student_subjects_array: [],

            // add subject to student
            selected_student: null,
            selected_subject: "",
        }
    }

    componentDidMount() {
        // get all the students
        axios.get("/api/student/all")
            .then((response) => {
                this.setState({ students: response.data })
                console.log(response.data)
            })
            .catch(err => {
                console.error(err)
            })

        // get all the subjects
        axios.get("/api/subjects/all")
            .then((response) => {
                this.setState({ subjects: response.data })
                console.log(response.data)
            })
            .catch(err => {
                console.error(err)
            })
    }

    createSubject = () => {
        let subject = {
            subject_name: this.state.new_subject_name,
        }
        axios.post("/api/subjects/create", {
            subject: subject
        })
            .then(() => {
                alert("Subject created successfully")
                window.location.reload()
            })
            .catch(err => {
                console.error(err)
                alert("Error creating subject")
            })
    }

    registerStudent = () => {
        let student = {
            first_name: this.state.new_student_first_name,
            last_name: this.state.new_student_last_name,
            subjects: this.state.new_student_subjects_array,
        }
        axios.post("/api/student/create", {
            student: student
        })
            .then(() => {
                alert("Student created successfully")
                window.location.reload()
            })
            .catch(err => {
                console.error(err)
                alert("Error creating student")
            })
    }

    addSubject = () => {
        axios.post("/api/student/addSubject", {
            student_id: this.state.selected_student._id,
            subject: this.state.selected_subject
        })
            .then(() => {
                alert("Subject added successfully")
                window.location.reload()
            })
            .catch(err => {
                console.error(err)
                alert("Error adding subject")
            })
    }

    render() {
        return (
            <div className="container-fluid">
                {/* the top hero section */}
                <div className="row hero text-white">
                    <div className="col-sm-11 mx-auto my-5 my-auto mx-auto">
                        <h1 className="text-center mb-3">Student Management Dashboard</h1>
                        <small className="text-center">Manage Students and their Subjects</small>
                    </div>
                </div>

                <div className="row mt-4 mx-1">
                    <div className="col-sm-4 mx-auto card my-1 py-2 boxShadow" style={{
                        borderRadius: "24px",
                        height: "100%",
                    }}>
                        <div className="card-top">
                            <h4 className="card-title">Subjects</h4>
                            <hr />
                        </div>
                        <div className="card-body">
                            <form
                                // call the createSubject function on submit
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    this.createSubject()
                                }}
                            >
                                <input
                                    className='col-sm-8 mx-auto'
                                    placeholder='Enter Subject Name'
                                    onChange={(e) => this.setState({ new_subject_name: e.target.value })}
                                />
                                <button className="btn btn-primary col-sm-6 mx-auto mt-2"
                                    style={{
                                        borderRadius: "24px"
                                    }}
                                    type="submit"
                                >
                                    Create
                                </button>
                            </form>
                        </div>

                        {/* table rendering all the subjects */}
                        <hr />
                        <h5
                            className="text-center"
                        >
                            Current Subjects
                        </h5>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Subject Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.subjects.map((subject, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{subject.subject_name}</td>
                                        </tr>
                                    )
                                }
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="col-sm-7 mx-auto card my-1 py-2 boxShadow" style={{
                        borderRadius: "24px",
                        height: "100%",
                    }}>
                        <div className="card-top">
                            <h4 className="card-title">Students</h4>
                            <hr />
                        </div>
                        <div className="card-body">
                            <form
                                // call the createSubject function on submit
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    this.registerStudent()
                                }}
                            >
                                <input
                                    className='col-sm-5 mx-1 my-1'
                                    placeholder='Student First Name'
                                    onChange={(e) => this.setState({ new_student_first_name: e.target.value })}
                                />
                                <input
                                    className='col-sm-5 mx-1 my-1'
                                    placeholder='Student Last Name'
                                    onChange={(e) => this.setState({ new_student_last_name: e.target.value })}
                                />
                                <button className="btn btn-primary col-sm-6 mx-auto mt-2"
                                    style={{
                                        borderRadius: "24px"
                                    }}
                                    type="submit"
                                >
                                    Create
                                </button>
                            </form>
                        </div>

                        {/* table rendering all the subjects */}
                        <hr />
                        <h5
                            className="text-center"
                        >
                            Current Student Population - {this.state.students.length}
                        </h5>

                        <Select
                            placeholder="Select A Student Here..."
                            options={this.state.students.map((student) => {
                                return {
                                    label: student.first_name + " " + student.last_name,
                                    value: student._id
                                }
                            })}
                            onChange={(selectedOption) => {
                                // find the student with the student._id
                                let student = this.state.students.find((student) => {
                                    return student._id === selectedOption.value
                                })
                                this.setState({ selected_student: student })
                            }}
                        />

                        {
                            this.state.selected_student !== null &&
                            <div className='row'>
                                <div className='card boxShadow col-sm-11 mt-4 mx-auto'
                                    style={{
                                        borderRadius: "24px",
                                        height: "100%",
                                    }}
                                >
                                    <div className='card-top'>
                                        <h4 className='card-title'>
                                            {this.state.selected_student.first_name + " " + this.state.selected_student.last_name}
                                        </h4>
                                    </div>
                                    <div className='card-body'>
                                        <div className='row'>
                                            <div className='col'>
                                                <p
                                                    className='my-0'
                                                    hidden
                                                >
                                                    {this.state.selected_student.subjects_array.map((subject) => {
                                                        return subject.subject_name
                                                    })}
                                                </p>
                                                {this.state.selected_student.subjects_array.length > 0 &&
                                                    <>
                                                        <table className="table table-striped">
                                                            <thead>
                                                                <tr>
                                                                    <th>#</th>
                                                                    <th>Subject Name</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {this.state.selected_student.subjects_array.map((subject, index) => {
                                                                    return (
                                                                        <tr key={index} >
                                                                            <td>{index + 1}</td>
                                                                            <td>{subject}</td>
                                                                        </tr>
                                                                    )
                                                                }
                                                                )}
                                                            </tbody>
                                                        </table>
                                                        <hr />
                                                    </>
                                                }
                                                <p>Add Subject</p>
                                                <Select
                                                    placeholder="Select A Subject Here..."
                                                    options={this.state.subjects.map((subject) => {
                                                        return {
                                                            label: subject.subject_name,
                                                            value: subject._id
                                                        }
                                                    }
                                                    )}
                                                    onChange={(selectedOption) => {
                                                        console.log(selectedOption.label)
                                                        this.setState({
                                                            selected_subject: selectedOption.label
                                                        })
                                                    }}
                                                />
                                                <button
                                                    className="btn btn-primary col-sm-3 mx-auto mt-2"
                                                    style={{
                                                        borderRadius: "24px"
                                                    }}
                                                    onClick={() => {
                                                        this.addSubject()
                                                    }}
                                                >
                                                    Add Subject
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='card boxShadow col-sm-7 mt-4 mx-auto'
                                    style={{
                                        borderRadius: "24px",
                                    }}
                                    hidden
                                >
                                    <div className='card-top'>
                                        <h4 className='card-title'>Subjects - {this.state.selected_student.subjects_array.length}</h4>
                                    </div>
                                    <hr />
                                    <div className='card-body'>
                                        <div className='row'>
                                            <div className='col'>
                                                <h5>Current Subjects</h5>
                                                <p
                                                    className='my-0'
                                                    hidden
                                                >
                                                    {this.state.selected_student.subjects_array.map((subject) => {
                                                        return subject.subject_name
                                                    })}
                                                </p>
                                                <table className="table table-striped">
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>Subject Name</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.selected_student.subjects_array.map((subject, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{subject}</td>
                                                                </tr>
                                                            )
                                                        }
                                                        )}
                                                    </tbody>
                                                </table>
                                                <hr />
                                                <h5>Add Subject</h5>
                                                <Select
                                                    placeholder="Select A Subject Here..."
                                                    options={this.state.subjects.map((subject) => {
                                                        return {
                                                            label: subject.subject_name,
                                                            value: subject._id
                                                        }
                                                    }
                                                    )}
                                                    onChange={(selectedOption) => {
                                                        this.setState({
                                                            selected_subject: selectedOption
                                                        })
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>

                </div>

            </div >
        )
    }
}

export default withRouter(Home)