import React, { Component } from 'react'
import { Row, Col, Dropdown } from 'react-bootstrap'
import { navigate } from 'gatsby'

import arrowRightWhite from '../../assets/images/arrowRightWhite.svg'
import arrowRight from '../../assets/images/arrowRight.svg'
import arrowUp from '../../assets/images/arrowUp.svg'
import arrowDown from '../../assets/images/arrowDown.svg'
import Chip from '../../assets/images/chip.png'

export default class CCForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fullName: '',
      cardNumber: '',
      maskedNumber: '',
      month: 'Month',
      year: 'Year',
      cvv: '',
      monthDropdownIsOpen: false,
      yearDropdownIsOpen: false,
      validName: false,
      validCardNumber: false,
      validMonth: false,
      validYear: false,
      validCVV: false,
      hovered: 0,
    }
    this.formSubmitted = false
    this.cardNumberRegex = new RegExp(/^\d{15,}$/)
    this.cvvRegex = new RegExp(/^\d{3,}$/)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.selectOption = this.selectOption.bind(this)
    this.validateForm = this.validateForm.bind(this)
    this.formIsValid = this.formIsValid.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
  }

  handleHovered = num => {
    this.setState({
      hovered: num,
    })
  }

  handleBlur() {
    let num = this.state.cardNumber
    let stringNum = num.toString()
    this.state.cardNumber = this.setState({
      cardNumber:
        this.state.cardNumber.toString().length > 14
          ? this.state.cardNumber.toString().length === 15
            ? '**** ****** ' + stringNum.slice(stringNum.length - 5)
            : '**** **** **** ' + stringNum.slice(stringNum.length - 4)
          : this.state.cardNumber,
      maskedNumber: num,
    })
  }

  handleFocus() {
    this.state.cardNumber = this.setState({
      cardNumber: this.state.maskedNumber,
    })
  }

  update(field) {
    return e => {
      if (field === 'cardNumber' || field === 'cvv') {
        this.setState({
          [field]: parseInt(e.currentTarget.value)
            ? parseInt(e.currentTarget.value)
            : '',
        })
      } else {
        this.setState({
          [field]: e.currentTarget.value,
        })
      }
      this.validateForm()
    }
  }

  selectOption(field, value) {
    this.setState({ [field]: value })
    this.validateForm()
  }

  validateForm() {
    this.state.fullName !== ''
      ? this.setState({ validName: true })
      : this.setState({ validName: false })
    this.cardNumberRegex.test(this.state.maskedNumber)
      ? this.setState({ validCardNumber: true })
      : this.setState({ validCardNumber: false })
    this.state.month !== 'Month'
      ? this.setState({ validMonth: true })
      : this.setState({ validMonth: false })
    this.state.year !== 'Year'
      ? this.setState({ validYear: true })
      : this.setState({ validYear: false })
    this.cvvRegex.test(this.state.cvv)
      ? this.setState({ validCVV: true })
      : this.setState({ validCVV: false })
  }

  formIsValid() {
    if (
      this.state.fullName !== '' &&
      this.cardNumberRegex.test(this.state.cardNumber) &&
      this.cvvRegex.test(this.state.cvv) &&
      this.state.month !== 'Month' &&
      this.state.year !== 'Year'
    ) {
      return true
    } else {
      return false
    }
  }

  handleFormSubmit(e) {
    e.preventDefault()
    this.formSubmitted = true
    this.validateForm()
  }

  render() {
    return (
      <>
        <Row>
          <Col>
            <div className="card">
              <img src={Chip} width="60" className="chip-img" />
              <Row>
                <Col className="cardnumber">
                  <p>{this.state.cardNumber}</p>
                </Col>
              </Row>
              <Row>
                <Col className="cardholder" lg={8} xs={7}>
                  <p>Card Holder</p>
                  <p>{this.state.fullName}</p>
                </Col>
                <Col lg={4} xs={5}>
                  <p>Expiration</p>
                  <p>
                    {this.state.month}/{this.state.year}
                  </p>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <Row className="form-component">
          <Col className="form">
            <form>
              <Row>
                <Col className="input-field" lg={12} xs={12}>
                  <input
                    type="text"
                    id="fullName"
                    required={true}
                    value={this.state.fullName}
                    onChange={this.update('fullName')}
                    className={
                      this.state.validName || !this.formSubmitted
                        ? ''
                        : 'invalid'
                    }
                  />
                  <label htmlFor="fullName">
                    <strong>Card Holder</strong>
                  </label>
                  <p
                    className={
                      this.state.validName || !this.formSubmitted
                        ? 'hidden'
                        : 'invalid'
                    }
                  >
                    Please enter your full name.
                  </p>
                </Col>
              </Row>

              <Row>
                <Col lg={12} xs={12}>
                  <input
                    type="text"
                    id="cardNumber"
                    value={this.state.cardNumber}
                    required={true}
                    onChange={this.update('cardNumber')}
                    onBlur={this.handleBlur}
                    onFocus={this.handleFocus}
                    maxLength="16"
                    className={
                      this.state.validCardNumber || !this.formSubmitted
                        ? ''
                        : 'invalid'
                    }
                  />
                  <label htmlFor="cardNumber">
                    <strong>Card Number</strong>
                  </label>
                  <p
                    className={
                      this.state.validCardNumber || !this.formSubmitted
                        ? 'hidden'
                        : 'invalid'
                    }
                  >
                    Please enter your card number.
                  </p>
                </Col>
              </Row>

              <Row>
                <Col lg={3} xs={6}>
                  <Dropdown
                    onToggle={() =>
                      this.setState({
                        monthDropdownIsOpen: !this.state.monthDropdownIsOpen,
                      })
                    }
                  >
                    <Dropdown.Toggle
                      className={
                        this.state.validMonth || !this.formSubmitted
                          ? 'toggle-btn text-left'
                          : 'toggle-btn text-left invalid'
                      }
                      type="button"
                    >
                      {this.state.month}
                      <img
                        src={
                          this.state.monthDropdownIsOpen ? arrowUp : arrowDown
                        }
                        style={{ height: '18px' }}
                      ></img>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu">
                      <Dropdown.Item
                        className="dropdown-item"
                        onClick={() => this.selectOption('month', '01')}
                      >
                        01
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="dropdown-item"
                        onClick={() => this.selectOption('month', '02')}
                      >
                        02
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="dropdown-item"
                        onClick={() => this.selectOption('month', '03')}
                      >
                        03
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="dropdown-item"
                        onClick={() => this.selectOption('month', '04')}
                      >
                        04
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="dropdown-item"
                        onClick={() => this.selectOption('month', '05')}
                      >
                        05
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="dropdown-item"
                        onClick={() => this.selectOption('month', '06')}
                      >
                        06
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="dropdown-item"
                        onClick={() => this.selectOption('month', '07')}
                      >
                        07
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="dropdown-item"
                        onClick={() => this.selectOption('month', '08')}
                      >
                        08
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="dropdown-item"
                        onClick={() => this.selectOption('month', '09')}
                      >
                        09
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="dropdown-item"
                        onClick={() => this.selectOption('month', '10')}
                      >
                        10
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="dropdown-item"
                        onClick={() => this.selectOption('month', '11')}
                      >
                        11
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="dropdown-item"
                        onClick={() => this.selectOption('month', '12')}
                      >
                        12
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <p
                    className={
                      this.state.validMonth || !this.formSubmitted
                        ? 'hidden'
                        : 'invalid'
                    }
                  >
                    Please enter expiration month.
                  </p>
                </Col>

                <Col lg={3} xs={6}>
                  <Dropdown
                    onToggle={() =>
                      this.setState({
                        yearDropdownIsOpen: !this.state.yearDropdownIsOpen,
                      })
                    }
                  >
                    <Dropdown.Toggle
                      className={
                        this.state.validYear || !this.formSubmitted
                          ? 'toggle-btn text-left'
                          : 'toggle-btn text-left invalid'
                      }
                      type="button"
                    >
                      {this.state.year}
                      <img
                        src={
                          this.state.yearDropdownIsOpen ? arrowUp : arrowDown
                        }
                        style={{ height: '18px' }}
                      ></img>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu">
                      <Dropdown.Item
                        className="dropdown-item"
                        onClick={() => this.selectOption('year', '2020')}
                      >
                        2020
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="dropdown-item"
                        onClick={() => this.selectOption('year', '2021')}
                      >
                        2021
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="dropdown-item"
                        onClick={() => this.selectOption('year', '2022')}
                      >
                        2022
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="dropdown-item"
                        onClick={() => this.selectOption('year', '2023')}
                      >
                        2023
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="dropdown-item"
                        onClick={() => this.selectOption('year', '2024')}
                      >
                        2024
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="dropdown-item"
                        onClick={() => this.selectOption('year', '2025')}
                      >
                        2025
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="dropdown-item"
                        onClick={() => this.selectOption('year', '2026')}
                      >
                        2026
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="dropdown-item"
                        onClick={() => this.selectOption('year', '2027')}
                      >
                        2027
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="dropdown-item"
                        onClick={() => this.selectOption('year', '2028')}
                      >
                        2028
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="dropdown-item"
                        onClick={() => this.selectOption('year', '2029')}
                      >
                        2029
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="dropdown-item"
                        onClick={() => this.selectOption('year', '2030')}
                      >
                        2030
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <p
                    className={
                      this.state.validYear || !this.formSubmitted
                        ? 'hidden'
                        : 'invalid'
                    }
                  >
                    Please enter expiration year.
                  </p>
                </Col>

                <Col lg={6} xs={12}>
                  <input
                    type="text"
                    id="cvv"
                    value={this.state.cvv}
                    required={true}
                    onChange={this.update('cvv')}
                    pattern="[0-9\s]{0,3}"
                    maxLength="3"
                    className={
                      this.state.validCVV || !this.formSubmitted
                        ? ''
                        : 'invalid'
                    }
                  />
                  <label htmlFor="cvv">
                    <strong>CVV</strong>
                  </label>
                  <p
                    className={
                      this.state.validCVV || !this.formSubmitted
                        ? 'hidden'
                        : 'invalid'
                    }
                  >
                    Please enter valid cvv.
                  </p>
                </Col>
              </Row>

              <Row>
                <Col lg={5} xs={12}>
                  <button
                    className="submit-btn"
                    onClick={this.handleFormSubmit}
                    onMouseEnter={() => this.handleHovered(1)}
                    onMouseLeave={() => this.handleHovered(0)}
                  >
                    <span>Submit</span>
                    <img
                      src={
                        this.state.hovered === 1 ? arrowRight : arrowRightWhite
                      }
                    />
                  </button>
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
      </>
    )
  }
}
