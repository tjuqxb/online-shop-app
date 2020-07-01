import styles from './index.css';
import {Button} from 'antd-mobile';
import React from "react";
import {connect} from 'dva';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type:'product/loadProduct'
    });
  }

  render() {
    console.log(this.props.list);
    return <div>
      <ul>
        {this.props.list.map(p=> {
          return (<li key = {p._id}>{p.name}</li>)
        })}
      </ul>
    </div>
  }
}

const mapStateToProps = (state)=> {
  return state.product;
};

export default connect(mapStateToProps)(Index);
