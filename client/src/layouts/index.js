import styles from './index.css';
import React from "react";
import {TabBar} from "antd-mobile";


// full layout

class BasicLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selKey: 'home'};
    this.navClickHandle = this.navClickHandle.bind(this);
  }

  navClickHandle(key) {
    this.setState({
      selKey: key,
    });
    let currentPath = '/';
    if (key === 'shopCart') {
      currentPath = '/user/shop_cart';
    }
    if (key === 'account') {
      currentPath = '/user';
    }
    //router
    this.props.history.push({
      pathname:currentPath,
    });
  }


  render() {
    return <div className={styles.main}>
      {this.props.children}
      <div className={styles.navBar}>
        <TabBar>
          <TabBar.Item title={"Home"}
                       icon={<div style={{
                         width: '22px',
                         height: '22px',
                         background: `url(${require('../assets/Home.svg')}) center center /  21px 21px no-repeat` }}
                       />}
                       selectedIcon ={<div style={{
                         width: '22px',
                         height: '22px',
                         background: `url(${require('../assets/Home-sel.svg')}) center center /  21px 21px no-repeat` }}
                       />}
                       onPress={()=> {this.navClickHandle('home')}}
                       selected = {this.state.selKey === 'home'}
          >
          </TabBar.Item>
          <TabBar.Item title={"Shop Cart"}
                       icon={<div style={{
                         width: '22px',
                         height: '22px',
                         background: `url(${require('../assets/Shopping-cart.svg')}) center center /  21px 21px no-repeat` }}
                       />}
                       selectedIcon ={<div style={{
                         width: '22px',
                         height: '22px',
                         background: `url(${require('../assets/Shopping-cart-sel.svg')}) center center /  21px 21px no-repeat` }}
                       />}
                       onPress={()=> {this.navClickHandle('shopCart')}}
                       selected = {this.state.selKey === 'shopCart'}
          >
          </TabBar.Item>
          <TabBar.Item title={"My Account"}
                       icon={<div style={{
                         width: '22px',
                         height: '22px',
                         background: `url(${require('../assets/Person.svg')}) center center /  21px 21px no-repeat` }}
                       />}
                       selectedIcon ={<div style={{
                         width: '22px',
                         height: '22px',
                         background: `url(${require('../assets/Person-sel.svg')}) center center /  21px 21px no-repeat` }}
                       />}
            onPress={()=> {this.navClickHandle('account')}}
            selected = {this.state.selKey === 'account'}>
          </TabBar.Item>
        </TabBar>
      </div>
    </div>;
  }
}


export default BasicLayout;
