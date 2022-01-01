import React, { useState, useEffect, useRef } from 'react';
import { useParams, useHistory, Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import firebase from '../../../firebase/firebase';
import useScrollTop from '../../../hooks/useScrollTop';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import { SHOP } from '../../../constants/routes';
import { ArrowLeftOutlined, LoadingOutlined } from '@ant-design/icons';
import { Pie, Doughnut, Line, Bar } from 'react-chartjs-2';
import Chart from "react-apexcharts";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '10px',
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

/* const useStyles = makeStyles({
    root: {
      minWidth: 150,
      zIndex: 20,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  }); */


const PromoterDashboard = (props) => {
    useScrollTop();    

    const history = useHistory();
    const dispatch = useDispatch();

    useDocumentTitle('Promoter Dashboard || Gullit Gebeya');

    const [promoterPrivate, setPromoterPrivate] = useState(null);

    const state2 = {
        labels: ['January', 'February', 'March',
            'April', 'May'],
        datasets: [
            {
                label: 'Rainfall',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: [65, 59, 80, 81, 56]
            }
        ]
    }

    var state = {
        labels: ['Channel 1', 'Channel 2', 'Channel 3', 'Channel 4', 'Channel 5', 'Channel 6', 'Channel 7', 'Channel 8', 'Channel 9', 'Channel 10'],
        datasets: [
            {
                label: 'Channels',
                backgroundColor: [
                    '#B21F00',
                    '#C9DE00',
                    '#2FDE00',
                    '#00A6B4',
                    '#6800B4',
                    '#B21F00',
                    '#C9DE00',
                    '#2FDE00',
                    '#00A6B4',
                    '#6800B4'
                ],
                hoverBackgroundColor: [
                    '#501800',
                    '#4B5000',
                    '#175000',
                    '#003350',
                    '#35014F',
                    '#501800',
                    '#4B5000',
                    '#175000',
                    '#003350',
                    '#35014F'
                ],
                data: [12, 20, 14, 25, 15, 12, 20, 14, 25, 15,]
            }
        ]
    }

    const state4 = {
        options: {},
        series: [44, 55, 41, 17, 15],
        labels: ['A', 'B', 'C', 'D', 'E']
    }


    const [chartData, setChartData] = useState(null);
    const [chartData2, setChartData2] = useState(null);
    const [chartData3, setChartData3] = useState(null);

    const updateChartData = (data) => {
        let chartDataArray = [];
        chartDataArray.push(data.numberOfSells.channel_1 ? data.numberOfSells.channel_1 : 0)
        chartDataArray.push(data.numberOfSells.channel_2 ? data.numberOfSells.channel_2 : 0)
        chartDataArray.push(data.numberOfSells.channel_3 ? data.numberOfSells.channel_3 : 0)
        chartDataArray.push(data.numberOfSells.channel_4 ? data.numberOfSells.channel_4 : 0)
        chartDataArray.push(data.numberOfSells.channel_5 ? data.numberOfSells.channel_5 : 0)
        chartDataArray.push(data.numberOfSells.channel_6 ? data.numberOfSells.channel_6 : 0)
        chartDataArray.push(data.numberOfSells.channel_7 ? data.numberOfSells.channel_7 : 0)
        chartDataArray.push(data.numberOfSells.channel_8 ? data.numberOfSells.channel_8 : 0)
        chartDataArray.push(data.numberOfSells.channel_9 ? data.numberOfSells.channel_9 : 0)
        chartDataArray.push(data.numberOfSells.channel_10 ? data.numberOfSells.channel_10 : 0)
        setChartData({
            options: {
                chart: {
                    width: "100%",
                    height: 380,
                    type: "bar",
                    id: "channel-no-sell-bar"
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    width: 1,
                    colors: ["#fff"]
                },
                xaxis: {
                    categories: ['Channel 1', 'Channel 2', 'Channel 3', 'Channel 4', 'Channel 5', 'Channel 6', 'Channel 7', 'Channel 8', 'Channel 9', 'Channel 10',]
                },
                legend: {
                    position: "right",
                    verticalAlign: "top",
                    containerMargin: {
                        left: 35,
                        right: 60
                    }
                },
                responsive: [
                    {
                        breakpoint: 1000,
                        options: {
                            /* plotOptions: {
                                bar: {
                                    horizontal: false
                                }
                            }, */
                            legend: {
                                position: "bottom"
                            }
                        }
                    }
                ],
                title: {
                    text: 'Number Of Sells for Each Channels',
                    align: 'left',
                    margin: 10,
                    offsetX: 0,
                    offsetY: 0,
                    floating: false,
                    style: {
                        fontSize: '14px',
                        fontWeight: 'bold',
                        fontFamily: undefined,
                        color: '#263238'
                    },
                },
                noData: {
                    text: 'No Data',
                    align: 'center',
                    verticalAlign: 'middle',
                    offsetX: 0,
                    offsetY: 0,
                    style: {
                        color: '#263238',
                        fontSize: '14px',
                        fontFamily: undefined
                    }
                },
            },
            series: [
                {
                    name: "series-1",
                    data: chartDataArray
                }
            ]
        })

        let donatChartDataArray = [];
        let barChartDataArray = [];
        let donatChartLabelArray = [];

        {
            Object.keys(data.numberOfSellsPerProducts).map((key) => {
                donatChartDataArray.push(data.numberOfSellsPerProducts[key].totalNumberOfSells ? data.numberOfSellsPerProducts[key].totalNumberOfSells : 0)
                barChartDataArray.push(data.numberOfSellsPerProducts[key].totalCurrent ? data.numberOfSellsPerProducts[key].totalCurrent : 0)
                donatChartLabelArray.push(data.numberOfSellsPerProducts[key].productName ? data.numberOfSellsPerProducts[key].productName : 'no name')
            })
        }

        setChartData2({
            options: {
                chart: {
                    width: "100%",
                    height: 380,
                    type: "bar",
                    id: "products-no-sell-bar"
                },
                dataLabels: {
                    enabled: true
                },
                stroke: {
                    width: 1,
                    colors: ["#fff"]
                },
                legend: {
                    position: "right",
                    verticalAlign: "top",
                    containerMargin: {
                        left: 35,
                        right: 60
                    }
                },
                responsive: [
                    {
                        breakpoint: 1000,
                        options: {
                            /* plotOptions: {
                                bar: {
                                    horizontal: false
                                }
                            }, */
                            legend: {
                                position: "bottom"
                            }
                        }
                    }
                ],
                title: {
                    text: 'Number Of Sells for Each Products',
                    align: 'left',
                    margin: 10,
                    offsetX: 0,
                    offsetY: 0,
                    floating: false,
                    style: {
                        fontSize: '14px',
                        fontWeight: 'bold',
                        fontFamily: undefined,
                        color: '#263238'
                    },
                },
                noData: {
                    text: 'No Data',
                    align: 'center',
                    verticalAlign: 'middle',
                    offsetX: 0,
                    offsetY: 0,
                    style: {
                        color: '#263238',
                        fontSize: '14px',
                        fontFamily: undefined
                    }
                },
            },
            series: donatChartDataArray,
            labels: donatChartLabelArray
        })

        setChartData3({
            options: {
                chart: {
                    width: "100%",
                    height: 380,
                    type: "bar",
                    id: "channel-no-sell-bar"
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    width: 1,
                    colors: ["#fff"]
                },
                xaxis: {
                    categories: donatChartLabelArray
                },
                legend: {
                    position: "right",
                    verticalAlign: "top",
                    containerMargin: {
                        left: 35,
                        right: 60
                    }
                },
                responsive: [
                    {
                        breakpoint: 1000,
                        options: {
                            /* plotOptions: {
                                bar: {
                                    horizontal: false
                                }
                            }, */
                            legend: {
                                position: "bottom"
                            }
                        }
                    }
                ],
                title: {
                    text: 'Total Sells for Each Products In ETB',
                    align: 'left',
                    margin: 10,
                    offsetX: 0,
                    offsetY: 0,
                    floating: false,
                    style: {
                        fontSize: '14px',
                        fontWeight: 'bold',
                        fontFamily: undefined,
                        color: '#263238'
                    },
                },
                noData: {
                    text: 'No Data',
                    align: 'center',
                    verticalAlign: 'middle',
                    offsetX: 0,
                    offsetY: 0,
                    style: {
                        color: '#263238',
                        fontSize: '14px',
                        fontFamily: undefined
                    }
                },
            },
            series: [
                {
                    name: "series-1",
                    data: barChartDataArray
                }
            ]
        })
    }

    /* useEffect(() => {
        firebase.getPromoterPrivate()
            .then((doc) => {
                if (doc.exists) {
                    const data = doc.data();
                    updateChartData(data);
                    console.log('data', data)
                    setPromoterPrivate(data);
                } else {
                    console.log('no promoter private file');
                    // todo that here the promoter hasn't get approval from admin so make some thing to inform the promoter
                    //history.push(PROMOTER_PRODUCTS);
                }
            })
            .catch((e) => {
                console.log('error loading promoter private file: ', e);
                //history.push(PROMOTER_PRODUCTS);
            }
            );
    }, []); */
    const classes = useStyles(); 


    return  promoterPrivate ? (
        <div >
            {/* <h1><strong>Promoter Dashboard:</strong></h1>
            <Link to={SHOP}>
                <h3 className="button-link d-inline-flex"><ArrowLeftOutlined /> &nbsp; Back to Shop</h3>
            </Link> */}
            <div className={classes.root}>
                <Grid container spacing={2}>
                    <Grid container item md={12} spacing={3}>
                        <React.Fragment>
                            <Grid item md={6}>
                                <Paper className={classes.paper} elevation={5}>
                                    {chartData &&
                                        <Chart
                                            options={chartData.options}
                                            series={chartData.series}
                                            type="bar"
                                            width={"400"}
                                        />}
                                </Paper>
                            </Grid>
                            <Grid item md={6}>
                                <Paper className={classes.paper} elevation={5}>
                                    {chartData3 &&
                                        <Chart
                                            options={chartData3.options}
                                            series={chartData3.series}
                                            type="bar"
                                            width="400"
                                        />}
                                </Paper>
                            </Grid>
                        </React.Fragment>
                    </Grid>
                    <Grid container item md={12} spacing={3}>
                        <React.Fragment>
                            <Grid item md={6}>
                                <Paper className={classes.paper} elevation={5}>
                                    <Chart
                                        options={chartData2.options}
                                        series={chartData2.series}
                                        type="donut"
                                        width="380"
                                    />
                                </Paper>
                            </Grid>
                            <Grid item md={6}>
                                <Paper className={classes.paper} elevation={5}>
                                    {chartData &&
                                        <Chart
                                            options={chartData.options}
                                            series={chartData.series}
                                            type="line"
                                            width="400"
                                        />}
                                </Paper>
                            </Grid>
                        </React.Fragment>
                    </Grid>
                    <Grid container item md={12} spacing={3}>
                        <React.Fragment>
                            <Grid item md={6}>
                                <Paper className={classes.paper} elevation={5}>
                                    <Doughnut
                                        data={state}
                                        options={{
                                            title: {
                                                display: true,
                                                text: 'Average Rainfall per month',
                                                fontSize: 20
                                            },
                                            legend: {
                                                display: true,
                                                position: 'right'
                                            }
                                        }}
                                    />
                                </Paper>
                            </Grid>
                            <Grid item md={6}>
                                <Paper className={classes.paper} elevation={5}>
                                    <Line
                                        data={state2}
                                        options={{
                                            title: {
                                                display: true,
                                                text: 'Average Rainfall per month',
                                                fontSize: 20
                                            },
                                            legend: {
                                                display: true,
                                                position: 'right'
                                            }
                                        }}
                                    />
                                </Paper>
                            </Grid>
                        </React.Fragment>
                    </Grid>
                    <Grid container item md={12} spacing={3}>
                        <React.Fragment>
                            <Grid item md={6}>
                                <Paper className={classes.paper} elevation={5}>
                                    <Chart
                                        options={state4.options}
                                        series={state4.series}
                                        type="donut"
                                        width="380"
                                    />
                                </Paper>
                            </Grid>
                            <Grid item md={6}>
                                <Paper className={classes.paper} elevation={5}>
                                    <Line
                                        data={state2}
                                        options={{
                                            title: {
                                                display: true,
                                                text: 'Average Rainfall per month',
                                                fontSize: 20
                                            },
                                            legend: {
                                                display: true,
                                                position: 'right'
                                            }
                                        }}
                                    />
                                </Paper>
                            </Grid>
                        </React.Fragment>
                    </Grid>
                </Grid>
            </div>
            <div className="col-1">
                <div className="card card-body">
                    <ul>
                        <li>
                            <h2>Summary</h2>
                        </li>
                        <li>
                            <div className="row">
                                <div>Total Number of Sells</div>
                                {/* <div>{promoterPrivate.totalNumberOfSells ? promoterPrivate.totalNumberOfSells : 0}</div> */}
                            </div>
                        </li>
                        <li>
                            <div className="row">
                                <div>
                                    <strong> Current Total Birr</strong>
                                </div>
                                <div>
                                    {/* <strong>{promoterPrivate.totalCurrent ? `${promoterPrivate.totalCurrent.toFixed(2)} ETB` : `${0} ETB`}</strong> */}
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div>      
    </div>
        </div>

    ) : (
        <div className="loader">
            <h4>Loading Product...</h4>
            <br />
            <LoadingOutlined style={{ fontSize: '3rem' }} />
        </div>
    );
};

export default PromoterDashboard;
