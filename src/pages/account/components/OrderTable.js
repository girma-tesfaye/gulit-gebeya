import React, { Component , useEffect} from 'react'
//import axios from 'axios'
import ReactTable from "react-table"; 
import 'react-table/react-table.css';
import { getOrders } from '../../../redux/actions/orderActions';
import { useSelector, useDispatch } from 'react-redux';


const OrderTable = () => {
    const orders = useSelector(state => state.orders);
    const items = orders.items
    const dispatch = useDispatch();

    const columns = [{  
        Header: 'ID',  
        accessor: 'id',
       }
       ,{  
        Header: 'Product Name',  
        accessor: 'product.name' ,
        /* Cell: (row) => {
          return <h4>{row.original.product.name}</h4>
        } */
        }
       
       ,{  
       Header: 'Price',  
       accessor: 'product.price' ,
       }
       ,{  
       Header: 'Phone',  
       accessor: 'phone',
       }
       ,{  
        Header: 'Quantity',  
        accessor: 'product.quantity',
        },
       {  
        Header: 'Email',  
        accessor: 'email',
        Cell: (row) => {
          return <a href={`mail.to:${row.original.email}`}>{row.original.name}</a>
        }
        },
        {  
          Header: 'Website',  
          accessor: 'website',
          }
    ]

    useEffect(() => {
		if (orders.items.length === 0 || !orders.lastRefKey) {
			dispatch(getOrders());
		}

		window.scrollTo(0, 0);
		//return () => dispatch(setLoading(false));
	}, []); 
    console.log(orders)   
    return(
			
        <ReactTable  
            data={items}  
            columns={columns}  
        />
	);
};

export default OrderTable;

/* function App extends Component {
  constructor(props){
    super(props)
    this.state = {
      users: [],
      loading:true
    }
  }

  const profile = useSelector(state => state.profile);

  async getUsersData(){
    const res = await axios.get('https://jsonplaceholder.typicode.com/users')
    console.log(res.data)
    this.setState({loading:false, users: res.data})
  }
  dispatch(getOrders());
  componentDidMount(){
    this.getUsersData()
  }
  render() {
    const columns = [{  
      Header: 'ID',  
      accessor: 'id',
     }
     ,{  
      Header: 'Name',  
      accessor: 'name' ,
      Cell: (row) => {
        return <h4>{row.original.name}</h4>
      }
      }
     
     ,{  
     Header: 'Username',  
     accessor: 'username' ,
     }
     ,{  
     Header: 'Phone',  
     accessor: 'phone',
     },
     {  
      Header: 'Email',  
      accessor: 'email',
      Cell: (row) => {
        return <a href={`mail.to:${row.original.email}`}>{row.original.name}</a>
      }
      },
      {  
        Header: 'Website',  
        accessor: 'website',
        }
  ]
    return (
      <ReactTable  
      data={this.state.users}  
      columns={columns}  
   />
    )
  }
} */