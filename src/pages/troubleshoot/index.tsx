import React from 'react';
import { AdminLayout } from '@layout';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, Table, Form, FormCheck } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { left } from '@popperjs/core';

type Props = {};

const index = () => {
  return (
    <AdminLayout>
      <div style={{ display: 'flex', gap: '20px', flexFlow: 'column' }}>
        {/* <Container
          style={{
            display: 'flex',
            flexFlow: 'column',
            gap: '20px',
            maxWidth: '100%',
          }}
        >
          <div>
            <h1>Frequently Asked Questions</h1>
          </div>
          <div>
            <Alert
              variant="warning"
              style={{
                display: 'flex',
                borderTop: '5px solid rgba(0, 124, 186, 1)',
                gap: '20px',
                alignItems: 'flex-start',
                background: '#ebecfb',
              }}
            >
              <div>
                <Alert.Heading>
                  <img
                    src="./bell.svg"
                    width="25"
                    alt="imp"
                    style={{ marginBottom: '5px' }}
                  />{' '}
                  Important:
                </Alert.Heading>
                <p>
                  Our app will not increase or decrease any page load speed
                  metrics, for example, PageSpeed Insights or Gmetrix. The
                  reason is this app preloads links and this works from the
                  second page view only. Hence this app does not take into
                  consideration the second page load times in its results.
                </p>
              </div>
              <div></div>
            </Alert>
          </div>
        </Container> */}
        <Container style={{ maxWidth: '100%' }}>
          <Card>
            {/* <Card.Body>
              <Row
                style={{
                  padding: '25px 30px',
                  display: 'flex',
                  flexFlow: 'row',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    borderLeft: '5px solid rgba(0, 124, 186, 1)',
                    height: '100px',
                    width: 'auto',
                    padding: '0',
                    borderRadius: '5px',
                  }}
                ></div>
                <div>
                  <Col xs={12}>
                    <div>
                      <h2>How will this app work?</h2>
                    </div>
                    <div>
                      <p>
                        The functioning of this app is simple! This app adds one
                        simple file to your theme called
                        conzia-booster-page-speed-optimizer.js! As a result your
                        store's load times automatically speeds up.
                      </p>
                    </div>
                  </Col>
                </div>
              </Row>
              <Row
                style={{
                  padding: '25px 30px',
                  display: 'flex',
                  flexFlow: 'row',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    borderLeft: '5px solid rgba(0, 124, 186, 1)',
                    height: '100px',
                    width: 'auto',
                    padding: '0',
                    borderRadius: '5px',
                  }}
                ></div>
                <Col xs={12}>
                  <div>
                    <h2>How is this beneficial to my store?</h2>
                  </div>
                  <div>
                    <p>
                      Amazon and others found that cutting 100 milliseconds of
                      latency improve sales by 1%. As a result this app will
                      help improve your conversions.
                    </p>
                  </div>
                </Col>
              </Row>
              <Row
                style={{
                  padding: '25px 30px',
                  display: 'flex',
                  flexFlow: 'row',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    borderLeft: '5px solid rgba(0, 124, 186, 1)',
                    height: '100px',
                    width: 'auto',
                    padding: '0',
                    borderRadius: '5px',
                  }}
                ></div>
                <Col xs={12}>
                  <div>
                    <h2>How do I uninstall the app?</h2>
                  </div>
                  <div>
                    <p>
                      You can simply turn off the switch in the dashboard
                      section or remove this line from your layout/theme.liquid
                      file. '
                      <script src="https://conzia-page-speed-booster.s3.eu-central-1.amazonaws.com/conzia-page-speed-booster-script.js"></script>
                      '
                    </p>
                  </div>
                </Col>
              </Row>
            </Card.Body> */}
            <Card.Body
              className="d-flex"
              style={{ flexFlow: 'column', gap: '20px' }}
            >
              <div>
                <h1>Frequently Asked Questions</h1>
              </div>
              <div>
                <Alert
                  variant="warning"
                  style={{
                    display: 'flex',
                    borderTop: '5px solid gold',
                    gap: '20px',
                    alignItems: 'flex-start',
                  }}
                >
                  <svg
                    width="30px"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z" />
                  </svg>
                  <div>
                    <Alert.Heading>Important:</Alert.Heading>
                    <p>
                      Our app will not increase or decrease any page load speed
                      metrics, for example, PageSpeed Insights or Gmetrix. The
                      reason is this app preloads links and this works from the
                      second page view only. Hence this app does not take into
                      consideration the second page load times in its results.
                    </p>
                  </div>
                  <div></div>
                </Alert>
              </div>
              <Container>
                <Row
                  style={{
                    borderBottom: '2px solid lightgrey',
                    padding: '25px 0',
                  }}
                >
                  <Col xs={6}>
                    <div>
                      <h2>How will this app work?</h2>
                    </div>
                    <div>
                      <p>
                        The functioning of this app is simple! This app adds one
                        simple file to your theme called
                        conzia-booster-page-speed-optimizer.js! As a result your
                        store's load times automatically speeds up.
                      </p>
                    </div>
                  </Col>
                  <Col xs={6}>
                    <div>
                      <h2>How is this beneficial to my store?</h2>
                    </div>
                    <div>
                      <p>
                        Amazon and others found that cutting 100 milliseconds of
                        latency improve sales by 1%. As a result this app will
                        help improve your conversions.
                      </p>
                    </div>
                  </Col>
                </Row>
                <Row style={{ padding: '25px 0' }}>
                  <Col xs={6}>
                    <div>
                      <h2>How do I uninstall the app?</h2>
                    </div>
                    <div>
                      <p>
                        You can simply turn off the switch in the dashboard
                        section or remove this line from your
                        layout/theme.liquid file. '
                        <script src="https://conzia-page-speed-booster.s3.eu-central-1.amazonaws.com/conzia-page-speed-booster-script.js"></script>
                        '
                      </p>
                    </div>
                  </Col>
                </Row>
              </Container>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </AdminLayout>
  );
};

export default index;
