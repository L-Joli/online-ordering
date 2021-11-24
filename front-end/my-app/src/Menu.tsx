import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import DrinkList from './menu-components/DrinkList';
// import Modal from './menu-components/Modal';
import './scss/App.scss';
import './scss/Menu.scss';
import { IDrink } from './redux/DrinkList/state';
import { Card } from 'reactstrap';
import { listDrinksThunk } from './redux/DrinkList/thunk';
import { ThunkDispatch, IRootState } from './redux/store';
import { connect } from 'react-redux';
// import { IRootState } from "./redux/store";
// import { connect } from 'react-redux';

interface IMenuProps {

  drinks: IDrink[],
  match: {
      params: {
          type: string
      }
  },
  listDrinks: (type: string) => void
}

interface IMenuState {
  modal: boolean
}

export class Menu extends React.Component<IMenuProps, IMenuState>{

  constructor(props: IMenuProps /*& RouteComponentProps<{ type: string }>*/) {
    super(props);
    this.state = {
        modal: true
    };

}

componentDidMount() {
  this.props.listDrinks("coffee");
}


  public render() {

    return (

      <div className="menu">
            
        {/* <div> */}
          <div className="drinks">
          
            <NavLink className="drinklink" activeClassName="activeDrinks" to="/menu/coffee">Coffee</NavLink>
            <NavLink className="drinklink" activeClassName="activeDrinks" to="/menu/special">Special Drink</NavLink>
            <NavLink className="drinklink" activeClassName="activeDrinks" to="/menu/chocolate">Belgian Chocolate</NavLink>
            <NavLink className="drinklink" activeClassName="activeDrinks" to="/menu/tea">Tea</NavLink>
            <NavLink className="drinklink" activeClassName="activeDrinks" to="/menu/savoury">Savory</NavLink>
            <NavLink className="drinklink last" activeClassName="activeDrinks" to="/menu/sweet">Sweet</NavLink>
          </div>
        {/* </div> */}
        <div className="menuList">
                {(this.props.drinks &&
                    this.props.drinks.map(item =>
                        <Card key={item.id}>
                            <NavLink to={`/menu/coffee/${item.id}`} key={item.id} className="itemsNavlink">

                                <picture >  <img src={require(`./images/${item.image}`)} width="90" height="90" alt="item" /> </picture>
                                {/* {item.image} */}
                                <div className="itemName">{item.name} </div>
                                <div className="itemPrice">
                                    <div className="HKD">HKD</div> 
                                <div className="iPrice">{item.price}</div>
                                </div>

                            </NavLink>
                        </Card>))}
               
                {/* <PrivateRoute path={`/menu/coffee/:id`} exact={true} component={DrinkItem} /> */}
            </div>
          <Route path="/menu/:type" component={DrinkList} />
          {/* <Route path="/menu/:type/:id/modal" component={Modal} /> */}
              
      </div>
    );
  }
}

const mapStateToProps = (state: IRootState) => {
  return {
      drinks: state.drinkState.drinks,
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch) => {
  return {
      listDrinks: (type: string) => dispatch(listDrinksThunk(type))
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Menu);

